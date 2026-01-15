<script lang="ts">
	import type { DateFieldDef } from '$lib/components/blocks/types';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	interface Props {
		field: DateFieldDef;
		value: string;
		onChange: (value: string) => void;
	}

	const { field, value = '', onChange }: Props = $props();

	let dateValue = $state(value);

	$effect(() => {
		dateValue = value;
	});

	$effect(() => {
		if (dateValue) {
			onChange(dateValue);
		}
	});

	// Convert ISO string to local date format for input (YYYY-MM-DD)
	const inputValue = $derived(() => {
		if (!dateValue) return '';
		try {
			const date = new Date(dateValue);
			if (isNaN(date.getTime())) return '';
			return date.toISOString().split('T')[0];
		} catch {
			return '';
		}
	});

	function handleInputChange(e: Event) {
		const target = e.currentTarget as HTMLInputElement;
		if (target.value) {
			// Convert local date to ISO string
			const date = new Date(target.value + 'T00:00:00');
			dateValue = date.toISOString();
		} else {
			dateValue = '';
		}
	}
</script>

<div class="space-y-2">
	<Label for={field.path}>{field.label}</Label>
	<Input
		id={field.path}
		type="date"
		value={inputValue()}
		oninput={handleInputChange}
		required={field.required}
	/>
	{#if field.helperText}
		<p class="text-sm text-muted-foreground">{field.helperText}</p>
	{/if}
</div>
