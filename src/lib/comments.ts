export interface CommentSentence {
  text: string;
  index: number;
}

const sentencePattern = /[^。！？!?；;\n]+[。！？!?；;]?/g;

export function splitCommentSentences(value: string): CommentSentence[] {
  const normalized = value.replace(/\r\n/g, '\n').trim();
  if (!normalized) return [];

  const matches = normalized.match(sentencePattern) ?? [normalized];
  return matches
    .map((text) => text.trim())
    .filter(Boolean)
    .map((text, index) => ({ text, index }));
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderInline(value: string) {
  return escapeHtml(value).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

export function commentableHtml(value: string, articleSlug: string, anchorPrefix: string) {
  return splitCommentSentences(value)
    .map(({ text, index }) => {
      const anchorKey = `${articleSlug}/${anchorPrefix}/sentence-${String(index + 1).padStart(2, '0')}`;
      return `<span class="commentable-sentence" data-comment-article="${escapeHtml(articleSlug)}" data-comment-anchor="${escapeHtml(anchorKey)}" tabindex="0" role="button">${renderInline(text)}</span>`;
    })
    .join('');
}
