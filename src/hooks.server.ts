import { ADMIN_PASSWORD, ADMIN_USERNAME } from '$env/static/private';
import { auth } from '$lib/server/lucia';
import { prisma } from '$lib/server/prisma';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);

	return await resolve(event);
};

// check if admin exstits or not
const adminGenerated = await prisma.setting.findUnique({
	where: {
		name: 'ADMIN_GENERATED'
	},
	select: {
		value: true
	}
});
// generate new admin
if (adminGenerated?.value === 'false' || adminGenerated === null) {
	auth.createUser({
		primaryKey: {
			providerId: 'username',
			providerUserId: ADMIN_USERNAME,
			password: ADMIN_PASSWORD
		},
		attributes: {
			username: ADMIN_USERNAME,
			role: 'ADMIN'
		}
	});
	await prisma.setting.create({
		data: {
			name: 'ADMIN_GENERATED',
			value: 'true'
		}
	});
}
