import { z } from "zod";
import type { BlockDefinition } from "../../types";
import FormContactSimple from "../../components/form/FormContactSimple.svelte";

const categorySchema = z.object({
  _id: z.string(),
  value: z.string(),
  label: z.string(),
});

const propsSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  submitText: z.string().default("Send Message"),
  categories: z.array(categorySchema).default([]),
});

export const formContactSimpleDefinition: BlockDefinition = {
  type: "form.contact-simple",
  displayName: "Form Contact Simple",
  version: 1,
  defaults: {
    title: "Get in touch",
    description:
      "We would love to hear from you. Please fill out the form below.",
    submitText: "Send Message",
    categories: [
      { _id: "_cat1", value: "general", label: "General Inquiry" },
      { _id: "_cat2", value: "support", label: "Support" },
      { _id: "_cat3", value: "sales", label: "Sales" },
      { _id: "_cat4", value: "feedback", label: "Feedback" },
    ],
  },
  schema: propsSchema,
  ui: [
    { path: "title", label: "Title", kind: "string" },
    { path: "description", label: "Description", kind: "text" },
    {
      path: "submitText",
      label: "Submit Button Text",
      kind: "string",
      required: true,
    },
    {
      path: "categories",
      label: "Categories",
      kind: "array",
      itemSchema: [
        { path: "value", label: "Value", kind: "string", required: true },
        { path: "label", label: "Label", kind: "string", required: true },
      ],
    },
  ],
  migrate: (props, fromVersion) => props,
};

export { FormContactSimple };
