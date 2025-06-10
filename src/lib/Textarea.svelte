<script lang="ts">
	export let id: string;
	export let label: string;
	export let value: string = '';
	export let placeholder: string = '';
	export let required: boolean = false;
	export let rows: number = 4;
</script>

<div class="space-y-2">
	<label for={id} class="block text-sm font-medium text-gray-700">
		{label}
	</label>
	<textarea
		{id}
		bind:value
		{placeholder}
		{required}
		{rows}
		class="w-full resize-y rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
	></textarea>
</div>
