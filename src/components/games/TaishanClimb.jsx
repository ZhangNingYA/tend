import { useEffect, useState } from 'react';

const stages = [
  { no: '01', name: '红门', english: 'RED GATE', distance: '0 km', elevation: '150 m', time: '04:30', tone: '#b77762', note: '从一盏还没熄灭的路灯开始。先别急着赶路，听一听山脚的风。' },
  { no: '02', name: '中天门', english: 'MID-HEAVEN GATE', distance: '3.5 km', elevation: '847 m', time: '06:10', tone: '#76927f', note: '这里刚好可以回头看一眼城市。把水喝完，再把步子放慢一点。' },
  { no: '03', name: '南天门', english: 'SOUTHERN GATE', distance: '6.5 km', elevation: '1,460 m', time: '08:20', tone: '#6e8898', note: '风开始有了高度。云从脚边经过，剩下的路会比想象中更轻。' },
  { no: '04', name: '玉皇顶', english: 'JADE EMPEROR PEAK', distance: '7.8 km', elevation: '1,545 m', time: '09:00', tone: '#c1935e', note: '到达最高处，太阳还在慢慢升起。今天的风景，值得被记住。' },
];

const packingList = [
  { id: 'water', label: '水和一点能量', sub: '至少 1.5 L' },
  { id: 'shoes', label: '防滑的鞋', sub: '台阶比想象中长' },
  { id: 'light', label: '头灯或手电', sub: '日出前出发' },
  { id: 'jacket', label: '薄外套', sub: '山顶风会变凉' },
];

const stagePositions = ['88%', '63%', '37%', '11%'];
const storageKey = 'tend-memory-taishan';

export default function TaishanClimb() {
  const [selected, setSelected] = useState(0);
  const [reached, setReached] = useState(0);
  const [checked, setChecked] = useState({});
  const stage = stages[selected];
  const progress = reached / (stages.length - 1) * 100;
  const packedCount = packingList.filter((item) => checked[item.id]).length;

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(storageKey) || 'null');
      if (!saved) return;
      if (Number.isInteger(saved.selected)) setSelected(Math.max(0, Math.min(3, saved.selected)));
      if (Number.isInteger(saved.reached)) setReached(Math.max(0, Math.min(3, saved.reached)));
      if (saved.checked && typeof saved.checked === 'object') setChecked(saved.checked);
    } catch {
      // Keep the guide usable when private browsing blocks storage.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({ type: 'taishan', selected, reached, checked, updatedAt: new Date().toISOString() }));
    } catch {
      // The route itself does not depend on persistence.
    }
  }, [selected, reached, checked]);

  const togglePacking = (id) => setChecked((value) => ({ ...value, [id]: !value[id] }));
  const checkIn = () => setReached((value) => Math.max(value, selected));

  return (
    <main className="taishan-page" style={{ '--stage-tone': stage.tone }}>
      <style>{styles}</style>
      <div className="taishan-grain" aria-hidden="true" />
      <div className="taishan-shell">
        <nav className="taishan-nav"><a href="/games/">← 记忆索引</a><span>FIELD GUIDE / MOUNT TAI</span><b>TAI · 01</b></nav>

        <header className="taishan-hero">
          <div className="taishan-heading">
            <p className="taishan-overline"><i /> A SLOW ASCENT</p>
            <h1>爬一座山，<em>把时间还给自己。</em></h1>
            <p className="taishan-intro">给日出留出一条慢慢上升的路线。不是攻略，更像一张可以随身带走的登山通行证。</p>
            <div className="taishan-weather"><span><b>04:30</b><small>建议出发</small></span><span><b>7.8 KM</b><small>单程距离</small></span><span><b>1,545 M</b><small>最高海拔</small></span></div>
          </div>
          <aside className="taishan-dawn" aria-label="日出信息">
            <div className="taishan-dawn-orbit"><span className="taishan-dawn-sun" /><i /><i /><i /></div>
            <div className="taishan-dawn-copy"><small>TAI'AN / SHANDONG</small><strong>日出前 01:20</strong><span>山顶的光，会把走过的路重新照亮。</span></div>
          </aside>
        </header>

        <section className="taishan-pass" aria-labelledby="taishan-pass-title">
          <div className="taishan-pass-head"><div><p>THE ASCENT PASS</p><h2 id="taishan-pass-title">四个落脚处，<em>一条山脊线。</em></h2></div><div className="taishan-progress"><span>ROUTE PROGRESS</span><b>{String(reached + 1).padStart(2, '0')} / 04</b><i><u style={{ width: progress + '%' }} /></i></div></div>
          <div className="taishan-pass-grid">
            <div className="taishan-ridge-card">
              <div className="taishan-ridge-label"><span>ELEVATION PROFILE</span><b>1,545 M</b></div>
              <svg className="taishan-contours" viewBox="0 0 320 540" aria-hidden="true">
                <path d="M-20 490 C45 448 35 404 100 375 S130 290 195 260 S230 150 350 108" /><path d="M-20 520 C58 478 53 438 113 414 S153 324 211 300 S257 194 350 162" /><path d="M-20 450 C25 420 44 382 83 352 S107 250 178 228 S211 123 350 74" /><path d="M-20 414 C25 397 33 353 71 325 S98 212 159 190 S208 79 350 42" /><path d="M-20 335 C52 317 45 277 93 247 S135 154 193 131 S244 57 350 17" /><path d="M-20 280 C43 266 66 222 106 205 S148 105 221 91 S271 30 350 0" /><path className="taishan-ridge-shadow" d="M-20 518 C61 461 65 424 123 391 S154 313 215 278 S252 185 350 124" />
              </svg>
              <div className="taishan-ridge-track"><span className="taishan-ridge-fill" style={{ height: progress + '%' }} /></div>
              <div className="taishan-stage-list">{stages.map((item, index) => <button key={item.no} type="button" className={'taishan-stage-stop' + (selected === index ? ' is-selected' : '') + (reached >= index ? ' is-reached' : '')} style={{ bottom: stagePositions[index] }} onClick={() => setSelected(index)} aria-label={'选择' + item.name} aria-pressed={selected === index}><span className="taishan-stop-dot">{item.no}</span><span className="taishan-stop-name"><strong>{item.name}</strong><small>{item.elevation}</small></span></button>)}</div>
              <div className="taishan-ridge-foot"><span>150 M</span><i>RED GATE</i><span>JADE EMPEROR</span></div>
            </div>
            <article className="taishan-detail" key={stage.no} aria-live="polite">
              <div className="taishan-detail-stamp"><span>{stage.no}</span><i>{stage.english}</i></div><h3>{stage.name}</h3><p>{stage.note}</p>
              <div className="taishan-detail-data"><span><small>ARRIVE</small><b>{stage.time}</b></span><span><small>ALTITUDE</small><b>{stage.elevation}</b></span><span><small>DISTANCE</small><b>{stage.distance}</b></span></div>
              <button type="button" className={'taishan-checkin' + (reached >= selected ? ' is-done' : '')} onClick={checkIn}>{reached >= selected ? '✓ 已在这里' : '我到这里了'}<b>↗</b></button>
            </article>
          </div>
        </section>

        <section className="taishan-pack" aria-labelledby="taishan-pack-title">
          <div className="taishan-pack-head"><div><p>PACK LIGHT</p><h2 id="taishan-pack-title">带上刚刚好的东西。</h2></div><span className={packedCount === packingList.length ? 'is-ready' : ''}>{packedCount === packingList.length ? 'READY TO WALK' : `${packedCount} / 04`}</span></div>
          <div className="taishan-pack-list">{packingList.map((item) => <label className={'taishan-pack-item' + (checked[item.id] ? ' is-checked' : '')} key={item.id}><input type="checkbox" checked={Boolean(checked[item.id])} onChange={() => togglePacking(item.id)} /><i /><span><strong>{item.label}</strong><small>{item.sub}</small></span></label>)}</div>
        </section>

        <footer className="taishan-footer"><span>TAISHAN / WALK WITH THE MORNING</span><a href="/games/">回到全部记录 ↗</a></footer>
      </div>
    </main>
  );
}

const styles = String.raw`*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#e8eee8;color:#2e4b49}.taishan-page{position:relative;min-height:100vh;overflow:hidden;background:#e8eee8;font-family:Inter,system-ui,sans-serif}.taishan-page:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 82% 5%,rgba(242,197,123,.42),transparent 22rem),linear-gradient(120deg,#edf3ee 0%,#edf0e8 55%,#f5e5d2 100%)}.taishan-grain{position:absolute;inset:0;pointer-events:none;opacity:.16;background-image:radial-gradient(rgba(60,80,72,.4) .45px,transparent .55px);background-size:5px 5px;mix-blend-mode:multiply}.taishan-shell{position:relative;z-index:1;width:min(1060px,calc(100vw - 36px));margin:auto}.taishan-nav{display:flex;align-items:center;justify-content:space-between;min-height:64px;border-bottom:1px solid rgba(46,75,73,.15);color:#81918a;font-size:.59rem;letter-spacing:.13em}.taishan-nav a{color:#4f756d;text-decoration:none;letter-spacing:0}.taishan-nav b{color:#b57862;font-size:.57rem;font-weight:600}.taishan-hero{display:grid;grid-template-columns:minmax(0,1fr) 280px;gap:clamp(35px,8vw,120px);align-items:center;padding:62px 0 59px}.taishan-overline,.taishan-pass-head p,.taishan-pack-head p{display:flex;align-items:center;gap:9px;margin:0;color:#608278;font-size:.59rem;font-weight:700;letter-spacing:.2em}.taishan-overline i{width:6px;height:6px;border-radius:50%;background:#bb7963;box-shadow:0 0 0 5px rgba(187,121,99,.13)}.taishan-heading h1{max-width:610px;margin:18px 0 15px;color:#2e514d;font:400 clamp(2.45rem,5.9vw,4.35rem)/1.08 Georgia,serif;letter-spacing:-.095em}.taishan-heading h1 em{color:#ae705e;font-style:italic}.taishan-intro{max-width:470px;margin:0;color:#71817b;font:.94rem/1.8 Georgia,serif}.taishan-weather{display:flex;gap:24px;margin-top:28px}.taishan-weather span{display:grid;gap:4px;padding-left:12px;border-left:1px solid rgba(75,112,102,.24)}.taishan-weather b{color:#4f7169;font:500 1rem Georgia,serif}.taishan-weather small{color:#96a099;font-size:.5rem;letter-spacing:.09em}.taishan-dawn{position:relative;display:grid;grid-template-rows:175px auto;padding:15px 17px 17px;border:1px solid rgba(78,112,100,.2);border-radius:20px;background:rgba(255,252,244,.46);box-shadow:8px 10px 0 rgba(88,113,99,.07);transform:rotate(1.4deg)}.taishan-dawn-orbit{position:relative;overflow:hidden;border-bottom:1px dashed rgba(91,120,105,.28)}.taishan-dawn-orbit:before{content:"";position:absolute;left:50%;bottom:-120px;width:245px;height:245px;border:1px solid rgba(186,126,91,.32);border-radius:50%;transform:translateX(-50%)}.taishan-dawn-orbit:after{content:"";position:absolute;left:50%;bottom:-83px;width:170px;height:170px;border:1px solid rgba(186,126,91,.2);border-radius:50%;transform:translateX(-50%)}.taishan-dawn-sun{position:absolute;left:50%;bottom:27px;width:31px;height:31px;border-radius:50%;background:#edbb70;box-shadow:0 0 0 12px rgba(237,187,112,.14),0 0 45px rgba(237,187,112,.52);transform:translateX(-50%);animation:dawnPulse 5s ease-in-out infinite}.taishan-dawn-orbit i{position:absolute;bottom:18px;left:50%;width:4px;height:4px;border-radius:50%;background:#a56e5d}.taishan-dawn-orbit i:nth-of-type(1){transform:translateX(-83px)}.taishan-dawn-orbit i:nth-of-type(2){transform:translateX(80px);background:#819582}.taishan-dawn-orbit i:nth-of-type(3){bottom:83px;transform:translateX(70px);background:#ce9b64}.taishan-dawn-copy{display:grid;gap:7px;padding-top:14px}.taishan-dawn-copy small{color:#89958d;font-size:.49rem;letter-spacing:.11em}.taishan-dawn-copy strong{color:#4e6e67;font:400 1.06rem Georgia,serif}.taishan-dawn-copy span{color:#89968e;font:.72rem/1.5 Georgia,serif}.taishan-pass{padding:28px 0 56px;border-top:1px solid rgba(46,75,73,.15)}.taishan-pass-head,.taishan-pack-head{display:flex;align-items:end;justify-content:space-between;gap:24px;margin-bottom:26px}.taishan-pass-head h2,.taishan-pack-head h2{margin:9px 0 0;color:#355852;font:400 clamp(1.62rem,3.5vw,2.48rem) Georgia,serif;letter-spacing:-.07em}.taishan-pass-head h2 em{color:#b47761;font-style:italic}.taishan-progress{display:grid;grid-template-columns:auto auto;gap:4px 10px;align-items:end;min-width:150px}.taishan-progress span{grid-column:1;color:#909d95;font-size:.49rem;letter-spacing:.1em}.taishan-progress b{justify-self:end;color:#b77862;font-size:.63rem;font-weight:500}.taishan-progress i{grid-column:1/-1;display:block;height:2px;background:rgba(88,119,103,.17)}.taishan-progress u{display:block;height:100%;background:#b77862;text-decoration:none;transition:width .6s}.taishan-pass-grid{display:grid;grid-template-columns:minmax(0,1.12fr) minmax(260px,.7fr);gap:clamp(22px,6vw,76px);align-items:stretch}.taishan-ridge-card{position:relative;min-height:540px;overflow:hidden;border:1px solid rgba(73,108,97,.2);border-radius:20px;background:rgba(219,232,222,.65);box-shadow:10px 12px 0 rgba(78,110,94,.07)}.taishan-ridge-label{position:absolute;top:19px;left:21px;right:21px;z-index:2;display:flex;justify-content:space-between;color:#718a7e;font-size:.5rem;letter-spacing:.14em}.taishan-ridge-label b{color:#b37862;font-weight:500}.taishan-contours{position:absolute;inset:0;width:100%;height:100%;opacity:.52}.taishan-contours path{fill:none;stroke:#668c7c;stroke-width:1.1}.taishan-contours .taishan-ridge-shadow{stroke:#bb7b64;stroke-width:2.6;stroke-dasharray:4 9;opacity:.8}.taishan-ridge-track{position:absolute;z-index:1;top:12%;bottom:13%;left:27%;width:2px;background:rgba(71,108,95,.2)}.taishan-ridge-fill{position:absolute;bottom:0;left:0;width:100%;background:#b77762;transition:height .65s cubic-bezier(.2,.8,.2,1)}.taishan-stage-list{position:absolute;inset:0;z-index:3}.taishan-stage-stop{position:absolute;left:27%;display:flex;align-items:center;gap:14px;padding:0;border:0;background:none;color:#41645b;text-align:left;cursor:pointer;transform:translate(-50%,50%)}.taishan-stop-dot{display:grid;place-items:center;width:30px;height:30px;border:2px solid #f5f2e8;border-radius:50%;background:#9db6a5;color:#fff;font-size:.51rem;box-shadow:0 2px 4px rgba(55,87,73,.14);transition:transform .35s,background .35s}.taishan-stop-name{display:grid;gap:3px;min-width:116px;padding:7px 10px;border-radius:6px;background:rgba(247,246,237,.72);box-shadow:0 3px 7px rgba(55,87,73,.04);transition:transform .35s,background .35s}.taishan-stop-name strong{font:400 .91rem Georgia,serif}.taishan-stop-name small{color:#8b998f;font-size:.5rem;letter-spacing:.09em}.taishan-stage-stop.is-reached .taishan-stop-dot{background:#b77762}.taishan-stage-stop.is-selected .taishan-stop-dot{transform:scale(1.28);background:#b77762;box-shadow:0 0 0 6px rgba(183,119,98,.14),0 2px 4px rgba(55,87,73,.14)}.taishan-stage-stop.is-selected .taishan-stop-name{background:#fff9ee;transform:translateX(5px)}.taishan-ridge-foot{position:absolute;left:19px;right:19px;bottom:16px;z-index:2;display:flex;justify-content:space-between;color:#7f9389;font-size:.47rem;letter-spacing:.11em}.taishan-ridge-foot i{color:#b77762;font-style:normal}.taishan-detail{display:flex;flex-direction:column;min-height:540px;padding:21px 0 7px;border-top:2px solid var(--stage-tone);animation:detailIn .45s ease both}.taishan-detail-stamp{display:flex;align-items:center;gap:10px;color:var(--stage-tone)}.taishan-detail-stamp span{display:grid;place-items:center;width:31px;height:31px;border:1px solid currentColor;border-radius:50%;font-size:.6rem}.taishan-detail-stamp i{font-size:.51rem;font-style:normal;letter-spacing:.12em}.taishan-detail h3{margin:48px 0 13px;color:#355650;font:400 2.8rem Georgia,serif;letter-spacing:-.09em}.taishan-detail>p{margin:0;color:#75877f;font:.91rem/1.9 Georgia,serif}.taishan-detail-data{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:32px;padding:17px 0;border-top:1px dashed rgba(74,110,98,.27);border-bottom:1px dashed rgba(74,110,98,.27)}.taishan-detail-data span{display:grid;gap:6px}.taishan-detail-data small{color:#9aa39b;font-size:.48rem;letter-spacing:.08em}.taishan-detail-data b{color:#4e7268;font:400 .83rem Georgia,serif}.taishan-checkin{display:flex;justify-content:space-between;align-items:center;margin-top:auto;padding:13px 0;border:0;border-bottom:1px solid #b8c6b9;background:none;color:#aa6e5a;font-size:.65rem;letter-spacing:.06em;cursor:pointer}.taishan-checkin b{font-size:1rem;font-weight:400;transition:transform .25s}.taishan-checkin:hover b{transform:translate(3px,-3px)}.taishan-checkin.is-done{color:#678b6e}.taishan-pack{padding:28px 0 55px;border-top:1px solid rgba(46,75,73,.15)}.taishan-pack-head h2{font-size:clamp(1.42rem,3vw,2rem)}.taishan-pack-head>span{padding:7px 10px;border:1px solid rgba(73,111,98,.2);border-radius:99px;color:#708b80;font-size:.55rem;letter-spacing:.09em;white-space:nowrap}.taishan-pack-head>span.is-ready{border-color:rgba(100,144,104,.35);color:#62896b;background:rgba(229,241,225,.55)}.taishan-pack-list{display:grid;grid-template-columns:repeat(4,1fr);gap:9px}.taishan-pack-item{display:flex;align-items:center;gap:10px;min-height:74px;padding:11px;border:1px solid rgba(76,113,101,.17);border-radius:10px;background:rgba(255,252,244,.4);cursor:pointer;transition:transform .25s,background .25s,border-color .25s}.taishan-pack-item:hover{transform:translateY(-2px);background:rgba(255,252,244,.82)}.taishan-pack-item input{position:absolute;opacity:0;pointer-events:none}.taishan-pack-item>i{position:relative;flex:0 0 17px;width:17px;height:17px;border:1px solid #99afa0;border-radius:50%;font-style:normal;transition:.25s}.taishan-pack-item>i:after{content:'✓';position:absolute;inset:0;display:grid;place-items:center;color:#fff;font-size:.59rem;opacity:0}.taishan-pack-item strong{display:block;color:#53736a;font:400 .76rem Georgia,serif}.taishan-pack-item small{display:block;margin-top:4px;color:#99a39b;font-size:.51rem}.taishan-pack-item.is-checked{border-color:rgba(104,145,105,.35);background:rgba(232,242,225,.7)}.taishan-pack-item.is-checked>i{border-color:#729777;background:#729777}.taishan-pack-item.is-checked>i:after{opacity:1}.taishan-footer{display:flex;justify-content:space-between;padding:21px 0 33px;border-top:1px solid rgba(46,75,73,.15);color:#89988f;font-size:.52rem;letter-spacing:.13em}.taishan-footer a{color:#557d70;text-decoration:none;letter-spacing:0}@keyframes dawnPulse{0%,100%{transform:translateX(-50%) scale(1);box-shadow:0 0 0 12px rgba(237,187,112,.14),0 0 45px rgba(237,187,112,.52)}50%{transform:translateX(-50%) scale(1.08);box-shadow:0 0 0 16px rgba(237,187,112,.1),0 0 60px rgba(237,187,112,.58)}}@keyframes detailIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}@media(max-width:760px){.taishan-shell{width:min(100% - 28px,620px)}.taishan-nav span{display:none}.taishan-hero{grid-template-columns:1fr;gap:30px;padding:42px 0 43px}.taishan-heading h1{font-size:clamp(2.45rem,11vw,3.6rem)}.taishan-intro{font-size:.9rem}.taishan-weather{gap:16px;margin-top:25px}.taishan-weather b{font-size:.92rem}.taishan-dawn{grid-template-rows:155px auto;min-height:228px}.taishan-dawn-orbit{height:155px}.taishan-pass,.taishan-pack{padding-top:24px}.taishan-pass-head,.taishan-pack-head{display:block;margin-bottom:20px}.taishan-progress{max-width:220px;margin-top:18px}.taishan-pass-grid{grid-template-columns:1fr;gap:23px}.taishan-ridge-card{min-height:430px}.taishan-detail{min-height:335px}.taishan-detail h3{margin-top:35px;font-size:2.25rem}.taishan-detail-data{margin-top:25px}.taishan-pack-list{grid-template-columns:1fr 1fr;gap:8px}.taishan-pack-item{min-height:69px;padding:10px}.taishan-footer{font-size:.47rem}}@media(max-width:420px){.taishan-heading h1{font-size:clamp(2.35rem,11.6vw,3.1rem)}.taishan-weather{gap:10px}.taishan-weather span{padding-left:8px}.taishan-weather b{font-size:.84rem}.taishan-weather small{font-size:.46rem}.taishan-dawn{padding:12px 14px}.taishan-ridge-card{min-height:405px}.taishan-stage-stop{gap:10px}.taishan-stop-name{min-width:105px;padding:6px 8px}.taishan-stop-name strong{font-size:.83rem}.taishan-pack-list{grid-template-columns:1fr}.taishan-footer{display:block}.taishan-footer a{display:block;margin-top:9px}}@media(prefers-reduced-motion:reduce){.taishan-dawn-sun,.taishan-detail{animation:none;transition:none}}`;
