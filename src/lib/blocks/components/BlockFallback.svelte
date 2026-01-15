<script lang="ts">
	import type { BlockInstance } from '../types';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { AlertCircle } from '@lucide/svelte';

	interface Props {
		block: BlockInstance;
	}

	const { block }: Props = $props();
</script>

<Card>
	<CardHeader>
		<CardTitle class="flex items-center gap-2">
			<AlertCircle class="h-5 w-5" />
			Unknown Block Type
		</CardTitle>
		<CardDescription>Block type "{block.type}" is not registered.</CardDescription>
	</CardHeader>
	<CardContent>
		<p class="text-sm text-muted-foreground">
			This block cannot be rendered. Please check that the block type is registered in the component registry.
		</p>
	</CardContent>
</Card>
