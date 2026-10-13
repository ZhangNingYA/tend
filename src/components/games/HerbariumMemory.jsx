import { useEffect } from 'react';

const specimens = [
  ['01', '一片薄荷叶', '你说它像夏天刚开门时的味道。'],
  ['02', '两张车票', '去同一个地方，路上就不算漫长。'],
  ['03', '一朵小雏菊', '被夹进书里以后，连沉默也变得温柔。'],
  ['04', '一张便签', '“记得吃饭。”是最朴素的情话。'],
];

export default function HerbariumMemory() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-herb-reveal]');
    if (!('IntersectionObserver' in window)) return nodes.forEach((node) => node.classList.add('is-visible'));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }), { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return <main className="herb-page"><style>{styles}</style><div className="herb-shell">
    <nav className="herb-nav" data-herb-reveal><a href="/games/">← 记忆索引</a><span>FIELD NOTES / 04</span></nav>
    <section className="herb-hero" data-herb-reveal><div><p className="herb-kicker">A SMALL HERBARIUM</p><p className="herb-date">2026.07.03 / 雨后</p><h1>把喜欢<br /><em>夹进书里</em></h1><p className="herb-lead">我们把那些不方便大声说出的心情，做成一页页小小的标本。它们安静，却一直在。</p></div><figure><img src="https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1400&q=86" alt="阳光照亮的绿色植物叶片" /><figcaption>雨后的叶子，替我们保留了光。</figcaption></figure></section>
    <section className="herb-quote" data-herb-reveal><p>“所有被认真对待的日常，<br />最后都会长出一点绿色。”</p><span>— note from a quiet afternoon</span></section>
    <section className="herb-specimens" data-herb-reveal><header><p className="herb-kicker">COLLECTED MOMENTS</p><h2>四件小东西，<br /><em>四种想念。</em></h2></header><div className="herb-grid">{specimens.map(([no,title,text],index)=><article key={no} className={`herb-card herb-card-${index+1}`}><span>{no}</span><div className="herb-card-line" /><div className="herb-symbol" aria-hidden="true">{['✳','⌁','✿','□'][index]}</div><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="herb-footer" data-herb-reveal><img src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=84" alt="桌面上的书本和一枝绿叶" /><div><p className="herb-kicker">NEXT PAGE</p><h2>下次见面，<br />带一本新书给你。</h2><p>我们可以在最后一页，留一张新的小纸条。</p></div></section>
  </div></main>;
}

const styles = `
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#eef2e9;color:#2e4034}.herb-page{min-height:100vh;padding:0 0 100px;background:#eef2e9;font-family:Inter,system-ui,sans-serif}.herb-shell{width:min(1060px,calc(100vw - 48px));margin:auto}.herb-page a{color:inherit;text-decoration:none}.herb-nav{display:flex;justify-content:space-between;align-items:center;min-height:70px;border-bottom:1px solid #cdd8c9;color:#6e7f70;font-size:.76rem}.herb-nav a{color:#4b7159}.herb-nav span{font-size:.66rem;letter-spacing:.14em}.herb-hero{display:grid;grid-template-columns:.9fr 1.1fr;gap:clamp(42px,8vw,112px);align-items:center;padding:clamp(64px,10vw,126px) 0 104px}.herb-kicker{margin:0;color:#4b7159;font-size:.7rem;font-weight:700;letter-spacing:.16em}.herb-date{margin:16px 0 0;color:#809181;font-size:.75rem}.herb-hero h1{margin:28px 0 0;color:#294531;font-family:Georgia,serif;font-size:clamp(4rem,8vw,7.2rem);font-weight:400;letter-spacing:-.08em;line-height:.9}.herb-hero h1 em,.herb-specimens h2 em{color:#bd765f;font-style:normal}.herb-lead{max-width:26rem;margin:30px 0 0;color:#617364;font-family:Georgia,serif;font-size:1.02rem;line-height:1.9}.herb-hero figure{margin:0}.herb-hero img{display:block;width:100%;aspect-ratio:1.12;object-fit:cover;filter:saturate(.72)}.herb-hero figcaption{margin-top:12px;color:#809181;font-family:Georgia,serif;font-size:.9rem}.herb-quote{padding:58px 0 64px;border-top:1px solid #cdd8c9;border-bottom:1px solid #cdd8c9}.herb-quote p{margin:0;color:#3d5944;font-family:Georgia,serif;font-size:clamp(1.7rem,3.7vw,3.2rem);font-weight:400;letter-spacing:-.04em;line-height:1.2}.herb-quote span{display:block;margin-top:20px;color:#809181;font-family:Georgia,serif;font-size:.9rem;font-style:italic}.herb-specimens{display:grid;grid-template-columns:.76fr 1.24fr;gap:clamp(42px,8vw,112px);padding:110px 0}.herb-specimens h2{margin:20px 0 0;color:#294531;font-family:Georgia,serif;font-size:clamp(2.3rem,4.7vw,4.4rem);font-weight:400;letter-spacing:-.06em;line-height:1}.herb-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.herb-card{min-height:220px;padding:18px;border:1px solid #cdd8c9;background:rgba(249,251,245,.66)}.herb-card-2{margin-top:44px}.herb-card-3{margin-top:-24px}.herb-card>span{color:#bd765f;font-size:.7rem}.herb-card-line{width:100%;height:1px;margin:14px 0 18px;background:#cdd8c9}.herb-symbol{color:#6b936f;font-family:Georgia,serif;font-size:2.3rem;line-height:1}.herb-card h3{margin:18px 0 0;color:#31523a;font-family:Georgia,serif;font-size:1.2rem;font-weight:400}.herb-card p{margin:8px 0 0;color:#718170;font-family:Georgia,serif;line-height:1.7}.herb-footer{display:grid;grid-template-columns:1.1fr .9fr;gap:clamp(32px,7vw,88px);align-items:center;padding:0 0 34px}.herb-footer img{display:block;width:100%;aspect-ratio:1.2;object-fit:cover;filter:saturate(.7)}.herb-footer h2{margin:20px 0 0;color:#294531;font-family:Georgia,serif;font-size:clamp(2.2rem,4vw,4rem);font-weight:400;letter-spacing:-.06em;line-height:1}.herb-footer>div>p:last-child{margin:22px 0 0;color:#718170;font-family:Georgia,serif;font-size:1rem;line-height:1.8}[data-herb-reveal]{opacity:0;transform:translateY(16px);transition:opacity .7s ease,transform .7s ease}[data-herb-reveal].is-visible{opacity:1;transform:none}@media(max-width:760px){.herb-shell{width:min(100% - 32px,620px)}.herb-hero{grid-template-columns:1fr;gap:48px;padding:58px 0 76px}.herb-hero h1{font-size:clamp(4rem,18vw,6.5rem)}.herb-specimens,.herb-footer{grid-template-columns:1fr;gap:46px;padding:76px 0}.herb-card-2,.herb-card-3{margin-top:0}.herb-grid{gap:12px}}@media(max-width:480px){.herb-grid{grid-template-columns:1fr}}@media(prefers-reduced-motion:reduce){[data-herb-reveal]{transition:none}}
`;
