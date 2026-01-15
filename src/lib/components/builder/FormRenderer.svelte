<script lang="ts">
	import type { FieldDef, BlockInstance } from '$lib/components/blocks/types';
	import StringField from './fields/StringField.svelte';
	import TextField from './fields/TextField.svelte';
	import NumberField from './fields/NumberField.svelte';
	import EnumField from './fields/EnumField.svelte';
	import BooleanField from './fields/BooleanField.svelte';
	import IconField from './fields/IconField.svelte';
	import LinkField from './fields/LinkField.svelte';
	import ImageField from './fields/ImageField.svelte';
	import DateField from './fields/DateField.svelte';
	import DateTimeField from './fields/DateTimeField.svelte';
	import ObjectField from './fields/ObjectField.svelte';
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
{:else if field.kind === 'number'}
	<NumberField field={field} value={Number(fieldValue ?? 0)} onChange={handleChange} />
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
{:else if field.kind === 'link'}
	<LinkField
		field={field}
		value={(fieldValue ?? { href: '', label: '', target: '_self' }) as { href: string; label?: string; target?: '_self' | '_blank' }}
		onChange={handleChange}
	/>
{:else if field.kind === 'image'}
	<ImageField
		field={field}
		value={(fieldValue ?? { src: '', alt: '', fit: 'cover' }) as { src: string; alt: string; width?: number; height?: number; fit?: 'cover' | 'contain' }}
		onChange={handleChange}
	/>
{:else if field.kind === 'date'}
	<DateField field={field} value={String(fieldValue ?? '')} onChange={handleChange} />
{:else if field.kind === 'datetime'}
	<DateTimeField field={field} value={String(fieldValue ?? '')} onChange={handleChange} />
{:else if field.kind === 'object'}
	<ObjectField field={field} block={block} onChange={handleChange} />
{:else if field.kind === 'array'}
	<ArrayField
		field={field}
		block={block}
		value={(fieldValue ?? []) as Array<Record<string, unknown>>}
		onChange={() => handleChange(fieldValue)}
	/>
{/if}
