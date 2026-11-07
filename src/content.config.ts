import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const games = defineCollection({
    loader: glob({ base: './src/content/games', pattern: '**/*.{md,mdx}' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
    }),
});

const fieldNotes = defineCollection({
    loader: glob({ base: './src/content/field-notes', pattern: '**/*.{md,mdx}' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            pubDate: z.coerce.date(),
            updatedDate: z.coerce.date().optional(),
            heroImage: z.optional(image()),
            type: z.enum(['note', 'reading', 'tutorial', 'experiment']).default('note'),
            stage: z.enum(['foundations', 'llm', 'agent', 'production']).default('agent'),
            status: z.enum(['exploring', 'building', 'published']).default('published'),
            tags: z.array(z.string()).default([]),
            featured: z.boolean().default(false),
        }),
});

const builds = defineCollection({
    loader: glob({ base: './src/content/builds', pattern: '**/*.{md,mdx}' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            pubDate: z.coerce.date(),
            updatedDate: z.coerce.date().optional(),
            heroImage: z.optional(image()),
            status: z.enum(['building', 'shipped']).default('building'),
            tags: z.array(z.string()).default([]),
            stack: z.array(z.string()).default([]),
            featured: z.boolean().default(false),
            draft: z.boolean().default(false),
        }),
});

export const collections = { games, fieldNotes, builds };
