import { z } from "zod";
import type { BlockDefinition } from "../../types";
import TestimonialsCarousel from "../../components/testimonials/TestimonialsCarousel.svelte";

const testimonialSchema = z.object({
  _id: z.string(),
  quote: z.string(),
  author: z.string(),
  title: z.string(),
  company: z.string().optional(),
  avatarUrl: z.string(),
  avatarFallback: z.string(),
  rating: z.number().min(0).max(5).optional(),
});

const propsSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  testimonials: z.array(testimonialSchema).default([]),
});

export const testimonialsCarouselDefinition: BlockDefinition = {
  type: "testimonials.carousel",
  displayName: "Testimonials Carousel",
  version: 1,
  defaults: {
    title: "What our customers are saying",
    description: "Hear from our satisfied customers about their experience",
    testimonials: [
      {
        _id: "_id1",
        quote:
          "Amazing service! The team was professional, responsive, and delivered exactly what we needed. Highly recommend to anyone looking for quality work.",
        author: "Josh Grazioso",
        title: "Director",
        company: "Webify",
        avatarUrl:
          "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
        avatarFallback: "JG",
        rating: 5,
      },
      {
        _id: "_id2",
        quote:
          "The attention to detail and customer service is outstanding. They took the time to understand our needs and delivered a solution that exceeded expectations.",
        author: "Nicole Grazioso",
        title: "Manager",
        company: "Tech Solutions",
        avatarUrl:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
        avatarFallback: "NG",
        rating: 4.5,
      },
      {
        _id: "_id3",
        quote:
          "Working with this team has been a game-changer for our business. Their expertise and dedication are unmatched.",
        author: "Aaron Larsson",
        title: "CEO",
        company: "StartupCo",
        avatarUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
        avatarFallback: "AL",
        rating: 5,
      },
    ],
  },
  schema: propsSchema,
  ui: [
    {
      path: "title",
      label: "Title",
      kind: "string",
      placeholder: "What our customers are saying",
    },
    {
      path: "description",
      label: "Description",
      kind: "text",
      placeholder: "Subtitle or description",
    },
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
        {
          path: "avatarUrl",
          label: "Avatar URL",
          kind: "string",
          required: true,
          placeholder: "https://...",
        },
        {
          path: "avatarFallback",
          label: "Avatar Fallback",
          kind: "string",
          required: true,
          placeholder: "JD",
          helperText: "Initials shown if image fails to load",
        },
        {
          path: "rating",
          label: "Rating",
          kind: "number",
          min: 0,
          max: 5,
          step: 0.5,
          placeholder: "5",
        },
      ],
    },
  ],
  migrate: (props, fromVersion) => {
    return props;
  },
};

export { TestimonialsCarousel };
