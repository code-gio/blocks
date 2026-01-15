<script lang="ts">
	import type { DateTimeFieldDef } from '$lib/components/blocks/types';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	interface Props {
		field: DateTimeFieldDef;
		value: string;
		onChange: (value: string) => void;
	}

	const { field, value = '', onChange }: Props = $props();

	let datetimeValue = $state(value);

	$effect(() => {
		datetimeValue = value;
	});

	$effect(() => {
		if (datetimeValue) {
			onChange(datetimeValue);
		}
	});

	// Convert ISO string to local datetime format for input (YYYY-MM-DDTHH:mm)
	const inputValue = $derived(() => {
		if (!datetimeValue) return '';
		try {
			const date = new Date(datetimeValue);
			if (isNaN(date.getTime())) return '';
			// Format as YYYY-MM-DDTHH:mm for datetime-local input
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');
			const hours = String(date.getHours()).padStart(2, '0');
			const minutes = String(date.getMinutes()).padStart(2, '0');
			return `${year}-${month}-${day}T${hours}:${minutes}`;
		} catch {
			return '';
		}
	});

	function handleInputChange(e: Event) {
		const target = e.currentTarget as HTMLInputElement;
		if (target.value) {
			// Convert local datetime to ISO string
			const date = new Date(target.value);
			datetimeValue = date.toISOString();
		} else {
			datetimeValue = '';
		}
	}
</script>

<div class="space-y-2">
	<Label for={field.path}>{field.label}</Label>
	<Input
		id={field.path}
		type="datetime-local"
		value={inputValue()}
		oninput={handleInputChange}
		required={field.required}
	/>
	{#if field.helperText}
		<p class="text-sm text-muted-foreground">{field.helperText}</p>
	{/if}
</div>
