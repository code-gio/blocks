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

  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {#each images as image (image._id)}
      <a class="group block overflow-hidden rounded-xl" href="#">
        <div class="aspect-square overflow-hidden">
          <img
            class="size-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            src={image.src}
            alt={image.alt}
          />
        </div>
        {#if image.title}
          <div class="mt-2 p-1">
            <h3
              class="text-sm font-medium text-foreground group-hover:text-primary"
            >
              {image.title}
            </h3>
          </div>
        {/if}
      </a>
    {/each}
  </div>
</div>
