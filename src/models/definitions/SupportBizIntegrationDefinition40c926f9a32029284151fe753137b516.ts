import { SupportBizIntegrationDefinitiona0ab6886d5c237bb3b4e9ed64385e2f8 } from '../definitions/SupportBizIntegrationDefinitiona0ab6886d5c237bb3b4e9ed64385e2f8';
// 申请退款
export type SupportBizIntegrationDefinition40c926f9a32029284151fe753137b516 = {
	// 字符集
	charset?: string;
	// 网关返回码
	code?: string;
	// 设备号
	deviceInfo?: string;
	// 错误码
	errCode?: string;
	// 错误信息
	errMsg?: string;
	// 商户号
	mchId?: string;
	// 返回信息
	message?: string;
	// 随机字符串
	nonceStr?: string;
	// 商户订单号
	outTradeNo?: string;
	// 第三方订单号
	outTransactionId?: string;
	// 退款记录数
	refundCount?: number;
	// 退款记录
	refundList?: Array<SupportBizIntegrationDefinitiona0ab6886d5c237bb3b4e9ed64385e2f8>;
	// 业务结果 0-成功 非0-错误码
	resultCode?: string;
	// 签名
	sign?: string;
	// 签名方式
	signType?: string;
	// 返回状态码 0-成功 非0-错误标识
	status?: string;
	// 交易类型
	tradeType?: string;
	// 平台订单号
	transactionId?: string;
	// 版本号
	version?: string;
};
