<script lang="ts">
	import type { Variant, Density, Align, Columns } from '../../types';
	import { getIcon } from '../../icon-registry';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { cn } from '$lib/utils';

	interface Feature {
		_id: string;
		iconKey: string;
		title: string;
		description: string;
	}

	interface Props {
		title?: string;
		description?: string;
		features?: Feature[];
		variant?: Variant;
		density?: Density;
		align?: Align;
		columns?: Columns;
	}

	const {
		title = '',
		description = '',
		features = [],
		variant = 'default',
		density = 'comfortable',
		align = 'left',
		columns = 3
	}: Props = $props();

	const gridCols = $derived(() => {
		if (columns === 2) return 'md:grid-cols-2';
		if (columns === 3) return 'md:grid-cols-3';
		if (columns === 4) return 'md:grid-cols-4';
		return 'md:grid-cols-3';
	});

	const cardVariant = $derived(() => {
		if (variant === 'outline') {
			return 'border-2';
		}
		return '';
	});

	const paddingClass = $derived(() => {
		return density === 'compact' ? 'p-4' : 'p-6';
	});

	const textAlign = $derived(() => {
		if (align === 'center') return 'text-center';
		if (align === 'right') return 'text-right';
		return 'text-left';
	});
</script>

<section class="py-12">
	<div class="container mx-auto px-4">
		{#if title || description}
			<div class={cn('mb-8', textAlign)}>
				{#if title}
					<h2 class="text-3xl font-bold mb-2">{title}</h2>
				{/if}
				{#if description}
					<p class="text-muted-foreground text-lg">{description}</p>
				{/if}
			</div>
		{/if}

		<div class={cn('grid gap-6 grid-cols-1', gridCols)}>
			{#each features as feature (feature._id)}
				{@const Icon = getIcon(feature.iconKey)}
				<Card class={cn(cardVariant)}>
					<CardHeader class={paddingClass}>
						<div class={cn('flex items-center gap-3 mb-2', align === 'center' ? 'justify-center' : '')}>
							<Icon class="h-6 w-6" />
							<CardTitle>{feature.title}</CardTitle>
						</div>
					</CardHeader>
					<CardContent class={cn(paddingClass, 'pt-0')}>
						<CardDescription class={textAlign}>{feature.description}</CardDescription>
					</CardContent>
				</Card>
			{/each}
		</div>
	</div>
</section>
