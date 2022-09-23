import { DefinitionCaptchaVO } from '../definitions/DefinitionCaptchaVO';
// 验证验证码
export type AdminV1CaptchaCheckPostParams = {
	// captcha
	captcha: DefinitionCaptchaVO;
};
