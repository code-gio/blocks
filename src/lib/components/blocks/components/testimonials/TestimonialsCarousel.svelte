<script lang="ts">
  import { Card } from "$lib/components/ui/card";
  import { Avatar } from "$lib/components/ui/avatar";
  import { getIcon } from "../../icon-registry";
  import { cn } from "$lib/utils";

  interface Testimonial {
    _id: string;
    quote: string;
    author: string;
    title: string;
    company?: string;
    avatarUrl: string;
    avatarFallback: string;
    rating?: number;
  }

  interface Props {
    title?: string;
    description?: string;
    testimonials?: Testimonial[];
  }

  const { title = "", description = "", testimonials = [] }: Props = $props();

  const Star = $derived(getIcon("star"));

  function generateStarArray(rating: number): ("full" | "half" | "empty")[] {
    const stars: ("full" | "half" | "empty")[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push("full");
    }
    if (hasHalfStar) {
      stars.push("half");
    }
    while (stars.length < 5) {
      stars.push("empty");
    }
    return stars;
  }

  function getStarClass(starType: "full" | "half" | "empty"): string {
    switch (starType) {
      case "full":
        return "fill-primary text-primary";
      case "half":
        return "fill-primary/50 text-primary";
      case "empty":
        return "text-muted-foreground";
    }
  }
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

  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {#each testimonials as testimonial (testimonial._id)}
      <Card class="h-full">
        <div class="flex h-full flex-col p-6">
          {#if testimonial.rating}
            <div class="mb-4 flex gap-x-1">
              {#each generateStarArray(testimonial.rating) as starType}
                <svelte:component
                  this={Star}
                  class={cn("size-5", getStarClass(starType))}
                />
              {/each}
            </div>
          {/if}
          <blockquote class="grow">
            <p class="text-foreground">
              {testimonial.quote}
            </p>
          </blockquote>
          <div class="mt-6 flex items-center gap-x-3">
            <Avatar class="size-10">
              <img src={testimonial.avatarUrl} alt={testimonial.author} />
              <div
                class="flex size-10 items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground"
              >
                {testimonial.avatarFallback}
              </div>
            </Avatar>
            <div>
              <p class="text-sm font-semibold text-foreground">
                {testimonial.author}
              </p>
              <p class="text-xs text-muted-foreground">
                {testimonial.title}
                {#if testimonial.company}| {testimonial.company}{/if}
              </p>
            </div>
          </div>
        </div>
      </Card>
    {/each}
  </div>
</div>
