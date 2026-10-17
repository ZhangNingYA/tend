import diarySource from '../我和猪猪的旅行日记_2026年7月至10月.md?raw';

export interface DiaryBlock {
  kind: 'paragraph' | 'subheading' | 'quote';
  text: string;
}

export interface DiaryDay {
  date: string;
  title: string;
  blocks: DiaryBlock[];
}

export interface MemoryPhoto {
  name: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  source?: string;
  author?: string;
  license?: string;
  licenseUrl?: string;
  creditLabel?: string;
  rights?: string;
}

export const memoryPhotos: Record<string, MemoryPhoto> = {
  gaoyou: {
    name: 'gaoyou-street', alt: '高邮南门大街的老街与屋檐',
    caption: '高邮 · 街巷里的慢时光', width: 960, height: 1290,
    source: 'https://commons.wikimedia.org/wiki/File:南门大街_高邮.jpg',
    author: 'Huanokinhejo', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  },
  posthouse: {
    name: 'gaoyou-posthouse', alt: '高邮盂城驿的鼓楼与古建筑',
    caption: '盂城驿 · 再看看牵手走过的地方', width: 1280, height: 852,
    source: 'https://commons.wikimedia.org/wiki/File:盂城驿鼓楼.jpg',
    author: '三猎', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  },
  kungFuSoccer: {
    name: 'kung-fu-soccer-still', alt: '《功夫女足》影片剧照，身穿白色运动服的队员坐在话筒前，右下角保留片名',
    caption: '《功夫女足》 · 还记得一起看电影的那个雨天', width: 1280, height: 853,
    source: 'https://www.1905.com/newgallery/hdpic/1762800.shtml#p7',
    author: '1905电影网', creditLabel: '电影剧照，非影院实拍', rights: '版权归片方及相关权利人',
  },
  xuzhou: {
    name: 'xuzhou-lake', alt: '徐州云龙湖的湖水、山色与岸边景致',
    caption: '云龙湖 · 还记得那天的晚风吗', width: 1280, height: 960,
    source: 'https://commons.wikimedia.org/wiki/File:Yunlong_Lake_20191002.jpg',
    author: 'Sprt98', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
  },
  xuzhouStation: {
    name: 'xuzhou-station', alt: '徐州站站房与站前广场，楼顶写着徐州二字',
    caption: '徐州站 · 又在一座城市见到你', width: 1280, height: 960,
    source: 'https://commons.wikimedia.org/wiki/File:徐州火车站站房20230501_01.jpg',
    author: '西安兵马俑', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  },
  yunlongMountain: {
    name: 'yunlong-mountain', alt: '徐州云龙山入口的石牌坊与登山台阶',
    caption: '云龙山 · 第一次一起爬的那座山', width: 1280, height: 960,
    source: 'https://commons.wikimedia.org/wiki/File:云龙山出入口.jpg',
    author: 'Sprt98', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
  },
  yunlongOverlook: {
    name: 'yunlong-overlook', alt: '站在徐州云龙山上远眺云龙湖与周围山色',
    caption: '云龙山远眺 · 山下就是云龙湖', width: 1280, height: 960,
    source: 'https://commons.wikimedia.org/wiki/File:从云龙山俯视云龙湖.jpg',
    author: 'Sprt98', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
  },
  hanCulture: {
    name: 'han-culture', alt: '徐州汉文化景区内刘氏宗祠的屋檐与开阔庭院',
    caption: '汉文化景区 · 刘氏宗祠', width: 1280, height: 960,
    source: 'https://commons.wikimedia.org/wiki/File:徐州汉文化景区刘氏宗祠_2.jpg',
    author: 'H2v5o68z', license: 'CC0 1.0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
  },
  hanWarriors: {
    name: 'han-warriors', alt: '徐州汉兵马俑博物馆二号坑内的汉代陶俑',
    caption: '汉文化景区 · 汉兵马俑', width: 1280, height: 853,
    source: 'https://commons.wikimedia.org/wiki/File:Han_Terracotta_Warriors,_Pit_2,_Han_Tomb_of_Liu_Wu,_King_of_Chu_(10082994123).jpg',
    author: 'Gary Todd', license: 'CC0 1.0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
  },
  hongmen: {
    name: 'taishan-hongmen-recent', alt: '蓝天下泰山红门的红墙门洞、飞云阁和沿登山路前行的游客',
    caption: '红门 · 从这里开始，一步一步往上走', width: 1280, height: 1707,
    source: 'https://you.ctrip.com/travels/taian746/4165544.html',
    author: '行走山水之间 / 携程', creditLabel: '地点回望 · 2025年4月登山游记配图', rights: '版权归原摄影者',
  },
  zhongtianmen: {
    name: 'taishan-zhongtianmen-recent', alt: '泰山中天门完整石坊，背后是青山、亭阁与蓝天白云',
    caption: '中天门 · 登山路上的地点回望', width: 1080, height: 1440,
    source: 'https://dzrb.dzng.com/general/1/DZHN781939XXRKSPIRRP',
    author: '许若晨 / 大众新闻', rights: '版权归原摄影者',
  },
  nantianmen: {
    name: 'taishan-nantianmen-recent', alt: '蓝天白云下的泰山南天门，红墙黄瓦、石阶和沿途树木清晰可见',
    caption: '南天门 · 以前觉得很远，后来真的到了', width: 1280, height: 1706,
    source: 'https://you.ctrip.com/travels/taian746/4165544.html',
    author: '行走山水之间 / 携程', creditLabel: '地点回望 · 2025年4月登山游记配图', rights: '版权归原摄影者',
  },
  yuhuangding: {
    name: 'taishan-yuhuangding-recent', alt: '蓝天下泰山玉皇顶的红墙入口，门额上的敕修玉皇顶字样清晰可见',
    caption: '玉皇顶 · 终于牵着手，一起登顶', width: 1280, height: 960,
    source: 'https://m.ctrip.com/webapp/you/comment/detail/5142/11/822220883.html',
    author: '峰中幻想 / 携程', creditLabel: '地点回望 · 发布于2026.09.11', rights: '版权归原摄影者',
  },
  taian: {
    name: 'taishan-back', alt: '穿着绿色外套，站在泰山上看远处的猪猪',
    caption: '这一次，跟着厉害猪一起往上走。', width: 1200, height: 1600,
  },
  selfie: {
    name: 'taishan-us', alt: '登山时靠在一起的我们',
    caption: '好不容易见面，当然要靠近一点。', width: 1600, height: 1200,
  },
  skyStreet: {
    name: 'taishan-street', alt: '泰山天街上的人群和远处的山色',
    caption: '人好多，但我们一直在一起。', width: 1600, height: 1200,
  },
  mountains: {
    name: 'taishan-view', alt: '从泰山望出去的层叠山峦',
    caption: '以前觉得很远的地方，我们真的一起到了。', width: 1600, height: 1200,
  },
};

export const tripMeta = [
  {
    id: 'gaoyou', slug: 'gaoyou-trip', number: '01', city: '高邮', english: 'GAOYOU',
    title: '晚一点，\n也没关系。', date: '2026.07.18 — 07.20', month: 'JUL', day: '18',
    place: '江苏 · 高邮 / 淮安', duration: '三天两晚', theme: '雨天、乌龙茶，还有黏人猪',
    intro: '每次见面都盼了很久。好不容易见面，就想一直黏在一起，结果每次都发现时间不够用了。',
    quote: '其实也没做什么特别的事情，就是两个人手牵着手走走看看，但现在想起来，还是觉得很甜。',
    photo: memoryPhotos.gaoyou,
    dayNotes: ['终于接到我的女朋友', '雨天也有好喝的乌龙茶', '再多陪我一会儿'],
  },
  {
    id: 'xuzhou', slug: 'xuzhou-trip', number: '02', city: '徐州', english: 'XUZHOU',
    title: '云龙湖边\n的晚风。', date: '2026.08.22 — 08.24', month: 'AUG', day: '22',
    place: '江苏 · 徐州', duration: '三天两晚', theme: '第一次住民宿，第一次一起爬云龙山',
    intro: '一起骑电动车、逛云龙湖、吹晚风、听歌。还有我傻乎乎背去的一大瓶椰汁，和两个人一开始居然都不会撑太阳伞的小插曲。',
    quote: '也不知道为什么，明明每天都待在一起，还是总觉得时间不够用。',
    photo: memoryPhotos.xuzhou,
    dayNotes: ['把行李放下，把日子放慢', '休息休息！等会儿等会儿！', '怎么这么快又要分别了'],
  },
  {
    id: 'taian', slug: 'taian-trip', number: '03', city: '泰安', english: 'TAI’AN',
    title: '牵着手，\n一起到山顶。', date: '2026.10.03 — 10.06', month: 'OCT', day: '03',
    place: '山东 · 泰安 / 泰山', duration: '四天三晚', theme: '从红门到玉皇顶，一步一步',
    intro: '南天门曾经看起来那么遥远，但我们还是一步一步走到了。希望以后的生活也是这样。',
    quote: '也许以后，我们还会遇到许多看起来遥不可及的事情，但只要两个人一起努力，也都能够慢慢抵达。',
    photo: memoryPhotos.taian,
    dayNotes: ['有一只精心准备的贴心猪', '这次，臭猪居然爬得比我快', '哪里都不去，就这样照顾你', '还有好多话，舍不得说完'],
  },
] as const;

export type TripId = typeof tripMeta[number]['id'];

function makeBlock(text: string): DiaryBlock {
  const bold = text.match(/^\*\*(.+)\*\*$/s)?.[1];
  return {
    kind: bold?.includes('｜') ? 'subheading' : bold && bold.length > 24 ? 'quote' : 'paragraph',
    text,
  };
}

// The supplied manuscript is the single source of truth: no hand-copied excerpts.
function parseManuscript(source: string) {
  const entries: DiaryDay[][] = [[], [], []];
  const afterword: DiaryBlock[] = [];
  const sections = source.replace(/\r\n/g, '\n').split(/\n(?=# )/);
  const introduction = sections[0].split(/\n\s*\n/).map((p) => p.trim())
    .filter((p) => p && !p.startsWith('#') && !p.startsWith('**') && p !== '---').map(makeBlock);
  let tripIndex = 0;
  for (const section of sections) {
    if (/^# 第[一二三]篇/.test(section)) {
      const daySections = section.split(/\n(?=## )/).slice(1);
      entries[tripIndex] = daySections.map((day) => {
        const [heading, ...body] = day.trim().split('\n');
        const [date, ...title] = heading.replace(/^## /, '').split('｜');
        return {
          date, title: title.join('｜'),
          blocks: body.join('\n').split(/\n\s*\n/).map((p) => p.trim())
            .filter((p) => p && p !== '---').map(makeBlock),
        };
      });
      tripIndex++;
    } else if (section.startsWith('# 写在三次旅行之后')) {
      afterword.push(...section.split('\n').slice(1).join('\n').split(/\n\s*\n/)
        .map((p) => p.trim()).filter(Boolean).map(makeBlock));
    }
  }
  if (entries.map((days) => days.length).join(',') !== '3,3,4' || !afterword.length) {
    throw new Error('旅行原稿的章节结构已改变，请检查三篇日记与旅行后记。');
  }
  return { entries, afterword, introduction };
}

const manuscript = parseManuscript(diarySource);
export const trips = tripMeta.map((meta, index) => ({ ...meta, days: manuscript.entries[index] }));
export const travelAfterword = manuscript.afterword;
export const travelIntroduction = manuscript.introduction;

// This manuscript uses paragraphs and bold spans only. Escape HTML before formatting.
export function diaryInline(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

export const anniversaryLetter = [
  '猪猪，一周年快乐呀。',
  '回头看这一年，有很多事情都让我觉得，能和你在一起，真的很幸运。',
  '这一年，让我记得最深的一件事，是那次明明你自己也很生气，却还是主动来哄我，舍不得看我难过。想到这些，我就觉得自己被你好好地喜欢着。你的情绪和委屈，我也想更认真地放在心上。以后我想更早一点走向你，主动抱抱你、哄哄你，让你也能安心地依赖我。',
  '猪猪，其实你也把我照顾得特别好。你主动给我涂药的时候，那些细心照顾我的小动作，我都记得。被你这样惦记着、心疼着，我也觉得很安心。每次要分开，你总是不听我的，还是要送我。怎么这么黏人呀，猪猪。可我又知道，你就是舍不得，想再多陪我一会儿。我也一样，每次分别，都还想和你多待一会儿。',
  '我也好喜欢那些只有我们知道的小事。一颗一颗喂我的猪猪吃坚果，两个人凑在一起吃同一碗面。明明都是很普通的东西，和你一起吃，就觉得格外好吃。',
  '还有你把脑袋埋在我肚子上的时候，我就只想再多抱你一会儿。怎么会有一只猪，明明已经抱在怀里了，还是让我觉得怎么都抱不够呀。总想再靠近一点，再抱久一点，最好时间也跟着慢下来，让我们不用那么快就说再见。',
  '和你一起旅行，我记住了风景，也记住了我们一起面对事情的样子。遇到困难，你总愿意耐心地和我一起解决。因为有你陪着，我也更愿意稳下来，和你一起想办法，一件一件把事情做好。那些一起走过的路、一起处理的小麻烦，都让我越来越期待我们的以后。',
  '第二年，我们继续往前走吧。',
  '继续去想去的地方，见更多的风景，也认真过好每一次见面。一起克服眼前的困难，照顾好身体，做好各自正在努力的事情。你累的时候，我多照顾你一点；我遇到困难的时候，也好好和你说。我们慢慢学会更懂彼此，把喜欢放进每天做得到的小事里。',
  '我想和你一起变得更好，走得更远。以后回头看，希望我们会发现，曾经觉得很难的事情，已经被我们牵着手走过去了，而身边还是熟悉的那个人。',
  '谢谢你这一年的喜欢、耐心和舍不得。',
  '第二年，也继续牵着我吧，猪猪。我也会好好牵着你。',
];
