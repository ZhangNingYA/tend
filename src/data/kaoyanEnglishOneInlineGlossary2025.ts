import type { InlineGlossary } from '../types/closeReading';

/**
 * Page-specific entries for the 2025 Kaoyan paper. The old global CET-6
 * fallback attached unrelated context meanings to common words on this page.
 * Sentence-level vocabulary and phrases still come from the audited close
 * readings; this list only adds useful standalone words that are not already
 * covered there.
 */
export const kaoyanEnglishOneInlineGlossary2025 = {
  words: {
    shocked: { partOfSpeech: 'adj', meaning: '震惊的；惊讶的' },
    learn: { partOfSpeech: 'v', meaning: '得知；获悉；学习' },
    recently: { partOfSpeech: 'adv', meaning: '最近；不久前' },
    scientists: { partOfSpeech: 'n', meaning: '科学家（scientist 的复数）' },
    research: { partOfSpeech: 'n / v', meaning: '研究；调查' },
    decrease: { partOfSpeech: 'v / n', meaning: '减少；降低' },
    scholarly: { partOfSpeech: 'adj', meaning: '学术的；有学问的' },
    rehearsal: { partOfSpeech: 'n', meaning: '排练；预演' },
    emissions: { partOfSpeech: 'n', meaning: '排放物；排放量（emission 的复数）' },
    laboratories: { partOfSpeech: 'n', meaning: '实验室（laboratory 的复数）' },
    piracy: { partOfSpeech: 'n', meaning: '盗版活动；海盗行为' },
    streaming: { partOfSpeech: 'n / adj', meaning: '流媒体播放；流式传输的' },
    copyright: { partOfSpeech: 'n', meaning: '版权；著作权' },
    preservation: { partOfSpeech: 'n', meaning: '保存；保护' },
    digital: { partOfSpeech: 'adj', meaning: '数字的；数码的' },
    archives: { partOfSpeech: 'n', meaning: '档案；档案馆（archive 的复数）' },
  },
} satisfies InlineGlossary;
