// 查询用户服务
export type AdminDefinition4e33374ce93d21f677d7fda7b743512c = {
	// 子资源
	children?: Array<AdminDefinition4e33374ce93d21f677d7fda7b743512c>;
	// 创建时间
	createTime?: string;
	// 创建人
	createdBy?: string;
	// 数据权限:0-否,1-是
	dataFlag?: number;
	// 删除时间
	deleteTime?: number;
	// 数据脱敏:0-否,1-是
	desenFlag?: number;
	// 脱敏信息:{field: {start:1,end:100} }
	desenJson?: string;
	// 主键
	id?: number;
	// 是否叶子:0-否,1-是
	leafFlag?: number;
	// 方法类型:POST,PUT,GET,DELETE
	method?: string;
	// 资源模块
	module?: string;
	// 资源名称
	name?: string;
	// 父资源编码,提供建立关系
	parentUriCode?: string;
	// 功能权限:0-否,1-是
	permFlag?: number;
	// 服务类型:0-对内,1-对外
	serviceFlag?: number;
	// 资源类型:0-模块,1-菜单,2-服务
	typeFlag?: number;
	// 是否更新:0-否,1-是
	updateFlag?: number;
	// 更新时间
	updateTime?: string;
	// 更新人
	updatedBy?: string;
	// 资源地址
	uri?: string;
	// 资源编码,必须唯一
	uriCode?: string;
};