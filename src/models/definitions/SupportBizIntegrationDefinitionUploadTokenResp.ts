import { SupportBizIntegrationDefinitionStsTokenVO } from '../definitions/SupportBizIntegrationDefinitionStsTokenVO';
// 获取阿里上传的token
export type SupportBizIntegrationDefinitionUploadTokenResp = {
	// 文件名
	fileName?: string;
	// 路径
	path?: string;
	// 上传的token
	stsTokenVO?: SupportBizIntegrationDefinitionStsTokenVO;
};
