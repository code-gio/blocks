import { z } from "zod";
import type { BlockDefinition } from "../../types";
import ContactCentered from "../../components/contact/ContactCentered.svelte";

export const contactCenteredDefinition: BlockDefinition = {
  type: "contact.centered",
  displayName: "Contact Centered",
  version: 1,
  defaults: {
    title: "Contact Us",
    description: "We'd love to hear from you",
    submitText: "Send Message",
  },
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    submitText: z.string().optional(),
  }),
  ui: [
    {
      path: "title",
      label: "Title",
      kind: "string",
      placeholder: "Contact Us",
    },
    { path: "description", label: "Description", kind: "text" },
    {
      path: "submitText",
      label: "Submit Button Text",
      kind: "string",
      placeholder: "Send Message",
    },
  ],
  migrate: (props) => props,
};

export { ContactCentered };
