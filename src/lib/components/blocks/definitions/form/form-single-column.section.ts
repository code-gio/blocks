import { z } from "zod";
import type { BlockDefinition } from "../../types";
import FormSingleColumn from "../../components/form/FormSingleColumn.svelte";

export const formSingleColumnDefinition: BlockDefinition = {
  type: "form.single-column",
  displayName: "Form Single Column",
  version: 1,
  defaults: { title: "Contact Form" },
  schema: z.object({ title: z.string().optional() }),
  ui: [
    {
      path: "title",
      label: "Title",
      kind: "string",
      placeholder: "Contact Form",
    },
  ],
  migrate: (props) => props,
};

export { FormSingleColumn };
