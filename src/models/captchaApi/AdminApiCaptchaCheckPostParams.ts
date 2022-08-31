import { DefinitionCaptchaVO } from '../definitions/DefinitionCaptchaVO';
// 验证验证码
export type AdminApiCaptchaCheckPostParams = {
	// captcha
	captcha: DefinitionCaptchaVO;
};
