import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import { depends } from '$lib/server/authorization';

const schema = z.object({
	title: z.string().nonempty(),
	text: z.any()
});

export const load: PageServerLoad = async ({ locals, url }) => {
	await depends('TEACHER', locals, url);
	const form = await superValidate(schema);

	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, schema);
		if (!form.valid) {
			return { form };
		}
		try {
			const { title, text } = form.data;
			await prisma.proposal.create({
				data: {
					title,
					text,
					status: 'ACCEPTED'
				}
			});
		} catch (error) {
			return { form };
		}
		throw redirect(303, '/teachers/proposals');
	}
};

export const ssr = false;
