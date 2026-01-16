<script lang="ts">
	import { cn } from '../utils';
	import { getTemplateDefaults } from '../template-registry';

	interface GalleryImage {
		src: string;
		alt: string;
		title?: string;
	}

	interface GalleryMasonryProps {
		images?: GalleryImage[];
	}

	const DEFAULTS = getTemplateDefaults('gallery-masonry') || {};

	let { images = DEFAULTS.images || [] }: GalleryMasonryProps = $props();
</script>

<!-- Gallery -->
<div class="mx-auto max-w-340 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
	<div class="columns-1 gap-4 sm:columns-2 lg:columns-3">
		{#each images as image}
			<a class="group mb-4 block break-inside-avoid overflow-hidden rounded-xl" href="#">
				<div class="overflow-hidden">
					<img
						class="w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
						src={image.src}
						alt={image.alt}
					/>
				</div>
				{#if image.title}
					<div class="mt-2">
						<h3 class="text-sm font-medium text-gray-800 group-hover:text-primary dark:text-neutral-200">
							{image.title}
						</h3>
					</div>
				{/if}
			</a>
		{/each}
	</div>
</div>
<!-- End Gallery -->

