import { depends } from '$lib/server/authorization';
import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ locals, url, params: { id } }) => {
	const user = await depends('TEACHER', locals, url);
	const project = await prisma.project.findFirst({
		where: {
			id: Number(id),
			team: {
				is: {
					teachers: {
						some: {
							user_id: user.user_id
						}
					}
				}
			}
		},
		include: { team: true }
	});
	if (!project) {
		throw error(404, 'Not Found!');
	}
	return { project };
};

export const ssr = false;
