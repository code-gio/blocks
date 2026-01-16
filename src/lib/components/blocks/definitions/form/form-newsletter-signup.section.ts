import { z } from "zod";
import type { BlockDefinition } from "../../types";
import FormNewsletterSignUp from "../../components/form/FormNewsletterSignUp.svelte";

const propsSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  placeholder: z.string().default("Enter your email"),
  buttonText: z.string().default("Subscribe"),
});

export const formNewsletterSignUpDefinition: BlockDefinition = {
  type: "form.newsletter-signup",
  displayName: "Form Newsletter Sign Up",
  version: 1,
  defaults: {
    title: "Subscribe to our newsletter",
    description: "Stay up to date with the latest news and updates.",
    placeholder: "Enter your email",
    buttonText: "Subscribe",
  },
  schema: propsSchema,
  ui: [
    { path: "title", label: "Title", kind: "string" },
    { path: "description", label: "Description", kind: "text" },
    {
      path: "placeholder",
      label: "Input Placeholder",
      kind: "string",
      required: true,
    },
    {
      path: "buttonText",
      label: "Button Text",
      kind: "string",
      required: true,
    },
  ],
  migrate: (props, fromVersion) => props,
};

export { FormNewsletterSignUp };
