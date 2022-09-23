import {
	AtButton,
	AtDialog,
	AtPopconfirm,
	AtSwitch,
} from 'anta-element-ui-components-next';
import { ArrayType } from 'anta-element-ui-components-next/src/utils/arrayType';
import { RecordType } from 'anta-element-ui-components-next/src/utils/recordType';
import { PropsType } from 'anta-element-ui-components-next/src/utils/propsType';
import { AtSchemaFormTypes } from 'anta-element-ui-schema-form';
import { AtSchemaTableTypes } from 'anta-element-ui-schema-table';

export const functionButtonTriggerTypes = [
	'route',
	'link',
	'dialog',
	'popconfirm',
] as const;

export const methods = ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'] as const;

export namespace PageRenderer {
	export interface FunctionButtonTrigger {
		type: typeof functionButtonTriggerTypes[number];
	}
	export type Methods = typeof methods[number];

	export type FunctionButtonTriggerData =
		| Record<string, any>
		| (() => Record<string, any>);
	export interface FunctionButtonTriggerRoute extends FunctionButtonTrigger {
		type: 'route';
		path: string;
		data?: FunctionButtonTriggerData;
		callback?: () => void;
	}

	export interface FunctionButtonTriggerLink extends FunctionButtonTrigger {
		type: 'link';
		url: string;
		data?: FunctionButtonTriggerData;
		callback?: () => void;
	}
	export interface FunctionButtonTriggerDialog extends FunctionButtonTrigger {
		type: 'dialog';
		data?: FunctionButtonTriggerData;
		form: {
			url: string;
			method: Methods;
			dataUrl?: string;
			dataMethod?: Methods;
			schema: AtSchemaFormTypes.JSONSchema;
		};
		callback?: () => void;
		cancelText?: string | boolean;
		okText?: string | boolean;
		dialogProps: PropsType<typeof AtDialog>;
	}
	export interface FunctionButtonTriggerPopconfirm
		extends FunctionButtonTrigger {
		type: 'popconfirm';
		url: string;
		method: Methods;
		data?: FunctionButtonTriggerData;
		callback?: () => void;
		confirmProps?: PropsType<typeof AtPopconfirm>;
	}
	export interface FunctionButton {
		title: string;
		type: PropsType<typeof AtButton>['type'];
		trigger:
			| FunctionButtonTriggerLink
			| FunctionButtonTriggerRoute
			| FunctionButtonTriggerDialog
			| FunctionButtonTriggerPopconfirm;
	}

	export interface Swtich {
		trueValue: any;
		falseValue: any;
		url: string;
		method: Methods;
		prop?: string;
		props: PropsType<typeof AtSwitch>;
	}

	export type Property = RecordType<
		AtSchemaFormTypes.JSONSchema['properties']
	> & {
		defaultValue?: any;
	};

	export type TableColumn<T extends Record<string, any> = any> = ArrayType<
		AtSchemaTableTypes.JSONSchema<T>['columns']
	> & {
		buttons?: FunctionButton[];
		switch?: Swtich;
	};
	export interface JSONSchema<T extends Record<string, any> = any> {
		title?: string;
		search?: {
			form?: AtSchemaFormTypes.JSONSchema;
			resetButton?: boolean;
			searchButton?: boolean;
		};
		buttons?: FunctionButton[];
		table?: {
			url?: string;
			method?: Methods;
			selection?: boolean;
			tree?: boolean;
			schema?: Omit<AtSchemaTableTypes.JSONSchema<T>, 'columns'> & {
				columns: TableColumn<T>[];
			};
		};
		pagination?: boolean;
	}
}
