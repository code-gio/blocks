import { z } from "zod";
import type { BlockDefinition } from "../../types";
import HeroWithImageReviews from "../../components/hero/HeroWithImageReviews.svelte";

const reviewSchema = z.object({
  _id: z.string(),
  rating: z.number().min(0).max(5),
  totalReviews: z.string(),
  platform: z.string(),
  platformLogo: z.string().optional(),
});

const propsSchema = z.object({
  title: z.string().optional(),
  brandName: z.string().optional(),
  highlight: z.string().optional(),
  description: z.string().optional(),
  imageSrc: z.string().optional(),
  imageAlt: z.string().optional(),
  showReviews: z.boolean().optional().default(true),
  reviews: z.array(reviewSchema).default([]),
  ctaPrimaryText: z.string().optional(),
  ctaPrimaryHref: z.string().optional(),
  ctaSecondaryText: z.string().optional(),
  ctaSecondaryHref: z.string().optional(),
});

export const heroWithImageReviewsDefinition: BlockDefinition = {
  type: "hero.with-image-reviews",
  displayName: "Hero with Image & Reviews",
  version: 1,
  defaults: {
    title: "Start your journey with",
    brandName: "Preline",
    highlight: "",
    description:
      "Hand-picked professionals and expertly crafted components, designed for any kind of entrepreneur.",
    imageSrc:
      "https://images.unsplash.com/photo-1665686377065-08ba896d16fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&h=800",
    imageAlt: "Hero Image",
    showReviews: true,
    reviews: [
      {
        _id: "_id1",
        rating: 4.6,
        totalReviews: "12k",
        platform: "Google",
        platformLogo: "google",
      },
      {
        _id: "_id2",
        rating: 4.8,
        totalReviews: "5k",
        platform: "Trustpilot",
        platformLogo: "trustpilot",
      },
    ],
    ctaPrimaryText: "Get started",
    ctaPrimaryHref: "#",
    ctaSecondaryText: "Contact sales team",
    ctaSecondaryHref: "#",
  },
  schema: propsSchema,
  ui: [
    {
      path: "title",
      label: "Title",
      kind: "string",
      required: true,
      placeholder: "Start your journey with",
    },
    {
      path: "brandName",
      label: "Brand Name",
      kind: "string",
      placeholder: "Your Brand",
    },
    {
      path: "highlight",
      label: "Highlighted Text",
      kind: "string",
      placeholder: "Optional highlighted text instead of brand",
      helperText: "If provided, will be used instead of brand name",
    },
    {
      path: "description",
      label: "Description",
      kind: "text",
      required: true,
      placeholder: "Enter hero description",
    },
    {
      path: "imageSrc",
      label: "Image URL",
      kind: "string",
      placeholder: "https://...",
    },
    {
      path: "imageAlt",
      label: "Image Alt Text",
      kind: "string",
      placeholder: "Hero Image",
    },
    {
      path: "ctaPrimaryText",
      label: "Primary CTA Text",
      kind: "string",
      placeholder: "Get started",
    },
    {
      path: "ctaPrimaryHref",
      label: "Primary CTA Link",
      kind: "string",
      placeholder: "https://...",
    },
    {
      path: "ctaSecondaryText",
      label: "Secondary CTA Text",
      kind: "string",
      placeholder: "Contact sales team",
    },
    {
      path: "ctaSecondaryHref",
      label: "Secondary CTA Link",
      kind: "string",
      placeholder: "https://...",
    },
    {
      path: "showReviews",
      label: "Show Reviews",
      kind: "boolean",
      helperText: "Display review section",
    },
    {
      path: "reviews",
      label: "Reviews",
      kind: "array",
      itemSchema: [
        {
          path: "rating",
          label: "Rating",
          kind: "number",
          required: true,
          min: 0,
          max: 5,
          step: 0.1,
        },
        {
          path: "totalReviews",
          label: "Total Reviews",
          kind: "string",
          required: true,
          placeholder: "12k",
        },
        {
          path: "platform",
          label: "Platform",
          kind: "string",
          required: true,
          placeholder: "Google",
        },
        {
          path: "platformLogo",
          label: "Platform Logo",
          kind: "enum",
          options: [
            { value: "", label: "None" },
            { value: "google", label: "Google" },
            { value: "trustpilot", label: "Trustpilot" },
          ],
        },
      ],
    },
  ],
  migrate: (props, fromVersion) => {
    return props;
  },
};

export { HeroWithImageReviews };
