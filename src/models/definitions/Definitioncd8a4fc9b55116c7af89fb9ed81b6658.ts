// 服务资源更新
export type Definitioncd8a4fc9b55116c7af89fb9ed81b6658 = {
	// 品牌ID
	brandId?: number;
	// 数据权限,0-否,1-是
	dataFlag?: any;
	// 数据脱敏:0-否,1-是
	desenFlag?: number;
	// 脱敏信息:{field: {start:1,end:100} }
	desenJson?: string;
	// 主键
	id?: any;
	// 是否叶子,0-否,1-是
	leafFlag?: any;
	// 方法类型,POST,PUT,GET,DELETE
	method?: any;
	// 资源模块
	module?: any;
	// 资源名称
	name?: any;
	// 父资源编码,提供建立关系
	parentUriCode?: any;
	// 功能权限:0-否,1-是
	permFlag?: number;
	// 服务类型:0-对内,1-对外
	serviceFlag?: any;
	// 资源类型,0-模块,1-子模块,2-服务
	typeFlag?: any;
	// 资源地址
	uri?: any;
	// 资源编码,必须唯一
	uriCode?: any;
};
