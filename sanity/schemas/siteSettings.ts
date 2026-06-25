import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "career", title: "Career" },
    { name: "cta", title: "CTA" },
    { name: "meta", title: "Meta" },
  ],
  fields: [
    // ── Hero ─────────────────────────────────────────────────────────────────
    defineField({
      name: "tagline",
      title: "Tagline (under name)",
      description: 'e.g. "Builder · Engineer · Product Thinker"',
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "statusBadge",
      title: "Status badge",
      description: 'Shown in the green pill next to the avatar. e.g. "Open to PM & senior eng roles"',
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroHeadlinePlain",
      title: "Hero headline — plain part",
      description: 'First part of the h1, rendered in white. e.g. "Engineering depth."',
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroHeadlineAccent",
      title: "Hero headline — accent part",
      description: 'Second part of the h1, rendered in the orange gradient. e.g. "Product instincts."',
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero subtitle",
      description: "The paragraph below the headline.",
      type: "text",
      rows: 3,
      group: "hero",
    }),

    // ── Career ───────────────────────────────────────────────────────────────
    defineField({
      name: "companies",
      title: "Companies (in order)",
      description: 'Shown as "JPMC → Amazon → …" in the hero footer line.',
      type: "array",
      of: [{ type: "string" }],
      group: "career",
    }),
    defineField({
      name: "careerStartYear",
      title: "Career start year",
      description: "Used to compute the year range shown in the hero, e.g. 2020.",
      type: "number",
      group: "career",
    }),
    defineField({
      name: "yearsShipping",
      title: "Years shipping (stat card)",
      description: 'Displayed as a zero-padded number, e.g. "05".',
      type: "string",
      group: "career",
    }),
    defineField({
      name: "industryDetail",
      title: "Industry detail (stat card)",
      description: 'Sub-label under the years stat, e.g. "fintech · health · cloud".',
      type: "string",
      group: "career",
    }),

    // ── CTA ──────────────────────────────────────────────────────────────────
    defineField({
      name: "ctaLabel",
      title: "CTA eyebrow label",
      description: 'Small uppercase text above the CTA headline, e.g. "Open to opportunities".',
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaHeadline",
      title: "CTA headline",
      description: 'e.g. "Let\'s build something together"',
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaBody",
      title: "CTA body",
      description: "Paragraph beneath the CTA headline.",
      type: "text",
      rows: 2,
      group: "cta",
    }),

    // ── Meta ─────────────────────────────────────────────────────────────────
    defineField({
      name: "resumeUrl",
      title: "Resume URL",
      type: "url",
      group: "meta",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
