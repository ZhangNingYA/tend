import { useEffect } from 'react';

const photos = [
  {
    src: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1600&q=84',
    alt: '春日里盛开的粉色花朵',
    label: '一束花',
    caption: '花没有说话，却把想念先送到了。',
  },
  {
    src: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=84',
    alt: '午后两个人并肩散步的剪影',
    label: '并肩走',
    caption: '风吹过树梢，我们把脚步放得很慢。',
  },
  {
    src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=84',
    alt: '蓝调时刻的安静天空和山影',
    label: '晚风里',
    caption: '天色暗下来，喜欢却变得更清楚。',
  },
];

const timeline = [
  { time: '09:10', title: '把花藏在身后', text: '不是为了制造惊喜，只是想让你看见我的时候，手里刚好有一小片春天。' },
  { time: '16:20', title: '走过一段树影', text: '聊起最近读到的句子，也聊起晚饭吃什么。平常的事，因为和你一起，就有了轻轻发亮的边缘。' },
  { time: '22:40', title: '把晚安写进明天', text: '我们没有急着说再见。把一句晚安说得长一点，好像明天就会更近一点。' },
];

export default function SpringLetterMemory() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('[data-spring-reveal]'));
    if (!nodes.length) return undefined;

    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }),
      { threshold: 0.14, rootMargin: '0px 0px -40px 0px' },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="spring-page">
      <style>{styles}</style>

      <div className="spring-shell">
        <nav className="spring-nav" data-spring-reveal>
          <a href="/games/" className="spring-back">← <span>回到记录</span></a>
          <span className="spring-nav-date">2026 · 05 · 20</span>
        </nav>

        <section className="spring-hero" data-spring-reveal>
          <div className="spring-hero-copy">
            <p className="spring-kicker">A LETTER IN SPRING</p>
            <p className="spring-date">2026 / 05 / 20</p>
            <h1>春风替我<br /><em>说喜欢</em></h1>
            <p className="spring-lead">有些话不适合郑重其事地说出口。那就交给一阵风、一束花，和我们一起走过的这一小段路。</p>
            <p className="spring-signature">写给正在靠近的你</p>
          </div>

          <figure className="spring-hero-image">
            <img src={photos[0].src} alt={photos[0].alt} />
            <figcaption><span>01</span>{photos[0].label}</figcaption>
          </figure>
        </section>

        <section className="spring-gallery" aria-label="春日片段" data-spring-reveal>
          {photos.slice(1).map((photo, index) => (
            <figure className="spring-photo-card" key={photo.src}>
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <figcaption><span>{String(index + 2).padStart(2, '0')}</span><strong>{photo.label}</strong><small>{photo.caption}</small></figcaption>
            </figure>
          ))}
        </section>

        <section className="spring-story" data-spring-reveal>
          <div className="spring-section-heading">
            <p>THE LITTLE THINGS</p>
            <h2>把普通的一天，<br /><em>过成值得记住的一天。</em></h2>
          </div>

          <ol className="spring-timeline">
            {timeline.map((item, index) => (
              <li className="spring-timeline-item" key={item.time}>
                <div className="spring-time"><span>{String(index + 1).padStart(2, '0')}</span>{item.time}</div>
                <div className="spring-event"><h3>{item.title}</h3><p>{item.text}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className="spring-note" data-spring-reveal>
          <p className="spring-note-mark">♡</p>
          <p className="spring-note-label">A SMALL NOTE</p>
          <h2>下一个晴天，<br />还想和你慢慢走。</h2>
          <p className="spring-note-copy">如果春天会留下证据，大概就是衣角沾上的花香，和你说完晚安以后，心里还亮着的那盏小灯。</p>
        </section>
      </div>
    </main>
  );
}

const styles = `
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; background: #f7faf7; color: #253530; overflow-x: hidden; }
  .spring-page { min-height: 100vh; padding: 0 0 96px; background: #f7faf7; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
  .spring-shell { width: min(1120px, calc(100vw - 48px)); margin: 0 auto; }
  .spring-page a { color: inherit; text-decoration: none; }
  .spring-page a:focus-visible { outline: 2px solid #327565; outline-offset: 5px; }
  .spring-nav { display: flex; align-items: center; justify-content: space-between; min-height: 72px; border-bottom: 1px solid #dce7e1; color: #64756e; font-size: 0.78rem; }
  .spring-back { display: inline-flex; align-items: center; gap: 8px; }
  .spring-back span { color: #2d6a5e; font-weight: 650; }
  .spring-nav-date { color: #82918b; font-variant-numeric: tabular-nums; }
  .spring-hero { display: grid; grid-template-columns: minmax(0, 0.88fr) minmax(320px, 1.12fr); gap: clamp(42px, 8vw, 120px); align-items: center; padding: clamp(64px, 10vw, 132px) 0 96px; }
  .spring-kicker, .spring-note-label, .spring-section-heading > p { margin: 0; color: #327565; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.16em; }
  .spring-date { margin: 18px 0 0; color: #82918b; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
  .spring-hero h1 { margin: 26px 0 0; color: #1f322d; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(3.8rem, 8vw, 7.7rem); font-weight: 400; letter-spacing: -0.06em; line-height: 0.96; }
  .spring-hero h1 em, .spring-section-heading h2 em { color: #c87878; font-style: normal; }
  .spring-lead { max-width: 27rem; margin: 30px 0 0; color: #61736b; font-family: Georgia, 'Times New Roman', serif; font-size: 1.04rem; line-height: 1.95; }
  .spring-signature { margin: 34px 0 0; color: #c87878; font-family: Georgia, 'Times New Roman', serif; font-size: 1rem; font-style: italic; }
  .spring-hero-image { margin: 0; }
  .spring-hero-image img { display: block; width: 100%; aspect-ratio: 1.12; object-fit: cover; border-radius: 2px; filter: saturate(0.92); }
  .spring-hero-image figcaption, .spring-photo-card figcaption { display: grid; grid-template-columns: 28px auto; gap: 4px 10px; padding-top: 13px; color: #63766e; font-size: 0.8rem; }
  .spring-hero-image figcaption span, .spring-photo-card figcaption span { grid-row: 1 / span 2; color: #c87878; font-size: 0.7rem; font-variant-numeric: tabular-nums; }
  .spring-gallery { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(20px, 4vw, 48px); padding: 0 10% 112px; }
  .spring-photo-card { margin: 0; }
  .spring-photo-card:nth-child(2) { margin-top: 88px; }
  .spring-photo-card img { display: block; width: 100%; aspect-ratio: 0.95; object-fit: cover; border-radius: 2px; filter: saturate(0.9); }
  .spring-photo-card figcaption strong { color: #263b34; font-family: Georgia, 'Times New Roman', serif; font-size: 1rem; font-weight: 500; }
  .spring-photo-card figcaption small { grid-column: 2; color: #819089; font-family: Georgia, 'Times New Roman', serif; font-size: 0.9rem; line-height: 1.6; }
  .spring-story { display: grid; grid-template-columns: minmax(240px, 0.8fr) minmax(0, 1.2fr); gap: clamp(40px, 10vw, 140px); padding: 88px 0 106px; border-top: 1px solid #dce7e1; border-bottom: 1px solid #dce7e1; }
  .spring-section-heading h2 { margin: 22px 0 0; color: #1f322d; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(2rem, 4vw, 3.9rem); font-weight: 400; letter-spacing: -0.04em; line-height: 1.08; }
  .spring-timeline { margin: 0; padding: 0; list-style: none; }
  .spring-timeline-item { display: grid; grid-template-columns: 78px minmax(0, 1fr); gap: 22px; padding: 0 0 28px; }
  .spring-timeline-item + .spring-timeline-item { padding-top: 28px; border-top: 1px solid #dce7e1; }
  .spring-time { color: #327565; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
  .spring-time span { display: block; margin-bottom: 8px; color: #c87878; font-size: 0.7rem; }
  .spring-event h3 { margin: 0; color: #263b34; font-family: Georgia, 'Times New Roman', serif; font-size: 1.42rem; font-weight: 500; line-height: 1.3; }
  .spring-event p { margin: 10px 0 0; color: #61736b; font-family: Georgia, 'Times New Roman', serif; font-size: 1rem; line-height: 1.9; }
  .spring-note { max-width: 720px; margin: 0 auto; padding: 112px 0 24px; text-align: center; }
  .spring-note-mark { margin: 0 0 18px; color: #c87878; font-family: Georgia, 'Times New Roman', serif; font-size: 2rem; }
  .spring-note h2 { margin: 22px 0 0; color: #1f322d; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(2.3rem, 5vw, 4.5rem); font-weight: 400; letter-spacing: -0.05em; line-height: 1.05; }
  .spring-note-copy { max-width: 34rem; margin: 24px auto 0; color: #71827a; font-family: Georgia, 'Times New Roman', serif; font-size: 1rem; line-height: 1.9; }
  [data-spring-reveal] { opacity: 0; transform: translateY(16px); transition: opacity 600ms ease, transform 600ms ease; }
  [data-spring-reveal].is-visible { opacity: 1; transform: translateY(0); }
  @media (max-width: 760px) {
    .spring-shell { width: min(100% - 32px, 620px); }
    .spring-hero { grid-template-columns: minmax(0, 1fr); gap: 48px; padding: 58px 0 68px; }
    .spring-hero h1 { font-size: clamp(3.8rem, 18vw, 6.4rem); }
    .spring-hero-image { width: min(100%, 520px); margin-left: auto; }
    .spring-gallery { grid-template-columns: minmax(0, 1fr); padding: 0 0 72px; }
    .spring-photo-card:nth-child(2) { margin-top: 18px; }
    .spring-story { grid-template-columns: minmax(0, 1fr); gap: 48px; padding: 68px 0 72px; }
    .spring-note { padding-top: 76px; }
  }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    [data-spring-reveal] { transition: none; }
  }
`;
