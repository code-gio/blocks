<script lang="ts">
  import { Card } from "$lib/components/ui/card";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea";
  import { Button } from "$lib/components/ui/button";
  import { getIcon } from "../../icon-registry";

  interface ContactInfo {
    _id: string;
    iconKey: string;
    title: string;
    value: string;
  }

  interface Props {
    title?: string;
    description?: string;
    contactInfo?: ContactInfo[];
    submitText?: string;
  }

  const {
    title = "",
    description = "",
    contactInfo = [],
    submitText = "Submit",
  }: Props = $props();
</script>

<div class="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
  <div class="mx-auto max-w-2xl lg:max-w-5xl">
    <div class="text-center">
      <h1 class="text-3xl font-bold text-foreground sm:text-4xl">{title}</h1>
      {#if description}
        <p class="mt-1 text-muted-foreground">{description}</p>
      {/if}
    </div>

    <div class="mt-12 grid items-center gap-6 lg:grid-cols-2 lg:gap-16">
      <div class="space-y-8">
        {#each contactInfo as info (info._id)}
          {@const Icon = getIcon(info.iconKey)}
          <div class="flex gap-x-5">
            <div class="shrink-0">
              <div
                class="flex size-12 items-center justify-center rounded-full bg-primary/10"
              >
                <svelte:component this={Icon} class="size-5 text-primary" />
              </div>
            </div>
            <div class="grow">
              <h3 class="text-lg font-semibold text-foreground">
                {info.title}
              </h3>
              <p class="mt-1 text-muted-foreground">{info.value}</p>
            </div>
          </div>
        {/each}
      </div>

      <Card>
        <div class="p-6">
          <form class="space-y-4">
            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <Label for="name">Name</Label>
                <Input id="name" type="text" required />
              </div>
              <div>
                <Label for="email">Email</Label>
                <Input id="email" type="email" required />
              </div>
            </div>
            <div>
              <Label for="subject">Subject</Label>
              <Input id="subject" type="text" required />
            </div>
            <div>
              <Label for="message">Message</Label>
              <Textarea id="message" rows={6} required />
            </div>
            <Button type="submit" class="w-full">{submitText}</Button>
          </form>
        </div>
      </Card>
    </div>
  </div>
</div>
