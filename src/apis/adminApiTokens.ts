import {
	AdminApiTokensData,
	AdminApiTokensResult,
} from '@/models/adminApiTokens';
import { post } from '@/utils/axios';

export function adminApiTokens(data: AdminApiTokensData) {
	return post<AdminApiTokensResult, AdminApiTokensData>({
		url: '/admin/api/tokens',
		data,
		toast: false,
	});
}
