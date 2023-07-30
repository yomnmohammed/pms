import { depends } from '$lib/server/authorization';
import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const user = await depends('TEACHER', locals, url);

	const projects = prisma.project.findMany({
		where: {
			team: {
				teachers: {
					some: {
						user_id: user.user_id
					}
				}
			}
		}
	});
	return {
		streamed: {
			projects
		}
	};
};
