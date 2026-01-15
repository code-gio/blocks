<script lang="ts">
	import type { FieldDef, BlockInstance } from '$lib/blocks/types';
	import StringField from './fields/StringField.svelte';
	import TextField from './fields/TextField.svelte';
	import EnumField from './fields/EnumField.svelte';
	import BooleanField from './fields/BooleanField.svelte';
	import IconField from './fields/IconField.svelte';
	import ArrayField from './fields/ArrayField.svelte';
	import { getValueByPath, setValueByPath } from './utils/path-utils';

	interface Props {
		field: FieldDef;
		block: BlockInstance;
		value?: unknown;
		onChange: (value: unknown) => void;
	}

	const { field, block, value, onChange }: Props = $props();

	const fieldValue = $derived.by(() => {
		return value !== undefined ? value : getValueByPath(block.props, field.path);
	});

	function handleChange(newValue: unknown) {
		setValueByPath(block.props, field.path, newValue);
		onChange(newValue);
	}
</script>

{#if field.kind === 'string'}
	<StringField field={field} value={String(fieldValue ?? '')} onChange={handleChange} />
{:else if field.kind === 'text'}
	<TextField field={field} value={String(fieldValue ?? '')} onChange={handleChange} />
{:else if field.kind === 'enum'}
	{@const handleEnumChange = (v: string) => {
		// Convert string to number for columns field
		if (field.path === 'columns' && !isNaN(Number(v))) {
			handleChange(Number(v));
		} else {
			handleChange(v);
		}
	}}
	<EnumField field={field} value={String(fieldValue ?? '')} onChange={handleEnumChange} />
{:else if field.kind === 'boolean'}
	<BooleanField field={field} value={Boolean(fieldValue)} onChange={handleChange} />
{:else if field.kind === 'icon'}
	<IconField field={field} value={String(fieldValue ?? '')} onChange={handleChange} />
{:else if field.kind === 'array'}
	<ArrayField
		field={field}
		block={block}
		value={(fieldValue ?? []) as Array<Record<string, unknown>>}
		onChange={() => handleChange(fieldValue)}
	/>
{/if}
