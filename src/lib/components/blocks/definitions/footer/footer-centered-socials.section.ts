import { z } from "zod";
import type { BlockDefinition } from "../../types";
import FooterCenteredSocials from "../../components/footer/FooterCenteredSocials.svelte";

export const footerCenteredSocialsDefinition: BlockDefinition = {
  type: "footer.centered-socials",
  displayName: "Footer Centered with Socials",
  version: 1,
  defaults: {
    brandName: "Brand",
    copyright: "© 2024 Brand. All rights reserved.",
    links: [
      { _id: "_id1", text: "About", href: "#" },
      { _id: "_id2", text: "Services", href: "#" },
      { _id: "_id3", text: "Contact", href: "#" },
    ],
    socials: [
      { _id: "_id1", platform: "Twitter", href: "#", iconKey: "x" },
      { _id: "_id2", platform: "GitHub", href: "#", iconKey: "home" },
    ],
  },
  schema: z.object({
    brandName: z.string().optional(),
    copyright: z.string().optional(),
    links: z
      .array(z.object({ _id: z.string(), text: z.string(), href: z.string() }))
      .default([]),
    socials: z
      .array(
        z.object({
          _id: z.string(),
          platform: z.string(),
          href: z.string(),
          iconKey: z.string(),
        })
      )
      .default([]),
  }),
  ui: [
    {
      path: "brandName",
      label: "Brand Name",
      kind: "string",
      placeholder: "Brand",
    },
    {
      path: "copyright",
      label: "Copyright",
      kind: "string",
      placeholder: "© 2024 Brand",
    },
    {
      path: "links",
      label: "Links",
      kind: "array",
      itemSchema: [
        { path: "text", label: "Text", kind: "string", required: true },
        { path: "href", label: "URL", kind: "string", required: true },
      ],
    },
    {
      path: "socials",
      label: "Social Links",
      kind: "array",
      itemSchema: [
        { path: "platform", label: "Platform", kind: "string", required: true },
        { path: "href", label: "URL", kind: "string", required: true },
        { path: "iconKey", label: "Icon", kind: "icon", required: true },
      ],
    },
  ],
  migrate: (props) => props,
};

export { FooterCenteredSocials };
