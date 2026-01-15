<script lang="ts">
	import type { EnumFieldDef } from '$lib/blocks/types';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';

	interface Props {
		field: EnumFieldDef;
		value: string;
		onChange: (value: string) => void;
	}

	const { field, value = '', onChange }: Props = $props();
	
	let selectValue = $state(value);
	
	// Sync selectValue when value prop changes
	$effect(() => {
		selectValue = value;
	});
	
	// Call onChange when selectValue changes
	$effect(() => {
		const currentValue = selectValue;
		if (currentValue !== value) {
			onChange(currentValue);
		}
	});

	const triggerContent = $derived(
		String(field.options.find((opt) => opt.value === selectValue)?.label ?? field.placeholder ?? 'Select an option')
	);
</script>

<div class="space-y-2">
	<Label for={field.path}>{field.label}</Label>
	<Select.Root type="single" bind:value={selectValue}>
		<Select.Trigger id={field.path} class="w-full">
			{triggerContent}
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				{#each field.options as option (option.value)}
					<Select.Item value={option.value} label={option.label}>
						{option.label}
					</Select.Item>
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
	{#if field.helperText}
		<p class="text-sm text-muted-foreground">{field.helperText}</p>
	{/if}
</div>
