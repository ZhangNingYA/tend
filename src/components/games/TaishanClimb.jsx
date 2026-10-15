import { useEffect, useState } from 'react';

const memories = [
  {
    no: '01', time: '04:30', place: '红门 / RED GATE', title: '从一盏灯开始',
    memory: '山脚还没有亮起来。我们把外套拉紧一点，在第一块石阶前交换了今天的第一句话。',
    quote: '“慢一点，天还早。”', distance: '0 km', elevation: '150 m', kind: 'dawn',
  },
  {
    no: '02', time: '06:10', place: '中天门 / MID-HEAVEN GATE', title: '回头看一眼城市',
    memory: '爬到这里，城市缩成一片安静的灰。水瓶递过来的时候，风刚好把额前的头发吹开。',
    quote: '“原来我们已经走这么远了。”', distance: '3.5 km', elevation: '847 m', kind: 'steps',
  },
  {
    no: '03', time: '08:20', place: '南天门 / SOUTHERN GATE', title: '云从脚边经过',
    memory: '最后一段台阶很陡，但云在旁边慢慢移动。每一步都像把昨天留在身后。',
    quote: '“再走一小段，就到了。”', distance: '6.5 km', elevation: '1,460 m', kind: 'cloud',
  },
  {
    no: '04', time: '09:00', place: '玉皇顶 / JADE EMPEROR PEAK', title: '太阳替我们抵达',
    memory: '站在最高处，没有急着拍照。先让风经过，再把这一刻放进以后会反复想起的早晨。',
    quote: '“下次，还一起看日出。”', distance: '7.8 km', elevation: '1,545 m', kind: 'peak',
  },
];

const packingList = [
  { id: 'water', label: '水和一点能量', sub: '至少 1.5 L' },
  { id: 'shoes', label: '防滑的鞋', sub: '台阶比想象中长' },
  { id: 'light', label: '头灯或手电', sub: '日出前出发' },
  { id: 'jacket', label: '薄外套', sub: '山顶风会变凉' },
];

const storageKey = 'tend-memory-taishan';

export default function TaishanClimb() {
  const [reached, setReached] = useState(0);
  const [checked, setChecked] = useState({});
  const [active, setActive] = useState(0);

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(storageKey) || 'null');
      if (!saved) return;
      if (Number.isInteger(saved.reached)) setReached(Math.max(0, Math.min(3, saved.reached)));
      if (Number.isInteger(saved.active)) setActive(Math.max(0, Math.min(3, saved.active)));
      if (saved.checked && typeof saved.checked === 'object') setChecked(saved.checked);
    } catch {
      // Keep this visual guide usable when storage is unavailable.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({ type: 'taishan', reached, active, checked, updatedAt: new Date().toISOString() }));
    } catch {
      // The route and its interactions do not depend on persistence.
    }
  }, [reached, active, checked]);

  const checkIn = (index) => {
    setActive(index);
    setReached((value) => Math.max(value, index));
  };
  const packedCount = packingList.filter((item) => checked[item.id]).length;

  return (
    <main className="taishan-page">
      <style>{styles}</style>
      <div className="taishan-grain" aria-hidden="true" />
      <div className="taishan-shell">
        <nav className="taishan-nav"><a href="/games/">← 记忆索引</a><span>TAISHAN / A DAY TO KEEP</span><b>{String(reached + 1).padStart(2, '0')} / 04</b></nav>
        <header className="taishan-intro-strip"><p><i /> 日出路线 · 7.8 KM · 1,545 M</p><span>四个时刻，记住一座山。</span></header>

        <div className="taishan-panels">
          {memories.map((memory, index) => (
            <section className={'taishan-panel panel-' + memory.kind + (active === index ? ' is-active' : '')} key={memory.no} id={'taishan-' + memory.kind} onMouseEnter={() => setActive(index)}>
              <div className="taishan-panel-rail"><span>{memory.no}</span><i /><b>{String(index + 1).padStart(2, '0')}</b></div>
              <div className="taishan-panel-visual" aria-label={memory.place}>
                {memory.kind === 'dawn' && <svg viewBox="0 0 560 440" role="img" aria-label="日出前的山脚"><circle cx="392" cy="124" r="42" className="sun" /><circle cx="392" cy="124" r="76" className="sun-ring" /><path d="M0 353 C110 292 179 317 265 250 C341 192 401 237 560 105 V440 H0Z" className="mountain back" /><path d="M0 386 C95 343 169 370 256 310 C347 247 420 294 560 191 V440 H0Z" className="mountain front" /><path d="M78 405 V314 M78 314 l-35 28 M78 314 l35 28" className="lamp" /><path d="M73 305 Q78 296 83 305" className="lamp-light" /></svg>}
                {memory.kind === 'steps' && <div className="steps-art"><span /><span /><span /><span /><span /><div className="steps-city" /><i className="steps-person" /></div>}
                {memory.kind === 'cloud' && <svg viewBox="0 0 560 440" role="img" aria-label="云海和南天门"><path d="M0 327 C119 291 165 325 255 268 C347 210 406 247 560 151 V440 H0Z" className="cloud-mountain" /><path d="M0 363 C126 322 213 365 314 302 C402 247 465 284 560 230 V440 H0Z" className="cloud-mountain low" /><path d="M42 249 C101 210 131 258 178 231 C212 212 240 225 261 244 C290 232 328 251 336 280 C276 285 210 280 157 286 C101 291 63 282 42 249Z" className="cloud" /><path d="M389 177 V300 M375 300 H403 M379 189 H399" className="gate" /></svg>}
                {memory.kind === 'peak' && <svg viewBox="0 0 560 440" role="img" aria-label="玉皇顶日出"><circle cx="395" cy="145" r="54" className="peak-sun" /><g className="peak-rays"><path d="M395 62 V35 M395 255 V282 M312 145 H285 M505 145 H478 M336 86 l-19 -19 M454 204 l19 19 M454 86 l19 -19 M336 204 l-19 19" /></g><path d="M0 356 L192 211 L260 274 L371 145 L560 355 V440 H0Z" className="peak-mountain" /><path d="M242 272 L371 145 L394 218 L436 191 L560 355" className="peak-light" /><path d="M368 143 V95 M350 95 H387 M354 102 L370 89 L386 102" className="peak-flag" /></svg>}
                <span className="taishan-visual-caption">{memory.no} / {memory.place.split(' / ')[0]}</span>
              </div>
              <article className="taishan-panel-copy">
                <div className="taishan-panel-meta"><span>{memory.time}</span><i>·</i><span>{memory.place}</span></div>
                <h2>{memory.title}</h2>
                <p>{memory.memory}</p>
                <blockquote>{memory.quote}</blockquote>
                <div className="taishan-panel-data"><span><small>累计路程</small><b>{memory.distance}</b></span><span><small>海拔</small><b>{memory.elevation}</b></span></div>
                <button type="button" className={'taishan-checkin' + (reached >= index ? ' is-done' : '')} onClick={() => checkIn(index)}>{reached >= index ? '✓ 已记录这一站' : '记录这一站'}<b>↗</b></button>
              </article>
            </section>
          ))}
        </div>

        <section className="taishan-packing" aria-label="登山准备清单">
          <div><p>BEFORE THE FIRST STEP</p><h2>把需要的，轻轻放进包里。</h2></div>
          <div className="taishan-packing-list">{packingList.map((item) => <label className={checked[item.id] ? 'is-checked' : ''} key={item.id}><input type="checkbox" checked={Boolean(checked[item.id])} onChange={() => setChecked((value) => ({ ...value, [item.id]: !value[item.id] }))} /><i /><span><strong>{item.label}</strong><small>{item.sub}</small></span></label>)}</div>
          <span className="taishan-packed-count">{packedCount === packingList.length ? 'READY TO WALK' : `${packedCount} / 04 已准备`}</span>
        </section>
        <footer className="taishan-footer"><span>TAISHAN / WALK WITH THE MORNING</span><a href="/games/">回到全部记录 ↗</a></footer>
      </div>
    </main>
  );
}

const styles = String.raw`*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#e9eee7;color:#314e4a}.taishan-page{position:relative;min-height:100vh;overflow:hidden;background:linear-gradient(135deg,#eef4ee 0%,#ecf0e8 55%,#f4e4d1 100%);font-family:Inter,system-ui,sans-serif}.taishan-page:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 85% 5%,rgba(244,203,138,.42),transparent 22rem),radial-gradient(circle at -5% 42%,rgba(176,207,194,.36),transparent 24rem)}.taishan-grain{position:absolute;inset:0;pointer-events:none;opacity:.13;background-image:radial-gradient(rgba(48,75,69,.45) .45px,transparent .55px);background-size:5px 5px;mix-blend-mode:multiply}.taishan-shell{position:relative;z-index:1;width:min(1090px,calc(100vw - 38px));margin:auto}.taishan-nav{display:flex;align-items:center;justify-content:space-between;min-height:64px;border-bottom:1px solid rgba(49,78,74,.16);color:#85928b;font-size:.58rem;letter-spacing:.14em}.taishan-nav a{color:#4c746b;text-decoration:none;letter-spacing:0}.taishan-nav b{color:#b77660;font-size:.56rem;font-weight:600}.taishan-intro-strip{display:flex;justify-content:space-between;align-items:center;padding:29px 0 22px;color:#688078}.taishan-intro-strip p{display:flex;align-items:center;gap:9px;margin:0;font-size:.59rem;font-weight:700;letter-spacing:.17em}.taishan-intro-strip p i{width:6px;height:6px;border-radius:50%;background:#b87961;box-shadow:0 0 0 5px rgba(184,121,97,.13)}.taishan-intro-strip>span{color:#81918a;font:italic .88rem Georgia,serif}.taishan-panels{display:grid;gap:22px}.taishan-panel{position:relative;display:grid;grid-template-columns:minmax(0,1.06fr) minmax(290px,.94fr);min-height:500px;overflow:hidden;border:1px solid rgba(67,103,92,.18);border-radius:19px;background:rgba(249,247,239,.57);box-shadow:10px 13px 0 rgba(79,108,95,.055);transition:transform .4s,box-shadow .4s}.taishan-panel:hover,.taishan-panel.is-active{transform:translateY(-3px);box-shadow:12px 18px 0 rgba(79,108,95,.075)}.taishan-panel:nth-child(even){grid-template-columns:minmax(290px,.94fr) minmax(0,1.06fr)}.taishan-panel:nth-child(even) .taishan-panel-visual{order:2}.taishan-panel:nth-child(even) .taishan-panel-copy{order:1}.taishan-panel-rail{position:absolute;z-index:3;top:23px;left:23px;display:grid;gap:8px;justify-items:center;color:#d5e2d7;font-size:.54rem}.taishan-panel-rail span{display:grid;place-items:center;width:28px;height:28px;border:1px solid rgba(255,255,255,.72);border-radius:50%;background:rgba(67,105,94,.69);font-size:.52rem}.taishan-panel-rail i{display:block;width:1px;height:37px;background:rgba(77,111,97,.31)}.taishan-panel-rail b{color:#779084;font-size:.49rem;font-weight:500;letter-spacing:.12em}.taishan-panel-visual{position:relative;min-height:500px;overflow:hidden;background:#dbe9df}.taishan-panel-visual:after{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.22),transparent 48%,rgba(53,81,72,.1));pointer-events:none}.taishan-panel-visual svg{display:block;width:100%;height:100%;min-height:500px}.taishan-visual-caption{position:absolute;z-index:2;left:25px;bottom:20px;color:rgba(53,87,76,.62);font-size:.5rem;letter-spacing:.12em}.panel-dawn .taishan-panel-visual{background:linear-gradient(160deg,#d7e9e3,#f3e1c9)}.panel-dawn .sun{fill:#efbd72}.panel-dawn .sun-ring{fill:none;stroke:rgba(239,189,114,.4);stroke-width:2}.panel-dawn .mountain{fill:#90aa9a}.panel-dawn .mountain.front{fill:#5e8076;opacity:.75}.panel-dawn .lamp{fill:none;stroke:#55786d;stroke-width:4;stroke-linecap:round}.panel-dawn .lamp-light{fill:none;stroke:#d9a56d;stroke-width:3;stroke-linecap:round}.panel-steps .taishan-panel-visual{background:linear-gradient(140deg,#e7eee4,#d8e3d9)}.steps-art{position:absolute;inset:0;overflow:hidden}.steps-art:before{content:"";position:absolute;inset:13% 7% 0;background:repeating-linear-gradient(160deg,transparent 0 27px,rgba(89,125,107,.32) 28px 30px);clip-path:polygon(0 100%,22% 71%,38% 80%,59% 38%,100% 0,100% 100%)}.steps-art span{position:absolute;right:19%;bottom:30%;width:54%;height:28px;border:1px solid rgba(67,101,88,.27);background:rgba(245,243,232,.62);transform:skewY(-24deg);box-shadow:0 14px 0 rgba(93,125,107,.1),0 28px 0 rgba(93,125,107,.08),0 42px 0 rgba(93,125,107,.06),0 56px 0 rgba(93,125,107,.04)}.steps-art span:nth-child(2){bottom:26%}.steps-art span:nth-child(3){bottom:22%}.steps-art span:nth-child(4){bottom:18%}.steps-art span:nth-child(5){bottom:14%}.steps-city{position:absolute;left:15%;bottom:20%;width:18px;height:50px;border:2px solid #789387;border-bottom:0;box-shadow:27px 16px 0 -2px #8aa091,55px 8px 0 -5px #789387;opacity:.5}.steps-person{position:absolute;right:31%;bottom:37%;width:9px;height:9px;border-radius:50%;background:#b77561;box-shadow:0 13px 0 -2px #b77561;transform:rotate(-20deg)}.panel-cloud .taishan-panel-visual{background:linear-gradient(145deg,#d9e8e5,#eff0df)}.panel-cloud .cloud-mountain{fill:#77968e}.panel-cloud .cloud-mountain.low{fill:#567970;opacity:.57}.panel-cloud .cloud{fill:rgba(248,247,236,.82)}.panel-cloud .gate{fill:none;stroke:#bd8068;stroke-width:4;stroke-linecap:round}.panel-peak .taishan-panel-visual{background:linear-gradient(150deg,#f0e7d7,#d4e5dc)}.panel-peak .peak-sun{fill:#efbd70;opacity:.95}.panel-peak .peak-rays{fill:none;stroke:#d79d67;stroke-width:3;stroke-linecap:round}.panel-peak .peak-mountain{fill:#587d73}.panel-peak .peak-light{fill:#91aa96}.panel-peak .peak-flag{fill:none;stroke:#b57863;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}.taishan-panel-copy{display:flex;flex-direction:column;justify-content:center;padding:56px 9% 48px 13%}.taishan-panel:nth-child(even) .taishan-panel-copy{padding-left:13%;padding-right:9%}.taishan-panel-meta{display:flex;align-items:center;gap:9px;color:#b47762;font-size:.58rem;letter-spacing:.1em}.taishan-panel-meta i{color:#91a199;font-style:normal}.taishan-panel-copy h2{margin:18px 0 16px;color:#315550;font:400 clamp(2rem,4vw,3.25rem)/1.1 Georgia,serif;letter-spacing:-.09em}.taishan-panel-copy>p{max-width:385px;margin:0;color:#71827b;font:1rem/1.9 Georgia,serif}.taishan-panel-copy blockquote{max-width:380px;margin:25px 0 0;padding-left:14px;border-left:2px solid rgba(184,119,98,.45);color:#53766d;font:italic 1rem/1.55 Georgia,serif}.taishan-panel-data{display:flex;gap:26px;margin-top:30px;padding-top:17px;border-top:1px dashed rgba(76,110,98,.25)}.taishan-panel-data span{display:grid;gap:5px}.taishan-panel-data small{color:#9ba69e;font-size:.5rem;letter-spacing:.11em}.taishan-panel-data b{color:#54766d;font:400 .83rem Georgia,serif}.taishan-checkin{display:flex;justify-content:space-between;align-items:center;max-width:260px;margin-top:28px;padding:12px 0;border:0;border-bottom:1px solid #b4c5b7;background:none;color:#aa6d58;font-size:.65rem;letter-spacing:.06em;cursor:pointer}.taishan-checkin b{font-size:1rem;font-weight:400;transition:transform .25s}.taishan-checkin:hover b{transform:translate(3px,-3px)}.taishan-checkin.is-done{color:#658b6c}.taishan-packing{display:grid;grid-template-columns:.6fr 1.4fr;gap:28px;align-items:center;margin-top:22px;padding:25px 27px;border:1px solid rgba(67,103,92,.17);border-radius:15px;background:rgba(247,246,237,.56)}.taishan-packing>div:first-child p{margin:0;color:#6c897d;font-size:.54rem;font-weight:700;letter-spacing:.16em}.taishan-packing h2{margin:10px 0 0;color:#385b55;font:400 1.42rem Georgia,serif;letter-spacing:-.06em}.taishan-packing-list{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.taishan-packing-list label{display:flex;align-items:center;gap:8px;min-height:64px;padding:9px;border:1px solid rgba(78,115,101,.16);border-radius:9px;background:rgba(255,253,247,.47);cursor:pointer;transition:.25s}.taishan-packing-list label:hover{transform:translateY(-2px);background:#fffdf7}.taishan-packing-list input{position:absolute;opacity:0}.taishan-packing-list label>i{flex:0 0 16px;width:16px;height:16px;border:1px solid #97afa0;border-radius:50%;font-style:normal}.taishan-packing-list label>i:after{content:'✓';display:grid;place-items:center;height:100%;color:#fff;font-size:.56rem;opacity:0}.taishan-packing-list label.is-checked{border-color:#a7c3a8;background:#eef5e9}.taishan-packing-list label.is-checked>i{border-color:#729976;background:#729976}.taishan-packing-list label.is-checked>i:after{opacity:1}.taishan-packing-list strong{display:block;color:#55766c;font:400 .7rem Georgia,serif}.taishan-packing-list small{display:block;margin-top:3px;color:#99a39b;font-size:.47rem}.taishan-packed-count{grid-column:2;margin-top:-16px;color:#84988d;font-size:.52rem;letter-spacing:.1em;text-align:right}.taishan-footer{display:flex;justify-content:space-between;padding:22px 0 34px;color:#8a978f;font-size:.52rem;letter-spacing:.13em}.taishan-footer a{color:#557d70;text-decoration:none;letter-spacing:0}@keyframes dawnPulse{0%,100%{transform:scale(1);opacity:.95}50%{transform:scale(1.08);opacity:1}}@media(max-width:760px){.taishan-shell{width:min(100% - 28px,620px)}.taishan-nav span{display:none}.taishan-intro-strip{display:block;padding:25px 0 18px}.taishan-intro-strip>span{display:block;margin-top:11px}.taishan-panels{gap:15px}.taishan-panel,.taishan-panel:nth-child(even){display:block;min-height:0}.taishan-panel:nth-child(even) .taishan-panel-visual,.taishan-panel:nth-child(even) .taishan-panel-copy{order:initial}.taishan-panel-visual,.taishan-panel-visual svg{min-height:265px;height:265px}.taishan-panel-rail{top:16px;left:16px}.taishan-panel-rail i{height:24px}.taishan-panel-copy,.taishan-panel:nth-child(even) .taishan-panel-copy{padding:27px 23px 27px}.taishan-panel-copy h2{font-size:2rem;margin-top:14px}.taishan-panel-copy>p{font-size:.91rem;line-height:1.8}.taishan-panel-copy blockquote{margin-top:20px}.taishan-panel-data{margin-top:22px}.taishan-checkin{margin-top:23px}.taishan-packing{display:block;margin-top:15px;padding:22px 18px}.taishan-packing-list{grid-template-columns:1fr 1fr;margin-top:18px}.taishan-packed-count{display:block;margin:12px 0 0;text-align:left}.taishan-footer{font-size:.46rem}}@media(max-width:420px){.taishan-panel-visual,.taishan-panel-visual svg{min-height:228px;height:228px}.taishan-panel-copy,.taishan-panel:nth-child(even) .taishan-panel-copy{padding:24px 18px}.taishan-panel-copy h2{font-size:1.85rem}.taishan-panel-copy>p{font-size:.88rem}.taishan-packing-list{grid-template-columns:1fr}.taishan-footer{display:block}.taishan-footer a{display:block;margin-top:9px}}@media(prefers-reduced-motion:reduce){.taishan-panel,.taishan-panel-copy,.taishan-dawn-sun{animation:none;transition:none}}`;
