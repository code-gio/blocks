<script lang="ts">
	import type { TextFieldDef } from '$lib/blocks/types';
	import { Label } from '$lib/components/ui/label';

	interface Props {
		field: TextFieldDef;
		value: string;
		onChange: (value: string) => void;
	}

	const { field, value = '', onChange }: Props = $props();
</script>

<div class="space-y-2">
	<Label for={field.path}>{field.label}</Label>
	<textarea
		id={field.path}
		class="border-input bg-background ring-offset-background placeholder:text-muted-foreground flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
		value={value}
		oninput={(e) => onChange(e.currentTarget.value)}
		placeholder={field.placeholder}
		required={field.required}
	/>
	{#if field.helperText}
		<p class="text-sm text-muted-foreground">{field.helperText}</p>
	{/if}
</div>
