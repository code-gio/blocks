<script lang="ts">
    import type { BlockInstance } from "$lib/components/blocks/types";
    import { blockList, getBlockDefinition } from "$lib/components/blocks/catalog";
    import BlockRenderer from "$lib/components/blocks/BlockRenderer.svelte";
    import FormRenderer from "$lib/components/builder/FormRenderer.svelte";
    import { buttonVariants } from "$lib/components/ui/button";
    import * as Select from "$lib/components/ui/select";
    import * as Dialog from "$lib/components/ui/dialog";
    import {
      Card,
      CardContent,
      CardHeader,
      CardTitle,
    } from "$lib/components/ui/card";
    import { Pencil, Trash2 } from "@lucide/svelte";
    import { Button } from "$lib/components/ui/button";
  
    let blocks = $state<BlockInstance[]>([]);
    let selectedBlockIndex = $state<number | null>(null);
    let selectedBlockType = $state<string>("");
    let editDialogOpen = $state(false);
  
    const selectedBlock = $derived(() => {
      if (selectedBlockIndex === null) return null;
      return blocks[selectedBlockIndex] ?? null;
    });
  
    const selectedDefinition = $derived(() => {
      const block = selectedBlock();
      if (!block) return null;
      return getBlockDefinition(block.type);
    });
  
    const selectTriggerContent = $derived(
      blockList.find((bt) => bt.type === selectedBlockType)?.displayName ??
        "Select block type"
    );
  
    function addBlock(type: string) {
      const definition = getBlockDefinition(type);
      if (!definition) return;
  
      const newBlock: BlockInstance = {
        id: `block-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        type,
        version: definition.version,
        props: { ...definition.defaults },
      };
  
      blocks = [...blocks, newBlock];
      selectedBlockIndex = blocks.length - 1;
      selectedBlockType = "";
    }
  
    function updateBlockField(value: unknown) {
      if (selectedBlockIndex === null) return;
      // Create new block object to ensure reactivity
      const currentBlock = blocks[selectedBlockIndex];
      blocks = blocks.map((block, index) =>
        index === selectedBlockIndex
          ? { ...block, props: { ...block.props } }
          : block
      );
    }
  
    function deleteBlock(index: number) {
      blocks = blocks.filter((_, i) => i !== index);
      if (selectedBlockIndex === index) {
        selectedBlockIndex =
          blocks.length > 0 ? Math.min(index, blocks.length - 1) : null;
      } else if (selectedBlockIndex !== null && selectedBlockIndex > index) {
        selectedBlockIndex = selectedBlockIndex - 1;
      }
    }
  </script>
  
  <div class="min-h-screen bg-background">
    <div class="container mx-auto p-6">
      <div class="mb-6">
        <h1 class="text-3xl font-bold mb-2">Block Builder</h1>
        <p class="text-muted-foreground">Build pages using blocks</p>
      </div>
  
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Block List & Add -->
        <div class="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add Block</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <Select.Root
                type="single"
                bind:value={selectedBlockType}
                onValueChange={(val) => val && addBlock(val)}
              >
                <Select.Trigger class="w-full">
                  {selectTriggerContent}
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each blockList as blockType (blockType.type)}
                      <Select.Item
                        value={blockType.type}
                        label={blockType.displayName}
                      >
                        {blockType.displayName}
                      </Select.Item>
                    {/each}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </CardContent>
          </Card>
  
          <Card>
            <CardHeader>
              <CardTitle>Blocks ({blocks.length})</CardTitle>
            </CardHeader>
            <CardContent class="space-y-2">
              {#each blocks as block, index}
                {@const definition = getBlockDefinition(block.type)}
                <div
                  class="flex items-center gap-2 p-3 rounded-md border hover:bg-accent transition-colors {selectedBlockIndex ===
                  index
                    ? 'border-primary bg-accent'
                    : 'border-border'}"
                >
                  <button
                    type="button"
                    class="flex-1 text-left"
                    onclick={() => (selectedBlockIndex = index)}
                  >
                    <div class="font-medium">
                      {definition?.displayName ?? block.type}
                    </div>
                    <div class="text-sm text-muted-foreground">
                      v{block.version}
                    </div>
                  </button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onclick={() => deleteBlock(index)}
                    class="h-8 w-8"
                  >
                    <Trash2 class="h-4 w-4" />
                  </Button>
                </div>
              {:else}
                <p class="text-sm text-muted-foreground text-center py-4">
                  No blocks added yet. Select a block type above to get started.
                </p>
              {/each}
            </CardContent>
          </Card>
        </div>
  
        <!-- Preview & Editor -->
        <div class="lg:col-span-2 space-y-4">
          {#if selectedBlock() && selectedDefinition()}
            {@const block = selectedBlock()!}
            {@const definition = selectedDefinition()!}
  
            <!-- Preview -->
            <Card>
              <CardHeader
                class="flex flex-row items-center justify-between space-y-0"
              >
                <CardTitle>Preview</CardTitle>
                <Dialog.Root bind:open={editDialogOpen}>
                  <Dialog.Trigger
                    class={buttonVariants({ variant: "outline", size: "sm" })}
                  >
                    <Pencil class="h-4 w-4 mr-2" />
                    Edit
                  </Dialog.Trigger>
                  <Dialog.Content
                    class="sm:max-w-[600px] max-h-[80vh] overflow-y-auto"
                  >
                    <Dialog.Header>
                      <Dialog.Title>Edit {definition.displayName}</Dialog.Title>
                      <Dialog.Description>
                        Make changes to your block here. Changes are reflected in
                        the preview automatically.
                      </Dialog.Description>
                    </Dialog.Header>
                    <div class="space-y-4 py-4">
                      {#each definition.ui as field}
                        <FormRenderer
                          {field}
                          {block}
                          onChange={updateBlockField}
                        />
                      {/each}
                    </div>
                  </Dialog.Content>
                </Dialog.Root>
              </CardHeader>
              <CardContent>
                <BlockRenderer {block} />
              </CardContent>
            </Card>
          {:else}
            <Card>
              <CardContent class="py-12 text-center">
                <p class="text-muted-foreground">
                  Select a block to edit and preview
                </p>
              </CardContent>
            </Card>
          {/if}
        </div>
      </div>
    </div>
  </div>
  