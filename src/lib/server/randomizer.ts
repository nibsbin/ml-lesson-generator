import type { ContentBlock } from '@prisma/client';

/**
 * Selects a diverse set of content blocks from a pool, ensuring balanced
 * representation across categories: Theory, Python Code, and Math.
 */
export function selectBlocks(pool: ContentBlock[]): ContentBlock[] {
	const categories = ['Theory', 'Python Code', 'Math'];
	const selected: ContentBlock[] = [];

	for (const category of categories) {
		const matches = pool.filter((b) => b.type === category);
		if (matches.length > 0) {
			const pick = matches[Math.floor(Math.random() * matches.length)];
			selected.push(pick);
		}
	}

	// If fewer than 3 typed blocks were found, fill with any remaining blocks
	if (selected.length < 3) {
		const usedIds = new Set(selected.map((b) => b.id));
		const remaining = pool.filter((b) => !usedIds.has(b.id));
		const needed = 3 - selected.length;
		const shuffled = remaining.sort(() => Math.random() - 0.5);
		selected.push(...shuffled.slice(0, needed));
	}

	return selected;
}
