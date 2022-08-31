import { DefinitionPointVO } from '../definitions/DefinitionPointVO';
import { DefinitionPoint } from '../definitions/DefinitionPoint';
// 验证码获取
export type DefinitionCaptchaVO = {
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
	point?: DefinitionPointVO;
	pointJson?: string;
	pointList?: Array<DefinitionPoint>;
	projectCode?: string;
	result?: boolean;
	secretKey?: string;
	token?: string;
	ts?: number;
	wordList?: Array<string>;
};
