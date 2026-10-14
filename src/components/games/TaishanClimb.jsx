import { useEffect, useState } from 'react';

const memories = [
  {
    no: '01', time: '04:30', place: '红门', english: 'THE FIRST LIGHT', altitude: '150 m',
    title: '天还没有亮，我们先出发了。',
    text: '红门前的路灯还亮着，四周安静得只听见脚步声。那时我们还不知道，今天会一起走过这么长的台阶。',
    mark: '山脚的风还带着夜色', tone: '#b46d5d',
  },
  {
    no: '02', time: '06:10', place: '中天门', english: 'LOOKING BACK', altitude: '847 m',
    title: '回头的时候，城市已经醒了。',
    text: '我们在中天门停下来喝水，也回头看了一眼来时的路。远处的城市一点点亮起来，像有人替这趟旅程开了灯。',
    mark: '把一口气和一座城都收进眼里', tone: '#708e82',
  },
  {
    no: '03', time: '08:20', place: '南天门', english: 'ABOVE THE CLOUDS', altitude: '1,460 m',
    title: '云从脚边经过，我们也快到山顶了。',
    text: '南天门的风比想象中更大。你说再走一会儿就好，于是那些原本漫长的台阶，忽然也有了尽头。',
    mark: '风把疲惫吹成了很轻的事', tone: '#687f9a',
  },
  {
    no: '04', time: '09:00', place: '玉皇顶', english: 'WE MADE IT', altitude: '1,545 m',
    title: '到了最高处，太阳刚好升起来。',
    text: '我们终于站在玉皇顶。没有很隆重的仪式，只有一起看完的那片光，和一句现在想起来仍然很开心的“我们做到了”。',
    mark: '这一天，值得被好好记住', tone: '#c18b5c',
  },
];

const storageKey = 'tend-memory-taishan';

export default function TaishanClimb() {
  const [selected, setSelected] = useState(3);
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);
  const memory = memories[selected];

  useEffect(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem(storageKey) || 'null');
      if (Number.isInteger(stored?.selected)) setSelected(Math.max(0, Math.min(memories.length - 1, stored.selected)));
      if (typeof stored?.note === 'string') setNote(stored.note);
      setSaved(Boolean(stored?.saved));
    } catch {
      // The memory page remains readable when storage is unavailable.
    }
  }, []);

  const selectMemory = (index) => {
    setSelected(index);
    setSaved(false);
  };

  const saveMemory = () => {
    setSaved(true);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({
        type: 'taishan-memory', selected, note: note.trim(), title: memory.title,
        saved: true, updatedAt: new Date().toISOString(),
      }));
    } catch {
      // The visual keepsake still works without local storage.
    }
  };

  return (
    <main className="taishan-page" style={{ '--memory-tone': memory.tone }}>
      <style>{styles}</style>
      <div className="taishan-atmosphere" aria-hidden="true" />
      <div className="taishan-shell">
        <nav className="taishan-nav">
          <a href="/games/">← 记忆索引</a><span>TRAVEL MEMORY / 02</span><b>2026.08.08</b>
        </nav>

        <header className="taishan-hero">
          <div className="taishan-hero-copy">
            <p className="taishan-kicker"><i /> A DAY WE CLIMBED TOGETHER</p>
            <p className="taishan-date">2026 年 8 月 8 日 · 山东泰安</p>
            <h1>那天，我们把清晨<br /><em>走到了山顶。</em></h1>
            <p className="taishan-lead">这不是一份路线攻略。是我们一起走过的 7.8 公里，和太阳升起以前，留在台阶之间的那些小事。</p>
            <div className="taishan-facts" aria-label="这次登山的记忆">
              <span><strong>7.8</strong><small>KM 一起走过</small></span><span><strong>1,545</strong><small>M 我们到过</small></span><span><strong>04:30</strong><small>从夜里出发</small></span>
            </div>
          </div>

          <div className="taishan-cover" aria-label="泰山日出纪念卡片">
            <div className="taishan-cover-top"><span>TAI'AN / SHANDONG</span><b>MEMORY NO. 02</b></div>
            <div className="taishan-mountain" aria-hidden="true"><span className="taishan-sun" /><i /><i /><i /></div>
            <div className="taishan-cover-caption"><strong>爬泰山的日子</strong><span>THE MORNING WE KEPT</span></div><div className="taishan-cover-stamp">08<br /><small>AUG</small></div>
          </div>
        </header>

        <section className="taishan-story" aria-labelledby="taishan-story-title">
          <div className="taishan-section-head"><div><p>THE DAY IN FOUR MOMENTS</p><h2 id="taishan-story-title">一条走过的路，<em>四个记得的瞬间。</em></h2></div><span className="taishan-story-count">{String(selected + 1).padStart(2, '0')} / 04 正在回看</span></div>
          <div className="taishan-story-layout">
            <div className="taishan-timeline" role="tablist" aria-label="泰山旅程回忆">
              {memories.map((item, index) => <button type="button" role="tab" aria-selected={selected === index} className={'taishan-timeline-item' + (selected === index ? ' is-selected' : '')} key={item.no} onClick={() => selectMemory(index)}><span className="taishan-timeline-dot" style={{ '--dot-tone': item.tone }} /><span className="taishan-timeline-time">{item.time}</span><span className="taishan-timeline-place">{item.place}<small>{item.altitude}</small></span><span className="taishan-timeline-mark">{item.mark}</span></button>)}
            </div>
            <article className="taishan-memory-card" aria-live="polite"><div className="taishan-memory-card-top"><span>{memory.no} / 04</span><b>{memory.english}</b></div><p className="taishan-memory-time">{memory.time} · {memory.place}</p><h3>{memory.title}</h3><p className="taishan-memory-text">{memory.text}</p><div className="taishan-memory-card-foot"><span>海拔 {memory.altitude}</span><span>泰山记忆 / 2026</span></div></article>
          </div>
        </section>

        <section className="taishan-keepsake" aria-labelledby="taishan-keepsake-title">
          <div className="taishan-keepsake-copy"><p>LEAVE A LINE FOR THIS DAY</p><h2 id="taishan-keepsake-title">给那天留一句话，<em>以后再打开。</em></h2><span>写下只属于你们的备注，它会和这段回忆一起留在这台设备上。</span></div>
          <div className="taishan-keepsake-form"><label htmlFor="taishan-note">这一天后来被你记成了什么？</label><textarea id="taishan-note" value={note} maxLength={100} onChange={(event) => { setNote(event.target.value); setSaved(false); }} placeholder="比如：山顶的风很大，但我们笑得更大声。" rows="3" /><div className="taishan-keepsake-actions"><small>{note.length} / 100</small><button type="button" onClick={saveMemory}>{saved ? '✓ 已收进回忆' : '收进这页回忆 ↗'}</button></div><p className={'taishan-saved-status' + (saved ? ' is-visible' : '')} aria-live="polite">{saved ? '这句话和今天一起被保存了。' : '还没有留下这一句。'}</p></div>
        </section>

        <footer className="taishan-footer"><span>NOT A GUIDE / A DAY WE WILL REMEMBER</span><a href="/games/">回到全部记录 ↗</a></footer>
      </div>
    </main>
  );
}

const styles = String.raw`*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#eee8dc;color:#403d3b}.taishan-page{position:relative;min-height:100vh;overflow:hidden;background:linear-gradient(140deg,#f3eee4 0%,#ebe9df 49%,#e6ece8 100%);font-family:Inter,system-ui,sans-serif}.taishan-atmosphere{position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 86% 8%,rgba(245,196,122,.42),transparent 19rem),radial-gradient(circle at 7% 56%,rgba(166,194,183,.35),transparent 24rem)}.taishan-shell{position:relative;z-index:1;width:min(1100px,calc(100vw - 44px));margin:auto}.taishan-nav{display:flex;align-items:center;justify-content:space-between;min-height:70px;border-bottom:1px solid rgba(74,76,69,.18);color:#858980;font-size:.61rem;letter-spacing:.14em}.taishan-nav a{color:#6a7067;text-decoration:none;letter-spacing:0}.taishan-nav b{color:#a97760;font-size:.57rem;font-weight:600}.taishan-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(300px,.82fr);gap:clamp(35px,8vw,110px);align-items:center;padding:77px 0 72px}.taishan-kicker{display:flex;align-items:center;gap:10px;margin:0;color:#708879;font-size:.61rem;font-weight:700;letter-spacing:.2em}.taishan-kicker i{width:7px;height:7px;border-radius:50%;background:#b46d5d;box-shadow:0 0 0 5px rgba(180,109,93,.14)}.taishan-date{margin:18px 0 0;color:#9a9a8e;font-size:.69rem;letter-spacing:.08em}.taishan-hero h1{max-width:650px;margin:23px 0 19px;color:#46574f;font:400 clamp(2.65rem,6.2vw,5.1rem)/1.08 Georgia,serif;letter-spacing:-.1em}.taishan-hero h1 em{color:#af6b5b;font-style:italic}.taishan-lead{max-width:490px;margin:0;color:#747b74;font:1rem/1.9 Georgia,serif}.taishan-facts{display:flex;gap:26px;margin-top:33px}.taishan-facts span{display:grid;gap:4px;padding-left:13px;border-left:1px solid rgba(91,119,103,.27)}.taishan-facts strong{color:#557062;font:500 1.14rem Georgia,serif}.taishan-facts small{color:#92968d;font-size:.52rem;letter-spacing:.11em}.taishan-cover{position:relative;min-height:355px;padding:22px 22px 20px;overflow:hidden;border:1px solid rgba(114,121,105,.28);background:#f8f3e8;box-shadow:13px 16px 0 rgba(89,100,85,.1);transform:rotate(1.3deg)}.taishan-cover:before{position:absolute;inset:9px;border:1px solid rgba(166,135,100,.3);content:'';pointer-events:none}.taishan-cover-top{position:relative;display:flex;justify-content:space-between;color:#8f9285;font-size:.5rem;letter-spacing:.12em}.taishan-cover-top b{color:#ad7961;font-weight:500}.taishan-mountain{position:relative;height:240px;margin-top:12px;overflow:hidden;background:linear-gradient(180deg,#dbe9e2,#f2dfc7)}.taishan-mountain:before{position:absolute;right:-12%;bottom:0;left:-12%;height:58%;border-radius:52% 48% 0 0;background:linear-gradient(150deg,#7e9a8d,#536d66);content:'';transform:rotate(-7deg)}.taishan-mountain:after{position:absolute;right:-8%;bottom:0;left:-8%;height:40%;border-radius:55% 45% 0 0;background:rgba(54,81,76,.42);content:'';transform:rotate(7deg)}.taishan-sun{position:absolute;z-index:2;top:34px;right:63px;width:74px;height:74px;border-radius:50%;background:#efbd73;box-shadow:0 0 0 14px rgba(239,189,115,.2),0 0 0 30px rgba(239,189,115,.09)}.taishan-mountain i{position:absolute;z-index:3;bottom:18px;width:4px;height:4px;border-radius:50%;background:#f8f3e8;box-shadow:0 0 0 4px rgba(248,243,232,.15)}.taishan-mountain i:nth-of-type(1){left:35%;bottom:29%}.taishan-mountain i:nth-of-type(2){left:48%;bottom:24%}.taishan-mountain i:nth-of-type(3){left:62%;bottom:18%}.taishan-cover-caption{position:relative;display:grid;gap:5px;margin-top:16px}.taishan-cover-caption strong{color:#4e655c;font:400 1.28rem Georgia,serif}.taishan-cover-caption span{color:#ad7961;font-size:.5rem;letter-spacing:.16em}.taishan-cover-stamp{position:absolute;right:30px;bottom:24px;width:47px;height:50px;display:grid;place-content:center;text-align:center;border:1px dashed #bf8e72;color:#b87862;font:1rem Georgia,serif;line-height:.85;transform:rotate(7deg)}.taishan-cover-stamp small{font:.38rem Inter,sans-serif;letter-spacing:.14em}.taishan-story,.taishan-keepsake{padding:31px 0 64px;border-top:1px solid rgba(74,76,69,.18)}.taishan-section-head{display:flex;align-items:end;justify-content:space-between;gap:30px;margin-bottom:30px}.taishan-section-head p,.taishan-keepsake-copy>p{margin:0;color:#718777;font-size:.61rem;font-weight:700;letter-spacing:.19em}.taishan-section-head h2{margin:11px 0 0;color:#51645a;font:400 clamp(1.7rem,3.4vw,2.7rem) Georgia,serif;letter-spacing:-.07em}.taishan-section-head h2 em,.taishan-keepsake-copy h2 em{color:#ad6d5b;font-style:italic}.taishan-story-count{padding:7px 11px;border:1px solid rgba(103,121,105,.23);border-radius:99px;color:#7c897f;font-size:.57rem;letter-spacing:.06em;white-space:nowrap}.taishan-story-layout{display:grid;grid-template-columns:minmax(320px,.86fr) minmax(0,1.15fr);gap:clamp(28px,7vw,92px);align-items:stretch}.taishan-timeline{position:relative;display:grid;align-content:center}.taishan-timeline:before{position:absolute;top:17px;bottom:17px;left:6px;border-left:1px dashed rgba(104,127,108,.38);content:''}.taishan-timeline-item{position:relative;display:grid;grid-template-columns:31px 55px 1fr;grid-template-rows:auto auto;gap:3px 13px;padding:17px 9px;border:0;border-bottom:1px solid rgba(103,121,105,.15);background:none;color:#718078;text-align:left;cursor:pointer;transition:background .25s,transform .25s}.taishan-timeline-item:first-child{border-top:1px solid rgba(103,121,105,.15)}.taishan-timeline-item:hover{transform:translateX(4px)}.taishan-timeline-item.is-selected{background:rgba(255,252,242,.7);transform:translateX(8px);box-shadow:5px 5px 0 rgba(95,112,95,.08)}.taishan-timeline-dot{position:relative;z-index:1;grid-row:1/3;width:13px;height:13px;margin:2px 0 0;border:3px solid #f1eee4;border-radius:50%;background:var(--dot-tone);box-shadow:0 0 0 1px var(--dot-tone)}.taishan-timeline-time{color:#ad7964;font-size:.67rem;letter-spacing:.08em}.taishan-timeline-place{display:flex;gap:10px;align-items:baseline;color:#4e665a;font:400 1rem Georgia,serif}.taishan-timeline-place small{color:#9a9d91;font:.55rem Inter,sans-serif;letter-spacing:.08em}.taishan-timeline-mark{grid-column:3;color:#90968d;font:.7rem/1.4 Georgia,serif}.taishan-memory-card{position:relative;display:flex;flex-direction:column;min-height:350px;padding:23px 25px 20px;border:1px solid rgba(111,118,100,.3);background:#f8f3e9;box-shadow:9px 12px 0 rgba(89,100,85,.1);transform:rotate(-.7deg)}.taishan-memory-card:before{position:absolute;inset:9px;border:1px solid rgba(166,135,100,.25);content:'';pointer-events:none}.taishan-memory-card-top{position:relative;display:flex;justify-content:space-between;color:#a09c8e;font-size:.54rem;letter-spacing:.12em}.taishan-memory-card-top b{color:var(--memory-tone);font-weight:600}.taishan-memory-time{position:relative;margin:57px 0 0;color:var(--memory-tone);font-size:.62rem;letter-spacing:.14em}.taishan-memory-card h3{position:relative;max-width:460px;margin:12px 0 17px;color:#4c6257;font:400 clamp(1.65rem,3vw,2.55rem)/1.17 Georgia,serif;letter-spacing:-.06em}.taishan-memory-text{position:relative;max-width:470px;margin:0;color:#727b72;font:.95rem/1.9 Georgia,serif}.taishan-memory-card-foot{position:relative;display:flex;justify-content:space-between;gap:12px;margin-top:auto;padding-top:20px;border-top:1px dashed rgba(104,123,105,.32);color:#9b988c;font-size:.53rem;letter-spacing:.1em}.taishan-keepsake{display:grid;grid-template-columns:minmax(0,.85fr) minmax(360px,1.15fr);gap:clamp(30px,8vw,105px);align-items:center}.taishan-keepsake-copy h2{margin:12px 0 10px;color:#53655b;font:400 clamp(1.75rem,3.5vw,2.8rem) Georgia,serif;letter-spacing:-.07em}.taishan-keepsake-copy>span{display:block;max-width:340px;color:#7e867d;font:.84rem/1.7 Georgia,serif}.taishan-keepsake-form{padding:18px 20px 16px;border:1px solid rgba(119,128,107,.28);background:rgba(255,252,243,.55);box-shadow:6px 7px 0 rgba(95,109,90,.08);transform:rotate(.5deg)}.taishan-keepsake-form label{display:block;color:#7e8c81;font-size:.59rem;letter-spacing:.1em}.taishan-keepsake-form textarea{display:block;width:100%;min-height:67px;margin:12px 0;padding:0;border:0;resize:vertical;outline:none;background:transparent;color:#53655b;font:1rem/1.65 Georgia,serif}.taishan-keepsake-form textarea::placeholder{color:#adb0a6}.taishan-keepsake-actions{display:flex;align-items:center;justify-content:space-between;gap:14px}.taishan-keepsake-actions small{color:#a1a298;font-size:.57rem;letter-spacing:.08em}.taishan-keepsake-actions button{padding:10px 14px;border:1px solid #b77460;background:#b77460;color:#fff8ec;font-size:.62rem;letter-spacing:.05em;cursor:pointer;transition:transform .2s,background .2s}.taishan-keepsake-actions button:hover{background:#9f604f;transform:translateY(-2px)}.taishan-saved-status{min-height:1em;margin:11px 0 0;color:#7c987a;font:.69rem/1.4 Georgia,serif;opacity:.5}.taishan-saved-status.is-visible{opacity:1}.taishan-footer{display:flex;justify-content:space-between;padding:23px 0 36px;border-top:1px solid rgba(74,76,69,.18);color:#95988d;font-size:.55rem;letter-spacing:.14em}.taishan-footer a{color:#6d8170;text-decoration:none;letter-spacing:0}@media(max-width:790px){.taishan-shell{width:min(100% - 30px,650px)}.taishan-nav span{display:none}.taishan-hero{grid-template-columns:1fr;gap:34px;padding:53px 0 55px}.taishan-hero h1{font-size:clamp(2.75rem,12vw,4.25rem)}.taishan-cover{max-width:540px;margin:auto}.taishan-section-head{display:block}.taishan-story-count{display:inline-block;margin-top:14px}.taishan-story-layout{grid-template-columns:1fr;gap:29px}.taishan-memory-card{min-height:330px}.taishan-keepsake{grid-template-columns:1fr;gap:25px}.taishan-keepsake-copy>span{max-width:470px}}@media(max-width:450px){.taishan-hero{padding-top:38px}.taishan-facts{gap:13px}.taishan-facts span{padding-left:8px}.taishan-facts small{font-size:.45rem}.taishan-cover{min-height:320px;padding:17px}.taishan-mountain{height:210px}.taishan-sun{right:39px}.taishan-section-head h2{font-size:1.8rem}.taishan-story,.taishan-keepsake{padding-bottom:47px}.taishan-timeline-item{grid-template-columns:27px 47px 1fr;gap:3px 9px;padding:15px 4px}.taishan-timeline-place{font-size:.9rem}.taishan-memory-card{min-height:355px;padding:19px}.taishan-memory-card h3{font-size:1.72rem}.taishan-keepsake-form{padding:15px}.taishan-footer{display:block;font-size:.48rem}.taishan-footer a{display:block;margin-top:11px}}@media(prefers-reduced-motion:reduce){.taishan-timeline-item,.taishan-keepsake-actions button{transition:none}}`;
