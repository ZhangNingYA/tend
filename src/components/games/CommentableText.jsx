import { splitCommentSentences } from '../../lib/comments';

export default function CommentableText({ articleSlug, anchorPrefix, text, tag = 'p', className }) {
  const Tag = tag;
  const sentences = splitCommentSentences(text);

  return (
    <Tag className={className}>
      {sentences.map(({ text: sentence, index }) => {
        const anchorKey = `${articleSlug}/${anchorPrefix}/sentence-${String(index + 1).padStart(2, '0')}`;
        return (
          <span
            className="commentable-sentence"
            data-comment-article={articleSlug}
            data-comment-anchor={anchorKey}
            key={anchorKey}
            tabIndex={0}
            role="button"
          >
            {sentence}
          </span>
        );
      })}
    </Tag>
  );
}
