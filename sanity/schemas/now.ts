import { defineField, defineType } from "sanity";

export const now = defineType({
  name: "now",
  title: "Now",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Building", value: "building" },
          { title: "Shipped", value: "shipped" },
          { title: "Learning", value: "learning" },
          { title: "Paused", value: "paused" },
        ],
        layout: "radio",
      },
      initialValue: "building",
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", type: "text", rows: 2 }),
    defineField({ name: "link", type: "url" }),
    defineField({
      name: "startedAt",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "current",
      type: "boolean",
      description:
        "Show in the hero 'currently building' pill — the newest current entry wins",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "status" },
  },
  orderings: [
    {
      title: "Newest first",
      name: "startedAtDesc",
      by: [{ field: "startedAt", direction: "desc" }],
    },
  ],
});
