import { AdminDefinitionPointVO } from '../definitions/AdminDefinitionPointVO';
import { AdminDefinitionPoint } from '../definitions/AdminDefinitionPoint';
// 验证码获取
export type AdminDefinitionCaptchaVO = {
	browserInfo?: string;
	captchaFontSize?: number;
	captchaFontType?: string;
	captchaId?: string;
	captchaOriginalPath?: string;
	captchaType?: string;
	captchaVerification?: string;
	clientUid?: string;
	jigsawImageBase64?: string;
	originalImageBase64?: string;
	point?: AdminDefinitionPointVO;
	pointJson?: string;
	pointList?: Array<AdminDefinitionPoint>;
	projectCode?: string;
	result?: boolean;
	secretKey?: string;
	token?: string;
	ts?: number;
	wordList?: Array<string>;
};
