import formItemBase from './formItemBase';

export default {
	...formItemBase,
	component: 'upload',
	props: {
		action: '提交地址 string',
		method: '提交方法 string',
		multiple: '多选 string',
		limit: '允许上传文件的最大数量 number',
		name: '上传的文件字段名 string',
	},
};
