<script lang="ts">
  import { Card } from "$lib/components/ui/card";

  interface FAQ {
    _id: string;
    question: string;
    answer: string;
  }

  interface Props {
    title?: string;
    faqs?: FAQ[];
  }

  const { title = "", faqs = [] }: Props = $props();
</script>

<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
  <!-- Title -->
  <div class="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
    <h2 class="text-2xl font-bold text-foreground md:text-3xl md:leading-tight">
      {title}
    </h2>
  </div>

  <div class="mx-auto max-w-5xl">
    <div class="grid gap-4 sm:grid-cols-2 md:gap-6">
      {#each faqs as faq (faq._id)}
        <Card class="text-center transition-colors hover:bg-muted/50">
          <div class="p-6">
            <h3 class="text-lg font-semibold text-foreground">
              {faq.question}
            </h3>
            <p class="mt-2 text-muted-foreground">
              {faq.answer}
            </p>
          </div>
        </Card>
      {/each}
    </div>
  </div>
</div>
