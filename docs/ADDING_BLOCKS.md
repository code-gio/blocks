# Adding New Block Components

This guide explains how to add new block types to the block builder system.

## Overview

Each block type requires three files:
1. **Component** - The Svelte component that renders the block
2. **Definition** - TypeScript file with schema, defaults, and UI manifest
3. **Registration** - Add to registry and catalog

## Step-by-Step Process

### 1. Create Component Directory

Create a new directory for your block type:

```bash
mkdir -p src/lib/components/blocks/components/{block-type}
mkdir -p src/lib/components/blocks/definitions/{block-type}
```

**Example:**
```bash
mkdir -p src/lib/components/blocks/components/hero
mkdir -p src/lib/components/blocks/definitions/hero
```

### 2. Create the Component

Create your Svelte component in `src/lib/components/blocks/components/{block-type}/ComponentName.svelte`:

```svelte
<script lang="ts">
	import type { Variant, Density, Align } from '../../types';
	import { getIcon } from '../../icon-registry';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	interface Props {
		title?: string;
		description?: string;
		variant?: Variant;
		// ... other props
	}

	const {
		title = '',
		description = '',
		variant = 'default'
		// ... defaults
	}: Props = $props();
</script>

<section class="py-12">
	<div class="container mx-auto px-4">
		<!-- Your component markup here -->
		<!-- Use shadcn components, no explicit Tailwind colors -->
	</div>
</section>
```

**Requirements:**
- ✅ Use Svelte 5 runes: `$props()`, `$state()`, `$derived()`
- ✅ NO `export let` - use `$props()` instead
- ✅ Use shadcn/ui components (Button, Card, etc.)
- ✅ NO explicit Tailwind colors (no `text-gray-900`, `bg-white`, etc.)
- ✅ Use shadcn tokens: `text-muted-foreground`, `border`, etc.
- ✅ Icons via `getIcon(iconKey)` from icon registry
- ✅ Support variant props: `variant`, `density`, `align`, `columns` (as needed)

### 3. Create the Definition

Create `src/lib/components/blocks/definitions/{block-type}/{block-type}.section.ts`:

```typescript
import { z } from 'zod';
import type { BlockDefinition } from '../../types';
import YourComponent from '../../components/{block-type}/YourComponent.svelte';

// Define Zod schema for props validation
const propsSchema = z.object({
	title: z.string().optional(),
	description: z.string().optional(),
	// ... other fields
	variant: z.enum(['default', 'secondary', 'outline']).optional().default('default'),
	density: z.enum(['compact', 'comfortable']).optional().default('comfortable'),
	align: z.enum(['left', 'center', 'right']).optional().default('left'),
});

export const yourBlockDefinition: BlockDefinition = {
	type: 'your.block.type',
	displayName: 'Your Block Name',
	version: 1, // Start at 1, increment when props change
	defaults: {
		title: 'Default Title',
		description: 'Default description',
		// ... default values matching schema
		variant: 'default',
		density: 'comfortable',
		align: 'left',
	},
	schema: propsSchema,
	ui: [
		{
			path: 'title',
			label: 'Title',
			kind: 'string',
			placeholder: 'Enter title'
		},
		{
			path: 'description',
			label: 'Description',
			kind: 'text',
			placeholder: 'Enter description'
		},
		{
			path: 'variant',
			label: 'Variant',
			kind: 'enum',
			options: [
				{ value: 'default', label: 'Default' },
				{ value: 'secondary', label: 'Secondary' },
				{ value: 'outline', label: 'Outline' }
			]
		},
		// ... more fields
	],
	migrate: (props, fromVersion) => {
		// Migration logic if needed
		// For v1, just return props as-is
		return props;
	}
};

// Export component for registry
export { YourComponent };
```

**Field Kinds Available:**
- `string` - Single-line text input
- `text` - Multiline textarea
- `number` - Number input
- `boolean` - Switch/checkbox
- `enum` - Select dropdown (requires `options` array)
- `icon` - Icon selector
- `link` - Link editor (href, label, target)
- `image` - Image picker (src, alt, width, height, fit)
- `date` - Date picker
- `datetime` - Datetime picker
- `object` - Grouped fields (fieldset)
- `array` - Repeater list (requires `itemSchema`)

**Array Fields:**
When using `array` kind, provide `itemSchema`:

```typescript
{
	path: 'items',
	label: 'Items',
	kind: 'array',
	itemSchema: [
		{
			path: 'iconKey',
			label: 'Icon',
			kind: 'icon'
		},
		{
			path: 'title',
			label: 'Title',
			kind: 'string',
			required: true
		}
	]
}
```

**Important:** Array items MUST have `_id` field. The path utilities auto-generate it, but ensure your component expects it:

```typescript
interface Item {
	_id: string;
	// ... other fields
}
```

### 4. Register in Registry

Add to `src/lib/components/blocks/registry.ts`:

```typescript
import { YourComponent } from './definitions/{block-type}/{block-type}.section';

// Register block components
registerBlock('your.block.type', YourComponent);
```

### 5. Register in Catalog

Add to `src/lib/components/blocks/catalog.ts`:

```typescript
import { yourBlockDefinition } from './definitions/{block-type}/{block-type}.section';

const definitions: BlockDefinition[] = [
	featuresSectionDefinition,
	yourBlockDefinition // Add here
];
```

## Complete Example: Hero Block

### Component: `src/lib/components/blocks/components/hero/HeroSection.svelte`

```svelte
<script lang="ts">
	import type { Variant, Align } from '../../types';
	import { getIcon } from '../../icon-registry';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	interface Props {
		title?: string;
		description?: string;
		ctaLabel?: string;
		ctaHref?: string;
		variant?: Variant;
		align?: Align;
	}

	const {
		title = '',
		description = '',
		ctaLabel = '',
		ctaHref = '#',
		variant = 'default',
		align = 'center'
	}: Props = $props();

	const textAlign = $derived(() => {
		if (align === 'center') return 'text-center';
		if (align === 'right') return 'text-right';
		return 'text-left';
	});
</script>

<section class="py-24">
	<div class="container mx-auto px-4">
		<div class={cn('max-w-3xl mx-auto', textAlign)}>
			{#if title}
				<h1 class="text-4xl font-bold mb-4">{title}</h1>
			{/if}
			{#if description}
				<p class="text-lg text-muted-foreground mb-6">{description}</p>
			{/if}
			{#if ctaLabel}
				<Button variant={variant} href={ctaHref}>
					{ctaLabel}
				</Button>
			{/if}
		</div>
	</div>
</section>
```

### Definition: `src/lib/components/blocks/definitions/hero/hero.section.ts`

```typescript
import { z } from 'zod';
import type { BlockDefinition } from '../../types';
import HeroSection from '../../components/hero/HeroSection.svelte';

const propsSchema = z.object({
	title: z.string().optional(),
	description: z.string().optional(),
	ctaLabel: z.string().optional(),
	ctaHref: z.string().optional().default('#'),
	variant: z.enum(['default', 'secondary', 'outline']).optional().default('default'),
	align: z.enum(['left', 'center', 'right']).optional().default('center'),
});

export const heroSectionDefinition: BlockDefinition = {
	type: 'hero.section',
	displayName: 'Hero Section',
	version: 1,
	defaults: {
		title: 'Welcome',
		description: 'This is a hero section',
		ctaLabel: 'Get Started',
		ctaHref: '#',
		variant: 'default',
		align: 'center',
	},
	schema: propsSchema,
	ui: [
		{
			path: 'title',
			label: 'Title',
			kind: 'string',
			placeholder: 'Enter hero title'
		},
		{
			path: 'description',
			label: 'Description',
			kind: 'text',
			placeholder: 'Enter hero description'
		},
		{
			path: 'ctaLabel',
			label: 'CTA Label',
			kind: 'string',
			placeholder: 'Button text'
		},
		{
			path: 'ctaHref',
			label: 'CTA Link',
			kind: 'string',
			placeholder: 'https://...'
		},
		{
			path: 'variant',
			label: 'Button Variant',
			kind: 'enum',
			options: [
				{ value: 'default', label: 'Default' },
				{ value: 'secondary', label: 'Secondary' },
				{ value: 'outline', label: 'Outline' }
			]
		},
		{
			path: 'align',
			label: 'Alignment',
			kind: 'enum',
			options: [
				{ value: 'left', label: 'Left' },
				{ value: 'center', label: 'Center' },
				{ value: 'right', label: 'Right' }
			]
		}
	],
	migrate: (props, fromVersion) => {
		return props;
	}
};

export { HeroSection };
```

### Registration

**In `registry.ts`:**
```typescript
import { HeroSection } from './definitions/hero/hero.section';

registerBlock('hero.section', HeroSection);
```

**In `catalog.ts`:**
```typescript
import { heroSectionDefinition } from './definitions/hero/hero.section';

const definitions: BlockDefinition[] = [
	featuresSectionDefinition,
	heroSectionDefinition
];
```

## Versioning & Migrations

When you need to change the prop structure of an existing block:

1. **Increment version** in the definition:
   ```typescript
   version: 2, // was 1
   ```

2. **Update schema** to match new structure

3. **Add migration function**:
   ```typescript
   migrate: (props, fromVersion) => {
     if (fromVersion === 1) {
       // Migrate from v1 to v2
       return {
         ...props,
         // Transform old props to new structure
         newField: props.oldField ?? defaultValue
       };
     }
     return props;
   }
   ```

4. **Update defaults** to match new schema

## Best Practices

### ✅ DO

- Use variant enums (`variant`, `density`, `align`, `columns`) for visual differentiation
- Use shadcn token classes (`text-muted-foreground`, `border`, etc.)
- Include `_id` in array item interfaces
- Use `$derived()` for computed values
- Use `getIcon()` for all icons
- Keep components focused and composable

### ❌ DON'T

- Use explicit Tailwind colors (`text-gray-900`, `bg-white`)
- Use `export let` (use `$props()` instead)
- Store inline SVG in props
- Mutate props directly (use path utilities)
- Skip version numbers
- Forget to register in both registry and catalog

## Testing Your Block

1. Start the dev server: `npm run dev`
2. Navigate to `/` (the builder page is at the root route: `src/routes/+page.svelte`)
3. Select your new block type from the dropdown
4. Verify:
   - Block appears in the list
   - Defaults are applied correctly
   - Form fields render properly
   - Preview updates when editing
   - Array items can be added/removed
   - Icons work correctly

## Troubleshooting

**Block doesn't appear in list:**
- Check catalog import and registration
- Verify `type` matches between definition and registry

**Preview doesn't render:**
- Check component import path in definition
- Verify component uses Svelte 5 runes
- Check browser console for errors

**Form fields don't update preview:**
- Verify `updateBlockField` is called
- Check path utilities are working
- Ensure block object reference changes

**Array items missing `_id`:**
- Path utilities auto-generate, but verify `addArrayItem` is used
- Check item schema includes all required fields

## Next Steps

Once your block is working:
1. Test all field types you're using
2. Test variant props
3. Test array operations (add/remove)
4. Consider adding more field types if needed (image, link, etc.)
