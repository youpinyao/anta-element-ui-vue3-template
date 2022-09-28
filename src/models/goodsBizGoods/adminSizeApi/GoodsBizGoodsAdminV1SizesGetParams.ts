// 商品尺码表列表
export type GoodsBizGoodsAdminV1SizesGetParams = {
	// 商品ID
	goodsId?: number;
	// ID
	id?: number;
	// 尺码名
	name?: string;
	// 当前页
	page?: number;
	// 每页数量
	pageSize?: number;
	// 状态：0-待上架、1-上架、2-下架
	status?: number;
};
