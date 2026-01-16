<script lang="ts">
  interface GalleryImage {
    _id: string;
    src: string;
    alt: string;
    title?: string;
  }

  interface Props {
    title?: string;
    description?: string;
    images?: GalleryImage[];
  }

  const { title = "", description = "", images = [] }: Props = $props();
</script>

<div class="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
  {#if title}
    <div class="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
      <h2
        class="text-2xl font-bold text-foreground md:text-4xl md:leading-tight"
      >
        {title}
      </h2>
      {#if description}
        <p class="mt-1 text-muted-foreground">
          {description}
        </p>
      {/if}
    </div>
  {/if}

  <div class="columns-1 gap-4 sm:columns-2 lg:columns-3">
    {#each images as image (image._id)}
      <a
        class="group relative mb-4 block break-inside-avoid overflow-hidden rounded-xl"
        href="#"
      >
        <div class="relative overflow-hidden">
          <img
            class="w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            src={image.src}
            alt={image.alt}
          />
          {#if image.title}
            <div
              class="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              <h3 class="text-base font-semibold text-white">
                {image.title}
              </h3>
            </div>
          {/if}
        </div>
      </a>
    {/each}
  </div>
</div>
