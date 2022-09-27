import formItemBase from './formItemBase';

export default {
	prop: '字段名 sting',
	label: '列名称 string',
	width: '列宽 number',
	minWidth: '最小列宽 number',
	fixed: '列漂浮 true / left / right',
	sortable: '是否排序 boolean',
	resizable: '是否可以拖动 boolean',
	showOverflowTooltip: '当内容过长被隐藏时显示 tooltip boolean',
	align: '对齐方式 left / center / right',
	template: "vue模板 例子：<div>{{ row.status === 1 ? '开启' : '关闭' }}</div>",
};
