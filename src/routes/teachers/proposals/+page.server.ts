import { depends } from '$lib/server/authorization';
import { prisma } from '$lib/server/prisma';

export const load = async ({ locals, url }) => {
	await depends('TEACHER', locals, url);

	const proposals = prisma.proposal.findMany({
		select: {
			id: true,
			title: true
		}
	});
	return { streamed: { proposals } };
};
