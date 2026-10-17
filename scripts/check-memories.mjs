// Run after `npm run build`. Checks the output independently of the page parser.
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const manuscript = await read('src/我和猪猪的旅行日记_2026年7月至10月.md');
assert.ok(!manuscript.includes('她'), '旅行原稿应使用猪猪或 PP 作为称呼');
await access(new URL('dist/fonts/memory-song-sc.woff2', root));
const plainText = (html) => html.replace(/<[^>]*>/g, '')
  .replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
  .replace(/\s/g, '');
const paragraphs = (source) => source.trim().split(/\n\s*\n/)
  .map((p) => p.trim()).filter((p) => p && p !== '---' && !p.startsWith('#'));
const checkInOrder = (source, html, label) => {
  const text = plainText(html);
  let cursor = 0;
  let count = 0;
  for (const paragraph of paragraphs(source)) {
    const expected = paragraph.replace(/\*\*/g, '').replace(/\s/g, '');
    const position = text.indexOf(expected, cursor);
    assert.ok(position >= cursor, `${label} 原文有缺失或乱序：${paragraph}`);
    cursor = position + expected.length;
    count++;
  }
  return count;
};

const sections = manuscript.replace(/\r\n/g, '\n').split(/(?=^# )/m);
const tripSources = sections.filter((section) => /^# 第[一二三]篇/.test(section));
const slugs = ['gaoyou-trip', 'xuzhou-trip', 'taian-trip'];
const checkNoStamps = (html, label) => {
  for (const removed of ['data-stamp-button', 'data-stamp-status', 'data-keepsake', 'trip-card-kept', '盖上我们的纪念章', '留下一枚印记']) {
    assert.ok(!html.includes(removed), `${label} 仍残留纪念章功能：${removed}`);
  }
};
let paragraphCount = 0;
for (const [index, slug] of slugs.entries()) {
  const html = await read(`dist/games/${slug}/index.html`);
  checkNoStamps(html, slug);
  const article = html.match(/<article\b[^>]*class="[^"]*diary-manuscript[^\"]*"[^>]*>([\s\S]*?)<\/article>/)?.[1];
  assert.ok(article, `${slug} 缺少服务端渲染的日记`);
  const expectedDays = index === 2 ? 4 : 3;
  assert.equal((article.match(/data-diary-day/g) || []).length, expectedDays, `${slug} 日期数量`);
  const days = tripSources[index].split(/(?=^## )/m).slice(1);
  for (const [dayIndex, day] of days.entries()) paragraphCount += checkInOrder(day, article, `${slug} 第 ${dayIndex + 1} 天`);
  for (const match of html.matchAll(/(?:src|href)="(\/images\/memories\/[^"#]+|\/music\/[^"#]+)"/g)) {
    await access(fileURLToPath(new URL(`dist${match[1]}`, root)));
  }
  for (const match of html.matchAll(/srcset="([^"]+)"/g)) {
    for (const candidate of match[1].split(',')) {
      const [src, width] = candidate.trim().split(/\s+/);
      if (!src.startsWith('/images/memories/')) continue;
      const image = await sharp(fileURLToPath(new URL(`dist${src}`, root))).metadata();
      assert.equal(image.width, Number.parseInt(width), `${src} 响应式照片宽度标注不符`);
    }
  }
  console.log(`✓ ${slug}: ${expectedDays} 天完整原稿、照片与音乐文件`);
}

const checkPlacePhotos = async (slug, expectedDays) => {
  const html = await read(`dist/games/${slug}/index.html`);
  const days = [...html.matchAll(/<section\b[^>]*id="day-(\d+)"[^>]*>([\s\S]*?)<\/section>/g)];
  for (const [dayNumber, photos] of Object.entries(expectedDays)) {
    const day = days.find(([, number]) => number === dayNumber)?.[2];
    assert.ok(day, `${slug} 缺少第 ${dayNumber} 天`);
    for (const photo of photos) {
      assert.ok(day.includes(`src="/images/memories/${photo}.webp"`), `${slug} 第 ${dayNumber} 天缺少对应地点照片 ${photo}`);
    }
  }
  return html;
};
const xuzhou = await checkPlacePhotos('xuzhou-trip', {
  1: ['xuzhou-station', 'xuzhou-lake'],
  2: ['yunlong-mountain', 'yunlong-overlook'],
  3: ['han-culture', 'han-warriors'],
});
assert.ok(xuzhou.includes('第二天，是我们第一次一起爬山，爬的是云龙山。'), '徐州首次爬山应明确为云龙山');
const taian = await checkPlacePhotos('taian-trip', {
  2: ['taishan-hongmen', 'taishan-zhongtianmen', 'taishan-nantianmen', 'taishan-yuhuangding', 'taishan-us', 'taishan-view', 'taishan-street'],
});
let landmarkCursor = 0;
for (const name of ['红门', '中天门', '南天门', '玉皇顶']) {
  const position = taian.indexOf(`data-place-photos="${name}"`, landmarkCursor);
  assert.ok(position > landmarkCursor, `泰山地标照片顺序错误：${name}`);
  landmarkCursor = position;
}
console.log('✓ 徐州站、云龙山、汉文化景区配图与日期对应；泰山四处地标按登山顺序展示，原有实拍保留。');

const anniversary = await read('dist/games/year-one/index.html');
checkNoStamps(anniversary, 'year-one');
const home = await read('dist/games/index.html');
checkNoStamps(home, '首页');
assert.ok(home.includes('还是想再抱你一会儿。') && home.includes('invitation-photo'), '首页应展示合照与新的周年邀请');
assert.ok(!home.includes('明明你自己也很生气'), '首页不再使用生气后主动哄我的文案');
assert.ok(home.includes('href="/games/year-one/#letter"'), '周年邀请应直达写给猪猪的信');
const afterword = sections.find((section) => section.startsWith('# 写在三次旅行之后'));
assert.ok(afterword, '原稿缺少旅行后记');
paragraphCount += checkInOrder(afterword, anniversary, '旅行后记');
const introduction = sections.find((section) => section.startsWith('# 我和猪猪的旅行日记'));
const introBody = introduction.replace(/^\*\*2026.+\*\*$/m, '');
paragraphCount += checkInOrder(introBody, home, '原稿序言');
assert.ok(anniversary.includes('<details') && anniversary.includes('给我的猪猪'), '周年信无法打开');
for (const detail of ['一颗一颗喂我的猪猪吃坚果', '两个人凑在一起吃同一碗面', '把脑袋埋在我肚子上', '怎么都抱不够']) {
  assert.ok(anniversary.includes(detail), `周年信缺少细节：${detail}`);
}
for (const slug of ['first-meeting', 'fifth', 'kunming-first-meeting', 'year-one']) {
  assert.ok((await read(`dist/games/${slug}/index.html`)).includes('<html'), `${slug} 缺少页面`);
}
console.log(`✓ 共 ${paragraphCount} 段原文逐段核对通过（含序言和完整后记）；三个原纪念页面仍可访问。`);
