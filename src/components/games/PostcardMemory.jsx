import { useRef, useState } from 'react';

const compactStyles = '.postcard-copy h1{font-size:clamp(2.1rem,3.2vw,2.85rem);letter-spacing:-.04em;line-height:1.08}.postcard-copy h1 em{font-style:normal}.postcard-stage{min-height:550px;padding:46px 0 38px}.postcard-object-wrap{min-height:430px}.postcard-current-note p{font-size:1rem}.postcard-current-note em{font-size:.78rem}@media(max-width:820px){.postcard-copy h1{font-size:clamp(2.25rem,10vw,3.2rem)}.postcard-stage{min-height:0;padding:42px 0 28px}.postcard-object-wrap{min-height:390px}}';

const tideNotes = [
  { time: '08:06', title: '海风先到了', text: '我们还没有见面，海风已经替我把想念吹到你身边。', mark: 'LOW TIDE' },
  { time: '12:30', title: '把午后折起来', text: '在礁石边坐了很久，听浪花一遍遍说同一句温柔的话。', mark: 'RISING' },
  { time: '19:18', title: '寄出一张明信片', text: '写下地址的时候，忽然觉得“以后”不是很远的词。', mark: 'HIGH TIDE' },
];

export default function PostcardMemory() {
  const [active, setActive] = useState(1);
  const [flipped, setFlipped] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const origin = useRef({ x: 0, y: 0, startX: 0, startY: 0 });
  const note = tideNotes[active];

  const startDrag = (event) => {
    if (event.target.closest('button')) return;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    origin.current = { x: position.x, y: position.y, startX: event.clientX, startY: event.clientY };
    setDragging(true);
  };
  const drag = (event) => {
    if (!dragging) return;
    const dx = event.clientX - origin.current.startX;
    const dy = event.clientY - origin.current.startY;
    setPosition({ x: Math.max(-140, Math.min(140, origin.current.x + dx)), y: Math.max(-90, Math.min(90, origin.current.y + dy)) });
  };

  return (
    <main className="postcard-page">
      <style>{styles + compactStyles}</style>
      <div className="postcard-bubbles" aria-hidden="true"><i /><i /><i /></div>
      <div className="postcard-workbench">
        <nav className="postcard-nav"><a href="/games/">← 记忆索引</a><span>FIELD NOTE / 01</span><b>● LIVE TIDE</b></nav>
        <section className="postcard-stage">
          <div className="postcard-copy">
            <p className="postcard-eyebrow">A POSTCARD FROM THE COAST</p>
            <p className="postcard-date">2026.06.08 / 青岛 · 晴</p>
            <h1>把今天<br /><em>寄给你</em></h1>
            <p className="postcard-intro">桌上有一张还没写完的明信片。把它拖近一点，翻到背面，再从潮汐里挑一句带走。</p>
            <div className="postcard-instructions"><b>01</b><span>拖动卡片</span><b>02</b><span>点击翻面</span></div>
          </div>
          <div className="postcard-object-wrap">
            <span className="postcard-tape" aria-hidden="true" />
            <div className={'postcard-object' + (dragging ? ' is-dragging' : '')} style={{ transform: 'translate3d(' + position.x + 'px,' + position.y + 'px,0) rotate(' + (position.x / 18) + 'deg)' }} onPointerDown={startDrag} onPointerMove={drag} onPointerUp={() => setDragging(false)} onPointerCancel={() => setDragging(false)}>
              <div className={'postcard-card' + (flipped ? ' is-flipped' : '')}>
                <div className="postcard-face postcard-front">
                  <div className="postcard-photo"><img src="/images/games/postcard-coast.jpg" alt="海边蓝色潮汐" /><span>COASTAL<br />MEMORY</span></div>
                  <div className="postcard-front-meta"><span>青岛</span><span>06 / 08 / 26</span></div>
                  <button type="button" onPointerDown={(event) => event.stopPropagation()} onClick={() => setFlipped(true)}>读背面 <b>↻</b></button>
                </div>
                <div className="postcard-face postcard-back">
                  <div className="postcard-stamp">♥<small>POST</small></div>
                  <div className="postcard-lines"><i /><i /><i /><i /></div>
                  <p>给正在读这封信的你：</p><p className="postcard-note">{note.text}</p><div className="postcard-sign">— always, N</div>
                  <button type="button" onPointerDown={(event) => event.stopPropagation()} onClick={() => setFlipped(false)}>看风景 <b>↺</b></button>
                </div>
              </div>
            </div>
            <span className="postcard-shadow" aria-hidden="true" /><span className="postcard-handwrite" aria-hidden="true">wish you were here <i>♡</i></span>
          </div>
        </section>
        <section className="postcard-tide-panel">
          <div className="postcard-tide-heading"><p>THE TIDE DIARY</p><span>点击潮汐节点，换一段话</span></div>
          <div className="postcard-tide-list" role="tablist" aria-label="潮汐记录">
            {tideNotes.map((item, index) => <button type="button" role="tab" aria-selected={active === index} className={active === index ? 'is-active' : ''} key={item.time} onClick={() => { setActive(index); setFlipped(false); }}><span>{item.time}</span><i /><strong>{item.title}<small>{item.mark}</small></strong></button>)}
          </div>
          <article className="postcard-current-note"><small>{String(active + 1).padStart(2, '0')} / 03</small><p>{note.title}</p><em>{note.text}</em></article>
        </section>
        <footer className="postcard-footer"><span>SCROLL SLOWLY / STAY AWHILE</span><a href="/games/">回到全部记录 ↗</a></footer>
      </div>
    </main>
  );
}

const styles = '*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#dcecf0;color:#213d42}.postcard-page{position:relative;min-height:100vh;overflow:hidden;background:linear-gradient(180deg,#dff1f4,#e9f2ec 52%,#f4e7d4);font-family:Inter,system-ui,sans-serif}.postcard-bubbles{position:absolute;inset:0;pointer-events:none;overflow:hidden}.postcard-bubbles:before{content:"";position:absolute;left:-10%;right:-10%;bottom:18%;height:36%;background:radial-gradient(ellipse at center,rgba(255,255,255,.55),transparent 67%);filter:blur(12px)}.postcard-bubbles i{position:absolute;width:22px;height:22px;border:1px solid rgba(82,148,159,.25);border-radius:50%;animation:floatBubble 9s ease-in-out infinite}.postcard-bubbles i:nth-child(1){top:15%;left:9%}.postcard-bubbles i:nth-child(2){top:29%;right:11%;width:38px;height:38px;animation-delay:-4s}.postcard-bubbles i:nth-child(3){bottom:17%;left:52%;width:13px;height:13px;animation-delay:-7s}.postcard-workbench{position:relative;z-index:1;width:min(1160px,calc(100vw - 56px));margin:auto}.postcard-nav{display:flex;align-items:center;justify-content:space-between;min-height:72px;border-bottom:1px solid rgba(46,91,96,.2);color:#5d7778;font-size:.7rem;letter-spacing:.08em}.postcard-nav a{color:#2b666b;text-decoration:none;letter-spacing:0}.postcard-nav b{color:#67979a;font-size:.61rem;font-weight:500}.postcard-nav b:first-letter{color:#ef9273}.postcard-stage{display:grid;grid-template-columns:minmax(250px,.72fr) minmax(440px,1.28fr);align-items:center;gap:clamp(30px,8vw,120px);min-height:620px;padding:64px 0 56px}.postcard-eyebrow,.postcard-tide-heading p{margin:0;color:#4a8a91;font-size:.67rem;font-weight:700;letter-spacing:.2em}.postcard-date{margin:18px 0 0;color:#73908e;font-size:.72rem}.postcard-copy h1{margin:28px 0 0;color:#28545a;font:400 clamp(3.8rem,7vw,6.2rem)/.89 Georgia,serif;letter-spacing:-.1em}.postcard-copy h1 em{color:#dc8e72;font-style:italic}.postcard-intro{max-width:300px;margin:28px 0 0;color:#597679;font:1rem/1.85 Georgia,serif}.postcard-instructions{display:grid;grid-template-columns:30px auto;gap:10px 12px;margin-top:36px;color:#6b8584;font-size:.7rem;letter-spacing:.06em}.postcard-instructions b{color:#e19173;font-weight:500}.postcard-object-wrap{position:relative;min-height:510px;display:grid;place-items:center}.postcard-object-wrap:before{content:"";position:absolute;width:min(94%,570px);height:360px;border-radius:50%;background:rgba(112,163,167,.24);filter:blur(32px);transform:translateY(32px)}.postcard-tape{position:absolute;top:25px;left:50%;z-index:2;width:115px;height:31px;background:rgba(242,212,158,.72);box-shadow:0 2px 8px rgba(105,100,69,.08);transform:translateX(-50%) rotate(-5deg)}.postcard-object{position:relative;z-index:3;width:min(100%,490px);aspect-ratio:1.45;cursor:grab;touch-action:none;transition:transform .45s cubic-bezier(.2,.8,.2,1)}.postcard-object.is-dragging{cursor:grabbing;transition:none}.postcard-card{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform .72s cubic-bezier(.2,.8,.2,1);filter:drop-shadow(18px 22px 14px rgba(37,79,82,.18))}.postcard-card.is-flipped{transform:rotateY(180deg)}.postcard-face{position:absolute;inset:0;backface-visibility:hidden;border:10px solid #fffdf6;background:#fffdf6;overflow:hidden}.postcard-front{padding:0 0 36px}.postcard-photo{position:relative;height:calc(100% - 39px);overflow:hidden}.postcard-photo:after{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.08),transparent 50%,rgba(26,66,69,.16))}.postcard-photo img{display:block;width:100%;height:100%;object-fit:cover;filter:saturate(.9) contrast(.96)}.postcard-photo span{position:absolute;left:18px;bottom:17px;z-index:1;color:#fff;font:1rem/.95 Georgia,serif;letter-spacing:.1em}.postcard-front-meta{position:absolute;bottom:10px;left:17px;right:17px;display:flex;justify-content:space-between;color:#6f8b8a;font-size:.58rem;letter-spacing:.13em}.postcard-front button,.postcard-back button{position:absolute;right:13px;bottom:8px;border:0;background:none;color:#c87864;font-size:.64rem;cursor:pointer}.postcard-front button b,.postcard-back button b{font-size:1rem;font-weight:400}.postcard-back{padding:25px 26px;transform:rotateY(180deg);background:#fffaf0}.postcard-stamp{position:absolute;top:20px;right:24px;width:46px;height:49px;display:grid;place-items:center;border:1px dashed #de987f;color:#d37f6d;font:1.35rem Georgia,serif;transform:rotate(5deg)}.postcard-stamp small{display:block;margin-top:-13px;font:.39rem Inter,sans-serif;letter-spacing:.13em}.postcard-lines{display:grid;gap:7px;width:46%;margin:7px 0 42px}.postcard-lines i{height:1px;background:#dfcdbc}.postcard-back>p{max-width:62%;margin:0;color:#6c6860;font:.88rem/1.65 Georgia,serif}.postcard-back .postcard-note{margin-top:11px;color:#31585b;font-size:1.08rem}.postcard-sign{margin-top:23px;color:#d47e6a;font:1.35rem Brush Script MT,cursive}.postcard-shadow{position:absolute;bottom:52px;width:64%;height:30px;border-radius:50%;background:rgba(49,105,106,.28);filter:blur(15px)}.postcard-handwrite{position:absolute;right:1%;bottom:13px;color:#b7786d;font:1.1rem Brush Script MT,cursive;transform:rotate(-6deg)}.postcard-handwrite i{font-size:1.4rem;font-style:normal}.postcard-tide-panel{display:grid;grid-template-columns:.66fr 1.15fr .8fr;gap:42px;align-items:center;padding:30px 0 45px;border-top:1px solid rgba(46,91,96,.22);border-bottom:1px solid rgba(46,91,96,.22)}.postcard-tide-heading span{display:block;margin-top:13px;color:#6c8582;font:.86rem Georgia,serif}.postcard-tide-list{display:grid;grid-template-columns:repeat(3,1fr);gap:4px}.postcard-tide-list button{position:relative;display:grid;grid-template-columns:auto 9px 1fr;gap:10px;align-items:start;padding:10px 4px 8px;border:0;background:none;color:#73908e;text-align:left;cursor:pointer}.postcard-tide-list button:after{content:"";position:absolute;top:22px;left:67px;right:-5px;border-top:1px dashed rgba(78,143,147,.35)}.postcard-tide-list button:last-child:after{display:none}.postcard-tide-list i{position:relative;z-index:1;width:9px;height:9px;margin-top:2px;border:2px solid #73a9a9;border-radius:50%;background:#e9f2ec;transition:.3s}.postcard-tide-list .is-active i{background:#e18a71;transform:scale(1.4);border-color:#e18a71}.postcard-tide-list strong{display:grid;gap:5px;color:#39656a;font:.86rem Georgia,serif;font-weight:400}.postcard-tide-list small{font:.52rem Inter,sans-serif;letter-spacing:.08em}.postcard-current-note{padding-left:22px;border-left:1px solid rgba(46,91,96,.18)}.postcard-current-note small{color:#c7806d;font-size:.6rem;letter-spacing:.14em}.postcard-current-note p{margin:8px 0 5px;color:#2d5c60;font:1.15rem Georgia,serif}.postcard-current-note em{display:block;color:#6c8582;font:.82rem/1.6 Georgia,serif;font-style:normal}.postcard-footer{display:flex;justify-content:space-between;padding:24px 0 34px;color:#76908d;font-size:.6rem;letter-spacing:.14em}.postcard-footer a{color:#3d777b;text-decoration:none;letter-spacing:0}@keyframes floatBubble{0%,100%{transform:translate(0,0) scale(1);opacity:.4}50%{transform:translate(28px,-18px) scale(1.35);opacity:.9}}@media(max-width:820px){.postcard-workbench{width:min(100% - 32px,620px)}.postcard-nav b{display:none}.postcard-stage{grid-template-columns:1fr;gap:28px;padding:56px 0 44px}.postcard-copy h1{font-size:clamp(4rem,18vw,6.3rem)}.postcard-intro{max-width:420px}.postcard-object-wrap{min-height:430px}.postcard-tide-panel{grid-template-columns:1fr;gap:28px}.postcard-current-note{padding:19px 0 0;border-top:1px solid rgba(46,91,96,.18);border-left:0}}@media(max-width:500px){.postcard-object{width:calc(100% - 8px)}.postcard-back{padding:17px}.postcard-back .postcard-note{font-size:.95rem}.postcard-handwrite{right:0;font-size:.9rem}.postcard-tide-list button{grid-template-columns:1fr 9px;gap:6px}.postcard-tide-list button>span:first-child{grid-column:1/-1}.postcard-tide-list button:after{top:41px;left:23px}}@media(prefers-reduced-motion:reduce){.postcard-bubbles i,.postcard-card{animation:none;transition:none}}';

