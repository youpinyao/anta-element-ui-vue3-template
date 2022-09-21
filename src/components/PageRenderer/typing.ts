import {
	AtButton,
	AtDialog,
	AtPopconfirm,
} from 'anta-element-ui-components-next';
import { ArrayType } from 'anta-element-ui-components-next/src/utils/arrayType';
import { RecordType } from 'anta-element-ui-components-next/src/utils/recordType';
import { PropsType } from 'anta-element-ui-components-next/src/utils/propsType';
import { AtSchemaFormTypes } from 'anta-element-ui-schema-form';
import { AtSchemaTableTypes } from 'anta-element-ui-schema-table';

export const functionButtonTriggerTypes = [
	'jump',
	'dialog',
	'popconfirm',
] as const;

export const methods = ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'] as const;

export namespace PageRenderer {
	export interface FunctionButtonTrigger {
		type: typeof functionButtonTriggerTypes[number];
	}
	export type Methods = typeof methods[number];
	export interface FunctionButtonTriggerJump extends FunctionButtonTrigger {
		type: 'jump';
		path: string;
	}
	export interface FunctionButtonTriggerDialog extends FunctionButtonTrigger {
		type: 'dialog';
		form: {
			url: string;
			method: Methods;
			data?: {
				url: string;
				method: Methods;
			};
			schema: AtSchemaFormTypes.JSONSchema;
		};
		cancelText?: string | boolean;
		okText?: string | boolean;
		dialogProps: PropsType<typeof AtDialog>;
	}
	export interface FunctionButtonTriggerPopconfirm
		extends FunctionButtonTrigger {
		type: 'popconfirm';
		url: string;
		method: Methods;
		confirmProps: PropsType<typeof AtPopconfirm>;
	}
	export interface FunctionButton {
		title: string;
		type: PropsType<typeof AtButton>['type'];
		trigger:
			| FunctionButtonTriggerJump
			| FunctionButtonTriggerDialog
			| FunctionButtonTriggerPopconfirm;
	}

	export type Property = RecordType<
		AtSchemaFormTypes.JSONSchema['properties']
	> & {
		defaultValue?: any;
	};

	export type TableColumn = ArrayType<
		AtSchemaTableTypes.JSONSchema['columns']
	> & {
		buttons?: FunctionButton[];
	};
	export interface JSONSchema {
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
			schema?: Omit<AtSchemaTableTypes.JSONSchema, 'columns'> & {
				columns: TableColumn[];
			};
		};
		pagination?: boolean;
	}
}
