import type { CloseReadingHighlight, SentenceRole } from '../types/closeReading';

const roleLabel: Record<SentenceRole, string> = {
  subject: '主语',
  predicate: '谓语',
  object: '宾语',
  complement: '补语 / 表语',
  adverbial: '状语',
};

const compact = (value: string, limit = 48) => {
  const normalized = value.replace(/\s+/g, ' ').trim();
  return normalized.length > limit ? `${normalized.slice(0, limit - 1)}…` : normalized;
};

const sameHighlight = (left: CloseReadingHighlight, right: CloseReadingHighlight) => (
  left.role === right.role && left.text === right.text && left.label === right.label
);

/**
 * Turn the actual annotated components into a short, sentence-specific note.
 * This deliberately names the real subject, predicate and complement instead
 * of repeating generic instructions that do not help a learner parse the line.
 */
export const describeReadingStructure = (
  highlights: readonly CloseReadingHighlight[],
  trunk: readonly CloseReadingHighlight[] = highlights,
) => {
  const roleOrder: Record<SentenceRole, number> = {
    subject: 0,
    predicate: 1,
    object: 2,
    complement: 3,
    adverbial: 4,
  };
  const core = trunk.filter((item) => item.role !== 'adverbial');
  const coreItems = [...(core.length > 0 ? core : trunk)]
    .sort((left, right) => roleOrder[left.role] - roleOrder[right.role])
    .slice(0, 4);
  const main = coreItems.length > 0
    ? `主干：${coreItems.map((item) => `${roleLabel[item.role]}“${compact(item.text)}”`).join('，')}。`
    : '这是省略式或独立成分，需要结合上下文补全。';

  const additions = highlights.filter((item) => (
    !trunk.some((trunkItem) => sameHighlight(item, trunkItem))
    || item.label?.includes('从句')
  ));
  if (additions.length === 0) return main;

  const detail = additions.slice(0, 2).map((item) => {
    const label = item.label ?? roleLabel[item.role];
    return `“${compact(item.text, 38)}”整体是${label}`;
  }).join('；');
  const remainder = additions.length > 2 ? '；其余并列或修饰成分见展开模式' : '';
  return `${main}${detail}${remainder}。`;
};

export const readingStructurePattern = (
  highlights: readonly CloseReadingHighlight[],
  trunk: readonly CloseReadingHighlight[] = highlights,
) => {
  const roles = trunk.map((item) => roleLabel[item.role]);
  const clauseLabels = highlights
    .filter((item) => item.label?.includes('从句'))
    .map((item) => item.label?.replace(/（整体）/g, '') ?? '从句');
  return [...roles, ...clauseLabels]
    .filter((item, index, all) => all.indexOf(item) === index)
    .join(' + ') || '省略句 / 独立成分';
};
