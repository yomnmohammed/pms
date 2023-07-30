import { z } from 'zod';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { error, fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import type { Actions, PageServerLoad } from './$types.js';
import { depends } from '$lib/server/authorization.js';

const schema = z.object({
	name: z.string().min(5).max(30),
	identity: z.string().nonempty()
});
export const load: PageServerLoad = async ({ params: { id }, locals, url }) => {
	await depends('ADMIN', locals, url);
	const user = await prisma.authUser.findFirst({ where: { id: id }, include: { student: true } });
	if (!user) {
		throw error(404, 'Student not found.');
	}

	const form = await superValidate(user.student, schema);
	return { form };
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const form = await superValidate(request, schema);
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			const { name, identity } = form.data;

			await prisma.authUser.update({
				where: {
					id: params.id
				},
				data: {
					student: {
						upsert: {
							update: {
								name,
								identity
							},
							create: {
								name,
								identity
							}
						}
					}
				}
			});
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2002' && error.meta?.target) {
					for (const target of error.meta.target as []) {
						setError(form, target, 'اسم المستخدم موجود بالفعل');
					}
				}
			}
			return { form };
		}
		throw redirect(303, '/admin/students');
	}
};
