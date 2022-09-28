import { AtMessage } from 'anta-element-ui-components-next';
import { AtSchemaFormTypes } from 'anta-element-ui-schema-form';
import axios from 'axios';
import { has } from 'lodash';
import { PageRenderer } from '@components/PageRenderer/typing';

export type ReadSwaggerPageResult = {
	params: AtSchemaFormTypes.JSONSchema['properties'];
	result: NonNullable<
		NonNullable<PageRenderer.JSONSchema['table']>['schema']
	>['columns'];
	buttons?: PageRenderer.FunctionButton[];
	url?: string;
	method?: PageRenderer.Methods;
	title?: string;
	alias?: string;
	api?: string;
	hash?: string;
	pagination?: boolean;
};

function dispatchEvent(
	document: Document = window.document,
	element?: Element | null
) {
	if (!element) return;
	const evt = document.createEvent('MouseEvent');

	evt.initEvent('click', true, true);

	element.dispatchEvent(evt);
}

export function pickTag(hash: string = '') {
	return hash.split('/')[hash.split('/').length - 2];
}

export function transformToHref(hash: string = '') {
	const items = hash.split('/');
	const operationId = items.pop();
	const tag = items.pop();

	return `#${items.join('-').replace(/^-/g, '/')}/${tag}/${operationId}`;
}

export async function readSwaggerPage(
	resource?: string,
	hash?: string
): Promise<Pick<ReadSwaggerPageResult, 'params' | 'result' | 'pagination'>> {
	if (!resource) {
		throw new Error('please set resource');
	}
	if (!hash) {
		throw new Error('please set hash');
	}

	const iframeBox = document.createElement('div');
	const iframe = document.createElement('iframe');
	const waitFor = (
		cls: string,
		valid: (element?: Element) => boolean = (element?: Element) => true,
		preResolve?: (value: Element | undefined | null) => void,
		retry: number = 0
	) => {
		const max = 20;
		if (retry === 0) {
			console.log('------------------------------');
			console.log('waitFor', cls, 'start');
		}
		return new Promise<Element | undefined | null>((resolve, reject) => {
			const document = iframe.contentWindow?.document.querySelector(cls);

			if ((document && valid(document)) || retry > max) {
				resolve(document);
				preResolve && preResolve(document);
				console.log('waitFor', cls, retry > max ? 'fail' : 'success');
			} else {
				setTimeout(() => {
					waitFor(
						cls,
						valid,
						(document) => {
							resolve(document);
							preResolve && preResolve(document);
						},
						retry + 1
					);
				}, 300);
			}
		});
	};
	// iframe.style.cssText = 'display: none';
	iframeBox.style.cssText =
		'position: fixed; width: 0; height: 0; overflow: hidden;';
	iframe.style.cssText =
		'position: absolute; left: 0; top: 0; width: 1920px; height: 1080px;';
	document.body.appendChild(iframeBox);
	iframeBox.appendChild(iframe);

	iframe.contentWindow?.document.write(
		(
			await axios.get<string>(`https://admin-api-dev.atxapi.com/doc.html`)
		).data.replace(
			/<meta charset=utf-8>/g,
			'<meta charset=utf-8><base href="https://admin-api-dev.atxapi.com" />'
		)
	);

	const select = await waitFor('.sider .ant-select-selection');

	dispatchEvent(iframe.contentWindow?.document, select);

	await waitFor('.ant-select-dropdown ul li');
	const option = [
		...(iframe.contentWindow?.document.querySelectorAll(
			'.ant-select-dropdown ul li'
		) ?? []),
	].filter((item) => {
		return resource.replace(/\//g, '-').startsWith(`-${item.innerHTML.trim()}`);
	})[0];

	dispatchEvent(iframe.contentWindow?.document, option);

	await waitFor('.description', (el) => {
		return el?.innerHTML.indexOf(resource) !== -1;
	});

	const menu = await waitFor('.ant-menu-root');

	[...(menu?.querySelectorAll('.ant-menu-submenu-title') ?? [])].forEach(
		(element) => {
			if (
				(
					element.querySelectorAll('span span')[1] ||
					element.querySelectorAll('span span')[0]
				).innerHTML.trim() === pickTag(hash)
			) {
				dispatchEvent(iframe.contentWindow?.document, element);
			}
		}
	);

	const sub = await waitFor('.ant-menu-sub');

	dispatchEvent(
		iframe.contentWindow?.document,
		sub?.querySelector(`a[href^="${transformToHref(hash)}"]`)
	);

	const element = await waitFor('.document');

	if (!element) {
		document.body.removeChild(iframeBox);
		AtMessage.error('拉取失败，请重试');
		throw new Error('waitFor timeout');
	}

	const params: ReadSwaggerPageResult['params'] = {};
	const result: ReadSwaggerPageResult['result'] = [];

	const getLevelTrs = (
		trs: NodeListOf<Element> = [] as unknown as NodeListOf<Element>,
		level: number
	) => {
		return [...(trs ?? [])].filter((tr) =>
			new RegExp(`ant-table-row-level-${level}`, 'g').test(tr.className)
		);
	};
	const getLastLevelTrs = (
		trs: NodeListOf<Element> = [] as unknown as NodeListOf<Element>
	) => {
		let lastLevel = 0;

		while (getLevelTrs(trs, lastLevel + 1).length > 0) {
			lastLevel += 1;
		}

		return [getLevelTrs(trs, lastLevel), lastLevel] as unknown as [
			NodeListOf<Element>,
			number
		];
	};

	const [paramsTrs] = getLastLevelTrs(
		[...element.querySelectorAll('.api-title')]
			.filter((item) => item.innerHTML.trim() === '请求参数')[0]
			.nextElementSibling?.querySelectorAll('tbody tr')
	);

	const singleTypeMap: Partial<Record<string, any>> = {
		integer: 'number',
		number: 'number',
		string: 'string',
		boolean: 'boolean',
	};

	[...(paramsTrs ?? [])].forEach((tr) => {
		const tds = tr.querySelectorAll('td');
		const field = tds[0].innerText.trim();
		const label = tds[1].innerText.trim();

		if (label) {
			params[field] = {
				component: 'input',
				label: `${label}：`,
				type: singleTypeMap[tds[4].innerText.trim().split('(')[0]],
				formItemProps: {
					labelWidth: 100,
				},
			};
		}
	});

	const resultTrs = getLevelTrs(
		[...element.querySelectorAll('.api-title')]
			.filter((item) => item.innerHTML.trim() === '响应参数')[0]
			.nextElementSibling?.querySelectorAll('tbody tr'),
		[...element.querySelectorAll('.ant-table-row-cell-break-word')].filter(
			(item) => item.innerHTML.trim() === 'pageSize'
		)[0]
			? 2
			: 1
	);
	const pagination = params['page'] && params['pageSize'] ? true : false;

	document.body.removeChild(iframeBox);

	[...(resultTrs ?? [])].forEach((tr) => {
		const tds = tr.querySelectorAll('td');
		const label = tds[1].innerText.trim();

		if (label) {
			result.push({
				prop: tds[0].innerText.trim(),
				label,
			});
		}
	});

	delete params['page'];
	delete params['pageSize'];

	return {
		params,
		result,
		pagination,
	};
}
