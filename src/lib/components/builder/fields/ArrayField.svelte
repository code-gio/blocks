<script lang="ts">
	import type { ArrayFieldDef } from '$lib/components/blocks/types';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Plus, Trash2 } from '@lucide/svelte';
	import FormRenderer from '../FormRenderer.svelte';
	import {
		addArrayItem,
		removeArrayItemById,
		getValueByPath,
		setValueByPath
	} from '../utils/path-utils';
	import type { BlockInstance } from '$lib/components/blocks/types';

	interface Props {
		field: ArrayFieldDef;
		block: BlockInstance;
		value: Array<Record<string, unknown>>;
		onChange: () => void;
	}

	const { field, block, value = [], onChange }: Props = $props();

	function addItem() {
		const newItem: Record<string, unknown> = {};
		// Initialize with defaults from item schema if any
		for (const itemField of field.itemSchema) {
			if (itemField.kind === 'string' || itemField.kind === 'text' || itemField.kind === 'richText') {
				newItem[itemField.path] = '';
			} else if (itemField.kind === 'boolean') {
				newItem[itemField.path] = false;
			} else if (itemField.kind === 'number') {
				newItem[itemField.path] = 0;
			} else if (itemField.kind === 'icon') {
				newItem[itemField.path] = '';
			} else if (itemField.kind === 'enum') {
				// Use first option as default if available
				newItem[itemField.path] = itemField.options[0]?.value ?? '';
			} else if (itemField.kind === 'link') {
				newItem[itemField.path] = { href: '', label: '', target: '_self' };
			} else if (itemField.kind === 'image') {
				newItem[itemField.path] = { src: '', alt: '', fit: 'cover' };
			} else if (itemField.kind === 'date' || itemField.kind === 'datetime') {
				newItem[itemField.path] = '';
			} else if (itemField.kind === 'object') {
				// Initialize object with empty values for child fields
				newItem[itemField.path] = {};
				for (const childField of itemField.fields) {
					if (childField.kind === 'string' || childField.kind === 'text' || childField.kind === 'richText') {
						(newItem[itemField.path] as Record<string, unknown>)[childField.path] = '';
					} else if (childField.kind === 'boolean') {
						(newItem[itemField.path] as Record<string, unknown>)[childField.path] = false;
					} else if (childField.kind === 'number') {
						(newItem[itemField.path] as Record<string, unknown>)[childField.path] = 0;
					} else if (childField.kind === 'link') {
						(newItem[itemField.path] as Record<string, unknown>)[childField.path] = {
							href: '',
							label: '',
							target: '_self'
						};
					} else if (childField.kind === 'image') {
						(newItem[itemField.path] as Record<string, unknown>)[childField.path] = {
							src: '',
							alt: '',
							fit: 'cover'
						};
					} else if (childField.kind === 'date' || childField.kind === 'datetime') {
						(newItem[itemField.path] as Record<string, unknown>)[childField.path] = '';
					}
				}
			}
		}
		addArrayItem(block.props, field.path, newItem);
		onChange();
	}

	function removeItem(id: string) {
		removeArrayItemById(block.props, field.path, id);
		onChange();
	}

</script>

<div class="space-y-2">
	<div class="flex items-center justify-between">
		<Label>{field.label}</Label>
		<Button type="button" size="sm" onclick={addItem}>
			<Plus class="h-4 w-4 mr-1" />
			Add Item
		</Button>
	</div>

	<div class="space-y-4">
		{#each value as item (item._id as string)}
			{@const itemId = (item as Record<string, unknown>)._id as string}
			{@const itemIndex = value.findIndex((i) => (i as Record<string, unknown>)._id === itemId)}
			<Card>
				<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle class="text-sm font-medium">Item {itemIndex + 1}</CardTitle>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						onclick={() => removeItem(itemId)}
					>
						<Trash2 class="h-4 w-4" />
					</Button>
				</CardHeader>
				<CardContent>
					{#each field.itemSchema as itemField}
						{@const itemValue = (item as Record<string, unknown>)[itemField.path]}
						<FormRenderer
							field={itemField}
							block={block}
							value={itemValue}
							onChange={(newValue) => {
								const fullPath = `${field.path}[${itemIndex}].${itemField.path}`;
								setValueByPath(block.props, fullPath, newValue);
								onChange();
							}}
						/>
					{/each}
				</CardContent>
			</Card>
		{/each}
	</div>

	{#if field.helperText}
		<p class="text-sm text-muted-foreground">{field.helperText}</p>
	{/if}
</div>
