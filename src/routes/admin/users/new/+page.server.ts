import { z } from 'zod';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { depends } from '$lib/server/authorization';

const schema = z.object({
	username: z.string(),
	password: z.string(),
	role: z.enum(['ADMIN', 'TEACHER', 'STUDENT'])
});

export const load: PageServerLoad = async ({ locals, url }) => {
	await depends('ADMIN', locals, url);
	const form = await superValidate(schema);

	return { form, message: undefined };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, schema);

		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			const { username, password, role } = form.data;
			await auth.createUser({
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
		} catch (error) {
			setError(form, 'username', 'اسم المستخدم موجود بالفعل');
			return { form };
		}
		throw redirect(303, '/admin/users');
	}
};
