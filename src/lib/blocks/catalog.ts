import type { BlockInstance, BlockDefinition } from './types';

/**
 * Block Definitions Catalog - Imports all block definitions and provides lookup.
 * Includes migration support for version mismatches.
 */

// Import block definitions here as they are created
import { featuresSectionDefinition } from './definitions/features.section';

const definitions: BlockDefinition[] = [featuresSectionDefinition];

export const catalog: Record<string, BlockDefinition> = {};

// Build catalog from definitions array
for (const def of definitions) {
	catalog[def.type] = def;
}

export const blockList: Array<{ type: string; displayName: string }> = definitions.map((def) => ({
	type: def.type,
	displayName: def.displayName
}));

/**
 * Get block definition by type.
 */
export function getBlockDefinition(type: string): BlockDefinition | undefined {
	return catalog[type];
}

/**
 * Migrate a block instance if its version is older than the current definition version.
 * Returns a new block instance with migrated props and updated version.
 */
export function migrateBlock(block: BlockInstance): BlockInstance {
	const definition = getBlockDefinition(block.type);

	if (!definition) {
		// Unknown block type, return as-is
		return block;
	}

	// If versions match, no migration needed
	if (block.version === definition.version) {
		return block;
	}

	// If block version is newer than definition, return as-is (shouldn't happen, but be safe)
	if (block.version > definition.version) {
		return block;
	}

	// Block needs migration
	if (definition.migrate) {
		const migratedProps = definition.migrate(block.props, block.version);
		return {
			...block,
			props: migratedProps,
			version: definition.version
		};
	}

	// No migration function available, but version mismatch exists
	// Return block with updated version (may break rendering, but at least version is correct)
	return {
		...block,
		version: definition.version
	};
}
