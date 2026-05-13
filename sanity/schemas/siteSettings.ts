import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "heroTitle", type: "string" }),
    defineField({ name: "heroSubtitle", type: "text", rows: 2 }),
    defineField({ name: "resumeUrl", type: "url" }),
  ],
  preview: {
    select: { title: "tagline" },
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
