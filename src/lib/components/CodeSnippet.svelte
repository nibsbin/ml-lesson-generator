<script lang="ts">
	interface Props {
		payload: string;
	}

	let { payload }: Props = $props();
</script>

<div class="rounded-lg bg-gray-900 p-6 shadow-sm overflow-x-auto">
	<pre class="text-green-400 text-sm font-mono whitespace-pre-wrap leading-relaxed">{payload}</pre>
</div>
