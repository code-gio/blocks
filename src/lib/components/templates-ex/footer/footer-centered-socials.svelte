<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { getTemplateDefaults } from '../template-registry';

	interface FooterLink {
		text: string;
		href: string;
	}

	interface SocialLink {
		platform: string;
		href: string;
		icon: string;
	}

	interface FooterCenteredSocialsProps {
		brandName?: string;
		copyright?: string;
		links?: FooterLink[];
		socials?: SocialLink[];
	}

	const DEFAULTS = getTemplateDefaults('footer-centered-socials') || {};

	let {
		brandName = DEFAULTS.brandName,
		copyright = DEFAULTS.copyright,
		links = DEFAULTS.links,
		socials = DEFAULTS.socials
	}: FooterCenteredSocialsProps = $props();
</script>

<footer class="mx-auto mt-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="text-center">
		<div>
			<a
				class="flex-none text-xl font-semibold text-foreground focus:opacity-80 focus:outline-hidden"
				href="#"
				aria-label="Brand"
			>
				{brandName}
			</a>
		</div>

		<!-- Links -->
		<div class="mt-3">
			{#each links as link, index}
				<a
					class="inline-flex gap-x-2 text-sm text-muted-foreground hover:text-foreground focus:text-foreground focus:outline-hidden"
					href={link.href}
				>
					{link.text}
				</a>
				{#if index < links.length - 1}
					<span class="mx-2 text-muted-foreground">•</span>
				{/if}
			{/each}
		</div>
		<!-- End Links -->

		<!-- Social Brands -->
		{#if socials && socials.length > 0}
			<div class="mt-6 flex justify-center gap-x-2">
				{#each socials as social}
					<Button
						variant="ghost"
						size="icon"
						href={social.href}
						class="size-10 text-muted-foreground hover:bg-muted hover:text-foreground"
					>
						<div class="size-4 shrink-0">
							{@html social.icon}
						</div>
						<span class="sr-only">{social.platform}</span>
					</Button>
				{/each}
			</div>
		{/if}
		<!-- End Social Brands -->

		<p class="mt-5 text-sm text-muted-foreground">{copyright}</p>
	</div>
</footer>
