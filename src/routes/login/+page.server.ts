import { z } from 'zod';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';

import { auth } from '$lib/server/lucia';
import type { Actions, PageServerLoad } from './$types.js';
import { redirectIf } from '$lib/server/redirect.js';
const schema = z.object({
	username: z.string().min(5),
	password: z.string().min(8).max(72)
});

export const load: PageServerLoad = async ({ locals, url }) => {
	const session = await locals.auth.validate();
	redirectIf(!!session, url);

	const form = await superValidate(schema);
	return { form };
};
export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, schema);

		if (!form.valid) {
			return fail(400, { form });
		}
		const { username, password } = form.data;
		try {
			const key = await auth.useKey('username', username, password);
			const session = await auth.createSession(key.userId);
			locals.auth.setSession(session);
		} catch (e) {
			setError(form, 'username', 'اسم المستخدم غير صحيح');
			setError(form, 'password', 'كلمة المرور غير صحيحة');
		}
		return { form };
	}
};
