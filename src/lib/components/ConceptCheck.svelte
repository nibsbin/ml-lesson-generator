<script lang="ts">
	interface Props {
		payload: string;
	}

	let { payload }: Props = $props();

	let answer = $state('');
	let submitted = $state(false);

	function submit() {
		submitted = true;
	}
</script>

<div class="rounded-lg border-2 border-indigo-200 bg-indigo-50 p-6 shadow-sm">
	<h3 class="text-lg font-semibold text-indigo-800 mb-3">🧠 Concept Check</h3>
	<p class="text-gray-700 mb-4 whitespace-pre-wrap">{payload}</p>

	{#if !submitted}
		<div class="flex gap-3">
			<input
				type="text"
				bind:value={answer}
				placeholder="Your answer…"
				class="flex-1 rounded-md border border-indigo-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
			/>
			<button
				onclick={submit}
				class="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
			>
				Submit
			</button>
		</div>
	{:else}
		<p class="text-indigo-600 font-medium text-sm">
			✅ Answer recorded: <span class="italic">{answer}</span>
		</p>
	{/if}
</div>
