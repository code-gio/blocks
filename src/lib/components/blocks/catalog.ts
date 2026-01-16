import type { BlockInstance, BlockDefinition } from './types';

/**
 * Block Definitions Catalog - Imports all block definitions and provides lookup.
 * Includes migration support for version mismatches.
 */

// Import block definitions here as they are created
import { featuresSectionDefinition } from './definitions/features/features.section';
import { heroCarouselDefinition } from "./definitions/hero/hero-carousel.section";
import { heroWithImageReviewsDefinition } from "./definitions/hero/hero-with-image-reviews.section";
import { pricingCardsToggleDefinition } from "./definitions/pricing/pricing-cards-toggle.section";
import { faqCenteredCardsDefinition } from "./definitions/faq/faq-centered-cards.section";
import { testimonialsCarouselDefinition } from "./definitions/testimonials/testimonials-carousel.section";
import { testimonialsQuoteStyleDefinition } from "./definitions/testimonials/testimonials-quote-style.section";
import { galleryGridDefinition } from "./definitions/gallery/gallery-grid.section";
import { galleryMasonryDefinition } from "./definitions/gallery/gallery-masonry.section";
import { formSingleColumnDefinition } from "./definitions/form/form-single-column.section";
import { formContactSimpleDefinition } from "./definitions/form/form-contact-simple.section";
import { formNewsletterSignUpDefinition } from "./definitions/form/form-newsletter-signup.section";
import { footerCenteredSocialsDefinition } from "./definitions/footer/footer-centered-socials.section";
import { contactCenteredDefinition } from "./definitions/contact/contact-centered.section";
import { contactWithFormDefinition } from "./definitions/contact/contact-with-form.section";

const definitions: BlockDefinition[] = [
  featuresSectionDefinition,
  heroCarouselDefinition,
  heroWithImageReviewsDefinition,
  pricingCardsToggleDefinition,
  faqCenteredCardsDefinition,
  testimonialsCarouselDefinition,
  testimonialsQuoteStyleDefinition,
  galleryGridDefinition,
  galleryMasonryDefinition,
  formSingleColumnDefinition,
  formContactSimpleDefinition,
  formNewsletterSignUpDefinition,
  footerCenteredSocialsDefinition,
  contactCenteredDefinition,
  contactWithFormDefinition,
];

export const catalog: Record<string, BlockDefinition> = {};

// Build catalog from definitions array
for (const def of definitions) {
	catalog[def.type] = def;
}

export const blockList: Array<{ type: string; displayName: string }> = definitions.map((def) => ({
	type: def.type,
	displayName: def.displayName
}));

/**
 * Get block definition by type.
 */
export function getBlockDefinition(type: string): BlockDefinition | undefined {
	return catalog[type];
}

/**
 * Migrate a block instance if its version is older than the current definition version.
 * Returns a new block instance with migrated props and updated version.
 */
export function migrateBlock(block: BlockInstance): BlockInstance {
	const definition = getBlockDefinition(block.type);

	if (!definition) {
		// Unknown block type, return as-is
		return block;
	}

	// If versions match, no migration needed
	if (block.version === definition.version) {
		return block;
	}

	// If block version is newer than definition, return as-is (shouldn't happen, but be safe)
	if (block.version > definition.version) {
		return block;
	}

	// Block needs migration
	if (definition.migrate) {
		const migratedProps = definition.migrate(block.props, block.version);
		return {
			...block,
			props: migratedProps,
			version: definition.version
		};
	}

	// No migration function available, but version mismatch exists
	// Return block with updated version (may break rendering, but at least version is correct)
	return {
		...block,
		version: definition.version
	};
}
