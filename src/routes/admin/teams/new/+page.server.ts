import type { Actions, PageServerLoad } from './$types';

import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import { depends } from '$lib/server/authorization';

export const load: PageServerLoad = async ({ locals, url }) => {
	await depends('ADMIN', locals, url);
	const students = prisma.student.findMany({
		select: { id: true, name: true },
		where: {
			team_id: null
		}
	});
	const teachers = prisma.teacher.findMany({
		select: { id: true, name: true }
	});
	return {
		streamed: {
			students,
			teachers
		}
	};
};
export const actions: Actions = {
	default: async ({ request }) => {
		try {
			const form = await request.formData();
			const students: { id: number; name: string }[] = JSON.parse(form.get('students') as string);
			const teachers: { id: number; name: string }[] = JSON.parse(form.get('teachers') as string);
			const name: string = form.get('name') as string;
			console.log(form.get(name));
			const studentsIndexes = students.map((s) => ({ id: s.id }));
			const teachersIndexes = teachers.map((s) => ({ id: s.id }));
			await prisma.team.create({
				data: {
					name,
					students: {
						connect: studentsIndexes
					},
					teachers: {
						connect: teachersIndexes
					}
				}
			});
		} catch (err) {
			return { success: false };
		}
		throw redirect(302, '/admin/teams');
	}
};

export const ssr = false;
