import { page } from '$app/stores';
import { redirectParam } from '$lib/constants';
import { get } from 'svelte/store';

export function calculateRedirectToTablePage(): string {
	return `&${redirectParam}=${get(page).url.href}`;
}
