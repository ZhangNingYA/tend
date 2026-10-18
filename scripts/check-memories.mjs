// Run after `npm run build`. Checks the output independently of the page parser.
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const manuscript = await read('src/我和猪猪的旅行日记_2026年7月至10月.md');
assert.ok(!manuscript.includes('她'), '旅行原稿应使用猪猪或 PP 作为称呼');
assert.ok(!manuscript.includes('孟城驿'), '高邮景点名称应为盂城驿，不是孟城驿');
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
  assert.ok(!html.includes('journal-ending-quote'), `${slug} 页尾不应重复摘抄正文结尾`);
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
const gaoyou = await checkPlacePhotos('gaoyou-trip', { 2: ['kung-fu-soccer-still'] });
assert.ok(gaoyou.includes('盂城驿、挑香菜') && gaoyou.includes('去了高邮的盂城驿。') && !gaoyou.includes('孟城驿'), '高邮日记的标题和正文应统一使用盂城驿');
const cinema = gaoyou.match(/<aside\b[^>]*data-cinema-memory[^>]*>([\s\S]*?)<\/aside>/)?.[1];
assert.ok(cinema, '高邮篇缺少电影剧照与票签组合');
assert.ok(cinema.includes('电影剧照，非影院实拍') && cinema.includes('1905电影网') && cinema.includes('版权归片方及相关权利人'), '电影配图应明确来源、版权及非实拍属性');
assert.ok(!cinema.includes('creativecommons.org') && !cinema.includes('地点回望'), '电影剧照不应标成开放许可的风景照片');
assert.ok(cinema.includes('2026.07.19') && cinema.includes('世贸金街') && cinema.includes('非原始票根'), '电影票签应保留原稿日期地点，不冒充真实票根');
assert.ok(gaoyou.includes('我点了包子外卖，和猪猪一起吃了早饭。') && !gaoyou.includes('我出去买了包子'), '高邮包子应为点外卖，不是出门买');
for (const paragraph of ['一起吃了海底捞，我给pp夹菜，一起去打酱碟，给pp夹很多很多次，跟小孩子一样。', '这部分是pp告诉我的，我都快忘了，还用了pp的大学生优惠hh。']) {
  assert.ok(gaoyou.includes(paragraph) && manuscript.includes(paragraph), `高邮海底捞回忆应保留用户原话：${paragraph}`);
}
assert.ok(!gaoyou.includes('晚上好像还在金街吃了些什么') && !manuscript.includes('这个得问问PP，看看猪猪还记不记得'), '海底捞回忆应替换原先记不清晚饭的描述');
assert.equal(gaoyou.split('但是那些一起吃饭、牵手逛街、互相打闹，还有舍不得分别的时刻，反而都变成了最难忘的回忆。').length - 1, 1, '高邮结尾应只出现一次');
const xuzhou = await checkPlacePhotos('xuzhou-trip', {
  1: ['xuzhou-station', 'xuzhou-lake'],
  2: ['yunlong-mountain', 'yunlong-overlook'],
  3: ['han-culture', 'han-warriors'],
});
assert.ok(xuzhou.includes('这天也是我们第一次一起爬山，爬的是云龙山。'), '徐州首次爬山应明确为云龙山');
for (const detail of ['第二天，我们先一起去吃了必胜客，这还是我们第一次一起吃。', '我吃了披萨，pp吃的汉堡。', '抹茶冰淇淋，pp说喜欢吃，结果没吃两口，又全让我吃了。', '我还吃得挺撑的。', '吃完后，我们租了一辆电动车']) {
  assert.ok(xuzhou.includes(detail), `徐州爬山前的必胜客回忆缺少细节：${detail}`);
}
assert.ok(xuzhou.indexOf('我们先一起去吃了必胜客') < xuzhou.indexOf('这天也是我们第一次一起爬山') && xuzhou.indexOf('吃完后，我们租了一辆电动车') < xuzhou.indexOf('结果猪猪才爬了一会儿'), '徐州篇应先吃必胜客，再骑车去爬山');
for (const detail of ['逛了大墓，逛了纪念馆，逛了许许多多主题馆。', '两个人还挤一只小伞，pp老让我好好打伞 😕']) {
  assert.ok(xuzhou.includes(detail), `汉文化景区回忆应保留用户的细节和口吻：${detail}`);
}
assert.ok(xuzhou.includes('专门给猪猪准备的太阳伞') && xuzhou.includes('一开始居然都不会撑'), '徐州应为带太阳伞却不会撑');
assert.ok(xuzhou.includes('就这样一路走着走着，不知不觉就到了山顶。') && xuzhou.includes('我们的第一次一起爬山 · 云龙山'), '不知不觉登顶的文案及旁注应保留');
assert.ok(xuzhou.includes('我一个人吃了烧烤，猪猪还在跟我置气。') && xuzhou.includes('猪猪还是好好地哄了我'), '烧烤那晚应保留独自吃饭、置气后仍主动哄我的细节');
assert.equal(xuzhou.split('但是这些事情，现在回想起来，反而都变成了很可爱的回忆。').length - 1, 1, '徐州结尾应只出现一次');
for (const oldDetail of ['专门给猪猪准备的雨伞', '不知道把伞撑起来', '连伞都忘了撑', '我们还一起吃了一顿烧烤', '居然真的走到了山顶']) {
  assert.ok(!xuzhou.includes(oldDetail) && !manuscript.includes(oldDetail), `徐州旧描述仍残留：${oldDetail}`);
}
const taian = await checkPlacePhotos('taian-trip', {
  2: ['taishan-hongmen-recent', 'taishan-zhongtianmen-recent', 'taishan-nantianmen-recent', 'taishan-yuhuangding-recent', 'taishan-us', 'taishan-view', 'taishan-street'],
});
for (const oldPhoto of ['taishan-hongmen', 'taishan-zhongtianmen', 'taishan-nantianmen', 'taishan-yuhuangding']) {
  assert.ok(!taian.includes(`/images/memories/${oldPhoto}.webp`), `泰山仍在引用旧照片：${oldPhoto}`);
}
assert.ok(taian.includes('2025年4月登山游记配图') && taian.includes('发布于2026.09.11') && taian.includes('许若晨 / 大众新闻'), '泰山更新照片应保留可核查的来源，区分游记日期与发布日期');
assert.ok(taian.includes('上车后，猪猪在卧铺上躺着休息了一会儿。'), '卧铺上躺着休息的是猪猪');
for (const oldDetail of ['一起在卧铺上睡了一会儿', '一起躺在卧铺上休息']) {
  assert.ok(!taian.includes(oldDetail) && !manuscript.includes(oldDetail), `卧铺休息的旧描述仍残留：${oldDetail}`);
}
let landmarkCursor = 0;
for (const name of ['红门', '中天门', '南天门', '玉皇顶']) {
  const position = taian.indexOf(`data-place-photos="${name}"`, landmarkCursor);
  assert.ok(position > landmarkCursor, `泰山地标照片顺序错误：${name}`);
  landmarkCursor = position;
}
console.log('✓ 徐州站、云龙山、汉文化景区配图与日期对应；泰山四处地标按登山顺序展示，原有实拍保留。');

const anniversary = await read('dist/games/year-one/index.html');
assert.ok(anniversary.includes('我们一起吃拌饭、看电影、喝奶茶、逛盂城驿。') && !anniversary.includes('孟城驿'), '旅行后记中的景点名称应同步改为盂城驿');
checkNoStamps(anniversary, 'year-one');
const home = await read('dist/games/index.html');
checkNoStamps(home, '首页');
const musicPages = [
  ['首页', home, 'primrose'],
  ['高邮', gaoyou, 'rain-love'],
  ['徐州', xuzhou, 'magic-potion'],
  ['泰安', taian, 'primrose'],
  ['周年信', anniversary, 'love-message'],
];
for (const [page, html, track] of musicPages) {
  const player = html.match(/<memory-music\b[^>]*>([\s\S]*?)<\/memory-music>/)?.[0];
  assert.ok(player, `${page} 缺少悬浮音乐按钮`);
  assert.equal((html.match(/<memory-music\b/g) || []).length, 1, `${page} 只能保留一个音乐控件`);
  assert.ok(player.includes(`data-track="${track}"`) && player.includes(`src="/music/${track}.mp3"`), `${page} 音乐搭配不正确`);
  assert.equal((player.match(/<button\b/g) || []).length, 1, `${page} 音乐只需要一个暂停／播放按钮`);
  assert.ok(/<audio\b[^>]*preload="none"[^>]*loop/.test(player) && !/<audio\b[^>]*\bautoplay\b/.test(player), `${page} 应等待点击再播放，不提前加载整首音乐`);
  const file = await readFile(new URL(`dist/music/${track}.mp3`, root));
  assert.equal(file.subarray(0, 3).toString(), 'ID3', `${track} 应为真实 MP3，而不是改扩展名的 WAV`);
  assert.ok(file.length > 100_000 && file.length < 8_000_000, `${track} 音乐文件大小不适合手机浏览`);
}
console.log('✓ 四首新音乐按页面搭配；单个悬浮按钮、按需加载、英文 MP3 文件通过检查。');
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
assert.ok(anniversary.includes('这一年，让我记得最深的一件事，是那次') && !anniversary.includes('我一直记得，明明你自己也很生气'), '周年信应使用更自然的难忘往事引入');
for (const detail of ['猪猪，其实你也把我照顾得特别好。', '你主动给我涂药的时候', '被你这样惦记着、心疼着，我也觉得很安心。']) {
  assert.ok(anniversary.includes(detail), `周年信应写出猪猪对我的照顾：${detail}`);
}
assert.ok(!anniversary.includes('连伞都忘了撑') && anniversary.includes('都不会撑太阳伞的小插曲'), '旅行后记也应同步修正不会撑伞的描述');
for (const detail of ['一颗一颗喂我的猪猪吃坚果', '两个人凑在一起吃同一碗面', '把脑袋埋在我肚子上', '怎么都抱不够']) {
  assert.ok(anniversary.includes(detail), `周年信缺少细节：${detail}`);
}
for (const slug of ['first-meeting', 'fifth', 'kunming-first-meeting', 'year-one']) {
  assert.ok((await read(`dist/games/${slug}/index.html`)).includes('<html'), `${slug} 缺少页面`);
}
console.log(`✓ 共 ${paragraphCount} 段原文逐段核对通过（含序言和完整后记）；三个原纪念页面仍可访问。`);
