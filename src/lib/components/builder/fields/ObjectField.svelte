<script lang="ts">
	import type { ObjectFieldDef } from '$lib/components/blocks/types';
	import { Label } from '$lib/components/ui/label';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import FormRenderer from '../FormRenderer.svelte';
	import { getValueByPath, setValueByPath } from '../utils/path-utils';
	import type { BlockInstance } from '$lib/components/blocks/types';

	interface Props {
		field: ObjectFieldDef;
		block: BlockInstance;
		onChange: (value: unknown) => void;
	}

	const { field, block, onChange }: Props = $props();
</script>

<div class="space-y-2">
	<Label>{field.label}</Label>
	<Card>
		{#if field.label}
			<CardHeader class="pb-3">
				<CardTitle class="text-sm font-medium">{field.label}</CardTitle>
			</CardHeader>
		{/if}
		<CardContent class="space-y-4">
			{#each field.fields as childField}
				{@const fullPath = `${field.path}.${childField.path}`}
				{@const childValue = getValueByPath(block.props, fullPath)}
				<FormRenderer
					field={{ ...childField, path: fullPath }}
					block={block}
					value={childValue}
					onChange={(newValue) => {
						setValueByPath(block.props, fullPath, newValue);
						onChange(newValue);
					}}
				/>
			{/each}
		</CardContent>
	</Card>
	{#if field.helperText}
		<p class="text-sm text-muted-foreground">{field.helperText}</p>
	{/if}
</div>
