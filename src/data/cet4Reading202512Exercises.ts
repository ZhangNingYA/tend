export interface WordBankItem {
  key: string;
  word: string;
}

export interface ClozeAnswer {
  number: number;
  key: string;
  word: string;
  evidence: string;
  analysis: string;
}

export interface MatchingQuestion {
  number: number;
  prompt: string;
  answer: string;
  evidence: string;
  analysis: string;
}

const bank = (words: readonly string[]): WordBankItem[] => words.map((word, index) => ({
  key: String.fromCharCode(65 + index),
  word,
}));

const cloze = (
  keys: readonly string[],
  words: readonly string[],
  evidence: readonly string[],
  analysis: readonly string[],
): ClozeAnswer[] => keys.map((key, index) => ({
  number: 26 + index,
  key,
  word: words[index],
  evidence: evidence[index],
  analysis: analysis[index],
}));

export const cet4ClozeExercise202512Set1 = {
  wordBank: bank([
    'approximately', 'case', 'chance', 'confused', 'crucial',
    'deposited', 'enter', 'invest', 'matter', 'presented',
    'range', 'regular', 'seize', 'selection', 'ultimately',
  ]),
  answers: cloze(
    ['C', 'N', 'D', 'H', 'J', 'E', 'I', 'O', 'G', 'K'],
    ['chance', 'selection', 'confused', 'invest', 'presented', 'crucial', 'matter', 'ultimately', 'enter', 'range'],
    [
      'maximize their chance of making the best decision',
      'making a selection from all of these choices',
      'people can become confused',
      'they invest more in the decision',
      'when we are presented with more choices',
      'begins to feel more crucial',
      'will not matter much in the future',
      'can ultimately be changed',
      'help to enter these situations',
      'from the range of options',
    ],
    [
      '形容词性物主代词 their 后需要名词；chance 与 of doing 构成“做成某事的机会”。',
      '冠词 a 后需要单数名词；make a selection 是固定搭配。',
      'become 后接形容词作表语；confused 表示“感到困惑”。',
      '主语 they 后缺谓语；invest in 表示“在……上投入”。',
      'be presented with 是“面对、被给予”的固定搭配。',
      'feel more 后接形容词；crucial 与 difficult 构成并列比较。',
      'will not 后接动词原形；matter 表示“要紧、有影响”。',
      '副词修饰被动结构 be changed；ultimately 表示“最终”。',
      'help to 后接动词原形；enter 可直接接 situations。',
      'the ... of options 需要名词；range 表示“一系列、范围”。',
    ],
  ),
};

export const cet4ClozeExercise202512Set2 = {
  wordBank: bank([
    'actually', 'consequently', 'contributing', 'fair', 'feels',
    'manageable', 'mends', 'observed', 'phase', 'plotting',
    'quality', 'recently', 'taxing', 'tends', 'yielded',
  ]),
  answers: cloze(
    ['D', 'E', 'L', 'N', 'A', 'H', 'C', 'M', 'F', 'K'],
    ['fair', 'feels', 'recently', 'tends', 'actually', 'observed', 'contributing', 'taxing', 'manageable', 'quality'],
    [
      "it's fair to say that music moves people",
      'which feels to you like a sting in your brain',
      'According to a recently published study',
      "Alzheimer's tends to put people into layers of confusion",
      'music can sometimes actually lift people out',
      'This phenomenon has been observed several times',
      'contributing author on the study',
      'the diagnoses of dementia are taxing resources',
      'make the symptoms more manageable',
      "improve a patient's quality of life",
    ],
    [
      "it's fair to say 是“可以合理地说”的固定表达。",
      '关系代词 which 作主语，空格需要谓语；feel like 表示“感觉像”。',
      '过去分词 published 前用副词 recently 修饰发表时间。',
      '主语 Alzheimer’s 后缺谓语；tend to 表示“往往会”。',
      '副词 actually 强调音乐确实能暂时唤回患者。',
      '现象与 observe 是被动关系，需要过去分词 observed。',
      'contributing author 表示“参与该研究的作者”。',
      'taxing 在此作谓语，表示“大量消耗资源”。',
      'make + 宾语 + 形容词；manageable 表示“更容易控制”。',
      'quality of life 是“生活质量”的固定搭配。',
    ],
  ),
};

export const cet4ClozeExercise202512Set3 = {
  wordBank: bank([
    'concerns', 'expansion', 'forth', 'geography', 'importance',
    'imposed', 'inspired', 'national', 'partners', 'potential',
    'pursues', 'rescues', 'rest', 'strengthened', 'together',
  ]),
  answers: cloze(
    ['M', 'G', 'H', 'E', 'N', 'O', 'A', 'I', 'D', 'K'],
    ['rest', 'inspired', 'national', 'importance', 'strengthened', 'together', 'concerns', 'partners', 'geography', 'pursues'],
    [
      'throughout the rest of the world',
      'Environmental activism during the 1960s inspired Wisconsin Senator Gaylord Nelson',
      'to create a national celebration',
      'educating participants in the importance of environmental protection',
      'the event strengthened support for legislation',
      'Earth Day now brings together citizens and activists',
      'such environmental concerns as global warming',
      'which rallies more than 20,000 partners and organizations',
      'regardless of race, gender, income, or geography',
      'The Earth Day Network pursues this mission',
    ],
    [
      'the rest of the world 表示“世界其他地区”。',
      '句子缺谓语；inspired 与后面的 to create 构成 inspire somebody to do。',
      'celebration 前需要形容词；national 与后文 global 形成范围对比。',
      'the importance of 表示“……的重要性”。',
      '事件发生在 1970 年，且空格作谓语，应用过去式 strengthened。',
      'bring together 表示“把……汇聚在一起”。',
      'such ... as 后列举环境问题，因此选择 concerns。',
      '数词和 organizations 之间需要并列复数名词 partners。',
      '与 race、gender、income 并列，需要名词 geography。',
      '主语为单数 Network，pursues 表示“践行、追求使命”。',
    ],
  ),
};

export const cet4MatchingQuestions202512Set1: MatchingQuestion[] = [
  { number: 36, prompt: 'An increasing amount of data indicates that installing bike lanes raises local business revenues.', answer: 'E', evidence: 'There’s a rising amount of data showing that installing bike lanes and making streets more pedestrian-friendly boosts the economic fortunes of a place.', analysis: 'increasing amount 对应 rising amount；raises revenues 是 boosts economic fortunes 的同义改写。' },
  { number: 37, prompt: "According to a magazine writer, some small business owners' resistance to bike lanes arises from cultural factors.", answer: 'K', evidence: 'For others, the pushback is cultural, says Henry Grabar, a writer for Slate Magazine.', analysis: 'magazine writer 对应 Slate Magazine writer；resistance 对应 pushback。' },
  { number: 38, prompt: 'A stretch of Skillman Ave witnessed not only a big increase in sales but also the opening of new businesses.', answer: 'C', evidence: 'businesses on Skillman saw sales rise by 12 percent ... What’s more, that section of road saw new businesses open', analysis: '题干把 sales rise 和 new businesses open 两条相邻信息合并。' },
  { number: 39, prompt: 'When people have no way out in crises, they are more likely to embrace changes.', answer: 'O', evidence: 'Crises, after all, have a way of opening people’s eyes to possibilities.', analysis: 'no way out 对应 didn’t see any way around it；危机会让人接受此前不愿接受的改变。' },
  { number: 40, prompt: 'According to one survey, city design with bike lanes and pedestrian space did not negatively impact local businesses.', answer: 'G', evidence: 'a survey of research from 23 cities found that bike lanes and pedestrian-friendly design didn’t hurt local retail and food stores.', analysis: 'did not negatively impact 是 didn’t hurt 的同义改写。' },
  { number: 41, prompt: 'Despite increased business activity on Skillman Ave, many store owners insisted the bike lanes were destroying their area.', answer: 'D', evidence: 'Many still insisted the lanes were killing their part of the city.', analysis: 'destroying their area 对应 killing their part of the city；Despite 概括了数据与商户态度的反差。' },
  { number: 42, prompt: "In a war of culture, data does not help much in changing people's minds.", answer: 'L', evidence: 'If we’ve learned anything from culture wars, it’s that data isn’t much good at changing minds.', analysis: '题干几乎直接改写原句，定位词是 culture wars、data 和 changing minds。' },
  { number: 43, prompt: 'A businesswoman said her business dropped sharply when parking space gave way to a bike lane, because most of her customers came by car.', answer: 'J', evidence: 'She said business fell by at least 40 percent when the city removed nearby parking to put in a bike lane. The majority of her customers drive', analysis: 'dropped sharply 对应 fell by at least 40 percent；原因是多数顾客开车。' },
  { number: 44, prompt: 'Local business owners on Skillman Ave argued that their businesses would be ruined when parking spots were replaced by bike lanes.', answer: 'A', evidence: 'Taking out those parking spots ... would ruin stores and restaurants along Skillman.', analysis: '题干保留了地点、停车位被取消以及 ruin businesses 三个定位点。' },
  { number: 45, prompt: 'People may find it more pleasant to wander around streets redesigned for cycling and walking.', answer: 'H', evidence: 'streets redesigned for bikes and pedestrians tend to become more pleasant places to hang around', analysis: 'wander around 对应 hang around；cycling and walking 对应 bikes and pedestrians。' },
];

export const cet4MatchingQuestions202512Set2: MatchingQuestion[] = [
  { number: 36, prompt: 'Certain gaming skills meet the requirements of the armed forces in Britain.', answer: 'D', evidence: 'Those skills are part of what the Royal Air Force is looking for “in a variety of roles”.', analysis: 'armed forces in Britain 对应 Royal Air Force；meet the requirements 对应 looking for。' },
  { number: 37, prompt: 'One veteran player has applied his gaming skills to his real-world business and owes his success partly to a game company.', answer: 'I', evidence: 'he realised he could transfer his skills to real-life business ... He credits his success to ... “a damn good company in Iceland that made a damn good game”.', analysis: 'transfer skills 对应 applied skills；credits his success to 对应 owes his success to。' },
  { number: 38, prompt: "According to a researcher, bad reputation about games will probably limit a gamer's chances of landing a job.", answer: 'F', evidence: "the negative reputation around games means that telling someone you're a determined gamer is more likely to harm your chances of getting a job.", analysis: 'bad reputation 对应 negative reputation；limit chances 对应 harm your chances。' },
  { number: 39, prompt: "Businesses are beginning to realise gaming skills are applicable to their employees' work.", answer: 'A', evidence: 'Businesses are waking up to the skills gamers can bring to the workplace.', analysis: 'beginning to realise 对应 waking up to；employees’ work 对应 workplace。' },
  { number: 40, prompt: 'A physicist admits gaming has contributed to his computer knowledge and skills of solving problems.', answer: 'K', evidence: 'Every new gaming upgrade improved his knowledge of how they worked. ... And problem-solving is a big part of my job.', analysis: '题干合并了同一段中的 computer knowledge 与 problem-solving 两条信息。' },
  { number: 41, prompt: 'Game Academy proposes to help gamers develop their skills using critical thinking.', answer: 'G', evidence: 'part of Game Academy’s suggestion is to transform casual gamers into “conscious” ones, applying critical thinking to developing their skills.', analysis: 'proposes 对应 suggestion；using critical thinking 与原句直接对应。' },
  { number: 42, prompt: 'One who enjoys playing games that require management skills to win might possess more qualities of a manager.', answer: 'B', evidence: 'where strategy and resource management are key, then you might have more in common with managers.', analysis: 'management skills 对应 strategy and resource management；qualities 对应 have more in common。' },
  { number: 43, prompt: 'In more conventional views, gaming is a time-wasting activity pursued by young boys.', answer: 'J', evidence: 'In more traditional settings, gaming is still imagined to be the pursuit of teenage boys—a waste of time.', analysis: 'conventional views 对应 traditional settings；其余信息为直接同义改写。' },
  { number: 44, prompt: "It is suggested that gaming skills be included in a résumé if they enhance a job applicant's appeal.", answer: 'E', evidence: 'how you either make it relevant to the job you are applying for, or how it makes you more interesting as a potential employee', analysis: 'enhance appeal 对应 makes you more interesting；前提是技能与申请职位相关。' },
  { number: 45, prompt: 'Many gamers know their passion for playing games has shaped their identity.', answer: 'H', evidence: 'There are already plenty of gamers out there who know that their hobby has made them who they are.', analysis: 'passion 对应 hobby；shaped their identity 对应 made them who they are。' },
];

export const cet4MatchingQuestions202512Set3: MatchingQuestion[] = [
  { number: 36, prompt: 'Hiring managers believe unemployed workers over 45 lack good skills and are less adaptable.', answer: 'D', evidence: 'they believe that members of this age group have poor skills and low adaptability', analysis: 'lack good skills 对应 poor skills；less adaptable 对应 low adaptability。' },
  { number: 37, prompt: 'Switching to a new career is difficult and getting reemployed after a layoff is even tougher.', answer: 'A', evidence: "Changing careers is hard. Getting back into work after you've been laid off is even harder.", analysis: '题干按原文顺序合并两个比较句，tougher 对应 even harder。' },
  { number: 38, prompt: 'People from poor neighborhoods tend to have the least interest in retraining.', answer: 'J', evidence: 'The people least interested in retraining are more likely to come from historically disadvantaged communities', analysis: 'poor neighborhoods 概括 historically disadvantaged communities。' },
  { number: 39, prompt: 'Hiring managers who are not yet 45 years old seem unwilling to hire people their senior.', answer: 'F', evidence: 'the majority of hiring managers are under 45—and seem reluctant to hire people older than themselves.', analysis: 'not yet 45 对应 under 45；their senior 对应 people older than themselves。' },
  { number: 40, prompt: 'Some analysts find age 45+ jobless workers are most likely to be unemployed for more than a year.', answer: 'C', evidence: "if you're out of work past the age of 45, there's nearly a two in three chance you'll be out of work for over a year, they find.", analysis: 'most likely 由 nearly a two in three chance 概括；over a year 为直接对应。' },
  { number: 41, prompt: 'People who had succeeded in career change after 45 told a nonprofit organization they owed a great deal to the education and training they had received.', answer: 'I', evidence: 'Those who had successfully changed careers after 45 told Generation that education and training had been a big help', analysis: 'nonprofit organization 指 Generation；owed a great deal to 对应 had been a big help。' },
  { number: 42, prompt: 'Older workers who actively pursue more education and training have a good chance of being hired.', answer: 'G', evidence: 'Older workers who’ve actively engaged in more education and training relevant to their jobs turn this pretty much on its head.', analysis: 'actively pursue 对应 actively engaged in；本段随后用 three-quarters 的招聘经理态度说明就业机会提高。' },
  { number: 43, prompt: 'A new study finds that more education and training helps midcareer individuals find a new job.', answer: 'B', evidence: 'But the one thing that can really make a difference? More education and training. These are the results from a new study by Generation', analysis: '题干合并该段的研究结论与研究来源。' },
  { number: 44, prompt: 'Owing to the internet, it is now more convenient than ever to receive training in new skills.', answer: 'L', evidence: 'it has never been easier or cheaper to gain instruction in new skills, thanks to the internet.', analysis: 'Owing to 对应 thanks to；more convenient than ever 对应 never been easier。' },
  { number: 45, prompt: 'People over 45 stimulated by training suffer shorter periods of unemployment, get more job offers and have greater satisfaction in them.', answer: 'H', evidence: 'those who are excited by training are unemployed for less time, receive more job offers, and are more satisfied by the job offers they receive.', analysis: '题干依次改写 unemployed for less time、more job offers 和 more satisfied。' },
];
