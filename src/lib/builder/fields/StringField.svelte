<script lang="ts">
	import type { StringFieldDef } from '$lib/blocks/types';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	interface Props {
		field: StringFieldDef;
		value: string;
		onChange: (value: string) => void;
	}

	const { field, value = '', onChange }: Props = $props();
</script>

<div class="space-y-2">
	<Label for={field.path}>{field.label}</Label>
	<Input
		id={field.path}
		type="text"
		value={value}
		oninput={(e) => onChange(e.currentTarget.value)}
		placeholder={field.placeholder}
		required={field.required}
	/>
	{#if field.helperText}
		<p class="text-sm text-muted-foreground">{field.helperText}</p>
	{/if}
</div>
