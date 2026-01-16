import { z } from "zod";
import type { BlockDefinition } from "../../types";
import ContactWithForm from "../../components/contact/ContactWithForm.svelte";

export const contactWithFormDefinition: BlockDefinition = {
  type: "contact.with-form",
  displayName: "Contact with Form",
  version: 1,
  defaults: {
    title: "Contact Us",
    description: "We'd love to hear from you",
    submitText: "Send Message",
    contactInfo: [
      {
        _id: "_id1",
        iconKey: "mail",
        title: "Email us",
        value: "hello@example.com",
      },
      {
        _id: "_id2",
        iconKey: "phone",
        title: "Call us",
        value: "+1 (555) 000-0000",
      },
      {
        _id: "_id3",
        iconKey: "map-pin",
        title: "Visit us",
        value: "123 Main St, City, State 12345",
      },
    ],
  },
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    submitText: z.string().optional(),
    contactInfo: z
      .array(
        z.object({
          _id: z.string(),
          iconKey: z.string(),
          title: z.string(),
          value: z.string(),
        })
      )
      .default([]),
  }),
  ui: [
    { path: "title", label: "Title", kind: "string" },
    { path: "description", label: "Description", kind: "text" },
    { path: "submitText", label: "Submit Text", kind: "string" },
    {
      path: "contactInfo",
      label: "Contact Info",
      kind: "array",
      itemSchema: [
        { path: "iconKey", label: "Icon", kind: "icon", required: true },
        { path: "title", label: "Title", kind: "string", required: true },
        { path: "value", label: "Value", kind: "string", required: true },
      ],
    },
  ],
  migrate: (props) => props,
};

export { ContactWithForm };
