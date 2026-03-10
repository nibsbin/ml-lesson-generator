<script lang="ts">
	interface Props {
		payload: string;
	}

	let { payload }: Props = $props();
</script>

<div class="prose prose-slate max-w-none rounded-lg bg-white p-6 shadow-sm">
	<p class="text-gray-700 leading-relaxed whitespace-pre-wrap">{payload}</p>
</div>
