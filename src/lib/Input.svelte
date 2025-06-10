<script lang="ts">
	export let id: string;
	export let label: string;
	export let value: string = '';
	export let placeholder: string = '';
	export let required: boolean = false;
	export let type: string = 'text';
</script>

<div class="space-y-2">
	<label for={id} class="block text-sm font-medium text-gray-700">
		{label}
	</label>
	<input
		{id}
		{type}
		bind:value
		{placeholder}
		{required}
		class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
	/>
</div>
