<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="space-y-6">
	{@render children()}
</div>
