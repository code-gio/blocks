# Block Builder System Rules

Block builder system rules for Svelte 5 (runes), shadcn/ui Svelte, @lucide-svelte, schema-driven form builder manifests, and token-safe Tailwind styling.

## Objective

Implement a block-based page builder where:
- Pages are arrays of BlockInstance objects.
- Each block renders via a Svelte component using Svelte 5 runes.
- A form builder is generated from per-block TypeScript definitions (schema + UI manifest).
- Icons are selected via an icon selector and rendered via @lucide-svelte.
- Styling must be themeable using shadcn tokens; do not hard-code colors.

---

## Non-Negotiable Standards

### Svelte 5 Runes

- All new Svelte components MUST use Svelte 5 runes:
  - props via: `const {...} = $props<...>()`
  - state via: `let x = $state(...)`
  - derived via: `const y = $derived(() => ...)`
  - effects via: `$effect(() => ...)`
- Do NOT use `export let` in new components.

### Icons

- All icons MUST come from `@lucide-svelte`.
- Persist icons as a stable string key: `iconKey` (e.g. `"workflow"`).
- Never store inline SVG in block props.
- Use a single icon registry `icon-registry.ts` as the source of truth.
- Unknown icons MUST degrade gracefully to a fallback icon (e.g. `HelpCircle`).

### Styling / Tailwind / shadcn tokens

- Do NOT use explicit Tailwind palette colors:
  - Disallowed: `text-gray-900`, `bg-white`, `bg-indigo-100`, `text-indigo-600`, etc.
- Allowed classes:
  - layout: `flex`/`grid`/`gap`/`space`/padding/margins/width/height
  - typography scale: `text-sm`/`text-lg`/`font-medium`/`leading`/`tracking`
  - shadcn token utilities: `text-muted-foreground`, `border`, `ring-*`, `shadow-*`
- No inline styles for color/background/gradients.

### shadcn/ui Svelte Usage

- Prefer shadcn/ui Svelte primitives (`Card`, `Button`, `Badge`, `Input`, `Textarea`, `Select`, `Switch`, etc.) over raw HTML.
- Ensure components are prop-driven and composable.

---

## Data Model

### BlockInstance

Use this canonical shape:
- `id: string`
- `type: string` (registry + catalog key)
- `version: number` (required for migrations)
- `props: Record<string, unknown>`
- `meta?: Record<string, unknown>` (builder-only; never affects published rendering)

No editable content should live outside `props`.

---

## Required Architecture

### 1) Component Registry (rendering-only)

- Maintain a registry mapping `block.type -> Svelte component`.
- Provide a fallback component for unknown types.
- Renderer MUST pass `{...block.props}` to the resolved component.
- Registry MUST NOT include field definitions or builder UI logic.

### 2) Block Definitions Catalog (schema + UI manifest + defaults)

For every `block.type`, create a TypeScript definition that includes:
- `type: string`
- `displayName: string`
- `version: number` (current version of this block definition)
- `defaults: valid starter props`
- `schema: validation` (prefer Zod)
- `ui: field manifest` describing how to build the editor form
- `migrate?: (props, fromVersion) => Record<string, unknown>` (optional migration function)

Adding a new block requires:
- Svelte component
- registry entry
- definition entry (defaults + schema + ui)

---

## Field Kinds (Supported Inputs)

The UI manifest MUST only use supported field kinds below.
Each kind maps to a specific builder input component.

### Supported field kinds and required builder controls

- `string`: single-line text input
- `text`: multiline textarea
- `richText`: rich text editor (optional; only if needed)
- `number`: number input (min/max/step supported)
- `boolean`: switch/checkbox
- `enum`: select/segmented control (options required)
- `icon`: `IconSelector` (search + preview), stores `iconKey` string
- `image`: `ImagePicker` (src + alt required; preview; optional width/height/fit)
- `link`: `LinkEditor` (href + label optional + target/rel)
- `file`: `FilePicker` (src + label optional)
- `date`: date picker
- `datetime`: datetime picker
- `object`: grouped fields (fieldset), renders child fields
- `array`: repeater list with add/remove/reorder; item schema required

### Required field metadata in manifest

Every field MUST have:
- `path` (string path into props)
- `label`
- `kind`

Optional:
- `required`
- `placeholder`
- `helperText`
- constraints: `min`/`max` (strings), `minItems`/`maxItems` (arrays), `min`/`max` (numbers)
- `options` (enum)
- `uiGroup` / group placement

---

## Builder Form Requirements

### Form Generation

- The builder reads `BlockDefinition.ui` manifest and renders inputs accordingly.
- The builder may only edit fields declared in the manifest (no arbitrary prop injection).
- Arrays must support add/remove/reorder and per-item editing using nested fields.

### Path Handling

- Use stable path setters/getters to update nested props:
  - supports dot paths: `"cta.label"`
  - supports arrays: `"features[0].title"` (or `"features[].title"` in manifest definition for item templates)
- **Critical**: All path operations must use the centralized path utilities (`path-utils.ts`).
- Array items MUST have `_id` field for stable keys.

### Validation

- Validate props against schema on save (minimum).
- Prefer showing inline errors for invalid fields.
- Unknown props should be rejected or ignored at persistence boundaries.

---

## Icon System Requirements

### icon-registry.ts

- Located at `src/lib/components/blocks/icon-registry.ts`
- Provide `ICONS` map, `ICON_KEYS` list, and `getIcon(key)` fallback.
- `IconSelector` must show only `ICON_KEYS`.
- Rendering components must resolve icons using `getIcon(iconKey)`.

---

## Component Authoring Requirements (Blocks)

When converting HTML sections into blocks:

1. Identify `block.type` and create a definition file.
2. Extract section-level content into `props` (title, description, eyebrow, etc.).
3. Convert repeated cards into arrays of objects.
4. Replace any SVG with an `iconKey` referencing @lucide-svelte.
5. Remove explicit palette color classes.
6. Implement the Svelte component using Svelte 5 runes and shadcn primitives.
7. Ensure defaults + schema + ui manifest can reproduce the section.

---

## Critical Architectural Foundations

### 1. Versioning & Migrations

- **Why**: Prop shape changes break old pages without migration path
- **Implementation**:
  - `BlockInstance.version: number` (required)
  - `BlockDefinition.version: number` + `migrate(props, fromVersion)` function
  - `catalog.migrateBlock()` automatically migrates before rendering
- **Example**: Renaming `features` → `items` requires migration from v1 → v2

### 2. Reliable Path Utilities

- **Why**: Prevents bugs from inconsistent path handling (especially arrays)
- **Implementation**: Single utility (`src/lib/components/builder/utils/path-utils.ts`) handles:
  - `getValueByPath()` - Get nested values
  - `setValueByPath()` - Set nested values
  - `addArrayItem()` - Add to arrays (auto-generates `_id`)
  - `removeArrayItem()` - Remove by index
  - `removeArrayItemById()` - Remove by `_id`
- **Supports**: Dot notation (`cta.label`), array notation (`features[0].title`)

### 3. Stable IDs for Array Items

- **Why**: Drag/drop reorder, Svelte keyed `{#each}`, prevents UI bugs
- **Implementation**:
  - All array items must have `_id: string` field
  - Path utilities auto-generate `_id` if missing: `_id${Date.now()}${Math.random()}`
  - `ArrayField` uses `_id` for Svelte keys: `{#each items as item (item._id)}`
  - Schema validation ensures `_id` exists
- **Example**: `features: [{ _id: "f1", title: "..." }, { _id: "f2", ... }]`

### 4. Variants Policy (Prevent Color Customization)

- **Why**: Engineers will sneak in palette classes without agreed variants
- **Implementation**: Standard token-safe variant enums:
  - `variant: "default" | "secondary" | "outline"`
  - `density: "compact" | "comfortable"`
  - `align: "left" | "center" | "right"`
  - `columns: 2 | 3 | 4` (for grids)
- **Usage**: Blocks use these enums for visual differentiation, NOT color props

---

## Prohibited Patterns

- Inline SVG stored in props or embedded directly in block data
- Tailwind explicit color classes for text/background
- `export let` in newly created Svelte components
- Registry containing schema/manifest logic
- Builder editing arbitrary props not described in the manifest
- Using `<svelte:component>` in Svelte 5 runes mode (components are dynamic by default)

---

## Deliverables Checklist (for each new block type)

- [ ] Svelte component (Svelte 5 runes)
- [ ] Registry entry mapping type -> component
- [ ] Definition file with defaults + schema + ui manifest
- [ ] Icons referenced only by `iconKey` via icon registry
- [ ] No explicit Tailwind palette colors used
- [ ] Version number included in definition
- [ ] Migration function structure in place (even if empty for v1)
- [ ] Array items include `_id` field in schema
- [ ] Variant props use standard enums (if applicable)

---

## Recommended Folder Structure

```
src/lib/components/
  blocks/
    icon-registry.ts
    registry.ts
    catalog.ts
    types.ts
    BlockRenderer.svelte
    components/
      BlockFallback.svelte
      {block-type}/
        ComponentName.svelte
    definitions/
      {block-type}/
        {block-type}.section.ts

  builder/
    FormRenderer.svelte
    fields/
      StringField.svelte
      TextField.svelte
      NumberField.svelte
      BooleanField.svelte
      EnumField.svelte
      IconField.svelte
      IconSelector.svelte
      ImageField.svelte
      LinkField.svelte
      DateField.svelte
      DateTimeField.svelte
      ArrayField.svelte
      ObjectField.svelte
    utils/
      path-utils.ts

  ui/
    button/
    card/
    input/
    select/
    ... (shadcn/ui components)
```

**Note**: 
- All components are under `src/lib/components/` for consistency
- Blocks are organized by block type in subdirectories to support scaling
- Builder field components are in `builder/fields/`
- UI components from shadcn/ui are in `ui/`

---

## Default Behavior Decisions

- Prefer enums for layout decisions (alignment, density, size, variant).
- Avoid color props entirely.
- Use schema validation to guarantee publishable blocks.
- All array items must have stable `_id` for reactivity and reordering.
- Path utilities are the single source of truth for all prop updates.

---

## Svelte 5 Specific Notes

- Components are dynamic by default - use `<Component {...props} />` instead of `<svelte:component>`
- Use `$derived.by()` for computed values that depend on reactive state
- Use `$effect()` for side effects (syncing state, calling callbacks)
- Props are defined with `$props()` and destructured directly
- State is declared with `$state()`

---

## Project Structure

The builder page is located at the root route:
- **Builder Page**: `src/routes/+page.svelte` - Main builder interface
- **Layout**: `src/routes/+layout.svelte` - Root layout wrapper

All block and builder components are under `src/lib/components/`:
- **Blocks**: `src/lib/components/blocks/` - Block components, definitions, registry, catalog
- **Builder**: `src/lib/components/builder/` - Form renderer and field components
- **UI**: `src/lib/components/ui/` - shadcn/ui components

## See Also

- [Adding Blocks Guide](./ADDING_BLOCKS.md) - Step-by-step instructions for creating new blocks
