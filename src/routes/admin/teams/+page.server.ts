import { depends } from '$lib/server/authorization';
import { paging } from '$lib/server/pagination';
import { prisma } from '$lib/server/prisma';
import { redirectTo } from '$lib/server/redirect';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	await depends('ADMIN', locals, url);
	const { data, meta, aggregation } = paging(url);
	const teams = prisma.team.findMany({
		select: {
			id: true,
			students: true,
			teachers: true,
			name: true
		},
		...data
	});
	const { _count: count } = await prisma.team.aggregate({
		...aggregation,
		_count: true
	});
	return {
		meta: meta(count),
		streamed: { teams }
	};
};

export const actions: Actions = {
	delete: async ({ url }) => {
		const id = Number(url.searchParams.get('id'));
		if (typeof id === 'number') {
			try {
				await prisma.team.delete({
					where: {
						id: id
					}
				});
			} catch (err) {
				console.log(err);
			}
		}
		redirectTo(url);
	}
};
