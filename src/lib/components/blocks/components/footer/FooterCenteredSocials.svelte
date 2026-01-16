<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { getIcon } from "../../icon-registry";

  interface FooterLink {
    _id: string;
    text: string;
    href: string;
  }

  interface SocialLink {
    _id: string;
    platform: string;
    href: string;
    iconKey: string;
  }

  interface Props {
    brandName?: string;
    copyright?: string;
    links?: FooterLink[];
    socials?: SocialLink[];
  }

  const {
    brandName = "",
    copyright = "",
    links = [],
    socials = [],
  }: Props = $props();
</script>

<footer class="mx-auto mt-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
  <div class="text-center">
    <div>
      <a
        class="flex-none text-xl font-semibold text-foreground"
        href="#"
        aria-label="Brand"
      >
        {brandName}
      </a>
    </div>

    <div class="mt-3">
      {#each links as link, index (link._id)}
        <a
          class="inline-flex gap-x-2 text-sm text-muted-foreground hover:text-foreground"
          href={link.href}
        >
          {link.text}
        </a>
        {#if index < links.length - 1}
          <span class="mx-2 text-muted-foreground">•</span>
        {/if}
      {/each}
    </div>

    {#if socials && socials.length > 0}
      <div class="mt-6 flex justify-center gap-x-2">
        {#each socials as social (social._id)}
          {@const Icon = getIcon(social.iconKey)}
          <Button
            variant="ghost"
            size="icon"
            href={social.href}
            class="size-10 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <svelte:component this={Icon} class="size-4 shrink-0" />
            <span class="sr-only">{social.platform}</span>
          </Button>
        {/each}
      </div>
    {/if}

    <p class="mt-5 text-sm text-muted-foreground">{copyright}</p>
  </div>
</footer>
