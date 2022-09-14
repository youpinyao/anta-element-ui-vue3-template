import { AtMessage } from 'anta-element-ui-components-next';
import { AtSchemaFormTypes } from 'anta-element-ui-schema-form';
import axios from 'axios';
import { has } from 'lodash';
import { PageGenerator } from '../../typing';

export type ReadSwaggerPageResult = {
	params: AtSchemaFormTypes.JSONSchema['properties'];
	result: NonNullable<
		NonNullable<PageGenerator.JSONSchema['table']>['schema']
	>['columns'];
	buttons?: PageGenerator.FunctionButton[];
	url?: string;
	method?: PageGenerator.Methods;
	title?: string;
	api?: string;
	hash?: string;
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

export function pickTag(hash: string) {
	return hash.split('/')[2];
}

export async function readSwaggerPage(
	hash: string
): Promise<Pick<ReadSwaggerPageResult, 'params' | 'result'>> {
	const iframe = document.createElement('iframe');
	const waitFor = (
		cls: string,
		preResolve?: (value: Element | undefined | null) => void,
		retry: number = 0
	) => {
		return new Promise<Element | undefined | null>((resolve, reject) => {
			const document = iframe.contentWindow?.document.querySelector(cls);

			if (document || retry > 20) {
				resolve(document);
				preResolve && preResolve(document);
			} else {
				setTimeout(() => {
					waitFor(
						cls,
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
	iframe.style.cssText = 'display: none';
	document.body.appendChild(iframe);

	iframe.contentWindow?.document.write(
		(
			await axios.get<string>(
				`https://admin-api-dev.atxapi.com/doc.html#${hash}`
			)
		).data.replace(
			/<meta charset=utf-8>/g,
			'<meta charset=utf-8><base href="https://admin-api-dev.atxapi.com" />'
		)
	);

	const menu = await waitFor('.ant-menu-root');

	await waitFor('.description');

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
		sub?.querySelector(`a[href^="#${hash.split('_')[0]}"]`)
	);

	// iframe.contentWindow!.location.hash = `#${hash}`;

	const element = await waitFor('.document');

	if (!element) {
		document.body.removeChild(iframe);
		AtMessage.error('拉取失败，请重试');
		throw new Error('waitFor timeout');
	}

	const params: ReadSwaggerPageResult['params'] = {};
	const result: ReadSwaggerPageResult['result'] = [];

	let paramsTrs = [...element.querySelectorAll('.api-title')]
		.filter((item) => item.innerHTML.trim() === '请求参数')[0]
		.nextElementSibling?.querySelectorAll('tbody tr');

	const level0paramsTrs = [...(paramsTrs ?? [])].filter((tr) =>
		/ant-table-row-level-0/g.test(tr.className)
	);
	const level1paramsTrs = [...(paramsTrs ?? [])].filter((tr) =>
		/ant-table-row-level-1/g.test(tr.className)
	);
	const level2paramsTrs = [...(paramsTrs ?? [])].filter((tr) =>
		/ant-table-row-level-2/g.test(tr.className)
	);
	if (level2paramsTrs.length > 0) {
		paramsTrs = level2paramsTrs as unknown as NodeListOf<Element>;
	} else if (level1paramsTrs.length > 0) {
		paramsTrs = level1paramsTrs as unknown as NodeListOf<Element>;
	} else {
		paramsTrs = level0paramsTrs as unknown as NodeListOf<Element>;
	}

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

	let resultTrs = [...element.querySelectorAll('.api-title')]
		.filter((item) => item.innerHTML.trim() === '响应参数')[0]
		.nextElementSibling?.querySelectorAll('tbody tr');

	const level0resultTrs = [...(resultTrs ?? [])].filter((tr) =>
		/ant-table-row-level-0/g.test(tr.className)
	);
	const level1resultTrs = [...(resultTrs ?? [])].filter((tr) =>
		/ant-table-row-level-1/g.test(tr.className)
	);
	const level2resultTrs = [...(resultTrs ?? [])].filter((tr) =>
		/ant-table-row-level-2/g.test(tr.className)
	);

	if (level2resultTrs.length > 0) {
		resultTrs = level2resultTrs as unknown as NodeListOf<Element>;
	} else if (level1resultTrs.length > 0) {
		resultTrs = level1resultTrs as unknown as NodeListOf<Element>;
	} else {
		resultTrs = level0resultTrs as unknown as NodeListOf<Element>;
	}
	document.body.removeChild(iframe);

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

	return {
		params,
		result,
	};
}