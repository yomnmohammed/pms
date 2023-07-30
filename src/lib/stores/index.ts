import { writable } from 'svelte/store';
export type BreadcrumbItem = {
	label: string;
	href?: string;
};
export const breadcrumb = writable<BreadcrumbItem[]>([]);
