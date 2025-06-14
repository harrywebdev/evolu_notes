<script lang="ts">
	export let title: string;
</script>

<div class="flex items-center justify-between gap-2">
	<div class="flex items-center">
		<a href="/settings" class="flex items-center px-2 text-2xl text-gray-400">☰</a>
		<h1 class="pl-1 text-2xl font-medium">{title}</h1>
	</div>

	<slot name="action" />
</div>
