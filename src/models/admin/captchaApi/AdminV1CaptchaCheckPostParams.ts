import { AdminDefinitionCaptchaVO } from '../../definitions/AdminDefinitionCaptchaVO';
// 验证验证码
export type AdminV1CaptchaCheckPostParams = {
	// captcha
	captcha: AdminDefinitionCaptchaVO;
};
