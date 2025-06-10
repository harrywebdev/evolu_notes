<script lang="ts">
	export let href: string;
	export let testId: string | undefined = undefined;
	export let className: string = '';
</script>

<a
	{href}
	data-testid={testId}
	class="block px-2 py-1 text-blue-600 underline underline-offset-2 first:pl-0 {className}"
>
	<slot />
</a>
