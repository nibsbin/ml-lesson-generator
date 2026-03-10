import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { selectBlocks } from '$lib/server/randomizer';

export const POST: RequestHandler = () => {
	const pool = db.contentBlock.findMany();

	if (pool.length === 0) {
		return new Response(JSON.stringify({ error: 'No content blocks available.' }), {
			status: 503,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const blocks = selectBlocks(pool);

	const lesson = db.lesson.create({
		data: {
			blocks: JSON.stringify(blocks)
		}
	});

	redirect(303, `/lesson/${lesson.id}`);
};
