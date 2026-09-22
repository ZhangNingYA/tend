import type { CloseReading, InlineGlossary } from '../types/closeReading';
import type { ReadingQuestion } from '../types/readingQuestion';
import { cet4InlineGlossary202606Set2 } from './cet4InlineGlossary202606Set2';
import { describeReadingStructure, readingStructurePattern } from './describeReadingStructure';
import {
  cet4ClozeExercise202512Set3,
  cet4MatchingQuestions202512Set3,
} from './cet4Reading202512Exercises';

type Role = 'subject' | 'predicate' | 'object' | 'complement' | 'adverbial';
type Highlight = { role: Role; text: string; label?: string };
const h = (role: Role, text: string, label?: string): Highlight => ({ role, text, ...(label ? { label } : {}) });
const note = (translation: string, highlights: readonly Highlight[], trunk = highlights, vocabulary: readonly (readonly [string, string])[] = []): CloseReading => ({
  translation,
  vocabulary: vocabulary.map(([term, explanation]) => ({ term, explanation })),
  structure: {
    pattern: readingStructurePattern(highlights, trunk),
    explanation: describeReadingStructure(highlights, trunk),
  },
  highlights: [...highlights],
  trunk: [...trunk],
});
const firstWords = (sentence: string) => sentence.match(/[A-Za-z]+(?:[’'][A-Za-z]+)?/g) ?? [];
const vocabularyHints: Record<string, string> = {
  equinox: '昼夜平分点；春分或秋分', activism: '行动主义；社会运动', legislation: '法律；立法', sustainable: '可持续的',
  ageism: '年龄歧视', adaptability: '适应能力', credential: '资历；资格证书', subsidy: '补贴', vegan: '纯素的',
  unsustainable: '不可持续的', ancestry: '祖先；血统', hereditary: '遗传的', trait: '特征；性状', multifactorial: '多因素的',
  environmental: '环境的', disadvantaged: '处于不利地位的', relevant: '相关的', unemployment: '失业',
};
const vocabularyFor = (sentence: string) => Object.entries(vocabularyHints)
  .filter(([term]) => new RegExp(`\\b${term.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}\\b`, 'i').test(sentence))
  .slice(0, 3)
  .map(([term, explanation]) => [term, explanation] as const);
const verbPattern = /\b(?:am|is|are|was|were|be|been|being|has|have|had|can|could|may|might|will|would|should|must|do|does|did|inspire|inspires|move|moves|get|gets|change|changes|feel|feels|turn|turns|publish|published|put|puts|confirm|confirms|lift|lifts|bring|brings|observe|observed|study|studied|come|comes|say|says|said|make|makes|made|decrease|improve|list|lists|wake|wakes|apply|applied|reckon|reckons|find|found|prefer|enjoy|enjoys|play|plays|lead|led|persuade|transform|see|sees|ask|asks|run|ran|realise|realized|restructure|restructured|teach|teaches|credit|credits|help|helps|destroy|destroyed|create|creates|solve|solves|work|works|feature|features|begin|begins|include|includes|develop|develops|remember|remembers|start|starts|appear|appears|sleep|sleeps|dream|dreams|assume|assumes|serve|serves|allow|allows|learn|learns|stem|stems|wonder|wonders|rely|relies|depend|depends|provide|provides|claim|claims|reveal|reveals|reflect|reflects|identify|identified|account|accounts|predict|predicts|offer|offers|look|looks|become|becomes|receive|receives|acknowledge|acknowledged|call|called|tell|tells|validate|validates|award|awarded|read|reads|think|thinks|rise|rises|rate|rates|associate|associated|choose|chose|seem|seems|remain|remains|raise|raises|honor|honors|protect|protects|organize|organized|strengthen|strengthened|support|supports|pursue|pursues|face|faces|hire|hires|argue|argues|admit|admits|worry|worries|try|tries|switch|switched|enable|enabled|satisfy|satisfied|cost|costs|want|wants|need|needs|know|knows|travel|travels|participate|participates|change|changed|give|gives|go|goes|benefit|benefits|test|tests|detect|detects|interpret|interpreted|involve|involves|interact|interacts|played|matter|matters|explain|explains|open|opens|follow|follows|push|pushes|believe|believes|take|takes|remove|removed|cite|citing|show|shows|eat|eating|drink|drinks|chooses|rated|prevent|prevents|base|based|traveling|growing|compare|compared|describes|recall|recalls|vary|varies|continue|continues|roused|upset|affect|affects)\b/i;
const compoundVerbPattern = /\b(?:am|is|are|was|were|has|have|had|can|could|may|might|will|would|should|must|do|does|did)(?:\s+(?:not|never|also|still|just|probably|actually|already|rarely|usually|often))*\s+(?:(?:been|being)\s+)?(?:[A-Za-z]+(?:ed|en|ing)|be|do|feel|make|get|put|come|go|take|bring|learn|serve|allow|help|show|say|see|find|think|look|become|remain|appear|matter|depend|provide|claim|reveal|reflect|identify|account|predict|offer|receive|acknowledge|call|tell|validate|award|read|rise|rate|choose|seem|raise|protect|organize|support|pursue|face|hire|argue|admit|worry|try|switch|enable|satisfy|cost|want|need|know|travel|participate|give|benefit|test|detect|interpret|involve|interact|follow|push|believe|remove|cite|prevent|base|compare|describe|recall|vary|continue|upset|affect|left)\b/i;
const auto = (sentence: string, translation = '句意：' + sentence): CloseReading => {
  const leadingMatch = sentence.match(/^(?:Unfortunately,\s+while\b[^,]+,\s*|(?:(?:But|And|So),?\s+)(?:if|when|while|although|because|since|as)\b[^,]+,\s*|(?:Earlier this year|Two years ago|Many years ago),\s*|Now,?\s+)/i)
    ?? sentence.match(/^(?:And,\s+yes,\s+|(?:But|And|So|Importantly|Basically|Apparently),?\s+)/i)
    ?? sentence.match(/^(?:(?:Although|Though|While|When|If|Since|Because|As|With|After|Before|According to|In|On|At|For|By|Instead|However|Unfortunately|Importantly|Apparently|Basically|Eventually)\b[^,]{2,},\s*)/i)
    ?? sentence.match(/^(?:Attended|Based|Compared|Given|Supported|Driven|Located|Founded|Born)\b[^,]{2,},\s*/i);
  const leading = leadingMatch?.[0] ?? '';
  const mainStart = leading.length;
  const mainSentence = sentence.slice(mainStart);
  const simpleVerb = Array.from(mainSentence.matchAll(new RegExp(verbPattern.source, 'gi')))
    .find((candidate) => {
      const value = candidate[0].toLowerCase();
      const before = mainSentence.slice(0, candidate.index).toLowerCase();
      const after = mainSentence.slice((candidate.index ?? 0) + candidate[0].length).toLowerCase();
      return !(
        (value === 'start' && after.startsWith('-'))
        || (value === 'work' && /\binto\s*$/.test(before))
        || (value === 'associate' && /^\s+professor\b/.test(after))
        || (value === 'study' && /^(?:\s*,|\s+(?:which|that|has|made|says|shows|confirms|finds|found)\b)/.test(after))
      );
    });
  const compoundVerb = mainSentence.match(compoundVerbPattern);
  const priorityVerb = mainSentence.match(/\b(?:send|sends|sent|received|told|wrote)\b/i);
  const verb = [compoundVerb, simpleVerb, priorityVerb]
    .filter((candidate) => candidate !== undefined && candidate !== null)
    .sort((left, right) => (left.index ?? 0) - (right.index ?? 0))[0];
  const verbStart = verb?.index ?? 0;
  const predicate = verb?.[0]
    ? `${verb[0]}${/^(?:turns?|comes?|gets?|brings?|goes?|takes?|puts?|makes?)\s+(?:out|back|up|off|on|into|over)\b/i.test(mainSentence.slice(verbStart)) ? ` ${mainSentence.slice(verbStart + verb[0].length).match(/^\s+(?:out|back|up|off|on|into|over)\b/i)?.[0]?.trim() ?? ''}` : ''}`.trim()
    : firstWords(mainSentence)[0] ?? 'is';
  const subject = mainSentence.slice(0, verbStart).trim().replace(/^[,;:\"“”]+|[,;:\"“”]+$/g, '') || firstWords(mainSentence)[0] || sentence.slice(0, 12);
  const predicateStart = mainStart + verbStart;
  const afterPredicate = sentence.slice(predicateStart + predicate.length).trim();
  const highlights: Highlight[] = [];
  if (leading) highlights.push(h('adverbial', leading.trim().replace(/,$/, ''), /^(?:Although|Though|While|When|If|Since|Because|As|With|After|Before)\b/i.test(leading) ? '状语从句' : '句首状语'));
  highlights.push(h('subject', subject), h('predicate', predicate));
  if (afterPredicate) {
    const tail = afterPredicate.replace(/^[,;:\s]+|[.!?]+$/g, '').trim();
    const marker = tail.search(/\b(?:that|whether|if|what|how|why|where|when|who|which|because|although|while)\b/i);
    if (marker > 0) {
      const mainTail = tail.slice(0, marker).trim();
      if (mainTail) highlights.push(h(/^(?:to|for|with|from|in|on|at|by|during|over|under)\b/i.test(mainTail) ? 'complement' : 'object', mainTail));
      highlights.push(h('object', tail.slice(marker), '从句（整体）'));
    } else if (marker === 0) {
      highlights.push(h('object', tail, '宾语从句（整体）'));
    } else if (tail) {
      highlights.push(h(/^(?:to|for|with|from|in|on|at|by|during|over|under)\b/i.test(tail) ? 'complement' : 'object', tail));
    }
  }
  return note(translation, highlights, highlights.filter((item) => !item.label?.includes('从句')), vocabularyFor(sentence));
};
const questionNotes: Record<string, CloseReading> = {
  "What do we learn about New York's Eleven Madison Park?": note('关于纽约的 Eleven Madison Park 餐厅，我们能了解到什么？', [h('object', 'What', '疑问宾语'), h('predicate', 'do', '助动词'), h('subject', 'we'), h('predicate', 'learn', '实义谓语'), h('complement', "about New York's Eleven Madison Park")]),
  'Why did Daniel Humm decide to remove meat from the menu of his restaurant?': note('Daniel Humm 为什么决定从餐厅菜单中去掉肉类？', [h('adverbial', 'Why', '原因疑问'), h('predicate', 'did', '助动词'), h('subject', 'Daniel Humm'), h('predicate', 'decide', '实义谓语'), h('object', 'to remove meat from the menu of his restaurant')]),
  'What did Daniel Humm think of his move to a meat-free menu?': note('Daniel Humm 如何看待改用无肉菜单这一举措？', [h('object', 'What', '疑问宾语'), h('predicate', 'did', '助动词'), h('subject', 'Daniel Humm'), h('predicate', 'think', '实义谓语'), h('complement', 'of his move to a meat-free menu')]),
  "What does Michelin's 2022 New York guide say about Eleven Madison Park's decision?": note('米其林 2022 纽约指南如何评价 Eleven Madison Park 的决定？', [h('object', 'What', '疑问宾语'), h('predicate', 'does', '助动词'), h('subject', "Michelin's 2022 New York guide"), h('predicate', 'say', '实义谓语'), h('complement', "about Eleven Madison Park's decision")]),
  'What does the awarding of three Michelin stars to Eleven Madison Park indicate?': note('Eleven Madison Park 获得米其林三星说明了什么？', [h('object', 'What', '疑问宾语'), h('predicate', 'does', '助动词'), h('subject', 'the awarding of three Michelin stars to Eleven Madison Park'), h('predicate', 'indicate', '实义谓语')]),
  'What does the passage say is of importance regarding genetic tests?': note('文章认为，关于基因检测，什么是重要的？', [h('object', 'What', '疑问宾语'), h('predicate', 'does', '助动词'), h('subject', 'the passage'), h('predicate', 'say', '实义谓语'), h('complement', 'is of importance regarding genetic tests', '宾语从句（整体）')], [h('object', 'What', '疑问宾语'), h('predicate', 'does', '助动词'), h('subject', 'the passage'), h('predicate', 'say', '实义谓语')]),
  'What kind of genetic tests tend to be comparatively reliable?': note('哪类基因检测往往相对可靠？', [h('subject', 'What kind of genetic tests'), h('predicate', 'tend to be'), h('complement', 'comparatively reliable')]),
  'What do we learn about genetic health tests from the passage?': note('关于基因健康检测，我们能从文章中了解到什么？', [h('object', 'What', '疑问宾语'), h('predicate', 'do', '助动词'), h('subject', 'we'), h('predicate', 'learn', '实义谓语'), h('complement', 'about genetic health tests from the passage')]),
  'What makes genetic tests for multi-factorial traits tricky to interpret?': note('是什么使多因素性状的基因检测难以解释？', [h('subject', 'What'), h('predicate', 'makes'), h('object', 'genetic tests for multi-factorial traits'), h('complement', 'tricky to interpret')]),
  'What does the passage say about DNA tests to predict personality or talents?': note('文章如何评价预测性格或天赋的 DNA 检测？', [h('object', 'What', '疑问宾语'), h('predicate', 'does', '助动词'), h('subject', 'the passage'), h('predicate', 'say', '实义谓语'), h('complement', 'about DNA tests to predict personality or talents')]),
};

const qNote = (prompt: string) => questionNotes[prompt]
  ?? note('题干：' + prompt, [h('subject', firstWords(prompt)[0] ?? prompt), h('predicate', firstWords(prompt)[1] ?? 'asks')]);

const clozeSentences = [
  'Earth Day is an annual celebration that honors the achievements of the environmental movement and raises awareness of the need to protect Earth’s natural resources for future generations.',
  'Earth Day is celebrated on April 22 in the United States and on either April 22 or the day the spring equinox occurs throughout the rest of the world.',
  'Environmental activism during the 1960s inspired Wisconsin Senator Gaylord Nelson to create a national celebration uniting the environmental movement.',
  'With the help of Denis Hayes, a graduate student at Harvard University, Nelson organized the first Earth Day on April 22, 1970, educating participants in the importance of environmental protection.',
  'Attended by 20 million people across the United States, the event strengthened support for legislation such as the Clean Air Act and the Endangered Species Act.',
  'In 1990, Hayes organized a global Earth Day, with more than 200 million participants in 140 countries.',
  'Earth Day now brings together citizens and activists from around the world to raise awareness and take action regarding such environmental concerns as global warming and renewable energy.',
  'Today, the Earth Day Network, which rallies more than 20,000 partners and organizations in 190 countries, supports the Earth Day mission year-round.',
  'This mission is founded on the proposition that all people, regardless of race, gender, income, or geography, have a moral right to a healthy, sustainable environment.',
  'The Earth Day Network pursues this mission through education, public policy, and activism campaigns.',
];

const matchingSentences: Record<string, string[]> = {
  A: [
    'Ageism and long-term unemployment are most damaging for those in the second half of their careers.',
    'Changing careers is hard.',
    "Getting back into work after you've been laid off is even harder.",
    'Those over 45 make up the bulk of the long-term unemployed, in America and elsewhere.',
    "Hiring managers admit they are reluctant to hire those over 40 or 45, arguing they probably won't be a good ‘fit,’ their experience won't be relevant to the workplace, and they'll be unable or unwilling to learn new skills.",
  ],
  B: [
    'But the one thing that can really make a difference? More education and training.',
    'These are the results from a new study by Generation, a nonprofit founded by former McKinsey consultants.',
    "They've just published a global survey on midcareer employment, based on surveys of over 5,000 workers and managers in seven countries.",
  ],
  C: [
    'Older midcareer workers make up the bulk of the long-term unemployed in many countries, Generation’s analysts write in their report.',
    'Those over 45 comprise over 40% of the long-term unemployed, for example.',
    "And if you're out of work past the age of 45, there's nearly a two in three chance you'll be out of work for over a year, they find.",
    'Midcareer individuals are finding it harder to get jobs, they write.',
    'People age 45+ face persistent and rising pressure in the global job market.',
    'They are unemployed for much longer than the average, and their age is indeed one of the greatest barriers to their finding a job.',
  ],
  D: [
    'A substantial part of this, they report, is widespread ageism on the part of hiring managers.',
    'Although such managers admit that post-45 hires turn out on average to be just as good as or better than younger workers, they still do not want to hire them.',
    'Hiring managers have a strong perception bias against 45+ job candidates—they believe that members of this age group have poor skills and low adaptability, Generation’s analysts report.',
  ],
  E: [
    'The survey results are remarkable.',
    'Hiring managers are three times as likely to rate job applicants age 35–44 as a better “fit” than those over 45.',
    'They rate the post-45 job seekers lower on average on all three measures—even experience—than those ages 18 to 34.',
    'This is true even though nearly nine managers in 10 also said their post-45 workers were as good as or better than younger employees in the same jobs.',
  ],
  F: [
    'Their biggest fears about hiring those over 45?',
    'Managers said they worry that older hires will be reluctant to try new technologies, and will be unable to learn new skills.',
    'Besides, the majority of hiring managers are under 45—and seem reluctant to hire people older than themselves.',
  ],
  G: [
    'But here’s the good news.',
    'Older workers who’ve actively engaged in more education and training relevant to their jobs turn this pretty much on its head.',
    'Three-quarters of hiring managers said they’d be more likely to hire an over-45 who had relevant education, training or credentials.',
    'Among those over 45 who’d successfully switched careers, 74% said training helped them get their new job.',
  ],
  H: [
    'Midcareer switchers overwhelmingly say that training enabled them to shift to a new career path, the analysts write.',
    'And when they asked over-45 candidates about their attitudes, they found that those who are excited by training are unemployed for less time, receive more job offers, and are more satisfied by the job offers they receive.',
  ],
  I: [
    'Hiring managers said training was three times more likely to get them to hire applicants over age 45 than, say, government subsidies.',
    'What training are we talking about?',
    'Obviously it depends on the job.',
    'And, yes, managers are most likely to be impressed by industry qualifications you get in school.',
    'These things cost money, and time.',
    'But these aren’t the only things helpful.',
    'Those who had successfully changed careers after 45 told Generation that education and training had been a big help—and that included in-person, on-the-job training, informal learning, and online courses—with or without certification.',
  ],
  J: [
    'If they think we’re too old to learn new skills after we’re 45, just learning some new skills may have an effect on its own.',
    'There’s a downside to this.',
    'The people least interested in retraining are more likely to come from historically disadvantaged communities, more likely to have low incomes, and are more likely to have the least schooling after getting their high-school diploma or earlier.',
    'On average, post-45 job switchers with higher incomes participate in 2.5 training programs each.',
    'Those with lower incomes: 0.9 programs on average.',
  ],
  K: [
    'Many years ago, I wrote about a study which found that employers are much more likely to hire a college graduate who has some work experience in the industry than a college graduate who took the “right” degree.',
    'A bank is more likely to hire a literature graduate who spent their summers working in their local bank than a finance or economics graduate who spent their summers surfing or traveling around Italy.',
    'They’ve learned through long experience.',
    'The person who worked in the bank is more likely ready, willing and able to be part of the team and do the job from day 1.',
  ],
  L: [
    'We can rail against ageism all we like.',
    'It gets us nowhere.',
    'And it’s easy to forget that employers, like everyone else, are under time pressure and are just trying to solve problems.',
    'Any and all training, including inexpensive and informal training, is going to help resolve their worries about hiring someone over 45.',
    'And it has never been easier or cheaper to gain instruction in new skills, thanks to the internet.',
    'Online schools like Udemy and Lynda.com offer sweet deals at sign-up.',
    'And courses on YouTube are free.',
  ],
  M: [
    'Bottom line? Yes, it really can be difficult getting a new job after age 45, let alone changing careers.',
    'One of the best things we can do to help ourselves is to go online and learn new, relevant skills.',
    'Sadly, the people who most need the help are least likely to take it—which raises a challenge for society as a whole.',
    'Not only do we not want to see lives go to waste, but we all benefit if more people are working and fewer are unemployed.',
  ],
};
const matching = Object.entries(matchingSentences).map(([label, sentences]) => ({ label, sentences }));

const passageOneSentences = [
  "New York's Eleven Madison Park has become the first vegan restaurant to be awarded three Michelin stars.",
  'The fine dining establishment received its first three-star Michelin rating in 2011 when the menu was famed for its fancy animal-based dishes.',
  "However, last year, the restaurant's co-owner and famous chef, Daniel Humm, made the bold decision to remove meat from the menu, citing our unsustainable food system.",
  'While cow milk is still served for tea and coffee, the menu is almost 100 percent vegan.',
  'At the time, Humm acknowledged the move was risky, admitting that “it wasn’t clear if guests would come”, but called the gamble “a risk worth taking.”',
  '“In view of the climate crisis, I didn’t want to open the same restaurant,” Humm told the Financial Times in an interview.',
  '“If we can show the possibilities of eating plant-based food in this setting, it can open a lot of doors” for others to follow.',
  "Now, this impressive new accomplishment validates Eleven Madison Park's decision to take meat off the menu and embrace plant-based foods, with Michelin's 2022 New York guide branding it a ‘bold vision of luxury dining’.",
  '“We took the jump to transform Eleven Madison Park into a plant-based fine dining restaurant knowing in our hearts this is what we believed in,” stated Humm on Instagram.',
  '“Last night, we were honored to be awarded three Michelin stars for the 11th year in a row.',
  'I am so grateful to the team members who contributed through its nearly 25-year history.',
  'We are also grateful to our guests and partners who believed in our vision and encouraged us to push harder.”',
  'Three Michelin stars is the highest award, given to chefs who are at the peak of their profession.',
  '“Their cooking is elevated to an art form and some of their dishes are destined to become classics,” reads Michelin’s website, in a clear nod to plant-based foods’ growing significance in the culinary world.',
  '“I think luxury companies have a real role to play and a responsibility,” says Humm.',
  '“The more creative we are, the more beautiful and delicious our future will be.”',
];

const passageTwoSentences = [
  'With genetic testing becoming increasingly popular, many people are left wondering exactly how accurate it is.',
  'Whether you are taking a DNA test to build your extended DNA family tree, or want precise information on inborn health conditions, it is important to understand how accurate genetic tests are, and what information we can rely upon.',
  'How accurate DNA tests are relies greatly upon the kind of test being taken, on the specific question you ask, and on how complex the genetics behind a trait is.',
  'For example, tests for traits that depend on a single gene provide much more reliable results, because you can see whether a disease-causing trait is present.',
  'Ancestry tests claim to reveal our genetic identities.',
  'But saying you are 30 percent East Asian or American hardly reflects your real ancestry.',
  'What about using DNA tests to discover distant family members?',
  "There are tools to compare one's DNA with others' to find distant relatives based on their genetic identification.",
  'These kinds of applications are generally accurate.',
  "It's relatively easy to tell whether two DNA samples belong to close relatives.",
  'With distant relatives, results become hazier.',
  'Genetic health tests claim to be able to detect certain hereditary diseases, or other health conditions.',
  'While certain rare diseases can be easily identified, most potential health conditions cannot be identified by genetic testing alone.',
  'The large majority of our traits and diseases also depend upon non-genetic factors, such as lifestyle, the environment, and many others.',
  'Genetic tests for multi-factorial traits are often very tricky to interpret.',
  'Height, for example, depends on hundreds of genes, each contributing a little to the outcome, together with a bunch of environmental factors.',
  "A test can look at many genes at once, but it's difficult to predict how they will play together.",
  'Then you should also account for non-genetic factors that are not written in the DNA.',
  'Tests that offer to find your perfect romantic match and those claiming to predict personality or talents based on your DNA are pure nonsense.',
  'At the moment, the scientific bases for these applications are non-existent or incredibly weak.',
];

const questionGuidance: Record<number, {
  analysis: string;
  options: readonly [string, string, string, string];
}> = {
  46: {
    analysis: '首句指出 Eleven Madison Park 是首家获得米其林三星的纯素餐厅；三星是米其林最高评级，因此选 A。',
    options: [
      '正确：three Michelin stars 对应 the highest Michelin rating，first vegan restaurant 为原文直接信息。',
      '错误：文章只说它成为首家获三星的纯素餐厅，没有说它是纽约首家去掉肉类的餐厅。',
      '错误：原文说菜单曾以精致的动物性菜肴闻名，不是美国各地的地方菜。',
      '错误：2011 年是它首次获得三星的年份，不是餐厅成立年份。',
    ],
  },
  47: {
    analysis: 'Humm 去掉肉类时援引的是不可持续的食品体系和气候危机，目标是推动更可持续的饮食方式，B 最符合。',
    options: [
      '错误：文章没有把说服更多顾客成为纯素者作为直接目的。',
      '正确：sustainable food system 与原文 unsustainable food system 构成正反同义转换。',
      '错误：展示植物性菜单的可能性是决定之后的示范意义，不是最初原因。',
      '错误：他在冒险改变已有三星餐厅，并不是为了争取首次三星。',
    ],
  },
  48: {
    analysis: 'Humm 承认顾客是否会来并不确定，却仍称这是值得承担的风险；A 同时保留“不确定”和“值得”两层意思。',
    options: [
      '正确：unsure of success 对应 it wasn’t clear if guests would come，worthwhile 对应 a risk worth taking。',
      '错误：为其他餐厅树立榜样是文章谈到的潜在影响，不是他对风险本身的评价。',
      '错误：他称其值得冒险，并没有说这是疯狂且无人愿意尝试的赌博。',
      '错误：当时他并不知道这一举措是否会被市场证明正确。',
    ],
  },
  49: {
    analysis: '指南把这一决定称为 a bold vision of luxury dining；bold 对应 daring，vision 对应 foresight，因此选 C。',
    options: [
      '错误：elevated to an art form 是米其林网站对三星厨艺的一般说明，不是指南对该决定的评价。',
      '错误：指南在评价餐厅愿景，并非证明米其林评级体系有效。',
      '正确：daring foresight 准确改写 bold vision。',
      '错误：餐厅本来就是高级餐厅，决定的重点是转向植物性菜单。',
    ],
  },
  50: {
    analysis: '米其林再次授予三星，被作者解释为对植物性食品在餐饮界日益重要的明确认可，D 直接对应结尾。',
    options: [
      '错误：文章说重要性正在上升，但没有断言纯素食品一定会成为主流。',
      '错误：责任来自 Humm 对奢侈品牌角色的看法，不是三星奖项本身表明的内容。',
      '错误：文章没有把三星描述成促使更多餐厅提供健康食品的激励措施。',
      '正确：explicit recognition 对应 a clear nod，rising importance 对应 growing significance。',
    ],
  },
  51: {
    analysis: '第二句明确说，理解基因检测到底有多准确、哪些信息可信非常重要；A 提取了其中最核心的一点。',
    options: [
      '正确：Knowing their accuracy 直接对应 understand how accurate genetic tests are。',
      '错误：文章讨论不同检测的可靠性，没有把“评估适用范围”列为该句重点。',
      '错误：利用检测信息不是作者此处强调的前提，先要判断信息是否可靠。',
      '错误：文章没有要求权衡检测造成的后果。',
    ],
  },
  52: {
    analysis: '只由单个基因决定的性状变量少、结果更明确，因此这类检测 comparatively reliable，选 D。',
    options: [
      '错误：遗传机制越复杂，检测越难解释，不会更可靠。',
      '错误：是否与疾病有关不是可靠性的决定条件，关键是是否由单一基因决定。',
      '错误：具体问题会影响准确性，但定位句明确给出的可靠类别是单基因性状。',
      '正确：determined by a single gene 对应 depend on a single gene。',
    ],
  },
  53: {
    analysis: '文章说大多数潜在健康问题不能仅凭基因检测识别，C 用 independently 改写 alone，并保留 majority。',
    options: [
      '错误：某些罕见遗传病恰恰可以较容易识别。',
      '错误：文章说健康受遗传与非遗传因素共同影响，不是检测无法把两类因素分开。',
      '正确：cannot independently identify 对应 cannot be identified by genetic testing alone。',
      '错误：生活方式与环境都属于非遗传因素，但文章没有说检测任务是区分二者。',
    ],
  },
  54: {
    analysis: '多因素性状涉及许多基因，而难点在于预测这些基因会怎样共同作用；B 准确改写 play together。',
    options: [
      '错误：文章强调多个基因之间的共同作用，不是逐个确定每个基因的角色。',
      '正确：foretelling how the various genes will interact 对应 predict how they will play together。',
      '错误：还需考虑环境因素，但定位句指出的核心解释难点是基因间相互作用。',
      '错误：问题不只是识别基因工作量大，而是无法可靠预测组合效果。',
    ],
  },
  55: {
    analysis: '作者把用 DNA 预测性格、天赋或完美伴侣的检测称为 pure nonsense，并说科学基础极弱或不存在，因此选 D。',
    options: [
      '错误：原文恰恰说这些应用的科学基础不存在或极其薄弱。',
      '错误：寻找完美伴侣的测试也被归入 pure nonsense。',
      '错误：do not look promising 语气仍偏保留，弱于作者明确的 pure nonsense。',
      '正确：do not make any sense 是 pure nonsense 的直接同义表达。',
    ],
  },
};

const makeQuestion = (
  number: number,
  prompt: string,
  answer: 'A' | 'B' | 'C' | 'D',
  evidence: string,
  options: readonly [string, string, string, string],
): ReadingQuestion => {
  const guidance = questionGuidance[number];
  return {
    number,
    prompt,
    answer,
    evidence,
    analysis: guidance.analysis,
    closeReading: qNote(prompt),
    options: options.map((text, index) => ({
      key: String.fromCharCode(65 + index) as 'A' | 'B' | 'C' | 'D',
      text,
      explanation: guidance.options[index],
    })),
  };
};

const passageOne = {
  title: 'Passage One · A three-star vegan restaurant',
  sentences: passageOneSentences,
  questions: [
    makeQuestion(46, "What do we learn about New York's Eleven Madison Park?", 'A', "New York's Eleven Madison Park has become the first vegan restaurant to be awarded three Michelin stars.", [
      'It is the first vegan restaurant to receive the highest Michelin rating.',
      'It is the first restaurant in the city to remove meat from its menu.',
      'It was famed throughout the U.S. for its fancy regional dishes.',
      'It was established as a three-star Michelin restaurant in 2011.',
    ]),
    makeQuestion(47, 'Why did Daniel Humm decide to remove meat from the menu of his restaurant?', 'B', "made the bold decision to remove meat from the menu, citing our unsustainable food system.", [
      'To encourage more customers to be vegan.',
      'To contribute to a sustainable food system.',
      'To show the appeal of a plant-based menu.',
      'To strive for the three-star Michelin rating.',
    ]),
    makeQuestion(48, 'What did Daniel Humm think of his move to a meat-free menu?', 'A', 'Humm acknowledged the move was risky, admitting that “it wasn’t clear if guests would come”, but called the gamble “a risk worth taking.”', [
      'It was a worthwhile effort even though he was unsure of its success.',
      'It would set a model for many more restaurants to follow.',
      'It was a mad gamble few chefs in the fine dining world would risk taking.',
      "It would prove a right step to take in today's catering business.",
    ]),
    makeQuestion(49, "What does Michelin's 2022 New York guide say about Eleven Madison Park's decision?", 'C', 'a ‘bold vision of luxury dining’.', [
      "It elevates the restaurant's cooking to an art form.",
      'It proves the validity of ratings awarded by Michelin.',
      'It shows a daring foresight regarding future fine dining.',
      'It is an effort to transform the restaurant into a luxury one.',
    ]),
    makeQuestion(50, 'What does the awarding of three Michelin stars to Eleven Madison Park indicate?', 'D', 'in a clear nod to plant-based foods’ growing significance in the culinary world.', [
      'An optimistic vision of vegan foods becoming mainstream.',
      'A greater responsibility for the culinary world to undertake.',
      'A strong incentive for more restaurants to offer healthier foods to their customers.',
      'An explicit recognition of the rising importance of restaurants serving vegan foods.',
    ]),
  ],
};

const passageTwo = {
  title: 'Passage Two · How accurate are genetic tests?',
  sentences: passageTwoSentences,
  questions: [
    makeQuestion(51, 'What does the passage say is of importance regarding genetic tests?', 'A', 'it is important to understand how accurate genetic tests are, and what information we can rely upon.', [
      'Knowing their accuracy.',
      'Evaluating their applicability.',
      'Utilizing the information they provide.',
      'Weighing the consequences they have.',
    ]),
    makeQuestion(52, 'What kind of genetic tests tend to be comparatively reliable?', 'D', 'tests for traits that depend on a single gene provide much more reliable results', [
      'Those complex enough to reveal the genetics behind a trait.',
      'Those looking for traits responsible for certain diseases.',
      'Those focusing on the specific questions being asked.',
      'Those looking for traits determined by a single gene.',
    ]),
    makeQuestion(53, 'What do we learn about genetic health tests from the passage?', 'C', 'most potential health conditions cannot be identified by genetic testing alone.', [
      'They are unable to identify certain hereditary diseases by themselves.',
      'They are generally unable to separate genetic and non-genetic factors.',
      'They cannot independently identify the majority of potential diseases.',
      'They cannot tell apart the impact of lifestyle and that of the environment.',
    ]),
    makeQuestion(54, 'What makes genetic tests for multi-factorial traits tricky to interpret?', 'B', "it's difficult to predict how they will play together.", [
      'The challenge in determining the role of each individual gene.',
      'The difficulty of foretelling how the various genes will interact.',
      'The difficulty of telling genetic factors from environmental ones.',
      'The enormous work to identify the hundreds of genes involved.',
    ]),
    makeQuestion(55, 'What does the passage say about DNA tests to predict personality or talents?', 'D', 'Tests that offer to find your perfect romantic match and those claiming to predict personality or talents based on your DNA are pure nonsense.', [
      'They are solid scientific bases for application.',
      'They are helpful in finding a romantic match.',
      'They do not look promising at the moment.',
      'They do not make any sense at present.',
    ]),
  ],
};

const closeReadings: Record<string, CloseReading> = {};
clozeSentences.forEach((sentence, index) => { closeReadings[`C${String(index + 1).padStart(2, '0')}`] = auto(sentence); });
closeReadings.C03 = note(
  '20 世纪 60 年代的环保行动促使威斯康星州参议员盖洛德·纳尔逊创立一个凝聚环保运动的全国性纪念活动。',
  [h('subject', 'Environmental activism during the 1960s'), h('predicate', 'inspired'), h('object', 'Wisconsin Senator Gaylord Nelson'), h('complement', 'to create a national celebration uniting the environmental movement', '宾语补足结构（含从句信息）')],
  [h('subject', 'Environmental activism during the 1960s'), h('predicate', 'inspired'), h('object', 'Wisconsin Senator Gaylord Nelson')],
);
matching.forEach((paragraph) => paragraph.sentences.forEach((sentence, index) => {
  closeReadings[`M-${paragraph.label}${String(index + 1).padStart(2, '0')}`] = auto(sentence);
}));
passageOneSentences.forEach((sentence, index) => { closeReadings[`R1-${String(index + 1).padStart(2, '0')}`] = auto(sentence); });
passageTwoSentences.forEach((sentence, index) => { closeReadings[`R2-${String(index + 1).padStart(2, '0')}`] = auto(sentence); });

export const cet4Reading202512Set3 = {
  cloze: { title: 'Earth Day and the environmental movement', sentences: clozeSentences, ...cet4ClozeExercise202512Set3 },
  matching: { title: 'Looking for a job after 45', paragraphs: matching, questions: cet4MatchingQuestions202512Set3 },
  passages: [passageOne, passageTwo],
};

export const cet4CloseReadings202512Set3 = closeReadings satisfies Record<string, CloseReading>;

export const cet4InlineGlossary202512Set3: InlineGlossary = {
  words: {
    ...cet4InlineGlossary202606Set2.words,
    annual: { partOfSpeech: 'adj', meaning: '每年的；一年一度的' },
    honor: { partOfSpeech: 'v / n', meaning: '表彰；给予荣誉；荣誉' },
    achievement: { partOfSpeech: 'n', meaning: '成就；成绩' },
    awareness: { partOfSpeech: 'n', meaning: '认识；意识' },
    resource: { partOfSpeech: 'n', meaning: '资源' },
    future: { partOfSpeech: 'adj / n', meaning: '未来的；将来' },
    generation: { partOfSpeech: 'n', meaning: '一代人；世代' },
    equinox: { partOfSpeech: 'n', meaning: '昼夜平分点；春分或秋分' },
    activism: { partOfSpeech: 'n', meaning: '行动主义；社会运动' },
    legislation: { partOfSpeech: 'n', meaning: '法律；立法' },
    sustainable: { partOfSpeech: 'adj', meaning: '可持续的' },
    ageism: { partOfSpeech: 'n', meaning: '年龄歧视' },
    adaptability: { partOfSpeech: 'n', meaning: '适应能力' },
    credential: { partOfSpeech: 'n', meaning: '资历；资格证书' },
    subsidy: { partOfSpeech: 'n', meaning: '补贴' },
    vegan: { partOfSpeech: 'n / adj', meaning: '纯素食者；纯素的' },
    sustainability: { partOfSpeech: 'n', meaning: '可持续性' },
    ancestry: { partOfSpeech: 'n', meaning: '祖先；血统' },
    hereditary: { partOfSpeech: 'adj', meaning: '遗传的' },
    trait: { partOfSpeech: 'n', meaning: '特征；性状' },
    rest: { partOfSpeech: 'n / v', meaning: '其余部分；剩余的人或事物；休息' },
    fit: { partOfSpeech: 'n / adj / v', meaning: '合适的人选；合适的；适合' },
    gamble: { partOfSpeech: 'n / v', meaning: '冒险之举；冒险' },
    nowhere: { partOfSpeech: 'adv / n', meaning: '毫无进展；无处' },
    setting: { partOfSpeech: 'n', meaning: '环境；场合；背景' },
    branding: { partOfSpeech: 'v', meaning: '称为；给……贴上标签' },
    reads: { partOfSpeech: 'v', meaning: '写道；内容是；阅读' },
    application: { partOfSpeech: 'n', meaning: '用途；应用；申请' },
    applications: { partOfSpeech: 'n', meaning: '用途；应用（application 的复数）' },
    bases: { partOfSpeech: 'n', meaning: '依据；基础（basis 的复数）' },
  },
  phrases: [
    { term: 'Earth Day', explanation: '地球日' },
    { term: 'United States', explanation: '美国' },
    { term: 'make up the bulk of', explanation: '构成……的大部分' },
    { term: 'turn ... on its head', explanation: '彻底扭转……' },
    { term: 'let alone', explanation: '更不用说' },
    { term: 'in view of', explanation: '鉴于；考虑到' },
    { term: 'account for', explanation: '考虑到；解释' },
    { term: 'be awarded', explanation: '被授予；获得（奖项）' },
    { term: 'take ... off the menu', explanation: '把……从菜单上撤下' },
    { term: 'plant-based', explanation: '以植物为基础的；植物性的' },
    { term: 'depend upon', explanation: '取决于；依赖于' },
    { term: 'at the moment', explanation: '目前；此刻' },
    { term: 'play together', explanation: '共同发挥作用；相互作用' },
    { term: 'based on', explanation: '基于；根据' },
    { term: 'the rest of', explanation: '其余的；剩下的' },
    { term: 'get back into work', explanation: '重返职场' },
    { term: 'make a difference', explanation: '带来改变；产生作用' },
    { term: 'out of work', explanation: '失业' },
    { term: 'turn out to be', explanation: '结果是；事实证明是' },
    { term: 'on its own', explanation: '本身；单独地' },
    { term: 'get nowhere', explanation: '毫无进展；于事无补' },
    { term: 'go to waste', explanation: '被浪费；白白损失' },
    { term: 'a risk worth taking', explanation: '值得承担的风险' },
    { term: 'open doors for', explanation: '为……创造机会' },
    { term: 'the more ... the more', explanation: '越……，就越……' },
    { term: 'pure nonsense', explanation: '纯属无稽之谈' },
    { term: 'written in the DNA', explanation: '由 DNA 所决定；写在遗传信息中' },
    { term: 'sweet deals', explanation: '很划算的优惠' },
    { term: 'take the jump', explanation: '毅然冒险一试' },
    { term: 'in this setting', explanation: '在这种环境或场合中' },
    { term: 'a nod to', explanation: '对……的认可；向……致意' },
    { term: 'have a role to play', explanation: '可以发挥作用；负有职责' },
    { term: 'family tree', explanation: '家谱' },
    { term: 'at once', explanation: '同时；立刻' },
  ],
};
const autoTranslations: Record<string, string> = {
  "Earth Day is an annual celebration that honors the achievements of the environmental movement and raises awareness of the need to protect Earth’s natural resources for future generations.": "地球日是一年一度的庆祝活动，旨在表彰环境运动的成就，并提高人们对为子孙后代保护地球自然资源的必要性的认识。",
  "Earth Day is celebrated on April 22 in the United States and on either April 22 or the day the spring equinox occurs throughout the rest of the world.": "美国于 4 月 22 日庆祝地球日，世界其他地区则于 4 月 22 日或春分日庆祝。",
  "Environmental activism during the 1960s inspired Wisconsin Senator Gaylord Nelson to create a national celebration uniting the environmental movement.": "20 世纪 60 年代的环保活动激发了威斯康星州参议员盖洛德·尼尔森 (Gaylord Nelson) 的灵感，发起了一场联合环保运动的全国性庆祝活动。",
  "With the help of Denis Hayes, a graduate student at Harvard University, Nelson organized the first Earth Day on April 22, 1970, educating participants in the importance of environmental protection.": "在哈佛大学研究生丹尼斯·海耶斯的帮助下，纳尔逊于 1970 年 4 月 22 日组织了第一个地球日，教育参与者环境保护的重要性。",
  "Attended by 20 million people across the United States, the event strengthened support for legislation such as the Clean Air Act and the Endangered Species Act.": "此次活动有全美 2000 万人参加，加强了对《清洁空气法》和《濒危物种法》等立法的支持。",
  "In 1990, Hayes organized a global Earth Day, with more than 200 million participants in 140 countries.": "1990年，海耶斯组织了全球地球日，来自140个国家的2亿多人参加。",
  "Earth Day now brings together citizens and activists from around the world to raise awareness and take action regarding such environmental concerns as global warming and renewable energy.": "地球日现在汇集了来自世界各地的公民和活动家，以提高人们对全球变暖和可再生能源等环境问题的认识并采取行动。",
  "Today, the Earth Day Network, which rallies more than 20,000 partners and organizations in 190 countries, supports the Earth Day mission year-round.": "如今，地球日网络聚集了 190 个国家的 20,000 多个合作伙伴和组织，全年支持地球日使命。",
  "This mission is founded on the proposition that all people, regardless of race, gender, income, or geography, have a moral right to a healthy, sustainable environment.": "这一使命的基础是，所有人，无论种族、性别、收入或地理位置，都享有健康、可持续环境的道德权利。",
  "The Earth Day Network pursues this mission through education, public policy, and activism campaigns.": "地球日网络通过教育、公共政策和激进主义运动来追求这一使命。",
  "Ageism and long-term unemployment are most damaging for those in the second half of their careers.": "年龄歧视和长期失业对职业生涯后半段的人造成的伤害最大。",
  "Changing careers is hard.": "改变职业很难。",
  "Getting back into work after you've been laid off is even harder.": "被解雇后重返工作岗位更加困难。",
  "Those over 45 make up the bulk of the long-term unemployed, in America and elsewhere.": "在美国和其他地方，45 岁以上的人占长期失业者的大部分。",
  "Hiring managers admit they are reluctant to hire those over 40 or 45, arguing they probably won't be a good ‘fit,’ their experience won't be relevant to the workplace, and they'll be unable or unwilling to learn new skills.": "招聘经理承认，他们不愿意雇用 40 岁或 45 岁以上的人，认为他们可能不太“适合”，他们的经验与工作场所无关，而且他们无法或不愿意学习新技能。",
  "But the one thing that can really make a difference? More education and training.": "但真正能带来改变的一件事是什么？更多的教育和培训。",
  "These are the results from a new study by Generation, a nonprofit founded by former McKinsey consultants.": "这些是由前麦肯锡顾问创立的非营利组织 Generation 的一项新研究的结果。",
  "They've just published a global survey on midcareer employment, based on surveys of over 5,000 workers and managers in seven countries.": "他们刚刚发布了一项关于职业中期就业的全球调查，该调查基于对七个国家 5,000 多名工人和管理人员的调查。",
  "Older midcareer workers make up the bulk of the long-term unemployed in many countries, Generation’s analysts write in their report.": "Generation 的分析师在报告中写道，在许多国家，年长的职业中期工人占长期失业人口的大部分。",
  "Those over 45 comprise over 40% of the long-term unemployed, for example.": "例如，45 岁以上的人占长期失业者的 40% 以上。",
  "And if you're out of work past the age of 45, there's nearly a two in three chance you'll be out of work for over a year, they find.": "他们发现，如果你在 45 岁以后失业，失业超过一年的可能性接近三分之二。",
  "Midcareer individuals are finding it harder to get jobs, they write.": "他们写道，职业中期的人发现找到工作越来越难。",
  "People age 45+ face persistent and rising pressure in the global job market.": "45 岁以上的人群在全球就业市场面临持续且不断上升的压力。",
  "They are unemployed for much longer than the average, and their age is indeed one of the greatest barriers to their finding a job.": "他们失业的时间比平均水平长得多，而且年龄确实是他们找工作的最大障碍之一。",
  "A substantial part of this, they report, is widespread ageism on the part of hiring managers.": "他们报告说，其中很大一部分原因是招聘经理普遍存在年龄歧视。",
  "Although such managers admit that post-45 hires turn out on average to be just as good as or better than younger workers, they still do not want to hire them.": "尽管这些经理承认，45 岁以后的员工平均表现与年轻员工一样好，甚至更好，但他们仍然不想雇用他们。",
  "Hiring managers have a strong perception bias against 45+ job candidates—they believe that members of this age group have poor skills and low adaptability, Generation’s analysts report.": "Generation 的分析师报告称，招聘经理对 45 岁以上的求职者有强烈的认知偏见，他们认为这个年龄段的员工技能较差，适应性较差。",
  "The survey results are remarkable.": "调查结果十分引人注目。",
  "Hiring managers are three times as likely to rate job applicants age 35–44 as a better “fit” than those over 45.": "招聘经理认为 35 至 44 岁的求职者更“适合”的可能性是 45 岁以上求职者的三倍。",
  "They rate the post-45 job seekers lower on average on all three measures—even experience—than those ages 18 to 34.": "他们对 45 岁以后求职者的所有三项指标（甚至是经验）的平均评分低于 18 至 34 岁的求职者。",
  "This is true even though nearly nine managers in 10 also said their post-45 workers were as good as or better than younger employees in the same jobs.": "尽管十分之九的经理也表示，他们的 45 岁以后的员工与从事相同工作的年轻员工一样好，甚至更好，但情况确实如此。",
  "Their biggest fears about hiring those over 45?": "他们对于雇用 45 岁以上的人最担心的是什么？",
  "Managers said they worry that older hires will be reluctant to try new technologies, and will be unable to learn new skills.": "经理们表示，他们担心老员工不愿意尝试新技术，并且无法学习新技能。",
  "Besides, the majority of hiring managers are under 45—and seem reluctant to hire people older than themselves.": "此外，大多数招聘经理都在 45 岁以下，而且似乎不愿意雇用比自己年长的人。",
  "But here’s the good news.": "但这里有个好消息。",
  "Older workers who’ve actively engaged in more education and training relevant to their jobs turn this pretty much on its head.": "积极参与更多与工作相关的教育和培训的老年工人在很大程度上扭转了这一局面。",
  "Three-quarters of hiring managers said they’d be more likely to hire an over-45 who had relevant education, training or credentials.": "四分之三的招聘经理表示，他们更有可能雇用 45 岁以上且拥有相关教育、培训或证书的人。",
  "Among those over 45 who’d successfully switched careers, 74% said training helped them get their new job.": "在 45 岁以上成功转行的人中，74% 的人表示培训帮助他们找到了新工作。",
  "Midcareer switchers overwhelmingly say that training enabled them to shift to a new career path, the analysts write.": "分析师写道，绝大多数职业中期转换者表示，培训使他们能够转向新的职业道路。",
  "And when they asked over-45 candidates about their attitudes, they found that those who are excited by training are unemployed for less time, receive more job offers, and are more satisfied by the job offers they receive.": "当他们询问 45 岁以上的求职者的态度时，他们发现那些对培训感到兴奋的人失业时间更少，收到的工作机会更多，并且对收到的工作机会更满意。",
  "Hiring managers said training was three times more likely to get them to hire applicants over age 45 than, say, government subsidies.": "招聘经理表示，培训让他们雇用 45 岁以上申请人的可能性是政府补贴的三倍。",
  "What training are we talking about?": "我们在谈论什么培训？",
  "Obviously it depends on the job.": "显然这取决于工作。",
  "And, yes, managers are most likely to be impressed by industry qualifications you get in school.": "是的，经理们最有可能会对你在学校获得的行业资格印象深刻。",
  "These things cost money, and time.": "这些事情需要金钱和时间。",
  "But these aren’t the only things helpful.": "但这些并不是唯一有用的东西。",
  "Those who had successfully changed careers after 45 told Generation that education and training had been a big help—and that included in-person, on-the-job training, informal learning, and online courses—with or without certification.": "那些在 45 岁以后成功转行的人告诉非营利组织 Generation，教育和培训帮了大忙；这既包括面授和在职培训，也包括非正式学习以及有无证书均可的在线课程。",
  "If they think we’re too old to learn new skills after we’re 45, just learning some new skills may have an effect on its own.": "如果他们认为 45 岁以后我们太老了，无法学习新技能，那么仅仅学习一些新技能可能会产生效果。",
  "There’s a downside to this.": "这有一个缺点。",
  "The people least interested in retraining are more likely to come from historically disadvantaged communities, more likely to have low incomes, and are more likely to have the least schooling after getting their high-school diploma or earlier.": "对再培训最不感兴趣的人更有可能来自历史上处于不利地位的社区，更有可能收入较低，并且更有可能在获得高中文凭或更早之后受的教育最少。",
  "On average, post-45 job switchers with higher incomes participate in 2.5 training programs each.": "平均而言，45岁以后收入较高的跳槽者每人参加2.5个培训项目。",
  "Those with lower incomes: 0.9 programs on average.": "收入较低者：平均 0.9 个项目。",
  "Many years ago, I wrote about a study which found that employers are much more likely to hire a college graduate who has some work experience in the industry than a college graduate who took the “right” degree.": "许多年前，我写过一项研究，发现雇主更有可能雇用在该行业有一定工作经验的大学毕业生，而不是获得“正确”学位的大学毕业生。",
  "A bank is more likely to hire a literature graduate who spent their summers working in their local bank than a finance or economics graduate who spent their summers surfing or traveling around Italy.": "银行更有可能雇用暑假在当地银行工作的文学毕业生，而不是暑假在意大利冲浪或旅行的金融或经济学毕业生。",
  "They’ve learned through long experience.": "长期经验让雇主明白了这一点。",
  "The person who worked in the bank is more likely ready, willing and able to be part of the team and do the job from day 1.": "在银行工作的人更有可能准备好、愿意并且能够成为团队的一员并从第一天开始完成工作。",
  "We can rail against ageism all we like.": "我们可以随心所欲地反对年龄歧视。",
  "It gets us nowhere.": "但这于事无补。",
  "And it’s easy to forget that employers, like everyone else, are under time pressure and are just trying to solve problems.": "人们很容易忘记，雇主和其他人一样，也面临着时间压力，只是想解决问题。",
  "Any and all training, including inexpensive and informal training, is going to help resolve their worries about hiring someone over 45.": "任何和所有培训，包括廉价和非正式的培训，都将有助于解决他们对雇用 45 岁以上员工的担忧。",
  "And it has never been easier or cheaper to gain instruction in new skills, thanks to the internet.": "借助互联网，获得新技能的指导从未如此简单或便宜。",
  "Online schools like Udemy and Lynda.com offer sweet deals at sign-up.": "Udemy 和 Lynda.com 等在线学校在注册时提供超值优惠。",
  "And courses on YouTube are free.": "YouTube 上的课程是免费的。",
  "Bottom line? Yes, it really can be difficult getting a new job after age 45, let alone changing careers.": "说到底，45 岁以后重新找工作确实很难，更不用说转行了。",
  "One of the best things we can do to help ourselves is to go online and learn new, relevant skills.": "我们能做的最好的帮助自己的事情之一就是上网学习新的相关技能。",
  "Sadly, the people who most need the help are least likely to take it—which raises a challenge for society as a whole.": "可悲的是，最需要帮助的人却最不可能接受帮助——这给整个社会带来了挑战。",
  "Not only do we not want to see lives go to waste, but we all benefit if more people are working and fewer are unemployed.": "我们不仅不想看到生命被浪费，而且如果更多的人工作、更少的失业者，我们都会受益。",
  "New York's Eleven Madison Park has become the first vegan restaurant to be awarded three Michelin stars.": "纽约麦迪逊公园十一号成为第一家获得米其林三颗星的纯素餐厅。",
  "The fine dining establishment received its first three-star Michelin rating in 2011 when the menu was famed for its fancy animal-based dishes.": "这家高级餐厅于 2011 年首次获得米其林三星级评级，当时的菜单以其精美的动物菜肴而闻名。",
  "However, last year, the restaurant's co-owner and famous chef, Daniel Humm, made the bold decision to remove meat from the menu, citing our unsustainable food system.": "然而，去年，该餐厅的合伙人兼著名厨师丹尼尔·哈姆 (Daniel Humm) 做出了大胆的决定，将肉类从菜单中删除，理由是我们的食品系统不可持续。",
  "While cow milk is still served for tea and coffee, the menu is almost 100 percent vegan.": "虽然茶和咖啡仍然使用牛奶，但菜单几乎是 100% 纯素食。",
  "At the time, Humm acknowledged the move was risky, admitting that “it wasn’t clear if guests would come”, but called the gamble “a risk worth taking.”": "当时，Humm 承认此举风险不小，也不确定顾客是否还会光顾，但他认为这次冒险值得一试。",
  "“In view of the climate crisis, I didn’t want to open the same restaurant,” Humm told the Financial Times in an interview.": "“鉴于气候危机，我不想再开同一家餐厅，”胡姆在接受英国《金融时报》采访时表示。",
  "“If we can show the possibilities of eating plant-based food in this setting, it can open a lot of doors” for others to follow.": "“如果我们能够展示在这种情况下食用植物性食品的可能性，它可以为其他人效仿打开很多大门”。",
  "Now, this impressive new accomplishment validates Eleven Madison Park's decision to take meat off the menu and embrace plant-based foods, with Michelin's 2022 New York guide branding it a ‘bold vision of luxury dining’.": "现在，这一令人印象深刻的新成就证实了麦迪逊公园十一号将肉类从菜单上剔除并采用植物性食品的决定，米其林 2022 年纽约指南将其称为“奢华餐饮的大胆愿景”。",
  "“We took the jump to transform Eleven Madison Park into a plant-based fine dining restaurant knowing in our hearts this is what we believed in,” stated Humm on Instagram.": "Humm 在 Instagram 上表示：“我们决定将麦迪逊公园十一号改造成一家以植物为主的高级餐厅，因为我们心里知道这是我们的信念。”",
  "“Last night, we were honored to be awarded three Michelin stars for the 11th year in a row.": "“昨晚，我们很荣幸连续 11 年荣获米其林三颗星。",
  "I am so grateful to the team members who contributed through its nearly 25-year history.": "我非常感谢在其近 25 年的历史中做出贡献的团队成员。",
  "We are also grateful to our guests and partners who believed in our vision and encouraged us to push harder.”": "我们还要感谢相信我们愿景并鼓励我们更加努力的客人和合作伙伴。”",
  "Three Michelin stars is the highest award, given to chefs who are at the peak of their profession.": "米其林三颗星是最高奖项，颁发给处于职业巅峰的厨师。",
  "“Their cooking is elevated to an art form and some of their dishes are destined to become classics,” reads Michelin’s website, in a clear nod to plant-based foods’ growing significance in the culinary world.": "米其林的网站上写道：“他们的烹饪被提升为一种艺术形式，他们的一些菜肴注定会成为经典。”这显然是对植物性食品在烹饪界日益重要的认可。",
  "“I think luxury companies have a real role to play and a responsibility,” says Humm.": "“我认为奢侈品公司可以发挥真正的作用并承担责任，”胡姆说。",
  "“The more creative we are, the more beautiful and delicious our future will be.”": "“我们越有创意，我们的未来就会越美丽、越美味。”",
  "With genetic testing becoming increasingly popular, many people are left wondering exactly how accurate it is.": "随着基因测试变得越来越流行，许多人都想知道它的准确性到底有多高。",
  "Whether you are taking a DNA test to build your extended DNA family tree, or want precise information on inborn health conditions, it is important to understand how accurate genetic tests are, and what information we can rely upon.": "无论是想用 DNA 检测扩展家谱，还是想准确了解先天健康状况，都必须先弄清基因检测有多准确、哪些信息值得信赖。",
  "How accurate DNA tests are relies greatly upon the kind of test being taken, on the specific question you ask, and on how complex the genetics behind a trait is.": "DNA 检测的准确程度，很大程度上取决于检测类型、所问的具体问题，以及某种性状背后的遗传机制有多复杂。",
  "For example, tests for traits that depend on a single gene provide much more reliable results, because you can see whether a disease-causing trait is present.": "例如，由单个基因决定的性状检测要可靠得多，因为可以直接判断致病性状是否存在。",
  "Ancestry tests claim to reveal our genetic identities.": "祖源检测声称能够揭示我们的遗传身份。",
  "But saying you are 30 percent East Asian or American hardly reflects your real ancestry.": "但说你有 30% 的东亚人或美国人血统并不能反映你的真实血统。",
  "What about using DNA tests to discover distant family members?": "那么，用 DNA 检测寻找远亲是否可靠呢？",
  "There are tools to compare one's DNA with others' to find distant relatives based on their genetic identification.": "有一些工具可以将一个人的 DNA 与他人的 DNA 进行比较，从而根据基因鉴定来寻找远亲。",
  "These kinds of applications are generally accurate.": "这类用途通常比较准确。",
  "It's relatively easy to tell whether two DNA samples belong to close relatives.": "判断两个 DNA 样本是否属于近亲相对容易。",
  "With distant relatives, results become hazier.": "对于远房亲戚，结果变得更加模糊。",
  "Genetic health tests claim to be able to detect certain hereditary diseases, or other health conditions.": "基因健康测试声称能够检测某些遗传性疾病或其他健康状况。",
  "While certain rare diseases can be easily identified, most potential health conditions cannot be identified by genetic testing alone.": "虽然某些罕见疾病很容易识别，但大多数潜在的健康状况无法仅通过基因检测来识别。",
  "The large majority of our traits and diseases also depend upon non-genetic factors, such as lifestyle, the environment, and many others.": "我们的绝大多数特征和疾病也取决于非遗传因素，例如生活方式、环境等。",
  "Genetic tests for multi-factorial traits are often very tricky to interpret.": "多因素性状的基因测试通常很难解释。",
  "Height, for example, depends on hundreds of genes, each contributing a little to the outcome, together with a bunch of environmental factors.": "例如，身高取决于数百个基因，每个基因都对结果有一点贡献，再加上一系列环境因素。",
  "A test can look at many genes at once, but it's difficult to predict how they will play together.": "测试可以同时检查许多基因，但很难预测它们将如何共同发挥作用。",
  "Then you should also account for non-genetic factors that are not written in the DNA.": "此外，还必须考虑那些不会写在 DNA 里的非遗传因素。",
  "Tests that offer to find your perfect romantic match and those claiming to predict personality or talents based on your DNA are pure nonsense.": "那些旨在寻找完美爱情伴侣的测试以及那些声称根据 DNA 预测性格或才能的测试纯粹是无稽之谈。",
  "At the moment, the scientific bases for these applications are non-existent or incredibly weak.": "目前，这些用途要么毫无科学依据，要么依据极其薄弱。"
};
clozeSentences.forEach((sentence, index) => { const key = `C${String(index + 1).padStart(2, '0')}`; closeReadings[key].translation = autoTranslations[sentence] ?? closeReadings[key].translation; });
matching.forEach((paragraph) => paragraph.sentences.forEach((sentence, index) => { const key = `M-${paragraph.label}${String(index + 1).padStart(2, '0')}`; closeReadings[key].translation = autoTranslations[sentence] ?? closeReadings[key].translation; }));
passageOneSentences.forEach((sentence, index) => { const key = `R1-${String(index + 1).padStart(2, '0')}`; closeReadings[key].translation = autoTranslations[sentence] ?? closeReadings[key].translation; });
passageTwoSentences.forEach((sentence, index) => { const key = `R2-${String(index + 1).padStart(2, '0')}`; closeReadings[key].translation = autoTranslations[sentence] ?? closeReadings[key].translation; });

Object.assign(closeReadings, {
  C08: note('如今，地球日网络在 190 个国家联合两万多个合作伙伴和组织，全年持续推动地球日使命。', [h('adverbial', 'Today'), h('subject', 'the Earth Day Network'), h('complement', 'which rallies more than 20,000 partners and organizations in 190 countries', '定语从句（整体）'), h('predicate', 'supports'), h('object', 'the Earth Day mission'), h('adverbial', 'year-round')], [h('subject', 'the Earth Day Network'), h('predicate', 'supports'), h('object', 'the Earth Day mission'), h('adverbial', 'year-round')], [['rally', '召集；联合'], ['year-round', '全年；一年到头']]),
  'M-A03': note('被裁员后重返职场更加困难。', [h('subject', "Getting back into work after you've been laid off"), h('predicate', 'is'), h('complement', 'even harder')]),
  'M-B01': note('但真正能改变局面的关键是什么？更多的教育和培训。', [h('adverbial', 'But'), h('subject', 'the one thing that can really make a difference'), h('complement', 'More education and training', '省略式回答')], undefined, [['make a difference', '带来改变；产生作用']]),
  'M-C03': note('如果 45 岁以后失业，你有将近三分之二的可能会失业超过一年。', [h('adverbial', "And if you're out of work past the age of 45", '条件状语从句'), h('subject', 'there'), h('predicate', "'s"), h('complement', "nearly a two in three chance you'll be out of work for over a year")], [h('subject', 'there'), h('predicate', "'s"), h('complement', "nearly a two in three chance you'll be out of work for over a year")]),
  'M-C02': note('例如，45 岁以上的人占长期失业者的 40% 以上。', [h('subject', 'Those over 45'), h('predicate', 'comprise'), h('object', 'over 40% of the long-term unemployed')]),
  'M-D01': note('他们报告称，这一现象很大程度上源于招聘经理普遍存在的年龄歧视。', [h('subject', 'A substantial part of this'), h('complement', 'they report', '插入说明'), h('predicate', 'is'), h('complement', 'widespread ageism on the part of hiring managers')], [h('subject', 'A substantial part of this'), h('predicate', 'is'), h('complement', 'widespread ageism on the part of hiring managers')], [['on the part of', '就……而言；来自……一方']]),
  'M-D02': note('尽管经理们承认，45 岁以上的新员工平均表现不逊于、甚至优于年轻员工，他们仍不愿雇用这些人。', [h('adverbial', 'Although such managers admit that post-45 hires turn out on average to be just as good as or better than younger workers', '让步状语从句'), h('subject', 'they'), h('predicate', 'still do not want'), h('object', 'to hire them')], [h('subject', 'they'), h('predicate', 'still do not want'), h('object', 'to hire them')], [['turn out to be', '结果是；事实证明是']]),
  'M-F01': note('他们在雇用 45 岁以上的人时最大的担忧是什么？', [h('subject', 'Their biggest fears about hiring those over 45')]),
  'M-G01': note('但这里有个好消息。', [h('adverbial', 'But'), h('subject', 'the good news'), h('predicate', 'here’s')]),
  'M-G04': note('在 45 岁以后成功转行的人中，74% 表示培训帮助他们获得了新工作。', [h('adverbial', 'Among those over 45 who’d successfully switched careers'), h('subject', '74%'), h('predicate', 'said'), h('object', 'training helped them get their new job', '宾语从句（整体）')], [h('subject', '74%'), h('predicate', 'said')], [['switch careers', '转行；转换职业']]),
  'M-I02': note('这里所说的培训究竟是什么？', [h('object', 'What training', '疑问宾语'), h('predicate', 'are'), h('subject', 'we'), h('predicate', 'talking about')], undefined, [['talk about', '谈论；所指的是']]),
  'M-I06': note('但这些并不是唯一有帮助的东西。', [h('adverbial', 'But'), h('subject', 'these'), h('predicate', 'aren’t'), h('complement', 'the only things helpful')]),
  'M-I07': note('那些在 45 岁以后成功转行的人告诉非营利组织 Generation，教育和培训帮了大忙；其中既包括面授和在职培训，也包括非正式学习和在线课程。', [h('subject', 'Those who had successfully changed careers after 45'), h('predicate', 'told'), h('object', 'Generation'), h('object', 'that education and training had been a big help', '宾语从句（整体）'), h('complement', 'and that included in-person, on-the-job training, informal learning, and online courses—with or without certification', '并列补充')], [h('subject', 'Those who had successfully changed careers after 45'), h('predicate', 'told'), h('object', 'Generation')], [['Generation', '非营利组织 Generation'], ['on-the-job training', '在职培训'], ['with or without', '无论有无']]),
  'M-J01': note('如果他们认为我们 45 岁以后太老、学不会新技能，那么单是学会一些新技能本身就可能改变他们的看法。', [h('adverbial', 'If they think we’re too old to learn new skills after we’re 45', '条件状语从句'), h('subject', 'just learning some new skills'), h('predicate', 'may have'), h('object', 'an effect'), h('adverbial', 'on its own')], [h('subject', 'just learning some new skills'), h('predicate', 'may have'), h('object', 'an effect')], [['on its own', '单独地；本身']]),
  'M-J02': note('这也有一个缺点。', [h('subject', 'There'), h('predicate', 'is'), h('complement', 'a downside to this')]),
  'M-J05': note('收入较低的人平均参加 0.9 个培训项目。', [h('subject', 'Those with lower incomes'), h('complement', '0.9 programs on average', '省略式回答')]),
  'M-K03': note('长期经验让雇主明白了这一点。', [h('subject', 'They'), h('predicate', 'learned'), h('complement', 'through long experience')], undefined, [['through long experience', '通过长期经验']]),
  'M-L03': note('人们很容易忘记，雇主和其他人一样面临时间压力，也只是想解决问题。', [h('subject', 'it'), h('predicate', "'s easy"), h('object', 'to forget that employers, like everyone else, are under time pressure and are just trying to solve problems', '真正主语及宾语从句（整体）')], [h('subject', 'it'), h('predicate', "'s easy")], [['under time pressure', '面临时间压力']]),
  'M-L01': note('我们尽可以大力抨击年龄歧视。', [h('subject', 'We'), h('predicate', 'can rail'), h('complement', 'against ageism'), h('adverbial', 'all we like')], undefined, [['rail against', '强烈抨击；抱怨']]),
  'M-L05': note('借助互联网，获得新技能的指导从未如此简单或便宜。', [h('adverbial', 'thanks to the internet'), h('subject', 'it'), h('predicate', 'has never been easier or cheaper'), h('complement', 'to gain instruction in new skills')], [h('subject', 'it'), h('predicate', 'has never been easier or cheaper')]),
  'M-M01': note('说到底，45 岁以后重新找工作确实可能很难，更不用说转行了。', [h('complement', 'Bottom line', '话题提示'), h('subject', 'it'), h('predicate', 'really can be'), h('complement', 'difficult'), h('subject', 'getting a new job after age 45'), h('complement', 'let alone changing careers')], [h('subject', 'it'), h('predicate', 'really can be'), h('complement', 'difficult'), h('subject', 'getting a new job after age 45')], [['bottom line', '归根结底；说到底'], ['let alone', '更不用说']]),
  'M-M03': note('遗憾的是，最需要帮助的人反而最不可能接受帮助，这给整个社会提出了挑战。', [h('adverbial', 'Sadly'), h('subject', 'the people'), h('complement', 'who most need the help', '定语从句（整体）'), h('predicate', 'are least likely'), h('complement', 'to take it'), h('complement', 'which raises a challenge for society as a whole', '非限制性定语从句（整体）')], [h('subject', 'the people'), h('predicate', 'are least likely'), h('complement', 'to take it')], [['be likely to', '可能做某事'], ['as a whole', '作为一个整体']]),
  'M-M04': note('我们不仅不愿看到人生被白白浪费；如果就业者更多、失业者更少，所有人都会受益。', [h('predicate', 'do', '倒装助动词'), h('subject', 'we'), h('predicate', 'not want', '实义谓语'), h('object', 'to see lives go to waste'), h('subject', 'we'), h('predicate', 'benefit'), h('adverbial', 'if more people are working and fewer are unemployed', '条件状语从句')], [h('predicate', 'do', '倒装助动词'), h('subject', 'we'), h('predicate', 'not want', '实义谓语'), h('object', 'to see lives go to waste'), h('subject', 'we'), h('predicate', 'benefit')], [['not only ... but', '不仅……而且……'], ['go to waste', '被浪费；白白损失']]),
  'R1-03': note('然而，餐厅合伙人兼名厨 Daniel Humm 去年作出大胆决定，以食品体系不可持续为由，从菜单中撤下肉类。', [h('adverbial', 'However, last year'), h('subject', "the restaurant's co-owner and famous chef, Daniel Humm"), h('predicate', 'made'), h('object', 'the bold decision to remove meat from the menu'), h('complement', 'citing our unsustainable food system', '分词原因补充')], [h('subject', "the restaurant's co-owner and famous chef, Daniel Humm"), h('predicate', 'made'), h('object', 'the bold decision to remove meat from the menu')], [['cite', '援引；以……为理由']]),
  'R1-05': note('当时，Humm 承认此举风险不小，也不确定顾客是否还会光顾，但他认为这次冒险值得一试。', [h('adverbial', 'At the time'), h('subject', 'Humm'), h('predicate', 'acknowledged'), h('object', 'the move was risky', '宾语从句（整体）'), h('complement', 'admitting that “it wasn’t clear if guests would come”', '分词补充'), h('predicate', 'called'), h('object', 'the gamble'), h('complement', '“a risk worth taking.”')], [h('subject', 'Humm'), h('predicate', 'acknowledged'), h('predicate', 'called'), h('object', 'the gamble'), h('complement', '“a risk worth taking.”')], [['a risk worth taking', '值得承担的风险']]),
  'R1-06': note('Humm 接受《金融时报》采访时说：“鉴于气候危机，我不想继续经营原来那样的餐厅。”', [h('adverbial', 'In view of the climate crisis'), h('subject', 'I'), h('predicate', 'didn’t want'), h('object', 'to open the same restaurant'), h('subject', 'Humm'), h('predicate', 'told'), h('object', 'the Financial Times'), h('adverbial', 'in an interview')], [h('subject', 'I'), h('predicate', 'didn’t want'), h('object', 'to open the same restaurant')], [['in view of', '鉴于；考虑到']]),
  'R1-07': note('“如果我们能在这样的高级餐饮环境中展示植物性饮食的可能性，就能为其他人打开许多扇门，让他们跟进。”', [h('adverbial', 'If we can show the possibilities of eating plant-based food in this setting', '条件状语从句'), h('subject', 'it'), h('predicate', 'can open'), h('object', 'a lot of doors'), h('complement', 'for others to follow')], [h('subject', 'it'), h('predicate', 'can open'), h('object', 'a lot of doors'), h('complement', 'for others to follow')], [['open doors for', '为……创造机会']]),
  'R1-16': note('我们越有创造力，未来就会越美好、越可口。', [h('adverbial', 'The more creative we are', '比较状语从句'), h('subject', 'our future'), h('predicate', 'will be'), h('complement', 'the more beautiful and delicious')], [h('subject', 'our future'), h('predicate', 'will be'), h('complement', 'the more beautiful and delicious')], [['the more ..., the more ...', '越……，就越……']]),
  'R2-02': note('无论是想用 DNA 检测扩展家谱，还是想准确了解先天健康状况，都必须先弄清基因检测有多准确、哪些信息值得信赖。', [h('adverbial', 'Whether you are taking a DNA test to build your extended DNA family tree, or want precise information on inborn health conditions', '让步选择从句'), h('subject', 'it'), h('predicate', 'is'), h('complement', 'important'), h('object', 'to understand how accurate genetic tests are, and what information we can rely upon', '真正主语（整体）')], [h('subject', 'it'), h('predicate', 'is'), h('complement', 'important')], [['rely upon', '依赖；信赖']]),
  'R2-03': note('DNA 检测的准确程度，很大程度上取决于检测类型、所问的具体问题，以及性状背后的遗传机制有多复杂。', [h('subject', 'How accurate DNA tests are', '主语从句（整体）'), h('predicate', 'relies'), h('complement', 'greatly upon the kind of test being taken, on the specific question you ask, and on how complex the genetics behind a trait is')], [h('subject', 'How accurate DNA tests are', '主语从句（整体）'), h('predicate', 'relies'), h('complement', 'greatly upon the kind of test being taken, on the specific question you ask, and on how complex the genetics behind a trait is')], [['rely upon', '取决于；依赖于']]),
  'R2-04': note('例如，对由单个基因决定的性状进行测试，可以提供更可靠的结果，因为你能看出致病性状是否存在。', [h('subject', 'tests for traits that depend on a single gene'), h('predicate', 'provide'), h('complement', 'much more reliable results'), h('adverbial', 'because you can see whether a disease-causing trait is present', '原因状语从句')], [h('subject', 'tests for traits that depend on a single gene'), h('predicate', 'provide'), h('complement', 'much more reliable results')]),
  'R2-06': note('但声称自己有 30% 的东亚或美洲血统，很难真实反映祖源。', [h('subject', 'saying you are 30 percent East Asian or American'), h('predicate', 'hardly reflects'), h('object', 'your real ancestry')], undefined, [['hardly', '几乎不'], ['ancestry', '祖源；血统']]),
  'R2-07': note('那么，用 DNA 检测寻找远亲是否可靠呢？', [h('complement', 'What about using DNA tests to discover distant family members', '省略式疑问')], undefined, [['what about doing', '做……怎么样；那么……呢']]),
  'R2-13': note('虽然某些罕见疾病很容易识别，但大多数潜在健康问题不能仅凭基因检测确定。', [h('adverbial', 'While certain rare diseases can be easily identified', '让步状语从句'), h('subject', 'most potential health conditions'), h('predicate', 'cannot be identified'), h('complement', 'by genetic testing alone')], [h('subject', 'most potential health conditions'), h('predicate', 'cannot be identified'), h('complement', 'by genetic testing alone')], [['by ... alone', '仅凭……']]),
  'R2-17': note('一项检测可以同时查看许多基因，但很难预测它们会如何共同作用。', [h('subject', 'A test'), h('predicate', 'can look'), h('complement', 'at many genes at once'), h('subject', 'it'), h('predicate', "'s difficult"), h('object', 'to predict how they will play together', '真正主语及宾语从句（整体）')], [h('subject', 'A test'), h('predicate', 'can look'), h('complement', 'at many genes at once'), h('subject', 'it'), h('predicate', "'s difficult")], [['at once', '同时'], ['play together', '共同作用；相互作用']]),
  'R2-18': note('此外，还必须考虑那些不会写在 DNA 里的非遗传因素。', [h('adverbial', 'Then'), h('subject', 'you'), h('predicate', 'should also account'), h('complement', 'for non-genetic factors that are not written in the DNA')], undefined, [['account for', '把……考虑在内']]),
  'R2-19': note('那些声称能寻找完美恋爱对象、或根据 DNA 预测性格和才能的检测，纯粹是无稽之谈。', [h('subject', 'Tests that offer to find your perfect romantic match and those claiming to predict personality or talents based on your DNA'), h('predicate', 'are'), h('complement', 'pure nonsense')]),
});

for (const key of ['M-B02', 'M-C01', 'M-D03']) {
  closeReadings[key].vocabulary.unshift({ term: 'Generation', explanation: '非营利组织 Generation' });
}
