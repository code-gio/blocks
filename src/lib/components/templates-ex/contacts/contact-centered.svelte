<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { cn } from '../utils';
	import { getTemplateDefaults } from '../template-registry';

	interface ContactCenteredProps {
		title?: string;
		description?: string;
		submitText?: string;
	}

	const DEFAULTS = getTemplateDefaults('contact-centered') || {};

	let {
		title = DEFAULTS.title,
		description = DEFAULTS.description,
		submitText = DEFAULTS.submitText
	}: ContactCenteredProps = $props();
</script>

<div class="mx-auto max-w-340 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
	<div class="mx-auto max-w-2xl">
		<div class="text-center">
			<h1 class="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-primary-foreground">
				{title}
			</h1>
			{#if description}
				<p class="mt-1 text-muted-foreground">
					{description}
				</p>
			{/if}
		</div>

		<Card class="mt-10">
			<CardContent class="p-6">
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
						<Input id="subject" type="text" placeholder="How can we help?" required />
					</div>
					<div>
						<Label for="message">Message</Label>
						<Textarea
							id="message"
							placeholder="Tell us more..."
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
</div>

