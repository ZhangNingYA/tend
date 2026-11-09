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

const aiAgent = defineCollection({
    loader: glob({ base: './src/content/ai-agent', pattern: '**/*.{md,mdx}' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        type: z.enum(['guide', 'note', 'experiment']).default('note'),
        status: z.enum(['seed', 'in-progress', 'published']).default('published'),
        tags: z.array(z.string()).default([]),
        featured: z.boolean().default(false),
    }),
});

const projects = defineCollection({
    loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        status: z.enum(['incubating', 'building', 'shipped']).default('incubating'),
        stack: z.array(z.string()).default([]),
        featured: z.boolean().default(false),
    }),
});

export const collections = { games, aiAgent, projects };
