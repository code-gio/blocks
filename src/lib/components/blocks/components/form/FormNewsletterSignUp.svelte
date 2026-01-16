<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";

  interface Props {
    title?: string;
    description?: string;
    placeholder?: string;
    buttonText?: string;
  }

  const {
    title = "",
    description = "",
    placeholder = "Enter your email",
    buttonText = "Subscribe",
  }: Props = $props();
</script>

<div class="bg-muted">
  <div class="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
    <div class="mx-auto max-w-2xl text-center">
      {#if title}
        <h2 class="text-2xl font-bold text-foreground md:text-3xl">
          {title}
        </h2>
      {/if}
      {#if description}
        <p class="mt-3 text-muted-foreground">
          {description}
        </p>
      {/if}
      <form class="mx-auto mt-6 max-w-lg">
        <div class="flex gap-2">
          <Input type="email" {placeholder} required class="flex-1" />
          <Button type="submit">
            {buttonText}
          </Button>
        </div>
      </form>
    </div>
  </div>
</div>
