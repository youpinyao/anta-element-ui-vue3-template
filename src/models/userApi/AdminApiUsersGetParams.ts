// 用户列表
export type AdminApiUsersGetParams = {
	// 品牌ID
	brandId?: number;
	// 当前页
	curPage?: number;
	// 用户姓名
	fullName?: string;
	// 每页数量
	pageSize?: number;
	// 角色ID
	roleId?: number;
	startRow?: number;
	// 状态,0-禁用,1-启用
	statusFlag?: number;
	// 有效开始时间
	termValidityBeginTime?: string;
	// 有效结束时间
	termValidityEndTime?: string;
	// 用户名
	username?: string;
};
