import { depends } from '$lib/server/authorization';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	await depends('ADMIN', locals, url);
	return {};
};
