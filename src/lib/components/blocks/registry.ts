import type { Component } from 'svelte';
import BlockFallback from './components/BlockFallback.svelte';
import { FeaturesSection } from './definitions/features/features.section';
import { HeroCarousel } from "./definitions/hero/hero-carousel.section";
import { HeroWithImageReviews } from "./definitions/hero/hero-with-image-reviews.section";
import { PricingCardsToggle } from "./definitions/pricing/pricing-cards-toggle.section";
import { FaqCenteredCards } from "./definitions/faq/faq-centered-cards.section";
import { TestimonialsCarousel } from "./definitions/testimonials/testimonials-carousel.section";
import { TestimonialsQuoteStyle } from "./definitions/testimonials/testimonials-quote-style.section";
import { GalleryGrid } from "./definitions/gallery/gallery-grid.section";
import { GalleryMasonry } from "./definitions/gallery/gallery-masonry.section";
import { FormSingleColumn } from "./definitions/form/form-single-column.section";
import { FormContactSimple } from "./definitions/form/form-contact-simple.section";
import { FormNewsletterSignUp } from "./definitions/form/form-newsletter-signup.section";
import { FooterCenteredSocials } from "./definitions/footer/footer-centered-socials.section";
import { ContactCentered } from "./definitions/contact/contact-centered.section";
import { ContactWithForm } from "./definitions/contact/contact-with-form.section";

/**
 * Component Registry - Maps block.type to Svelte component.
 * Rendering-only, no schema or builder logic.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const REGISTRY = new Map<string, Component<any, any, any>>();

// Register block components
registerBlock("features.section", FeaturesSection);
registerBlock("hero.carousel", HeroCarousel);
registerBlock("hero.with-image-reviews", HeroWithImageReviews);
registerBlock("pricing.cards-toggle", PricingCardsToggle);
registerBlock("faq.centered-cards", FaqCenteredCards);
registerBlock("testimonials.carousel", TestimonialsCarousel);
registerBlock("testimonials.quote-style", TestimonialsQuoteStyle);
registerBlock("gallery.grid", GalleryGrid);
registerBlock("gallery.masonry", GalleryMasonry);
registerBlock("form.single-column", FormSingleColumn);
registerBlock("form.contact-simple", FormContactSimple);
registerBlock("form.newsletter-signup", FormNewsletterSignUp);
registerBlock("footer.centered-socials", FooterCenteredSocials);
registerBlock("contact.centered", ContactCentered);
registerBlock("contact.with-form", ContactWithForm);

/**
 * Register a block component.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function registerBlock(
  type: string,
  component: Component<any, any, any>
): void {
  REGISTRY.set(type, component);
}

/**
 * Get block component by type, with fallback for unknown types.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getBlockComponent(type: string): Component<any, any, any> {
  return REGISTRY.get(type) ?? BlockFallback;
}

/**
 * Check if a block type is registered.
 */
export function hasBlockComponent(type: string): boolean {
	return REGISTRY.has(type);
}
