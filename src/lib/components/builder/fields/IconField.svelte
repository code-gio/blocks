<script lang="ts">
	import type { IconFieldDef } from '$lib/components/blocks/types';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import IconSelector from './IconSelector.svelte';
	import { getIcon } from '$lib/components/blocks/icon-registry.js';

	interface Props {
		field: IconFieldDef;
		value: string;
		onChange: (value: string) => void;
	}

	const { field, value = '', onChange }: Props = $props();

	let showSelector = $state(false);

	const Icon = $derived(() => getIcon(value));
</script>

<div class="space-y-2">
	<Label>{field.label}</Label>
	<Button
		type="button"
		variant="outline"
		onclick={() => (showSelector = !showSelector)}
		class="w-full justify-start gap-2"
	>
		{#if value}
			<Icon class="h-4 w-4" />
			<span>{value}</span>
		{:else}
			<span>Select icon</span>
		{/if}
	</Button>
	{#if showSelector}
		<div class="mt-2">
			<IconSelector value={value} onChange={onChange} onClose={() => (showSelector = false)} />
		</div>
	{/if}
	{#if field.helperText}
		<p class="text-sm text-muted-foreground">{field.helperText}</p>
	{/if}
</div>
