import { defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fieldsets: [
    {
      name: "narrative",
      title: "PM narrative (problem → constraints → decisions → outcome)",
      options: { collapsible: true, collapsed: false },
    },
  ],
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
      name: "problem",
      type: "text",
      rows: 4,
      fieldset: "narrative",
      description: "What was broken, for whom, and why it mattered",
    }),
    defineField({
      name: "constraints",
      type: "array",
      of: [{ type: "string" }],
      fieldset: "narrative",
      description: "Technical, organizational, or timeline constraints",
    }),
    defineField({
      name: "decisions",
      type: "array",
      fieldset: "narrative",
      of: [
        {
          type: "object",
          fields: [
            { name: "decision", type: "string", title: "Decision" },
            { name: "rationale", type: "text", rows: 2, title: "Why" },
            { name: "tradeoff", type: "text", rows: 2, title: "Trade-off accepted" },
          ],
          preview: { select: { title: "decision", subtitle: "tradeoff" } },
        },
      ],
    }),
    defineField({
      name: "outcomeNarrative",
      type: "text",
      rows: 4,
      fieldset: "narrative",
      description: "What changed — the story behind the outcome metrics",
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
