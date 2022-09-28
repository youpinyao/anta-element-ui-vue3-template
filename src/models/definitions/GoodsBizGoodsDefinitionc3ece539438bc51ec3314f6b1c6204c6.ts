// 商品分类查单个
export type GoodsBizGoodsDefinitionc3ece539438bc51ec3314f6b1c6204c6 = {
	// 分类编码
	code?: string;
	// 搭配分类
	collocateCat?: string;
	// 商品类别的自增ID号
	id?: number;
	// 分类默认图片
	img?: string;
	// 商品分类描述
	intro?: string;
	// 是否在前台页面显示，1，显示；0，不显示
	isShow?: number;
	// 商品分类的关键字，可能是为了搜索
	keywords?: string;
	// 商品分类名称
	name?: string;
	// 分类路径
	path?: string;
	pid?: number;
	// 该分类在页面显示的顺序，数字越大顺序越靠后；同数字，id在前的先显示
	sort?: number;
	// 分类标题
	title?: string;
};
