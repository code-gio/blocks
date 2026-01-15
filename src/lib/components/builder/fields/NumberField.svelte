<script lang="ts">
	import type { NumberFieldDef } from '$lib/components/blocks/types';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	interface Props {
		field: NumberFieldDef;
		value: number;
		onChange: (value: number) => void;
	}

	const { field, value = 0, onChange }: Props = $props();
</script>

<div class="space-y-2">
	<Label for={field.path}>{field.label}</Label>
	<Input
		id={field.path}
		type="number"
		value={value}
		oninput={(e) => {
			const num = parseFloat(e.currentTarget.value);
			onChange(isNaN(num) ? 0 : num);
		}}
		min={field.min}
		max={field.max}
		step={field.step ?? 1}
		placeholder={field.placeholder}
		required={field.required}
	/>
	{#if field.helperText}
		<p class="text-sm text-muted-foreground">{field.helperText}</p>
	{/if}
</div>
