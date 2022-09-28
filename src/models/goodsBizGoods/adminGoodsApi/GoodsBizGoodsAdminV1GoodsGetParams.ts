// 商品主表列表
export type GoodsBizGoodsAdminV1GoodsGetParams = {
	// 款号
	alias?: string;
	// 商品id
	id?: number;
	// 当前页
	page?: number;
	// 每页数量
	pageSize?: number;
	// 店铺id
	shopId?: number;
	// 多个店铺ID
	shopIds?: Array<number>;
	// 商品状态：0-待上架、1-在架、2-下架
	status?: number;
};
