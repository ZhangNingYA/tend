import type { CloseReading, InlineGlossary } from '../types/closeReading';
import type { ReadingQuestion } from '../types/readingQuestion';
import { cet4InlineGlossary202606Set2 } from './cet4InlineGlossary202606Set2';
import { describeReadingStructure, readingStructurePattern } from './describeReadingStructure';

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

const qNote = (prompt: string) => {
  const words = firstWords(prompt);
  return note('题干：' + prompt, [h('subject', words[0] ?? prompt.slice(0, 10)), h('predicate', words[1] ?? 'asks')]);
};

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

const makeQuestion = (
  number: number,
  prompt: string,
  answer: 'A' | 'B' | 'C' | 'D',
  evidence: string,
  options: readonly [string, string, string, string],
): ReadingQuestion => ({
  number,
  prompt,
  answer,
  evidence,
  analysis: '定位原文后比较选项与原文的同义表达，正确项与证据句相符。',
  closeReading: qNote(prompt),
  options: options.map((text, index) => ({
    key: String.fromCharCode(65 + index) as 'A' | 'B' | 'C' | 'D',
    text,
    explanation: index === answer.charCodeAt(0) - 65 ? '正确：与原文信息一致。' : '错误：原文没有该信息或与原文不符。',
  })),
});

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
  cloze: { title: 'How music can reach the brain', sentences: clozeSentences },
  matching: { title: 'Can playing video games help you get a better job?', paragraphs: matching },
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
  ],
};
const autoTranslations: Record<string, string> = {
  "Some music inspires you to move your feet, some inspires you to get out there and change the world. In any case, it's fair to say that music moves people in special ways.": "有些音乐激励你迈出脚步，有些音乐激励你走出去改变世界。无论如何，可以公平地说，音乐以特殊的方式打动人们。",
  "If you're especially into a piece of music, your brain does something called Autonomous Sensory Meridian Response (ASMR), which feels to you like a sting in your brain.": "如果您特别喜欢一首音乐，您的大脑会执行一种称为自主感觉经络反应 (ASMR) 的操作，这对您来说就像大脑中的刺痛一样。",
  "It turns out that ASMR is pretty special. According to a recently published study in The Journal of Prevention of Alzheimer's Disease, the part of your brain responsible for ASMR doesn't get lost to Alzheimer's.": "事实证明，ASMR 相当特别。根据《阿尔茨海默病预防杂志》最近发表的一项研究，大脑中负责 ASMR 的部分不会因阿尔茨海默病而消失。",
  "Alzheimer's tends to put people into layers of confusion, and the study confirms that music can sometimes actually lift people out of the Alzheimer's haze and bring them back to (at least a likeness of) normality... if only for a short while.": "阿尔茨海默氏症往往会让人们陷入层层困惑，研究证实，音乐有时确实可以让人们摆脱阿尔茨海默氏症的阴霾，让他们恢复（至少是相似的）正常状态……哪怕只是短暂的一段时间。",
  "ASMR is powerful stuff!": "ASMR 很强大！",
  "This phenomenon has been observed several times but rarely studied properly.": "这种现象已被多次观察到，但很少得到适当的研究。",
  "One of the most famous examples of this is the story of 92-year-old Henry Dryer, who comes out of dementia (痴呆) while listening to songs from his youth.": "最著名的例子之一是 92 岁的亨利·德里尔 (Henry Dryer) 的故事，他在听着年轻时的歌曲时摆脱了痴呆症。",
  "Jeff Anderson, associate professor in Radiology at the University of Utah and contributing author on the study, says “In our society, the diagnoses of dementia are taxing resources to the maximum.”": "犹他大学放射学副教授、该研究的撰稿人杰夫·安德森 (Jeff Anderson) 表示：“在我们的社会中，痴呆症的诊断正在最大限度地消耗资源。”",
  "No one says playing music will be a cure for Alzheimer's disease, but it might make the symptoms more manageable.": "没有人说演奏音乐可以治愈阿尔茨海默病，但它可能会使症状更容易控制。",
  "The gaming industry is larger than films and music combined, yet few of us are likely to list our achievements in playing computer games as work experience in our résumé. But why not? Businesses are waking up to the skills gamers can bring to the workplace.": "游戏行业比电影和音乐加起来还要大，但我们很少有人会把玩电脑游戏的成就列为简历中的工作经验。但为什么不呢？企业正在意识到游戏玩家可以为工作场所带来的技能。",
  "One start-up is convinced that the skills learned by playing games—hard-won through years of training and battle—can be applied to real-life work situations.": "一家初创企业坚信，通过玩游戏学到的技能（通过多年的训练和战斗来之不易）可以应用于现实生活中的工作情况。",
  "And Game Academy reckons its belief is backed up by hard data.": "游戏学院认为它的信念是有确凿数据支持的。",
  "Do you enjoy unusual puzzle games like Portal, or tower defence games like Defense Grid?": "您喜欢像 Portal 这样不寻常的益智​​游戏，还是像 Def​​ense Grid 这样的塔防游戏？",
  "The team has found that IT workers play those more than average.": "该团队发现，IT 员工玩这些游戏的频率高于平均水平。",
  "But if you prefer Civilization, Total War, or X-Com, where strategy and resource management are key, then you might have more in common with managers.": "但如果你更喜欢《文明》、《全面战争》或《幽浮》，其中战略和资源管理是关键，那么你可能与管理者有更多共同点。",
  "Game Academy's idea is simple: analyse gamers' habits from their online gaming profile, and offer courses in valuable skills that reflect their aptitudes—skills they can practise and refine in-game.": "游戏学院的想法很简单：从玩家的在线游戏资料中分析他们的习惯，并提供反映他们才能的宝贵技能课程——他们可以在游戏中练习和完善的技能。",
  "And there is already a growing acceptance that gaming skills are transferable.": "人们已经越来越多地接受游戏技能是可以转移的。",
  "Even the military is hiring gamers.": "甚至军队也在招聘游戏玩家。",
  "“The ability to absorb information, react swiftly and coordinate actions whilst remaining calm under pressure are often attributes of people that are good at gaming,” according to a Royal Air Force spokesperson.": "英国皇家空军发言人表示：“善于博弈的人通常具有吸收信息、迅速反应和协调行动的能力，同时在压力下保持冷静。”",
  "Those skills are part of what the Royal Air Force is looking for “in a variety of roles”.": "这些技能是英国皇家空军正在寻找的“各种角色”人才的一部分。",
  "“Skills acquired through gaming can be very relevant to certain areas.”": "“通过游戏获得的技能可能与某些领域非常相关。”",
  "There are plenty of soft skills that gamers can utilise in a professional setting, such as teamwork, problem solving and strategic planning, says Ryan Gardner, a regional director with Hays recruitment.": "海斯招聘区域总监瑞安·加德纳 (Ryan Gardner) 表示，游戏玩家可以在专业环境中运用很多软技能，例如团队合作、解决问题和战略规划。",
  "But does that really mean your top 100 ranking in Overwatch should go down in your résumé?": "但这真的意味着你的《守望先锋》前 100 名排名应该在你的简历中下降吗？",
  "It is about how you either make it relevant to the job you are applying for, or how it makes you more interesting as a potential employee, Mr. Gardner says.": "加德纳先生说，这关系到你如何让它与你正在申请的工作相关，或者它如何让你作为一名潜在员工变得更有趣。",
  "Two years ago, a Glasgow University study made headlines for suggesting gaming could make students more successful.": "两年前，格拉斯哥大学的一项研究因表明游戏可以让学生更加成功而成为头条新闻。",
  "But the research has not really changed minds, at least not yet, says one of the authors of the study, Dr. Matthew Barr.": "但该研究的作者之一马修·巴尔博士表示，这项研究并没有真正改变人们的想法，至少目前还没有。",
  "For now, I think the negative reputation around games means that telling someone you're a determined gamer is more likely to harm your chances of getting a job.": "目前，我认为围绕游戏的负面声誉意味着告诉别人你是一名坚定的游戏玩家更有可能损害你找到工作的机会。",
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
  "Eventually, he realised he could transfer his skills to real-life business—instead of doing it for free.": "最终，他意识到他可以将自己的技能转移到现实生活中的业务中，而不是免费做。",
  "He restructured Zentech, once a taxation vehicle for his father’s business, and it is now in its fourth year helping international brands enter the Canadian market.": "他重组了 Zentech，这家公司曾经是他父亲企业的税务工具，现在已经是帮助国际品牌进入加拿大市场的第四个年头了。",
  "EVE teaches skills like creativity, leadership, organisation, and conflict resolution, he maintains.": "他坚持认为，《EVE》教授创造力、领导力、组织力和解决冲突等技能。",
  "He credits his success to his family, his strong desire to run his own business—and “a damn good company in Iceland that made a damn good game”.": "他将自己的成功归功于他的家庭、他经营自己企业的强烈愿望以及“冰岛一家非常好的公司，制作了一款非常棒的游戏”。",
  "Digital entrepreneur and business consultant Mia Bennett says: “In more traditional settings, gaming is still imagined to be the pursuit of teenage boys—a waste of time.”": "数字企业家兼商业顾问米娅·贝内特 (Mia Bennett) 表示：“在更传统的环境中，游戏仍然被认为是十几岁男孩的追求——浪费时间。”",
  "But there are some links to skills like decision-making, the ability to anticipate and future planning, she says.": "但她说，这与决策、预测能力和未来规划等技能有一些联系。",
  "It also helps with meta-skills—learning how to learn, experimentation, and creative thinking.": "它还有助于培养元技能——学习如何学习、实验和创造性思维。",
  "Twelve years into his career, Mark Long, a radiotherapy physicist with the NHS in Surrey, does not get as much gaming time as he used to.": "马克·朗 (Mark Long) 是萨里郡 NHS 的一名放射治疗物理学家，在他的职业生涯 12 年后，他并没有像以前那样获得那么多的游戏时间。",
  "I would love to say that my gaming skills allow me to destroy cancer using linear accelerators like photon blasters, but that is not quite the reality.": "我很想说，我的游戏技能使我能够使用光子喷射器等线性加速器来消灭癌症​​，但这并不完全是现实。",
  "Instead, he credits old-school games like Palace of Magic with exposing him to computers.": "相反，他认为《魔宫》等老派游戏让他接触到了电脑。",
  "Every new gaming upgrade improved his knowledge of how they worked.": "每一次新的游戏升级都加深了他对游戏运作方式的了解。",
  "Gaming also encouraged a competitive spirit—and that, he believes, translates.": "游戏还鼓励了竞争精神——他相信这一点也能得到体现。",
  "When creating treatment plans, the aim is to optimise the radiation dose to the tumour and restrict it as much as possible to healthy surrounding tissues and organs.": "在制定治疗计划时，目标是优化肿瘤的辐射剂量，并尽可能限制其对健康的周围组织和器官的辐射剂量。",
  "It is about repeating the process, but each time doing something slightly different to improve the result.": "这是关于重复这个过程，但每次都做一些稍微不同的事情来改善结果。",
  "Not unlike achieving a high score or a perfect run.": "与获得高分或完美跑步没什么不同。",
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
  "Bad diets are.": "不良饮食是。",
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
  "So, it might be fair to assume that babies have tons of dreams.": "因此，可以合理地假设婴儿有很多梦想。",
  "But scientists believe REM serves a completely different purpose for newborns and infants than dreaming.": "但科学家认为，对于新生儿和婴儿来说，快速眼动睡眠的目的与做梦完全不同。",
  "When babies are in REM, it allows their brain to develop pathways, connections, and eventually, learn languages.": "当婴儿处于快速眼动睡眠阶段时，他们的大脑可以发展出通路、联系，并最终学习语言。",
  "Since your baby doesn't dream at this stage of brain development, it's safe to assume babies do not have nightmares, either.": "由于您的宝宝在大脑发育的这个阶段不会做梦，因此可以安全地假设宝宝也不会做噩梦。",
  "Nightmares stem from exposure to trauma, an overactive imagination, and the normal stresses of everyday life.": "噩梦源于创伤、过度活跃的想象力以及日常生活中的正常压力。",
  "Are you wondering, what do babies dream about?": "你想知道，婴儿会梦见什么吗？",
  "Good question, but the answer is nothing!": "好问题，但答案是什么都没有！",
  "So, when do babies start dreaming?": "那么，宝宝什么时候开始做梦呢？",
  "The general consensus is that they start dreaming around the age of two.": "人们普遍认为，他们在两岁左右就开始做梦了。",
  "Psychologist David Foulkes studies children (from very small kids to teens) to bring the secrets of their dreams to the light of day.": "心理学家大卫·福克斯（David Foulkes）对儿童（从很小的孩子到青少年）进行研究，以揭示他们梦想的秘密。",
  "In his lab, he lets kids fall asleep and then wakes them 3 times a night and asks them to describe what they recall.": "在他的实验室里，他让孩子们入睡，然后每晚叫醒他们 3 次，并要求他们描述所记得的事情。",
  "Foulkes' findings are unsurprising.": "福克斯的发现并不令人意外。",
  "Basically, little kids have little dreams.": "基本上，小孩子都有小梦想。",
  "But exactly what kids see while dreaming depends on their age.": "但孩子们在做梦时看到的具体内容取决于他们的年龄。",
  "As children develop and grow, their dreams do too.": "随着孩子的成长，他们的梦想也在成长。",
  "Dreams of very small kids are usually just snapshots, looking much more like a slideshow than a movie, when compared to the dreams of adults.": "与成年人的梦想相比，很小的孩子的梦想通常只是快照，看起来更像幻灯片而不是电影。",
  "They heavily feature animals and other familiar sights, like images of people eating.": "它们以动物和其他熟悉的景象为特色，比如人们吃饭的图像。",
  "According to Foulkes, “Children’s dream life... seems to be similar to their waking imagination and narration.”": "福克斯表示，“孩子们的梦想生活……似乎与他们清醒时的想象和叙述相似。”",
  "Kids ages 5–9 begin seeing moving images and characters in action.": "5 至 9 岁的孩子开始看到活动的图像和角色。",
  "Dreams now include multiple events strung together, one after the other.": "现在的梦想包括多个事件一个接一个地串联在一起。",
  "They also start developing greater ability to remember dreams.": "他们也开始发展出更强的记住梦境的能力。",
  "Still, that's not always the case: When roused during REM sleep, 25% of the kids in Foulkes' studies had no recollection of dreaming, a trend that continues through age 9.": "不过，情况并非总是如此：在福克斯的研究中，当在快速眼动睡眠期间被唤醒时，25% 的孩子不记得做过梦，这种趋势一直持续到 9 岁。",
  "So, if your baby seems to be in a stressful state while sleeping or is upset upon waking, there may be other factors at play.": "因此，如果您的宝宝在睡觉时似乎处于压力状态或醒来后感到不安，可能还有其他因素在起作用。"
};
clozeSentences.forEach((sentence, index) => { const key = `C${String(index + 1).padStart(2, '0')}`; closeReadings[key].translation = autoTranslations[sentence] ?? closeReadings[key].translation; });
matching.forEach((paragraph) => paragraph.sentences.forEach((sentence, index) => { const key = `M-${paragraph.label}${String(index + 1).padStart(2, '0')}`; closeReadings[key].translation = autoTranslations[sentence] ?? closeReadings[key].translation; }));
passageOneSentences.forEach((sentence, index) => { const key = `R1-${String(index + 1).padStart(2, '0')}`; closeReadings[key].translation = autoTranslations[sentence] ?? closeReadings[key].translation; });
passageTwoSentences.forEach((sentence, index) => { const key = `R2-${String(index + 1).padStart(2, '0')}`; closeReadings[key].translation = autoTranslations[sentence] ?? closeReadings[key].translation; });

Object.assign(closeReadings, {
  C09: note('没有人说播放音乐能治愈阿尔茨海默病，但它可能让症状更容易控制、降低护理成本并改善患者的生活质量。', [h('subject', 'No one'), h('predicate', 'says')]),
  C01: note('有些音乐激励你迈出脚步，有些音乐激励你走出去改变世界；无论如何，音乐确实会以特别的方式打动人。', [h('subject', 'Some music'), h('predicate', 'inspires'), h('object', 'you to move your feet'), h('subject', 'some'), h('predicate', 'inspires'), h('object', 'you to get out there and change the world'), h('subject', 'it'), h('predicate', "'s fair to say"), h('object', 'that music moves people in special ways', '宾语从句（整体）')], [h('subject', 'Some music'), h('predicate', 'inspires'), h('object', 'you to move your feet'), h('subject', 'some'), h('predicate', 'inspires'), h('object', 'you to get out there and change the world'), h('subject', 'it'), h('predicate', "'s fair to say")]),
  'M-A01': note('游戏行业的规模超过电影和音乐的总和，但我们很少有人会把游戏成就列为简历中的工作经验。', [h('subject', 'The gaming industry'), h('predicate', 'is'), h('complement', 'larger than films and music combined'), h('subject', 'few of us'), h('predicate', 'are likely'), h('complement', 'to list our achievements in playing computer games as work experience in our résumé', '不定式补充')], [h('subject', 'The gaming industry'), h('predicate', 'is'), h('complement', 'larger than films and music combined')]),
  'M-A02': note('但为什么不把它列入简历呢？', [h('adverbial', 'But'), h('predicate', 'why not', '省略式疑问')]),
  'M-A03': note('企业开始意识到游戏玩家能带给职场的技能。', [h('subject', 'Businesses'), h('predicate', 'are waking up'), h('complement', 'to the skills gamers can bring to the workplace')]),
  'M-B03': note('你喜欢 Portal 这样的不寻常益智游戏，还是 Defense Grid 这样的塔防游戏？', [h('subject', 'you'), h('predicate', 'enjoy'), h('object', 'unusual puzzle games like Portal, or tower defence games like Defense Grid')]),
  'M-B05': note('但如果你更喜欢 Civilization、Total War 或 X-Com 这类强调策略和资源管理的游戏，那么你可能更接近管理者的能力画像。', [h('adverbial', 'But if you prefer Civilization, Total War, or X-Com, where strategy and resource management are key', '条件状语从句'), h('subject', 'you'), h('predicate', 'might have'), h('object', 'more in common with managers')], [h('subject', 'you'), h('predicate', 'might have'), h('object', 'more in common with managers')]),
  'M-F04': note('但举例来说，如果有人能说明自己如何在网络游戏中带领团队，他或许就能让雇主相信这种能力有用。', [h('adverbial', 'But if someone can explain how they have led a team in an online game, for example', '条件状语从句'), h('subject', 'they'), h('predicate', 'may be able'), h('complement', 'to persuade an employer that this is useful')], [h('subject', 'they'), h('predicate', 'may be able'), h('complement', 'to persuade an employer that this is useful')]),
  'M-G02': note('游戏学院建议的一部分，是把休闲玩家转变为“有意识”的玩家，并运用批判性思维培养他们的技能。', [h('subject', 'part of Game Academy’s suggestion'), h('predicate', 'is'), h('object', 'to transform casual gamers into “conscious” ones'), h('complement', 'applying critical thinking to developing their skills', '分词补充结构')], [h('subject', 'part of Game Academy’s suggestion'), h('predicate', 'is'), h('object', 'to transform casual gamers into “conscious” ones')]),
  'M-K04': note('每一次新的游戏升级都加深了他对计算机运作方式的了解。', [h('subject', 'Every new gaming upgrade'), h('predicate', 'improved'), h('object', 'his knowledge of how they worked')]),
  'M-K08': note('这与取得高分或完美通关并没有什么不同。', [h('complement', 'Not unlike achieving a high score or a perfect run', '省略式比较')]),
  'R1-10': note('相比之下，新的干预措施巧妙地利用了青少年的叛逆与自主本能，以及他们对社会正义的重视。', [h('adverbial', 'In contrast'), h('subject', 'the new intervention'), h('predicate', 'exploits'), h('object', 'teenagers’ instinct for rebelliousness and autonomy'), h('object', 'and the value they place on social justice', '并列宾语')], [h('adverbial', 'In contrast'), h('subject', 'the new intervention'), h('predicate', 'exploits'), h('object', 'teenagers’ instinct for rebelliousness and autonomy')]),
  'R1-13': note('文章还解释了广告活动如何专门针对非常年轻和贫困的人，从而伤害这些弱势群体。', [h('subject', 'The article'), h('predicate', 'explained'), h('object', 'how advertising campaigns specifically target very young and poor people, causing harm for these vulnerable groups', '宾语从句（整体）')], [h('subject', 'The article'), h('predicate', 'explained')]),
  'R2-07': note('你想知道婴儿会梦见什么吗？', [h('subject', 'you'), h('predicate', 'wondering'), h('object', 'what do babies dream about', '宾语从句（整体）')], [h('subject', 'you'), h('predicate', 'wondering')]),
  'R2-17': note('与成年人的梦相比，很小的孩子的梦通常只是快照；与电影相比，它们更像幻灯片。', [h('subject', 'Dreams of very small kids'), h('predicate', 'are'), h('complement', 'usually just snapshots'), h('adverbial', 'when compared to the dreams of adults', '比较状语')], [h('subject', 'Dreams of very small kids'), h('predicate', 'are'), h('complement', 'usually just snapshots')]),
  'R2-21': note('现在，梦境包含一个接一个串联起来的多个事件。', [h('subject', 'Dreams'), h('predicate', 'include'), h('object', 'multiple events strung together, one after the other')]),
  'R2-23': note('不过情况并非总是如此：在快速眼动睡眠中被唤醒时，福克斯研究中的 25% 儿童不记得自己做过梦，而且这一趋势会持续到 9 岁。', [h('adverbial', "Still, that's not always the case: When roused during REM sleep", '背景与时间状语'), h('subject', "25% of the kids in Foulkes' studies"), h('predicate', 'had'), h('object', 'no recollection of dreaming'), h('complement', 'a trend that continues through age 9', '同位补充')], [h('subject', "25% of the kids in Foulkes' studies"), h('predicate', 'had'), h('object', 'no recollection of dreaming')]),
});
