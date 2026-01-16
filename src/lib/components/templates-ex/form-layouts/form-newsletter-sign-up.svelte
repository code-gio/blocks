<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { getTemplateDefaults } from "../template-registry";

  interface FormSubscribeInlineProps {
    title?: string;
    description?: string;
    placeholder?: string;
    buttonText?: string;
  }

  const DEFAULTS = getTemplateDefaults("form-subscribe-inline") || {};

  let {
    title = DEFAULTS.title,
    description = DEFAULTS.description,
    placeholder = DEFAULTS.placeholder,
    buttonText = DEFAULTS.buttonText,
  }: FormSubscribeInlineProps = $props();
</script>

<div class="bg-gray-50 dark:bg-primary">
  <div class="mx-auto max-w-340 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
    <div class="mx-auto max-w-2xl text-center">
      <h2
        class="text-2xl font-bold text-gray-800 md:text-3xl dark:text-neutral-200"
      >
        {title}
      </h2>
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
