import { auth } from '$lib/server/lucia';
import { paging } from '$lib/server/pagination';
import { prisma } from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';
import { redirectTo } from '$lib/server/redirect';
import { depends } from '$lib/server/authorization';

export const load: PageServerLoad = async ({ locals, url }) => {
	await depends('ADMIN', locals, url);
	const { data, meta, aggregation } = paging(url);
	const users = prisma.authUser.findMany(data);
	const { _count: count } = await prisma.authUser.aggregate({
		...aggregation,
		_count: true
	});
	return { streamed: { users }, meta: meta(count) };
};

export const actions: Actions = {
	delete: async ({ url }) => {
		const id = url.searchParams.get('id');
		if (id) auth.deleteUser(id);
		redirectTo(url);
	}
};
