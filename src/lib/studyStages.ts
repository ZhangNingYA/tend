import type { MarkdownHeading } from 'astro';

/** Treat the smallest visible section as a completion stage. */
export function getStudyStageHeadings(headings: MarkdownHeading[]) {
  return headings.filter((heading, index) => {
    if (heading.depth === 3) return true;
    if (heading.depth !== 2) return false;

    const following = headings.slice(index + 1);
    const nextSection = following.findIndex((candidate) => candidate.depth <= 2);
    const children = nextSection === -1 ? following : following.slice(0, nextSection);
    return !children.some((candidate) => candidate.depth === 3);
  });
}
