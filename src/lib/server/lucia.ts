import prismaAdapter from '@lucia-auth/adapter-prisma';
import lucia from 'lucia-auth';
import { prisma } from '$lib/server/prisma';
import { dev } from '$app/environment';
import { sveltekit } from 'lucia-auth/middleware';

export const auth = lucia({
	adapter: prismaAdapter(prisma),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	transformDatabaseUser: (userData) => {
		return {
			userId: userData.id,
			username: userData.username,
			role: userData.role
		};
	}
});
export type Auth = typeof auth;
