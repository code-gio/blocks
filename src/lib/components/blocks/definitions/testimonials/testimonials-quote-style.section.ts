import { z } from "zod";
import type { BlockDefinition } from "../../types";
import TestimonialsQuoteStyle from "../../components/testimonials/TestimonialsQuoteStyle.svelte";

const testimonialSchema = z.object({
  _id: z.string(),
  quote: z.string(),
  author: z.string(),
  title: z.string(),
  company: z.string().optional(),
});

const propsSchema = z.object({
  testimonials: z.array(testimonialSchema).default([]),
});

export const testimonialsQuoteStyleDefinition: BlockDefinition = {
  type: "testimonials.quote-style",
  displayName: "Testimonials Quote Style",
  version: 1,
  defaults: {
    testimonials: [
      {
        _id: "_id1",
        quote:
          "I just wanted to share a quick note and let you know that you guys do a really good job. I am glad I decided to work with you. It is really great how easy your websites are to update and manage.",
        author: "Aaron Larsson",
        title: "Founder",
        company: "Stride",
      },
      {
        _id: "_id2",
        quote:
          "The team's expertise and dedication helped us achieve our goals faster than we thought possible. Their innovative approach made all the difference.",
        author: "Nicole Grazioso",
        title: "Head of Design",
        company: "Mailchimp",
      },
      {
        _id: "_id3",
        quote:
          "Working with this team has transformed the way we operate. Their insights and solutions have been invaluable to our business growth.",
        author: "Josh Grazioso",
        title: "CTO",
        company: "Tech Corp",
      },
      {
        _id: "_id4",
        quote:
          "Outstanding service from start to finish. They understood our vision and brought it to life with precision and creativity.",
        author: "Sarah Johnson",
        title: "Marketing Director",
        company: "StartupHub",
      },
    ],
  },
  schema: propsSchema,
  ui: [
    {
      path: "testimonials",
      label: "Testimonials",
      kind: "array",
      itemSchema: [
        {
          path: "quote",
          label: "Quote",
          kind: "text",
          required: true,
          placeholder: "Enter testimonial quote",
        },
        {
          path: "author",
          label: "Author Name",
          kind: "string",
          required: true,
          placeholder: "John Doe",
        },
        {
          path: "title",
          label: "Job Title",
          kind: "string",
          required: true,
          placeholder: "CEO",
        },
        {
          path: "company",
          label: "Company",
          kind: "string",
          placeholder: "Company Name",
        },
      ],
    },
  ],
  migrate: (props, fromVersion) => {
    return props;
  },
};

export { TestimonialsQuoteStyle };
