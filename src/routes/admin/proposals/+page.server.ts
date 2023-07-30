import { depends } from '$lib/server/authorization';
import { paging } from '$lib/server/pagination';
import { prisma } from '$lib/server/prisma';
import { redirectTo } from '$lib/server/redirect';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	await depends('ADMIN', locals, url);
	const { data, meta, aggregation } = paging(url);
	const proposals = prisma.proposal.findMany(data);
	const { _count: count } = await prisma.proposal.aggregate({
		...aggregation,
		_count: true
	});
	return { streamed: { proposals }, meta: meta(count) };
};

export const actions: Actions = {
	delete: async ({ url }) => {
		const id = Number(url.searchParams.get('id'));
		if (id && typeof id === 'number') await prisma.proposal.delete({ where: { id: id } });
		redirectTo(url);
	}
};
