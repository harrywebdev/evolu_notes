<script lang="ts">
	import { Input, Textarea, Button } from '$lib';
	export let title: string;
	export let content: string;
	export let onSubmit: () => void;
	export let buttonLabel: string = 'save';
</script>

<form on:submit|preventDefault={onSubmit} class="space-y-4">
	<Input id="title" label="title" bind:value={title} placeholder="enter note title..." required />

	<Textarea
		id="content"
		label="content"
		bind:value={content}
		placeholder="write your note in markdown..."
		rows={12}
		required
	/>

	<div class="flex gap-3">
		<Button type="submit" variant="primary">{buttonLabel}</Button>
	</div>
</form>
