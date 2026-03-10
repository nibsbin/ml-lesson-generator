export interface ContentBlock {
	id: string;
	domain: string;
	type: string;
	payload: string;
	difficulty_level: number;
	createdAt: Date;
}

export interface Lesson {
	id: string;
	blocks: string;
	createdAt: Date;
}
