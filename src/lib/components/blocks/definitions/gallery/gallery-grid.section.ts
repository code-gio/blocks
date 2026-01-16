import { z } from "zod";
import type { BlockDefinition } from "../../types";
import GalleryGrid from "../../components/gallery/GalleryGrid.svelte";

const imageSchema = z.object({
  _id: z.string(),
  src: z.string(),
  alt: z.string(),
  title: z.string().optional(),
});

const propsSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  images: z.array(imageSchema).default([]),
});

export const galleryGridDefinition: BlockDefinition = {
  type: "gallery.grid",
  displayName: "Gallery Grid",
  version: 1,
  defaults: {
    title: "Our Gallery",
    description: "Explore our collection",
    images: [
      {
        _id: "_id1",
        src: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800&q=80",
        alt: "Gallery image 1",
        title: "Mountain View",
      },
      {
        _id: "_id2",
        src: "https://images.unsplash.com/photo-1668906093328-99601a1aa584?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800&q=80",
        alt: "Gallery image 2",
        title: "Ocean Waves",
      },
      {
        _id: "_id3",
        src: "https://images.unsplash.com/photo-1567016526105-22da7c13161a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800&q=80",
        alt: "Gallery image 3",
        title: "Forest Path",
      },
    ],
  },
  schema: propsSchema,
  ui: [
    {
      path: "title",
      label: "Title",
      kind: "string",
      placeholder: "Our Gallery",
    },
    {
      path: "description",
      label: "Description",
      kind: "text",
      placeholder: "Explore our collection",
    },
    {
      path: "images",
      label: "Images",
      kind: "array",
      itemSchema: [
        {
          path: "src",
          label: "Image URL",
          kind: "string",
          required: true,
          placeholder: "https://...",
        },
        {
          path: "alt",
          label: "Alt Text",
          kind: "string",
          required: true,
          placeholder: "Description of image",
        },
        {
          path: "title",
          label: "Title",
          kind: "string",
          placeholder: "Optional title",
        },
      ],
    },
  ],
  migrate: (props, fromVersion) => {
    return props;
  },
};

export { GalleryGrid };
