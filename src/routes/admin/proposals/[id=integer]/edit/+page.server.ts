import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { prisma } from '$lib/server/prisma';
import { error, redirect } from '@sveltejs/kit';
import { depends } from '$lib/server/authorization';
import { ProposalStatus } from '@prisma/client';

const schema = z.object({
	title: z.string().nonempty(),
	text: z.any(),
	status: z.union([
		z.literal(ProposalStatus.ACCEPTED),
		z.literal(ProposalStatus.PROGRESS),
		z.literal(ProposalStatus.REJECTED)
	])
});

export const load: PageServerLoad = async ({ locals, url, params: { id } }) => {
	await depends('ADMIN', locals, url);
	try {
		const proposal = await prisma.proposal.findFirst({ where: { id: Number(id) } });
		const form = await superValidate(proposal, schema);
		return { form };
	} catch (e) {
		throw error(404, 'Not founded');
	}
};

export const actions: Actions = {
	default: async ({ request, params: { id } }) => {
		const form = await superValidate(request, schema);
		if (!form.valid) {
			return { form };
		}
		try {
			const { title, text, status } = form.data;
			await prisma.proposal.update({
				where: { id: Number(id) },
				data: {
					title,
					text,
					status
				}
			});
		} catch (error) {
			return { form };
		}
		throw redirect(303, '/admin/proposals');
	}
};

export const ssr = false;
