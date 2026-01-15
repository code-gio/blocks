import type { z } from 'zod';

/**
 * Core type definitions for the block builder system.
 * These types define the contract between stored data, renderer, builder, and schemas.
 */

/**
 * Variant types - Standard token-safe variant enums to prevent color customization.
 * Blocks use these for visual differentiation, NOT color props.
 */
export type Variant = 'default' | 'secondary' | 'outline';
export type Density = 'compact' | 'comfortable';
export type Align = 'left' | 'center' | 'right';
export type Columns = 2 | 3 | 4;

/**
 * BlockInstance - The canonical shape for stored block data.
 * All editable content lives in props. Meta is builder-only and never affects published rendering.
 */
export interface BlockInstance {
	id: string;
	type: string;
	version: number;
	props: Record<string, unknown>;
	meta?: Record<string, unknown>;
}

/**
 * Field metadata for UI manifest.
 */
export interface BaseFieldDef {
	path: string;
	label: string;
	kind: string;
	required?: boolean;
	placeholder?: string;
	helperText?: string;
	uiGroup?: string;
}

export interface StringFieldDef extends BaseFieldDef {
	kind: 'string';
	min?: number;
	max?: number;
}

export interface TextFieldDef extends BaseFieldDef {
	kind: 'text';
	min?: number;
	max?: number;
}

export interface RichTextFieldDef extends BaseFieldDef {
	kind: 'richText';
}

export interface NumberFieldDef extends BaseFieldDef {
	kind: 'number';
	min?: number;
	max?: number;
	step?: number;
}

export interface BooleanFieldDef extends BaseFieldDef {
	kind: 'boolean';
}

export interface EnumFieldDef extends BaseFieldDef {
	kind: 'enum';
	options: Array<{ value: string; label: string }>;
}

export interface IconFieldDef extends BaseFieldDef {
	kind: 'icon';
}

export interface ImageFieldDef extends BaseFieldDef {
	kind: 'image';
}

export interface LinkFieldDef extends BaseFieldDef {
	kind: 'link';
}

export interface FileFieldDef extends BaseFieldDef {
	kind: 'file';
}

export interface DateFieldDef extends BaseFieldDef {
	kind: 'date';
}

export interface DateTimeFieldDef extends BaseFieldDef {
	kind: 'datetime';
}

export interface ObjectFieldDef extends BaseFieldDef {
	kind: 'object';
	fields: FieldDef[];
}

export interface ArrayFieldDef extends BaseFieldDef {
	kind: 'array';
	itemSchema: FieldDef[];
	minItems?: number;
	maxItems?: number;
}

export type FieldDef =
	| StringFieldDef
	| TextFieldDef
	| RichTextFieldDef
	| NumberFieldDef
	| BooleanFieldDef
	| EnumFieldDef
	| IconFieldDef
	| ImageFieldDef
	| LinkFieldDef
	| FileFieldDef
	| DateFieldDef
	| DateTimeFieldDef
	| ObjectFieldDef
	| ArrayFieldDef;

/**
 * BlockDefinition - Schema + UI manifest + defaults for a block type.
 * Includes version and optional migration function for prop shape changes.
 */
export interface BlockDefinition {
	type: string;
	displayName: string;
	version: number;
	defaults: Record<string, unknown>;
	schema: z.ZodSchema;
	ui: FieldDef[];
	migrate?: (props: Record<string, unknown>, fromVersion: number) => Record<string, unknown>;
}

/**
 * Array items must include _id for stable keys in Svelte {#each} and drag/drop reorder.
 */
export interface ArrayItemWithId {
	_id: string;
	[key: string]: unknown;
}
