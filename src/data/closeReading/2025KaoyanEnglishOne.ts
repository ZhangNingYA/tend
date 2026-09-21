import type { CloseReading, SentenceRole } from '../../types/closeReading';
import { createCloseReading as cr } from './createCloseReading';

type Vocabulary = readonly [term: string, explanation: string][];
type Tail = readonly [role: SentenceRole, text: string];

const s = (
  translation: string,
  vocabulary: Vocabulary,
  subject: string,
  predicate: string,
  tail?: Tail,
  pattern = '主语 + 谓语 + 补充成分',
  explanation = '先抓住主句的主语和谓语，再把其余成分作为宾语、补语或状语整体理解。',
): CloseReading => cr(
  translation,
  vocabulary,
  pattern,
  explanation,
  [
    ['subject', subject],
    ['predicate', predicate],
    ...(tail ? [tail] : []),
  ],
);

const f = (
  translation: string,
  vocabulary: Vocabulary,
  text: string,
  pattern = '省略句',
  explanation = '这是承接上文的省略表达，结合上下文补出完整含义。',
): CloseReading => cr(
  translation,
  vocabulary,
  pattern,
  explanation,
  [['complement', text]],
);

export const kaoyanEnglishOneCloseReadings2025 = {
  C01: s(
    '帕夫洛佩特里位于伯罗奔尼撒半岛南部，是该遗址的现代名称；它在公元前约 3500 年形成了一个新石器时代聚落。',
    [['located in', '位于'], ['Neolithic settlement', '新石器时代聚落'], ['emerge', '出现；形成']],
    'Pavlopetri (the modern name of the site)', 'emerged', ['complement', 'as a Neolithic settlement'],
    '分词状语 + 主语 + 谓语 + 表语',
    'Located in... 是过去分词短语，交代地点；Pavlopetri 是主语，emerged 是谓语，as 短语说明其形成的身份。',
  ),
  C02: s(
    '爱琴海这一地区容易发生地震和海啸，而这些灾害导致这座城市逐渐沉没。',
    [['be prone to', '容易遭受；易于发生'], ['earthquake', '地震'], ['gradually sink', '逐渐下沉']],
    'This area of the Aegean Sea', 'is', ['complement', 'prone to earthquakes and tsunamis'],
    '主语 + 系动词 + 表语 + 非限制性定语从句',
    'is prone to... 构成系表结构；which 引导的非限制性定语从句回指 earthquakes and tsunamis，说明其后果。',
  ),
  C03: s(
    '地中海海平面缓慢上升，在三千多年前淹没了这座城市。',
    [['sea level rise', '海平面上升'], ['submerge', '淹没'], ['more than', '超过']],
    'The slow sea level rise in the Mediterranean', 'submerged', ['object', 'the city'],
    '主语 + 谓语 + 宾语（SVO）',
  ),
  C04: s(
    '几千年来，这座城市的遗迹一直沉睡在约 13 英尺深的水下，无人看见。',
    [['for millennia', '几千年来'], ['remain', '遗迹；剩余部分'], ['lay unseen', '未被发现地躺着']],
    'the city’s remains', 'lay', ['adverbial', 'unseen below some 13 feet of water'],
    '主语 + 谓语 + 主语补足语 + 地点状语',
  ),
  C05: s(
    '它们被拉科尼亚岛附近的一层厚厚的沙子覆盖。',
    [['be covered by', '被……覆盖'], ['a thick layer of', '一层厚厚的……'], ['off', '在……附近']],
    'They', 'were covered', ['adverbial', 'by a thick layer of sand off the island of Laconia'],
    '主语 + 被动谓语 + 介词短语',
  ),
  C06: s(
    '近几十年来，洋流变化和气候变化侵蚀了一道保护帕夫洛佩特里的天然屏障。',
    [['shifting currents', '变化的洋流'], ['erode', '侵蚀'], ['natural barrier', '天然屏障']],
    'shifting currents and climate change', 'have eroded', ['object', 'a natural barrier that protected Pavlopetri'],
    '并列主语 + 谓语 + 宾语（SVO）',
    'that protected Pavlopetri 是定语从句，修饰 barrier；have eroded 表示影响从过去延续到现在。',
  ),
  C07: s(
    '1967 年，伯罗奔尼撒海岸的一次科学调查正在收集数据、分析海平面变化，这时英国海洋学家尼古拉斯·弗莱明首次发现了沉没的建筑。',
    [['scientific survey', '科学调查'], ['gather data', '收集数据'], ['sunken structure', '沉没的建筑']],
    'a scientific survey of the Peloponnesian coast', 'was gathering', ['object', 'data to analyze changes in sea levels'],
    '主句 + when 时间状语从句',
    '主句描述调查正在进行的背景；when 从句引出 Flemming 发现沉没建筑这一事件。',
  ),
  C08: s(
    '一年后，他带着几名学生回来考察这个地点并绘制遗址地图。',
    [['return with', '带着……回来'], ['examine', '考察'], ['map the site', '绘制遗址地图']],
    'he', 'returned', ['adverbial', 'with a few students'],
    '时间状语 + 主语 + 谓语 + 目的状语',
  ),
  C09: s(
    '团队发现了大约 15 座建筑、庭院、一个街道网络和两座墓室。',
    [['identify', '发现；确认'], ['courtyard', '庭院'], ['chamber tomb', '墓室']],
    'The team', 'identified', ['object', 'some 15 buildings, courtyards, a network of streets, and two chamber tombs'],
    '主语 + 谓语 + 并列宾语（SVO）',
  ),
  C10: s(
    '尽管最初的发现令人兴奋，这处遗址仍会在无人打扰的状态下沉寂数十年，直到考古学家再次回来。',
    [['despite', '尽管'], ['initial find', '最初的发现'], ['undisturbed', '未受打扰的']],
    'the site', 'would lie', ['complement', 'undisturbed for decades'],
    '让步状语 + 主语 + 谓语 + 主语补足语 + before 从句',
  ),
  C11: s(
    '2009 年，考古学家 Chrysanthi Gallon 和 Jon Henderson 与希腊文化部合作，重新开始发掘帕夫洛佩特里。',
    [['resume excavation', '重新开始发掘'], ['in cooperation with', '与……合作'], ['Ministry of Culture', '文化部']],
    'archaeologists Chrysanthi Gallon and Jon Henderson', 'resumed', ['object', 'excavation of Pavlopetri'],
    '时间状语 + 主语 + 谓语 + 宾语 + 伴随状语',
  ),
  C12: s(
    '自 20 世纪 60 年代以来，水下考古技术和工具已经取得了巨大进步。',
    [['underwater archaeology', '水下考古学'], ['technique', '技术；方法'], ['make advances', '取得进步']],
    'underwater archaeology techniques and tools', 'had made', ['object', 'huge advances'],
    '时间状语 + 并列主语 + 过去完成时谓语 + 宾语（SVO）',
  ),
  C13: s(
    '团队运用机器人、声呐测绘和最先进的图形技术来勘察遗址。',
    [['employ', '使用；运用'], ['sonar mapping', '声呐测绘'], ['state-of-the-art', '最先进的']],
    'The team', 'employed', ['object', 'robotics, sonar mapping, and state-of-the-art graphics'],
    '主语 + 谓语 + 并列宾语 + 目的状语',
  ),
  C14: s(
    '从 2009 年到 2013 年，他们得以让这座水下城镇重现于世。',
    [['be able to', '能够'], ['bring ... to reality', '使……成为现实'], ['underwater town', '水下城镇']],
    'they', 'were able', ['complement', 'to bring the underwater town to reality'],
    '时间状语 + 主语 + 系动词短语 + 不定式补语',
  ),
  C15: s(
    '帕夫洛佩特里占地约两英亩半，三条主干道连接着约 50 座矩形建筑，而这些建筑都有开放式庭院。',
    [['cover', '占地；覆盖'], ['rectangular', '矩形的'], ['open courtyard', '开放式庭院']],
    'Pavlopetri’s three main roads', 'connected', ['object', 'some 50 rectangular buildings'],
    '分词状语 + 主语 + 谓语 + 宾语 + 定语从句',
    'Covering about two and a half acres 是分词短语，补充说明遗址面积；which 引导的定语从句修饰 buildings。',
  ),
  C16: s(
    '发掘发现了大量米诺斯风格的织机砝码，这表明帕夫洛佩特里曾是一个拥有强大纺织业的繁荣贸易中心。',
    [['loom weight', '织机砝码'], ['suggest', '表明；暗示'], ['robust', '强劲的；稳健的']],
    'Excavations', 'revealed', ['object', 'a large number of Minoan-style loom weights'],
    '主语 + 谓语 + 宾语 + 现在分词结果状语',
    'suggesting 引出由考古发现推导出的结论，后面的宾语从句说明帕夫洛佩特里的性质。',
  ),

  'M-A01': s(
    'Peters 喜欢在风景中拍摄蝴蝶，既展现周围环境的美，也展现昆虫本身的美。',
    [['in a landscape', '在风景中'], ['celebrate', '展现；赞美'], ['surroundings', '周围环境']],
    'Peters', 'likes', ['object', 'to photograph butterflies in a landscape'],
    '主语 + 谓语 + 不定式宾语 + 分词状语',
  ),
  'M-A02': s(
    '他拍摄的一只小环蛱蝶从海石竹旁飞起的照片尤其壮观；海石竹生长在怀特岛康普顿湾的白垩悬崖边。',
    [['Glanville fritillary', '小环蛱蝶'], ['rise from', '从……升起'], ['particularly glorious', '格外壮观']],
    'His pictures of a Glanville fritillary', 'are', ['complement', 'particularly glorious'],
    '主语 + 系动词 + 表语 + 分词后置定语',
  ),
  'M-A03': s(
    '这些起飞照片更具挑战性，因为它们需要使用广角镜头，这意味着他必须距离蝴蝶不到两厘米。',
    [['take-off shot', '起飞照片'], ['wide-angle lens', '广角镜头'], ['less than', '少于；不到']],
    'These take-off shots', 'are', ['complement', 'even more challenging'],
    '主句 + because 原因状语从句 + which 定语从句',
  ),
  'M-A04': s(
    '靠近一只受惊的、被阳光晒暖的昆虫实在困难。',
    [['skittish', '易受惊的'], ['sun-warmed', '被阳光晒暖的'], ['get close to', '靠近']],
    'It', 'difficult', ['complement', 'to get that close to a skittish sun-warmed insect'],
    '形式主语 + 系表结构',
    'It 是形式主语，真正的主语是 to get...；difficult 说明这一动作的难度。',
  ),
  'M-A05': s(
    '与一些通过把昆虫放进冰箱来减慢它们速度的摄影师不同，Peters 拒绝干扰野生蝴蝶。',
    [['unlike', '与……不同'], ['cheat', '作弊；取巧'], ['tamper with', '干扰；擅自处理']],
    'Peters', 'refuses', ['object', 'to tamper with wild butterflies'],
    '介词短语 + 主语 + 谓语 + 不定式宾语',
  ),
  'M-B01': s(
    'Peters 的标志性照片是“起飞照”：一只蝴蝶从花朵上飞起时，在一张照片中呈现它连续的多次振翅。',
    [['signature shot', '标志性照片'], ['wing-beat', '振翅'], ['lift off', '起飞']],
    'Peters’ signature shot', 'is', ['complement', 'a butterfly “take-off”'],
    '主语 + 系动词 + 表语 + 分词补充说明',
  ),
  'M-B02': s(
    '他是如何拍到这种照片的？',
    [['capture', '捕捉；拍摄'], ['how', '如何']],
    'he', 'capture', undefined, '特殊疑问句',
  ),
  'M-B03': s(
    '技术提供了帮助。',
    [['technology', '技术'], ['help', '帮助']],
    'Technology', 'helps', undefined, '主语 + 谓语（SV）',
  ),
  'M-B04': s(
    '普通的数码单反相机每秒能拍摄 20 帧。',
    [['digital SLR camera', '数码单反相机'], ['frame', '画面；帧'], ['a second', '一秒']],
    'A typical digital SLR camera', 'shoots', ['object', '20 frames a second'],
    '主语 + 谓语 + 宾语（SVO）',
  ),
  'M-B05': s(
    '他使用每秒能拍摄 120 帧的高速 OM System 相机。',
    [['high-speed', '高速的'], ['shoot', '拍摄'], ['frame a second', '每秒一帧；每秒拍摄……帧']],
    'He', 'uses', ['object', 'a high-speed OM System which shoots 120 frames a second'],
    '主语 + 谓语 + 宾语 + 定语从句',
  ),
  'M-C01': s(
    '与欧洲大陆相比，英国的蝴蝶种类相对较少，其中 80% 正在减少，主要因为集约化化学农业把许多物种压缩到了零碎的栖息地和小型自然保护区。',
    [['relatively few', '相对较少'], ['in decline', '在减少；衰退中'], ['fragment of habitat', '零碎的栖息地']],
    'Britain', 'has', ['object', 'relatively few butterfly species compared with mainland Europe'],
    '主语 + 谓语 + 宾语 + 并列分句',
  ),
  'M-C02': s(
    '全球变暖让一些物种受益，但另一些物种过于孤立，找不到合适的新栖息地；园艺习惯也无济于事。',
    [['global heating', '全球变暖'], ['isolated', '孤立的'], ['pesticide', '杀虫剂']],
    'Global heating', 'is benefiting', ['object', 'some species'],
    '并列分句（转折关系）',
  ),
  'M-C03': s(
    '蝴蝶可能不像野生蜜蜂和食蚜蝇那样给那么多植物授粉，但由于英国蝴蝶是世界上研究最充分的昆虫群体，它们是衡量飞行昆虫整体衰退的极有用指标。',
    [['pollinate', '给……授粉'], ['hoverfly', '食蚜蝇'], ['indicator', '指标']],
    'Butterflies', 'may not pollinate', ['object', 'as many plants as wild bees and hoverflies'],
    '让步 / 转折分句 + because 原因状语从句',
  ),
  'M-D01': s(
    '五年前，在夏末时节，Andrew Fusek Peters 被诊断出患有肠癌。',
    [['at summer’s end', '在夏末'], ['be diagnosed with', '被诊断患有'], ['bowel cancer', '肠癌']],
    'Andrew Fusek Peters', 'was diagnosed', ['complement', 'with bowel cancer'],
    '时间状语 + 主语 + 被动谓语 + 介词补语',
  ),
  'M-D02': s(
    '“我在等待手术，感觉非常不舒服，坐在花园里。天气好极了，到处都是彩蝶。”他这样说道。',
    [['wait for surgery', '等待手术'], ['painted lady', '彩蝶'], ['everywhere', '到处']],
    'I', 'was waiting', ['adverbial', 'for surgery, feeling really ill, sitting in my garden'],
    '直接引语 + 并列分词状语',
  ),
  'M-D03': s(
    '“它们象征着脆弱的生命、希望和抗争，而某种东西触动了我的灵魂。”',
    [['fragile', '脆弱的'], ['defiance', '抗争；反抗'], ['appeal to one’s soul', '触动某人的灵魂']],
    'They', 'were', ['complement', 'a symbol of fragile life, of hope and defiance'],
    '主语 + 系动词 + 表语 + 并列分句',
  ),
  'M-E01': s(
    '那会让这件事听起来很容易、很不真实，但 Peters 坚称它仍然是一个巨大的挑战。',
    [['make ... sound', '使……听起来'], ['artificial', '不自然的；人为的'], ['insist', '坚持说']],
    'Peters', 'insists', ['object', 'it is still a massive challenge'],
    '转折并列句 + 宾语从句',
  ),
  'M-E02': s(
    '他通常要拍摄一万到两万张照片，才能得到一组对焦清晰的蝴蝶起飞连续影像。',
    [['typically', '通常'], ['sequence', '连续画面；序列'], ['in focus', '对焦清晰']],
    'He', 'takes', ['object', 'between 10,000 and 20,000 shots'],
    '主语 + 谓语 + 宾语 + 目的状语',
  ),
  'M-E03': s(
    '在如此高的快门速度下，景深很小；而且由于蝴蝶不会沿直线飞行，它们很快就会飘出焦点。',
    [['shutter speed', '快门速度'], ['depth of field', '景深'], ['flutter out of focus', '飘出焦点']],
    'the depth of field', 'is', ['complement', 'tiny'],
    '时间 / 条件状语 + 并列分句 + as 原因从句',
  ),
  'M-E04': s(
    '除了数千次尝试，还需要耐心和野外经验，才能预判蝴蝶可能的飞行路线，并在它飞过时抓住清晰画面。',
    [['fieldcraft', '野外观察与操作经验'], ['anticipate', '预判'], ['flight-line', '飞行路线']],
    'it', 'takes', ['object', 'patience and fieldcraft'],
    '伴随状语 + 形式主语结构 + 不定式目的成分',
  ),
  'M-F01': s(
    '那么，花一整天汗流浃背地追逐一只难以捉摸、快速移动的野生动物，吸引力究竟在哪里？',
    [['in pursuit of', '追逐；寻求'], ['elusive', '难以捉摸的'], ['fast-moving', '快速移动的']],
    'what', 'the appeal', ['complement', 'of a long, sweaty day in pursuit of an elusive, fast-moving wild animal'],
    '特殊疑问句 + 系表结构',
  ),
  'M-F02': s(
    '“感觉真是棒极了。”Peters 说。',
    [['bloody', '（口语）非常；极其'], ['brilliant', '极好的']],
    'It', 'feels', ['complement', 'bloody brilliant'], '主语 + 系动词 + 表语',
  ),
  'M-F03': s(
    '“如果我一整天都与蝴蝶有美好的邂逅，遇到有趣的蝴蝶爱好者，并且拍到了一些好照片，那些经历就会成为我精神银行中的一笔财富。',
    [['encounter', '邂逅；遇见'], ['vault', '金库；宝库'], ['spiritual bank', '精神财富']],
    'that', 'becomes', ['complement', 'a vault in my spiritual bank'],
    'if 条件从句 + 主句 + 表语',
  ),
  'M-F04': s(
    '这是一种幸福的感觉。',
    [['happy feeling', '幸福的感觉'], ['feeling', '感觉']],
    'It', 'a happy feeling', undefined, '主语 + 系动词 + 表语',
  ),
  'M-G01': s(
    'Peters 原是一位儿童作家和诗人，后来成为热心的业余摄影师；他观察蝴蝶，漫不经心地想知道自己能否拍下它们飞行的样子。',
    [['keen amateur photographer', '热心的业余摄影师'], ['idly', '漫不经心地'], ['capture in flight', '拍下飞行中的……']],
    'Peters', 'watched', ['object', 'the butterflies'], '分词短语作前置定语 + 主语 + 并列谓语',
  ),
  'M-G02': s(
    '随着他从成功切除癌症的手术中恢复，这件事很快变成了一种痴迷。',
    [['swiftly', '迅速地'], ['obsession', '痴迷'], ['recover from', '从……中恢复']],
    'It', 'became', ['complement', 'an obsession'], '主语 + 系动词 + 表语 + as 从句',
  ),
  'M-G03': s(
    '近几个夏天，他走遍英国各地，拍摄全部 58 种本土蝴蝶。',
    [['the length and breadth of', '遍及……各地'], ['native species', '本土物种'], ['travel', '旅行；走遍']],
    'he', 'has travelled', ['adverbial', 'the length and breadth of Britain'], '时间状语 + 主语 + 现在完成时谓语 + 目的状语',
  ),
  'M-G04': s(
    '如今，那些夏日经历的成果已经出版成一本精美的新书。',
    [['fruit', '成果'], ['be published', '出版'], ['beautiful', '精美的']],
    'the fruits of those summers', 'have been published', ['adverbial', 'in a beautiful new book'], '主语 + 被动谓语 + 状语',
  ),
  'M-H01': s(
    '蝴蝶起飞得如此之快，人仍不可能及时反应并捕捉那一刻；但如果 Peters 半按快门，相机会保存实际按下快门之前的 70 帧画面。',
    [['half-press the shutter', '半按快门'], ['previous frame', '之前的画面'], ['capture the moment', '捕捉瞬间']],
    'A butterfly', 'takes off', ['adverbial', 'so quickly'], '结果结构 so...that... + but 转折分句',
  ),
  'M-H02': s(
    '“这就像时间旅行，所以我不会错过蝴蝶起飞的瞬间。”他这样说道。',
    [['time travel', '时间旅行'], ['miss the moment', '错过瞬间'], ['take-off', '起飞']],
    'I', 'don’t miss', ['object', 'the moment of take-off'], '直接引语 + 主语 + 谓语 + 宾语',
  ),
  'M-H03': s(
    '拍下蝴蝶起飞后，他会在 Photoshop 中把 10 到 15 帧画面叠加在一起。',
    [['layer ... together', '把……叠加在一起'], ['capture', '拍摄；捕捉'], ['Photoshop', 'Photoshop 软件']],
    'he', 'layers', ['object', '10 to 15 frames together'], '时间状语 + 主语 + 谓语 + 宾语',
  ),

  'R1-01': s(
    '这位来自埃文河畔斯特拉特福的文法学校男孩，在一项突破性研究表明莎士比亚确实能促进儿童读写能力和情感发展的成果公布后，取得了学术上的胜利。',
    [['land a scholarly punch', '取得学术上的胜利'], ['literacy', '读写能力'], ['emotional development', '情感发展']],
    'The grammar school boy from Stratford-upon-Avon', 'has landed', ['object', 'a scholarly punch'], '主语 + 现在完成时谓语 + 宾语 + after 从句',
  ),
  'R1-02': s(
    '但前提是你要把莎士比亚的作品演出来。',
    [['act ... out', '把……演出来'], ['only if', '只有在……条件下']],
    'you', 'act', ['object', 'him out'], 'if 条件从句 + 祈使意味的主谓结构',
  ),
  'R1-03': s(
    '一项研究发现，用“排练室”方式教授莎士比亚，能拓展儿童的词汇量、写作复杂度以及情感素养。',
    [['rehearsal room approach', '排练室教学方式'], ['broaden', '拓展'], ['emotional literacy', '情感素养']],
    'A study', 'found', ['object', 'that a “rehearsal room” approach to teaching Shakespeare broadened children’s vocabulary'], '主语 + 谓语 + 宾语从句',
  ),
  'R1-04': s(
    '皇家莎士比亚剧团负责委托这项研究的 Jacqui O’Hanlon 说：“研究表明，演员的工作方式会极大影响儿童使用语言的方式，也会影响他们如何看待自己。”',
    [['make a big difference to', '对……产生很大影响'], ['commission', '委托'], ['think about oneself', '思考自己；看待自己']],
    'Jacqui O’Hanlon', 'said', ['object', 'The research shows'], '直接引语作宾语 + 报道句',
  ),
  'R1-05': s(
    '这项随机对照试验涉及 45 所公立小学的数百名五年级学生——他们年龄为九岁和十岁——这些学校此前都没有接触过皇家莎士比亚剧团的教学法。',
    [['randomised control trial', '随机对照试验'], ['year 5 pupil', '五年级学生'], ['be exposed to', '接触；受到影响']],
    'The randomised control trial', 'involved', ['object', 'hundreds of year 5 pupils'], '主语 + 谓语 + 宾语 + 定语从句',
  ),
  'R1-06': s(
    '他们被分成实验组和对照组，并被要求以《暴风雨》中的费迪南德身份写一封漂流瓶短信。',
    [['be split into', '被分成'], ['target group', '实验组'], ['message in a bottle', '漂流瓶短信']],
    'They', 'were split', ['complement', 'into target and control groups'], '被动结构 + 并列谓语 + 不定式补语',
  ),
  'R1-07': s(
    '实验组获得了一项时长 30 分钟、以戏剧为基础的活动，用来配合课文。',
    [['drama-based', '以戏剧为基础的'], ['accompany', '配合；伴随'], ['passage', '课文；文章']],
    'The target group', 'were given', ['object', 'a 30-minute drama-based activity'], '主语 + 被动谓语 + 宾语 + 目的状语',
  ),
  'R1-08': s(
    '经过同行评审的结果显示，实验组学生使用了更丰富的词汇，使用了“被归类为更复杂或更罕见”的词语，而且写作篇幅更长。',
    [['peer-reviewed', '经过同行评审的'], ['draw on', '利用；借助'], ['at greater length', '篇幅更长地']],
    'The peer-reviewed results', 'showed', ['object', 'that the target group of pupils drew on a wider vocabulary'], '主语 + 谓语 + 宾语从句 + 并列谓语',
  ),
  'R1-09': s(
    '他们似乎也更适应以角色身份写作；对照组学生想象自己遭遇海难时会如何反应，而实验组学生则设身处地代入文学人物，表达该人物的情感。',
    [['write in role', '以角色身份写作'], ['put oneself in the shoes of', '设身处地代入'], ['literary character', '文学人物']],
    'They', 'appear', ['complement', 'to be more comfortable writing in role'], '主句 + while 对比从句 + 并列分句',
  ),
  'R1-10': s(
    '本周由皇家莎士比亚剧团发表的“付诸行动”研究还发现，对照组学生依赖棕榈树之类的“荒岛陈词滥调”，而实验组学生的描写更丰富，对天空、海洋和大气状况进行了更广阔的呈现。',
    [['rely on', '依赖'], ['cliché', '陈词滥调'], ['expansive', '丰富的；开阔的']],
    'The Time to Act study', 'found', ['object', 'that while control pupils relied on “desert island clichés”'], '主语 + 谓语 + 宾语从句 + while 对比结构',
  ),
  'R1-11': s(
    'O’Hanlon 说，最让她惊讶的是实验组学生写作中体现出的“情感素养”，以及他们在写作中“更坚韧、更充满希望”。',
    [['be surprised by', '对……感到惊讶'], ['be evident in', '在……中显现'], ['resilient', '坚韧的；有复原力的']],
    'O’Hanlon', 'said', ['object', 'emotional literacy that was evident'], '主语 + 报道动词 + 宾语从句',
  ),
  'R1-12': s(
    '她补充道：“这种情感理解非常明显，这可能与排练室过程有关——在这一过程中，你已经习惯于设法想象并经历某种情境。”',
    [['emotional understanding', '情感理解'], ['be related to', '与……有关'], ['imagine one’s way through', '设法通过想象来理解和经历']],
    'She', 'added', ['object', '“The emotional understanding was very evident'], '主语 + 谓语 + 直接引语宾语',
  ),
  'R1-13': s(
    '他们很自在地描述不同的情绪状态，而戏剧的一部分就在于让自己置身于不同人物的处境。',
    [['emotional state', '情绪状态'], ['be comfortable in doing', '做某事时感到自在'], ['put oneself in someone’s shoes', '设身处地理解某人']],
    'They', 'were comfortable', ['adverbial', 'in describing different emotional states'], '主语 + 系动词短语 + 并列分句',
  ),
  'R1-14': s(
    '她说，这项研究显示了把艺术融入教育的重要性。',
    [['embed ... in', '把……融入……'], ['importance', '重要性'], ['education', '教育']],
    'The study', 'showed', ['object', 'the importance of embedding arts in education'], '主语 + 谓语 + 宾语',
  ),
  'R1-15': s(
    '但这些结果能在任何一位老派剧作家身上复现吗？',
    [['replicate', '复现；复制'], ['dramatist', '剧作家'], ['old', '老派的；传统的']],
    'the results', 'be replicated', ['adverbial', 'with any old dramatist'], '一般疑问句 + 被动语态',
  ),
  'R1-16': s(
    'O’Hanlon 说，还需要更多研究，但她认为莎士比亚使用了两万个词，而日常英语只有两千个词，这使语言大量扩展到儿童的生活中；与此同时，孩子们还用全身动作让文字鲜活起来。',
    [['compared with', '与……相比'], ['massive expansion', '大幅扩展'], ['bring ... to life', '使……鲜活起来']],
    'O’Hanlon', 'suggested', ['object', 'Shakespeare’s use of 20,000 words'], '主语 + 谓语 + 宾语从句 + which 定语从句',
  ),

  'R2-01': s(
    '我最近得知有些科学家想要缩减研究，以减少碳排放，这让我感到震惊。',
    [['scale back', '缩减'], ['in an effort to', '为了；试图'], ['carbon emission', '碳排放']],
    'I', 'was shocked', ['complement', 'to learn recently that some scientists want to scale back their research'], '主语 + 被动系表结构 + 不定式原因',
  ),
  'R2-02': s(
    '他们说，危机已经到来，我们需要减少高能耗的建模工作。',
    [['cut back on', '削减；减少'], ['energy-intensive', '高能耗的'], ['modelling', '建模']],
    'we', 'need', ['object', 'to cut back on our energy-intensive modelling'], '主语 + 谓语 + 不定式宾语',
  ),
  'R2-03': s(
    '至少，我们需要让能源使用变得更加可持续。',
    [['at the very least', '至少'], ['sustainable', '可持续的'], ['energy use', '能源使用']],
    'we', 'need', ['object', 'to make our energy use far more sustainable'], '主语 + 谓语 + 不定式宾语补足结构',
  ),
  'R2-04': s(
    '不可否认，我们的实验室、科学仪器、火箭和卫星——这些是科学家用来测量地球脉搏的工具——无论建造还是运行，都需要大量能源。',
    [['unarguable', '不可否认的'], ['measure the planet’s pulse', '测量地球的状况'], ['construction and operation', '建造与运行']],
    'our laboratories, scientific instruments, rockets and satellites', 'demand', ['object', 'significant amounts of energy'], '形式主语 it + that 宾语从句',
  ),
  'R2-05': s(
    '同样真实的是，科学对信息永不满足的需求，导致世界各地高能耗数据中心大量涌现。',
    [['unrelenting appetite', '永不满足的需求'], ['mushrooming', '迅速增长；大量涌现'], ['data centre', '数据中心']],
    'science’s unrelenting appetite for information', 'has caused', ['object', 'a mushrooming of energy-intensive data centres around the world'], '主语 + 现在完成时谓语 + 宾语',
  ),
  'R2-06': s(
    '据国际能源署统计，这些建筑目前消耗着全世界约 1% 的电力。',
    [['according to', '根据'], ['consume', '消耗'], ['electricity', '电力']],
    'these buildings', 'consume', ['object', 'about 1 percent of the world’s electricity'], '来源状语 + 主语 + 谓语 + 宾语',
  ),
  'R2-07': s(
    '然而，这是我们为了理解世界而必须付出的代价。',
    [['pay a price', '付出代价'], ['understanding the world', '理解世界'], ['however', '然而']],
    'this', 'is', ['complement', 'a price we must pay for understanding the world'], '转折副词 + 主语 + 系动词 + 表语',
  ),
  'R2-08': s(
    '如果我们无法追踪大气中二氧化碳的数量、来源以及排放者，又怎么能告诉决策者降低碳排放的最佳方法呢？',
    [['decision maker', '决策者'], ['bring down', '降低'], ['track', '追踪；监测']],
    'we', 'inform', ['object', 'decision makers about the best ways to bring down carbon emissions'], 'how 引导的特殊疑问句 + if 条件从句',
  ),
  'R2-09': s(
    '技术研究产生的碳排放是值得的：归根结底，这些研究将守护我们星球的未来。',
    [['well spent', '花得值得'], ['ultimately', '最终；归根结底'], ['safeguard', '保护；守护']],
    'The carbon emissions from technological research', 'are', ['complement', 'well spent'], '主语 + 系动词 + 表语 + 冒号后解释',
  ),
  'R2-10': s(
    '科学家很难证明这一点，因为他们的工作复杂，经常在幕后进行，也不总是容易解释或说明。',
    [['make the case', '证明观点；提出有力论据'], ['behind closed doors', '秘密地；幕后地'], ['lend itself to', '适合于；便于']],
    'our work', 'is', ['complement', 'complex'], '主句 + because 原因状语从句 + 并列谓语',
  ),
  'R2-11': s(
    '但如果我们要解决人类面临的最大挑战，证明科学的效能将至关重要。',
    [['demonstrate', '证明；展示'], ['efficacy', '效能；功效'], ['crucial', '至关重要的']],
    'demonstrating the efficacy of science', 'will be', ['complement', 'crucial'], '动名词主语 + 系动词 + 表语 + if 条件从句',
  ),
  'R2-12': s(
    '面对气候变化这样的艰巨问题，人很容易感到无力而什么也不做。',
    [['paralysed', '无力行动的；麻木的'], ['in the face of', '面对'], ['daunting', '令人畏惧的']],
    'It', 'is', ['complement', 'all too easy to feel paralysed'], '形式主语 + 系表结构 + 不定式',
  ),
  'R2-13': s(
    '但这时我会想到一位朋友的女儿，她把恐惧转化为行动：她成为风能工程师，现在通过提供可再生能源、限制排放而蓬勃发展。',
    [['turn ... into action', '把……转化为行动'], ['wind energy engineer', '风能工程师'], ['thrive on', '因……而茁壮成长']],
    'she', 'became', ['complement', 'a wind energy engineer'], '主句 + who 定语从句 + 冒号后解释',
  ),
  'R2-14': s(
    '认识到科学和工程能够带来的希望，是创办千禧科技奖的动力；该奖项如今进入第 20 个年头，用来庆祝人类的创造力。',
    [['impetus', '动力；推动力'], ['ingenuity', '创造力；独创性'], ['in the 20th year', '进入第 20 年']],
    'Recognising the hope that science and engineering can bring', 'was', ['complement', 'the impetus behind the creation of the Millennium Technology Prize'], '动名词短语主语 + 系表结构 + 定语从句',
  ),
  'R2-15': s(
    '往届获奖者之一、来自澳大利亚新南威尔士大学的 Martin Green 教授，是钝化发射极和背面电池技术的发明者；这种技术如今已用于世界大多数太阳能电池板。',
    [['past winner', '往届获奖者'], ['inventor', '发明者'], ['solar panel', '太阳能电池板']],
    'Professor Martin Green', 'is', ['complement', 'the inventor of the Passivated Emitter and Rear Cell technology'], '同位语 + 主语 + 系动词 + 表语 + 定语从句',
  ),
  'R2-16': s(
    '多亏了他的发明，我们确实有机会减少全球碳排放。',
    [['thanks to', '多亏；由于'], ['a real chance', '真正的机会'], ['decrease', '减少']],
    'we', 'have', ['object', 'a real chance to decrease the world’s carbon emissions'], '原因状语 + 主语 + 谓语 + 宾语',
  ),
  'R2-17': s(
    '科学家、技术人员和工程师每天都在发现利用可再生能源的新方法，并开发新的技术，不仅更智能地使用能源，也为我们的智慧提供动力。',
    [['exploit', '开发利用'], ['renewable energy source', '可再生能源'], ['not just ... but', '不仅……而且……']],
    'scientists, technologists and engineers', 'are discovering', ['object', 'new ways to exploit renewable energy sources'], '并列主语 + 现在进行时谓语 + 宾语 + not just...but...结构',
  ),
  'R2-18': s(
    '芬兰的 LUMI 是一个很好的例子：它是欧洲最大的超级计算机，而且惊人地实现了负碳排放。',
    [['supercomputer', '超级计算机'], ['carbon-negative', '负碳排放的'], ['a great example of', '……的很好例子']],
    'LUMI in Finland', 'is', ['complement', 'astonishingly carbon-negative'], '主语 + 系动词 + 表语 + which 定语从句',
  ),
  'R2-19': s(
    '它建在一座旧造纸厂里，由附近的河流供电，余热则为周边城镇 Kajaani 的居民供暖。',
    [['paper mill', '造纸厂'], ['be powered by', '由……供电'], ['remote heat', '余热']],
    'it', 'is powered', ['adverbial', 'by a nearby river'], '分词状语 + 被动谓语 + 并列分句',
  ),
  'R2-20': s(
    '如果世界要实现净零排放目标，我们就必须认真思考如何实现可持续计算，并建设更多 LUMI 这样的系统。',
    [['net-zero ambition', '净零排放目标'], ['sustainable computing', '可持续计算'], ['think hard about', '认真思考']],
    'we', 'must think', ['object', 'hard about how we can deliver sustainable computing'], 'if 条件从句 + 主语 + 情态动词谓语 + 宾语从句',
  ),

  'R3-01': s(
    '自从老好莱坞以 Netflix 的方式迎战它以来，它一直难以在流媒体领域实现盈利；Disney+、Peacock 和 Paramount+ 等平台每年损失数十亿美元，引发了人们对这些服务永远无法像有线电视那样盈利的担忧。',
    [['take on', '迎战；承担'], ['turn a profit', '实现盈利'], ['a boon for', '对……有利的事']],
    'old Hollywood', 'has struggled', ['adverbial', 'to turn a profit in streaming'], 'since 时间状语 + 主句 + with 复合结构',
  ),
  'R3-02': s(
    '但流媒体时代却让一些意外的赢家获益：盗版者利用软件在几秒内从合法在线视频平台盗取电影或电视节目，再把这些作品放到自己的非法服务上；这些服务每年从广告和订阅中赚取约 20 亿美元。',
    [['unintended winner', '意外的赢家'], ['rip a film', '盗取电影文件'], ['rake in', '赚取；获得大量收入']],
    'the age of streaming', 'has been', ['complement', 'a boon for some unintended winners'], '转折句 + 系表结构 + 定语从句',
  ),
  'R3-03': s(
    '据代表好莱坞制片厂、正致力于打击近年涌现的数千个非法平台的电影协会称，由于没有视频制作成本，非法流媒体网站的利润率已接近 90%。',
    [['profit margin', '利润率'], ['approach', '接近'], ['crack down on', '严厉打击']],
    'illegal streaming sites', 'have achieved', ['object', 'profit margins approaching 90%'], '原因状语 + 主语 + 现在完成时谓语 + 宾语',
  ),
  'R3-04': s(
    '起初，Netflix 等合法在线企业的兴起实际上帮助遏制了数字盗版，而当时盗版主要基于文件上传。',
    [['initially', '起初'], ['curb', '遏制'], ['file upload', '文件上传']],
    'the rise of legitimate online businesses such as Netflix', 'helped', ['object', 'curb digital piracy'], '时间状语 + 主语 + 谓语 + 宾语 + 定语从句',
  ),
  'R3-05': s(
    '但如今，涉及非法流媒体服务和文件共享的盗版行为，每年让美国经济损失约 300 亿美元的收入和约 25 万个工作岗位。',
    [['file-sharing', '文件共享'], ['lost revenue', '损失的收入'], ['estimate', '估计']],
    'piracy involving illegal streaming services as well as file-sharing', 'costs', ['object', 'the US economy about $30 billion in lost revenue a year and some 250,000 jobs'], '主语 + 谓语 + 双宾语 / 使役结构',
  ),
  'R3-06': s(
    '全球影响约为每年 710 亿美元。',
    [['global impact', '全球影响'], ['annually', '每年地'], ['billion', '十亿']],
    'The global impact', 'is', ['complement', 'about $71 billion annually'], '主语 + 系动词 + 表语',
  ),
  'R3-07': s(
    '电影协会首席执行官 Charlie Rivkin 说：“那些盗窃我们的电影和电视节目、经营盗版网站的人，并不是小本经营的普通人家。”',
    [['mom and pop operation', '小本经营的家庭作坊'], ['operate', '经营'], ['chief executive officer', '首席执行官']],
    'Charlie Rivkin', 'says', ['object', 'The people who are stealing our movies'], '报道句 + 直接引语作宾语',
  ),
  'R3-08': s(
    '“这是有组织犯罪。”',
    [['organized crime', '有组织犯罪'], ['this', '这；这种情况']],
    'This', 'is', ['complement', 'organized crime'], '主语 + 系动词 + 表语',
  ),
  'R3-09': s(
    'Rivkin 于 2017 年加入电影协会；五年前，该组织曾未能在好莱坞和硅谷之间建立共识，从而推动国会通过旨在制止网络盗版的立法。',
    [['build consensus', '建立共识'], ['win passage of legislation', '争取立法通过'], ['aimed at', '旨在……的']],
    'Rivkin', 'joined', ['object', 'the MPA'], '时间状语 + 主语 + 谓语 + 宾语 + after 从句',
  ),
  'R3-10': s(
    '2017 年，该协会成立了创意与娱乐联盟（ACE），这是一个由约 100 名侦探组成的执法工作组，在全球各地协助当地政府逮捕流媒体盗版者。',
    [['enforcement task force', '执法工作组'], ['circle the globe', '环绕全球行动'], ['local authority', '当地政府']],
    'the association', 'formed', ['object', 'the Alliance for Creativity and Entertainment (ACE)'], '时间状语 + 主语 + 谓语 + 宾语 + 同位语',
  ),
  'R3-11': s(
    'ACE 表示，在电影协会支持一项 2020 年联邦法律的部分帮助下，北美非法流媒体服务的数量已从 2018 年的 1400 多个减少到 126 个；该法律将大规模播放受版权保护的材料定为严重犯罪。',
    [['shrink ... to', '减少到'], ['aided in part by', '部分得益于'], ['copyright material', '受版权保护的材料']],
    'ACE', 'says', ['object', 'it’s helped shrink the number of illegal streaming services in North America to 126'], '主语 + 报道动词 + 宾语从句 + 分词状语',
  ),
  'R3-12': s(
    '咨询公司 Parks Associates 预测，自 2022 年以来，盗版给美国合法流媒体服务造成的累计损失将在未来两年达到 1130 亿美元。',
    [['consulting firm', '咨询公司'], ['cumulative loss', '累计损失'], ['reach', '达到']],
    'Consulting firm Parks Associates', 'predicts', ['object', 'that legitimate US streaming services’ cumulative loss from piracy since 2022 will reach $113 billion'], '主语 + 谓语 + 宾语从句',
  ),
  'R3-13': s(
    '分析师 Steve Hawley 说：“虽然新出现的反制措施和最佳实践可能让人乐观地认为盗版会在 2027 年前后开始趋于平稳，但利益相关者对于它何时可能开始下降并没有共识。”',
    [['countermeasure', '反制措施'], ['plateau', '趋于平稳'], ['stakeholder', '利益相关者']],
    'analyst Steve Hawley', 'says', ['object', 'there is some optimism'], '让步状语从句 + 报道句 + 直接引语',
  ),

  'R4-01': s(
    '走进任何一家古董店，你都会遇到来自过去的遗物：照片、信件、一份介绍 1964—1965 年世界博览会辛克莱恐龙展的宣传册，以及历史的零星遗存。',
    [['antique store', '古董店'], ['artifact', '遗物；历史遗存'], ['ephemera', '短暂存在的物品；零星遗物']],
    'you', 'encounter', ['object', 'artifacts from the past'], '祈使句 + 主句 + 冒号后列举',
  ),
  'R4-02': s(
    '然而，这些物品并不真正短暂易逝，因为几十年、甚至几百年后它们仍然存在。',
    [['ephemeral', '短暂的；转瞬即逝的'], ['decade', '十年'], ['century', '世纪']],
    'these objects', 'aren’t', ['complement', 'truly ephemeral'], '转折句 + 系表结构 + because 原因从句',
  ),
  'R4-03': f(
    '为什么？',
    [['why', '为什么']],
    'Why?',
    '特殊疑问省略句',
    '疑问副词单独成句，承接上文并引出下句的原因。',
  ),
  'R4-04': f(
    '因为它们是有形的。',
    [['tangible', '有形的；可触摸的']],
    'Because they’re tangible.',
    'Because 原因省略句',
  ),
  'R4-05': s(
    '考虑过无形载体、数字信息的生命周期吗？因为生产这些信息的人很少为其长期保存作出安排。',
    [['intangible format', '无形载体'], ['life cycle', '生命周期'], ['make provision for', '为……作准备；安排']],
    'you', 'pondered', ['object', 'the life cycle of intangible formats, digital information'], '现在完成时疑问句 + given that 原因从句',
  ),
  'R4-06': s(
    '几千年来，我们之所以知道过去所知的一切，是因为许多遗物保存了下来，尽管它们最初的创造者常常忽视了保存问题。',
    [['for millennia', '几千年来'], ['survive', '保存下来；幸存'], ['neglect', '忽视；疏忽']],
    'we', 'known', ['object', 'what we’ve known'], '时间状语 + 主语 + 现在完成时 + due to 短语',
  ),
  'R4-07': s(
    '实物本身就是传递信息的媒介。',
    [['the thing itself', '事物本身'], ['medium', '媒介'], ['deliver information', '传递信息']],
    'The thing itself', 'is', ['complement', 'the medium that delivers the information'], '主语 + 系动词 + 表语 + 定语从句',
  ),
  'R4-08': s(
    '在创作之时，人们没有有意进行保存，但模拟材料仍有机会存留下来，成为传记作者、历史学家和小说家所依赖的历史记录。',
    [['intentional preservation', '有意保存'], ['analog material', '模拟材料；非数字材料'], ['historical record', '历史记录']],
    'no attempts', 'were made', ['adverbial', 'at intentional preservation'], '时间状语 + 被动句 + yet 转折分句 + 定语从句',
  ),
  'R4-09': s(
    '图书馆和档案馆传统上承担着组织、保存和提供信息访问的责任。',
    [['shoulder the responsibility', '承担责任'], ['organization', '组织'], ['access to information', '信息访问']],
    'Libraries and archives', 'shouldered', ['object', 'the responsibility of organization, preservation, and access to information'], '主语 + 现在完成时谓语 + 宾语',
  ),
  'R4-10': s(
    '因此，图书管理员把有形材料数字化，让世界各地的研究人员可以快速搜索并访问馆藏。',
    [['digitize', '数字化'], ['the world over', '全世界'], ['holding', '馆藏；收藏品']],
    'librarians', 'digitize', ['object', 'the tangible'], '结果副词 + 主语 + 谓语 + 宾语 + so that 目的从句',
  ),
  'R4-11': s(
    '结果是历史资料极其丰富，但也带来了自己的“大海捞针”问题。',
    [['an embarrassment of riches', '过于丰富的资源'], ['needle-and-haystack', '大海捞针的'], ['result', '结果']],
    'The result', 'is', ['complement', 'an embarrassment of historical riches'], '主语 + 系动词 + 表语 + which 定语从句',
  ),
  'R4-12': s(
    '当用户举起手机说“全都在这里”，以此证明图书馆对当今研究人员不再那么重要时，图书管理员无私的奉献反而可能对我们不利。',
    [['selfless devotion', '无私的奉献'], ['universality of access', '访问的普遍性'], ['vital', '至关重要的']],
    'Librarians’ selfless devotion', 'can act', ['adverbial', 'against us'], '主语 + 情态动词谓语 + when 时间状语从句',
  ),
  'R4-13': s(
    '然而，这种普遍访问是如何实现的，或许更重要的是，它又是如何得到维护的？',
    [['universality of access', '普遍访问'], ['maintain', '维护；保持'], ['perhaps more importantly', '也许更重要的是']],
    'how', 'was', ['complement', 'that universality of access'], '并列特殊疑问句 + 被动结构',
  ),
  'R4-14': s(
    '谁来整理和决定哪些内容得到保存？',
    [['curate', '整理；筛选并维护'], ['preserve', '保存']],
    'Who', 'curates', ['object', 'what is preserved'], '特殊疑问句 + 宾语从句',
  ),
  'R4-15': s(
    '说到原生数字信息，令人恐惧的答案可能是：如果不是图书管理员和档案管理员，那就没有人负责。',
    [['born-digital', '原生数字的'], ['terrifying', '令人恐惧的'], ['archivist', '档案管理员']],
    'the terrifying answer', 'can be', ['complement', 'if not librarians and archivists, then no one'], '话题状语 + 主语 + 系动词 + 表语',
  ),
  'R4-16': s(
    '数字信息比模拟信息需要多得多的呵护。',
    [['require', '需要'], ['a great deal more', '多得多的'], ['analog', '模拟的；非数字的']],
    'Digital information', 'requires', ['object', 'a great deal more care than analog'], '主语 + 谓语 + 宾语 + 比较结构',
  ),
  'R4-17': s(
    '即使数字对象得到保存，保存下来的也可能只是载体，而不是信息本身。',
    [['carrier', '载体'], ['preserve', '保存'], ['not ... itself', '不是……本身']],
    'a digital object', 'is preserved', ['complement', 'the carrier'], '让步状语从句 + 主系表结构 + 强调限定',
  ),
  'R4-18': s(
    '随着技术进步、某种格式变得过时，这个对象就失去了作用。',
    [['advance', '发展；进步'], ['format', '格式'], ['obsolete', '过时的']],
    'the object', 'is', ['complement', 'useless'], 'as 时间状语从句 + 主语 + 系动词 + 表语',
  ),
  'R4-19': s(
    '你是否曾无助地盯着一张 ZIP 磁盘，想着：我该如何把文件从里面取出来？',
    [['stare helplessly at', '无助地盯着'], ['ZIP disk', 'ZIP 磁盘'], ['get ... off', '把……从……取出']],
    'you', 'stared', ['adverbial', 'helplessly at a ZIP disk'], '现在完成时疑问句 + 分词伴随状语',
  ),
  'R4-20': s(
    '如果没有持续迁移数字资产，令历史学家夜不能寐的可预见未来噩梦就是：当数字取代模拟时，历史记录会突然中断。',
    [['constant migration', '持续迁移'], ['foreseeable future', '可预见的未来'], ['replace', '取代']],
    'a nightmare about the foreseeable future', 'is', ['complement', 'what keeps historians up at night'], '条件状语 + 主语 + 系表结构 + 冒号后同位解释',
  ),
  'R4-21': s(
    '作为一名日常工作围绕特殊馆藏和数字资产展开的图书管理员，我也理解历史学家的夜间恐惧；如果说目前存在全面的保存方案，那我就是在撒谎。',
    [['special collection', '特殊馆藏'], ['night terror', '夜间恐惧；噩梦'], ['comprehensive', '全面的']],
    'I', 'share', ['object', 'the night terrors of historians'], '身份状语 + 主语 + 谓语 + 宾语 + if 条件从句',
  ),
  'R4-22': s(
    '然而，研究人员可以得到一些安慰，因为有许多图书管理员致力于为当代和未来的研究人员发现、组织并保存数字信息。',
    [['take comfort in', '从……中得到安慰'], ['a multitude of', '大量的'], ['devoted to', '致力于']],
    'researchers', 'can take', ['object', 'some comfort in the fact that there are a multitude of librarians'], '转折副词 + 主语 + 情态动词谓语 + because 从句',
  ),
  'R4-23': s(
    '图书管理员处于独特位置，能够理解最终用户如何寻找和使用信息。',
    [['be uniquely positioned to', '处于独特位置能够……'], ['end user', '最终用户'], ['seek and use', '寻找并使用']],
    'Librarians', 'are', ['complement', 'uniquely positioned to understand how end users seek and use information'], '主语 + 系动词 + 表语 + 不定式宾语',
  ),
  'R4-24': s(
    '因此，我们在识别、保存数字遗物并为其提供可访问性方面发挥着不可或缺的作用；未来研究人员也许会发现数字世界难以开展工作，但不会认为它完全无法进入。',
    [['play an integral role in', '在……中发挥不可或缺的作用'], ['accessibility', '可访问性'], ['ply one’s trade', '从事自己的工作']],
    'we', 'play', ['object', 'an integral role in identifying, preserving, and providing accessibility to digital artifacts'], '结果副词 + 主语 + 谓语 + 宾语 + so that 结果从句',
  ),

  'R5-01': f(
    '亲爱的李明：',
    [['Dear', '亲爱的；用于信件称呼']],
    'Dear Li Ming,',
    '书信称呼',
  ),
  'R5-02': s(
    '听说你要邀请一些年轻工匠到校园展示他们的创新手工艺，我真的非常兴奋。',
    [['craftsman', '工匠；手艺人'], ['demonstrate', '展示；演示'], ['craft-making', '手工艺制作']],
    'I', 'was really excited', ['object', 'to hear that you’d invite some young craftsmen'], '主语 + 系表结构 + 不定式原因',
  ),
  'R5-03': s(
    '我可以进一步了解他们将展示什么吗？',
    [['may I', '我可以……吗'], ['show', '展示']],
    'I', 'know', ['object', 'more about what they’ll show'], '情态动词疑问句 + 宾语从句',
  ),
  'R5-04': s(
    '另外，我愿意帮忙做准备工作。',
    [['also', '此外；另外'], ['preparation work', '准备工作'], ['would like to', '想要；愿意']],
    'I', 'like', ['object', 'to help with your preparation work'], '主语 + 情态表达 + 不定式宾语',
  ),
  'R5-05': f(
    '请告诉我我能做什么。',
    [['let someone know', '让某人知道；告知'], ['what I can do', '我能做什么']],
    'Please let me know what I can do.',
    '祈使句 + 宾语从句',
  ),
  'R5-06': f(
    '此致。',
    [['Yours', '书信结尾敬语']],
    'Yours,',
    '书信结尾',
  ),
  'R5-07': f(
    '保罗。',
    [['Paul', '人名：保罗']],
    'Paul',
    '署名',
  ),
} satisfies Record<string, CloseReading>;
