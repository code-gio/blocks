import type { Component } from 'svelte';
import BlockFallback from './components/BlockFallback.svelte';
import { FeaturesSection } from './definitions/features/features.section';

/**
 * Component Registry - Maps block.type to Svelte component.
 * Rendering-only, no schema or builder logic.
 */

const REGISTRY = new Map<string, Component>();

// Register block components
registerBlock('features.section', FeaturesSection);

/**
 * Register a block component.
 */
export function registerBlock(type: string, component: Component): void {
	REGISTRY.set(type, component);
}

/**
 * Get block component by type, with fallback for unknown types.
 */
export function getBlockComponent(type: string): Component {
	return REGISTRY.get(type) ?? BlockFallback;
}

/**
 * Check if a block type is registered.
 */
export function hasBlockComponent(type: string): boolean {
	return REGISTRY.has(type);
}
