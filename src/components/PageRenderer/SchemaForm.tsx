import { useTokenStore } from '@/store/token';
import { post, request } from '@/utils/axios';
import { getAxiosErrorMsg, getAxiosMsg } from '@/utils/axios/msg';
import {
	AtMessage,
	UploadRequestOptions,
} from 'anta-element-ui-components-next';
import { AtSchemaForm, AtSchemaFormTypes } from 'anta-element-ui-schema-form';
import { defineComponent, PropType, provide, ref } from 'vue';
import { SCHEMA_FORM_MODEL } from './typing';

const transformUploadProperty = (item: AtSchemaFormTypes.Property) => {
	const isUpload =
		item.component === 'upload' ||
		item.component === 'image-upload' ||
		item.component === 'single-upload' ||
		item.component === 'single-image-upload';

	return isUpload
		? ({
				...item,
				transformResponse(file) {
					return (file?.response as any)?.data?.path;
				},
				props: {
					action: '/support/biz/integration/v1/upload/uploadfile',
					headers: {
						Authorization: `Bearer ${useTokenStore().token}`,
						...item.props?.headers,
					},
					onError(error) {
						try {
							AtMessage.error(
								getAxiosMsg({ data: JSON.parse(error.message) } as any)
							);
						} catch (e) {
							AtMessage.error(error.message);
						}
					},
					onSuccess(response: any) {
						if (response?.code !== 0) {
							AtMessage.error(getAxiosMsg({ data: response } as any));
						}
					},
					...item.props,
				},
		  } as
				| AtSchemaFormTypes.Upload
				| AtSchemaFormTypes.ImageUpload
				| AtSchemaFormTypes.SingleUpload
				| AtSchemaFormTypes.SingleImageUpload)
		: item;
};

const transformSelectProperty = (item: AtSchemaFormTypes.Property) => {
	const isOptions =
		item.component === 'select' ||
		item.component === 'virtual-select' ||
		item.component === 'tree-select' ||
		item.component === 'tree' ||
		item.component === 'cascader' ||
		item.component === 'transfer';

	return isOptions
		? {
				...item,
				options:
					typeof (item as any).remote === 'string'
						? async () => {
								const result = await request<any>({
									url: (item as any).remote as unknown as string,
									method: 'GET',
								});

								return result.data.data ?? [];
						  }
						: item.options,
		  }
		: item;
};

const SchemaForm = defineComponent({
	props: {
		schema: {
			type: Object as PropType<AtSchemaFormTypes.JSONSchema>,
			required: true,
		},
		model: {
			type: Object as PropType<AtSchemaFormTypes.Model>,
			required: true,
		},
	},
	setup(props, ctx) {
		provide(SCHEMA_FORM_MODEL, props.model);
		return () => {
			const { schema } = props;
			const properties = Object.fromEntries(
				Object.entries(schema.properties).map(([field, item]) => {
					return [
						field,
						transformUploadProperty(transformSelectProperty(item)),
					];
				})
			) as AtSchemaFormTypes.JSONSchema['properties'];

			return (
				<AtSchemaForm
					model={props.model}
					schema={{
						...schema,
						properties,
					}}
				></AtSchemaForm>
			);
		};
	},
});

export default SchemaForm;
