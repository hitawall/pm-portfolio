import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "kind",
      type: "string",
      options: {
        list: [
          { title: "AI / LLM", value: "ai" },
          { title: "Engineering", value: "engineering" },
          { title: "Product", value: "product" },
          { title: "Hobby", value: "hobby" },
        ],
        layout: "radio",
      },
    }),
    defineField({ name: "year", type: "number" }),
    defineField({ name: "externalUrl", type: "url" }),
    defineField({ name: "summary", type: "text", rows: 2 }),
    defineField({
      name: "body",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "kind" },
  },
});
