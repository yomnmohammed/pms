import type { PageServerLoad } from './$types';
import { depends } from '$lib/server/authorization';

export const load: PageServerLoad = async ({ locals, url }) => {
	await depends('TEACHER', locals, url);

	return {};
};
