import type { CloseReading, InlineGlossary } from '../types/closeReading';
import type { ReadingQuestion } from '../types/readingQuestion';
import { cet4InlineGlossary202606Set2 } from './cet4InlineGlossary202606Set2';
import { describeReadingStructure, readingStructurePattern } from './describeReadingStructure';
import {
  cet4ClozeExercise202512Set2,
  cet4MatchingQuestions202512Set2,
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
  ASMR: '自主感觉经络反应', dementia: '痴呆；失智症', manageable: '可控制的', résumé: '简历', aptitude: '天赋；才能',
  transferable: '可迁移的', rebelliousness: '叛逆性', autonomy: '自主权', intervention: '干预；介入', trauma: '创伤', nightmare: '噩梦',
  manipulate: '操纵；控制', deceptive: '欺骗性的', processed: '加工的', obesity: '肥胖', appealing: '有吸引力的',
  gaming: '玩电子游戏；游戏活动', workplace: '工作场所', resource: '资源', leadership: '领导力', physicist: '物理学家',
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
  'What do we learn about advertising campaigns from the snack food companies?': note('关于零食公司的广告活动，我们能了解到什么？', [h('object', 'What', '疑问宾语'), h('predicate', 'do', '助动词'), h('subject', 'we'), h('predicate', 'learn', '实义谓语'), h('complement', 'about advertising campaigns from the snack food companies')]),
  'What does the passage say about health education?': note('文章对健康教育有何评价？', [h('object', 'What', '疑问宾语'), h('predicate', 'does', '助动词'), h('subject', 'the passage'), h('predicate', 'say', '实义谓语'), h('complement', 'about health education')]),
  'What is a major flaw in previous interventions to help reduce junk food consumption?': note('以往减少垃圾食品消费的干预措施有什么主要缺陷？', [h('complement', 'What', '疑问表语'), h('predicate', 'is'), h('subject', 'a major flaw in previous interventions to help reduce junk food consumption')]),
  'In what way is the new intervention innovative?': note('新的干预措施创新在什么地方？', [h('adverbial', 'In what way', '方式疑问'), h('predicate', 'is'), h('subject', 'the new intervention'), h('complement', 'innovative')]),
  'What conclusion can be drawn from the new research?': note('可以从这项新研究中得出什么结论？', [h('subject', 'What conclusion'), h('predicate', 'can be drawn'), h('complement', 'from the new research')]),
  'What do scientists think of REM?': note('科学家如何看待快速眼动睡眠？', [h('object', 'What', '疑问宾语'), h('predicate', 'do', '助动词'), h('subject', 'scientists'), h('predicate', 'think', '实义谓语'), h('complement', 'of REM')]),
  'What can we infer about nightmares from the passage?': note('关于噩梦，我们能从文章中推断出什么？', [h('object', 'What', '疑问宾语'), h('predicate', 'can', '情态助动词'), h('subject', 'we'), h('predicate', 'infer', '实义谓语'), h('complement', 'about nightmares from the passage')]),
  'What is the aim of psychologist David Foulkes’ study?': note('心理学家 David Foulkes 的研究目的是什么？', [h('complement', 'What', '疑问表语'), h('predicate', 'is'), h('subject', 'the aim of psychologist David Foulkes’ study')]),
  'What are Foulkes’ findings about kids’ dreams?': note('Foulkes 对儿童梦境的研究发现是什么？', [h('complement', 'What', '疑问表语'), h('predicate', 'are'), h('subject', 'Foulkes’ findings about kids’ dreams')]),
  'What can we assume about babies who appear upset upon waking?': note('对于醒来时显得不安的婴儿，我们可以作出什么判断？', [h('object', 'What', '疑问宾语'), h('predicate', 'can', '情态助动词'), h('subject', 'we'), h('predicate', 'assume', '实义谓语'), h('complement', 'about babies who appear upset upon waking')]),
};

const qNote = (prompt: string) => questionNotes[prompt]
  ?? note('题干：' + prompt, [h('subject', firstWords(prompt)[0] ?? prompt), h('predicate', firstWords(prompt)[1] ?? 'asks')]);

const clozeSentences = [
  "Some music inspires you to move your feet, some inspires you to get out there and change the world. In any case, it's fair to say that music moves people in special ways.",
  "If you're especially into a piece of music, your brain does something called Autonomous Sensory Meridian Response (ASMR), which feels to you like a sting in your brain.",
  "It turns out that ASMR is pretty special. According to a recently published study in The Journal of Prevention of Alzheimer's Disease, the part of your brain responsible for ASMR doesn't get lost to Alzheimer's.",
  "Alzheimer's tends to put people into layers of confusion, and the study confirms that music can sometimes actually lift people out of the Alzheimer's haze and bring them back to (at least a likeness of) normality... if only for a short while.",
  'ASMR is powerful stuff!',
  'This phenomenon has been observed several times but rarely studied properly.',
  'One of the most famous examples of this is the story of 92-year-old Henry Dryer, who comes out of dementia (痴呆) while listening to songs from his youth.',
  'Jeff Anderson, associate professor in Radiology at the University of Utah and contributing author on the study, says “In our society, the diagnoses of dementia are taxing resources to the maximum.”',
];
clozeSentences.push('No one says playing music will be a cure for Alzheimer\'s disease, but it might make the symptoms more manageable.');

clozeSentences[clozeSentences.length - 1] = 'No one says playing music will be a cure for Alzheimer' + String.fromCharCode(39) + 's disease, but it might make the symptoms more manageable, decrease the cost of care and improve a patient' + String.fromCharCode(39) + 's quality of life.';

const matchingSentences: Record<string, string[]> = {
  A: [
    'The gaming industry is larger than films and music combined, yet few of us are likely to list our achievements in playing computer games as work experience in our résumé.',
    'But why not?',
    'Businesses are waking up to the skills gamers can bring to the workplace.',
  ],
  B: [
    'One start-up is convinced that the skills learned by playing games—hard-won through years of training and battle—can be applied to real-life work situations.',
    'And Game Academy reckons its belief is backed up by hard data.',
    'Do you enjoy unusual puzzle games like Portal, or tower defence games like Defense Grid?',
    'The team has found that IT workers play those more than average.',
    'But if you prefer Civilization, Total War, or X-Com, where strategy and resource management are key, then you might have more in common with managers.',
  ],
  C: [
    "Game Academy's idea is simple: analyse gamers' habits from their online gaming profile, and offer courses in valuable skills that reflect their aptitudes—skills they can practise and refine in-game.",
    'And there is already a growing acceptance that gaming skills are transferable.',
  ],
  D: [
    'Even the military is hiring gamers.',
    '“The ability to absorb information, react swiftly and coordinate actions whilst remaining calm under pressure are often attributes of people that are good at gaming,” according to a Royal Air Force spokesperson.',
    'Those skills are part of what the Royal Air Force is looking for “in a variety of roles”.',
    '“Skills acquired through gaming can be very relevant to certain areas.”',
  ],
  E: [
    'There are plenty of soft skills that gamers can utilise in a professional setting, such as teamwork, problem solving and strategic planning, says Ryan Gardner, a regional director with Hays recruitment.',
    'But does that really mean your top 100 ranking in Overwatch should go down in your résumé?',
    'It is about how you either make it relevant to the job you are applying for, or how it makes you more interesting as a potential employee, Mr. Gardner says.',
  ],
  F: [
    'Two years ago, a Glasgow University study made headlines for suggesting gaming could make students more successful.',
    'But the research has not really changed minds, at least not yet, says one of the authors of the study, Dr. Matthew Barr.',
    "For now, I think the negative reputation around games means that telling someone you're a determined gamer is more likely to harm your chances of getting a job.",
    'But if someone can explain how they have led a team in an online game, for example, they may be able to persuade an employer that this is useful, says Dr Barr.',
  ],
  G: [
    'Playing games casually is unlikely to help your career prospects.',
    'But part of Game Academy’s suggestion is to transform casual gamers into “conscious” ones, applying critical thinking to developing their skills.',
    'We see gameplay as a resource of talent, says co-founder David Barrie.',
    'Why cannot I put in my résumé our gaming victories and achievements? he asks.',
    'If they say they want leadership—why cannot I point to my years of leading World of Warcraft raids?',
  ],
  H: [
    'There are already plenty of gamers out there who know that their hobby has made them who they are.',
    'Earlier this year, Matthew Ricci told gaming site Kotaku: “If you are playing EVE Online you basically already have an MBA.”',
    'Often made fun of in gaming circles as a “spreadsheet simulator”, the economy of the fictional EVE universe is driven by real market principles.',
    'If you want to build a new spaceship, the raw material has to be mined by another player.',
    'Manufacturing costs come into effect, and commodities fluctuate in price based on demand and the distance to haul the commodity.',
  ],
  I: [
    'Mr. Ricci, who had always dreamed of being the boss of his own company, ran an in-game corporation comprising hundreds of players.',
    'Eventually, he realised he could transfer his skills to real-life business—instead of doing it for free.',
    'He restructured Zentech, once a taxation vehicle for his father’s business, and it is now in its fourth year helping international brands enter the Canadian market.',
    'EVE teaches skills like creativity, leadership, organisation, and conflict resolution, he maintains.',
    'He credits his success to his family, his strong desire to run his own business—and “a damn good company in Iceland that made a damn good game”.',
  ],
  J: [
    'Digital entrepreneur and business consultant Mia Bennett says: “In more traditional settings, gaming is still imagined to be the pursuit of teenage boys—a waste of time.”',
    'But there are some links to skills like decision-making, the ability to anticipate and future planning, she says.',
    'It also helps with meta-skills—learning how to learn, experimentation, and creative thinking.',
  ],
  K: [
    'Twelve years into his career, Mark Long, a radiotherapy physicist with the NHS in Surrey, does not get as much gaming time as he used to.',
    'I would love to say that my gaming skills allow me to destroy cancer using linear accelerators like photon blasters, but that is not quite the reality.',
    'Instead, he credits old-school games like Palace of Magic with exposing him to computers.',
    'Every new gaming upgrade improved his knowledge of how they worked.',
    'Gaming also encouraged a competitive spirit—and that, he believes, translates.',
    'When creating treatment plans, the aim is to optimise the radiation dose to the tumour and restrict it as much as possible to healthy surrounding tissues and organs.',
    'It is about repeating the process, but each time doing something slightly different to improve the result.',
    'Not unlike achieving a high score or a perfect run.',
    'Most videogames are essentially puzzles to solve, he says.',
    'And problem-solving is a big part of my job.',
  ],
  L: [
    'Over at Game Academy, Mr. Barrie is aware they still have a mountain to climb.',
    'The employer community will need the science, he says, but confesses he only became a true believer when he started asking players about their biggest in-game achievements.',
    'The scale and scope of their answers were amazing, he says.',
    'But ask them the same about their work, and they do not know.',
    'The engagement and powerful skills that people get playing a game—why cannot work be like that? he asks.',
  ],
};

const matching = Object.entries(matchingSentences).map(([label, sentences]) => ({ label, sentences }));

const passageOneSentences = [
  "Junk food is now a staple of many Americans' diets.",
  'Advertising campaigns from the snack food companies, often featuring sports stars, send the message that we can neutralize any negative effects of consuming their products simply by getting more physical exercise.',
  'But recent studies show a lack of exercise is not to blame for rising obesity rates.',
  'Bad diets are.',
  'Interventions to help reduce junk food consumption are especially important for children and teenagers.',
  'Prevention is better than cure because obesity is so difficult to treat.',
  'Unfortunately, while health education has shown some success among young children, teens have been harder to reach.',
  'Now a large-scale study has tried an innovative approach to change teenagers’ attitudes towards healthy eating, and the results are promising.',
  'The researchers argued that previous interventions have probably been unsuccessful because of a major flaw: they focused on a future, healthier you and assumed that this would be enough motivation for teenagers.',
  'In contrast, the new intervention cleverly exploits teenagers’ instinct for rebelliousness and autonomy, and the value they place on social justice.',
  'To do this, researchers had students read an article on the food industry.',
  'It revealed a secret about the manipulative and deceptive strategies used to make junk food more addictive and characterize the products as healthy.',
  'The article also explained how advertising campaigns specifically target very young and poor people, causing harm for these vulnerable groups.',
  'Afterwards, the participants read a fictional survey of teens who wanted to “fight back against the companies by buying and eating less processed food”.',
  'After the intervention, participants associated healthy eating with autonomy and social justice.',
  'The teenagers also rated healthy eating as being more appealing.',
  'Importantly, there were also some promising effects of the new intervention on actual behavior.',
  'A day later the students were offered a choice of snacks and drinks in a seemingly unrelated context.',
  'The teens chose healthy snacks and drinks (such as fruit or water) more often over unhealthy options (like biscuits and soda).',
  'Apparently associating a healthy diet with teenagers’ own values seems to be a promising avenue to prevent obesity.',
];

const passageTwoSentences = [
  'Adults dream during REM (rapid eye movement) sleep and infants have loads of REM.',
  'So, it might be fair to assume that babies have tons of dreams.',
  'But scientists believe REM serves a completely different purpose for newborns and infants than dreaming.',
  'When babies are in REM, it allows their brain to develop pathways, connections, and eventually, learn languages.',
  "Since your baby doesn't dream at this stage of brain development, it's safe to assume babies do not have nightmares, either.",
  'Nightmares stem from exposure to trauma, an overactive imagination, and the normal stresses of everyday life.',
  'Are you wondering, what do babies dream about?',
  'Good question, but the answer is nothing!',
  'So, when do babies start dreaming?',
  'The general consensus is that they start dreaming around the age of two.',
  'Psychologist David Foulkes studies children (from very small kids to teens) to bring the secrets of their dreams to the light of day.',
  'In his lab, he lets kids fall asleep and then wakes them 3 times a night and asks them to describe what they recall.',
  "Foulkes' findings are unsurprising.",
  'Basically, little kids have little dreams.',
  'But exactly what kids see while dreaming depends on their age.',
  'As children develop and grow, their dreams do too.',
  'Dreams of very small kids are usually just snapshots, looking much more like a slideshow than a movie, when compared to the dreams of adults.',
  'They heavily feature animals and other familiar sights, like images of people eating.',
  'According to Foulkes, “Children’s dream life... seems to be similar to their waking imagination and narration.”',
  'Kids ages 5–9 begin seeing moving images and characters in action.',
  'Dreams now include multiple events strung together, one after the other.',
  'They also start developing greater ability to remember dreams.',
  "Still, that's not always the case: When roused during REM sleep, 25% of the kids in Foulkes' studies had no recollection of dreaming, a trend that continues through age 9.",
  'So, if your baby seems to be in a stressful state while sleeping or is upset upon waking, there may be other factors at play.',
];

const questionGuidance: Record<number, {
  analysis: string;
  options: readonly [string, string, string, string];
}> = {
  46: {
    analysis: '广告把运动明星与零食放在一起，暗示只要多运动，就能抵消吃这些产品的负面影响；A 用 exercise more 和 products are ok 完成同义改写。',
    options: [
      '正确：exercise more 对应 getting more physical exercise，products are ok 概括 neutralize negative effects。',
      '错误：不良饮食导致肥胖是作者随后引用研究得出的结论，不是零食广告传递的信息。',
      '错误：体育明星用于营造“运动可抵消危害”的印象，不是在强调零食本身的益处。',
      '错误：文章明确说近期研究认为 lack of exercise 不是肥胖率上升的原因。',
    ],
  },
  47: {
    analysis: '定位 young children 与 teens 的对比：健康教育对年幼儿童略有成效，但一直难以影响青少年，因此 D 最准确。',
    options: [
      '错误：叛逆、自主是新干预措施利用的心理特点，不是传统健康教育揭示的结果。',
      '错误：原文强调 prevention is better than cure，并非更重视治疗。',
      '错误：文章只说青少年更难触达，不能扩大成对整个反肥胖行动贡献很小。',
      '正确：teens have been harder to reach 表明健康教育基本未能让青少年远离垃圾食品。',
    ],
  },
  48: {
    analysis: '旧干预把说服重点放在“未来更健康的自己”，但这种遥远收益不足以激励青少年；B 直接概括这一缺陷。',
    options: [
      '错误：原文没有说干预只有短期效果，而是说其整体上可能没有成功。',
      '正确：future benefits 对应 a future, healthier you。',
      '错误：原文说错误在于把未来健康当成足够动机，不是笼统声称“动机是唯一关键”。',
      '错误：利用叛逆心理是新方案的特点；旧方案的核心缺陷是只强调未来收益。',
    ],
  },
  49: {
    analysis: '新方案不直接说教，而是借助青少年天然的叛逆、自主倾向和社会正义价值观；C 的 natural inclination 概括这组心理倾向。',
    options: [
      '错误：社会正义只是方案利用的价值之一，选项遗漏叛逆和自主这一核心机制。',
      '错误：原文把 rebelliousness and autonomy 当作自然倾向，并未称为个人弱点。',
      '正确：takes advantage of 对应 exploits，natural inclination 对应 instinct。',
      '错误：文章没有承诺即时收益，而是让健康饮食与青少年的现有价值观发生联系。',
    ],
  },
  50: {
    analysis: '结尾明确把“健康饮食与青少年自身价值观相联系”称为预防肥胖的 promising avenue，C 完整保留了手段和目标。',
    options: [
      '错误：研究针对饮食选择，不是提出对抗零食广告活动的完整方案。',
      '错误：表述过于笼统，没有指出研究发现的有效联系是什么。',
      '正确：building links 对应 associating，prevent obesity 与原文一致。',
      '错误：揭露食品公司策略只是干预材料的一部分，不是结论所概括的关键机制。',
    ],
  },
  51: {
    analysis: '文章先指出成人在 REM 中做梦，随即强调科学家认为 REM 对新生儿和婴儿承担完全不同的功能，因此选 D。',
    options: [
      '错误：文章正是否定“婴儿有大量 REM，所以也做很多梦”的推断。',
      '错误：语言学习不是文中对 REM 功能的表述。',
      '错误：文章提到 REM 有助于大脑发育，但没有说它决定脑连接的形成。',
      '正确：a different function 直接对应 serves a completely different purpose。',
    ],
  },
  52: {
    analysis: '噩梦来源包括创伤、活跃想象力和日常压力，因此可以推出承受情绪压力的人可能做噩梦；B 最稳妥。',
    options: [
      '错误：活跃想象力只是多个来源之一，原文没有支持 occur often 的频率判断。',
      '正确：emotional stress 概括 trauma 和 the normal stresses of everyday life。',
      '错误：文章没有比较不同脑发育阶段的噩梦差异。',
      '错误：作者认为婴儿尚不做梦，因此不能推出成人与婴儿都会做噩梦。',
    ],
  },
  53: {
    analysis: 'bring the secrets of their dreams to the light of day 就是揭示儿童梦境的秘密，A 几乎是直接释义。',
    options: [
      '正确：reveal the secrets 对应 bring the secrets ... to the light of day。',
      '错误：两岁是研究观察的年龄节点之一，不是整个研究目的。',
      '错误：研究关注儿童梦境如何发展，不是解决所有做梦与脑生长之谜。',
      '错误：文章没有把研究目的表述为验证一个已有共识。',
    ],
  },
  54: {
    analysis: '核心句 As children develop and grow, their dreams do too 表明梦境会随年龄发展并变得更复杂，C 是同义概括。',
    options: [
      '错误：奇怪动物只涉及个别梦境内容，不是研究的总体发现。',
      '错误：文章没有讨论成年人是否感到意外。',
      '正确：grow and evolve with age 对应 develop and grow ... dreams do too。',
      '错误：清醒时的想象会影响梦境，但这不是该题定位句概括的年龄发展规律。',
    ],
  },
  55: {
    analysis: '文章结尾提醒，婴儿睡眠紧张或醒来不安时可能有 other factors at play，不能直接归因于做梦，故选 D。',
    options: [
      '错误：没有证据表明婴儿是被违背意愿地叫醒。',
      '错误：前文认为这一阶段的婴儿不会做梦，也不会做噩梦。',
      '错误：文章讨论的是儿童回忆梦境，不能套用于婴儿醒来不安。',
      '正确：something other than dreaming 对应 other factors at play。',
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
  title: 'Passage One · Can healthy eating appeal to teenagers?',
  sentences: passageOneSentences,
  questions: [
    makeQuestion(46, 'What do we learn about advertising campaigns from the snack food companies?', 'A', 'send the message that we can neutralize any negative effects of consuming their products simply by getting more physical exercise.', [
      'They convey the idea that their products are ok if consumers exercise more.',
      "They send the message that bad diets are responsible for Americans' obesity.",
      'They usually feature sports stars to emphasize the benefits of their snack foods.',
      'They claim that lack of exercise is to blame for the increasing obesity rates.',
    ]),
    makeQuestion(47, 'What does the passage say about health education?', 'D', 'while health education has shown some success among young children, teens have been harder to reach.', [
      "It has shed light on teens' instinct for rebellion and autonomy.",
      'It has placed much more emphasis on cure than on prevention.',
      'It has contributed little to the campaigns against obesity.',
      'It has largely failed to turn teens away from junk food.',
    ]),
    makeQuestion(48, 'What is a major flaw in previous interventions to help reduce junk food consumption?', 'B', 'they focused on a future, healthier you and assumed that this would be enough motivation for teenagers.', [
      'They motivated teens to stay away from junk food only temporarily.',
      'They focused on the benefits young people would reap in the future.',
      'They were based on the assumption that motivation was the only key.',
      "They were incapable of appealing to teens' instinct for rebelliousness.",
    ]),
    makeQuestion(49, 'In what way is the new intervention innovative?', 'C', 'the new intervention cleverly exploits teenagers’ instinct for rebelliousness and autonomy, and the value they place on social justice.', [
      "It emphasizes people's sense of social responsibility.",
      "It cleverly exploits teenagers' personal weaknesses.",
      "It takes advantage of teenagers' natural inclination.",
      'It promises immediate rather than future benefits.',
    ]),
    makeQuestion(50, 'What conclusion can be drawn from the new research?', 'C', 'Apparently associating a healthy diet with teenagers’ own values seems to be a promising avenue to prevent obesity.', [
      'A totally different approach could be adopted to combat advertising campaigns for snack food.',
      'An effective intervention has to be found to persuade teenagers to switch to a healthier lifestyle.',
      'Obesity can be hopefully prevented by building links between teenagers’ values and healthy eating.',
      "An innovative way to beat obesity is to expose food companies' manipulative and deceptive practices.",
    ]),
  ],
};

const passageTwo = {
  title: 'Passage Two · Do babies dream?',
  sentences: passageTwoSentences,
  questions: [
    makeQuestion(51, 'What do scientists think of REM?', 'D', 'But scientists believe REM serves a completely different purpose for newborns and infants than dreaming.', [
      'It is a sign of dreaming in adults and infants alike.',
      "It is essential to human beings' language learning.",
      'It determines the formation of connections in the brain.',
      'It performs a different function in babies than in adults.',
    ]),
    makeQuestion(52, 'What can we infer about nightmares from the passage?', 'B', 'Nightmares stem from exposure to trauma, an overactive imagination, and the normal stresses of everyday life.', [
      'They occur often in people with an active imagination.',
      'They occur in people suffering from emotional stress.',
      'They vary in different stages of brain development.',
      'They appear in the sleep of both adults and infants.',
    ]),
    makeQuestion(53, 'What is the aim of psychologist David Foulkes’ study?', 'A', 'Psychologist David Foulkes studies children (from very small kids to teens) to bring the secrets of their dreams to the light of day.', [
      "To reveal the secrets of children's dreams.",
      'To see if children start dreaming at age two.',
      'To solve the mystery of dreaming and brain growth.',
      'To confirm the general consensus on when kids dream.',
    ]),
    makeQuestion(54, 'What are Foulkes’ findings about kids’ dreams?', 'C', 'As children develop and grow, their dreams do too.', [
      'They feature strange animals.',
      'They are unsurprising to adults.',
      'They grow and evolve with age.',
      "They reflect kids' waking life.",
    ]),
    makeQuestion(55, 'What can we assume about babies who appear upset upon waking?', 'D', 'there may be other factors at play.', [
      'They have been roused against their will.',
      'They have been disturbed by a nightmare.',
      'They have trouble recollecting the images of their dreams.',
      'They have been affected by something other than dreaming.',
    ]),
  ],
};

const closeReadings: Record<string, CloseReading> = {};
clozeSentences.forEach((sentence, index) => { closeReadings[`C${String(index + 1).padStart(2, '0')}`] = auto(sentence); });
// Keep one representative clause annotation so the page's two structure modes have a visible example.
closeReadings.C01 = note(
  '有些音乐让人舞动，有些音乐让人走出去改变世界；无论如何，音乐确实会以特别的方式打动人。',
  [h('subject', 'it'), h('predicate', "'s fair to say"), h('object', 'that music moves people in special ways', '宾语从句（整体）')],
  [h('subject', 'it'), h('predicate', "'s fair to say")],
);
matching.forEach((paragraph) => paragraph.sentences.forEach((sentence, index) => {
  closeReadings[`M-${paragraph.label}${String(index + 1).padStart(2, '0')}`] = auto(sentence);
}));
passageOneSentences.forEach((sentence, index) => { closeReadings[`R1-${String(index + 1).padStart(2, '0')}`] = auto(sentence); });
passageTwoSentences.forEach((sentence, index) => { closeReadings[`R2-${String(index + 1).padStart(2, '0')}`] = auto(sentence); });

export const cet4Reading202512Set2 = {
  cloze: { title: 'How music can reach the brain', sentences: clozeSentences, ...cet4ClozeExercise202512Set2 },
  matching: { title: 'Can playing video games help you get a better job?', paragraphs: matching, questions: cet4MatchingQuestions202512Set2 },
  passages: [passageOne, passageTwo],
};

export const cet4CloseReadings202512Set2 = closeReadings satisfies Record<string, CloseReading>;

export const cet4InlineGlossary202512Set2: InlineGlossary = {
  words: {
    ...cet4InlineGlossary202606Set2.words,
    inspire: { partOfSpeech: 'v', meaning: '激励；鼓舞；启发' },
    move: { partOfSpeech: 'v', meaning: '使感动；使行动；移动' },
    foot: { partOfSpeech: 'n', meaning: '脚；足部' },
    fair: { partOfSpeech: 'adj', meaning: '合理的；公平的' },
    autonomous: { partOfSpeech: 'adj', meaning: '自主的；自治的' },
    dementia: { partOfSpeech: 'n', meaning: '痴呆；失智症' },
    manageable: { partOfSpeech: 'adj', meaning: '可控制的；可处理的' },
    résumé: { partOfSpeech: 'n', meaning: '简历' },
    aptitude: { partOfSpeech: 'n', meaning: '天赋；才能' },
    transferable: { partOfSpeech: 'adj', meaning: '可转移的；可迁移的' },
    rebelliousness: { partOfSpeech: 'n', meaning: '叛逆性' },
    autonomy: { partOfSpeech: 'n', meaning: '自主；自主权' },
    intervention: { partOfSpeech: 'n', meaning: '干预；介入' },
    trauma: { partOfSpeech: 'n', meaning: '创伤' },
    nightmare: { partOfSpeech: 'n', meaning: '噩梦' },
    into: { partOfSpeech: 'prep', meaning: '进入；用于 be into 表示“喜欢、对……感兴趣”' },
    dream: { partOfSpeech: 'v / n', meaning: '做梦；梦境；梦想' },
    dreams: { partOfSpeech: 'v / n', meaning: '做梦；梦境（dream 的复数或第三人称单数）' },
    making: { partOfSpeech: 'v', meaning: '使得；制作；作出' },
    ranking: { partOfSpeech: 'n', meaning: '排名；名次' },
    determined: { partOfSpeech: 'adj', meaning: '坚定投入的；下定决心的' },
    reality: { partOfSpeech: 'n', meaning: '现实；实际情况' },
    work: { partOfSpeech: 'v / n', meaning: '工作；运作；起作用' },
    taxing: { partOfSpeech: 'v / adj', meaning: '大量消耗（资源）；费力的' },
    vehicle: { partOfSpeech: 'n', meaning: '工具；载体；车辆' },
    translates: { partOfSpeech: 'v', meaning: '能够迁移、转化；翻译' },
    avenue: { partOfSpeech: 'n', meaning: '途径；办法；大道' },
    waking: { partOfSpeech: 'adj / v', meaning: '清醒时的；醒来' },
  },
  phrases: [
    { term: 'come out of', explanation: '从（某种状态）中恢复' },
    { term: 'get out there', explanation: '走出去；积极行动' },
    { term: 'bring ... back to', explanation: '使……恢复到' },
    { term: 'have in common with', explanation: '与……有共同点' },
    { term: 'in contrast', explanation: '相比之下' },
    { term: 'wake up to', explanation: '开始意识到；认识到' },
    { term: 'apply ... to', explanation: '把……应用于……' },
    { term: 'be relevant to', explanation: '与……相关' },
    { term: 'make ... more manageable', explanation: '使……更容易处理' },
    { term: 'bring ... back', explanation: '使……恢复；带回……' },
    { term: 'be into', explanation: '喜欢；对……很感兴趣' },
    { term: 'move your feet', explanation: '随音乐舞动' },
    { term: 'it is fair to say', explanation: '可以合理地说' },
    { term: 'put ... into', explanation: '使……进入某种状态' },
    { term: 'to the maximum', explanation: '达到最大限度' },
    { term: 'hard data', explanation: '确凿数据；可靠的实证数据' },
    { term: 'go down in one’s résumé', explanation: '被写入某人的简历' },
    { term: 'make headlines', explanation: '成为新闻；登上头条' },
    { term: 'harm one’s chances of', explanation: '降低某人做成……的机会' },
    { term: 'point to', explanation: '举出；以……为例' },
    { term: 'come into effect', explanation: '开始生效；开始起作用' },
    { term: 'credit ... to', explanation: '把……归功于……' },
    { term: 'not quite', explanation: '并不完全；不尽然' },
    { term: 'a mountain to climb', explanation: '仍有很大困难需要克服' },
    { term: 'at play', explanation: '在起作用；产生影响' },
    { term: 'bring ... to light', explanation: '揭示；使……显露' },
    { term: 'string ... together', explanation: '把……前后串联起来' },
    { term: 'conscious gamer', explanation: '会主动反思并培养游戏技能的玩家' },
    { term: 'expose ... to', explanation: '使……接触；让……了解' },
    { term: 'a perfect run', explanation: '一次完美通关' },
    { term: 'loads of', explanation: '大量；许多' },
    { term: 'tons of', explanation: '大量；许多' },
    { term: 'serve a purpose', explanation: '发挥某种作用' },
    { term: 'stem from', explanation: '源于；由……造成' },
    { term: 'little dreams', explanation: '内容简单、短小的梦境' },
    { term: 'waking imagination', explanation: '清醒状态下的想象' },
  ],
};
const autoTranslations: Record<string, string> = {
  "Some music inspires you to move your feet, some inspires you to get out there and change the world. In any case, it's fair to say that music moves people in special ways.": "有些音乐会让你随之舞动，有些会激励你走出去改变世界。无论如何，音乐确实能以独特的方式打动人、推动人行动。",
  "If you're especially into a piece of music, your brain does something called Autonomous Sensory Meridian Response (ASMR), which feels to you like a sting in your brain.": "如果你特别喜欢某段音乐，大脑可能会产生一种叫作“自主感觉经络反应”（ASMR）的反应，让你感到脑中一阵酥麻。",
  "It turns out that ASMR is pretty special. According to a recently published study in The Journal of Prevention of Alzheimer's Disease, the part of your brain responsible for ASMR doesn't get lost to Alzheimer's.": "事实证明，ASMR 相当特别。根据《阿尔茨海默病预防杂志》最近发表的一项研究，大脑中负责 ASMR 的部分不会因阿尔茨海默病而消失。",
  "Alzheimer's tends to put people into layers of confusion, and the study confirms that music can sometimes actually lift people out of the Alzheimer's haze and bring them back to (at least a likeness of) normality... if only for a short while.": "阿尔茨海默氏症往往会让人们陷入层层困惑，研究证实，音乐有时确实可以让人们摆脱阿尔茨海默氏症的阴霾，让他们恢复（至少是相似的）正常状态……哪怕只是短暂的一段时间。",
  "ASMR is powerful stuff!": "ASMR 的作用可不小！",
  "This phenomenon has been observed several times but rarely studied properly.": "这种现象已被多次观察到，但很少得到适当的研究。",
  "One of the most famous examples of this is the story of 92-year-old Henry Dryer, who comes out of dementia (痴呆) while listening to songs from his youth.": "最著名的例子之一是 92 岁的亨利·德里尔 (Henry Dryer) 的故事，他在听着年轻时的歌曲时摆脱了痴呆症。",
  "Jeff Anderson, associate professor in Radiology at the University of Utah and contributing author on the study, says “In our society, the diagnoses of dementia are taxing resources to the maximum.”": "犹他大学放射学副教授、该研究的撰稿人杰夫·安德森 (Jeff Anderson) 表示：“在我们的社会中，痴呆症的诊断正在最大限度地消耗资源。”",
  "No one says playing music will be a cure for Alzheimer's disease, but it might make the symptoms more manageable.": "没有人说演奏音乐可以治愈阿尔茨海默病，但它可能会使症状更容易控制。",
  "The gaming industry is larger than films and music combined, yet few of us are likely to list our achievements in playing computer games as work experience in our résumé. But why not? Businesses are waking up to the skills gamers can bring to the workplace.": "游戏行业比电影和音乐加起来还要大，但我们很少有人会把玩电脑游戏的成就列为简历中的工作经验。但为什么不呢？企业正在意识到游戏玩家可以为工作场所带来的技能。",
  "One start-up is convinced that the skills learned by playing games—hard-won through years of training and battle—can be applied to real-life work situations.": "一家初创企业坚信，通过玩游戏学到的技能（通过多年的训练和战斗来之不易）可以应用于现实生活中的工作情况。",
  "And Game Academy reckons its belief is backed up by hard data.": "游戏学院认为它的信念是有确凿数据支持的。",
  "Do you enjoy unusual puzzle games like Portal, or tower defence games like Defense Grid?": "你喜欢《传送门》这类独特的解谜游戏，还是《防御阵型》这样的塔防游戏？",
  "The team has found that IT workers play those more than average.": "该团队发现，IT 员工玩这些游戏的频率高于平均水平。",
  "But if you prefer Civilization, Total War, or X-Com, where strategy and resource management are key, then you might have more in common with managers.": "但如果你更喜欢《文明》、《全面战争》或《幽浮》，其中战略和资源管理是关键，那么你可能与管理者有更多共同点。",
  "Game Academy's idea is simple: analyse gamers' habits from their online gaming profile, and offer courses in valuable skills that reflect their aptitudes—skills they can practise and refine in-game.": "游戏学院的想法很简单：从玩家的在线游戏资料中分析他们的习惯，并提供反映他们才能的宝贵技能课程——他们可以在游戏中练习和完善的技能。",
  "And there is already a growing acceptance that gaming skills are transferable.": "人们已经越来越多地接受游戏技能是可以转移的。",
  "Even the military is hiring gamers.": "甚至军队也在招聘游戏玩家。",
  "“The ability to absorb information, react swiftly and coordinate actions whilst remaining calm under pressure are often attributes of people that are good at gaming,” according to a Royal Air Force spokesperson.": "英国皇家空军发言人表示：“善于博弈的人通常具有吸收信息、迅速反应和协调行动的能力，同时在压力下保持冷静。”",
  "Those skills are part of what the Royal Air Force is looking for “in a variety of roles”.": "这些技能是英国皇家空军正在寻找的“各种角色”人才的一部分。",
  "“Skills acquired through gaming can be very relevant to certain areas.”": "“通过游戏获得的技能可能与某些领域非常相关。”",
  "There are plenty of soft skills that gamers can utilise in a professional setting, such as teamwork, problem solving and strategic planning, says Ryan Gardner, a regional director with Hays recruitment.": "海斯招聘区域总监瑞安·加德纳 (Ryan Gardner) 表示，游戏玩家可以在专业环境中运用很多软技能，例如团队合作、解决问题和战略规划。",
  "But does that really mean your top 100 ranking in Overwatch should go down in your résumé?": "但这是否意味着，你应该把自己在《守望先锋》中排名前 100 的成绩写进简历？",
  "It is about how you either make it relevant to the job you are applying for, or how it makes you more interesting as a potential employee, Mr. Gardner says.": "加德纳先生说，关键是说明这段经历与所申请职位有何关联，或者它如何让你成为更有吸引力的求职者。",
  "Two years ago, a Glasgow University study made headlines for suggesting gaming could make students more successful.": "两年前，格拉斯哥大学的一项研究因表明游戏可以让学生更加成功而成为头条新闻。",
  "But the research has not really changed minds, at least not yet, says one of the authors of the study, Dr. Matthew Barr.": "但该研究的作者之一马修·巴尔博士表示，这项研究并没有真正改变人们的想法，至少目前还没有。",
  "For now, I think the negative reputation around games means that telling someone you're a determined gamer is more likely to harm your chances of getting a job.": "就目前而言，游戏的负面形象意味着：告诉别人你是个投入的玩家，反而更可能降低你获得工作的机会。",
  "But if someone can explain how they have led a team in an online game, for example, they may be able to persuade an employer that this is useful, says Dr Barr.": "但是，巴尔博士说，如果有人能够解释他们如何在网络游戏中领导团队，他们可能能够说服雇主这很有用。",
  "Playing games casually is unlikely to help your career prospects.": "随便玩游戏不太可能对你的职业前景有帮助。",
  "But part of Game Academy’s suggestion is to transform casual gamers into “conscious” ones, applying critical thinking to developing their skills.": "但游戏学院建议的一部分是将休闲玩家转变为“有意识”的玩家，运用批判性思维来发展他们的技能。",
  "We see gameplay as a resource of talent, says co-founder David Barrie.": "联合创始人大卫·巴里 (David Barrie) 表示，我们将游戏玩法视为一种人才资源。",
  "Why cannot I put in my résumé our gaming victories and achievements? he asks.": "为什么我不能在简历中加入我们的游戏胜利和成就？他问道。",
  "If they say they want leadership—why cannot I point to my years of leading World of Warcraft raids?": "如果他们说他们想要领导——为什么我不能指出我多年来领导魔兽世界突袭的经历？",
  "There are already plenty of gamers out there who know that their hobby has made them who they are.": "已经有很多游戏玩家知道他们的爱好造就了他们。",
  "Earlier this year, Matthew Ricci told gaming site Kotaku: “If you are playing EVE Online you basically already have an MBA.”": "今年早些时候，马修·里奇 (Matthew Ricci) 告诉游戏网站 Kotaku：“如果你玩《EVE Online》，那么你基本上已经拥有了 MBA 学位。”",
  "Often made fun of in gaming circles as a “spreadsheet simulator”, the economy of the fictional EVE universe is driven by real market principles.": "虚构的 EVE 宇宙的经济是由真实的市场原则驱动的，在游戏圈中经常被戏称为“电子表格模拟器”。",
  "If you want to build a new spaceship, the raw material has to be mined by another player.": "如果你想建造一艘新的宇宙飞船，原材料就必须由其他玩家开采。",
  "Manufacturing costs come into effect, and commodities fluctuate in price based on demand and the distance to haul the commodity.": "制造成本生效，商品价格根据需求和运输商品的距离而波动。",
  "Mr. Ricci, who had always dreamed of being the boss of his own company, ran an in-game corporation comprising hundreds of players.": "里奇先生一直梦想成为自己公司的老板，经营着一家由数百名玩家组成的游戏公司。",
  "Eventually, he realised he could transfer his skills to real-life business—instead of doing it for free.": "最终，他意识到自己可以把这些技能用于现实商业，而不必继续无偿经营虚拟公司。",
  "He restructured Zentech, once a taxation vehicle for his father’s business, and it is now in its fourth year helping international brands enter the Canadian market.": "他重组了 Zentech，这家公司曾经是他父亲企业的税务工具，现在已经是帮助国际品牌进入加拿大市场的第四个年头了。",
  "EVE teaches skills like creativity, leadership, organisation, and conflict resolution, he maintains.": "他坚持认为，《EVE》教授创造力、领导力、组织力和解决冲突等技能。",
  "He credits his success to his family, his strong desire to run his own business—and “a damn good company in Iceland that made a damn good game”.": "他将自己的成功归功于他的家庭、他经营自己企业的强烈愿望以及“冰岛一家非常好的公司，制作了一款非常棒的游戏”。",
  "Digital entrepreneur and business consultant Mia Bennett says: “In more traditional settings, gaming is still imagined to be the pursuit of teenage boys—a waste of time.”": "数字企业家兼商业顾问米娅·贝内特 (Mia Bennett) 表示：“在更传统的环境中，游戏仍然被认为是十几岁男孩的追求——浪费时间。”",
  "But there are some links to skills like decision-making, the ability to anticipate and future planning, she says.": "但她说，这与决策、预测能力和未来规划等技能有一些联系。",
  "It also helps with meta-skills—learning how to learn, experimentation, and creative thinking.": "它还有助于培养元技能——学习如何学习、实验和创造性思维。",
  "Twelve years into his career, Mark Long, a radiotherapy physicist with the NHS in Surrey, does not get as much gaming time as he used to.": "马克·朗 (Mark Long) 是萨里郡 NHS 的一名放射治疗物理学家，在他的职业生涯 12 年后，他并没有像以前那样获得那么多的游戏时间。",
  "I would love to say that my gaming skills allow me to destroy cancer using linear accelerators like photon blasters, but that is not quite the reality.": "我倒很想说，游戏技能让我能像使用光子炮一样操作直线加速器消灭癌细胞，但现实并非如此。",
  "Instead, he credits old-school games like Palace of Magic with exposing him to computers.": "相反，他认为《魔宫》等老派游戏让他接触到了电脑。",
  "Every new gaming upgrade improved his knowledge of how they worked.": "每一次新的游戏升级都加深了他对游戏运作方式的了解。",
  "Gaming also encouraged a competitive spirit—and that, he believes, translates.": "游戏还鼓励了竞争精神——他相信这一点也能得到体现。",
  "When creating treatment plans, the aim is to optimise the radiation dose to the tumour and restrict it as much as possible to healthy surrounding tissues and organs.": "在制定治疗计划时，目标是优化肿瘤的辐射剂量，并尽可能限制其对健康的周围组织和器官的辐射剂量。",
  "It is about repeating the process, but each time doing something slightly different to improve the result.": "这是关于重复这个过程，但每次都做一些稍微不同的事情来改善结果。",
  "Not unlike achieving a high score or a perfect run.": "这和在游戏中拿到高分或完美通关并没有太大不同。",
  "Most videogames are essentially puzzles to solve, he says.": "他说，大多数电子游戏本质上都是需要解决的谜题。",
  "And problem-solving is a big part of my job.": "解决问题是我工作的重要组成部分。",
  "Over at Game Academy, Mr. Barrie is aware they still have a mountain to climb.": "在游戏学院，巴里先生意识到他们还有一座山需要攀登。",
  "The employer community will need the science, he says, but confesses he only became a true believer when he started asking players about their biggest in-game achievements.": "他说，雇主群体需要科学，但他承认，当他开始向玩家询问他们在游戏中最大的成就时，他才成为真正的信徒。",
  "The scale and scope of their answers were amazing, he says.": "他说，他们的答案的规模和范围是惊人的。",
  "But ask them the same about their work, and they do not know.": "但问他们同样的工作，他们却说不知道。",
  "The engagement and powerful skills that people get playing a game—why cannot work be like that? he asks.": "人们通过玩游戏获得的投入和强大的技能——为什么工作不能像这样呢？他问道。",
  "Junk food is now a staple of many Americans' diets.": "垃圾食品现在已成为许多美国人饮食的主食。",
  "Advertising campaigns from the snack food companies, often featuring sports stars, send the message that we can neutralize any negative effects of consuming their products simply by getting more physical exercise.": "休闲食品公司的广告活动通常以体育明星为主角，传达这样的信息：我们只需进行更多的体育锻炼就可以消除食用其产品的任何负面影响。",
  "But recent studies show a lack of exercise is not to blame for rising obesity rates.": "但最近的研究表明，缺乏锻炼并不是肥胖率上升的原因。",
  "Bad diets are.": "真正的原因是不良饮食。",
  "Interventions to help reduce junk food consumption are especially important for children and teenagers.": "帮助减少垃圾食品消费的干预措施对于儿童和青少年尤其重要。",
  "Prevention is better than cure because obesity is so difficult to treat.": "预防胜于治疗，因为肥胖很难治疗。",
  "Unfortunately, while health education has shown some success among young children, teens have been harder to reach.": "不幸的是，虽然健康教育在幼儿中取得了一些成功，但青少年却很难接触到。",
  "Now a large-scale study has tried an innovative approach to change teenagers’ attitudes towards healthy eating, and the results are promising.": "现在，一项大规模研究尝试了一种创新方法来改变青少年对健康饮食的态度，结果令人鼓舞。",
  "The researchers argued that previous interventions have probably been unsuccessful because of a major flaw: they focused on a future, healthier you and assumed that this would be enough motivation for teenagers.": "研究人员认为，之前的干预措施可能因一个重大缺陷而失败：他们着眼于未来、更健康的你，并认为这对青少年来说就足够了。",
  "In contrast, the new intervention cleverly exploits teenagers’ instinct for rebelliousness and autonomy, and the value they place on social justice.": "相比之下，新的干预措施巧妙地利用了青少年的叛逆和自主本能，以及他们对社会正义的重视。",
  "To do this, researchers had students read an article on the food industry.": "为此，研究人员让学生阅读一篇有关食品行业的文章。",
  "It revealed a secret about the manipulative and deceptive strategies used to make junk food more addictive and characterize the products as healthy.": "它揭示了一个秘密，即用于使垃圾食品更容易上瘾并将产品描述为健康的操纵和欺骗策略。",
  "The article also explained how advertising campaigns specifically target very young and poor people, causing harm for these vulnerable groups.": "文章还解释了广告活动如何专门针对非常年轻和贫困的人，从而对这些弱势群体造成伤害。",
  "Afterwards, the participants read a fictional survey of teens who wanted to “fight back against the companies by buying and eating less processed food”.": "随后，参与者阅读了一份针对青少年的虚构调查，这些青少年希望“通过购买和少吃加工食品来反击这些公司”。",
  "After the intervention, participants associated healthy eating with autonomy and social justice.": "干预后，参与者将健康饮食与自主性和社会正义联系起来。",
  "The teenagers also rated healthy eating as being more appealing.": "青少年还认为健康饮食更有吸引力。",
  "Importantly, there were also some promising effects of the new intervention on actual behavior.": "重要的是，新的干预措施对实际行为也产生了一些有希望的影响。",
  "A day later the students were offered a choice of snacks and drinks in a seemingly unrelated context.": "一天后，学生们在看似无关的环境中选择了零食和饮料。",
  "The teens chose healthy snacks and drinks (such as fruit or water) more often over unhealthy options (like biscuits and soda).": "青少年更常选择健康的零食和饮料（如水果或水），而不是不健康的选择（如饼干和苏打水）。",
  "Apparently associating a healthy diet with teenagers’ own values seems to be a promising avenue to prevent obesity.": "显然，将健康饮食与青少年自身价值观联系起来似乎是预防肥胖的一个有希望的途径。",
  "Adults dream during REM (rapid eye movement) sleep and infants have loads of REM.": "成人在快速眼动睡眠期间会做梦，而婴儿则有大量的快速眼动睡眠。",
  "So, it might be fair to assume that babies have tons of dreams.": "因此，人们很容易认为婴儿也会做很多梦。",
  "But scientists believe REM serves a completely different purpose for newborns and infants than dreaming.": "但科学家认为，对于新生儿和婴儿来说，快速眼动睡眠的目的与做梦完全不同。",
  "When babies are in REM, it allows their brain to develop pathways, connections, and eventually, learn languages.": "当婴儿处于快速眼动睡眠阶段时，他们的大脑可以发展出通路、联系，并最终学习语言。",
  "Since your baby doesn't dream at this stage of brain development, it's safe to assume babies do not have nightmares, either.": "既然婴儿在这一大脑发育阶段还不会做梦，也就可以合理判断他们不会做噩梦。",
  "Nightmares stem from exposure to trauma, an overactive imagination, and the normal stresses of everyday life.": "噩梦源于创伤、过度活跃的想象力以及日常生活中的正常压力。",
  "Are you wondering, what do babies dream about?": "你想知道，婴儿会梦见什么吗？",
  "Good question, but the answer is nothing!": "这个问题问得好，但答案是：他们什么也不会梦见。",
  "So, when do babies start dreaming?": "那么，宝宝什么时候开始做梦呢？",
  "The general consensus is that they start dreaming around the age of two.": "人们普遍认为，他们在两岁左右就开始做梦了。",
  "Psychologist David Foulkes studies children (from very small kids to teens) to bring the secrets of their dreams to the light of day.": "心理学家 David Foulkes 研究从幼儿到青少年的孩子，试图揭开他们梦境的秘密。",
  "In his lab, he lets kids fall asleep and then wakes them 3 times a night and asks them to describe what they recall.": "在实验室里，他让孩子们入睡，每晚将他们叫醒三次，再请他们描述能够回忆起的梦境。",
  "Foulkes' findings are unsurprising.": "福克斯的发现并不令人意外。",
  "Basically, little kids have little dreams.": "简单来说，年幼孩子的梦境也很简单。",
  "But exactly what kids see while dreaming depends on their age.": "但孩子们在做梦时看到的具体内容取决于他们的年龄。",
  "As children develop and grow, their dreams do too.": "随着孩子发育成长，他们的梦境也会随之发展。",
  "Dreams of very small kids are usually just snapshots, looking much more like a slideshow than a movie, when compared to the dreams of adults.": "与成年人的梦相比，幼儿的梦通常只是一个个静态片段，更像幻灯片，而不像电影。",
  "They heavily feature animals and other familiar sights, like images of people eating.": "它们以动物和其他熟悉的景象为特色，比如人们吃饭的图像。",
  "According to Foulkes, “Children’s dream life... seems to be similar to their waking imagination and narration.”": "Foulkes 说：“儿童的梦境生活……似乎与他们清醒时的想象和叙事方式相似。”",
  "Kids ages 5–9 begin seeing moving images and characters in action.": "5 至 9 岁的孩子开始看到活动的图像和角色。",
  "Dreams now include multiple events strung together, one after the other.": "这时的梦境开始包含多个前后串联的事件。",
  "They also start developing greater ability to remember dreams.": "他们也开始发展出更强的记住梦境的能力。",
  "Still, that's not always the case: When roused during REM sleep, 25% of the kids in Foulkes' studies had no recollection of dreaming, a trend that continues through age 9.": "不过，情况并非总是如此：在福克斯的研究中，当在快速眼动睡眠期间被唤醒时，25% 的孩子不记得做过梦，这种趋势一直持续到 9 岁。",
  "So, if your baby seems to be in a stressful state while sleeping or is upset upon waking, there may be other factors at play.": "因此，如果婴儿睡觉时显得紧张，或醒来后情绪不安，原因可能另有所在。"
};
clozeSentences.forEach((sentence, index) => { const key = `C${String(index + 1).padStart(2, '0')}`; closeReadings[key].translation = autoTranslations[sentence] ?? closeReadings[key].translation; });
matching.forEach((paragraph) => paragraph.sentences.forEach((sentence, index) => { const key = `M-${paragraph.label}${String(index + 1).padStart(2, '0')}`; closeReadings[key].translation = autoTranslations[sentence] ?? closeReadings[key].translation; }));
passageOneSentences.forEach((sentence, index) => { const key = `R1-${String(index + 1).padStart(2, '0')}`; closeReadings[key].translation = autoTranslations[sentence] ?? closeReadings[key].translation; });
passageTwoSentences.forEach((sentence, index) => { const key = `R2-${String(index + 1).padStart(2, '0')}`; closeReadings[key].translation = autoTranslations[sentence] ?? closeReadings[key].translation; });

Object.assign(closeReadings, {
  C01: note('有些音乐会让你随之舞动，有些会激励你走出去改变世界；无论如何，音乐确实能以独特的方式打动人、推动人行动。', [h('subject', 'Some music'), h('predicate', 'inspires'), h('object', 'you to move your feet'), h('subject', 'some'), h('predicate', 'inspires'), h('object', 'you to get out there and change the world'), h('adverbial', 'In any case'), h('subject', 'it'), h('predicate', "'s fair to say"), h('object', 'that music moves people in special ways', '宾语从句（整体）')], [h('subject', 'Some music'), h('predicate', 'inspires'), h('object', 'you to move your feet'), h('subject', 'some'), h('predicate', 'inspires'), h('object', 'you to get out there and change the world'), h('subject', 'it'), h('predicate', "'s fair to say")], [['move your feet', '随音乐舞动'], ['it is fair to say', '可以合理地说']]),
  C02: note('如果你特别喜欢某段音乐，大脑可能会产生一种叫作“自主感觉经络反应”（ASMR）的反应，让你感到脑中一阵酥麻。', [h('adverbial', "If you're especially into a piece of music", '条件状语从句'), h('subject', 'your brain'), h('predicate', 'does'), h('object', 'something called Autonomous Sensory Meridian Response (ASMR)'), h('complement', 'which feels to you like a sting in your brain', '定语从句（整体）')], [h('subject', 'your brain'), h('predicate', 'does'), h('object', 'something called Autonomous Sensory Meridian Response (ASMR)')], [['be into', '喜欢；对……很感兴趣'], ['a piece of music', '一段音乐']]),
  C03: note('事实证明，ASMR 很特别。根据近期发表的一项研究，大脑中负责 ASMR 的部分不会因阿尔茨海默病而消失。', [h('subject', 'It'), h('predicate', 'turns out'), h('object', 'that ASMR is pretty special', '主语从句后置（整体）'), h('adverbial', "According to a recently published study in The Journal of Prevention of Alzheimer's Disease"), h('subject', 'the part of your brain responsible for ASMR'), h('predicate', "doesn't get lost"), h('complement', "to Alzheimer's")], [h('subject', 'It'), h('predicate', 'turns out'), h('subject', 'the part of your brain responsible for ASMR'), h('predicate', "doesn't get lost"), h('complement', "to Alzheimer's")], [['turn out', '结果是；事实证明'], ['be responsible for', '负责；引起']]),
  C04: note('阿尔茨海默病往往让人陷入层层迷乱；研究证实，音乐有时确实能把患者暂时从这种迷雾中唤回，使其接近正常状态。', [h('subject', "Alzheimer's"), h('predicate', 'tends to put'), h('object', 'people'), h('complement', 'into layers of confusion'), h('subject', 'the study'), h('predicate', 'confirms'), h('object', "that music can sometimes actually lift people out of the Alzheimer's haze and bring them back to (at least a likeness of) normality", '宾语从句（整体）'), h('adverbial', 'if only for a short while', '省略式条件补充')], [h('subject', "Alzheimer's"), h('predicate', 'tends to put'), h('object', 'people'), h('complement', 'into layers of confusion'), h('subject', 'the study'), h('predicate', 'confirms')], [['lift ... out of', '把……从某种状态中带出来'], ['bring ... back to', '使……恢复到']]),
  C09: note('没有人说播放音乐能治愈阿尔茨海默病，但它可能让症状更容易控制、降低护理成本并改善患者的生活质量。', [h('subject', 'No one'), h('predicate', 'says'), h('object', "playing music will be a cure for Alzheimer's disease", '宾语从句（整体）'), h('subject', 'it'), h('predicate', 'might make'), h('object', 'the symptoms'), h('complement', "more manageable, decrease the cost of care and improve a patient's quality of life", '并列结果')], [h('subject', 'No one'), h('predicate', 'says'), h('subject', 'it'), h('predicate', 'might make'), h('object', 'the symptoms')], [['a cure for', '……的治疗方法'], ['quality of life', '生活质量']]),
  'M-A01': note('游戏行业的规模超过电影和音乐的总和，但我们很少有人会把游戏成就列为简历中的工作经验。', [h('subject', 'The gaming industry'), h('predicate', 'is'), h('complement', 'larger than films and music combined'), h('subject', 'few of us'), h('predicate', 'are likely'), h('complement', 'to list our achievements in playing computer games as work experience in our résumé', '不定式补充')], [h('subject', 'The gaming industry'), h('predicate', 'is'), h('complement', 'larger than films and music combined')]),
  'M-A02': note('但为什么不把它列入简历呢？', [h('adverbial', 'But'), h('predicate', 'why not', '省略式疑问')]),
  'M-A03': note('企业开始意识到游戏玩家能带给职场的技能。', [h('subject', 'Businesses'), h('predicate', 'are waking up'), h('complement', 'to the skills gamers can bring to the workplace')]),
  'M-B03': note('你喜欢 Portal 这样的不寻常益智游戏，还是 Defense Grid 这样的塔防游戏？', [h('subject', 'you'), h('predicate', 'enjoy'), h('object', 'unusual puzzle games like Portal, or tower defence games like Defense Grid')]),
  'M-B04': note('研究团队发现，IT 从业者玩这类游戏的比例高于平均水平。', [h('subject', 'The team'), h('predicate', 'has found'), h('object', 'that IT workers play those more than average', '宾语从句（整体）')], [h('subject', 'The team'), h('predicate', 'has found')], [['more than average', '高于平均水平']]),
  'M-B05': note('但如果你更喜欢 Civilization、Total War 或 X-Com 这类强调策略和资源管理的游戏，那么你可能更接近管理者的能力画像。', [h('adverbial', 'But if you prefer Civilization, Total War, or X-Com, where strategy and resource management are key', '条件状语从句'), h('subject', 'you'), h('predicate', 'might have'), h('object', 'more in common with managers')], [h('subject', 'you'), h('predicate', 'might have'), h('object', 'more in common with managers')]),
  'M-F04': note('但举例来说，如果有人能说明自己如何在网络游戏中带领团队，他或许就能让雇主相信这种能力有用。', [h('adverbial', 'But if someone can explain how they have led a team in an online game, for example', '条件状语从句'), h('subject', 'they'), h('predicate', 'may be able'), h('complement', 'to persuade an employer that this is useful')], [h('subject', 'they'), h('predicate', 'may be able'), h('complement', 'to persuade an employer that this is useful')]),
  'M-E02': note('但这真的意味着应该把《守望先锋》前 100 名的排名写进简历吗？', [h('predicate', 'does', '助动词'), h('subject', 'that'), h('predicate', 'mean', '实义谓语'), h('object', 'your top 100 ranking in Overwatch should go down in your résumé', '宾语从句（整体）')], [h('predicate', 'does', '助动词'), h('subject', 'that'), h('predicate', 'mean', '实义谓语')], [['go down in', '被写入；列入（此处指简历）']]),
  'M-F02': note('但该研究并没有真正改变人们的看法，至少目前还没有。', [h('subject', 'the research'), h('predicate', 'has not really changed'), h('object', 'minds'), h('adverbial', 'at least not yet')], undefined, [['change minds', '改变看法']]),
  'M-G02': note('游戏学院建议的一部分，是把休闲玩家转变为“有意识”的玩家，并运用批判性思维培养他们的技能。', [h('subject', 'part of Game Academy’s suggestion'), h('predicate', 'is'), h('object', 'to transform casual gamers into “conscious” ones'), h('complement', 'applying critical thinking to developing their skills', '分词补充结构')], [h('subject', 'part of Game Academy’s suggestion'), h('predicate', 'is'), h('object', 'to transform casual gamers into “conscious” ones')]),
  'M-G04': note('他问：“为什么我不能把我们的游戏胜绩写进简历？”', [h('adverbial', 'Why', '原因疑问'), h('predicate', 'cannot', '情态谓语'), h('subject', 'I'), h('predicate', 'put', '实义谓语'), h('object', 'in my résumé our gaming victories and achievements'), h('subject', 'he'), h('predicate', 'asks', '引述动词')], [h('predicate', 'cannot', '情态谓语'), h('subject', 'I'), h('predicate', 'put', '实义谓语'), h('object', 'in my résumé our gaming victories and achievements')], [['put ... in one’s résumé', '把……写进简历']]),
  'M-G05': note('如果雇主说需要领导力，我为什么不能举出自己多年带领《魔兽世界》团队副本的经历？', [h('adverbial', 'If they say they want leadership', '条件状语从句'), h('adverbial', 'why', '原因疑问'), h('predicate', 'cannot', '情态谓语'), h('subject', 'I'), h('predicate', 'point', '实义谓语'), h('complement', 'to my years of leading World of Warcraft raids')], [h('predicate', 'cannot', '情态谓语'), h('subject', 'I'), h('predicate', 'point', '实义谓语'), h('complement', 'to my years of leading World of Warcraft raids')], [['point to', '举出；以……为例']]),
  'M-H04': note('如果想建造一艘新飞船，原材料必须由另一名玩家开采。', [h('adverbial', 'If you want to build a new spaceship', '条件状语从句'), h('subject', 'the raw material'), h('predicate', 'has to be mined'), h('complement', 'by another player')], [h('subject', 'the raw material'), h('predicate', 'has to be mined'), h('complement', 'by another player')], [['raw material', '原材料']]),
  'M-I01': note('Ricci 先生一直梦想经营自己的公司；后来他在游戏中管理了一家由数百名玩家组成的企业。', [h('subject', 'Mr. Ricci'), h('complement', 'who had always dreamed of being the boss of his own company', '定语从句（整体）'), h('predicate', 'ran'), h('object', 'an in-game corporation comprising hundreds of players')], [h('subject', 'Mr. Ricci'), h('predicate', 'ran'), h('object', 'an in-game corporation comprising hundreds of players')], [['dream of doing', '梦想做某事'], ['comprise', '由……组成；包含']]),
  'M-I02': note('最终，他意识到可以把这些技能用于现实商业，而不必继续无偿经营虚拟公司。', [h('adverbial', 'Eventually'), h('subject', 'he'), h('predicate', 'realised'), h('object', 'he could transfer his skills to real-life business', '宾语从句（整体）'), h('complement', 'instead of doing it for free')], [h('subject', 'he'), h('predicate', 'realised')], [['transfer ... to', '把……迁移、应用到'], ['instead of', '而不是']]),
  'M-K02': note('我倒很想说，游戏技能让我能像使用光子炮一样操作直线加速器消灭癌细胞，但现实并非如此。', [h('subject', 'I'), h('predicate', 'would love'), h('object', 'to say that my gaming skills allow me to destroy cancer using linear accelerators like photon blasters'), h('subject', 'that'), h('predicate', 'is not'), h('complement', 'quite the reality')], [h('subject', 'I'), h('predicate', 'would love'), h('object', 'to say that my gaming skills allow me to destroy cancer using linear accelerators like photon blasters'), h('subject', 'that'), h('predicate', 'is not'), h('complement', 'quite the reality')], [['would love to', '很想做某事'], ['linear accelerator', '直线加速器']]),
  'M-K05': note('游戏还培养了竞争意识，而他认为这种能力能够迁移到工作中。', [h('subject', 'Gaming'), h('predicate', 'encouraged'), h('object', 'a competitive spirit'), h('subject', 'that'), h('predicate', 'translates'), h('complement', 'he believes', '插入说明')], [h('subject', 'Gaming'), h('predicate', 'encouraged'), h('object', 'a competitive spirit'), h('subject', 'that'), h('predicate', 'translates')], [['competitive spirit', '竞争意识']]),
  'M-K04': note('每一次新的游戏升级都加深了他对计算机运作方式的了解。', [h('subject', 'Every new gaming upgrade'), h('predicate', 'improved'), h('object', 'his knowledge of how they worked')]),
  'M-K08': note('这与取得高分或完美通关并没有什么不同。', [h('complement', 'Not unlike achieving a high score or a perfect run', '省略式比较')]),
  'M-K10': note('解决问题也是我工作的重要组成部分。', [h('subject', 'problem-solving'), h('predicate', 'is'), h('complement', 'a big part of my job')], undefined, [['problem-solving', '解决问题的能力']]),
  'M-L04': note('但如果问他们工作中取得过同样规模的成就，他们就答不上来了。', [h('predicate', 'ask', '祈使句谓语'), h('object', 'them'), h('complement', 'the same about their work'), h('subject', 'they'), h('predicate', 'do not know')], [h('predicate', 'ask', '祈使句谓语'), h('object', 'them'), h('subject', 'they'), h('predicate', 'do not know')], [['the same about', '关于……的同类问题']]),
  'M-L05': note('人们玩游戏时能如此投入并获得强大技能——他问，为什么工作不能也做到这一点？', [h('object', 'The engagement and powerful skills that people get playing a game', '话题成分'), h('adverbial', 'why', '原因疑问'), h('predicate', 'cannot', '情态谓语'), h('subject', 'work'), h('predicate', 'be', '实义谓语'), h('complement', 'like that'), h('subject', 'he'), h('predicate', 'asks', '引述动词')], [h('predicate', 'cannot', '情态谓语'), h('subject', 'work'), h('predicate', 'be', '实义谓语'), h('complement', 'like that')], [['engagement', '投入；参与感']]),
  'R1-10': note('相比之下，新的干预措施巧妙地利用了青少年的叛逆与自主本能，以及他们对社会正义的重视。', [h('adverbial', 'In contrast'), h('subject', 'the new intervention'), h('predicate', 'exploits'), h('object', 'teenagers’ instinct for rebelliousness and autonomy'), h('object', 'and the value they place on social justice', '并列宾语')], [h('adverbial', 'In contrast'), h('subject', 'the new intervention'), h('predicate', 'exploits'), h('object', 'teenagers’ instinct for rebelliousness and autonomy')]),
  'R1-09': note('研究人员认为，以往干预可能失败在一个主要缺陷：它们只强调未来更健康的自己，并假定这足以激励青少年。', [h('subject', 'The researchers'), h('predicate', 'argued'), h('object', 'that previous interventions have probably been unsuccessful because of a major flaw', '宾语从句（整体）'), h('subject', 'they'), h('predicate', 'focused'), h('complement', 'on a future, healthier you'), h('predicate', 'assumed'), h('object', 'that this would be enough motivation for teenagers', '宾语从句（整体）')], [h('subject', 'The researchers'), h('predicate', 'argued'), h('subject', 'they'), h('predicate', 'focused'), h('complement', 'on a future, healthier you'), h('predicate', 'assumed')], [['focus on', '把重点放在'], ['be enough motivation for', '足以成为……的动力']]),
  'R1-11': note('为此，研究人员让学生阅读了一篇有关食品行业的文章。', [h('adverbial', 'To do this'), h('subject', 'researchers'), h('predicate', 'had'), h('object', 'students'), h('complement', 'read an article on the food industry')], undefined, [['have somebody do', '让某人做某事']]),
  'R1-13': note('文章还解释了广告活动如何专门针对非常年轻和贫困的人，从而伤害这些弱势群体。', [h('subject', 'The article'), h('predicate', 'explained'), h('object', 'how advertising campaigns specifically target very young and poor people, causing harm for these vulnerable groups', '宾语从句（整体）')], [h('subject', 'The article'), h('predicate', 'explained')]),
  'R1-17': note('更重要的是，新干预还对实际行为产生了一些令人鼓舞的影响。', [h('adverbial', 'Importantly'), h('subject', 'there'), h('predicate', 'were'), h('complement', 'also some promising effects of the new intervention on actual behavior')], undefined, [['promising effects', '令人鼓舞的效果']]),
  'R2-04': note('婴儿处于快速眼动睡眠时，这一阶段会让他们的大脑发展通路、建立连接，并最终学习语言。', [h('adverbial', 'When babies are in REM', '时间状语从句'), h('subject', 'it'), h('predicate', 'allows'), h('object', 'their brain'), h('complement', 'to develop pathways, connections, and eventually, learn languages')], [h('subject', 'it'), h('predicate', 'allows'), h('object', 'their brain'), h('complement', 'to develop pathways, connections, and eventually, learn languages')], [['allow ... to', '使……能够'], ['pathway', '通路；路径']]),
  'R2-05': note('既然婴儿在这一大脑发育阶段还不会做梦，也就可以合理判断他们不会做噩梦。', [h('adverbial', "Since your baby doesn't dream at this stage of brain development", '原因状语从句'), h('subject', 'it'), h('predicate', "'s safe to assume"), h('object', 'babies do not have nightmares, either', '宾语从句（整体）')], [h('subject', 'it'), h('predicate', "'s safe to assume")], [['it is safe to assume', '可以合理判断']]),
  'R2-07': note('你想知道婴儿会梦见什么吗？', [h('subject', 'you'), h('predicate', 'wondering'), h('object', 'what do babies dream about', '宾语从句（整体）')], [h('subject', 'you'), h('predicate', 'wondering')]),
  'R2-09': note('那么，婴儿从什么时候开始做梦？', [h('adverbial', 'when', '时间疑问'), h('predicate', 'do', '助动词'), h('subject', 'babies'), h('predicate', 'start', '实义谓语'), h('object', 'dreaming')], undefined, [['start doing', '开始做某事']]),
  'R2-15': note('不过，孩子在梦中究竟看到什么取决于他们的年龄。', [h('subject', 'exactly what kids see while dreaming', '主语从句（整体）'), h('predicate', 'depends'), h('complement', 'on their age')], [h('subject', 'exactly what kids see while dreaming', '主语从句（整体）'), h('predicate', 'depends'), h('complement', 'on their age')], [['depend on', '取决于']]),
  'R2-17': note('与成年人的梦相比，很小的孩子的梦通常只是快照；与电影相比，它们更像幻灯片。', [h('subject', 'Dreams of very small kids'), h('predicate', 'are'), h('complement', 'usually just snapshots'), h('adverbial', 'when compared to the dreams of adults', '比较状语')], [h('subject', 'Dreams of very small kids'), h('predicate', 'are'), h('complement', 'usually just snapshots')]),
  'R2-21': note('现在，梦境包含一个接一个串联起来的多个事件。', [h('subject', 'Dreams'), h('predicate', 'include'), h('object', 'multiple events strung together, one after the other')]),
  'R2-23': note('不过情况并非总是如此：在快速眼动睡眠中被唤醒时，福克斯研究中的 25% 儿童不记得自己做过梦，而且这一趋势会持续到 9 岁。', [h('adverbial', "Still, that's not always the case: When roused during REM sleep", '背景与时间状语'), h('subject', "25% of the kids in Foulkes' studies"), h('predicate', 'had'), h('object', 'no recollection of dreaming'), h('complement', 'a trend that continues through age 9', '同位补充')], [h('subject', "25% of the kids in Foulkes' studies"), h('predicate', 'had'), h('object', 'no recollection of dreaming')]),
});
