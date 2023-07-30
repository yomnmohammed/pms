import { z } from 'zod';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { prisma } from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';
import { depends } from '$lib/server/authorization';

const schema = z.object({
	name: z.string().min(5).max(30),
	username: z.string().min(5).max(22),
	identity: z.string().nonempty(),
	password: z.string().min(8).max(255)
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
			const { username, password, name, identity } = form.data;
			const student = await auth.createUser({
				primaryKey: {
					providerId: 'username',
					providerUserId: username,
					password
				},
				attributes: {
					username,
					role: 'STUDENT'
				}
			});
			await prisma.student.create({
				data: {
					name,
					identity,
					user: {
						connect: {
							id: student.userId
						}
					}
				}
			});
		} catch (error) {
			setError(form, 'username', 'اسم المستخدم موجود بالفعل');
			return { form };
		}

		throw redirect(303, '/admin/students');
	}
};
