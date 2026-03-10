<script lang="ts">
	import type { PageData } from './$types';
	import MarkdownBlock from '$lib/components/MarkdownBlock.svelte';
	import CodeSnippet from '$lib/components/CodeSnippet.svelte';
	import ConceptCheck from '$lib/components/ConceptCheck.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>ML Lesson</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 py-12 px-4">
	<div class="mx-auto max-w-2xl">
		<header class="mb-8 text-center">
			<h1 class="text-3xl font-bold text-gray-900">Your ML Lesson</h1>
			<p class="mt-1 text-sm text-gray-500 font-mono">ID: {data.lessonId}</p>
		</header>

		<div class="flex flex-col gap-6">
			{#each data.blocks as block (block.id)}
				<article class="flex flex-col gap-2">
					<div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
						<span class="rounded-full bg-gray-200 px-2 py-0.5">{block.domain}</span>
						<span class="text-gray-300">·</span>
						<span>Difficulty {block.difficulty_level}</span>
					</div>

					{#if block.type === 'Python Code'}
						<CodeSnippet payload={block.payload} />
					{:else if block.type === 'Math'}
						<ConceptCheck payload={block.payload} />
					{:else}
						<MarkdownBlock payload={block.payload} />
					{/if}
				</article>
			{/each}
		</div>

		<div class="mt-10 text-center">
			<a
				href="/"
				class="inline-block rounded-lg bg-indigo-600 px-8 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors shadow"
			>
				← Generate Another Lesson
			</a>
		</div>
	</div>
</div>
