<script lang="ts">
  import { Card } from "$lib/components/ui/card";
  import { Label } from "$lib/components/ui/label";
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";

  interface Props {
    title?: string;
  }

  const { title = "Form" }: Props = $props();

  let formData = $state({ name: "", email: "", message: "" });
</script>

<div class="mx-auto max-w-xl px-4 py-10">
  <Card>
    <div class="p-6">
      <h2 class="mb-6 text-xl font-semibold text-foreground">{title}</h2>
      <form class="space-y-4">
        <div class="space-y-2">
          <Label for="name">Name</Label>
          <Input id="name" bind:value={formData.name} required />
        </div>
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" bind:value={formData.email} required />
        </div>
        <div class="space-y-2">
          <Label for="message">Message</Label>
          <Input id="message" bind:value={formData.message} />
        </div>
        <Button type="submit" class="w-full">Submit</Button>
      </form>
    </div>
  </Card>
</div>
