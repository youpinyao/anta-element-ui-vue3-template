export interface AdminApiTokensData {
	brandId?: number;
	captchaVerification?: string;
	email: string;
	password: string;
}

export interface AdminApiTokensResult {
	token: string;
}
