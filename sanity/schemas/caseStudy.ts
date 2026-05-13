import { defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "company", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "year", type: "string" }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({
      name: "coverImage",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "outcomes",
      title: "Outcome metrics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "value", type: "string", title: "Value (e.g. 40%)" },
            { name: "delta", type: "string", title: "Change label (e.g. +23% MoM)" },
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        },
      ],
    }),
    defineField({
      name: "body",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
      ],
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "order", type: "number", initialValue: 99 }),
  ],
  preview: {
    select: { title: "title", subtitle: "company" },
  },
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
