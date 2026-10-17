import { useEffect, useState } from 'react';
import '../../styles/travel-memory.css';

const photos = [
  { src: '/images/微信图片_20261017162303_182_40.jpg', alt: '泰山同行自拍', caption: '出发以前，先把今天的我们留住。' },
  { src: '/images/微信图片_20261017162306_183_40.jpg', alt: '泰山天街人群', caption: '人很多，但我们还是一起走到了这里。' },
  { src: '/images/微信图片_20261017162308_184_40.jpg', alt: '泰山山顶的背影', caption: '站在更高的地方，回头看我们走过的路。' },
  { src: '/images/微信图片_20261017162329_185_40.jpg', alt: '泰山远景和云海', caption: '山风把这一刻吹进了以后。' },
];

const trips = {
  gaoyou: {
    label: 'VOL. 01 / HIGH POST', title: '晚一点也没关系', subtitle: '高邮之旅',
    date: '2026.07.18 — 07.20', place: '江苏高邮 · 淮安',
    intro: '每次见面都盼了很久。到了高邮以后，我们还是把能出门的时间，悄悄换成了多抱一会儿。',
    closing: '这次旅行没有去很多地方，但我们把每一次牵手、每一顿饭和最后的不舍，都带回了家。',
    accent: '#b86b4e', soft: '#f3dfd3', deep: '#496a68', symbol: '✳', image: null,
    scene: 'canal',
    sceneTitle: '雨后的高邮，灯一盏一盏亮起来。',
    sceneText: '我们没有追着景点跑。雨、乌龙茶、拌饭和站台的广播，已经足够把这三天变成一页很柔软的记忆。',
    stops: [
      ['19:48', '高邮站', '终于又见面啦', '我先到高邮站，去接我的女朋友。放下东西以后，先把好不容易见面的这一晚抱紧。', '车站的灯亮起来，故事也重新亮起来。', '✦'],
      ['20:21', '吾悦广场', '拌饭、乌龙茶，还有一点坏', '猪猪把两个拌饭都尝了一遍，然后把不好吃的那个留给我。坏猪猪。', '甜度：乌龙茶刚刚好。', '◌'],
      ['07.19', '世贸金街', '雨天也要看一场电影', '下雨的下午，我们终于舍得出门，看了《功夫女足》。片尾灯亮起来时，旁边的小孩子还在吵。', '雨把城市放慢，我们也不急着走。', '▣'],
      ['16:00', '孟城驿', '牵手慢慢逛', '买一点巧克力，挑掉面里的香菜，再绕着景点牵手走一圈。没有什么大事，却甜得很具体。', '小事被认真记住，就会变成大大的想念。', '♡'],
      ['21:00', '淮安站', '舍不得回去的黏人猪', '都已经晚上九点多了，猪猪还跟着我去了淮安站。分别以前，她在站口偷偷亲了我一下。', '晚一点回去也没关系，再多一分钟。', '⌁'],
    ],
  },
  xuzhou: {
    label: 'VOL. 02 / LAKE WIND', title: '云龙湖边的晚风', subtitle: '徐州之旅',
    date: '2026.08.22 — 08.24', place: '江苏徐州',
    intro: '第一次住民宿，第一次一起爬山。我们骑着电动车穿过热得发亮的街道，也在云龙湖边吹了一晚上的风。',
    closing: '有些旅行是为了看风景，有些旅行是为了确认：和你一起走走停停，本身就是风景。',
    accent: '#6989a2', soft: '#dfeaf0', deep: '#50666b', symbol: '≈', image: null,
    scene: 'lake',
    sceneTitle: '云龙湖的风，把热意吹成了晚安。',
    sceneText: '我们骑过很热的街道，也在湖边听了很久的歌。那些没有被安排的十分钟，最后都成了最想重播的片段。',
    stops: [
      ['08.22', '徐州站', '带着椰汁出发', '零食、雨伞，还有一大瓶一路背过去的椰汁。见面以后，猪猪一路挽着我坐地铁。', '东西带得有点多，喜欢也带得有点多。', '⌂'],
      ['13:00', '第一次住民宿', '两间小房间，像一个家', '房间没有想象中完美，但我们一起铺床、整理压缩毛巾和杯子。重要的从来不是房间，是一起住进去的人。', '把行李放下，也把一天放慢。', '□'],
      ['19:30', '云龙湖', '晚风把我们吹近', '听歌、散步、吹湖风。人很多，但我们还是偷偷么么了。湖边的灯一盏一盏亮起来。', '湖水有回声，心动也有。', '≈'],
      ['08.23', '山顶', '这次真的走上去了', '猪猪一路喊着休息，最后却还是和我一起走到了山顶。后来骑着电动车去买茶颜悦色，再一起吃烧烤。', '原来“再走一小段”真的可以走很远。', '△'],
      ['08.24', '汉文化景区', '差点赶不上的火车', '逛了很大的景区，收拾好行李，再急急忙忙去车站。身份证差点没准备好，笨猪猪终于还是赶上了车。', '每一次匆忙分别，都在为下一次见面攒力气。', '↗'],
    ],
  },
  taian: {
    label: 'VOL. 03 / THE SUMMIT', title: '一起到达日出', subtitle: '泰安之旅',
    date: '2026.10.03 — 10.06', place: '山东泰安 · 泰山',
    intro: '从红门到玉皇顶，近十二个小时。我们带着太多零食和衣服上山，却只想把这一段路走得更慢一点。',
    closing: '南天门曾经看起来那么远，可我们还是牵着手，一步一步走到了。以后也这样，一起抵达。',
    accent: '#b87855', soft: '#eadfcd', deep: '#55756e', symbol: '☼', image: photos,
    scene: 'mountain',
    sceneTitle: '山顶的风，把我们吹到了更远的以后。',
    sceneText: '这一次不只是去一个地方。我们把准备、坚持、照顾和分别，都一起走完了。',
    stops: [
      ['10.03', '泰安民宿', '为明天把一切准备好', '烤鱼、铺床、整理零食和登山物资。猪猪还准备了护膝、袜子、小帽子，像是在认真照顾一场远行。', '一间温馨的房间，先替我们收好明天。', '⌂'],
      ['07:45', '红门', '从第一块石阶开始', '吃过早餐，互相剥鸡蛋、涂防晒，租好登山杖。人很多，但我们没有急着向前冲。', '山脚的灯还没完全熄灭。', '↟'],
      ['15:30', '南天门', '原来我们已经走这么远', '山越来越高，风景越来越开阔。猪猪走在前面，带着我经过一段又一段台阶。', '遥不可及的地方，也可以被两个人走近。', '⌁'],
      ['19:15', '玉皇顶', '太阳替我们抵达', '牵着手站在泰山最高点。满身是汗，腿也很累，可之前所有的心理建设都在这一刻变成了“我们真的做到了”。', '下次，还一起看日出。', '☼'],
      ['10.06', '机场', '把舍不得放进下一次', '卧铺上短暂地一起休息，机场里抱了很久。每次分别都不够，但这次我们多带走了一整座山的回忆。', '再见不是句号，是下一次出发的日期。', '♡'],
    ],
  },
};

function PhotoSpread({ photos: spread }) {
  if (!spread) return null;
  return <section className="travel-photo-spread" aria-label="泰山旅行照片">
    <div className="travel-photo-lead"><img src={spread[2].src} alt={spread[2].alt} /><span>THE SUMMIT / 10.04</span></div>
    <div className="travel-photo-stack"><figure><img src={spread[0].src} alt={spread[0].alt} /><figcaption>{spread[0].caption}</figcaption></figure><figure><img src={spread[1].src} alt={spread[1].alt} /><figcaption>{spread[1].caption}</figcaption></figure><figure><img src={spread[3].src} alt={spread[3].alt} /><figcaption>{spread[3].caption}</figcaption></figure></div>
  </section>;
}

function ScenePanel({ trip }) {
  return <section className={'travel-scene travel-scene-' + trip.scene}>
    <div className="scene-copy"><p>FIELD NOTE / ATMOSPHERE</p><h2>{trip.sceneTitle}</h2><span>{trip.sceneText}</span></div>
    <div className="scene-art" aria-hidden="true">
      <span className="scene-orbit scene-orbit-a" /><span className="scene-orbit scene-orbit-b" />
      <span className="scene-sun" /><span className="scene-hill scene-hill-back" /><span className="scene-hill scene-hill-front" />
      <span className="scene-water" /><span className="scene-light scene-light-a" /><span className="scene-light scene-light-b" /><span className="scene-light scene-light-c" />
      <span className="scene-figure" /><span className="scene-caption">{trip.place} / KEEP WALKING</span>
    </div>
  </section>;
}

export default function TravelMemory({ variant = 'gaoyou' }) {
  const trip = trips[variant] || trips.gaoyou;
  const [active, setActive] = useState(0);
  const [kept, setKept] = useState(false);
  useEffect(() => {
    const root = document.querySelector('.travel-memory-page');
    if (!root) return undefined;
    const targets = root.querySelectorAll('.travel-scene, .travel-stop, .travel-photo-spread, .travel-chapter-head, .travel-keep, .travel-endnote');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-in-view')), { threshold: 0.12 });
    targets.forEach((target) => observer.observe(target));
    const onScroll = () => root.style.setProperty('--travel-scroll', String(window.scrollY * -0.04) + 'px');
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, [variant]);
  useEffect(() => { try { const saved = JSON.parse(localStorage.getItem('tend-memory-' + variant) || 'null'); if (Number.isInteger(saved?.active)) setActive(saved.active); setKept(Boolean(saved?.kept)); } catch {} }, [variant]);
  useEffect(() => { try { localStorage.setItem('tend-memory-' + variant, JSON.stringify({ active, kept })); } catch {} }, [variant, active, kept]);
  const select = (index) => { setActive(index); document.getElementById('travel-stop-' + variant + '-' + index)?.scrollIntoView({ behavior: 'smooth', block: 'center' }); };
  return <main className="travel-memory-page" style={{ '--travel-accent': trip.accent, '--travel-soft': trip.soft, '--travel-deep': trip.deep }}>
    <div className="travel-shell">
      <nav className="travel-nav"><a href="/games/">← 记忆索引</a><span>{trip.label}</span><b>{String(active + 1).padStart(2, '0')} / 05</b></nav>
      <header className="travel-hero"><div><p className="travel-kicker"><i /> {trip.subtitle} · MEMORY MAP</p><h1>{trip.title}</h1><p className="travel-date">{trip.date} <span>·</span> {trip.place}</p><p className="travel-intro">{trip.intro}</p><div className="travel-stamp"><span>{trip.symbol}</span><small>KEEP THIS DAY</small></div></div><div className="travel-route"><div className="route-line" /><div className="route-dots">{trip.stops.map((stop, index) => <button type="button" className={index === active ? 'is-active' : ''} key={stop[1]} onClick={() => select(index)}><span>{index + 1}</span>{stop[1]}</button>)}</div></div></header>
      <div className="travel-scroll-note"><span className="scroll-line" /><span>向下走，回到那几天</span><b>↓</b></div>
      <PhotoSpread photos={trip.image} />
      <ScenePanel trip={trip} />
      <section className="travel-chapter-head"><span>从这里开始</span><h2>把一段路，走成<br /><em>我们共同的记忆。</em></h2><p>点开每一站，回到那一天的光线、味道和语气。</p></section>
      <div className="travel-stops">{trip.stops.map((stop, index) => <article id={'travel-stop-' + variant + '-' + index} className={'travel-stop ' + (index === active ? 'is-active' : '')} key={stop[1]} onMouseEnter={() => setActive(index)}><div className="travel-stop-art"><span>{String(index + 1).padStart(2, '0')}</span><b>{stop[5]}</b></div><div className="travel-stop-copy"><div className="travel-stop-meta"><span>{stop[0]}</span><i /> <span>{stop[1]}</span></div><h3>{stop[2]}</h3><p>{stop[3]}</p><blockquote>{stop[4]}</blockquote></div><button type="button" onClick={() => select(index)}>{index === active ? '正在这里' : '回到这一站'} <b>↗</b></button></article>)}</div>
      <section className={'travel-keep ' + (kept ? 'is-kept' : '')}><div><p>ONE LITTLE KEEPSAKE</p><h2>{kept ? '这一趟，已经被好好收好了。' : '把这趟旅行盖进纪念册。'}</h2><span>{kept ? '下次回来，它还会停在这里。' : '点一下，留下一个只属于这次见面的印记。'}</span></div><button type="button" onClick={() => setKept(!kept)} aria-pressed={kept}><span>{kept ? '✓' : '○'}</span>{kept ? '已盖章' : '盖上这一页'}</button></section>
      <footer className="travel-footer"><p>{trip.closing}</p><span>{trip.label} / HANDLED WITH CARE</span><a href="/games/">回到全部记录 ↗</a></footer>
    </div>
      <div className="travel-endnote"><span>AFTER THE LAST STATION</span><p>旅行结束以后，照片会留在相册里；但真正会反复想起的，往往是那些没有被专门记录的小事。</p><i>♡</i></div>
  </main>;
}
