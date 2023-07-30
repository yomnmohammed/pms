import { redirectParam } from '$lib/constants';
import { redirect } from '@sveltejs/kit';
type Status = 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308;

export function redirectTo(url: URL, to = '/', status: Status = 302): never {
	const redirectTo = url.searchParams.get(redirectParam) ?? to;
	throw redirect(status, redirectTo);
}

export function redirectIf(
	conditation: boolean,
	url: URL,
	to = '/',
	status: Status = 302
): never | void {
	if (conditation) redirectTo(url, to, status);
}
