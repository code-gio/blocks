import { z } from "zod";
import type { BlockDefinition } from "../../types";
import GalleryMasonry from "../../components/gallery/GalleryMasonry.svelte";

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

export const galleryMasonryDefinition: BlockDefinition = {
  type: "gallery.masonry",
  displayName: "Gallery Masonry",
  version: 1,
  defaults: {
    title: "Masonry Gallery",
    description: "Explore our collection",
    images: [
      {
        _id: "_id1",
        src: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=600",
        alt: "Image 1",
        title: "Mountain",
      },
      {
        _id: "_id2",
        src: "https://images.unsplash.com/photo-1668906093328-99601a1aa584?w=600",
        alt: "Image 2",
        title: "Ocean",
      },
      {
        _id: "_id3",
        src: "https://images.unsplash.com/photo-1567016526105-22da7c13161a?w=600",
        alt: "Image 3",
        title: "Forest",
      },
    ],
  },
  schema: propsSchema,
  ui: [
    { path: "title", label: "Title", kind: "string" },
    { path: "description", label: "Description", kind: "text" },
    {
      path: "images",
      label: "Images",
      kind: "array",
      itemSchema: [
        { path: "src", label: "Image URL", kind: "string", required: true },
        { path: "alt", label: "Alt Text", kind: "string", required: true },
        { path: "title", label: "Title", kind: "string" },
      ],
    },
  ],
  migrate: (props, fromVersion) => props,
};

export { GalleryMasonry };
