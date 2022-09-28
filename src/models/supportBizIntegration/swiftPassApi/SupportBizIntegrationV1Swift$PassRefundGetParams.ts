// 查询退款
export type SupportBizIntegrationV1Swift$PassRefundGetParams = {
	// api密钥
	apiKey?: string;
	// 商户号
	mchId?: string;
	// 商户退款单号
	outRefundNo?: string;
	// 商户订单号
	outTradeNo?: string;
	// 平台退款单号
	refundId?: string;
	// 平台订单号
	transactionId?: string;
};
