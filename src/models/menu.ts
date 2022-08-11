export interface MenuItem {
	title: string;
	highlightTitle?: string;
	key?: string;
	icon?: string;
	path?: string;
	children?: MenuItem[];
}
