import type { CloseReading, InlineGlossary } from '../types/closeReading';
import type { ReadingQuestion } from '../types/readingQuestion';

type Role = 'subject' | 'predicate' | 'object' | 'complement' | 'adverbial';
type Highlight = { role: Role; text: string; label?: string };
type Word = readonly [term: string, explanation: string];

const h = (role: Role, text: string, label?: string): Highlight => ({ role, text, ...(label ? { label } : {}) });
const sub = (role: Role, text: string, label = '从句成分'): Highlight => h(role, text, label);

const note = (
  translation: string,
  trunk: readonly Highlight[],
  clauses: readonly Highlight[] = [],
  vocabulary: readonly Word[] = [],
  pattern = '主语 + 谓语 + 补充成分',
  explanation = '先确定主句的主语和谓语，再把宾语、补语或状语补回；标记为从句的成分可在第二种模式中展开阅读。',
): CloseReading => ({
  translation,
  vocabulary: vocabulary.map(([term, itemExplanation]) => ({ term, explanation: itemExplanation })),
  structure: { pattern, explanation },
  highlights: [...trunk, ...clauses],
  trunk: [...trunk],
});

const simple = (
  translation: string,
  subject: string,
  predicate: string,
  tail?: readonly [Role, string],
  vocabulary: readonly Word[] = [],
  pattern = '主语 + 谓语 + 补充成分',
): CloseReading => note(
  translation,
  [h('subject', subject), h('predicate', predicate), ...(tail ? [h(tail[0], tail[1])] : [])],
  [],
  vocabulary,
  pattern,
);

const questionNote = (
  translation: string,
  subject: string,
  predicate: string,
  tail: readonly [Role, string],
  vocabulary: readonly Word[] = [],
): CloseReading => simple(translation, subject, predicate, tail, vocabulary, '疑问词 / 主语 + 谓语 + 补充成分');

const clozeCloseReadings: Readonly<Record<string, CloseReading>> = {
  C01: note(
    '人们往往希望选择越多越好。',
    [h('subject', 'People'), h('predicate', 'tend to want'), h('object', 'as many choices as possible')],
    [],
    [['maximize', '最大化；使达到最大'], ['chance', '机会；可能性']],
    '主语 + 谓语 + 宾语',
  ),
  C02: note(
    '他们认为，这会最大限度地提高自己作出最佳决定的机会。',
    [h('subject', 'They'), h('predicate', 'believe')],
    [sub('object', 'this will maximize their chance of making the best decision', '宾语从句（整体）')],
    [['maximize', '最大化；使达到最大'], ['chance', '机会；可能性']],
    '主语 + 谓语 + 宾语从句（整体）',
  ),
  C03: note(
    '但研究表明，当真正要从所有这些选项中作出选择时，人们可能会变得困惑，甚至完全逃避作决定。',
    [h('subject', 'research'), h('predicate', 'shows')],
    [sub('object', 'that, when it comes to actually making a selection from all of these choices, people can become confused and avoid making a decision altogether', '宾语从句（整体）')],
    [['when it comes to', '当涉及；说到'], ['selection', '选择；挑选']],
    '主语 + 谓语 + 宾语从句（整体）',
  ),
  C04: note(
    '更糟的是，当人们最终作出决定时，他们通常对自己的决定不太满意，并且对所作出的选择感到更加后悔。',
    [h('adverbial', 'Even worse'), h('subject', 'they'), h('predicate', 'are generally less satisfied'), h('complement', 'with their decision')],
    [sub('adverbial', 'when people finally do decide', '时间状语从句'), sub('complement', 'and feel more regretful over whatever choice they made', '并列谓语补充')],
    [['regretful', '后悔的；遗憾的'], ['whatever', '无论什么；所……的任何']],
    '状语 + 主句 + 时间从句 + 并列谓语',
  ),
  C05: note(
    '为什么会发生这种情况？',
    [h('adverbial', 'Why'), h('predicate', 'happen')],
    [sub('subject', 'this', '指示代词主语')],
    [['happen', '发生']],
    '疑问副词 + 助动词 + 主语 + 谓语',
  ),
  C06: note(
    '研究表明，当人们从许多选项中进行选择时，他们在这项决定上投入更多，却对自己能否作出明智决定的能力缺乏信心。',
    [h('subject', 'Research'), h('predicate', 'shows')],
    [sub('object', 'that when people choose from many options, they invest more in the decision, but feel less confident in their ability to decide well', '宾语从句（整体）')],
    [['invest in', '投入于；在……上花费'], ['confident', '有信心的']],
    '主语 + 谓语 + 宾语从句（整体）',
  ),
  C07: note(
    '换句话说，当我们面对更多选择时，作出“正确”决定开始显得更加关键，同时也更加困难。',
    [h('adverbial', 'In other words'), h('subject', 'making the “right” or “correct” decision'), h('predicate', 'begins'), h('complement', 'to feel more crucial')],
    [sub('adverbial', 'when we are presented with more choices', '时间状语从句'), sub('complement', 'and, at the same time, more difficult to do', '并列表语')],
    [['be presented with', '面对；被呈现'], ['crucial', '关键的；至关重要的']],
    '状语从句 + 主语 + 谓语 + 表语 / 补语',
  ),
  C08: note(
    '这可能加剧我们作出错误决定的深层恐惧。',
    [h('subject', 'This'), h('predicate', 'may contribute to'), h('object', 'the deep fear')],
    [sub('object', 'that we will make the wrong decision', '同位语从句')],
    [['contribute to', '促成；导致'], ['deep fear', '深层恐惧']],
    '主语 + 情态动词谓语 + 宾语 + 同位语从句',
  ),
  C09: note(
    '我们怎样才能解决这个问题？',
    [h('adverbial', 'How'), h('subject', 'we'), h('predicate', 'solve'), h('object', 'this problem')],
    [],
    [['solve', '解决']],
    '疑问副词 + 主语 + 情态动词 + 谓语 + 宾语',
  ),
  C10: note(
    '我认为，把决定放在更大的背景中来衡量，可能有助于减轻这种恐惧。',
    [h('subject', 'I'), h('predicate', 'believe')],
    [sub('object', 'this fear could be tempered by putting decisions into perspective', '宾语从句（整体）')],
    [['temper', '缓和；减轻'], ['put ... into perspective', '把……放在恰当背景下看']],
    '主语 + 谓语 + 宾语从句（整体）',
  ),
  C11: note(
    '记住，你作出的许多选择，比如午餐吃什么，将来并不会产生多大影响；这可能会有所帮助。',
    [h('subject', 'It'), h('predicate', 'might help')],
    [sub('object', 'to remember that many of the choices you make, such as what to have for lunch, will not matter much in the future and that, even more important choices, like accepting a new job, can ultimately be changed', '不定式宾语')],
    [['matter', '要紧；产生影响'], ['ultimately', '最终；归根结底']],
    '主语 + 情态动词谓语 + 不定式宾语',
  ),
  C12: note(
    '它还可能有助于用明确的准则和关于你想从选项范围中得到什么的想法来处理这些情况，从而缩小可能的选择范围，也让你更有信心作出正确决定。',
    [h('subject', 'It'), h('predicate', 'could also help')],
    [sub('object', 'to enter these situations with clear guidelines and ideas of what you want from the range of options', '不定式宾语'), sub('complement', 'which can narrow the possible choices, and also make you more confident about your ability to make the right decision', '定语从句')],
    [['guideline', '准则；指导方针'], ['range', '范围；一系列']],
    '主语 + 情态动词谓语 + 不定式宾语 + 定语从句',
  ),
};

const matchingSentences = {
  A: [
    'Five years ago, the city of Queens, New York, announced that it would be putting bike lanes onto a stretch of Skillman Ave—and removing 116 parking spots.',
    'Cyclists loved the plan, but local business owners got very angry.',
    'Taking out those parking spots, as they argued at protests and in letters to the city council, would ruin stores and restaurants along Skillman.',
    '“Parking here is already a nightmare,” one shouted at a protest rally.',
  ],
  B: [
    'But the bike lanes were a done deal, and soon they were in place.',
    'Early this year Jesse Coburn—an investigative writer with Streetsblog New York—wondered whether those predictions of economic collapse came true.',
    'So he asked the city’s Department of Finance to give him a few years’ worth of sales figures for that stretch of Skillman Ave.',
    'How had the businesses on that street fared?',
  ],
  C: [
    'Quite well, it turns out.',
    'In the year after the bike lanes arrived, businesses on Skillman saw sales rise by 12 percent, compared to 3 percent for Queens in general.',
    'What’s more, that section of road saw new businesses open, while Queens overall had a net loss.',
  ],
  D: [
    'The thing is, the actual merchants along Skillman? They didn’t believe it.',
    'When Coburn spoke to them and described what he’d found, only a few store owners admitted the lanes had helped.',
    'Many still insisted the lanes were killing their part of the city.',
    'And emotions ran hot: Someone scattered tacks on the bike lane.',
  ],
  E: [
    'This little story turns out to be a fascinating glimpse at the challenges cities face as they try to update their urban infrastructure—to clean up the air, reduce greenhouse emissions, and speed up travel by making towns more bike-friendly.',
    'There’s a rising amount of data showing that installing bike lanes and making streets more pedestrian-friendly boosts the economic fortunes of a place.',
    'Removing cars and parking spots works.',
    'But the folks who run local businesses simply aren’t convinced, even when their own street performs.',
    'Given that sort of mess, can political fights over bike lanes ever end?',
  ],
  F: [
    'In 2013, researchers at New York City’s Department of Transportation studied seven stretches of road that had installed bike lanes or created pedestrian-friendly areas.',
    'The city analyzed the data for businesses along those routes and found that by the third year, sales grew faster on five of the streets than in the district overall, on average—up to five times faster, in fact.',
  ],
  G: [
    'Beyond New York, a survey of research from 23 cities found that bike lanes and pedestrian-friendly design didn’t hurt local retail and food stores.',
    '“Fears of disastrous consequences for local businesses are unfounded,” the researchers concluded.',
    'More recent work has shown roughly the same.',
  ],
  H: [
    'The truth is that in fairly dense areas, bikes are more efficient at moving people around.',
    'You might lose one car driver’s business—but you gain shoppers who now can arrive more easily on bikes.',
    '“Cyclists and pedestrians are consumers too,” notes Professor Susan Handy.',
    'Plus, streets redesigned for bikes and pedestrians tend to become more pleasant places to hang around, so “in a lot of cases, that’s created much nicer environments that are really good for those businesses.”',
  ],
  I: [
    'Mom-and-pop shops are usually pretty quick at recognizing situations that will help their bottom lines.',
    'So why the blind spot here?',
    'Perhaps it’s that attention focuses on horror stories—and some merchants do get hit when bike lanes come in.',
  ],
  J: [
    'I spoke to Cindy Hughes, a hairdresser in Cambridge, Massachusetts.',
    'She said business fell by at least 40 percent when the city removed nearby parking to put in a bike lane.',
    'The majority of her customers drive, with many coming from nearby towns.',
    'Only a very few have shifted to cycling, and even those almost certainly won’t cycle in Boston’s snowy winters.',
    'So while Hughes supports bike lanes—“cyclists deserve to be safe”—she sees the parking loss as an existential risk.',
    '“Look, 90 percent of my customers drive,” she told me.',
    '“For our business, the bike lanes are way worse than Covid was.”',
  ],
  K: [
    'For others, the pushback is cultural, says Henry Grabar, a writer for Slate Magazine.',
    'Small business owners are frequently drivers who commute from other parts of the city by car, Grabar points out.',
    'They’re also often longtime locals.',
    '“They tend to be people with deep roots in the city, who have hung around since before the neighborhood became what it is today,” he adds.',
    'Driving around town in a car is so normal to them that cycling seems weird and unusual—despite its boost from Covid, when bike sales exploded by 75 percent.',
  ],
  L: [
    'Psychology beats all!',
    'Who knew, right?',
    'The fierce divide between store owners and bike-lane advocates seems similar to our larger culture wars over climate change.',
    'If we’ve learned anything from culture wars, it’s that data isn’t much good at changing minds.',
  ],
  M: [
    'When Janette Sadik-Khan was the head of New York City’s Transportation Department back in the early 2000s, she oversaw a rollout of bike lanes—and got angry blowback from residents and business owners who claimed there weren’t enough cyclists to justify installing lanes.',
    'Now, she notes ironically, the lanes are so full of activity that opponents have turned to claiming the problem is the opposite: There are too many cyclists getting in the way of cars.',
  ],
  N: [
    'Maybe bike lanes will always be charged with emotion, until enough of the public is finally concerned about climate change—and it seems reckless to not have them.',
  ],
  O: [
    'Crises, after all, have a way of opening people’s eyes to possibilities.',
    'During Covid, restaurants and cafés lost so much business that cities nationwide began allowing them to build curbside seating areas where people could sit safely in the open air.',
    'It greatly reduced parking—but because, well, shop owners didn’t see any way around it.',
    'Customers loved the outdoor seating so much that cities are making it permanent: A New York City study of several streets closed during Covid found storeowners making more than before, and diners enjoying the outdoor lifestyle.',
    'If data won’t change minds, customers might.',
  ],
} as const;

const matching = Object.entries(matchingSentences).map(([label, sentences]) => ({
  label,
  sentences: [...sentences],
}));

const passageOneSentences = [
  'All living organisms on Earth are exposed to a 24-hour day-night cycle.',
  'This cycle is the reason why people rest at night and are active during the day.',
  'Consequently, all human body functions also follow this daily rhythm, and the timing of behaviors like exercise or food intake can significantly influence your health.',
  'For example, eating at night can lead to weight gain over time because food intake at night leads to increased fat storage.',
  'Many drug targets in the body follow a 24-hour cycle, too.',
  'This means that the specific proteins a drug is designed to modify can react differently to the medicine over the course of a 24-hour time period.',
  'Because how the body responds to a drug can differ depending on the time it is taken, it logically follows that taking medicines at specific times could help increase their effectiveness and reduce unwanted side effects.',
  'When doctors prescribe medicine for people, they rarely consider the best time to take it.',
  'There are two main reasons for that oversight.',
  'First, many physicians are not aware that some drugs work better during a specific time of the day.',
  'And second, most drugs have not been studied for possible different effects during a 24-hour cycle.',
  'Therefore, patients are directed to take most drugs during the morning or evening primarily to ensure compliance.',
  'Over 50 years ago, researchers found that the cholesterol drug simvastatin is more effective at lowering cholesterol levels when taken at night rather than during the day.',
  'This is because the liver enzyme these drugs target is more active at night.',
  'Taking medicine at the wrong time can even cause harm.',
  'My colleagues and I wondered whether midazolam, the most common sedative used in surgical procedures worldwide, might interfere with the internal clock that protects the heart at night.',
  'Currently, there are no guidelines regarding when midazolam should be administered.',
  'More research is needed to determine the best times to administer treatments for different diseases.',
  'I believe taking drug timing into account could help make treatments more effective and help more people worldwide.',
] as const;

const passageTwoSentences = [
  'Katharine Abraham, an economics professor, was chatting with her hairdresser about retirement plans.',
  'The economist said she plans to continue working because she wants to.',
  'The hairdresser agreed but for a different reason: She needs the money.',
  'Both scenarios are contributing to a big increase in the number of people in the US working into their 70s.',
  'Over the past 20 years, the share of Americans working in their 70s has risen from less than 10% to nearly 15%.',
  'In addition to people being healthier and living much longer, economists say that a combination of financial considerations such as years of slow rise in real wages and a shift away from traditional pensions in the private sector are some of the reasons people delay retirement.',
  'The decline of manufacturing and the increase in the number of people working in less labor-intensive occupations also has contributed to the trend, says Abraham, who researches work and retirement decisions of older Americans.',
  '“Which matters more depends on what your history up until that point has been in the type of work you’re doing,” Abraham says.',
  'The overall trend is hitting Americans of all different levels of educational attainment, although the percentages vary by category.',
  'The share of Americans with bachelor’s degrees who were working into their 70s reached nearly 20% in 2018.',
  'For those with a high school degree or less, the proportion of those working in their 70s had risen to around 10%, while those with some college education were in the middle at around 15%.',
  'Martin Neil Baily, an economist who is leading a research project on retirement security, notes that quitting a career can lead to feelings of isolation and loneliness, particularly for men.',
  'He suggests that many college-educated workers are choosing to stay in the labor force more for social benefits than for financial reasons.',
  'They’re also more likely to be in professional occupations where they tend to enjoy their work more.',
  'Workers in more physical jobs, meanwhile, may be more likely to look forward to retiring, Baily says, suggesting those who stay on are more likely doing so for financial reasons.',
] as const;

const passageOne: { title: string; sentences: readonly string[]; questions?: readonly ReadingQuestion[] } = {
  title: 'Passage One · Does the timing of medicine matter?',
  sentences: [...passageOneSentences],
};

const passageTwo: { title: string; sentences: readonly string[]; questions?: readonly ReadingQuestion[] } = {
  title: 'Passage Two · Why are more Americans working into their 70s?',
  sentences: [...passageTwoSentences],
};

const readingQuestion = (
  number: number,
  prompt: string,
  answer: 'A' | 'B' | 'C' | 'D',
  evidence: string,
  analysis: string,
  optionItems: readonly [key: 'A' | 'B' | 'C' | 'D', text: string, explanation: string][],
  closeReading: CloseReading,
): ReadingQuestion => ({
  number,
  prompt,
  answer,
  evidence,
  analysis,
  closeReading,
  options: optionItems.map(([key, text, explanation]) => ({ key, text, explanation })),
});

passageOne.questions = [
  readingQuestion(
    46,
    'What do we learn from the passage about the timing of our behaviors?',
    'A',
    'the timing of behaviors like exercise or food intake can significantly influence your health.',
    '文章指出运动或进食的时间会显著影响健康，并用夜间进食导致脂肪储存增加举例。',
    [
      ['A', 'It has a considerable impact on our health.', '正确；significantly influence your health 说明行为时间对健康有很大影响。'],
      ['B', 'It confines us to a 24-hour day-night cycle.', '错误；24 小时昼夜周期是背景，不是行为时间对人的限制。'],
      ['C', 'It requires us to follow a particular rhythm.', '错误；文章说身体功能遵循节律，但没有说行为时间要求人必须遵循某种节奏。'],
      ['D', 'It holds the key to all human body functions.', '错误；文章只说时间会影响功能，并未说它决定所有身体功能。'],
    ],
    questionNote('行为时间会对健康产生什么影响？', 'we', 'learn', ['complement', 'about the timing of our behaviors'], [['timing', '时间；时机']]),
  ),
  readingQuestion(
    47,
    'What does the author say about the proteins in our body?',
    'C',
    'the specific proteins a drug is designed to modify can react differently to the medicine over the course of a 24-hour time period.',
    '药物针对的特定蛋白质在 24 小时周期的不同时间可能对药物产生不同反应，C 准确概括了这一变化。',
    [
      ['A', 'They can modify the effects of medicines in different ways.', '错误；药物被设计来修饰蛋白质，不是蛋白质主动修饰药物效果。'],
      ['B', 'They can reduce unwanted side effects of certain medicines.', '错误；减少副作用是选择合适服药时间可能带来的结果，不是蛋白质本身的作用。'],
      ['C', 'Their reaction to medicines changes during the day-night cycle.', '正确；react differently over the course of a 24-hour period 与选项同义。'],
      ['D', 'Their design determines how differently they react to medicines.', '错误；drug is designed to modify proteins，题目偷换了 design 的主体。'],
    ],
    questionNote('作者认为人体内的蛋白质有什么特点？', 'the author', 'say', ['complement', 'about the proteins in our body'], [['protein', '蛋白质']]),
  ),
  readingQuestion(
    48,
    'What do doctors do when prescribing medicine for people?',
    'A',
    'When doctors prescribe medicine for people, they rarely consider the best time to take it.',
    '医生开药时很少考虑最佳服用时间，A 直接改写了 rarely consider the best time。',
    [
      ['A', 'They give little thought to the time of taking it for maximum effect.', '正确；give little thought 与 rarely consider 对应，maximum effect 对应 best time。'],
      ['B', 'They rarely consider which medicine works better for which patient.', '错误；文章讨论服药时间，不是为不同患者选择药物。'],
      ['C', 'They tell patients its possible side effects during a period of 24 hours.', '错误；文章没有说医生会说明 24 小时内的副作用。'],
      ['D', 'They tell patients to comply with the directions of drug manufacturers.', '错误；ensure compliance 指确保患者按时服药，不是遵守药厂说明。'],
    ],
    questionNote('医生给人开药时会怎样做？', 'doctors', 'do', ['adverbial', 'when prescribing medicine for people'], [['prescribe', '开（药方）'], ['oversight', '疏忽；遗漏']]),
  ),
  readingQuestion(
    49,
    'Why do doctors advise patients to take most drugs in the morning or in the evening?',
    'B',
    'patients are directed to take most drugs during the morning or evening primarily to ensure compliance.',
    '医生把服药时间安排在早上或晚上，主要是为了让患者容易遵守服药安排，而不是保证药效最大。',
    [
      ['A', 'To discourage them from making complaints.', '错误；原文没有提到投诉。'],
      ['B', 'To ensure they take the drugs as instructed.', '正确；ensure compliance 即确保患者按要求服药。'],
      ['C', 'To comply with new research findings strictly.', '错误；相反，许多药物尚未充分研究不同时间的效果。'],
      ['D', 'To guarantee the maximum effect of the drugs.', '错误；文章说医生很少考虑发挥最大效果的最佳时间。'],
    ],
    questionNote('医生为什么把多数药物安排在早上或晚上服用？', 'doctors', 'advise', ['object', 'patients to take most drugs in the morning or in the evening'], [['compliance', '遵从；依从']]),
  ),
  readingQuestion(
    50,
    'What does the author suggest near the end of the passage?',
    'C',
    'More research is needed to determine the best times to administer treatments for different diseases.',
    '作者在结尾明确提出需要更多研究，以确定治疗不同疾病的最佳用药时间。',
    [
      ['A', 'Considering drug-taking timing when prescribing drugs for patients.', '错误；这是全文主张的方向，但结尾更具体的建议是开展更多研究。'],
      ['B', 'Making treatments less complex by taking drug timing into account.', '错误；文章没有说考虑时间会使治疗变简单。'],
      ['C', 'Conducting more studies to find out the best timing for treating different diseases.', '正确；几乎逐字对应 More research is needed...。'],
      ['D', 'Finding out the most effective drugs for treating diseases through further research.', '错误；研究目标是最佳时间，不是寻找最有效的药物。'],
    ],
    questionNote('作者在文章结尾提出了什么建议？', 'the author', 'suggest', ['complement', 'near the end of the passage'], [['administer', '施用；给予（药物或治疗）']]),
  ),
] satisfies readonly ReadingQuestion[];

passageTwo.questions = [
  readingQuestion(
    51,
    'What do we learn from the passage about the economics professor and her hairdresser?',
    'A',
    'The economist said she plans to continue working because she wants to. The hairdresser agreed but for a different reason: She needs the money.',
    '经济学教授因为想继续工作而工作，理发师则因为需要钱而工作，二人的原因不同。',
    [
      ['A', 'They differ in their reasons for continuing to work.', '正确；because she wants to 与 she needs the money 形成直接对比。'],
      ['B', 'They are both committed to working into their 70s.', '错误；文中只说明她们继续工作的不同原因，没有说两人都会工作到 70 多岁。'],
      ['C', 'They are happy about their current financial situation.', '错误；理发师需要钱，不能推出她对财务状况满意。'],
      ['D', 'They hold different views about postponing retirement.', '错误；文章展示的是工作动机不同，不是对延迟退休的观点不同。'],
    ],
    questionNote('经济学教授和她的理发师有什么不同？', 'we', 'learn', ['complement', 'about the economics professor and her hairdresser'], [['differ in', '在……方面不同']]),
  ),
  readingQuestion(
    52,
    'What is one of the reasons for people to delay retirement?',
    'C',
    'a combination of financial considerations such as years of slow rise in real wages and a shift away from traditional pensions in the private sector',
    '文中列举的经济原因包括实际工资多年增长缓慢，以及私人部门逐渐脱离传统养老金制度；C 对应前者。',
    [
      ['A', 'More and more people have switched to less intellectually challenging jobs.', '错误；文章说 less labor-intensive occupations，不是智力挑战更低。'],
      ['B', 'The number of jobs suitable for older people has increased in the private sector.', '错误；原文说养老金制度发生变化，没有说适合老人的职位增加。'],
      ['C', 'The rate of wage increase in terms of purchasing power has slowed down for years.', '正确；slow rise in real wages 即考虑购买力后的工资增长缓慢。'],
      ['D', 'More and more people in the workplace find it hard to rely on traditional pensions.', '错误；traditional pensions 的变化是私人部门结构性转变，不是文中对更多人的主观感受描述。'],
    ],
    questionNote('人们延迟退休的一个原因是什么？', 'one of the reasons', 'is', ['complement', 'for people to delay retirement'], [['real wages', '实际工资'], ['traditional pension', '传统养老金']]),
  ),
  readingQuestion(
    53,
    'What is the general trend in people delaying retirement?',
    'D',
    'The share of Americans with bachelor’s degrees who were working into their 70s reached nearly 20% in 2018.',
    '数据表明教育程度越高，工作到 70 多岁的人所占比例越高：本科近 20%，高中及以下约 10%，有大学经历者约 15%。',
    [
      ['A', 'The higher their earnings, the more likely they are tempted to delay retirement.', '错误；文章没有按收入高低给出这种普遍趋势。'],
      ['B', 'Those who have more job satisfaction tend to retire later than those who have less.', '错误；工作满意度只用于解释部分受过大学教育者，不是总体数据趋势。'],
      ['C', 'More men than women are likely to stay in the labor force until their late seventies.', '错误；文中没有提供男女比例比较。'],
      ['D', 'The higher their educational level, the more likely they are to delay retirement.', '正确；三个教育类别的比例随教育程度提高而上升。'],
    ],
    questionNote('人们延迟退休呈现什么总体趋势？', 'the general trend', 'is', ['complement', 'in people delaying retirement'], [['educational attainment', '受教育程度']]),
  ),
  readingQuestion(
    54,
    'What is the chief reason for college-educated workers delaying retirement according to an economist?',
    'B',
    'many college-educated workers are choosing to stay in the labor force more for social benefits than for financial reasons.',
    'Baily 认为，许多受过大学教育的劳动者延迟退休主要是为了社会交往等社会收益，而不是经济收益。',
    [
      ['A', 'Enjoying financial security.', '错误；原文明确说 social benefits มากกว่า financial reasons。'],
      ['B', 'Staying connected socially.', '正确；social benefits 与保持社会联系相符。'],
      ['C', 'Contributing more professionally.', '错误；文章说他们更可能从事喜欢的专业工作，但不是题目问的首要原因。'],
      ['D', 'Increasing social security payments.', '错误；文中没有提到提高社会保障金。'],
    ],
    questionNote('经济学家认为大学学历劳动者延迟退休的主要原因是什么？', 'the chief reason', 'is', ['complement', 'for college-educated workers delaying retirement according to an economist'], [['social benefits', '社会收益；社会交往带来的益处']]),
  ),
  readingQuestion(
    55,
    'What does the passage say about people doing manual work?',
    'D',
    'Workers in more physical jobs, meanwhile, may be more likely to look forward to retiring, Baily says, suggesting those who stay on are more likely doing so for financial reasons.',
    '从事体力工作的人更可能期待退休；留下来继续工作的人则更可能是出于经济原因。',
    [
      ['A', 'They are eager to enjoy life after retiring.', '错误；文章只说他们期待退休，没有具体说退休后享受生活。'],
      ['B', 'They are likely to have financial troubles.', '错误；文中没有直接说所有体力劳动者会有财务困难。'],
      ['C', 'They generally don’t enjoy doing it.', '错误；原文没有作出“通常不喜欢体力工作”的概括。'],
      ['D', 'They tend to anticipate retirement.', '正确；look forward to retiring 即期待退休。'],
    ],
    questionNote('文章如何描述从事体力工作的人？', 'the passage', 'say', ['complement', 'about people doing manual work'], [['look forward to', '期待；盼望']]),
  ),
] satisfies readonly ReadingQuestion[];

const matchingCloseReadings: Record<string, CloseReading> = {};
const matchingTranslations: Record<string, string> = {
  'A01': '五年前，纽约州皇后区宣布要在 Skillman 大道的一段路上设置自行车道，并取消 116 个停车位。',
  'A02': '骑车者喜欢这个计划，但当地企业主非常生气。',
  'A03': '正如他们在抗议活动和给市议会的信中所说，取消这些停车位会毁掉 Skillman 沿线的商店和餐馆。',
  'A04': '一名抗议者在集会上喊道：“这里停车已经是一场噩梦了。”',
  'B01': '但自行车道已经板上钉钉，很快就建成了。',
  'B02': '今年年初，《纽约街头博客》的调查记者 Jesse Coburn 想知道那些经济崩溃的预测是否成真。',
  'B03': '于是他请纽约市财政部门提供 Skillman 大道这一路段几年的销售数据。',
  'B04': '这条街上的商家经营得怎么样？',
  'C01': '结果相当不错。',
  'C02': '自行车道建成后的那一年，Skillman 的商家销售额增长了 12%，而皇后区整体增长了 3%。',
  'C03': '更重要的是，这一路段开出了新商店，而皇后区整体的商家数量却出现净减少。',
  'D01': '问题在于，Skillman 沿线真正的商家并不相信这个结果。',
  'D02': 'Coburn 找他们谈话并说明调查结果时，只有少数店主承认自行车道带来了帮助。',
  'D03': '许多人仍坚持认为自行车道正在毁掉他们所在的城区。',
  'D04': '情绪变得很激烈：有人把大头钉撒在了自行车道上。',
  'E01': '这个小故事生动展现了城市更新基础设施时面临的挑战，包括清洁空气、减少温室气体排放，以及通过建设自行车友好型城镇来加快出行。',
  'E02': '越来越多的数据表明，安装自行车道、让街道更方便步行，会提升一个地方的经济状况。',
  'E03': '减少汽车和停车位确实有效。',
  'E04': '但经营当地企业的人即使看到自己的街道表现良好，也仍然不相信这一点。',
  'E05': '面对这样的混乱，围绕自行车道的政治争论究竟能否结束？',
  'F01': '2013 年，纽约市交通局的研究人员调查了七段设有自行车道或建成步行友好区域的道路。',
  'F02': '市政府分析了这些路线沿线商家的数据，发现到第三年，其中五条街的销售额平均增长得比所在地区更快，事实上最高快了五倍。',
  'G01': '纽约之外，一项汇总 23 个城市研究的调查发现，自行车道和步行友好设计并没有损害当地零售店和餐馆。',
  'G02': '研究人员总结说：“关于当地企业会遭遇灾难性后果的担忧是没有根据的。”',
  'G03': '较新的研究也大致得出了相同结论。',
  'H01': '事实是，在相当密集的地区，自行车运送人们移动的效率更高。',
  'H02': '你可能会失去一名开车者的生意，但会获得那些现在可以更容易骑车到达的购物者。',
  'H03': 'Susan Handy 教授指出：“骑车者和行人也是消费者。”',
  'H04': '此外，为自行车和行人重新设计的街道往往会变成更适合逗留的地方，因此在很多情况下会形成对企业非常有利的、更舒适的环境。',
  'I01': '夫妻店通常很快就能发现有助于改善利润的情况。',
  'I02': '那么，这里的盲点是为什么？',
  'I03': '也许是因为人们的注意力集中在可怕的故事上，而有些商家确实会在自行车道建成时受到冲击。',
  'J01': '我采访了马萨诸塞州剑桥市的理发师 Cindy Hughes。',
  'J02': '她说，市政府取消附近停车位修建自行车道后，生意至少下降了 40%。',
  'J03': '她的大多数顾客开车，其中很多来自附近城镇。',
  'J04': '只有极少数顾客改骑自行车，而且即使是这些人，也几乎肯定不会在波士顿下雪的冬天骑车。',
  'J05': '因此，虽然 Hughes 支持自行车道——“骑车者应该安全”——她却认为失去停车位会带来生存危机。',
  'J06': '她对我说：“听着，我 90% 的顾客都开车。”',
  'J07': '“对我们的生意来说，自行车道比新冠疫情糟糕得多。”',
  'K01': 'Henry Grabar 是《Slate》杂志的作者，他说，对另一些人来说，反对自行车道带有文化因素。',
  'K02': 'Grabar 指出，小企业主经常是开车上下班的人，他们从城市其他地方驾车而来。',
  'K03': '他们也常常是长期居住在当地的人。',
  'K04': '他补充说：“他们往往在这座城市有深厚根基，在社区变成今天的样子以前就一直生活在那里。”',
  'K05': '对他们而言，开车在城里四处走很正常，所以骑车显得奇怪而不寻常——尽管新冠疫情带来了推动，令自行车销量上涨了 75%。',
  'L01': '心理因素胜过一切！',
  'L02': '谁能想到呢？',
  'L03': '商店老板与自行车道支持者之间的激烈分歧，似乎类似于围绕气候变化的更大文化战争。',
  'L04': '如果说文化战争教会了我们什么，那就是数据并不太能改变人们的想法。',
  'M01': '21 世纪初，Janette Sadik-Khan 担任纽约市交通局局长时，负责推行自行车道，却遭到居民和企业主的强烈反弹；他们声称骑车者不够多，不足以证明修建自行车道是合理的。',
  'M02': '如今，她讽刺地指出，自行车道已经如此热闹，反对者转而声称问题恰恰相反：骑车者太多，挡住了汽车。',
  'N01': '也许自行车道总会带有情绪色彩，直到公众中有足够多人真正关注气候变化；而不设置自行车道似乎是鲁莽的。',
  'O01': '毕竟，危机会让人们看到各种可能性。',
  'O02': '新冠疫情期间，餐馆和咖啡馆损失了大量生意，于是全国各地的城市开始允许它们建造路边座位区，让人们能够安全地在户外坐下。',
  'O03': '这大幅减少了停车位——但因为，嗯，店主们看不到其他办法。',
  'O04': '顾客非常喜欢户外座位，以至于城市正在让它永久化：纽约市对几条疫情期间封闭的街道进行的研究发现，店主赚得比以前更多，食客也享受户外生活方式。',
  'O05': '如果数据不能改变想法，顾客也许可以。',
};

Object.entries(matchingSentences).forEach(([label, sentences]) => {
  sentences.forEach((sentence, index) => {
    const key = `M-${label}${String(index + 1).padStart(2, '0')}`;
    const compactLabel = `${label}${String(index + 1).padStart(2, '0')}`;
    const words = sentence.match(/[A-Za-z]+(?:['’][A-Za-z]+)?/g) ?? [];
    const subject = words[0] ?? 'This';
    const predicate = words[1] ?? 'is';
    matchingCloseReadings[key] = simple(
      matchingTranslations[compactLabel] ?? sentence,
      subject,
      predicate,
      undefined,
      [],
      '主语 + 谓语 + 补充信息',
    );
  });
});

const passageCloseReadings: Record<string, CloseReading> = {
  'R1-01': simple('地球上的所有生物都暴露在 24 小时的昼夜循环中。', 'All living organisms on Earth', 'are exposed', ['complement', 'to a 24-hour day-night cycle'], [['be exposed to', '暴露于；处于……影响下']], '主语 + 被动谓语 + 补语'),
  'R1-02': note('这种循环是人们晚上休息、白天活动的原因。', [h('subject', 'This cycle'), h('is', 'is'), h('complement', 'the reason')], [sub('object', 'why people rest at night and are active during the day', '原因从句')], [['day-night cycle', '昼夜循环']], '主语 + 系动词 + 表语 + 原因从句'),
  'R1-03': note('因此，人体的所有功能也都遵循这一日常节律，而锻炼或进食等行为的时间会显著影响健康。', [h('adverbial', 'Consequently'), h('subject', 'all human body functions'), h('predicate', 'follow'), h('object', 'this daily rhythm')], [sub('subject', 'the timing of behaviors like exercise or food intake', '并列分句主语'), sub('predicate', 'can significantly influence'), sub('object', 'your health', '并列分句宾语')], [['consequently', '因此；所以'], ['daily rhythm', '日常节律']], '连接副词 + 并列主句'),
  'R1-04': note('例如，夜间进食会随着时间推移导致体重增加，因为夜间进食会增加脂肪储存。', [h('adverbial', 'For example'), h('subject', 'eating at night'), h('predicate', 'can lead'), h('complement', 'to weight gain over time')], [sub('adverbial', 'because food intake at night leads to increased fat storage', '原因状语从句')], [['lead to', '导致'], ['fat storage', '脂肪储存']], '状语 + 主句 + 原因从句'),
  'R1-05': simple('人体中的许多药物靶点也遵循 24 小时循环。', 'Many drug targets in the body', 'follow', ['object', 'a 24-hour cycle'], [['drug target', '药物靶点']], '主语 + 谓语 + 宾语'),
  'R1-06': note('这意味着，药物被设计用来改变的特定蛋白质，在 24 小时内可能会以不同方式对药物产生反应。', [h('subject', 'This'), h('predicate', 'means')], [sub('object', 'that the specific proteins a drug is designed to modify can react differently to the medicine over the course of a 24-hour time period', '宾语从句（整体）')], [['modify', '改变；修饰'], ['over the course of', '在……期间']], '主语 + 谓语 + 宾语从句（整体）'),
  'R1-07': note('由于身体对药物的反应会因服用时间不同而不同，因此合理的推论是，在特定时间服药可能有助于提高疗效并减少不必要的副作用。', [h('adverbial', 'it logically follows'), h('subject', 'that taking medicines at specific times'), h('predicate', 'could help'), h('object', 'increase their effectiveness and reduce unwanted side effects')], [sub('adverbial', 'Because how the body responds to a drug can differ depending on the time it is taken', '原因状语从句')], [['effectiveness', '有效性；疗效'], ['side effect', '副作用']], '原因状语从句 + 主句'),
  'R1-08': note('医生给人开药时，很少考虑服药的最佳时间。', [h('subject', 'they'), h('predicate', 'rarely consider'), h('object', 'the best time to take it')], [sub('adverbial', 'When doctors prescribe medicine for people', '时间状语从句')], [['prescribe', '开（药）'], ['rarely', '很少；不常']], '时间状语从句 + 主句'),
  'R1-09': simple('这种疏忽有两个主要原因。', 'There', 'are', ['complement', 'two main reasons for that oversight'], [['oversight', '疏忽；遗漏']], 'There be 句型'),
  'R1-10': simple('第一，许多医生没有意识到，一些药物在一天中的特定时间效果更好。', 'many physicians', 'are not aware', ['complement', 'that some drugs work better during a specific time of the day'], [['be aware of', '意识到；知道']], '主语 + 系动词短语 + 宾语从句'),
  'R1-11': note('第二，大多数药物尚未被研究是否在 24 小时周期的不同时段产生不同效果。', [h('adverbial', 'And second'), h('subject', 'most drugs'), h('predicate', 'have not been studied')], [sub('complement', 'for possible different effects during a 24-hour cycle', '研究范围补充')], [['possible effect', '可能的效果']], '连接语 + 主语 + 被动完成时'),
  'R1-12': simple('因此，为了确保依从性，患者通常被要求在早上或晚上服用大多数药物。', 'patients', 'are directed', ['complement', 'to take most drugs during the morning or evening'], [['compliance', '遵从；依从']], '主语 + 被动谓语 + 不定式补语'),
  'R1-13': note('五十多年前，研究人员发现，降胆固醇药物辛伐他汀在夜间服用比白天服用更能有效降低胆固醇水平。', [h('adverbial', 'Over 50 years ago'), h('subject', 'researchers'), h('predicate', 'found')], [sub('object', 'that the cholesterol drug simvastatin is more effective at lowering cholesterol levels when taken at night rather than during the day', '宾语从句（整体）')], [['cholesterol', '胆固醇'], ['effective', '有效的']], '时间状语 + 主句 + 宾语从句'),
  'R1-14': note('这是因为这些药物所针对的肝酶在夜间更加活跃。', [h('subject', 'This'), h('predicate', 'is')], [sub('complement', 'because the liver enzyme these drugs target is more active at night', '原因表语从句')], [['liver enzyme', '肝酶'], ['target', '目标；靶向']], '主语 + 系动词 + 原因表语从句'),
  'R1-15': simple('在错误的时间服药甚至可能造成伤害。', 'Taking medicine at the wrong time', 'can', ['object', 'cause harm'], [['at the wrong time', '在错误的时间']], '动名词短语主语 + 情态动词谓语 + 宾语'),
  'R1-16': note('我和同事想知道，咪达唑仑这种全球外科手术中最常用的镇静剂，是否可能干扰夜间保护心脏的内部时钟。', [h('subject', 'My colleagues and I'), h('predicate', 'wondered')], [sub('object', 'whether midazolam', '宾语从句·主语'), sub('predicate', 'might interfere', '宾语从句·谓语'), sub('complement', 'with the internal clock that protects the heart at night', '宾语从句·补充')], [['sedative', '镇静剂'], ['interfere with', '干扰']], '主语 + 谓语 + whether 宾语从句'),
  'R1-17': simple('目前，没有关于应该何时使用咪达唑仑的指南。', 'there', 'are', ['complement', 'no guidelines regarding when midazolam should be administered'], [['administer', '施用；给予']], 'There be 句型 + 后置修饰'),
  'R1-18': simple('还需要更多研究来确定治疗不同疾病的最佳时间。', 'More research', 'is needed', ['complement', 'to determine the best times to administer treatments for different diseases'], [['determine', '确定']], '主语 + 被动谓语 + 不定式目的补语'),
  'R1-19': note('我认为，把服药时间考虑在内，可能会使治疗更有效，并帮助全世界更多的人。', [h('subject', 'I'), h('predicate', 'believe')], [sub('object', 'taking drug timing into account could help make treatments more effective and help more people worldwide', '宾语从句（整体）')], [['take ... into account', '把……考虑在内']], '主语 + 谓语 + 宾语从句（整体）'),
  'R2-01': simple('经济学教授 Katharine Abraham 正在和她的理发师聊退休计划。', 'Katharine Abraham', 'was chatting', ['complement', 'with her hairdresser about retirement plans'], [['retirement plan', '退休计划']], '主语 + 过去进行时 + 介词短语'),
  'R2-02': note('这位经济学家说，她计划继续工作，因为她自己想工作。', [h('subject', 'The economist'), h('predicate', 'said')], [sub('object', 'she plans to continue working because she wants to', '宾语从句（整体）')], [['continue', '继续']], '主语 + 谓语 + 宾语从句'),
  'R2-03': note('理发师表示同意，但理由不同：她需要这笔钱。', [h('subject', 'The hairdresser'), h('predicate', 'agreed')], [sub('complement', 'but for a different reason: She needs the money', '转折补充')], [['for a different reason', '出于不同原因']], '主句 + 转折补充'),
  'R2-04': simple('这两种情况共同导致美国工作到 70 多岁的人数大幅增加。', 'Both scenarios', 'are contributing to', ['object', 'a big increase in the number of people in the US working into their 70s'], [['contribute to', '促成；导致']], '主语 + 谓语 + 宾语'),
  'R2-05': simple('过去 20 年间，美国工作到 70 多岁的人所占比例从不到 10% 上升到接近 15%。', 'the share of Americans working in their 70s', 'has risen', ['complement', 'from less than 10% to nearly 15%'], [['share', '份额；比例']], '主语 + 现在完成时 + 数量变化'),
  'R2-06': note('经济学家说，除了人们更健康、寿命更长之外，实际工资多年增长缓慢以及私人部门逐渐远离传统养老金等经济因素，也是人们推迟退休的原因。', [h('subject', 'economists'), h('predicate', 'say')], [sub('object', 'that a combination of financial considerations such as years of slow rise in real wages and a shift away from traditional pensions in the private sector are some of the reasons people delay retirement', '宾语从句（整体）')], [['financial consideration', '经济因素'], ['delay retirement', '推迟退休']], '主语 + 谓语 + 宾语从句'),
  'R2-07': note('Abraham 说，制造业衰退以及从事劳动强度较低职业的人数增加，也促成了这一趋势；她研究老年人的工作和退休决定。', [h('subject', 'The decline of manufacturing and the increase in the number of people working in less labor-intensive occupations'), h('predicate', 'has contributed'), h('object', 'to the trend')], [sub('complement', 'who researches work and retirement decisions of older Americans', '定语从句')], [['labor-intensive', '劳动密集型的']], '并列主语 + 谓语 + 定语从句'),
  'R2-08': note('Abraham 说：“哪一个因素更重要，取决于到那时为止你从事的工作经历。”', [h('subject', 'Which'), h('predicate', 'matters more'), h('complement', 'depends')], [sub('object', 'on what your history up until that point has been in the type of work you’re doing', '宾语从句')], [['depend on', '取决于']], '主语从句 + 谓语 + 介词 + 宾语从句'),
  'R2-09': note('总体趋势影响着不同教育程度的美国人，尽管各类别的比例有所不同。', [h('subject', 'The overall trend'), h('predicate', 'is hitting'), h('object', 'Americans of all different levels of educational attainment')], [sub('adverbial', 'although the percentages vary by category', '让步状语从句')], [['attainment', '获得；成就（此处指教育程度）']], '主句 + 让步状语从句'),
  'R2-10': simple('2018 年，拥有学士学位、工作到 70 多岁的美国人比例接近 20%。', 'The share of Americans with bachelor’s degrees', 'reached', ['object', 'nearly 20%'], [['bachelor’s degree', '学士学位']], '主语 + 谓语 + 宾语'),
  'R2-11': note('高中学历或以下的人中，工作到 70 多岁的比例上升到约 10%；有过大学教育的人则处于中间水平，约为 15%。', [h('subject', 'the proportion of those working in their 70s'), h('predicate', 'had risen'), h('complement', 'to around 10%')], [sub('adverbial', 'while those with some college education were in the middle at around 15%', '对比状语从句')], [['proportion', '比例']], '主句 + while 对比从句'),
  'R2-12': note('经济学家 Martin Neil Baily 正在领导一个关于退休保障的研究项目；他指出，结束职业生涯会带来孤立和孤独感，尤其对男性而言。', [h('subject', 'Martin Neil Baily'), h('predicate', 'notes')], [sub('object', 'that quitting a career can lead to feelings of isolation and loneliness, particularly for men', '宾语从句')], [['isolation', '孤立；孤独']], '主语 + 谓语 + 宾语从句'),
  'R2-13': note('他认为，许多受过大学教育的劳动者选择留在劳动力市场，更多是为了社会收益，而非经济原因。', [h('subject', 'He'), h('predicate', 'suggests')], [sub('object', 'that many college-educated workers are choosing to stay in the labor force more for social benefits than for financial reasons', '宾语从句')], [['labor force', '劳动力；劳动人口'], ['social benefit', '社会收益']], '主语 + 谓语 + 宾语从句'),
  'R2-14': note('他们也更可能从事专业职业，在这些职业中，他们往往更喜欢自己的工作。', [h('subject', 'They’re'), h('predicate', 'more likely'), h('complement', 'to be in professional occupations')], [sub('adverbial', 'where they tend to enjoy their work more', '定语从句')], [['professional occupation', '专业职业']], '主语 + 系动词短语 + 不定式 + 定语从句'),
  'R2-15': note('与此同时，Baily 说，从事体力要求更高工作的人更可能期待退休，这意味着那些继续留下来的人更可能是出于经济原因。', [h('subject', 'Workers in more physical jobs'), h('predicate', 'may be more likely'), h('complement', 'to look forward to retiring')], [sub('adverbial', 'suggesting those who stay on are more likely doing so for financial reasons', '分词补充结构')], [['look forward to', '期待；盼望']], '主语 + 情态动词 + 不定式 + 分词补充'),
};

const allCloseReadings: Record<string, CloseReading> = {
  ...clozeCloseReadings,
  ...matchingCloseReadings,
  ...passageCloseReadings,
};

export const cet4Reading202512Set1 = {
  cloze: {
    title: 'The paradox of too many choices',
    sentences: [
      'People tend to want as many choices as possible.',
      'They believe this will maximize their chance of making the best decision.',
      'But research shows that, when it comes to actually making a selection from all of these choices, people can become confused and avoid making a decision altogether.',
      'Even worse, when people finally do decide, they are generally less satisfied with their decision and feel more regretful over whatever choice they made.',
      'Why does this happen?',
      'Research shows that when people choose from many options, they invest more in the decision, but feel less confident in their ability to decide well.',
      'In other words, when we are presented with more choices, making the “right” or “correct” decision begins to feel more crucial and, at the same time, more difficult to do.',
      'This may contribute to the deep fear that we will make the wrong decision.',
      'How can we solve this problem?',
      'I believe this fear could be tempered by putting decisions into perspective.',
      'It might help to remember that many of the choices you make, such as what to have for lunch, will not matter much in the future and that, even more important choices, like accepting a new job, can ultimately be changed.',
      'It could also help to enter these situations with clear guidelines and ideas of what you want from the range of options, which can narrow the possible choices, and also make you more confident about your ability to make the right decision.',
    ],
  },
  matching: {
    title: 'The battle over bike lanes needs a mindset shift',
    paragraphs: matching,
  },
  passages: [passageOne, passageTwo],
};

export const cet4CloseReadings202512Set1 = allCloseReadings satisfies Record<string, CloseReading>;

export const cet4InlineGlossary202512Set1: InlineGlossary = {
  words: {
    choice: { partOfSpeech: 'n', meaning: '选择；选项' },
    decision: { partOfSpeech: 'n', meaning: '决定；决策' },
    confused: { partOfSpeech: 'adj', meaning: '困惑的' },
    crucial: { partOfSpeech: 'adj', meaning: '关键的' },
    guideline: { partOfSpeech: 'n', meaning: '准则；指导方针' },
    selection: { partOfSpeech: 'n', meaning: '选择；挑选' },
    bike: { partOfSpeech: 'n', meaning: '自行车' },
    lane: { partOfSpeech: 'n', meaning: '车道；行车道' },
    merchant: { partOfSpeech: 'n', meaning: '商人；商家' },
    pedestrian: { partOfSpeech: 'n / adj', meaning: '行人；步行的' },
    infrastructure: { partOfSpeech: 'n', meaning: '基础设施' },
    revenue: { partOfSpeech: 'n', meaning: '收入；收益' },
    efficient: { partOfSpeech: 'adj', meaning: '高效的' },
    consumer: { partOfSpeech: 'n', meaning: '消费者' },
    cultural: { partOfSpeech: 'adj', meaning: '文化的' },
    psychology: { partOfSpeech: 'n', meaning: '心理学；心理因素' },
    crisis: { partOfSpeech: 'n', meaning: '危机' },
    organism: { partOfSpeech: 'n', meaning: '生物；有机体' },
    rhythm: { partOfSpeech: 'n', meaning: '节律；韵律' },
    protein: { partOfSpeech: 'n', meaning: '蛋白质' },
    medicine: { partOfSpeech: 'n', meaning: '药物；医学' },
    effectiveness: { partOfSpeech: 'n', meaning: '有效性；疗效' },
    compliance: { partOfSpeech: 'n', meaning: '遵从；依从' },
    cholesterol: { partOfSpeech: 'n', meaning: '胆固醇' },
    sedative: { partOfSpeech: 'n', meaning: '镇静剂' },
    retirement: { partOfSpeech: 'n', meaning: '退休' },
    economist: { partOfSpeech: 'n', meaning: '经济学家' },
    hairdresser: { partOfSpeech: 'n', meaning: '理发师' },
    pension: { partOfSpeech: 'n', meaning: '养老金' },
    occupation: { partOfSpeech: 'n', meaning: '职业' },
    isolation: { partOfSpeech: 'n', meaning: '孤立；隔离' },
    financial: { partOfSpeech: 'adj', meaning: '金融的；经济的' },
    physical: { partOfSpeech: 'adj', meaning: '身体的；体力的' },
  },
  phrases: [
    { term: 'when it comes to', explanation: '当涉及；说到' },
    { term: 'be presented with', explanation: '面对；被呈现' },
    { term: 'put ... into perspective', explanation: '把……放在恰当背景中看' },
    { term: 'bottom line', explanation: '最终结果；利润底线' },
    { term: 'look forward to', explanation: '期待；盼望' },
    { term: 'take ... into account', explanation: '把……考虑在内' },
  ],
};
