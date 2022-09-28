// 商品图片表编辑根据id_goods查询
export type GoodsBizGoodsDefinitionImagesEditDetails = {
	// 货号名
	aliasname?: string;
	// 颜色id
	colorId?: number;
	// 图片ID
	id?: number;
	// 存放路径
	paths?: Array<string>;
	// 0:停用 1:启用
	status?: number;
	// 图片类型
	type?: number;
};
