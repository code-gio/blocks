<script lang="ts">
	import type { BlockInstance } from './types';
	import { getBlockComponent } from './registry';
	import { migrateBlock } from './catalog';

	interface Props {
		block: BlockInstance;
	}

	const { block }: Props = $props();

	// Migrate block if version mismatch
	const migratedBlock = $derived.by(() => migrateBlock(block));

	const Component = $derived.by(() => getBlockComponent(migratedBlock.type));
</script>

{#if Component}
	<Component {...migratedBlock.props} />
{/if}
