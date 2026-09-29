# CET-4 阅读真题维护说明

这份文档对应 `/games/exam-papers/` 真题目录，目的是让新增试卷时同时接入：原文、答案、逐句精读、句子结构和英文词汇点击释义。

## 当前检查结果（2026-09-29）

当前 6 套 Games Reading 数据可以正常构建：

| 试卷 | 数据句数 | 答案状态 | 结构双模式 | 点击词覆盖 |
| --- | ---: | --- | --- | --- |
| 2025-12 Set 1 | 102 | 完整答案 | 有 | 全部可点击；其中 441 次使用了备用提示 |
| 2025-12 Set 2 | 107 | 完整答案 | 有 | 全部可点击；其中 503 次使用了备用提示 |
| 2025-12 Set 3 | 103 | 完整答案 | 有 | 全部可点击；其中 482 次使用了备用提示 |
| 2026-06 Set 1 | 103 | 仔细阅读答案 | 无 | 全部可点击，暂无备用提示 |
| 2026-06 Set 2 | 97 | 暂无答案 | 无 | 全部可点击，暂无备用提示 |
| 2026-06 Set 3 | 94 | 暂无答案 | 无 | 全部可点击，暂无备用提示 |

已通过：

```sh
npm run validate:reading
npm run build
```

### 目前仍需注意的问题

1. **2025 三套的词典内容还不完整。** 现在所有英文词都可以点击，但 2025 三套仍有一部分词只显示“本句暂未提供词典释义，请结合下方精读理解”。新增或补充资料时，重点词和影响理解的短语应补进真实释义，不要把备用提示当作完成状态。
2. **页面元数据仍然需要人工填写，但现在会被校验拦截。** `pageLayout`、`answerCoverage`、`hasStructureModes` 仍由页面元数据声明，`npm run validate:reading` 已会检查它们是否和实际数据一致。
3. **页面接线校验已补上。** 校验脚本现在会检查 MDX 是否引用对应的 Reading、CloseReading 和 `inlineGlossary`，以及数据模块和 Games 页面是否一一对应；它暂时不会把备用释义当作错误，因为这需要人工确认语境。
4. **2025 词典模块目前复用了 `cet4InlineGlossary202606Set2` 作为基础词典。** 这是现有代码的共享依赖，不影响当前构建，但不要继续把某一套试卷的专属词直接写入跨年份基础词典；新增词应优先放在对应年份和套数的词典模块中。
5. **Games 中的非真题页面不属于本目录。** CET-4 页面必须使用 `pageLayout: reading`；纪念页、互动小游戏等保持自己的页面类型，不能混入真题归档。
6. **Games 里原有的非真题日期笔误已修正。** `src/content/games/first-post.mdx` 的无效日期 `2026-04-31` 已改为 `2026-05-01`。

## 新增一套 CET-4 阅读的固定文件关系

以 `2027-06 Set 1` 为例，文件和导出名必须保持同一组日期与套数：

```text
src/content/games/2027-06-cet4-reading-1.mdx
src/data/cet4Reading202706Set1.ts
```

数据模块至少导出：

```ts
export const cet4Reading202706Set1 = { ... };
export const cet4CloseReadings202706Set1 = { ... };
export const cet4InlineGlossary202706Set1 = { ... };
```

如果词典单独放在 `src/data/cet4InlineGlossary202706Set1.ts`，MDX 仍必须把同一套词典传给 `ReadingPractice`。

## MDX 页面模板

文件名必须符合：

```text
YYYY-(06|12)-cet4-reading-(1|2|3).mdx
```

推荐直接复制现有页面，再只替换日期、套数和导出名：

```mdx
---
title: '2027-06 Reading Practice · CET-4 Set 1'
description: '2027 年 6 月大学英语四级第一套阅读练习，包含原文、逐句精读和当前已整理的答案。'
pubDate: '2027-06-30'
pageLayout: 'reading'
answerCoverage: 'full'
hasStructureModes: true
---

import ReadingPractice from '../../components/reading/ReadingPractice.astro';
import {
  cet4CloseReadings202706Set1,
  cet4InlineGlossary202706Set1,
  cet4Reading202706Set1,
} from '../../data/cet4Reading202706Set1';

<ReadingPractice
  {...cet4Reading202706Set1}
  closeReadings={cet4CloseReadings202706Set1}
  inlineGlossary={cet4InlineGlossary202706Set1}
  experience="game"
  timerVariant="focus"
/>
```

字段要求：

| 字段 | 要求 |
| --- | --- |
| `title` | 使用 `YYYY-MM Reading Practice · CET-4 Set N`，日期是考试场次，不是提交日期 |
| `description` | 说明本套实际提供的内容，不要把未整理的答案写成“完整答案” |
| `pubDate` | 必须是真实存在的日历日期；它表示网站发布日 |
| `pageLayout` | CET-4 真题必须是 `reading`，不可省略 |
| `answerCoverage` | `full` = 选词填空、段落匹配和仔细阅读均有答案；`passage-only` = 只有仔细阅读答案；`none` = 当前没有答案 |
| `hasStructureModes` | 只有当 CloseReading 确实包含主句 / 从句两套结构范围时才写 `true` |

## Reading 数据要求

`cet4ReadingYYYYMMSetN` 必须有四个部分：

```ts
{
  cloze: { title, sentences, wordBank?, answers? },
  matching: { title, paragraphs, questions? },
  passages: [
    { title, sentences, questions? },
    { title, sentences, questions? },
  ],
}
```

句子编号必须和顺序一致：

```text
C01, C02, ...                 选词填空
M-A01, M-A02, ...             段落匹配 Paragraph A
M-B01, M-B02, ...             段落匹配 Paragraph B
R1-01, R1-02, ...             第一篇仔细阅读
R2-01, R2-02, ...             第二篇仔细阅读
```

每一句原文都必须有同编号的 `CloseReading`，并且至少包含：

- 非空的 `translation`；
- 非空的 `structure.pattern` 和 `structure.explanation`；
- 非空的 `highlights`；
- `vocabulary` 必须是数组，词条不能使用占位说明；
- 高亮文本必须完整出现在英文原句中，不能截断单词；
- 原文不要混入中文夹注。若来源有中文说明，应在数据整理阶段移除，不要依赖组件运行时清理。

仔细阅读题还必须满足：

- 每题 4 个不重复选项；
- `answer` 必须存在于选项中；
- `evidence` 必须能在对应文章中定位；
- 题干、题目解析和每个选项解析都要填写具体内容，不能使用“与原文一致”一类通用占位文本。

## 词汇点击要求

`inlineGlossary` 是页面级词典，必须传入与当前试卷对应的词典对象。不要省略这个 prop，也不要直接复用另一套试卷的专属词表。

```ts
export const cet4InlineGlossary202706Set1 = {
  words: {
    example: { partOfSpeech: 'n', meaning: '例子；示例' },
  },
  phrases: [
    { term: 'in response to', explanation: '作为对……的回应' },
  ],
} satisfies InlineGlossary;
```

规则：

1. 重点词和影响理解的单词必须有真实的 `meaning`；短语放入 `phrases`，不要拆成孤立单词。
2. 单词键使用小写原形或原文中实际出现的形式；组件会处理常见词形变化，但不会可靠处理任意拼写变化。
3. 每个词条都要结合当前句子确定词性和语境义，不能只填词典中与本句无关的义项。
4. 页面上的英文词即使未进入词典也会保留点击入口，但显示的是备用提示；这只保证交互不失效，不代表词汇资料已经完成。
5. 新增后必须实际打开页面，至少测试：一个普通单词、一个变形词、一个短语、一个没有词典释义的词，以及一个句末单词。

## 提交前检查清单

- [ ] slug、标题、数据文件名和导出名的 `YYYYMMSetN` 完全一致。
- [ ] MDX 有 `pageLayout: reading`。
- [ ] `answerCoverage` 与实际答案范围一致。
- [ ] `hasStructureModes` 与 CloseReading 的实际结构数据一致。
- [ ] `closeReadings` 覆盖全部 `C`、`M`、`R1`、`R2` 句子编号。
- [ ] `inlineGlossary` 已传入，且重点词有真实释义。
- [ ] 没有中文夹注、空翻译、空结构说明或通用占位解析。
- [ ] `/games/exam-papers/` 能看到新套题，排序和套数正确。
- [ ] 新页面上的词汇按钮、书本精读按钮、计时器和答案区域均可操作。
- [ ] 运行 `npm run validate:reading`。
- [ ] 运行 `npm run build`。

如果只是补充词汇或精读，仍要重新运行这两个命令；不要只看 TypeScript 是否能编译。
