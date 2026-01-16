<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Select } from '$lib/components/ui/select';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { cn } from '../utils';
	import { getTemplateDefaults } from '../template-registry';

	interface FormFeedbackDetailedProps {
		title?: string;
		description?: string;
		submitText?: string;
		categories?: string[];
	}

	const DEFAULTS = getTemplateDefaults('form-feedback-detailed') || {};

	let {
		title = DEFAULTS.title,
		description = DEFAULTS.description,
		submitText = DEFAULTS.submitText,
		categories = DEFAULTS.categories || []
	}: FormFeedbackDetailedProps = $props();
</script>

<div class="mx-auto max-w-340 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
	<Card class="mx-auto max-w-2xl">
		<CardHeader>
			<CardTitle class="text-2xl">{title}</CardTitle>
			{#if description}
				<p class="text-sm text-muted-foreground">{description}</p>
			{/if}
		</CardHeader>
		<CardContent>
			<form class="space-y-4">
				<div class="grid gap-4 sm:grid-cols-2">
					<div>
						<Label for="name">Name</Label>
						<Input id="name" type="text" placeholder="Your name" required />
					</div>
					<div>
						<Label for="email">Email</Label>
						<Input id="email" type="email" placeholder="your.email@example.com" required />
					</div>
				</div>
				<div>
					<Label for="subject">Subject</Label>
					<Input id="subject" type="text" placeholder="Brief description" required />
				</div>
				{#if categories.length > 0}
					<div>
						<Label for="category">Category</Label>
						<select
							id="category"
							class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
						>
							{#each categories as category}
								<option value={category}>{category}</option>
							{/each}
						</select>
					</div>
				{/if}
				<div>
					<Label for="message">Message</Label>
					<Textarea
						id="message"
						placeholder="Provide detailed feedback..."
						rows={6}
						required
					/>
				</div>
				<Button type="submit" class="w-full">
					{submitText}
				</Button>
			</form>
		</CardContent>
	</Card>
</div>

