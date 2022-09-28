// 商品最小单元属性表列表
export type GoodsBizGoodsAdminV1SkusGetParams = {
	// 颜色ID
	colorId?: number;
	// 商品ID
	goodsId?: number;
	// ID
	id?: number;
	// 当前页
	page?: number;
	// 每页数量
	pageSize?: number;
	// 店铺id
	shopId?: number;
	// 尺码ID
	sizeId?: number;
	// 条码
	sku?: string;
};
