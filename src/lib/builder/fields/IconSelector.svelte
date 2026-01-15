<script lang="ts">
	import { ICON_KEYS, getIcon } from '$lib/blocks/icon-registry';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Search, X } from '@lucide/svelte';

	interface Props {
		value: string;
		onChange: (value: string) => void;
		onClose?: () => void;
	}

	const { value, onChange, onClose }: Props = $props();

	let searchQuery = $state('');

	const filteredIcons = $derived(() => {
		if (!searchQuery.trim()) {
			return ICON_KEYS;
		}
		const query = searchQuery.toLowerCase();
		return ICON_KEYS.filter((key) => key.toLowerCase().includes(query));
	});

	function selectIcon(iconKey: string) {
		onChange(iconKey);
		onClose?.();
	}
</script>

<Card class="w-full max-w-md">
	<div class="flex items-center justify-between p-4 border-b">
		<h3 class="font-semibold">Select Icon</h3>
		{#if onClose}
			<Button variant="ghost" size="icon" onclick={onClose}>
				<X class="h-4 w-4" />
			</Button>
		{/if}
	</div>
	<div class="p-4 space-y-4">
		<div class="relative">
			<Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
			<Input
				type="text"
				placeholder="Search icons..."
				bind:value={searchQuery}
				class="pl-9"
			/>
		</div>
		<div class="grid grid-cols-6 gap-2 max-h-[400px] overflow-y-auto">
			{#each filteredIcons() as iconKey}
				{@const Icon = getIcon(iconKey)}
				<button
					type="button"
					class="p-2 rounded-md border hover:bg-accent transition-colors {value === iconKey
						? 'border-primary bg-accent'
						: 'border-border'}"
					onclick={() => selectIcon(iconKey)}
					title={iconKey}
				>
					<Icon class="h-5 w-5" />
				</button>
			{/each}
		</div>
	</div>
</Card>
