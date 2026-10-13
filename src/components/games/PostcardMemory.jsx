import { useEffect } from 'react';

const images = {
  hero: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=86',
  detail: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&w=1200&q=84',
};

const notes = [
  ['08:06', '海风先到了', '我们还没有见面，海风已经替我把想念吹到你身边。'],
  ['12:30', '把午后折起来', '在礁石边坐了很久，听浪花一遍遍说同一句温柔的话。'],
  ['19:18', '寄出一张明信片', '写下地址的时候，忽然觉得“以后”不是很远的词。'],
];

export default function PostcardMemory() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-postcard-reveal]');
    if (!('IntersectionObserver' in window)) return nodes.forEach((node) => node.classList.add('is-visible'));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }), { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="postcard-page">
      <style>{styles}</style>
      <div className="postcard-shell">
        <nav className="postcard-nav" data-postcard-reveal><a href="/games/">← 日记目录</a><span>COASTAL NOTE · 03</span></nav>
        <section className="postcard-hero" data-postcard-reveal>
          <div className="postcard-copy"><p className="postcard-kicker">A DAY BY THE SEA</p><p className="postcard-date">2026.06.08 · 青岛</p><h1>把夏天<br /><em>寄给你。</em></h1><p className="postcard-lead">海边的好天气不需要理由。我们只需要一张长椅、一封没有写完的信，和一整个下午的风。</p><div className="postcard-stamp">TO · MY FAVORITE PERSON<br /><strong>06 / 08</strong></div></div>
          <figure className="postcard-hero-image"><img src={images.hero} alt="清晨的海边和长长的海岸线" /><figcaption>海水把天空调成了很浅的蓝。</figcaption></figure>
        </section>
        <section className="postcard-letter" data-postcard-reveal><div className="postcard-letter-label">POSTCARD / 001</div><p>亲爱的：</p><p>今天的海很安静，像是特意留出了一点空白，让我把关于你的话慢慢写完。</p><p>等你收到这张明信片的时候，夏天大概已经走过了一小段。没关系，我们还有很多个可以一起吹风的下午。</p><p className="postcard-sign">一直想和你分享风景的人</p></section>
        <section className="postcard-notes" data-postcard-reveal><header><p>THE DAY IN THREE LINES</p><h2>一日三封小信</h2></header><div className="postcard-note-list">{notes.map(([time, title, text], index) => <article key={time}><span className="postcard-note-no">0{index + 1}</span><time>{time}</time><h3>{title}</h3><p>{text}</p></article>)}</div></section>
        <section className="postcard-photo" data-postcard-reveal><img src={images.detail} alt="海边山坡上的小路" /><div><p className="postcard-kicker">KEEP THIS MOMENT</p><h2>下次见面，<br />我们一起看潮汐。</h2></div></section>
      </div>
    </main>
  );
}

const styles = `
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#f7f5ef;color:#193d4a}.postcard-page{min-height:100vh;padding:0 0 96px;background:#f7f5ef;font-family:Inter,system-ui,sans-serif}.postcard-shell{width:min(1080px,calc(100vw - 48px));margin:auto}.postcard-page a{color:inherit;text-decoration:none}.postcard-nav{display:flex;justify-content:space-between;align-items:center;min-height:70px;border-bottom:1px solid #d7e1df;color:#6d8588;font-size:.76rem}.postcard-nav a{color:#1e6977}.postcard-nav span{font-size:.68rem;letter-spacing:.12em}.postcard-hero{display:grid;grid-template-columns:minmax(0,.8fr) minmax(340px,1.2fr);gap:clamp(36px,8vw,110px);align-items:center;padding:clamp(66px,10vw,128px) 0 112px}.postcard-kicker,.postcard-notes header p{margin:0;color:#258092;font-size:.7rem;font-weight:700;letter-spacing:.16em}.postcard-date{margin:16px 0 0;color:#82979a;font-size:.76rem}.postcard-copy h1{margin:28px 0 0;font-family:Georgia,serif;font-size:clamp(4rem,8vw,7.4rem);font-weight:400;letter-spacing:-.08em;line-height:.9}.postcard-copy h1 em{color:#d48e7e;font-style:normal}.postcard-lead{max-width:26rem;margin:28px 0 0;color:#5c7478;font-family:Georgia,serif;font-size:1.02rem;line-height:1.9}.postcard-stamp{width:150px;margin-top:36px;padding:12px;border:1px solid #c7d8d7;color:#719095;font-size:.62rem;line-height:1.5;letter-spacing:.08em}.postcard-stamp strong{display:block;margin-top:5px;color:#d48e7e;font-family:Georgia,serif;font-size:1.4rem;font-weight:400}.postcard-hero-image{margin:0}.postcard-hero-image img{display:block;width:100%;aspect-ratio:1.15;object-fit:cover;filter:saturate(.82)}.postcard-hero-image figcaption{margin-top:12px;color:#748a8e;font-family:Georgia,serif;font-size:.9rem}.postcard-letter{max-width:620px;margin:0 auto;padding:38px 0 76px;border-top:1px solid #d7e1df;border-bottom:1px solid #d7e1df;color:#49646a;font-family:Georgia,serif;font-size:1.16rem;line-height:2}.postcard-letter-label{margin-bottom:34px;color:#258092;font-family:Inter,system-ui,sans-serif;font-size:.68rem;letter-spacing:.14em}.postcard-letter p{margin:0 0 18px}.postcard-sign{color:#d48e7e;font-style:italic}.postcard-notes{display:grid;grid-template-columns:.8fr 1.2fr;gap:64px;padding:100px 0}.postcard-notes header h2{margin:18px 0 0;font-family:Georgia,serif;font-size:clamp(2.1rem,4vw,3.8rem);font-weight:400;line-height:1.05}.postcard-note-list{border-top:1px solid #d7e1df}.postcard-note-list article{display:grid;grid-template-columns:34px 64px minmax(0,1fr);gap:12px;padding:22px 0;border-bottom:1px solid #d7e1df}.postcard-note-no{color:#d48e7e;font-size:.72rem}.postcard-note-list time{color:#7d9396;font-size:.75rem}.postcard-note-list h3{grid-column:3;margin:0;color:#234d57;font-family:Georgia,serif;font-size:1.2rem;font-weight:400}.postcard-note-list p{grid-column:3;margin:5px 0 0;color:#6b8084;font-family:Georgia,serif;line-height:1.7}.postcard-photo{display:grid;grid-template-columns:1.1fr .9fr;gap:clamp(26px,6vw,78px);align-items:center;padding:0 0 30px}.postcard-photo img{width:100%;aspect-ratio:1.15;object-fit:cover;filter:saturate(.8)}.postcard-photo h2{margin:18px 0 0;color:#234d57;font-family:Georgia,serif;font-size:clamp(2rem,4vw,3.8rem);font-weight:400;line-height:1.05}.postcard-photo h2::first-line{color:#d48e7e}[data-postcard-reveal]{opacity:0;transform:translateY(16px);transition:opacity .7s ease,transform .7s ease}[data-postcard-reveal].is-visible{opacity:1;transform:none}@media(max-width:720px){.postcard-shell{width:min(100% - 32px,620px)}.postcard-hero{grid-template-columns:1fr;gap:48px;padding:58px 0 76px}.postcard-copy h1{font-size:clamp(4rem,18vw,6.5rem)}.postcard-notes,.postcard-photo{grid-template-columns:1fr;gap:40px;padding:72px 0}.postcard-note-list article{grid-template-columns:30px 54px minmax(0,1fr)}.postcard-letter{font-size:1.05rem}}@media(prefers-reduced-motion:reduce){[data-postcard-reveal]{transition:none}}
`;
