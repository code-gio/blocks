<script lang="ts">
	import type { RichTextFieldDef } from '$lib/components/blocks/types';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon } from '@lucide/svelte';

	interface Props {
		field: RichTextFieldDef;
		value: string;
		onChange: (value: string) => void;
	}

	const { field, value = '', onChange }: Props = $props();

	let contentEditableRef: HTMLDivElement | null = $state(null);
	let htmlValue = $state(value);

	// Sync state when value prop changes
	$effect(() => {
		htmlValue = value;
		if (contentEditableRef) {
			contentEditableRef.innerHTML = value || '';
		}
	});

	// Call onChange when content changes
	$effect(() => {
		if (htmlValue !== value) {
			onChange(htmlValue);
		}
	});

	function handleInput() {
		if (contentEditableRef) {
			htmlValue = contentEditableRef.innerHTML;
		}
	}

	function formatCommand(command: string, value?: string) {
		document.execCommand(command, false, value);
		if (contentEditableRef) {
			contentEditableRef.focus();
			htmlValue = contentEditableRef.innerHTML;
		}
	}

	function insertLink() {
		const url = prompt('Enter URL:');
		if (url) {
			formatCommand('createLink', url);
		}
	}
</script>

<div class="space-y-2">
	<Label for={field.path}>{field.label}</Label>
	<div class="border rounded-md">
		<!-- Toolbar -->
		<div class="flex items-center gap-1 p-2 border-b">
			<Button
				type="button"
				variant="ghost"
				size="sm"
				onclick={() => formatCommand('bold')}
				class="h-8 w-8 p-0"
				title="Bold"
			>
				<Bold class="h-4 w-4" />
			</Button>
			<Button
				type="button"
				variant="ghost"
				size="sm"
				onclick={() => formatCommand('italic')}
				class="h-8 w-8 p-0"
				title="Italic"
			>
				<Italic class="h-4 w-4" />
			</Button>
			<Button
				type="button"
				variant="ghost"
				size="sm"
				onclick={() => formatCommand('underline')}
				class="h-8 w-8 p-0"
				title="Underline"
			>
				<Underline class="h-4 w-4" />
			</Button>
			<div class="w-px h-6 bg-border mx-1" />
			<Button
				type="button"
				variant="ghost"
				size="sm"
				onclick={() => formatCommand('insertUnorderedList')}
				class="h-8 w-8 p-0"
				title="Bullet List"
			>
				<List class="h-4 w-4" />
			</Button>
			<Button
				type="button"
				variant="ghost"
				size="sm"
				onclick={() => formatCommand('insertOrderedList')}
				class="h-8 w-8 p-0"
				title="Numbered List"
			>
				<ListOrdered class="h-4 w-4" />
			</Button>
			<div class="w-px h-6 bg-border mx-1" />
			<Button
				type="button"
				variant="ghost"
				size="sm"
				onclick={insertLink}
				class="h-8 w-8 p-0"
				title="Insert Link"
			>
				<LinkIcon class="h-4 w-4" />
			</Button>
		</div>
		<!-- Editor -->
		<div
			bind:this={contentEditableRef}
			contenteditable="true"
			class="min-h-[120px] p-3 focus:outline-none prose prose-sm max-w-none"
			oninput={handleInput}
			data-placeholder={field.placeholder || 'Start typing...'}
			role="textbox"
			aria-label={field.label}
		>
			{@html htmlValue}
		</div>
	</div>
	{#if field.helperText}
		<p class="text-sm text-muted-foreground">{field.helperText}</p>
	{/if}
</div>

<style>
	[contenteditable][data-placeholder]:empty:before {
		content: attr(data-placeholder);
		color: hsl(var(--muted-foreground));
		pointer-events: none;
	}

	[contenteditable] {
		word-wrap: break-word;
	}

	[contenteditable]:focus {
		outline: none;
	}

	[contenteditable] p {
		margin: 0.5em 0;
	}

	[contenteditable] p:first-child {
		margin-top: 0;
	}

	[contenteditable] p:last-child {
		margin-bottom: 0;
	}

	[contenteditable] ul,
	[contenteditable] ol {
		margin: 0.5em 0;
		padding-left: 1.5em;
	}

	[contenteditable] a {
		color: hsl(var(--primary));
		text-decoration: underline;
	}
</style>
