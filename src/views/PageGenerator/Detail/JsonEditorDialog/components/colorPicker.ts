import formItemBase from './formItemBase';

export default {
	...formItemBase,
	component: 'color-picker',
	props: {
		showAlpha: '是否支持透明 boolean',
		colorFormat: '格式 hls | hsv | hex | rgb',
		predefine: '预定义颜色 string[]',
	},
};
