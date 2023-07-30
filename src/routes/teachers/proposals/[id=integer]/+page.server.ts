import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { depends } from '$lib/server/authorization';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
const schema = zfd.formData({
	id: zfd.numeric(),
	name: zfd.text(),
	team: zfd.json(
		z.object({
			id: z.number(),
			name: z.string().nonempty()
		})
	)
});
export const load: PageServerLoad = async ({ params: { id }, locals, url }) => {
	const user = await depends('TEACHER', locals, url);
	try {
		const proposal = await prisma.proposal.findFirst({
			where: {
				id: Number(id)
			}
		});
		const teams = await prisma.team.findMany({
			where: {
				project: {
					is: null
				},
				AND: {
					teachers: {
						some: {
							user_id: user.user_id
						}
					}
				}
			},
			select: {
				id: true,
				name: true
			}
		});

		if (!proposal) {
			throw error(404, 'not found');
		}
		return { proposal, teams };
	} catch (e) {
		throw error(404, 'Not Found');
	}
};

export const actions: Actions = {
	default: async ({ request }) => {
		try {
			const result = schema.parse(await request.formData());

			await prisma.project.create({
				data: {
					propsal_id: result.id,
					name: result.name,
					team_id: result.team.id
				}
			});
			return { success: true };
		} catch (err) {
			return { error: err };
		}
	}
};

export const ssr = false;
