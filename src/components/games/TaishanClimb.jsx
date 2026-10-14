import { useEffect, useMemo, useState } from 'react';

const stages = [
  {
    no: '01',
    name: '红门',
    english: 'THE RED GATE',
    distance: '0 km',
    elevation: '150 m',
    time: '04:30',
    tone: '#b88468',
    note: '从一盏还没熄灭的路灯开始。先别急着赶路，听一听山脚的风。',
  },
  {
    no: '02',
    name: '中天门',
    english: 'MID-HEAVEN GATE',
    distance: '3.5 km',
    elevation: '847 m',
    time: '06:10',
    tone: '#819a82',
    note: '这里刚好可以回头看一眼城市。把水喝完，再把步子放慢一点。',
  },
  {
    no: '03',
    name: '南天门',
    english: 'SOUTHERN GATE',
    distance: '6.5 km',
    elevation: '1,460 m',
    time: '08:20',
    tone: '#718aa0',
    note: '风开始有了高度。云从脚边经过，剩下的路会比想象中更轻。',
  },
  {
    no: '04',
    name: '玉皇顶',
    english: 'JADE EMPEROR PEAK',
    distance: '7.8 km',
    elevation: '1,545 m',
    time: '09:00',
    tone: '#c69a63',
    note: '到达最高处，太阳还在慢慢升起。今天的风景，值得被记住。',
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
  const [selected, setSelected] = useState(0);
  const [reached, setReached] = useState(0);
  const [checked, setChecked] = useState({});
  const stage = stages[selected];

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(storageKey) || 'null');
      if (!saved) return;
      if (Number.isInteger(saved.selected)) setSelected(Math.max(0, Math.min(stages.length - 1, saved.selected)));
      if (Number.isInteger(saved.reached)) setReached(Math.max(0, Math.min(stages.length - 1, saved.reached)));
      if (saved.checked && typeof saved.checked === 'object') setChecked(saved.checked);
    } catch {
      // A private route note should never block the climb template.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({
        type: 'taishan',
        selected,
        reached,
        checked,
        updatedAt: new Date().toISOString(),
      }));
    } catch {
      // The template remains fully usable without local storage.
    }
  }, [selected, reached, checked]);

  const progress = useMemo(() => (reached / (stages.length - 1)) * 100, [reached]);
  const allPacked = packingList.every((item) => checked[item.id]);

  const checkIn = () => {
    setReached((value) => Math.max(value, selected));
  };

  const togglePacking = (id) => {
    setChecked((value) => ({ ...value, [id]: !value[id] }));
  };

  return (
    <main className="taishan-page" style={{ '--stage-tone': stage.tone }}>
      <style>{styles}</style>
      <div className="taishan-mist" aria-hidden="true" />
      <div className="taishan-shell">
        <nav className="taishan-nav">
          <a href="/games/">← 记忆索引</a>
          <span>MOUNT TAI / FIELD GUIDE</span>
          <b>{String(reached + 1).padStart(2, '0')} / 04</b>
        </nav>

        <header className="taishan-hero">
          <div className="taishan-hero-copy">
            <p className="taishan-kicker"><i /> A SLOW ASCENT / 01</p>
            <h1>把每一步，<em>走成风景。</em></h1>
            <p className="taishan-lead">一份不赶时间的泰山路线模板。留一点空白给呼吸，也留给日出从山背后出现。</p>
            <div className="taishan-facts" aria-label="路线概况">
              <span><strong>7.8</strong><small>KM 路程</small></span>
              <span><strong>1,545</strong><small>M 最高海拔</small></span>
              <span><strong>04:30</strong><small>建议出发</small></span>
            </div>
          </div>
          <div className="taishan-sun-card">
            <div className="taishan-sun" aria-hidden="true"><span /></div>
            <div className="taishan-sun-meta"><span>TAI'AN / SHANDONG</span><b>日出路线</b></div>
            <p>山顶的光，会把走过的路重新照亮。</p>
            <div className="taishan-sun-line"><i style={{ width: progress + '%' }} /><span>{Math.round(progress)}% 已到达</span></div>
          </div>
        </header>

        <section className="taishan-route" aria-labelledby="taishan-route-title">
          <div className="taishan-section-head">
            <div><p>THE ROUTE / 04 STOPS</p><h2 id="taishan-route-title">沿着山脊，<em>选一个落脚处。</em></h2></div>
            <span className="taishan-current">当前：{stage.name}</span>
          </div>
          <div className="taishan-map-layout">
            <div className="taishan-map" aria-label="泰山登山路线图">
              <svg viewBox="0 0 800 410" role="img" aria-label="从红门通往玉皇顶的山路">
                <defs>
                  <linearGradient id="taishanSky" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#dbe9e4" /><stop offset="1" stopColor="#f3e8d5" /></linearGradient>
                  <linearGradient id="taishanRock" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#a5b8a2" /><stop offset="1" stopColor="#728c80" /></linearGradient>
                </defs>
                <rect width="800" height="410" rx="22" fill="url(#taishanSky)" />
                <path d="M0 315 C95 282 151 294 227 252 C303 210 328 249 399 207 C486 156 535 188 606 130 C668 80 706 112 800 48 V410 H0Z" fill="url(#taishanRock)" opacity=".9" />
                <path d="M0 350 C124 302 185 337 278 289 C364 245 419 295 496 230 C590 152 645 202 800 95 V410 H0Z" fill="#5e7b72" opacity=".36" />
                <path d="M70 329 C170 310 220 275 292 258 C367 241 419 218 493 188 C577 155 653 115 735 72" fill="none" stroke="#f8f2e6" strokeWidth="7" strokeLinecap="round" strokeDasharray="4 11" opacity=".9" />
                <path d="M70 329 C170 310 220 275 292 258 C367 241 419 218 493 188 C577 155 653 115 735 72" fill="none" stroke="#b67f64" strokeWidth="3" strokeLinecap="round" pathLength="100" strokeDasharray="100" strokeDashoffset={100 - progress} className="taishan-route-progress" />
                <path d="M40 344 C94 326 128 335 173 316 M525 202 C580 180 616 177 673 138 M642 110 C677 89 710 90 758 60" fill="none" stroke="rgba(255,255,255,.42)" strokeWidth="2" strokeLinecap="round" />
                <circle cx="674" cy="57" r="24" fill="rgba(255,218,153,.33)" /><circle cx="674" cy="57" r="11" fill="#f0bd6c" />
              </svg>
              {stages.map((item, index) => {
                const coordinates = [{ left: '8%', top: '73%' }, { left: '34%', top: '57%' }, { left: '61%', top: '40%' }, { left: '87%', top: '15%' }][index];
                return <button type="button" className={'taishan-map-stop' + (selected === index ? ' is-selected' : '') + (reached >= index ? ' is-reached' : '')} style={coordinates} key={item.no} onClick={() => setSelected(index)} aria-label={'选择' + item.name} aria-pressed={selected === index}><span>{item.no}</span><strong>{item.name}</strong></button>;
              })}
              <div className="taishan-map-caption"><span>RED GATE</span><i>7.8 KM / ONE WAY</i><span>JADE EMPEROR PEAK</span></div>
            </div>
            <article className="taishan-stage-card" aria-live="polite">
              <div className="taishan-stage-card-top"><span>{stage.no} / 04</span><b>{stage.english}</b></div>
              <h3>{stage.name}</h3>
              <p>{stage.note}</p>
              <dl><div><dt>抵达时间</dt><dd>{stage.time}</dd></div><div><dt>海拔</dt><dd>{stage.elevation}</dd></div><div><dt>累计路程</dt><dd>{stage.distance}</dd></div></dl>
              <button type="button" className={'taishan-checkin' + (reached >= selected ? ' is-done' : '')} onClick={checkIn}>{reached >= selected ? '✓ 已在这里' : '我到这里了'} <b>↗</b></button>
            </article>
          </div>
        </section>

        <section className="taishan-pack" aria-labelledby="taishan-pack-title">
          <div className="taishan-section-head"><div><p>BEFORE YOU GO</p><h2 id="taishan-pack-title">轻一点上山，<em>刚刚好。</em></h2></div><span className={'taishan-pack-status' + (allPacked ? ' is-ready' : '')}>{allPacked ? 'READY TO WALK' : `${Object.values(checked).filter(Boolean).length} / 04 已准备`}</span></div>
          <div className="taishan-pack-list">{packingList.map((item) => <label className={'taishan-pack-item' + (checked[item.id] ? ' is-checked' : '')} key={item.id}><input type="checkbox" checked={Boolean(checked[item.id])} onChange={() => togglePacking(item.id)} /><span className="taishan-check" /><span><strong>{item.label}</strong><small>{item.sub}</small></span></label>)}</div>
        </section>

        <footer className="taishan-footer"><span>TAISHAN / WALK WITH THE MORNING</span><a href="/games/">回到全部记录 ↗</a></footer>
      </div>
    </main>
  );
}

const styles = String.raw`*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#edf1eb;color:#334d4a}.taishan-page{position:relative;min-height:100vh;overflow:hidden;background:linear-gradient(145deg,#edf3ef 0%,#f3efe5 53%,#f4e2cf 100%);font-family:Inter,system-ui,sans-serif}.taishan-mist{position:absolute;inset:0;pointer-events:none;opacity:.7;background:radial-gradient(ellipse at 84% 6%,rgba(255,224,173,.5),transparent 19rem),radial-gradient(ellipse at 4% 58%,rgba(188,214,205,.45),transparent 23rem)}.taishan-shell{position:relative;z-index:1;width:min(1080px,calc(100vw - 36px));margin:auto}.taishan-nav{display:flex;align-items:center;justify-content:space-between;min-height:64px;border-bottom:1px solid rgba(51,77,74,.16);color:#84918a;font-size:.62rem;letter-spacing:.11em}.taishan-nav a{color:#477067;text-decoration:none;letter-spacing:0}.taishan-nav b{color:#b27d62;font-size:.58rem;font-weight:600}.taishan-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,.7fr);gap:clamp(32px,7vw,100px);align-items:center;padding:64px 0 58px}.taishan-kicker,.taishan-section-head p{display:flex;align-items:center;gap:9px;margin:0;color:#5d837a;font-size:.63rem;font-weight:700;letter-spacing:.19em}.taishan-kicker i{width:7px;height:7px;border-radius:50%;background:#bf8068;box-shadow:0 0 0 5px rgba(191,128,104,.13)}.taishan-hero h1{max-width:600px;margin:19px 0 17px;color:#304f4d;font:400 clamp(2.65rem,6vw,4.8rem)/1.08 Georgia,serif;letter-spacing:-.09em}.taishan-hero h1 em{color:#b97763;font-style:italic}.taishan-lead{max-width:430px;margin:0;color:#71827c;font:1rem/1.85 Georgia,serif}.taishan-facts{display:flex;gap:26px;margin-top:31px}.taishan-facts span{display:grid;gap:3px;padding-left:13px;border-left:1px solid rgba(84,119,110,.28)}.taishan-facts strong{color:#476c66;font:500 1.13rem Georgia,serif}.taishan-facts small{color:#8e9a91;font-size:.53rem;letter-spacing:.12em}.taishan-sun-card{position:relative;min-height:282px;padding:23px 22px 20px;overflow:hidden;border:1px solid rgba(102,128,116,.2);border-radius:24px;background:rgba(255,253,246,.5);box-shadow:10px 14px 0 rgba(112,130,112,.07);transform:rotate(1.1deg)}.taishan-sun{position:absolute;top:-70px;right:-47px;width:220px;height:220px;border-radius:50%;background:radial-gradient(circle,#f5c67f 0 9%,rgba(245,198,127,.45) 10% 30%,rgba(245,198,127,0) 69%);animation:sunBreath 6s ease-in-out infinite}.taishan-sun span{position:absolute;inset:38px;border:1px solid rgba(213,151,95,.36);border-radius:50%}.taishan-sun-meta{position:relative;display:flex;justify-content:space-between;color:#8a948c;font-size:.52rem;letter-spacing:.12em}.taishan-sun-meta b{color:#b88166;font-weight:500}.taishan-sun-card p{position:relative;max-width:230px;margin:110px 0 25px;color:#4d6864;font:1.08rem/1.65 Georgia,serif}.taishan-sun-line{position:relative;display:flex;align-items:center;gap:12px;color:#8c968f;font-size:.55rem;letter-spacing:.08em}.taishan-sun-line i{display:block;width:80px;height:2px;background:#c08068;transform-origin:left;transition:width .55s}.taishan-route,.taishan-pack{padding:28px 0 54px;border-top:1px solid rgba(51,77,74,.16)}.taishan-section-head{display:flex;align-items:end;justify-content:space-between;gap:30px;margin-bottom:24px}.taishan-section-head h2{margin:10px 0 0;color:#385957;font:400 clamp(1.65rem,3.4vw,2.55rem) Georgia,serif;letter-spacing:-.065em}.taishan-section-head h2 em{color:#bb7e68;font-style:italic}.taishan-current,.taishan-pack-status{padding:7px 10px;border:1px solid rgba(72,112,103,.2);border-radius:99px;color:#66847b;font-size:.58rem;letter-spacing:.08em;white-space:nowrap}.taishan-pack-status.is-ready{border-color:rgba(102,145,103,.35);color:#648c6d;background:rgba(229,242,226,.5)}.taishan-map-layout{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(250px,.62fr);gap:clamp(20px,5vw,56px);align-items:stretch}.taishan-map{position:relative;min-height:430px;overflow:hidden;border:1px solid rgba(89,119,108,.2);border-radius:22px;background:#dce9e2;box-shadow:9px 11px 0 rgba(93,120,105,.08)}.taishan-map svg{display:block;width:100%;height:100%;min-height:430px}.taishan-map-stop{position:absolute;z-index:2;display:flex;align-items:center;gap:6px;padding:0;border:0;background:none;color:#385b57;cursor:pointer;transform:translate(-50%,-50%)}.taishan-map-stop span{display:grid;place-items:center;width:24px;height:24px;border:2px solid #f8f4e9;border-radius:50%;background:#a5b9a7;color:#fff;font-size:.52rem;box-shadow:0 2px 0 rgba(54,85,77,.2);transition:transform .3s,background .3s}.taishan-map-stop strong{padding:4px 7px;border-radius:4px;background:rgba(249,247,237,.78);color:#55736d;font:400 .7rem Georgia,serif;white-space:nowrap;box-shadow:0 2px 5px rgba(61,91,83,.06)}.taishan-map-stop.is-reached span{background:#b97c65}.taishan-map-stop.is-selected span{transform:scale(1.32);background:#b97c65;box-shadow:0 0 0 5px rgba(185,124,101,.15),0 2px 0 rgba(54,85,77,.2)}.taishan-map-stop.is-selected strong{color:#a96755}.taishan-route-progress{transition:stroke-dashoffset .8s ease}.taishan-map-caption{position:absolute;left:18px;right:18px;bottom:14px;z-index:2;display:flex;justify-content:space-between;color:rgba(66,97,90,.63);font-size:.49rem;letter-spacing:.12em}.taishan-map-caption i{font-style:normal;color:#b47c67}.taishan-stage-card{display:flex;flex-direction:column;padding:20px 0 5px;border-top:2px solid var(--stage-tone);transition:border-color .35s}.taishan-stage-card-top{display:flex;justify-content:space-between;gap:10px;color:#9a9b8d;font-size:.54rem;letter-spacing:.11em}.taishan-stage-card-top b{color:var(--stage-tone);font-weight:500;text-align:right}.taishan-stage-card h3{margin:36px 0 11px;color:#3b5b56;font:400 2.1rem Georgia,serif;letter-spacing:-.06em}.taishan-stage-card>p{margin:0;color:#75867f;font:.88rem/1.85 Georgia,serif}.taishan-stage-card dl{display:grid;gap:12px;margin:26px 0 0;padding-top:17px;border-top:1px dashed rgba(80,112,101,.28)}.taishan-stage-card dl div{display:flex;justify-content:space-between;gap:15px}.taishan-stage-card dt{color:#9a9e91;font-size:.54rem;letter-spacing:.1em}.taishan-stage-card dd{margin:0;color:#55736d;font:.76rem Georgia,serif}.taishan-checkin{display:flex;align-items:center;justify-content:space-between;margin-top:auto;padding:12px 0;border:0;border-bottom:1px solid #b9c7bc;background:none;color:#9d6a57;font-size:.66rem;letter-spacing:.06em;cursor:pointer}.taishan-checkin b{font-size:1rem;font-weight:400;transition:transform .25s}.taishan-checkin:hover b{transform:translate(3px,-3px)}.taishan-checkin.is-done{color:#678b6e}.taishan-pack{padding-bottom:60px}.taishan-pack-list{display:grid;grid-template-columns:repeat(4,1fr);gap:9px}.taishan-pack-item{display:flex;align-items:center;gap:10px;min-height:76px;padding:12px;border:1px solid rgba(86,118,104,.17);border-radius:12px;background:rgba(255,253,246,.42);cursor:pointer;transition:transform .25s,background .25s,border-color .25s}.taishan-pack-item:hover{transform:translateY(-2px);background:rgba(255,253,246,.78)}.taishan-pack-item input{position:absolute;opacity:0;pointer-events:none}.taishan-check{position:relative;flex:0 0 17px;width:17px;height:17px;border:1px solid #9eb0a5;border-radius:50%;transition:.25s}.taishan-check:after{content:'✓';position:absolute;inset:0;display:grid;place-items:center;color:#fff;font-size:.62rem;opacity:0}.taishan-pack-item strong{display:block;color:#53736a;font:400 .78rem Georgia,serif}.taishan-pack-item small{display:block;margin-top:4px;color:#98a199;font-size:.52rem}.taishan-pack-item.is-checked{border-color:rgba(105,145,105,.35);background:rgba(234,242,226,.7)}.taishan-pack-item.is-checked .taishan-check{border-color:#719875;background:#719875}.taishan-pack-item.is-checked .taishan-check:after{opacity:1}.taishan-footer{display:flex;justify-content:space-between;padding:22px 0 34px;border-top:1px solid rgba(51,77,74,.16);color:#8b978e;font-size:.55rem;letter-spacing:.13em}.taishan-footer a{color:#557c70;text-decoration:none;letter-spacing:0}@keyframes sunBreath{0%,100%{transform:scale(1);opacity:.86}50%{transform:scale(1.06);opacity:1}}@media(max-width:760px){.taishan-shell{width:min(100% - 28px,620px)}.taishan-nav span{display:none}.taishan-hero{grid-template-columns:1fr;gap:28px;padding:44px 0 42px}.taishan-hero h1{font-size:clamp(2.7rem,12vw,4.2rem)}.taishan-lead{font-size:.94rem}.taishan-facts{gap:18px;margin-top:25px}.taishan-facts strong{font-size:1rem}.taishan-sun-card{min-height:245px}.taishan-sun-card p{margin-top:91px}.taishan-route,.taishan-pack{padding-top:24px}.taishan-section-head{display:block;margin-bottom:20px}.taishan-current,.taishan-pack-status{display:inline-block;margin-top:14px}.taishan-map-layout{grid-template-columns:1fr;gap:25px}.taishan-map{min-height:270px;border-radius:17px}.taishan-map svg{min-height:270px}.taishan-map-stop strong{font-size:.62rem}.taishan-map-stop span{width:22px;height:22px}.taishan-stage-card{min-height:310px;padding-top:16px}.taishan-stage-card h3{margin-top:28px;font-size:1.9rem}.taishan-pack-list{grid-template-columns:1fr 1fr;gap:8px}.taishan-pack-item{min-height:70px;padding:10px}.taishan-footer{font-size:.48rem}}@media(max-width:420px){.taishan-hero{padding-top:35px}.taishan-facts{gap:12px}.taishan-facts span{padding-left:8px}.taishan-facts small{font-size:.46rem}.taishan-sun-card{min-height:228px}.taishan-sun-card p{margin-top:80px;font-size:1rem}.taishan-map-caption{left:11px;right:11px;font-size:.4rem}.taishan-map-stop strong{padding:3px 5px;font-size:.55rem}.taishan-pack-list{grid-template-columns:1fr}.taishan-footer{display:block}.taishan-footer a{display:block;margin-top:10px}}@media(prefers-reduced-motion:reduce){.taishan-sun,.taishan-route-progress,.taishan-pack-item,.taishan-checkin b{animation:none;transition:none}}`;
