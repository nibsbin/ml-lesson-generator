import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { ContentBlock } from '@prisma/client';

export const load: PageServerLoad = async ({ params }) => {
	const lesson = await db.lesson.findUnique({
		where: { id: params.id }
	});

	if (!lesson) {
		error(404, 'Lesson not found');
	}

	const blocks: ContentBlock[] = JSON.parse(lesson.blocks);

	return { lessonId: lesson.id, blocks };
};
