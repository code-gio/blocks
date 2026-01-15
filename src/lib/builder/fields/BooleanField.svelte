<script lang="ts">
	import type { BooleanFieldDef } from '$lib/blocks/types';
	import { Label } from '$lib/components/ui/label';
	import { Checkbox } from '$lib/components/ui/checkbox';

	interface Props {
		field: BooleanFieldDef;
		value: boolean;
		onChange: (value: boolean) => void;
	}

	const { field, value = false, onChange }: Props = $props();
</script>

<div class="flex items-center space-x-2">
	<Checkbox id={field.path} checked={value} onCheckedChange={(checked) => onChange(!!checked)} />
	<Label for={field.path} class="cursor-pointer">
		{field.label}
	</Label>
</div>
{#if field.helperText}
	<p class="text-sm text-muted-foreground mt-1">{field.helperText}</p>
{/if}
