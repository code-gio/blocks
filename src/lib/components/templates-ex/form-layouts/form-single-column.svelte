<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '../utils';
	import { getTemplateDefaults } from '../template-registry';

	interface FormSingleColumnProps {
		title?: string;
		onSubmit?: (data: any) => void;
	}

	const DEFAULTS = getTemplateDefaults('form-single-column') || {};

	let {
		title = DEFAULTS.title || 'Form',
		onSubmit = DEFAULTS.onSubmit
	}: FormSingleColumnProps = $props();

	let formData = $state({ name: '', email: '', message: '' });

	function handleSubmit(e: Event) {
		e.preventDefault();
		onSubmit?.(formData);
	}
</script>

<div class="mx-auto max-w-xl px-4 py-10">
	<Card>
		<CardHeader>
			<CardTitle>{title}</CardTitle>
		</CardHeader>
		<CardContent>
			<form onsubmit={handleSubmit} class="space-y-4">
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
		</CardContent>
	</Card>
</div>

