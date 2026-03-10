<script lang="ts">
	let loading = $state(false);

	async function generate() {
		loading = true;
		try {
			const response = await fetch('/api/generate', { method: 'POST' });
			if (response.redirected) {
				window.location.href = response.url;
			}
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>ML Lesson Generator</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center px-4">
	<div class="text-center max-w-lg">
		<div class="mb-6 text-6xl">🤖</div>
		<h1 class="text-4xl font-extrabold text-gray-900 mb-3">ML Lesson Generator</h1>
		<p class="text-gray-500 text-lg mb-10">
			Instantly generate a personalized Machine Learning lesson from our curated content library.
			Each lesson blends theory, code, and concept checks.
		</p>
		<button
			onclick={generate}
			disabled={loading}
			aria-label={loading ? 'Generating lesson, please wait' : 'Generate new lesson'}
			class="rounded-xl bg-indigo-600 px-10 py-4 text-lg font-bold text-white shadow-lg hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
		>
			{loading ? '⏳ Generating…' : '✨ Generate Lesson'}
		</button>
	</div>
</div>

