import { z } from "zod";
import type { BlockDefinition } from "../../types";
import HeroCarousel from "../../components/hero/HeroCarousel.svelte";

const slideSchema = z.object({
  _id: z.string(),
  imageUrl: z.string(),
  brand: z.string(),
  title: z.string(),
  ctaText: z.string().optional(),
  ctaHref: z.string().optional(),
});

const propsSchema = z.object({
  slides: z.array(slideSchema).default([]),
  autoplay: z.boolean().optional().default(false),
  autoplayInterval: z.number().optional().default(5000),
  height: z.string().optional().default("h-120 md:h-[calc(100vh-106px)]"),
});

export const heroCarouselDefinition: BlockDefinition = {
  type: "hero.carousel",
  displayName: "Hero Carousel",
  version: 1,
  defaults: {
    slides: [
      {
        _id: "_id1",
        imageUrl:
          "https://images.unsplash.com/photo-1615615228002-890bb61cac6e?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3",
        brand: "Nike React",
        title: "Rewriting sport's playbook for billions of athletes",
        ctaText: "Read Case Studies",
        ctaHref: "#",
      },
      {
        _id: "_id2",
        imageUrl:
          "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3",
        brand: "CoolApps",
        title: "From mobile apps to gaming consoles",
        ctaText: "Read Case Studies",
        ctaHref: "#",
      },
      {
        _id: "_id3",
        imageUrl:
          "https://images.unsplash.com/photo-1629666451094-8908989cae90?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3",
        brand: "Grumpy",
        title: "Bringing Art to everything",
        ctaText: "Read Case Studies",
        ctaHref: "#",
      },
    ],
    autoplay: false,
    autoplayInterval: 5000,
    height: "h-120 md:h-[calc(100vh-106px)]",
  },
  schema: propsSchema,
  ui: [
    {
      path: "autoplay",
      label: "Autoplay",
      kind: "boolean",
      helperText: "Automatically cycle through slides",
    },
    {
      path: "autoplayInterval",
      label: "Autoplay Interval (ms)",
      kind: "number",
      min: 1000,
      max: 10000,
      step: 500,
      helperText: "Time between slide transitions",
    },
    {
      path: "height",
      label: "Height",
      kind: "string",
      placeholder: "h-120 md:h-[calc(100vh-106px)]",
      helperText: "Tailwind height classes",
    },
    {
      path: "slides",
      label: "Slides",
      kind: "array",
      itemSchema: [
        {
          path: "imageUrl",
          label: "Image URL",
          kind: "string",
          required: true,
          placeholder: "https://...",
        },
        {
          path: "brand",
          label: "Brand",
          kind: "string",
          required: true,
          placeholder: "Brand name",
        },
        {
          path: "title",
          label: "Title",
          kind: "string",
          required: true,
          placeholder: "Slide title",
        },
        {
          path: "ctaText",
          label: "CTA Text",
          kind: "string",
          placeholder: "Button text",
        },
        {
          path: "ctaHref",
          label: "CTA Link",
          kind: "string",
          placeholder: "https://...",
        },
      ],
    },
  ],
  migrate: (props, fromVersion) => {
    return props;
  },
};

export { HeroCarousel };
