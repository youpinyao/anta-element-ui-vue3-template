import { GoodsBizGoodsDefinitionDetailsImages } from '../definitions/GoodsBizGoodsDefinitionDetailsImages';
// 商品图片表修改
export type GoodsBizGoodsDefinitionReq = {
	// 商品id
	goodsId?: number;
	// 集合对象
	list?: Array<GoodsBizGoodsDefinitionDetailsImages>;
};
