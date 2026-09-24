import type { CloseReading, InlineGlossary } from '../../types/closeReading';
import type { ReadingQuestion, ReadingQuestionOption } from '../../types/readingQuestion';

const sections = {
  "cloze": {
    "title": "Asking for help is harder than it seems",
    "sentences": [
      "There are many understandable reasons why you might find it difficult to ask for help when you need it.",
      "Psychologists have been interested in this question for decades, not least because people’s widespread reluctance to ask for help has led to some high-profile failures.",
      "Asking for help takes courage.",
      "It involves communicating a need on your part — there’s something you can’t do.",
      "In other words, you’re broadcasting your own weaknesses, which can be uncomfortable.",
      "You might worry about coming across as incompetent.",
      "You might have concerns about losing control of whatever it is you are asking for help with.",
      "Once someone starts to help, perhaps they will take over, or get credit for your earlier efforts.",
      "Yet another factor that you might be worried about is being a nuisance or inconveniencing the person you go to for help.",
      "If you struggle with low self-esteem, you might find it especially difficult to reach out for help because you have the added worry of the other person declining your request.",
      "You might see such refusals as implying something negative about the status of your relationship with them.",
      "To overcome these difficulties, try to remind yourself that everyone needs help sometimes.",
      "Nobody knows everything and can do everything all by themselves.",
      "And while you might fear coming across as incompetent, there’s actually research that shows that advice-seekers are perceived as more competent, not less.",
      "Perhaps most encouraging of all is a paper from 2022 by researchers at Stanford University, in California, that involved a mix of contrived help-seeking interactions and asking people to recall times they’d sought help in the past.",
      "The findings showed that help-seekers generally underestimate how willing other people will be to help and how good it will make the help-giver feel (for most people, having the chance to help someone is highly rewarding).",
      "So bear all this in mind the next time you need to ask for help.",
      "Also, take care over who you ask and when you ask them.",
      "And if someone can’t help right now, avoid taking it personally.",
      "They might just be too busy, or they might not feel confident about their ability to help."
    ]
  },
  "matching": {
    "title": "Five Steps to Suggesting a Change at Work That’ll Actually Get Taken Seriously",
    "paragraphs": [
      {
        "label": "A",
        "sentences": [
          "Great ideas don’t stand alone.",
          "In other words, you can’t mention your suggestion once and expect it to be adopted.",
          "To see a change, you’ll need to champion your plan and sell its merits.",
          "In addition, you need to be willing to stand up to scrutiny and criticism and be prepared to explain your innovation in different ways for various audiences."
        ]
      },
      {
        "label": "B",
        "sentences": [
          "Sometimes it makes sense to go to your boss first.",
          "But other times, it’s useful to build a coalition among your co-workers or other stakeholders.",
          "When it works, it works great — because you’re ready for your stubborn supervisor’s pushback with answers like, “Actually, I connected with a few people in our tech department to discuss how much time these kinds of website updates would take, and they suggested they have the bandwidth.”",
          "However, just be certain you can explain your end-around approach as one that built your case, rather than simply circumvented your manager.",
          "The last thing you want is for your boss to feel embarrassed he wasn’t informed—which could lead him to quash the idea before it even takes off."
        ]
      },
      {
        "label": "C",
        "sentences": [
          "One of the biggest barriers to gaining buy-in occurs when the owner of an idea is viewed as argumentative, defensive, or close-minded.",
          "Because, let’s be honest: No one likes a know-it-all.",
          "So, if people disagree with you, don’t be indignant.",
          "Instead, listen to their concerns fully, try to understand their perspective, and include their concerns (and possible remedies) in future discussions.",
          "So, instead of saying, “Martha, our current slogan is confusing and should be updated,” you could try, “Martha raises a great point that our current slogan has a long history for our stakeholders, but I wonder if we might be able to brainstorm a tagline that could build on that — and be clearer for new customers.”"
        ]
      },
      {
        "label": "D",
        "sentences": [
          "New ideas are the grandchildren of old ones.",
          "In other words, don’t throw old solutions under the bus to make your improvement stand out.",
          "Remember that in light of whatever the problem the old system solved — or, maybe, has failed to solve in recent memory — it was a great idea at the time.",
          "Appreciating the older contributions as you suggest future innovations helps bolster the credibility of your idea."
        ]
      },
      {
        "label": "E",
        "sentences": [
          "When pitching a new idea, it’s important to use the language of abundance instead of the language of deficit.",
          "Instead of saying what is wrong, broken, or suboptimal, talk about what is right, fixable, or ideal.",
          "For example, try, “I can see lots of applications for this new approach” rather than, “This innovation is the only way.”",
          "Be optimistic but realistic, and you will stand out.",
          "There is rarely value in pointing out a problem without also offering a solution.",
          "Innovation isn’t seeing the problem, it is being able to see a viable solution to the issue.",
          "So, use the steps above to pitch your new idea—they should help you overcome the barriers to buy-in so that people will be on board and excited."
        ]
      }
    ]
  },
  "passages": [
    {
      "title": "Text 1 · Tipping etiquette and norms are in flux",
      "sentences": [
        "U.S. customers historically tipped people they assumed were earning most of their income via tips, such as restaurant servers earning less than the minimum wage.",
        "In the early 2010s, a wide range of businesses started processing purchases with iPads and other digital payment systems.",
        "These systems often prompted customers to tip for services that were not previously tipped.",
        "Today’s tip requests are often not connected to the salary and service norms that used to determine when and how people tip.",
        "Customers in the past nearly always paid tips after receiving a service, such as at the conclusion of a restaurant meal, after getting a haircut or once a pizza was delivered.",
        "That timing could reward high-quality service and give workers an incentive to provide it.",
        "It’s becoming more common for tips to be requested beforehand.",
        "And new tipping technology may even automatically add tips.",
        "The prevalence of digital payment devices has made it easier to ask customers for a tip.",
        "That helps explain why tip requests are creeping into new kinds of services.",
        "Customers now routinely see menus of suggested default options — often well above 20% of what they owe.",
        "The amounts have risen from 10% or less in the 1950s to 15% around the year 2000 to 20% or higher today.",
        "This increase is sometimes called tipflation — the expectation of ever-higher tip amounts.",
        "Tipping has always been a vital source of income for workers in historically tipped services, like restaurants, where the tipped minimum wage can be as low as US $2.13 an hour.",
        "Tip creep and tipflation are now further supplementing the income of many low-wage service workers.",
        "Notably, tipping primarily benefits some of these workers, such as waiters, but not others, such as cooks and dishwashers.",
        "To ensure that all employees were paid fair wages, some restaurants banned tipping and increased prices, but this movement towards no-tipping services has largely fizzled out.",
        "So to increase employee wages without raising prices, more employers are succumbing to temptations of tip creep and tipflation.",
        "However, many customers are frustrated because they feel they are being asked for too high of a tip too often.",
        "And, as our research emphasizes, tipping now seems to be more coercive, less generous, and often completely dissociated from service quality."
      ]
    },
    {
      "title": "Text 2 · Reimagining health",
      "sentences": [
        "When it was established, the National Health Service (NHS) was visionary: offering high-quality, timely care to meet the dominant needs of the population it served.",
        "Nearly 75 years on, with the UK facing very different health challenges, it is clear that the model is out of date.",
        "From life expectancy to cancer and infant mortality rates, we are lagging behind many of our peers.",
        "With more than 6.8 million on waitlists, healthcare is becoming increasingly inaccessible for those who cannot opt to pay for private treatment; and the cost of providing healthcare is increasingly squeezing our investment in other public services.",
        "As demand for healthcare continues to grow, pressures on the workforce — which is already near breaking point — will only become more acute.",
        "Many of the answers to the crisis in health and care are well rehearsed.",
        "We need to be much better at reducing and diverting demand on health services, rather than simply managing it.",
        "Much more needs to be invested in communities and primary care to reduce our reliance on hospitals.",
        "And capacity in social care needs to be greater, to support the growing number of people living with long-term conditions.",
        "Yet despite two decades of strategies and a number of major health reforms, we have failed to make meaningful progress on any of these aims.",
        "That is why the Reform think tank is launching a new programme of work entitled “Reimagining health”, supported by ten former health ministers.",
        "Together, we are calling for a much more open and honest conversation about the future of health in the UK, and an “urgent rethink” of the hospital-centric model we retain.",
        "This must begin with the question of how we maximise the health of the nation, rather than “fix” the NHS.",
        "It is estimated, for example, that healthcare accounts for only about 20% of health outcomes.",
        "Much more important are the places we live, work and socialise — yet there is no clear cross-government strategy for improving these social determinants of health.",
        "Worse, when policies like the national obesity strategy are scrapped, taxpayers are left with the hefty price tag of treating the illnesses, like diabetes, that result.",
        "Reform wants to ask how power and resources should be distributed in our health system.",
        "What health functions should remain at the centre, and what should be given to local leaders, often responsible for services that create health, and with a much better understanding of the needs of their populations?"
      ]
    },
    {
      "title": "Text 3 · Heat action plans in India",
      "sentences": [
        "Heat action plans, or HAPs, have been proliferating in India in the past few years.",
        "In general, an HAP spells out when and how officials should issue heat warnings and alert hospitals and other institutions.",
        "Nagpur’s plan, for instance, calls for hospitals to set aside “cold wards” in the summer for treating heatstroke patients, and advises builders to give construction laborers a break from work on very hot days.",
        "But implementation of existing HAPs has been uneven, according to a report from the Center for Policy Research.",
        "Many lack adequate funding, it found.",
        "And their triggering thresholds often are not customized to the local climate.",
        "In some areas, high daytime temperatures alone might serve as an adequate trigger for alerts.",
        "But in other places, nighttime temperatures or humidity might be as important a gauge of risk as daytime highs.",
        "Mumbai’s April heat stroke deaths highlighted the need for more nuanced and localized warnings, researchers say.",
        "That day’s high temperature of roughly 36°C was 1°C shy of the heat wave alert threshold for coastal cities set by national meteorological authorities.",
        "But the effects of the heat were amplified by humidity — an often neglected factor in heat alert systems — and the lack of shade at the late-morning outdoor ceremony.",
        "To help improve HAPs, urban planner Kotharkar’s team is working on a model plan that outlines best practices and could be adapted to local conditions.",
        "Among other things, she says, all cities should create a vulnerability map to help focus responses on the populations most at risk.",
        "Such mapping doesn’t need to be complex, Kotharkar says.",
        "“A useful map can be created by looking at even a few key parameters.”",
        "For example, neighborhoods with a large elderly population or informal dwellings that cope poorly with heat could get special warnings or be bolstered with cooling centers.",
        "The Nagpur project has already created a risk and vulnerability map, which enabled Kotharkar to tell officials which neighborhoods to focus on in the event of a heat wave this summer.",
        "HAPs shouldn’t just include short-term emergency responses, researchers say, but also recommend medium-to long-term measures that could make communities cooler.",
        "In Nagpur, for example, Kotharkar’s team has been able to advise city officials about where to plant trees to provide shade.",
        "HAPs could also guide efforts to retrofit homes or modify building regulations.",
        "“Reducing deaths in an emergency is a good target to have, but it’s the lowest target,” says climate researcher Chandni Singh."
      ]
    },
    {
      "title": "Text 4 · Desire paths and urban choice",
      "sentences": [
        "Navigating beyond the organised pavements and parks of our urban spaces, desire paths are the unofficial footprints of a community, revealing the unspoken preferences, shared shortcuts and collective choices of humans.",
        "Often appearing as trodden dirt tracks through otherwise neat green spaces, these routes of collective disobedience cut corners, bisect lawns and cross hills, representing the natural capability of people (and animals) to go from point A to point B most effectively.",
        "Urban planners interpret desire paths as more than just convenient shortcuts; they offer valuable insights into the dynamics between planning and behaviour.",
        "Ohio State University allowed its students to navigate the Oval, a lawn in the centre of campus, freely, then proceeded to pave the desire paths, creating a web of effective routes students had established.",
        "Yet, reluctance persists among other planners to integrate desire paths into formal plans, citing concerns about safety, environmental impact, or primarily, aesthetics.",
        "A Reddit webpage devoted to the phenomenon, boasting nearly 50,000 members, showcases images of local desire paths adorned with signs instructing pedestrians to adhere to designated walkways, underscoring the rebellious nature inherent in these human-made tracks.",
        "This clash highlights an ongoing struggle between the organic, user-driven evolution of public spaces and the desire for a visually curated and controlled urban environment.",
        "The Wickquasgeck Trail is an example of a historical desire path, created by Native Americans to cross the forests of Manhattan and move between settlements quickly.",
        "This trail, when Dutch colonists arrived, was widened and made into one of the main trade roads across the island, known at the time as de Heere Straat, or Gentlemen’s Street.",
        "Following the British assumption of control in New York, the street was renamed Broadway.",
        "Notably, Broadway stands out as one of the few areas in NYC that defies the grid-based system applied to the rest of the city, cutting a diagonal across parts of the city.",
        "In online spaces, desire paths have sparked a fascination that can approach obsession, with the Reddit page serving as a hub.",
        "Contributors offer a wide array of stories, from little-known new shortcuts to long-established alternate routes.",
        "Animal desire paths, such as ducks forging trails through frozen ponds or dogs carving direct routes in gardens, highlight the adaptability of these trails in both human and animal experiences.",
        "As desire paths criss-cross through both physical and virtual landscapes, they stand as a proof of the collective insistence on forging unconventional routes and embracing the spirit of communal choice."
      ]
    }
  ]
} as const;

const questionNote = (prompt: string): CloseReading => ({ translation: prompt, vocabulary: [], structure: { pattern: '题干主干', explanation: '先找题干主语和谓语，再回到原文定位同义信息。' }, highlights: [{ role: 'complement', text: prompt }] });
const makeQuestions = (specs: readonly any[]): readonly ReadingQuestion[] => specs.map((item) => ({ ...item, closeReading: questionNote(item.prompt), options: item.options.map(([key, text, explanation]: ReadingQuestionOption | any) => ({ key, text, explanation })) }));
const passageQuestionSpecs = [
  [
    {
      "number": 21,
      "prompt": "According to Paragraph 1, the practice of tipping in the U.S. ____",
      "answer": "B",
      "evidence": "U.S. customers historically tipped people they assumed were earning most of their income via tips.",
      "analysis": "第一段把传统小费对象限定为依赖小费收入的服务人员，因此小费对这类员工十分重要。",
      "options": [
        [
          "A",
          "was regarded as a sign of generosity",
          "原文强调小费与收入和服务规范有关，没有评价其为慷慨象征。"
        ],
        [
          "B",
          "was considered essential for waiters",
          "正确；waiters 等传统小费行业员工依靠小费收入。"
        ],
        [
          "C",
          "was a way of rewarding diligence",
          "奖励服务质量是过去支付时机的作用，不是第一段对传统对象的描述。"
        ],
        [
          "D",
          "was optional in most businesses",
          "第一段没有说大多数企业中的小费是否可选。"
        ]
      ]
    },
    {
      "number": 22,
      "prompt": "Compared with tips in the past, today’s tips ____",
      "answer": "C",
      "evidence": "That timing could reward high-quality service ... It’s becoming more common for tips to be requested beforehand.",
      "analysis": "过去小费在服务完成后支付，能奖励服务质量；如今常在服务前提出，联系变弱。",
      "options": [
        [
          "A",
          "are paid much less frequently",
          "文章没有说今天小费支付频率下降。"
        ],
        [
          "B",
          "are less often requested in advance",
          "原文恰恰说事先提出小费越来越常见。"
        ],
        [
          "C",
          "have less to do with service quality",
          "正确；小费请求与服务质量规范的联系已经减弱。"
        ],
        [
          "D",
          "contribute less to workers’ income",
          "文章说小费仍是许多服务人员的重要收入来源。"
        ]
      ]
    },
    {
      "number": 23,
      "prompt": "Tip requests are creeping into new kinds of services as a result of ____",
      "answer": "A",
      "evidence": "The prevalence of digital payment devices has made it easier to ask customers for a tip.",
      "analysis": "数字支付设备让商家更容易在新场景中提出小费请求。",
      "options": [
        [
          "A",
          "the advancement of technology",
          "正确；数字支付设备使索取小费更容易。"
        ],
        [
          "B",
          "the desire for income increase",
          "增加收入是雇主继续依赖小费的原因，但不是新服务出现请求的直接原因。"
        ],
        [
          "C",
          "the diversification of business",
          "原文没有把商业多样化作为原因。"
        ],
        [
          "D",
          "the emergence of tipflation",
          "tipflation 是小费比例上升的名称，不能解释请求扩散的根本原因。"
        ]
      ]
    },
    {
      "number": 24,
      "prompt": "The movement toward no-tipping services was intended to ____",
      "answer": "D",
      "evidence": "To ensure that all employees were paid fair wages, some restaurants banned tipping and increased prices.",
      "analysis": "取消小费、提高价格的初衷是让所有员工获得公平工资。",
      "options": [
        [
          "A",
          "promote consumption",
          "原文没有提到促进消费。"
        ],
        [
          "B",
          "enrich income sources",
          "取消小费并非为了增加收入来源。"
        ],
        [
          "C",
          "maintain reasonable prices",
          "取消小费的餐厅反而提高了价格。"
        ],
        [
          "D",
          "guarantee income fairness",
          "正确；目的是让所有员工获得公平工资。"
        ]
      ]
    },
    {
      "number": 25,
      "prompt": "It can be learned from the last paragraph that tipping ____",
      "answer": "A",
      "evidence": "many customers are frustrated because they feel they are being asked for too high of a tip too often.",
      "analysis": "最后一段强调小费要求过高且过于频繁，顾客因此感到压力。",
      "options": [
        [
          "A",
          "is becoming a burden for customers",
          "正确；顾客因金额过高、请求过频而感到沮丧。"
        ],
        [
          "B",
          "helps encourage quality service",
          "最后一段强调小费与服务质量脱钩。"
        ],
        [
          "C",
          "is vital to business development",
          "段落重点是顾客负担和服务质量脱节，不是商业发展。"
        ],
        [
          "D",
          "reflects the need to reduce prices",
          "文章说雇主想不涨价而依赖小费，不能推出小费反映降价需要。"
        ]
      ]
    }
  ],
  [
    {
      "number": 26,
      "prompt": "According to the first two paragraphs, the NHS ____",
      "answer": "B",
      "evidence": "With more than 6.8 million on waitlists, healthcare is becoming increasingly inaccessible.",
      "analysis": "等待名单、医疗可及性下降以及劳动力压力说明 NHS 难以满足需求。",
      "options": [
        [
          "A",
          "is troubled by funding deficiencies",
          "文章说医疗成本挤压其他公共服务投入，但不是仅仅资金不足。"
        ],
        [
          "B",
          "can hardly satisfy people's needs",
          "正确；等待人数多、可及性下降，说明医疗体系难以满足需求。"
        ],
        [
          "C",
          "can barely retain its current employees",
          "文章说劳动力接近极限，没有说员工已经留不住。"
        ],
        [
          "D",
          "is rivalled by private medical services",
          "私营治疗只是部分人可以选择的支付方式，不是 NHS 面临的主要结论。"
        ]
      ]
    },
    {
      "number": 27,
      "prompt": "One answer to the crisis in health and care is to ____",
      "answer": "C",
      "evidence": "Much more needs to be invested in communities and primary care to reduce our reliance on hospitals.",
      "analysis": "文章明确提出增加社区和初级医疗投入，减少对医院的依赖。",
      "options": [
        [
          "A",
          "boost the efficiency of hospitals",
          "文章要求减少对医院的依赖，而非只提高医院效率。"
        ],
        [
          "B",
          "lighten the burden on social care",
          "文章主张扩大社会照护容量。"
        ],
        [
          "C",
          "increase resources for primary care",
          "正确；文中明确说应向社区和初级医疗投入更多资源。"
        ],
        [
          "D",
          "reduce the pressure on communities",
          "文章主张投资社区来分流需求，不是减少社区压力。"
        ]
      ]
    },
    {
      "number": 28,
      "prompt": "“Reimagining health” is aimed to ____",
      "answer": "C",
      "evidence": "an “urgent rethink” of the hospital-centric model we retain.",
      "analysis": "该项目要求重新思考以医院为中心的体系，属于系统性重构。",
      "options": [
        [
          "A",
          "reinforce hospital management",
          "项目恰恰质疑医院中心模式。"
        ],
        [
          "B",
          "readjust healthcare regulations",
          "文章没有把法规调整作为项目目标。"
        ],
        [
          "C",
          "restructure the health system",
          "正确；项目要求重新思考医疗体系和权力资源分配。"
        ],
        [
          "D",
          "resume suspended health reforms",
          "文章说过去改革未取得有意义进展，不是恢复暂停改革。"
        ]
      ]
    },
    {
      "number": 29,
      "prompt": "To maximise the nation’s health, the author suggests ____",
      "answer": "B",
      "evidence": "Much more important are the places we live, work and socialise — yet there is no clear cross-government strategy for improving these social determinants of health.",
      "analysis": "作者认为生活、工作和社交环境等社会因素对健康更重要。",
      "options": [
        [
          "A",
          "introducing relevant taxation policies",
          "税收只在肥胖政策被取消的例子中出现，不是作者建议。"
        ],
        [
          "B",
          "paying due attention to social factors",
          "正确；作者强调社会健康决定因素。"
        ],
        [
          "C",
          "reevaluating major health outcomes",
          "文章没有要求重新评估结果。"
        ],
        [
          "D",
          "enhancing the quality of healthcare",
          "作者认为医疗服务只占健康结果的一部分，不能单靠提升医疗质量。"
        ]
      ]
    },
    {
      "number": 30,
      "prompt": "It can be inferred that local leaders should ____",
      "answer": "C",
      "evidence": "what should be given to local leaders, often responsible for services that create health.",
      "analysis": "地方领导更了解本地人口需求，应在创造健康的服务中承担更大作用。",
      "options": [
        [
          "A",
          "exercise their power more reasonably",
          "文章没有直接评价地方领导使用权力是否合理。"
        ],
        [
          "B",
          "develop a stronger sense of responsibility",
          "文章强调其职能和地方知识，不是责任感。"
        ],
        [
          "C",
          "play a bigger role in the health system",
          "正确；部分权力和资源应交给更了解当地需求的地方领导。"
        ],
        [
          "D",
          "understand people's health needs better",
          "文章说地方领导已经更了解当地需求，而不是提出他们还要理解得更好。"
        ]
      ]
    }
  ],
  [
    {
      "number": 31,
      "prompt": "According to Paragraph 1, Nagpur’s plan proposes measures to ____",
      "answer": "A",
      "evidence": "set aside “cold wards” ... and advises builders to give construction laborers a break from work on very hot days.",
      "analysis": "纳格浦尔计划针对中暑等高温风险安排医疗和劳动保护措施。",
      "options": [
        [
          "A",
          "tackle extreme weather",
          "正确；计划针对高温天气安排病房和劳动休息。"
        ],
        [
          "B",
          "ensure construction quality",
          "建筑工人的休息安排不是施工质量措施。"
        ],
        [
          "C",
          "monitor emergency warnings",
          "计划规定发布预警，但题干问的是整组措施，重点是应对高温。"
        ],
        [
          "D",
          "address excessive workloads",
          "休息安排针对高温风险，不是一般工作量。"
        ]
      ]
    },
    {
      "number": 32,
      "prompt": "One problem with existing HAPs is that they ____",
      "answer": "B",
      "evidence": "their triggering thresholds often are not customized to the local climate.",
      "analysis": "现有计划的预警阈值没有根据当地气候进行定制。",
      "options": [
        [
          "A",
          "prove too costly to be implemented",
          "文章说很多缺少资金，没有说实施成本本身过高。"
        ],
        [
          "B",
          "lack localized alert-issuing criteria",
          "正确；预警触发阈值没有本地化。"
        ],
        [
          "C",
          "give delayed responses to heat waves",
          "原文没有说反应迟缓。"
        ],
        [
          "D",
          "keep hospitals under great pressure",
          "医院是计划的执行机构，不是该问题的核心。"
        ]
      ]
    },
    {
      "number": 33,
      "prompt": "Mumbai’s case shows that India’s heat alert systems need to ____",
      "answer": "A",
      "evidence": "the effects of the heat were amplified by humidity ... and the lack of shade.",
      "analysis": "孟买案例说明湿度、遮阴等因素也必须纳入高温风险判断。",
      "options": [
        [
          "A",
          "include other factors besides temperature",
          "正确；湿度和遮阴放大了高温影响。"
        ],
        [
          "B",
          "take subtle weather changes into account",
          "问题不在细微变化，而在纳入湿度等风险因素。"
        ],
        [
          "C",
          "prioritize potentially disastrous heat waves",
          "没有要求重新排序热浪等级。"
        ],
        [
          "D",
          "draw further support from local authorities",
          "原文没有提出这一点。"
        ]
      ]
    },
    {
      "number": 34,
      "prompt": "Kotharkar holds that a vulnerability map can help ____",
      "answer": "B",
      "evidence": "all cities should create a vulnerability map to help focus responses on the populations most at risk.",
      "analysis": "脆弱性地图可以把资源和响应集中到风险最高的人群和区域。",
      "options": [
        [
          "A",
          "prevent the harm of high humidity",
          "地图识别脆弱人群，不是消除湿度危害。"
        ],
        [
          "B",
          "target areas needing special attention",
          "正确；地图帮助聚焦最需要响应的区域和人口。"
        ],
        [
          "C",
          "expand the Nagpur project's coverage",
          "地图方法可推广，但文章强调的是集中应对高风险人口。"
        ],
        [
          "D",
          "make relief plans for heat-stricken people",
          "地图提供定位依据，不等于直接制定完整救援计划。"
        ]
      ]
    },
    {
      "number": 35,
      "prompt": "According to the last paragraph, researchers believe that HAPs should ____",
      "answer": "D",
      "evidence": "HAPs shouldn’t just include short-term emergency responses, but also recommend medium- to long-term measures.",
      "analysis": "HAP 不应只处理短期应急，还应指导降温、植树、改造住房等长期措施。",
      "options": [
        [
          "A",
          "focus more on heatstroke treatment",
          "短期治疗只是最低目标。"
        ],
        [
          "B",
          "invite wider public participation",
          "最后一段没有讨论公众参与。"
        ],
        [
          "C",
          "apply for more government grants",
          "资金问题在前文提及，不是最后一段主张。"
        ],
        [
          "D",
          "serve a broader range of purposes",
          "正确；HAP 应覆盖短期应急和中长期降温措施。"
        ]
      ]
    }
  ],
  [
    {
      "number": 36,
      "prompt": "According to Paragraph 1, desire paths are a result of ____",
      "answer": "C",
      "evidence": "representing the natural capability of people (and animals) to go from point A to point B most effectively.",
      "analysis": "意愿小路源于人们选择更直接、更有效路线的倾向。",
      "options": [
        [
          "A",
          "the curiosity to explore surrounding hills",
          "穿越山坡是结果，不是形成原因。"
        ],
        [
          "B",
          "the necessity to preserve green spaces",
          "这些小路常穿过草地，未必保护绿地。"
        ],
        [
          "C",
          "the tendency to pursue convenience",
          "正确；人们选择更有效、更方便的路线。"
        ],
        [
          "D",
          "the wish to find comfort in solitude",
          "文章强调集体选择，不是独处。"
        ]
      ]
    },
    {
      "number": 37,
      "prompt": "It can be inferred that Ohio State University ____",
      "answer": "D",
      "evidence": "allowed its students to navigate freely, then proceeded to pave the desire paths.",
      "analysis": "学校先允许学生自由行走，随后把形成的小路铺设出来，表明其认可用户路径。",
      "options": [
        [
          "A",
          "intends to improve its desire paths",
          "铺设行为确实改善路线，但推断重点是学校认可这种路径。"
        ],
        [
          "B",
          "leads in the research on desire paths",
          "文章没有说学校处于研究领先地位。"
        ],
        [
          "C",
          "guides the creation of its desire paths",
          "学校先允许自由行走，并非预先指导形成路径。"
        ],
        [
          "D",
          "takes a positive view of desire paths",
          "正确；学校依据学生实际形成的路线进行铺设。"
        ]
      ]
    },
    {
      "number": 38,
      "prompt": "The images on the Reddit webpage reflect ____",
      "answer": "A",
      "evidence": "images ... adorned with signs instructing pedestrians to adhere to designated walkways.",
      "analysis": "图片同时呈现人们踩出小路和规划者要求遵守正式路线的冲突。",
      "options": [
        [
          "A",
          "conflicting opinions on the use of desire paths",
          "正确；非正式小路与遵守指定路线的要求形成冲突。"
        ],
        [
          "B",
          "the call to upgrade the designing of public spaces",
          "没有提出升级设计的呼吁。"
        ],
        [
          "C",
          "the demand for proper planning of desire paths",
          "图片反映冲突，不是明确的规划要求。"
        ],
        [
          "D",
          "growing concerns over the loss of public spaces",
          "文章讨论审美和控制，不是公共空间消失。"
        ]
      ]
    },
    {
      "number": 39,
      "prompt": "The example of the Wickquasgeck Trail illustrates ____",
      "answer": "D",
      "evidence": "the trail ... was widened and made into one of the main trade roads ... Broadway.",
      "analysis": "原本的非正式路径后来被拓宽并成为重要道路，说明其路线价值得到承认。",
      "options": [
        [
          "A",
          "the growth of New York City",
          "例子关注道路演变，不是纽约城市发展史。"
        ],
        [
          "B",
          "the Dutch origin of desire paths",
          "小路在荷兰殖民者到来前已经由原住民形成。"
        ],
        [
          "C",
          "the importance of urban planning",
          "这条路径反而体现自发路线影响规划。"
        ],
        [
          "D",
          "the recognition of desire paths",
          "正确；非正式路径后来成为重要贸易道路。"
        ]
      ]
    },
    {
      "number": 40,
      "prompt": "It can be learned from the last paragraph that desire paths ____",
      "answer": "D",
      "evidence": "Animal desire paths ... highlight the adaptability of these trails in both human and animal experiences.",
      "analysis": "末段把人和动物形成路径的行为并置，强调二者共同的适应性和选择倾向。",
      "options": [
        [
          "A",
          "reveal humans’ deep respect for nature",
          "文章没有说人类形成小路是出于敬畏自然。"
        ],
        [
          "B",
          "are crucial to humans’ mental wellbeing",
          "末段没有讨论心理健康。"
        ],
        [
          "C",
          "are a human imitation of animal behavior",
          "文章将两者并列，没有说人类模仿动物。"
        ],
        [
          "D",
          "show a shared trait in humans and animals",
          "正确；人和动物都能形成适应环境的非正式路径。"
        ]
      ]
    }
  ]
] as const;
const passageQuestions = passageQuestionSpecs.map((specs) => makeQuestions(specs));
const matchingQuestions = [
  {
    "number": 41,
    "prompt": "Choose the most suitable subheading for paragraph 41.",
    "answer": "F",
    "answerLabel": "Subheading",
    "evidence": "Great ideas don’t stand alone. ... sell its merits.",
    "analysis": "本段要求持续推介并解释想法，核心是把方案讲清楚并争取采用。"
  },
  {
    "number": 42,
    "prompt": "Choose the most suitable subheading for paragraph 42.",
    "answer": "C",
    "answerLabel": "Subheading",
    "evidence": "go to your boss first ... build a coalition among your co-workers or other stakeholders.",
    "analysis": "本段建议根据情境选择上级、同事或利益相关者等沟通渠道。"
  },
  {
    "number": 43,
    "prompt": "Choose the most suitable subheading for paragraph 43.",
    "answer": "G",
    "answerLabel": "Subheading",
    "evidence": "if people disagree with you, don’t be indignant. Instead, listen to their concerns fully.",
    "analysis": "本段强调面对异议要谦逊倾听，不要把自己表现成无所不知。"
  },
  {
    "number": 44,
    "prompt": "Choose the most suitable subheading for paragraph 44.",
    "answer": "B",
    "answerLabel": "Subheading",
    "evidence": "New ideas are the grandchildren of old ones ... Appreciating the older contributions.",
    "analysis": "本段提醒尊重旧方案的历史贡献，再提出新方案。"
  },
  {
    "number": 45,
    "prompt": "Choose the most suitable subheading for paragraph 45.",
    "answer": "A",
    "answerLabel": "Subheading",
    "evidence": "use the language of abundance instead of the language of deficit ... Be optimistic but realistic.",
    "analysis": "本段主张用积极、建设性的语言介绍新想法。"
  }
] as const;


export const kaoyanEnglishTwo2025 = {
  sections: {
    cloze: {
      ...sections.cloze,
      answerRange: '1–20',
      wordBank: [
        { key: 'A', word: 'question' }, { key: 'B', word: 'reluctance' },
        { key: 'C', word: 'courage' }, { key: 'D', word: 'In other words' },
        { key: 'E', word: 'uncomfortable' }, { key: 'F', word: 'concerns' },
        { key: 'G', word: 'Once' }, { key: 'H', word: 'factor' },
        { key: 'I', word: 'inconveniencing' }, { key: 'J', word: 'reach out' },
        { key: 'K', word: 'declining' }, { key: 'L', word: 'negative' },
        { key: 'M', word: 'overcome' }, { key: 'N', word: 'fear' },
        { key: 'O', word: 'perceived' }, { key: 'P', word: 'recall' },
        { key: 'Q', word: 'willing' }, { key: 'R', word: 'rewarding' },
        { key: 'S', word: 'Also' }, { key: 'T', word: 'busy' },
      ],
      answers: [
        { number: 1, key: 'A', word: 'question', evidence: 'interested in this question', analysis: 'this question 指前文提出的疑问。' },
        { number: 2, key: 'B', word: 'reluctance', evidence: 'widespread reluctance to ask for help', analysis: 'reluctance 表达不情愿。' },
        { number: 3, key: 'C', word: 'courage', evidence: 'Asking for help takes courage.', analysis: '求助需要勇气。' },
        { number: 4, key: 'D', word: 'In other words', evidence: 'In other words, you’re broadcasting', analysis: '后句是前句的换说。' },
        { number: 5, key: 'E', word: 'uncomfortable', evidence: 'which can be uncomfortable', analysis: '暴露弱点会令人不适。' },
        { number: 6, key: 'F', word: 'concerns', evidence: 'have concerns about losing control', analysis: 'concerns 表示担忧。' },
        { number: 7, key: 'G', word: 'Once', evidence: 'Once someone starts to help', analysis: 'once 表示一旦。' },
        { number: 8, key: 'H', word: 'factor', evidence: 'Yet another factor', analysis: 'factor 表示原因或因素。' },
        { number: 9, key: 'I', word: 'inconveniencing', evidence: 'or inconveniencing the person', analysis: '与 being a nuisance 并列。' },
        { number: 10, key: 'J', word: 'reach out', evidence: 'difficult to reach out for help', analysis: 'reach out 表示主动求助。' },
        { number: 11, key: 'K', word: 'declining', evidence: 'person declining your request', analysis: 'declining 表示拒绝请求，与后文 such refusals 呼应。' },
        { number: 12, key: 'L', word: 'negative', evidence: 'implying something negative', analysis: 'negative 与 relationship status 的语义匹配。' },
        { number: 13, key: 'M', word: 'overcome', evidence: 'To overcome these difficulties', analysis: 'overcome 表示克服。' },
        { number: 14, key: 'N', word: 'fear', evidence: 'you might fear coming across', analysis: 'fear 接动名词短语。' },
        { number: 15, key: 'O', word: 'perceived', evidence: 'are perceived as more competent', analysis: '表示“被看作更有能力”。' },
        { number: 16, key: 'P', word: 'recall', evidence: 'people to recall times', analysis: 'recall 表示回忆。' },
        { number: 17, key: 'Q', word: 'willing', evidence: 'how willing other people will be', analysis: 'willing 说明愿意帮忙。' },
        { number: 18, key: 'R', word: 'rewarding', evidence: 'having the chance to help someone is highly rewarding', analysis: '帮助他人会带来回报感。' },
        { number: 19, key: 'S', word: 'Also', evidence: 'Also, take care over who you ask', analysis: '承接并补充建议。' },
        { number: 20, key: 'T', word: 'busy', evidence: 'They might just be too busy', analysis: '解释对方暂时无法帮助的原因。' },
      ],
    },
    matching: { ...sections.matching, questions: matchingQuestions },
    passage1: { ...sections.passages[0], questions: passageQuestions[0] },
    passage2: { ...sections.passages[1], questions: passageQuestions[1] },
    passage3: { ...sections.passages[2], questions: passageQuestions[2] },
    passage4: { ...sections.passages[3], questions: passageQuestions[3] },
  },
} as const;

const noteData = {
  "C01": {
    "sentence": "There are many understandable reasons why you might find it difficult to ask for help when you need it.",
    "translation": "有许多可以理解的原因，当您需要帮助时，您可能会发现很难寻求帮助。",
    "vocabulary": [
      [
        "ask for help",
        "求助；寻求帮助"
      ],
      [
        "understandable",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "There"
      ],
      [
        "predicate",
        "are"
      ],
      [
        "complement",
        "many understandable reasons why you might find it difficult to ask for help when you need it"
      ]
    ]
  },
  "C02": {
    "sentence": "Psychologists have been interested in this question for decades, not least because people’s widespread reluctance to ask for help has led to some high-profile failures.",
    "translation": "几十年来，心理学家一直对这个问题感兴趣，尤其是因为人们普遍不愿意寻求帮助，导致了一些引人注目的失败。",
    "vocabulary": [
      [
        "ask for help",
        "求助；寻求帮助"
      ],
      [
        "high-profile",
        "引人注目的；备受关注的"
      ],
      [
        "reluctance",
        "不情愿；勉强"
      ]
    ],
    "highlights": [
      [
        "subject",
        "Psychologists"
      ],
      [
        "predicate",
        "have been"
      ],
      [
        "complement",
        "interested in this question for decades"
      ]
    ]
  },
  "C03": {
    "sentence": "Asking for help takes courage.",
    "translation": "寻求帮助需要勇气。",
    "vocabulary": [
      [
        "courage",
        "勇气"
      ],
      [
        "Asking",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "predicate",
        "takes"
      ],
      [
        "object",
        "courage"
      ]
    ]
  },
  "C04": {
    "sentence": "It involves communicating a need on your part — there’s something you can’t do.",
    "translation": "它涉及传达您的需求—有些事情您做不到。",
    "vocabulary": [
      [
        "involves",
        "重点词汇（结合本句理解）"
      ],
      [
        "communicating",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "complement",
        "It involves communicating a need on your part"
      ],
      [
        "subject",
        "there"
      ],
      [
        "predicate",
        "’s"
      ]
    ]
  },
  "C05": {
    "sentence": "In other words, you’re broadcasting your own weaknesses, which can be uncomfortable.",
    "translation": "换句话说，你正在传播自己的弱点，这可能会让人感到不舒服。",
    "vocabulary": [
      [
        "broadcast",
        "公开传达；传播"
      ],
      [
        "uncomfortable",
        "不舒服的；尴尬的"
      ]
    ],
    "highlights": [
      [
        "subject",
        "you"
      ],
      [
        "predicate",
        "’re broadcasting"
      ],
      [
        "object",
        "your own weaknesses, which can be uncomfortable"
      ]
    ]
  },
  "C06": {
    "sentence": "You might worry about coming across as incompetent.",
    "translation": "你可能担心给人留下无能的印象。",
    "vocabulary": [
      ["worry about", "担心"],
      ["come across as", "给人留下……印象"],
      ["incompetent", "无能的；不胜任的"]
    ],
    "highlights": [
      ["subject", "You"],
      ["predicate", "might worry"],
      ["complement", "about coming across as incompetent"]
    ]
  },
  "C07": {
    "sentence": "You might have concerns about losing control of whatever it is you are asking for help with.",
    "translation": "你可能会担心失去对所求助之事的控制。",
    "vocabulary": [
      [
        "concern",
        "担忧；顾虑"
      ],
      [
        "concerns",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "You"
      ],
      ["predicate", "might have"],
      ["object", "concerns about losing control of whatever it is you are asking for help with"]
    ]
  },
  "C08": {
    "sentence": "Once someone starts to help, perhaps they will take over, or get credit for your earlier efforts.",
    "translation": "一旦有人开始提供帮助，也许他们会接管，或者为你的早期努力获得奖励。",
    "vocabulary": [
      [
        "take over",
        "接手；接管"
      ],
      [
        "starts",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "they"
      ],
      [
        "predicate",
        "will take"
      ]
    ]
  },
  "C09": {
    "sentence": "Yet another factor that you might be worried about is being a nuisance or inconveniencing the person you go to for help.",
    "translation": "你可能担心的另一个因素，是成为麻烦或给你求助的那个人带来不便。",
    "vocabulary": [
      [
        "nuisance",
        "麻烦的人或事"
      ],
      [
        "factor",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      ["subject", "Yet another factor that you might be worried about"],
      ["predicate", "is"],
      ["complement", "being a nuisance or inconveniencing the person you go to for help"]
    ]
  },
  "C10": {
    "sentence": "If you struggle with low self-esteem, you might find it especially difficult to reach out for help because you have the added worry of the other person declining your request.",
    "translation": "如果你的自尊心较低，你可能尤其难以开口求助，因为你还担心对方会拒绝你的请求。",
    "vocabulary": [
      [
        "low self-esteem",
        "低自尊"
      ],
      [
        "reach out",
        "主动联系；寻求帮助"
      ]
    ],
    "highlights": [
      [
        "subject",
        "you"
      ],
      [
        "predicate",
        "might find"
      ],
      [
        "complement",
        "it especially difficult to reach out for help"
      ]
    ]
  },
  "C11": {
    "sentence": "You might see such refusals as implying something negative about the status of your relationship with them.",
    "translation": "您可能会认为这种拒绝暗示着您与他们的关系状态是负面的。",
    "vocabulary": [
      [
        "refusal",
        "拒绝"
      ],
      [
        "refusals",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "You"
      ],
      [
        "predicate",
        "might see"
      ],
      [
        "object",
        "such refusals as implying something negative about the status of your relationship with them"
      ]
    ]
  },
  "C12": {
    "sentence": "To overcome these difficulties, try to remind yourself that everyone needs help sometimes.",
    "translation": "为了克服这些困难，请尝试提醒自己，每个人有时都需要帮助。",
    "vocabulary": [
      [
        "overcome",
        "克服"
      ],
      [
        "difficulties",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "predicate",
        "try"
      ],
      [
        "complement",
        "to remind yourself that everyone needs help sometimes"
      ]
    ]
  },
  "C13": {
    "sentence": "Nobody knows everything and can do everything all by themselves.",
    "translation": "没有人知道所有的事情，可以自己做所有的事情。",
    "vocabulary": [],
    "highlights": [
      [
        "subject",
        "Nobody"
      ],
      [
        "predicate",
        "knows"
      ],
      [
        "object",
        "everything"
      ]
    ]
  },
  "C14": {
    "sentence": "And while you might fear coming across as incompetent, there’s actually research that shows that advice-seekers are perceived as more competent, not less.",
    "translation": "虽然你可能会害怕被认为是无能的，但实际上有研究表明，寻求建议的人被认为更有能力，而不是更少。",
    "vocabulary": [
      [
        "incompetent",
        "无能的；不胜任的"
      ],
      [
        "advice-seeker",
        "寻求建议的人"
      ],
      [
        "perceive",
        "认为；看作"
      ]
    ],
    "highlights": [
      [
        "subject",
        "there"
      ],
      [
        "predicate",
        "’s"
      ]
    ]
  },
  "C15": {
    "sentence": "Perhaps most encouraging of all is a paper from 2022 by researchers at Stanford University, in California, that involved a mix of contrived help-seeking interactions and asking people to recall times they’d sought help in the past.",
    "translation": "也许最令人鼓舞的是加利福尼亚州斯坦福大学的研究人员2022年的一篇论文，该论文涉及人为寻求帮助的互动，并要求人们回忆他们过去寻求帮助的时间。",
    "vocabulary": [
      [
        "Perhaps",
        "重点词汇（结合本句理解）"
      ],
      [
        "encouraging",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "complement",
        "most encouraging of all"
      ],
      [
        "predicate",
        "is"
      ],
      [
        "subject",
        "a paper from 2022 by researchers at Stanford University, in California"
      ]
    ]
  },
  "C16": {
    "sentence": "The findings showed that help-seekers generally underestimate how willing other people will be to help and how good it will make the help-giver feel (for most people, having the chance to help someone is highly rewarding).",
    "translation": "研究结果表明，寻求帮助者通常会低估其他人愿意提供帮助的意愿，以及这会让提供帮助的人感觉有多好（对于大多数人来说，有机会帮助某人是非常有益的）。",
    "vocabulary": [
      [
        "underestimate",
        "低估"
      ],
      [
        "willing",
        "愿意的"
      ],
      [
        "rewarding",
        "有回报的；值得的"
      ]
    ],
    "highlights": [
      [
        "subject",
        "The findings"
      ],
      [
        "predicate",
        "showed"
      ],
      [
        "complement",
        "that help-seekers generally underestimate how willing other people will be to help and how good it will make the help-giver feel (for most people, having the chance to help someone is highly rewarding"
      ]
    ]
  },
  "C17": {
    "sentence": "So bear all this in mind the next time you need to ask for help.",
    "translation": "因此，下次您需要寻求帮助时，请记住这一点。",
    "vocabulary": [
      [
        "ask for help",
        "求助；寻求帮助"
      ]
    ],
    "highlights": [
      [
        "predicate",
        "bear"
      ],
      [
        "object",
        "all this"
      ]
    ]
  },
  "C18": {
    "sentence": "Also, take care over who you ask and when you ask them.",
    "translation": "此外，请留意您询问的对象和询问的时间。",
    "vocabulary": [],
    "highlights": [
      [
        "predicate",
        "take"
      ],
      [
        "object",
        "care"
      ]
    ]
  },
  "C19": {
    "sentence": "And if someone can’t help right now, avoid taking it personally.",
    "translation": "如果有人现在无法提供帮助，请避免将其视为个人问题。",
    "vocabulary": [
      [
        "taking",
        "重点词汇（结合本句理解）"
      ],
      [
        "personally",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "predicate",
        "avoid"
      ],
      [
        "complement",
        "taking it personally"
      ]
    ]
  },
  "C20": {
    "sentence": "They might just be too busy, or they might not feel confident about their ability to help.",
    "translation": "他们可能只是太忙了，或者他们可能对自己的帮助能力没有信心。",
    "vocabulary": [
      [
        "confident",
        "重点词汇（结合本句理解）"
      ],
      [
        "ability",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "They"
      ],
      [
        "predicate",
        "might just be"
      ],
      [
        "complement",
        "too busy"
      ]
    ]
  },
  "M-A01": {
    "sentence": "Great ideas don’t stand alone.",
    "translation": "伟大的创意并非孤立存在。",
    "vocabulary": [],
    "highlights": [
      [
        "subject",
        "Great ideas"
      ],
      [
        "predicate",
        "don’t stand"
      ]
    ]
  },
  "M-A02": {
    "sentence": "In other words, you can’t mention your suggestion once and expect it to be adopted.",
    "translation": "换句话说，你不能一次性提及你的建议，然后期望它被采纳。",
    "vocabulary": [
      [
        "mention",
        "重点词汇（结合本句理解）"
      ],
      [
        "suggestion",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "you"
      ],
      [
        "predicate",
        "can’t mention"
      ],
      [
        "object",
        "your suggestion"
      ]
    ]
  },
  "M-A03": {
    "sentence": "To see a change, you’ll need to champion your plan and sell its merits.",
    "translation": "要看到变化，您需要支持您的计划并推销其优点。",
    "vocabulary": [
      [
        "champion",
        "积极支持；捍卫"
      ],
      [
        "change",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "you"
      ],
      [
        "predicate",
        "’ll need"
      ],
      [
        "complement",
        "to champion your plan and sell its merits"
      ]
    ]
  },
  "M-A04": {
    "sentence": "In addition, you need to be willing to stand up to scrutiny and criticism and be prepared to explain your innovation in different ways for various audiences.",
    "translation": "此外，您需要愿意接受审查和批评，并准备好以不同的方式向不同的受众解释您的创新。",
    "vocabulary": [
      [
        "willing",
        "愿意的"
      ],
      [
        "scrutiny",
        "仔细审查"
      ]
    ],
    "highlights": [
      [
        "subject",
        "you"
      ],
      [
        "predicate",
        "need"
      ],
      [
        "complement",
        "to be willing to stand up to scrutiny and criticism and be prepared to explain your innovation in different ways for various audiences"
      ]
    ]
  },
  "M-B01": {
    "sentence": "Sometimes it makes sense to go to your boss first.",
    "translation": "有时先去找你的老板是有道理的。",
    "vocabulary": [
      [
        "Sometimes",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "it"
      ],
      [
        "predicate",
        "makes"
      ],
      [
        "object",
        "sense"
      ]
    ]
  },
  "M-B02": {
    "sentence": "But other times, it’s useful to build a coalition among your co-workers or other stakeholders.",
    "translation": "但在其他时候，在您的同事或其他利益相关者之间建立联盟是有用的。",
    "vocabulary": [
      [
        "coalition",
        "联盟"
      ],
      [
        "stakeholder",
        "利益相关者"
      ]
    ],
    "highlights": [
      [
        "subject",
        "it"
      ],
      [
        "predicate",
        "’s"
      ],
      [
        "complement",
        "useful"
      ]
    ]
  },
  "M-B03": {
    "sentence": "When it works, it works great — because you’re ready for your stubborn supervisor’s pushback with answers like, “Actually, I connected with a few people in our tech department to discuss how much time these kinds of website updates would take, and they suggested they have the bandwidth.”",
    "translation": "当它工作时，它的工作原理很好—因为你已经准备好接受你顽固的主管的拒绝，回答说： “实际上，我与我们技术部门的几个人联系，讨论了这些类型的网站更新需要多少时间，他们建议他们有带宽。”",
    "vocabulary": [
      [
        "stubborn",
        "重点词汇（结合本句理解）"
      ],
      [
        "supervisor",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "complement",
        "When it works, it works great —"
      ],
      [
        "subject",
        "I"
      ],
      [
        "predicate",
        "connected"
      ]
    ]
  },
  "M-B04": {
    "sentence": "However, just be certain you can explain your end-around approach as one that built your case, rather than simply circumvented your manager.",
    "translation": "不过，一定要确保你能把这种绕开上级的做法解释为建立论据，而不是简单地绕过你的经理。",
    "vocabulary": [
      ["end-around", "绕开正式渠道的做法"],
      ["circumvent", "绕过；规避"],
      ["build one’s case", "建立论据；为观点提供依据"]
    ],
    "highlights": [
      ["predicate", "be certain"],
      ["object", "you can explain your end-around approach as one that built your case, rather than simply circumvented your manager"]
    ]
  },
  "M-B05": {
    "sentence": "The last thing you want is for your boss to feel embarrassed he wasn’t informed—which could lead him to quash the idea before it even takes off.",
    "translation": "你最不希望看到的，是你的老板因为没有被告知而感到尴尬——这可能导致他在想法尚未启动前就把它扼杀。",
    "vocabulary": [
      ["the last thing", "最不希望发生的事"],
      ["embarrassed", "尴尬的"],
      ["quash", "压制；扼杀"]
    ],
    "highlights": [
      ["subject", "The last thing you want"],
      ["predicate", "is"],
      ["complement", "for your boss to feel embarrassed he wasn’t informed"]
    ]
  },
  "M-C01": {
    "sentence": "One of the biggest barriers to gaining buy-in occurs when the owner of an idea is viewed as argumentative, defensive, or close-minded.",
    "translation": "当一个想法的所有者被认为是争论性、防御性或思想封闭时，获得支持的最大障碍之一就会发生。",
    "vocabulary": [
      [
        "buy-in",
        "支持；认同"
      ],
      [
        "argumentative",
        "好争辩的"
      ],
      [
        "defensive",
        "防御性的；戒备的"
      ]
    ],
    "highlights": [
      [
        "predicate",
        "One"
      ]
    ]
  },
  "M-C02": {
    "sentence": "Because, let’s be honest: No one likes a know-it-all.",
    "translation": "因为，老实说：没有人喜欢无所不知。",
    "vocabulary": [
      [
        "honest",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "No one"
      ],
      [
        "predicate",
        "likes"
      ],
      [
        "object",
        "a know-it"
      ]
    ]
  },
  "M-C03": {
    "sentence": "So, if people disagree with you, don’t be indignant.",
    "translation": "所以，如果人们不同意你的观点，不要愤怒。",
    "vocabulary": [
      [
        "indignant",
        "愤慨的"
      ],
      [
        "people",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "predicate",
        "don’t be"
      ],
      [
        "complement",
        "indignant"
      ]
    ]
  },
  "M-C04": {
    "sentence": "Instead, listen to their concerns fully, try to understand their perspective, and include their concerns (and possible remedies) in future discussions.",
    "translation": "相反，请充分倾听他们的担忧，尝试了解他们的观点，并将他们的担忧（和可能的补救措施）纳入未来的讨论中。",
    "vocabulary": [
      [
        "concern",
        "担忧；顾虑"
      ],
      [
        "Instead",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "predicate",
        "listen"
      ]
    ]
  },
  "M-C05": {
    "sentence": "So, instead of saying, “Martha, our current slogan is confusing and should be updated,” you could try, “Martha raises a great point that our current slogan has a long history for our stakeholders, but I wonder if we might be able to brainstorm a tagline that could build on that — and be clearer for new customers.”",
    "translation": "因此，与其说， “Martha ，我们目前的口号令人困惑，应该更新，”你可以尝试， “Martha提出了一个很好的观点，即我们目前的口号对我们的利益相关者来说有着悠久的历史，但我想知道我们是否能够集思广益，以此为基础，为新客户更清晰。”",
    "vocabulary": [
      [
        "stakeholder",
        "利益相关者"
      ],
      [
        "instead",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "complement",
        "So, instead of saying, “Martha, our current slogan is confusing and should be updated,” you could try,"
      ],
      [
        "subject",
        "Martha"
      ],
      [
        "predicate",
        "raises"
      ]
    ]
  },
  "M-D01": {
    "sentence": "New ideas are the grandchildren of old ones.",
    "translation": "新思想是旧思想的孙辈。",
    "vocabulary": [
      [
        "grandchildren",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "New ideas"
      ],
      [
        "predicate",
        "are"
      ],
      [
        "complement",
        "the grandchildren of old ones"
      ]
    ]
  },
  "M-D02": {
    "sentence": "In other words, don’t throw old solutions under the bus to make your improvement stand out.",
    "translation": "换句话说，不要为了让你的改进脱颖而出而把旧的解决方案扔到公交车下面。",
    "vocabulary": [
      [
        "stand out",
        "脱颖而出"
      ],
      [
        "solutions",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "predicate",
        "don’t throw"
      ],
      [
        "object",
        "old solutions"
      ]
    ]
  },
  "M-D03": {
    "sentence": "Remember that in light of whatever the problem the old system solved — or, maybe, has failed to solve in recent memory — it was a great idea at the time.",
    "translation": "请记住，无论旧系统解决了什么问题—或者可能在最近的记忆中未能解决—这在当时是一个好主意。",
    "vocabulary": [
      [
        "Remember",
        "重点词汇（结合本句理解）"
      ],
      [
        "problem",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "predicate",
        "Remember"
      ],
      [
        "complement",
        "that in light of whatever the problem the old system solved — or, maybe, has failed to solve in recent memory — it was a great idea at the time"
      ]
    ]
  },
  "M-D04": {
    "sentence": "Appreciating the older contributions as you suggest future innovations helps bolster the credibility of your idea.",
    "translation": "当您建议未来的创新时，欣赏旧的贡献有助于提高您想法的可信度。",
    "vocabulary": [
      [
        "bolster",
        "加强；支持"
      ],
      [
        "Appreciating",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "predicate",
        "Appreciating"
      ],
      [
        "object",
        "the older contributions"
      ]
    ]
  },
  "M-E01": {
    "sentence": "When pitching a new idea, it’s important to use the language of abundance instead of the language of deficit.",
    "translation": "在推销新想法时，使用富足的语言而不是赤字的语言是很重要的。",
    "vocabulary": [
      [
        "abundance",
        "充足；丰富"
      ],
      [
        "deficit",
        "不足；缺乏"
      ]
    ],
    "highlights": [
      [
        "subject",
        "it"
      ],
      [
        "predicate",
        "’s"
      ],
      [
        "complement",
        "important"
      ]
    ]
  },
  "M-E02": {
    "sentence": "Instead of saying what is wrong, broken, or suboptimal, talk about what is right, fixable, or ideal.",
    "translation": "与其说什么是错的、坏的或次优的，不如说什么是正确的、可修复的或理想的。",
    "vocabulary": [
      [
        "suboptimal",
        "非最优的"
      ],
      [
        "Instead",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "predicate",
        "talk"
      ]
    ]
  },
  "M-E03": {
    "sentence": "For example, try, “I can see lots of applications for this new approach” rather than, “This innovation is the only way.”",
    "translation": "例如，尝试“我可以看到这种新方法有很多应用” ，而不是“这种创新是唯一的方法”。",
    "vocabulary": [
      [
        "example",
        "重点词汇（结合本句理解）"
      ],
      [
        "applications",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "predicate",
        "try"
      ],
      [
        "complement",
        "I can see lots of applications for this new approach” rather than, “This innovation is the only way"
      ]
    ]
  },
  "M-E04": {
    "sentence": "Be optimistic but realistic, and you will stand out.",
    "translation": "保持乐观但现实的态度，你就会脱颖而出。",
    "vocabulary": [
      [
        "stand out",
        "脱颖而出"
      ],
      [
        "optimistic",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "predicate",
        "Be"
      ],
      [
        "complement",
        "optimistic but realistic"
      ]
    ]
  },
  "M-E05": {
    "sentence": "There is rarely value in pointing out a problem without also offering a solution.",
    "translation": "指出问题却不同时提供解决方案，通常没有什么价值。",
    "vocabulary": [
      ["rarely", "很少"],
      ["point out", "指出"],
      ["offer a solution", "提供解决方案"]
    ],
    "highlights": [
      ["subject", "There"],
      ["predicate", "is"],
      ["complement", "rarely value in pointing out a problem without also offering a solution"]
    ]
  },
  "M-E06": {
    "sentence": "Innovation isn’t seeing the problem, it is being able to see a viable solution to the issue.",
    "translation": "创新不只是看见问题，而是能够看见问题的可行解决方案。",
    "vocabulary": [
      ["innovation", "创新"],
      ["viable", "可行的"],
      ["solution", "解决方案"]
    ],
    "highlights": [
      ["subject", "Innovation"],
      ["predicate", "isn’t seeing"],
      ["object", "the problem"],
      ["complement", "it is being able to see a viable solution to the issue"]
    ]
  },
  "M-E07": {
    "sentence": "So, use the steps above to pitch your new idea—they should help you overcome the barriers to buy-in so that people will be on board and excited.",
    "translation": "所以，运用上面的步骤来推介你的新想法；这些步骤应能帮助你克服争取认同的障碍，让大家愿意支持并感到兴奋。",
    "vocabulary": [
      ["pitch", "推介；推销"],
      ["overcome", "克服"],
      ["on board", "支持；赞同"]
    ],
    "highlights": [
      ["predicate", "use"],
      ["object", "the steps above"],
      ["complement", "to pitch your new idea"]
    ]
  },
  "R1-01": {
    "sentence": "U.S. customers historically tipped people they assumed were earning most of their income via tips, such as restaurant servers earning less than the minimum wage.",
    "translation": "美国顾客历来会通过小费向他们认为收入最多的人支付小费，例如餐厅服务员的收入低于最低工资标准。",
    "vocabulary": [
      [
        "historical",
        "历史的"
      ],
      [
        "customers",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "U.S. customers"
      ],
      [
        "predicate",
        "tipped"
      ],
      [
        "object",
        "people they assumed were earning most of their income via tips, such as restaurant servers earning less than the minimum wage"
      ]
    ]
  },
  "R1-02": {
    "sentence": "In the early 2010s, a wide range of businesses started processing purchases with iPads and other digital payment systems.",
    "translation": "在2010年代初，各种各样的企业开始使用iPad和其他数字支付系统处理购买。",
    "vocabulary": [
      [
        "businesses",
        "重点词汇（结合本句理解）"
      ],
      [
        "started",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "a wide range of businesses"
      ],
      [
        "predicate",
        "started"
      ],
      [
        "complement",
        "processing purchases with iPads and other digital payment systems"
      ]
    ]
  },
  "R1-03": {
    "sentence": "These systems often prompted customers to tip for services that were not previously tipped.",
    "translation": "这些系统通常会提示顾客为之前未支付小费的服务支付小费。",
    "vocabulary": [
      [
        "prompt",
        "促使；提示"
      ],
      [
        "systems",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "These systems"
      ],
      [
        "predicate",
        "prompted"
      ],
      [
        "object",
        "customers"
      ]
    ]
  },
  "R1-04": {
    "sentence": "Today’s tip requests are often not connected to the salary and service norms that used to determine when and how people tip.",
    "translation": "今天的小费请求通常与用来确定人们何时以及如何支付小费的工资和服务规范无关。",
    "vocabulary": [
      [
        "tip request",
        "小费请求"
      ],
      [
        "requests",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "Today’s tip requests"
      ],
      [
        "predicate",
        "are often not connected"
      ]
    ]
  },
  "R1-05": {
    "sentence": "Customers in the past nearly always paid tips after receiving a service, such as at the conclusion of a restaurant meal, after getting a haircut or once a pizza was delivered.",
    "translation": "过去，顾客几乎总是在收到服务后支付小费，例如在餐厅用餐结束时、理发后或派送披萨后。",
    "vocabulary": [
      [
        "Customers",
        "重点词汇（结合本句理解）"
      ],
      [
        "nearly",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "Customers in the past"
      ],
      [
        "predicate",
        "paid"
      ],
      [
        "object",
        "tips"
      ]
    ]
  },
  "R1-06": {
    "sentence": "That timing could reward high-quality service and give workers an incentive to provide it.",
    "translation": "这种时机可以奖励高质量的服务，并激励工人提供服务。",
    "vocabulary": [
      [
        "timing",
        "重点词汇（结合本句理解）"
      ],
      [
        "reward",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "That timing"
      ],
      [
        "predicate",
        "could reward"
      ],
      [
        "object",
        "high-quality service"
      ]
    ]
  },
  "R1-07": {
    "sentence": "It’s becoming more common for tips to be requested beforehand.",
    "translation": "提前索取小费变得越来越常见。",
    "vocabulary": [
      [
        "beforehand",
        "事先；提前"
      ],
      [
        "becoming",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "It"
      ],
      [
        "predicate",
        "’s becoming"
      ],
      [
        "complement",
        "more common"
      ]
    ]
  },
  "R1-08": {
    "sentence": "And new tipping technology may even automatically add tips.",
    "translation": "新的小费技术甚至可能会自动添加小费。",
    "vocabulary": [
      [
        "tipping",
        "付小费；小费制度"
      ],
      [
        "technology",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "new tipping technology"
      ],
      [
        "predicate",
        "may even automatically add"
      ],
      [
        "object",
        "tips"
      ]
    ]
  },
  "R1-09": {
    "sentence": "The prevalence of digital payment devices has made it easier to ask customers for a tip.",
    "translation": "数字支付设备的普及使得向客户索要小费变得更加容易。",
    "vocabulary": [
      [
        "prevalence",
        "普遍；流行"
      ],
      [
        "digital",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "The prevalence of digital payment devices"
      ],
      [
        "predicate",
        "has made"
      ],
      [
        "complement",
        "it easier to ask customers for a tip"
      ]
    ]
  },
  "R1-10": {
    "sentence": "That helps explain why tip requests are creeping into new kinds of services.",
    "translation": "这有助于解释为什么小费请求正在蔓延到新的服务类型。",
    "vocabulary": [
      [
        "tip request",
        "小费请求"
      ],
      [
        "explain",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "That"
      ],
      [
        "predicate",
        "helps"
      ],
      [
        "complement",
        "explain why tip requests are creeping into new kinds of services"
      ]
    ]
  },
  "R1-11": {
    "sentence": "Customers now routinely see menus of suggested default options — often well above 20% of what they owe.",
    "translation": "顾客现在经常看到建议默认选项的菜单--通常远远高于他们所欠金额的20%。",
    "vocabulary": [
      [
        "Customers",
        "重点词汇（结合本句理解）"
      ],
      [
        "routinely",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "Customers"
      ],
      [
        "predicate",
        "see"
      ],
      [
        "object",
        "menus of suggested default options — often well above 20% of what they owe"
      ]
    ]
  },
  "R1-12": {
    "sentence": "The amounts have risen from 10% or less in the 1950s to 15% around the year 2000 to 20% or higher today.",
    "translation": "从20世纪50年代的10 ％或更低到2000年左右的15 ％ ，到今天的20 ％或更高。",
    "vocabulary": [
      [
        "amounts",
        "重点词汇（结合本句理解）"
      ],
      [
        "higher",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "The amounts"
      ],
      [
        "predicate",
        "have risen"
      ]
    ]
  },
  "R1-13": {
    "sentence": "This increase is sometimes called tipflation — the expectation of ever-higher tip amounts.",
    "translation": "这种增加有时被称为小费膨胀（ tipflation ） ，即小费金额不断增加的预期。",
    "vocabulary": [
      [
        "tipflation",
        "小费通胀"
      ],
      [
        "increase",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "This increase"
      ],
      [
        "predicate",
        "is sometimes called"
      ],
      [
        "complement",
        "tipflation — the expectation of ever-higher tip amounts"
      ]
    ]
  },
  "R1-14": {
    "sentence": "Tipping has always been a vital source of income for workers in historically tipped services, like restaurants, where the tipped minimum wage can be as low as US $2.13 an hour.",
    "translation": "小费一直是传统小费服务（如餐厅）员工的重要收入来源，餐厅的小费最低工资可能低至每小时2.13 $。",
    "vocabulary": [
      [
        "tipping",
        "付小费；小费制度"
      ],
      [
        "historical",
        "历史的"
      ]
    ],
    "highlights": [
      [
        "subject",
        "Tipping"
      ],
      [
        "predicate",
        "has always been"
      ],
      [
        "complement",
        "a vital source of income for workers in historically tipped services, like restaurants, where the tipped minimum wage can be as low as US $2.13 an hour"
      ]
    ]
  },
  "R1-15": {
    "sentence": "Tip creep and tipflation are now further supplementing the income of many low-wage service workers.",
    "translation": "小费蔓延和小费通货膨胀现在进一步补充了许多低工资服务工人的收入。",
    "vocabulary": [
      [
        "tipflation",
        "小费通胀"
      ],
      [
        "supplement",
        "补充；增加"
      ],
      [
        "low-wage",
        "低工资的"
      ]
    ],
    "highlights": [
      [
        "subject",
        "Tip creep and tipflation"
      ],
      [
        "predicate",
        "are now further supplementing"
      ],
      [
        "object",
        "the income of many low-wage service workers"
      ]
    ]
  },
  "R1-16": {
    "sentence": "Notably, tipping primarily benefits some of these workers, such as waiters, but not others, such as cooks and dishwashers.",
    "translation": "值得注意的是，给小费主要有利于这些工人中的一些人，如服务员，却未必惠及其他人，如厨师和洗碗工。",
    "vocabulary": [
      [
        "tipping",
        "付小费；小费制度"
      ],
      [
        "Notably",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "tipping"
      ],
      [
        "predicate",
        "benefits"
      ],
      [
        "object",
        "some of these workers, such as waiters, but not others, such as cooks and dishwashers"
      ]
    ]
  },
  "R1-17": {
    "sentence": "To ensure that all employees were paid fair wages, some restaurants banned tipping and increased prices, but this movement towards no-tipping services has largely fizzled out.",
    "translation": "为了确保所有员工获得公平的工资，一些餐厅禁止小费，并提高了价格，但这种向无小费服务的转变在很大程度上已经失败。",
    "vocabulary": [
      [
        "tipping",
        "付小费；小费制度"
      ],
      [
        "ensure",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "some restaurants"
      ],
      [
        "predicate",
        "banned"
      ],
      [
        "object",
        "tipping and increased prices"
      ]
    ]
  },
  "R1-18": {
    "sentence": "So to increase employee wages without raising prices, more employers are succumbing to temptations of tip creep and tipflation.",
    "translation": "因此，为了在不提高价格的情况下提高员工工资，更多的雇主正在屈服于小费蔓延和小费通货膨胀的诱惑。",
    "vocabulary": [
      [
        "tipflation",
        "小费通胀"
      ],
      [
        "increase",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "more employers"
      ],
      [
        "predicate",
        "are succumbing"
      ]
    ]
  },
  "R1-19": {
    "sentence": "However, many customers are frustrated because they feel they are being asked for too high of a tip too often.",
    "translation": "然而，许多顾客感到沮丧，因为他们经常被要求支付过高的小费。",
    "vocabulary": [
      [
        "However",
        "重点词汇（结合本句理解）"
      ],
      [
        "customers",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "many customers"
      ],
      [
        "predicate",
        "are frustrated"
      ]
    ]
  },
  "R1-20": {
    "sentence": "And, as our research emphasizes, tipping now seems to be more coercive, less generous, and often completely dissociated from service quality.",
    "translation": "而且，正如我们的研究所强调的那样，小费现在似乎更具强制性，不那么慷慨，并且通常与服务质量完全脱节。",
    "vocabulary": [
      [
        "tipping",
        "付小费；小费制度"
      ],
      [
        "coercive",
        "强制性的"
      ],
      [
        "dissociated",
        "脱离联系的"
      ]
    ],
    "highlights": [
      [
        "subject",
        "tipping"
      ],
      [
        "predicate",
        "seems"
      ],
      [
        "complement",
        "to be more coercive, less generous, and often completely dissociated from service quality"
      ]
    ]
  },
  "R2-01": {
    "sentence": "When it was established, the National Health Service (NHS) was visionary: offering high-quality, timely care to meet the dominant needs of the population it served.",
    "translation": "国家卫生服务局（ NHS ）成立时具有远见卓识：提供高质量、及时的护理，以满足其所服务人群的主要需求。",
    "vocabulary": [
      [
        "visionary",
        "有远见的"
      ],
      [
        "established",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "the National Health Service (NHS)"
      ],
      [
        "predicate",
        "was"
      ],
      [
        "complement",
        "visionary: offering high-quality, timely care to meet the dominant needs of the population it served"
      ]
    ]
  },
  "R2-02": {
    "sentence": "Nearly 75 years on, with the UK facing very different health challenges, it is clear that the model is out of date.",
    "translation": "近75年过去了，英国面临着截然不同的健康挑战，很明显，这种模式已经过时了。",
    "vocabulary": [
      [
        "out of date",
        "过时的"
      ],
      [
        "Nearly",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "it"
      ],
      [
        "predicate",
        "is"
      ],
      [
        "complement",
        "clear"
      ]
    ]
  },
  "R2-03": {
    "sentence": "From life expectancy to cancer and infant mortality rates, we are lagging behind many of our peers.",
    "translation": "从预期寿命到癌症和婴儿死亡率，我们都落后于许多同龄人。",
    "vocabulary": [
      [
        "life expectancy",
        "预期寿命"
      ],
      [
        "mortality",
        "死亡率"
      ]
    ],
    "highlights": [
      [
        "subject",
        "we"
      ],
      [
        "predicate",
        "are lagging"
      ]
    ]
  },
  "R2-04": {
    "sentence": "With more than 6.8 million on waitlists, healthcare is becoming increasingly inaccessible for those who cannot opt to pay for private treatment; and the cost of providing healthcare is increasingly squeezing our investment in other public services.",
    "translation": "等候名单上有680多万人，无法选择支付私人治疗费用的人越来越难以获得医疗保健；提供医疗保健的成本越来越挤压我们对其他公共服务的投资。",
    "vocabulary": [
      [
        "inaccessible",
        "难以获得的"
      ],
      [
        "waitlists",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "healthcare"
      ],
      [
        "predicate",
        "is becoming"
      ],
      [
        "complement",
        "increasingly inaccessible"
      ]
    ]
  },
  "R2-05": {
    "sentence": "As demand for healthcare continues to grow, pressures on the workforce — which is already near breaking point — will only become more acute.",
    "translation": "随着对医疗保健的需求持续增长，劳动力的压力（已经接近临界点）只会变得更加严重。",
    "vocabulary": [
      [
        "workforce",
        "劳动力；员工队伍"
      ],
      [
        "demand",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "pressures on the workforce — which is already near breaking point"
      ],
      [
        "predicate",
        "will only become"
      ],
      [
        "complement",
        "more acute"
      ]
    ]
  },
  "R2-06": {
    "sentence": "Many of the answers to the crisis in health and care are well rehearsed.",
    "translation": "医疗保健危机的许多答案都得到了很好的演练。",
    "vocabulary": [
      [
        "answers",
        "重点词汇（结合本句理解）"
      ],
      [
        "crisis",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "Many of the answers to the crisis in health and care"
      ],
      [
        "predicate",
        "are"
      ],
      [
        "complement",
        "well rehearsed"
      ]
    ]
  },
  "R2-07": {
    "sentence": "We need to be much better at reducing and diverting demand on health services, rather than simply managing it.",
    "translation": "我们需要更好地减少和转移对医疗服务的需求，而不是简单地管理它。",
    "vocabulary": [
      [
        "better",
        "重点词汇（结合本句理解）"
      ],
      [
        "reducing",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "We"
      ],
      [
        "predicate",
        "need"
      ],
      [
        "complement",
        "to be much better at reducing and diverting demand on health services, rather than simply managing it"
      ]
    ]
  },
  "R2-08": {
    "sentence": "Much more needs to be invested in communities and primary care to reduce our reliance on hospitals.",
    "translation": "需要在社区和初级保健方面投入更多资金，以减少我们对医院的依赖。",
    "vocabulary": [
      [
        "primary care",
        "初级医疗；基层医疗"
      ],
      [
        "invested",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "Much more"
      ],
      [
        "predicate",
        "needs to be invested"
      ],
      [
        "complement",
        "in communities and primary care"
      ]
    ]
  },
  "R2-09": {
    "sentence": "And capacity in social care needs to be greater, to support the growing number of people living with long-term conditions.",
    "translation": "社会关怀能力需要提高，以支持越来越多的长期患病者。",
    "vocabulary": [
      [
        "social care",
        "社会照护"
      ],
      [
        "capacity",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "capacity in social care"
      ],
      [
        "predicate",
        "needs"
      ],
      [
        "complement",
        "to be greater,"
      ]
    ]
  },
  "R2-10": {
    "sentence": "Yet despite two decades of strategies and a number of major health reforms, we have failed to make meaningful progress on any of these aims.",
    "translation": "然而，尽管有二十年的战略和一些重大的卫生改革，我们未能在其中任何一个目标上取得有意义的进展。",
    "vocabulary": [
      [
        "reform",
        "改革"
      ],
      [
        "decades",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "we"
      ],
      [
        "predicate",
        "have failed"
      ],
      [
        "complement",
        "to make meaningful progress on any of these aims"
      ]
    ]
  },
  "R2-11": {
    "sentence": "That is why the Reform think tank is launching a new programme of work entitled “Reimagining health”, supported by ten former health ministers.",
    "translation": "这就是为什么改革智囊团正在推出一项题为“重塑健康”的新工作计划，由十位前卫生部长支持。",
    "vocabulary": [
      [
        "reform",
        "改革"
      ],
      [
        "launching",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "That"
      ],
      [
        "predicate",
        "is"
      ]
    ]
  },
  "R2-12": {
    "sentence": "Together, we are calling for a much more open and honest conversation about the future of health in the UK, and an “urgent rethink” of the hospital-centric model we retain.",
    "translation": "我们共同呼吁就英国未来的健康进行更加开放和诚实的对话，并“紧急重新思考”我们保留的以医院为中心的模式。",
    "vocabulary": [
      [
        "hospital-centric",
        "以医院为中心的"
      ],
      [
        "Together",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "we"
      ],
      [
        "predicate",
        "are calling"
      ]
    ]
  },
  "R2-13": {
    "sentence": "This must begin with the question of how we maximise the health of the nation, rather than “fix” the NHS.",
    "translation": "这必须从我们如何最大限度地提高国家的健康水平开始，而不是“修复” NHS。",
    "vocabulary": [
      [
        "maximise",
        "最大化"
      ],
      [
        "question",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "This"
      ],
      [
        "predicate",
        "must begin"
      ]
    ]
  },
  "R2-14": {
    "sentence": "It is estimated, for example, that healthcare accounts for only about 20% of health outcomes.",
    "translation": "例如，据估计，医疗保健仅占健康结果的20%左右。",
    "vocabulary": [
      [
        "estimated",
        "重点词汇（结合本句理解）"
      ],
      [
        "example",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "complement",
        "It is estimated, for example"
      ],
      [
        "subject",
        "healthcare"
      ],
      [
        "predicate",
        "accounts"
      ]
    ]
  },
  "R2-15": {
    "sentence": "Much more important are the places we live, work and socialise — yet there is no clear cross-government strategy for improving these social determinants of health.",
    "translation": "更重要的是我们生活、工作和社交的地方--然而，没有明确的跨政府战略来改善这些健康的社会决定因素。",
    "vocabulary": [
      [
        "social determinant",
        "社会决定因素"
      ],
      [
        "important",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "complement",
        "Much more important"
      ],
      [
        "predicate",
        "are"
      ],
      [
        "subject",
        "the places we live, work and socialise"
      ]
    ]
  },
  "R2-16": {
    "sentence": "Worse, when policies like the national obesity strategy are scrapped, taxpayers are left with the hefty price tag of treating the illnesses, like diabetes, that result.",
    "translation": "更糟糕的是，当像国家肥胖战略这样的政策被废除时，纳税人将面临治疗糖尿病等疾病的沉重代价。",
    "vocabulary": [
      [
        "obesity",
        "肥胖"
      ],
      [
        "policies",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "taxpayers"
      ],
      [
        "predicate",
        "are left"
      ]
    ]
  },
  "R2-17": {
    "sentence": "Reform wants to ask how power and resources should be distributed in our health system.",
    "translation": "改革希望了解我们的卫生系统应如何分配权力和资源。",
    "vocabulary": [
      [
        "reform",
        "改革"
      ],
      [
        "distribute",
        "分配"
      ]
    ],
    "highlights": [
      [
        "subject",
        "Reform"
      ],
      [
        "predicate",
        "wants"
      ],
      [
        "complement",
        "to ask how power and resources should be distributed in our health system"
      ]
    ]
  },
  "R2-18": {
    "sentence": "What health functions should remain at the centre, and what should be given to local leaders, often responsible for services that create health, and with a much better understanding of the needs of their populations?",
    "translation": "应该继续将哪些卫生职能放在中心位置？应该向当地领导人提供什么，他们通常负责创造健康的服务，并更好地了解其人口的需求？",
    "vocabulary": [
      [
        "health",
        "重点词汇（结合本句理解）"
      ],
      [
        "functions",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "object",
        "What"
      ],
      [
        "subject",
        "health functions"
      ],
      [
        "predicate",
        "should remain"
      ]
    ]
  },
  "R3-01": {
    "sentence": "Heat action plans, or HAPs, have been proliferating in India in the past few years.",
    "translation": "在过去几年中，热行动计划（ HAP ）在印度激增。",
    "vocabulary": [
      [
        "action",
        "重点词汇（结合本句理解）"
      ],
      [
        "proliferating",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "Heat action plans, or HAPs,"
      ],
      [
        "predicate",
        "have been proliferating"
      ]
    ]
  },
  "R3-02": {
    "sentence": "In general, an HAP spells out when and how officials should issue heat warnings and alert hospitals and other institutions.",
    "translation": "一般来说， HAP规定了官员应该何时以及如何发出热量警告，并向医院和其他机构发出警报。",
    "vocabulary": [
      [
        "general",
        "重点词汇（结合本句理解）"
      ],
      [
        "spells",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "an HAP"
      ],
      [
        "predicate",
        "spells"
      ]
    ]
  },
  "R3-03": {
    "sentence": "Nagpur’s plan, for instance, calls for hospitals to set aside “cold wards” in the summer for treating heatstroke patients, and advises builders to give construction laborers a break from work on very hot days.",
    "translation": "例如，那格浦尔的计划要求医院在夏季留出“寒冷病房”来治疗中暑患者，并建议建筑商在非常炎热的日子里让建筑工人休息一下。",
    "vocabulary": [
      [
        "heatstroke",
        "中暑"
      ],
      [
        "instance",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "Nagpur’s plan"
      ],
      [
        "predicate",
        "calls"
      ]
    ]
  },
  "R3-04": {
    "sentence": "But implementation of existing HAPs has been uneven, according to a report from the Center for Policy Research.",
    "translation": "但根据政策研究中心的一份报告，现有HAP的实施情况参差不齐。",
    "vocabulary": [
      [
        "implementation",
        "重点词汇（结合本句理解）"
      ],
      [
        "existing",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "implementation of existing HAPs"
      ],
      [
        "predicate",
        "has been"
      ],
      [
        "complement",
        "uneven"
      ]
    ]
  },
  "R3-05": {
    "sentence": "Many lack adequate funding, it found.",
    "translation": "它发现，许多国家缺乏足够的资金。",
    "vocabulary": [
      [
        "adequate",
        "重点词汇（结合本句理解）"
      ],
      [
        "funding",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "complement",
        "Many lack adequate funding"
      ],
      [
        "subject",
        "it"
      ],
      [
        "predicate",
        "found"
      ]
    ]
  },
  "R3-06": {
    "sentence": "And their triggering thresholds often are not customized to the local climate.",
    "translation": "它们的触发阈值通常不是根据当地气候定制的。",
    "vocabulary": [
      [
        "threshold",
        "阈值；临界点"
      ],
      [
        "triggering",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "their triggering thresholds"
      ],
      [
        "predicate",
        "are not customized"
      ]
    ]
  },
  "R3-07": {
    "sentence": "In some areas, high daytime temperatures alone might serve as an adequate trigger for alerts.",
    "translation": "在某些地区，仅白天高温就足以触发警报。",
    "vocabulary": [
      [
        "daytime",
        "重点词汇（结合本句理解）"
      ],
      [
        "temperatures",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "high daytime temperatures alone"
      ],
      [
        "predicate",
        "might serve"
      ]
    ]
  },
  "R3-08": {
    "sentence": "But in other places, nighttime temperatures or humidity might be as important a gauge of risk as daytime highs.",
    "translation": "但在其他地方，夜间温度或湿度可能与白天最高温度一样重要。",
    "vocabulary": [
      [
        "humidity",
        "湿度"
      ],
      [
        "places",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "nighttime temperatures or humidity"
      ],
      [
        "predicate",
        "might be"
      ],
      [
        "complement",
        "as important a gauge of risk as daytime highs"
      ]
    ]
  },
  "R3-09": {
    "sentence": "Mumbai’s April heat stroke deaths highlighted the need for more nuanced and localized warnings, researchers say.",
    "translation": "研究人员表示，孟买4月份的中暑死亡凸显了需要更多细致入微和局部化的警告。",
    "vocabulary": [
      [
        "localized",
        "地方化的；局部的"
      ],
      [
        "stroke",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "complement",
        "Mumbai’s April heat stroke deaths highlighted the need for more nuanced and localized warnings"
      ],
      [
        "subject",
        "researchers"
      ],
      [
        "predicate",
        "say"
      ]
    ]
  },
  "R3-10": {
    "sentence": "That day’s high temperature of roughly 36°C was 1°C shy of the heat wave alert threshold for coastal cities set by national meteorological authorities.",
    "translation": "当天的高温约为36°C ，比国家气象当局为沿海城市设定的热浪警报阈值低1°C。",
    "vocabulary": [
      [
        "threshold",
        "阈值；临界点"
      ],
      [
        "temperature",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "That day’s high temperature of roughly 36°C"
      ],
      [
        "predicate",
        "was"
      ],
      [
        "complement",
        "1°C shy of the heat wave alert threshold for coastal cities set by national meteorological authorities"
      ]
    ]
  },
  "R3-11": {
    "sentence": "But the effects of the heat were amplified by humidity — an often neglected factor in heat alert systems — and the lack of shade at the late-morning outdoor ceremony.",
    "translation": "但是，湿度（高温预警系统中经常被忽视的因素）以及上午较晚时段户外仪式缺少遮阴，都放大了高温的影响。",
    "vocabulary": [
      [
        "humidity",
        "湿度"
      ],
      [
        "effects",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "the effects of the heat"
      ],
      [
        "predicate",
        "were amplified"
      ],
      [
        "complement",
        "by humidity — an often neglected factor in heat alert systems — and the lack of shade at the late-morning outdoor ceremony"
      ]
    ]
  },
  "R3-12": {
    "sentence": "To help improve HAPs, urban planner Kotharkar’s team is working on a model plan that outlines best practices and could be adapted to local conditions.",
    "translation": "为了帮助改进HAP ，城市规划师Kotharkar的团队正在制定一个模型计划，该计划概述了最佳实践，并可根据当地情况进行调整。",
    "vocabulary": [
      [
        "urban planner",
        "城市规划者"
      ],
      [
        "improve",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "urban planner Kotharkar’s team"
      ],
      [
        "predicate",
        "is working"
      ],
      [
        "object",
        "on a model plan that outlines best practices and could be adapted to local conditions"
      ]
    ]
  },
  "R3-13": {
    "sentence": "Among other things, she says, all cities should create a vulnerability map to help focus responses on the populations most at risk.",
    "translation": "她说，除其他事项外，所有城市都应创建脆弱性地图，以帮助将应对重点放在最高风险人群上。",
    "vocabulary": [
      [
        "vulnerability",
        "脆弱性；易受伤害性"
      ],
      [
        "things",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "all cities"
      ],
      [
        "predicate",
        "should create"
      ],
      [
        "object",
        "a vulnerability map to help focus responses on the populations most at risk"
      ]
    ]
  },
  "R3-14": {
    "sentence": "Such mapping doesn’t need to be complex, Kotharkar says.",
    "translation": "Kotharkar说，这种绘图不需要很复杂。",
    "vocabulary": [
      [
        "mapping",
        "重点词汇（结合本句理解）"
      ],
      [
        "complex",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "complement",
        "Such mapping doesn’t need to be complex"
      ],
      [
        "subject",
        "Kotharkar"
      ],
      [
        "predicate",
        "says"
      ]
    ]
  },
  "R3-15": {
    "sentence": "“A useful map can be created by looking at even a few key parameters.”",
    "translation": "“甚至可以通过查看几个关键参数来创建有用的地图。”",
    "vocabulary": [
      [
        "parameter",
        "参数；要素"
      ],
      [
        "useful",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "A useful map"
      ],
      [
        "predicate",
        "can be created"
      ]
    ]
  },
  "R3-16": {
    "sentence": "For example, neighborhoods with a large elderly population or informal dwellings that cope poorly with heat could get special warnings or be bolstered with cooling centers.",
    "translation": "例如，老年人口众多或非正规住宅难以应对高温的街区可能会收到特别警告或配备冷却中心。",
    "vocabulary": [
      [
        "bolster",
        "加强；支持"
      ],
      [
        "example",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "neighborhoods with a large elderly population or informal dwellings that cope poorly with heat"
      ],
      [
        "predicate",
        "could get"
      ],
      [
        "object",
        "special warnings"
      ]
    ]
  },
  "R3-17": {
    "sentence": "The Nagpur project has already created a risk and vulnerability map, which enabled Kotharkar to tell officials which neighborhoods to focus on in the event of a heat wave this summer.",
    "translation": "那格浦尔项目已经创建了一个风险和脆弱性地图，使Kotharkar能够告诉官员在今年夏天发生热浪时应该关注哪些社区。",
    "vocabulary": [
      [
        "vulnerability",
        "脆弱性；易受伤害性"
      ],
      [
        "project",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "The Nagpur project"
      ],
      [
        "predicate",
        "has already created"
      ],
      [
        "object",
        "a risk and vulnerability map, which enabled Kotharkar to tell officials which neighborhoods to focus on in the event of a heat wave this summer"
      ]
    ]
  },
  "R3-18": {
    "sentence": "HAPs shouldn’t just include short-term emergency responses, researchers say, but also recommend medium-to long-term measures that could make communities cooler.",
    "translation": "研究人员说， HAP不应该只包括短期应急响应，还应该建议中长期措施，使社区变得更凉爽。",
    "vocabulary": [
      [
        "emergency response",
        "应急响应"
      ],
      [
        "include",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "HAPs"
      ],
      [
        "predicate",
        "shouldn’t just include"
      ],
      [
        "object",
        "short-term emergency responses"
      ]
    ]
  },
  "R3-19": {
    "sentence": "In Nagpur, for example, Kotharkar’s team has been able to advise city officials about where to plant trees to provide shade.",
    "translation": "例如，在Nagpur ， Kotharkar的团队已经能够就在哪里种树提供阴凉处向市政官员提供建议。",
    "vocabulary": [
      [
        "example",
        "重点词汇（结合本句理解）"
      ],
      [
        "advise",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "Kotharkar’s team"
      ],
      [
        "predicate",
        "has been"
      ],
      [
        "complement",
        "able to advise city officials about where to plant trees to provide shade"
      ]
    ]
  },
  "R3-20": {
    "sentence": "HAPs could also guide efforts to retrofit homes or modify building regulations.",
    "translation": "HAP还可以指导房屋改造或修改建筑法规。",
    "vocabulary": [
      [
        "retrofit",
        "改造；翻新"
      ],
      [
        "efforts",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "HAPs"
      ],
      [
        "predicate",
        "could also guide"
      ],
      [
        "object",
        "efforts to retrofit homes or modify building regulations"
      ]
    ]
  },
  "R3-21": {
    "sentence": "“Reducing deaths in an emergency is a good target to have, but it’s the lowest target,” says climate researcher Chandni Singh.",
    "translation": "气候研究员Chandni Singh说： “减少紧急情况下的死亡人数是一个很好的目标，但它是最低的目标。”",
    "vocabulary": [
      [
        "Reducing",
        "重点词汇（结合本句理解）"
      ],
      [
        "deaths",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "complement",
        "Reducing deaths in an emergency is a good target to have, but it’s the lowest target"
      ],
      [
        "predicate",
        "says"
      ],
      [
        "subject",
        "climate researcher Chandni Singh"
      ]
    ]
  },
  "R4-01": {
    "sentence": "Navigating beyond the organised pavements and parks of our urban spaces, desire paths are the unofficial footprints of a community, revealing the unspoken preferences, shared shortcuts and collective choices of humans.",
    "translation": "穿越我们城市空间的有序人行道和公园，渴望的道路是社区的非正式足迹，揭示了人类不言而喻的偏好、共同的捷径和集体选择。",
    "vocabulary": [
      [
        "desire path",
        "意愿路径；非正式小路"
      ],
      [
        "unofficial",
        "非正式的"
      ],
      [
        "shortcut",
        "捷径"
      ]
    ],
    "highlights": [
      [
        "subject",
        "desire paths"
      ],
      [
        "predicate",
        "are"
      ],
      [
        "complement",
        "the unofficial footprints of a community"
      ]
    ]
  },
  "R4-02": {
    "sentence": "Often appearing as trodden dirt tracks through otherwise neat green spaces, these routes of collective disobedience cut corners, bisect lawns and cross hills, representing the natural capability of people (and animals) to go from point A to point B most effectively.",
    "translation": "这些集体不服从的路线通常以穿过整洁绿地的泥土轨迹的形式出现，切割角落、平分草坪和穿越山丘，代表人（和动物）最有效地从A点到达B点的自然能力。",
    "vocabulary": [
      [
        "trodden",
        "被踩出的"
      ],
      [
        "collective",
        "集体的"
      ]
    ],
    "highlights": [
      [
        "predicate",
        "appearing"
      ]
    ]
  },
  "R4-03": {
    "sentence": "Urban planners interpret desire paths as more than just convenient shortcuts; they offer valuable insights into the dynamics between planning and behaviour.",
    "translation": "城市规划者将愿望路径解释为不仅仅是方便的捷径；它们为规划和行为之间的动态关系提供了宝贵的见解。",
    "vocabulary": [
      [
        "desire path",
        "意愿路径；非正式小路"
      ],
      [
        "shortcut",
        "捷径"
      ],
      [
        "urban planner",
        "城市规划者"
      ]
    ],
    "highlights": [
      [
        "complement",
        "Urban planners interpret desire paths as more than just convenient shortcuts"
      ],
      [
        "subject",
        "they"
      ],
      [
        "predicate",
        "offer"
      ]
    ]
  },
  "R4-04": {
    "sentence": "Ohio State University allowed its students to navigate the Oval, a lawn in the centre of campus, freely, then proceeded to pave the desire paths, creating a web of effective routes students had established.",
    "translation": "俄亥俄州立大学允许学生自由地在校园中心的草坪椭圆形中导航，然后继续铺设理想的路径，创建了一个学生已经建立的有效路线网络。",
    "vocabulary": [
      [
        "desire path",
        "意愿路径；非正式小路"
      ],
      [
        "allowed",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "Ohio State University"
      ],
      [
        "predicate",
        "allowed"
      ],
      [
        "complement",
        "its students to navigate the Oval, a lawn in the centre of campus, freely, then proceeded to pave the desire paths, creating a web of effective routes students had established"
      ]
    ]
  },
  "R4-05": {
    "sentence": "Yet, reluctance persists among other planners to integrate desire paths into formal plans, citing concerns about safety, environmental impact, or primarily, aesthetics.",
    "translation": "然而，其他规划者仍然不愿意将愿望路径纳入正式计划，理由是对安全、环境影响或主要是美学的担忧。",
    "vocabulary": [
      [
        "reluctance",
        "不情愿；勉强"
      ],
      [
        "concern",
        "担忧；顾虑"
      ],
      [
        "desire path",
        "意愿路径；非正式小路"
      ]
    ],
    "highlights": [
      [
        "subject",
        "reluctance"
      ],
      [
        "predicate",
        "persists"
      ]
    ]
  },
  "R4-06": {
    "sentence": "A Reddit webpage devoted to the phenomenon, boasting nearly 50,000 members, showcases images of local desire paths adorned with signs instructing pedestrians to adhere to designated walkways, underscoring the rebellious nature inherent in these human-made tracks.",
    "translation": "一个专门讨论这一现象的Reddit网页拥有近5万名会员，展示了当地欲望路径的图像，上面装饰着指示行人遵守指定人行道的标志，凸显了这些人造轨道固有的叛逆性。",
    "vocabulary": [
      [
        "desire path",
        "意愿路径；非正式小路"
      ],
      [
        "designated",
        "指定的"
      ]
    ],
    "highlights": [
      [
        "subject",
        "A Reddit webpage devoted to the phenomenon, boasting nearly 50,000 members,"
      ],
      [
        "predicate",
        "showcases"
      ],
      [
        "object",
        "images of local desire paths adorned with signs instructing pedestrians to adhere to designated walkways, underscoring the rebellious nature inherent in these human-made tracks"
      ]
    ]
  },
  "R4-07": {
    "sentence": "This clash highlights an ongoing struggle between the organic, user-driven evolution of public spaces and the desire for a visually curated and controlled urban environment.",
    "translation": "这场冲突凸显了公共空间的有机、用户驱动的演变与对视觉策划和控制的城市环境的渴望之间的持续斗争。",
    "vocabulary": [
      [
        "curated",
        "精心规划的；筛选的"
      ],
      [
        "highlights",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "This clash"
      ],
      [
        "predicate",
        "highlights"
      ],
      [
        "object",
        "an ongoing struggle between the organic, user-driven evolution of public spaces and the desire for a visually curated and controlled urban environment"
      ]
    ]
  },
  "R4-08": {
    "sentence": "The Wickquasgeck Trail is an example of a historical desire path, created by Native Americans to cross the forests of Manhattan and move between settlements quickly.",
    "translation": "维克盖克步道（ Wickquasgeck Trail ）是一条历史悠久的愿望之路，由美洲原住民创建，旨在穿越曼哈顿的森林，在定居点之间快速移动。",
    "vocabulary": [
      [
        "desire path",
        "意愿路径；非正式小路"
      ],
      [
        "historical",
        "历史的"
      ]
    ],
    "highlights": [
      [
        "subject",
        "The Wickquasgeck Trail"
      ],
      [
        "predicate",
        "is"
      ],
      [
        "complement",
        "an example of a historical desire path, created by Native Americans to cross the forests of Manhattan and move between settlements quickly"
      ]
    ]
  },
  "R4-09": {
    "sentence": "This trail, when Dutch colonists arrived, was widened and made into one of the main trade roads across the island, known at the time as de Heere Straat, or Gentlemen’s Street.",
    "translation": "当荷兰殖民者抵达时，这条小径被拓宽并成为岛上的主要贸易道路之一，当时被称为de Heere Straat或绅士街。",
    "vocabulary": [
      [
        "colonists",
        "重点词汇（结合本句理解）"
      ],
      [
        "arrived",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "This trail, when Dutch colonists arrived"
      ],
      [
        "predicate",
        "was widened"
      ]
    ]
  },
  "R4-10": {
    "sentence": "Following the British assumption of control in New York, the street was renamed Broadway.",
    "translation": "在英国接管纽约之后，这条街改名为百老汇。",
    "vocabulary": [
      [
        "Following",
        "重点词汇（结合本句理解）"
      ],
      [
        "British",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "the street"
      ],
      [
        "predicate",
        "was renamed"
      ],
      [
        "complement",
        "Broadway"
      ]
    ]
  },
  "R4-11": {
    "sentence": "Notably, Broadway stands out as one of the few areas in NYC that defies the grid-based system applied to the rest of the city, cutting a diagonal across parts of the city.",
    "translation": "值得注意的是，百老汇是纽约市为数不多的几个无视适用于城市其他地区的基于电网的系统的地区之一，横跨城市的部分地区。",
    "vocabulary": [
      [
        "grid-based",
        "基于网格的"
      ],
      [
        "Notably",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "Broadway"
      ],
      [
        "predicate",
        "stands"
      ]
    ]
  },
  "R4-12": {
    "sentence": "In online spaces, desire paths have sparked a fascination that can approach obsession, with the Reddit page serving as a hub.",
    "translation": "在在线空间中，渴望的路径引发了一种迷恋，可以接近痴迷， Reddit页面可以作为一个中心。",
    "vocabulary": [
      [
        "desire path",
        "意愿路径；非正式小路"
      ],
      [
        "hub",
        "中心；枢纽"
      ]
    ],
    "highlights": [
      [
        "subject",
        "desire paths"
      ],
      [
        "predicate",
        "have sparked"
      ],
      [
        "object",
        "a fascination that can approach obsession, with the Reddit page serving as a hub"
      ]
    ]
  },
  "R4-13": {
    "sentence": "Contributors offer a wide array of stories, from little-known new shortcuts to long-established alternate routes.",
    "translation": "贡献者提供了各种各样的故事，从鲜为人知的新快捷方式到历史悠久的替代路线。",
    "vocabulary": [
      [
        "shortcut",
        "捷径"
      ],
      [
        "Contributors",
        "重点词汇（结合本句理解）"
      ]
    ],
    "highlights": [
      [
        "subject",
        "Contributors"
      ],
      [
        "predicate",
        "offer"
      ],
      [
        "object",
        "a wide array of stories, from little-known new shortcuts to long-established alternate routes"
      ]
    ]
  },
  "R4-14": {
    "sentence": "Animal desire paths, such as ducks forging trails through frozen ponds or dogs carving direct routes in gardens, highlight the adaptability of these trails in both human and animal experiences.",
    "translation": "动物形成的意愿小路——例如鸭子在结冰池塘上踩出小径、狗在花园中踩出直线路径——凸显了这些路径在人类和动物活动中的适应性。",
    "vocabulary": [
      [
        "desire path",
        "意愿路径；非正式小路"
      ],
      [
        "adaptability",
        "适应性"
      ]
    ],
    "highlights": [
      [
        "subject",
        "Animal desire paths"
      ],
      [
        "predicate",
        "highlight"
      ],
      [
        "object",
        "the adaptability of these trails in both human and animal experiences"
      ]
    ]
  },
  "R4-15": {
    "sentence": "As desire paths criss-cross through both physical and virtual landscapes, they stand as a proof of the collective insistence on forging unconventional routes and embracing the spirit of communal choice.",
    "translation": "由于愿望路径在物理和虚拟景观中交叉，它们证明了集体坚持打造非传统路线并拥抱社区选择的精神。",
    "vocabulary": [
      [
        "desire path",
        "意愿路径；非正式小路"
      ],
      [
        "collective",
        "集体的"
      ]
    ],
    "highlights": [
      [
        "subject",
        "they"
      ],
      [
        "predicate",
        "stand"
      ]
    ]
  }
} as const;

const translationOverrides: Readonly<Record<string, string>> = {
  C01: '有许多原因可以解释，为什么你在需要帮助时会觉得难以开口求助。',
  C07: '你可能会担心失去对所求助之事的控制。',
  C08: '一旦有人开始帮忙，也许他们会接手，或者把你前期的努力算作自己的功劳。',
  C09: '你可能还担心自己会成为麻烦，或给你求助的那个人带来不便。',
  C10: '如果你的自尊心较低，你可能尤其难以开口求助，因为你还担心对方会拒绝你的请求。',
  C15: '也许最令人鼓舞的是，加州斯坦福大学研究人员在 2022 年发表的一篇论文；研究包含设计的求助互动，并要求人们回忆过去寻求帮助的经历。',
  C16: '研究结果表明，求助者通常会低估他人愿意帮忙的程度，也会低估帮助别人会让施助者感觉多么良好（对大多数人来说，有机会帮助别人很有回报）。',
  C14: '虽然你可能害怕给人留下无能的印象，但研究实际上表明，寻求建议的人会被认为更有能力，而不是更没有能力。',
  'M-B03': '如果这样做奏效，效果会很好——因为你可以用“我已经联系技术部门几个人，了解网站更新需要多少时间，他们说目前有余力”来回应固执的主管。',
  'M-C01': '当一个想法的提出者被认为好争辩、戒备或思想封闭时，争取他人支持就会遇到很大的障碍。',
  'M-D02': '换句话说，不要为了凸显自己的改进，就把旧方案全盘否定。',
  'R1-01': '美国顾客过去通常会给那些他们认为大部分收入来自小费的人付小费，例如收入低于最低工资的餐厅服务员。',
  'R1-12': '小费比例从 20 世纪 50 年代的 10% 或更低，升至 2000 年前后的 15%，如今达到 20% 甚至更高。',
  'R1-14': '小费一直是传统小费行业从业者的重要收入来源；例如餐厅服务员的最低小费工资可能低至每小时 2.13 美元。',
  'R1-16': '值得注意的是，小费主要让其中一些员工受益，比如服务员，却未必惠及厨师和洗碗工。',
  'R2-03': '从预期寿命、癌症和婴儿死亡率等指标来看，我们落后于许多同类国家。',
  'R2-05': '随着医疗需求持续增长，劳动力压力——而这支队伍已经接近承受极限——只会进一步加剧。',
  'R2-06': '应对医疗与照护危机的许多方案早已被反复讨论。',
  'R2-11': '因此，改革智库正在十位前卫生部长的支持下，启动一项名为“重新构想健康”的新计划。',
  'R2-18': '哪些卫生职能应继续由中央负责？哪些应交给地方领导人？地方领导人往往负责创造健康的服务，也更了解本地居民的需求。',
  'R3-01': '过去几年里，印度各地的高温行动计划（HAP）不断增加。',
  'R3-05': '报告发现，许多计划缺乏充足资金。',
  'R3-06': '而且，它们的触发阈值往往没有根据当地气候进行定制。',
  'R3-15': '“只要考察几个关键参数，就能绘制出有用的地图。”',
  'R3-19': '例如在那格浦尔，Kotharkar 的团队已经能够建议市政府在哪些地方植树，以提供遮阴。',
  'R4-01': '穿过城市空间中规划整齐的人行道和公园，意愿小路是社区留下的非正式足迹，揭示了人们未说出口的偏好、共同选择的捷径和集体决定。',
  'R4-02': '这些集体偏离规划的路线常表现为整洁绿地中的泥土小径：它们抄近路、穿过草坪和山坡，体现了人类（以及动物）以最高效方式从 A 点到 B 点的自然能力。',
  'R4-03': '城市规划者认为，意愿小路不只是方便的捷径；它们还揭示了规划与行为之间的互动。',
  'R4-04': '俄亥俄州立大学曾允许学生自由穿行校园中央的 Oval 草坪，随后把学生踩出的意愿小路铺设出来，形成了一张高效路线网。',
  'R4-05': '然而，其他规划者仍不愿把意愿小路纳入正式规划，理由是担心安全、环境影响，或主要担心美观。',
  'R4-06': '一个专门讨论这一现象、拥有近五万名成员的 Reddit 页面，展示了当地意愿小路的照片；照片中的标牌要求行人遵守指定步道，凸显了这些人造小路所带有的反叛意味。',
  'R4-07': '这种冲突凸显了两种力量之间的持续拉扯：公共空间自发、由使用者推动的演变，以及对视觉上整齐可控的城市环境的追求。',
  'R4-08': 'Wickquasgeck Trail 是一条历史上的意愿小路，由美洲原住民开辟，用来快速穿过曼哈顿森林、往返不同聚落。',
  'R4-09': '荷兰殖民者到来后，这条小路被拓宽，成为横贯曼哈顿岛的主要贸易道路之一，当时称为 de Heere Straat，即“绅士街”。',
  'R4-11': '值得注意的是，百老汇斜穿纽约部分地区，成为纽约市少数不遵循全城网格系统的道路之一。',
  'R4-12': '在网络空间，意愿小路引发了近乎痴迷的兴趣，Reddit 页面成了一个交流中心。',
  'R4-14': '动物形成的意愿小路——例如鸭子在结冰池塘上踩出小径、狗在花园中踩出直线路径——凸显了这些路径在人类和动物活动中的适应性。',
  'R4-15': '意愿小路穿梭于现实和虚拟景观之中，体现了群体坚持开辟非传统路线、拥抱共同选择的精神。',
};

const highlightOverrides: Readonly<Record<string, readonly [string, string][]>> = {
  C03: [['subject', 'Asking for help'], ['predicate', 'takes'], ['object', 'courage']],
  C04: [['subject', 'It'], ['predicate', 'involves'], ['object', 'communicating a need on your part']],
  C08: [['subject', 'they'], ['predicate', 'will take over']],
  'M-C01': [['subject', 'One of the biggest barriers to gaining buy-in'], ['predicate', 'occurs'], ['complement', 'when the owner of an idea is viewed as argumentative, defensive, or close-minded']],
  'R2-01': [['subject', 'the National Health Service (NHS)'], ['predicate', 'was'], ['complement', 'visionary']],
  'R2-04': [['subject', 'healthcare'], ['predicate', 'is becoming'], ['complement', 'increasingly inaccessible for those who cannot opt to pay for private treatment']],
  'R2-05': [['subject', 'pressures on the workforce'], ['predicate', 'will only become'], ['complement', 'more acute']],
  'R3-05': [['subject', 'Many'], ['predicate', 'lack'], ['object', 'adequate funding']],
  'R3-06': [['subject', 'their triggering thresholds'], ['predicate', 'are not customized'], ['complement', 'to the local climate']],
  'R4-02': [['subject', 'these routes of collective disobedience'], ['predicate', 'cut corners, bisect lawns and cross hills']],
  'R4-03': [['subject', 'Urban planners'], ['predicate', 'interpret'], ['object', 'desire paths as more than just convenient shortcuts']],
  'R4-06': [['subject', 'A Reddit webpage devoted to the phenomenon'], ['predicate', 'showcases'], ['object', 'images of local desire paths adorned with signs instructing pedestrians to adhere to designated walkways']],
  'R4-10': [['subject', 'the street'], ['predicate', 'was renamed'], ['complement', 'Broadway']],
  'R4-12': [['subject', 'desire paths'], ['predicate', 'have sparked'], ['object', 'a fascination that can approach obsession']],
};

const structureRoleLabels: Record<string, string> = {
  subject: '主语',
  predicate: '谓语',
  object: '宾语',
  complement: '补语 / 表语',
  adverbial: '状语',
};

const deriveStructure = (highlights: readonly { role: string; text: string }[]) => {
  const labels = highlights
    .map((highlight) => structureRoleLabels[highlight.role] ?? highlight.role)
    .filter((label, index, all) => index === 0 || label !== all[index - 1]);
  const pattern = labels.join(' + ') || '句子成分';
  const explanation = highlights.length > 0
    ? highlights
      .map((highlight) => `${structureRoleLabels[highlight.role] ?? highlight.role}为 ${highlight.text}`)
      .join('，') + '。'
    : '句子成分未单独标注。';
  return { pattern, explanation };
};

export const kaoyanEnglishTwoCloseReadings2025: Readonly<Record<string, CloseReading>> = Object.fromEntries(
  Object.entries(noteData).map(([key, item]) => [key, {
    translation: translationOverrides[key] ?? item.translation,
    vocabulary: item.vocabulary.map(([term, explanation]) => ({ term, explanation })),
    structure: deriveStructure((highlightOverrides[key] ?? item.highlights).map(([role, text]) => ({ role, text }))),
    highlights: (highlightOverrides[key] ?? item.highlights).map(([role, text]) => ({ role, text })),
  }]),
) as Readonly<Record<string, CloseReading>>;

export const kaoyanEnglishTwoInlineGlossary2025: InlineGlossary = {
  words: {
  "ask for help": {
    "partOfSpeech": "短语",
    "meaning": "求助；寻求帮助"
  },
  "high-profile": {
    "partOfSpeech": "形容词",
    "meaning": "引人注目的；备受关注的"
  },
  "reluctance": {
    "partOfSpeech": "名词",
    "meaning": "不情愿；勉强"
  },
  "courage": {
    "partOfSpeech": "名词",
    "meaning": "勇气"
  },
  "broadcast": {
    "partOfSpeech": "动词",
    "meaning": "公开传达；传播"
  },
  "uncomfortable": {
    "partOfSpeech": "形容词",
    "meaning": "不舒服的；尴尬的"
  },
  "concern": {
    "partOfSpeech": "名词",
    "meaning": "担忧；顾虑"
  },
  "take over": {
    "partOfSpeech": "短语",
    "meaning": "接手；接管"
  },
  "nuisance": {
    "partOfSpeech": "名词",
    "meaning": "麻烦的人或事"
  },
  "inconvenience": {
    "partOfSpeech": "动词",
    "meaning": "给……带来不便"
  },
  "low self-esteem": {
    "partOfSpeech": "短语",
    "meaning": "低自尊"
  },
  "reach out": {
    "partOfSpeech": "短语",
    "meaning": "主动联系；寻求帮助"
  },
  "refusal": {
    "partOfSpeech": "名词",
    "meaning": "拒绝"
  },
  "overcome": {
    "partOfSpeech": "动词",
    "meaning": "克服"
  },
  "incompetent": {
    "partOfSpeech": "形容词",
    "meaning": "无能的；不胜任的"
  },
  "advice-seeker": {
    "partOfSpeech": "名词",
    "meaning": "寻求建议的人"
  },
  "perceive": {
    "partOfSpeech": "动词",
    "meaning": "认为；看作"
  },
  "underestimate": {
    "partOfSpeech": "动词",
    "meaning": "低估"
  },
  "willing": {
    "partOfSpeech": "形容词",
    "meaning": "愿意的"
  },
  "rewarding": {
    "partOfSpeech": "形容词",
    "meaning": "有回报的；值得的"
  },
  "tipping": {
    "partOfSpeech": "名词/动名词",
    "meaning": "付小费；小费制度"
  },
  "tip request": {
    "partOfSpeech": "短语",
    "meaning": "小费请求"
  },
  "prompt": {
    "partOfSpeech": "动词",
    "meaning": "促使；提示"
  },
  "beforehand": {
    "partOfSpeech": "副词",
    "meaning": "事先；提前"
  },
  "prevalence": {
    "partOfSpeech": "名词",
    "meaning": "普遍；流行"
  },
  "tipflation": {
    "partOfSpeech": "名词",
    "meaning": "小费通胀"
  },
  "supplement": {
    "partOfSpeech": "动词",
    "meaning": "补充；增加"
  },
  "low-wage": {
    "partOfSpeech": "形容词",
    "meaning": "低工资的"
  },
  "coercive": {
    "partOfSpeech": "形容词",
    "meaning": "强制性的"
  },
  "dissociated": {
    "partOfSpeech": "形容词",
    "meaning": "脱离联系的"
  },
  "visionary": {
    "partOfSpeech": "形容词",
    "meaning": "有远见的"
  },
  "out of date": {
    "partOfSpeech": "短语",
    "meaning": "过时的"
  },
  "life expectancy": {
    "partOfSpeech": "短语",
    "meaning": "预期寿命"
  },
  "mortality": {
    "partOfSpeech": "名词",
    "meaning": "死亡率"
  },
  "inaccessible": {
    "partOfSpeech": "形容词",
    "meaning": "难以获得的"
  },
  "workforce": {
    "partOfSpeech": "名词",
    "meaning": "劳动力；员工队伍"
  },
  "primary care": {
    "partOfSpeech": "短语",
    "meaning": "初级医疗；基层医疗"
  },
  "social care": {
    "partOfSpeech": "短语",
    "meaning": "社会照护"
  },
  "reform": {
    "partOfSpeech": "名词/动词",
    "meaning": "改革"
  },
  "hospital-centric": {
    "partOfSpeech": "形容词",
    "meaning": "以医院为中心的"
  },
  "maximise": {
    "partOfSpeech": "动词",
    "meaning": "最大化"
  },
  "social determinant": {
    "partOfSpeech": "短语",
    "meaning": "社会决定因素"
  },
  "obesity": {
    "partOfSpeech": "名词",
    "meaning": "肥胖"
  },
  "distribute": {
    "partOfSpeech": "动词",
    "meaning": "分配"
  },
  "proliferate": {
    "partOfSpeech": "动词",
    "meaning": "迅速增加；扩散"
  },
  "spell out": {
    "partOfSpeech": "短语",
    "meaning": "明确说明"
  },
  "heatstroke": {
    "partOfSpeech": "名词",
    "meaning": "中暑"
  },
  "threshold": {
    "partOfSpeech": "名词",
    "meaning": "阈值；临界点"
  },
  "localized": {
    "partOfSpeech": "形容词",
    "meaning": "地方化的；局部的"
  },
  "humidity": {
    "partOfSpeech": "名词",
    "meaning": "湿度"
  },
  "vulnerability": {
    "partOfSpeech": "名词",
    "meaning": "脆弱性；易受伤害性"
  },
  "parameter": {
    "partOfSpeech": "名词",
    "meaning": "参数；要素"
  },
  "bolster": {
    "partOfSpeech": "动词",
    "meaning": "加强；支持"
  },
  "retrofit": {
    "partOfSpeech": "动词",
    "meaning": "改造；翻新"
  },
  "emergency response": {
    "partOfSpeech": "短语",
    "meaning": "应急响应"
  },
  "desire path": {
    "partOfSpeech": "短语",
    "meaning": "意愿路径；非正式小路"
  },
  "unofficial": {
    "partOfSpeech": "形容词",
    "meaning": "非正式的"
  },
  "trodden": {
    "partOfSpeech": "形容词",
    "meaning": "被踩出的"
  },
  "shortcut": {
    "partOfSpeech": "名词",
    "meaning": "捷径"
  },
  "collective": {
    "partOfSpeech": "形容词",
    "meaning": "集体的"
  },
  "urban planner": {
    "partOfSpeech": "短语",
    "meaning": "城市规划者"
  },
  "integrate": {
    "partOfSpeech": "动词",
    "meaning": "整合；纳入"
  },
  "aesthetics": {
    "partOfSpeech": "名词",
    "meaning": "美观；审美"
  },
  "designated": {
    "partOfSpeech": "形容词",
    "meaning": "指定的"
  },
  "curated": {
    "partOfSpeech": "形容词",
    "meaning": "精心规划的；筛选的"
  },
  "historical": {
    "partOfSpeech": "形容词",
    "meaning": "历史的"
  },
  "defy": {
    "partOfSpeech": "动词",
    "meaning": "违背；不服从"
  },
  "grid-based": {
    "partOfSpeech": "形容词",
    "meaning": "基于网格的"
  },
  "hub": {
    "partOfSpeech": "名词",
    "meaning": "中心；枢纽"
  },
  "adaptability": {
    "partOfSpeech": "名词",
    "meaning": "适应性"
  },
  "buy-in": {
    "partOfSpeech": "名词",
    "meaning": "支持；认同"
  },
  "champion": {
    "partOfSpeech": "动词",
    "meaning": "积极支持；捍卫"
  },
  "scrutiny": {
    "partOfSpeech": "名词",
    "meaning": "仔细审查"
  },
  "coalition": {
    "partOfSpeech": "名词",
    "meaning": "联盟"
  },
  "stakeholder": {
    "partOfSpeech": "名词",
    "meaning": "利益相关者"
  },
  "argumentative": {
    "partOfSpeech": "形容词",
    "meaning": "好争辩的"
  },
  "defensive": {
    "partOfSpeech": "形容词",
    "meaning": "防御性的；戒备的"
  },
  "humble": {
    "partOfSpeech": "形容词",
    "meaning": "谦逊的"
  },
  "indignant": {
    "partOfSpeech": "形容词",
    "meaning": "愤慨的"
  },
  "remedy": {
    "partOfSpeech": "名词",
    "meaning": "补救办法"
  },
  "abundance": {
    "partOfSpeech": "名词",
    "meaning": "充足；丰富"
  },
  "deficit": {
    "partOfSpeech": "名词",
    "meaning": "不足；缺乏"
  },
  "suboptimal": {
    "partOfSpeech": "形容词",
    "meaning": "非最优的"
  },
  "stand out": {
    "partOfSpeech": "短语",
    "meaning": "脱颖而出"
  }
},
};
