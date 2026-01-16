<script lang="ts">
  import { getIcon } from "../../icon-registry";

  interface Testimonial {
    _id: string;
    quote: string;
    author: string;
    title: string;
    company?: string;
  }

  interface Props {
    testimonials?: Testimonial[];
  }

  const { testimonials = [] }: Props = $props();

  const Quote = $derived(getIcon("quote"));
</script>

<div class="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
  <div class="grid gap-6 md:grid-cols-2">
    {#each testimonials as testimonial (testimonial._id)}
      <div class="relative">
        <svelte:component
          this={Quote}
          class="absolute -top-6 start-0 size-16 text-muted"
        />
        <div class="relative z-10">
          <blockquote class="text-xl italic text-foreground">
            {testimonial.quote}
          </blockquote>
          <footer class="mt-6">
            <p class="font-semibold text-foreground">
              {testimonial.author}
            </p>
            <p class="text-sm text-muted-foreground">
              {testimonial.title}
              {#if testimonial.company}| {testimonial.company}{/if}
            </p>
          </footer>
        </div>
      </div>
    {/each}
  </div>
</div>
