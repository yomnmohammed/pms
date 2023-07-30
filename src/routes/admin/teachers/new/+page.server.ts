import { z } from 'zod';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { prisma } from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';
import { depends } from '$lib/server/authorization';

const schema = z.object({
	name: z.string(),
	username: z.string(),
	degree: z.string(),
	special: z.string(),
	password: z.string(),
	role: z.enum(['TEACHER', 'ADMIN'])
});

export const load: PageServerLoad = async ({ locals, url }) => {
	await depends('ADMIN', locals, url);
	const form = await superValidate(schema);

	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, schema);
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const { username, password, name, degree, special, role } = form.data;
			const teacher = await auth.createUser({
				primaryKey: {
					providerId: 'username',
					providerUserId: username,
					password
				},
				attributes: {
					username,
					role
				}
			});
			await prisma.teacher.create({
				data: {
					name,
					degree,
					special,
					user_id: teacher.userId
				}
			});
		} catch (error) {
			setError(form, 'username', 'اسم المستخدم موجود بالفعل');
			return { form };
		}
		throw redirect(303, '/admin/teachers');
	}
};
