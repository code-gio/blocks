import { z } from "zod";
import type { BlockDefinition } from "../../types";
import PricingCardsToggle from "../../components/pricing/PricingCardsToggle.svelte";

const pricingPlanSchema = z.object({
  _id: z.string(),
  name: z.string(),
  price: z.union([z.number(), z.string()]),
  priceAnnual: z.number().optional(),
  description: z.string(),
  features: z.array(z.string()).default([]),
  ctaText: z.string(),
  ctaHref: z.string(),
  isPopular: z.boolean().optional().default(false),
});

const propsSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  monthlyLabel: z.string().optional().default("Monthly"),
  annualLabel: z.string().optional().default("Annual"),
  annualSavings: z.string().optional(),
  plans: z.array(pricingPlanSchema).default([]),
});

export const pricingCardsToggleDefinition: BlockDefinition = {
  type: "pricing.cards-toggle",
  displayName: "Pricing Cards with Toggle",
  version: 1,
  defaults: {
    title: "Pricing",
    description: "Choose the plan that works best for you",
    monthlyLabel: "Monthly",
    annualLabel: "Annual",
    annualSavings: "Save up to 10%",
    plans: [
      {
        _id: "_id1",
        name: "Free",
        price: 0,
        priceAnnual: 0,
        description: "Forever free",
        features: ["1 user", "Plan features", "Product support"],
        ctaText: "Sign up",
        ctaHref: "#",
        isPopular: false,
      },
      {
        _id: "_id2",
        name: "Startup",
        price: 39,
        priceAnnual: 29,
        description: "All the basics for starting a new business",
        features: [
          "2 users",
          "Plan features",
          "Product support",
          "Unlimited products",
          "Advanced analytics",
        ],
        ctaText: "Sign up",
        ctaHref: "#",
        isPopular: true,
      },
      {
        _id: "_id3",
        name: "Team",
        price: 89,
        priceAnnual: 79,
        description: "Everything you need for a growing business",
        features: [
          "5 users",
          "Plan features",
          "Product support",
          "Unlimited products",
          "Advanced analytics",
          "Priority support",
        ],
        ctaText: "Sign up",
        ctaHref: "#",
        isPopular: false,
      },
      {
        _id: "_id4",
        name: "Enterprise",
        price: "Contact us",
        description: "Advanced features for scaling your business",
        features: [
          "Unlimited users",
          "Plan features",
          "Product support",
          "Unlimited products",
          "Advanced analytics",
          "Dedicated support",
          "Custom integrations",
        ],
        ctaText: "Contact us",
        ctaHref: "#",
        isPopular: false,
      },
    ],
  },
  schema: propsSchema,
  ui: [
    {
      path: "title",
      label: "Title",
      kind: "string",
      required: true,
      placeholder: "Pricing",
    },
    {
      path: "description",
      label: "Description",
      kind: "text",
      placeholder: "Choose the plan that works best for you",
    },
    {
      path: "monthlyLabel",
      label: "Monthly Label",
      kind: "string",
      placeholder: "Monthly",
    },
    {
      path: "annualLabel",
      label: "Annual Label",
      kind: "string",
      placeholder: "Annual",
    },
    {
      path: "annualSavings",
      label: "Annual Savings Text",
      kind: "string",
      placeholder: "Save up to 10%",
      helperText: "Optional badge text shown next to annual toggle",
    },
    {
      path: "plans",
      label: "Pricing Plans",
      kind: "array",
      itemSchema: [
        {
          path: "name",
          label: "Plan Name",
          kind: "string",
          required: true,
          placeholder: "Startup",
        },
        {
          path: "price",
          label: "Monthly Price",
          kind: "string",
          required: true,
          placeholder: '39 or "Contact us"',
          helperText: 'Number or text like "Contact us"',
        },
        {
          path: "priceAnnual",
          label: "Annual Price",
          kind: "number",
          placeholder: "29",
          helperText: "Optional annual pricing",
        },
        {
          path: "description",
          label: "Description",
          kind: "string",
          required: true,
          placeholder: "All the basics for starting a new business",
        },
        {
          path: "features",
          label: "Features (one per line)",
          kind: "text",
          required: true,
          helperText: "Enter features separated by newlines",
        },
        {
          path: "ctaText",
          label: "CTA Button Text",
          kind: "string",
          required: true,
          placeholder: "Sign up",
        },
        {
          path: "ctaHref",
          label: "CTA Button Link",
          kind: "string",
          required: true,
          placeholder: "#",
        },
        {
          path: "isPopular",
          label: "Mark as Popular",
          kind: "boolean",
          helperText: "Highlights this plan",
        },
      ],
    },
  ],
  migrate: (props, fromVersion) => {
    return props;
  },
};

export { PricingCardsToggle };
