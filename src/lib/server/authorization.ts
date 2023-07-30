import { redirectParam } from '$lib/constants';
import type { Role } from '@prisma/client';
import { error, redirect } from '@sveltejs/kit';

export async function depends(role: Role, locals: App.Locals, url: URL) {
	const { user, session } = await locals.auth.validateUser();
	if (!session) {
		throw redirect(303, `/login?${redirectParam}=${url.pathname}`);
	}
	if (user.role !== role) {
		throw error(401, 'Unauthorized');
	}
	return user;
}
