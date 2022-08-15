import { MenuItem } from '@/models/menu';

export async function queryMenu() {
	return [
		{
			title: '首页',
			icon: 'at-icon-home',
			path: '/home',
		},
		{
			title: 'Convention 常规',
			key: 'Convention',
			icon: 'at-icon-gear-o',
			children: [
				{
					title: 'Icon 图标',
					path: '/icon',
				},
				{
					title: 'Button 按钮',
					path: '/button',
				},
			],
		},
		{
			title: 'Navigation 导航',
			key: 'Navigation',
			icon: 'at-icon-gear-o',
			children: [
				{
					title: 'Breadcrumb 面包屑',
					path: '/breadcrumb',
				},
				{
					title: 'Dropdown 下拉菜单',
					path: '/dropdown',
				},
				{
					title: 'Tabs 标签页',
					path: '/tabs',
				},
				{
					title: 'Steps 步骤条',
					path: '/steps',
				},
			],
		},
		{
			title: 'Feedback 反馈',
			key: 'Feedback',
			icon: 'at-icon-gear-o',
			children: [
				{
					title: 'Alert 警告',
					path: '/alert',
				},
				{
					title: 'Popover 弹出框',
					path: '/popover',
				},
				{
					title: 'Tooltip 文字提示',
					path: '/tooltip',
				},
				{
					title: 'Notification 通知',
					path: '/notification',
				},
				{
					title: 'Skeleton 骨架屏',
					path: '/skeleton',
				},
				{
					title: 'Dialog 对话框',
					path: '/dialog',
				},
				{
					title: 'Progress 进度条',
					path: '/progress',
				},
				{
					title: 'Loading 加载',
					path: '/loading',
				},
				{
					title: 'Message 消息提示',
					path: '/message',
				},
				{
					title: 'MessageBox 消息弹框',
					path: '/message-box',
				},
			],
		},
		{
			title: 'DataEntry 数据录入',
			key: 'DataEntry',
			icon: 'at-icon-gear-o',
			children: [
				{
					title: 'Input 输入框',
					path: '/input',
				},
				{
					title: 'InputNumber 计数器',
					path: '/input-number',
				},
				{
					title: 'Autocomplete 自动完成',
					path: '/autocomplete',
				},
				{
					title: 'Radio 单选框',
					path: '/radio',
				},
				{
					title: 'Checkbox 多选框',
					path: '/checkbox',
				},
				{
					title: 'Switch 开关',
					path: '/switch',
				},
				{
					title: 'Select 选择器',
					path: '/select',
				},
				{
					title: 'Cascader 级联选择器',
					path: '/cascader',
				},
				{
					title: 'DatePicker 日期选择器',
					path: '/date-picker',
				},
				{
					title: 'TimePicker 时间选择器',
					path: '/time-picker',
				},
				{
					title: 'ColorPicker 颜色选择器',
					path: '/color-picker',
				},
				{
					title: 'Clipboard 剪切板',
					path: '/clipboard',
				},
				{
					title: 'Rate 评分',
					path: '/rate',
				},
				{
					title: 'Slider 滑块',
					path: '/slider',
				},
				{
					title: 'Transfer 穿梭框',
					path: '/transfer',
				},
				{
					title: 'Upload 上传',
					path: '/upload',
				},
				{
					title: 'Tree 树形结构',
					path: '/tree',
				},
				{
					title: 'Form 表单',
					path: '/form',
				},
				{
					title: 'SchemaForm 表单渲染',
					path: '/schema-form',
				},
				{
					title: 'SchemaTable 表格渲染',
					path: '/schema-table',
				},
			],
		},
		{
			title: '数据展示',
			key: 'DataDisplay',
			icon: 'at-icon-gear-o',
			children: [
				{
					title: 'Image 图片',
					path: '/image',
				},
				{
					title: 'Badge 标记',
					path: '/badge',
				},
				{
					title: 'Empty 空状态',
					path: '/empty',
				},
				{
					title: 'Card 卡片',
					path: '/card',
				},
				{
					title: 'Title 标题',
					path: '/title',
				},
				{
					title: 'LineClamp 多行省略',
					path: '/line-clamp',
				},
				{
					title: 'Sortable 排序',
					path: '/sortable',
				},
				{
					title: 'InfiniteScroll 无限滚动',
					path: '/infinite-scroll',
				},
				{
					title: 'Carousel 走马灯',
					path: '/carousel',
				},
				{
					title: 'Collapse 折叠面板',
					path: '/collapse',
				},
				{
					title: 'Tag 标签',
					path: '/tag',
				},
				{
					title: 'Timeline 时间轴',
					path: '/timeline',
				},
				{
					title: 'Table 表格',
					path: '/table',
				},
				{
					title: 'Pagination 分页',
					path: '/pagination',
				},
				{
					title: 'Drawer 抽屉',
					path: '/drawer',
				},
			],
		},
	] as MenuItem[];
}
