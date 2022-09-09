import {
	AtButton,
	AtDialog,
	AtPopconfirm,
} from 'anta-element-ui-components-next';
import { ArrayType } from 'anta-element-ui-components-next/src/utils/arrayType';
import { PropsType } from 'anta-element-ui-components-next/src/utils/propsType';
import { AtSchemaFormTypes } from 'anta-element-ui-schema-form';
import { AtSchemaTableTypes } from 'anta-element-ui-schema-table';

export namespace PageGenerator {
	export interface FunctionButtonTrigger {
		type: 'jump' | 'dialog' | 'popconfirm';
	}
	export type Methods = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
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
		cancelText: string;
		okText: string;
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
	export interface JSONSchema {
		title: string;
		search: {
			form: AtSchemaFormTypes.JSONSchema & {
				properties: {
					defaultValue: any;
				};
			};
			resetButton: boolean;
			searchButton: boolean;
		};
		buttons: FunctionButton[];
		table: {
			url: string;
			method: Methods;
			schema: Omit<AtSchemaTableTypes.JSONSchema, 'columns'> & {
				columns: (ArrayType<AtSchemaTableTypes.JSONSchema['columns']> & {
					buttons: FunctionButton[];
				})[];
			};
		};
		pagination: boolean;
	}
}
