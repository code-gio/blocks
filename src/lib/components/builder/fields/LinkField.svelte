<script lang="ts">
	import type { LinkFieldDef } from '$lib/components/blocks/types';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import { Card, CardContent } from '$lib/components/ui/card';

	interface Props {
		field: LinkFieldDef;
		value: { href: string; label?: string; target?: '_self' | '_blank' };
		onChange: (value: { href: string; label?: string; target?: '_self' | '_blank' }) => void;
	}

	const { field, value = { href: '', label: '', target: '_self' }, onChange }: Props = $props();

	let hrefValue = $state(value.href ?? '');
	let labelValue = $state(value.label ?? '');
	let targetValue = $state(value.target ?? '_self');

	// Sync state when value prop changes
	$effect(() => {
		hrefValue = value.href ?? '';
		labelValue = value.label ?? '';
		targetValue = value.target ?? '_self';
	});

	// Call onChange when state changes
	$effect(() => {
		const currentValue = {
			href: hrefValue,
			label: labelValue || undefined,
			target: targetValue
		};
		if (
			currentValue.href !== value.href ||
			currentValue.label !== value.label ||
			currentValue.target !== value.target
		) {
			onChange(currentValue);
		}
	});
</script>

<div class="space-y-2">
	<Label>{field.label}</Label>
	<Card>
		<CardContent class="space-y-4 pt-6">
			<div class="space-y-2">
				<Label for={`${field.path}-href`}>URL</Label>
				<Input
					id={`${field.path}-href`}
					type="url"
					placeholder="https://example.com"
					bind:value={hrefValue}
					required={field.required}
				/>
			</div>
			<div class="space-y-2">
				<Label for={`${field.path}-label`}>Label (optional)</Label>
				<Input
					id={`${field.path}-label`}
					type="text"
					placeholder="Link text"
					bind:value={labelValue}
				/>
			</div>
			<div class="space-y-2">
				<Label for={`${field.path}-target`}>Target</Label>
				<Select.Root type="single" bind:value={targetValue}>
					<Select.Trigger id={`${field.path}-target`} class="w-full">
						{targetValue === '_blank' ? 'Open in new tab' : 'Open in same tab'}
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="_self" label="Same tab">Open in same tab</Select.Item>
						<Select.Item value="_blank" label="New tab">Open in new tab</Select.Item>
					</Select.Content>
				</Select.Root>
			</div>
		</CardContent>
	</Card>
	{#if field.helperText}
		<p class="text-sm text-muted-foreground">{field.helperText}</p>
	{/if}
</div>
