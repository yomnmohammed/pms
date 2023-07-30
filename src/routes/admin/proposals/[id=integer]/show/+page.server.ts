import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { depends } from '$lib/server/authorization';

export const load: PageServerLoad = async ({ params: { id }, locals, url }) => {
	await depends('ADMIN', locals, url);
	try {
		const proposal = await prisma.proposal.findFirst({
			where: {
				id: Number(id)
			}
		});
		if (!proposal) {
			throw error(404, 'not found');
		}
		return { proposal };
	} catch (e) {
		throw error(404, 'Not Found');
	}
};

export const ssr = false;
