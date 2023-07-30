import { depends } from '$lib/server/authorization';
import { auth } from '$lib/server/lucia';
import { paging } from '$lib/server/pagination';
import { prisma } from '$lib/server/prisma';
import { redirectTo } from '$lib/server/redirect';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	await depends('ADMIN', locals, url);
	const { data, meta, aggregation } = paging(url);
	const students = prisma.authUser.findMany({
		where: {
			role: { equals: 'STUDENT' }
		},
		select: {
			username: true,
			id: true,
			student: true
		},
		...data
	});
	const { _count: count } = await prisma.authUser.aggregate({
		where: {
			role: { equals: 'STUDENT' }
		},
		...aggregation,
		_count: true
	});
	return { streamed: { students }, meta: meta(count) };
};
export const actions: Actions = {
	delete: async ({ url }) => {
		const id = url.searchParams.get('id');
		if (id) auth.deleteUser(id);
		redirectTo(url);
	}
};
