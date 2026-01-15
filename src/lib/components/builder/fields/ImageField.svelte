<script lang="ts">
	import type { ImageFieldDef } from '$lib/components/blocks/types';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import { Card, CardContent } from '$lib/components/ui/card';

	interface Props {
		field: ImageFieldDef;
		value: {
			src: string;
			alt: string;
			width?: number;
			height?: number;
			fit?: 'cover' | 'contain';
		};
		onChange: (value: {
			src: string;
			alt: string;
			width?: number;
			height?: number;
			fit?: 'cover' | 'contain';
		}) => void;
	}

	const {
		field,
		value = { src: '', alt: '', width: undefined, height: undefined, fit: 'cover' },
		onChange
	}: Props = $props();

	let srcValue = $state(value.src ?? '');
	let altValue = $state(value.alt ?? '');
	let widthValue = $state(String(value.width ?? ''));
	let heightValue = $state(String(value.height ?? ''));
	let fitValue = $state(value.fit ?? 'cover');

	// Sync state when value prop changes
	$effect(() => {
		srcValue = value.src ?? '';
		altValue = value.alt ?? '';
		widthValue = value.width ? String(value.width) : '';
		heightValue = value.height ? String(value.height) : '';
		fitValue = value.fit ?? 'cover';
	});

	// Call onChange when state changes
	$effect(() => {
		const currentValue = {
			src: srcValue,
			alt: altValue,
			width: widthValue ? Number(widthValue) : undefined,
			height: heightValue ? Number(heightValue) : undefined,
			fit: fitValue
		};
		if (
			currentValue.src !== value.src ||
			currentValue.alt !== value.alt ||
			currentValue.width !== value.width ||
			currentValue.height !== value.height ||
			currentValue.fit !== value.fit
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
				<Label for={`${field.path}-src`}>Image URL</Label>
				<Input
					id={`${field.path}-src`}
					type="url"
					placeholder="https://example.com/image.jpg"
					bind:value={srcValue}
					required={field.required}
				/>
				{#if srcValue}
					<div class="mt-2">
						<img
							src={srcValue}
							alt={altValue || 'Preview'}
							class="max-w-full h-auto rounded border"
							style="max-height: 200px; object-fit: {fitValue};"
						/>
					</div>
				{/if}
			</div>
			<div class="space-y-2">
				<Label for={`${field.path}-alt`}>Alt text</Label>
				<Input
					id={`${field.path}-alt`}
					type="text"
					placeholder="Description of image"
					bind:value={altValue}
					required={field.required}
				/>
			</div>
			<div class="grid grid-cols-2 gap-4">
				<div class="space-y-2">
					<Label for={`${field.path}-width`}>Width (px)</Label>
					<Input
						id={`${field.path}-width`}
						type="number"
						placeholder="Auto"
						bind:value={widthValue}
					/>
				</div>
				<div class="space-y-2">
					<Label for={`${field.path}-height`}>Height (px)</Label>
					<Input
						id={`${field.path}-height`}
						type="number"
						placeholder="Auto"
						bind:value={heightValue}
					/>
				</div>
			</div>
			<div class="space-y-2">
				<Label for={`${field.path}-fit`}>Fit</Label>
				<Select.Root type="single" bind:value={fitValue}>
					<Select.Trigger id={`${field.path}-fit`} class="w-full">
						{fitValue === 'cover' ? 'Cover' : 'Contain'}
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="cover" label="Cover">Cover</Select.Item>
						<Select.Item value="contain" label="Contain">Contain</Select.Item>
					</Select.Content>
				</Select.Root>
			</div>
		</CardContent>
	</Card>
	{#if field.helperText}
		<p class="text-sm text-muted-foreground">{field.helperText}</p>
	{/if}
</div>
