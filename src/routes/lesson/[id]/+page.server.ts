import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { ContentBlock } from '$lib/server/types';

export const load: PageServerLoad = ({ params }) => {
	const lesson = db.lesson.findUnique({
		where: { id: params.id }
	});

	if (!lesson) {
		error(404, 'Lesson not found');
	}

	const blocks: ContentBlock[] = JSON.parse(lesson.blocks);

	return { lessonId: lesson.id, blocks };
};
