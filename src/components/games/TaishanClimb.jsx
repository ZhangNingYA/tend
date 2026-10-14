import { useEffect, useState } from 'react';
import '../../styles/taishan-memory.css';

const memories = [
  { no: '01', time: '04:30', place: '红门', altitude: '150 m', title: '天还没有亮，我们先出发了。', text: '红门前的路灯还亮着，四周安静得只听见脚步声。那时我们还不知道，今天会一起走过这么长的台阶。', mark: '山脚的风还带着夜色' },
  { no: '02', time: '06:10', place: '中天门', altitude: '847 m', title: '回头的时候，城市已经醒了。', text: '我们在中天门停下来喝水，也回头看了一眼来时的路。远处的城市一点点亮起来，像有人替这趟旅程开了灯。', mark: '把一口气和一座城都收进眼里' },
  { no: '03', time: '08:20', place: '南天门', altitude: '1,460 m', title: '云从脚边经过，我们也快到山顶了。', text: '南天门的风比想象中更大。你说再走一会儿就好，于是那些原本漫长的台阶，忽然也有了尽头。', mark: '风把疲惫吹成了很轻的事' },
  { no: '04', time: '09:00', place: '玉皇顶', altitude: '1,545 m', title: '到了最高处，太阳刚好升起来。', text: '我们终于站在玉皇顶。没有很隆重的仪式，只有一起看完的那片光，和一句现在想起来仍然很开心的“我们做到了”。', mark: '这一天，值得被好好记住' },
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
      // The page remains readable when local storage is unavailable.
    }
  }, []);

  const saveMemory = () => {
    setSaved(true);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({ type: 'taishan-memory', selected, note: note.trim(), saved: true, updatedAt: new Date().toISOString() }));
    } catch {
      // The keepsake still works without local storage.
    }
  };

  return (
    <main className="taishan-memory-page">
      <div className="taishan-memory-wrap">
        <nav className="taishan-memory-nav"><a href="/games/">← 记忆索引</a><span>TRAVEL NOTE / 02</span><b>2026.08.08</b></nav>
        <header className="taishan-memory-intro">
          <div className="taishan-memory-intro-copy"><p className="taishan-memory-label">TAISHAN · SHANDONG</p><p className="taishan-memory-date">2026 年 8 月 8 日</p><h1>爬泰山的<br /><em>那一天。</em></h1><p className="taishan-memory-lede">从夜里出发，在太阳升起的时候抵达。这里不记录攻略，只保存我们一起走过的路。</p><dl className="taishan-memory-facts"><div><dt>路程</dt><dd>7.8 km</dd></div><div><dt>最高处</dt><dd>1,545 m</dd></div><div><dt>出发</dt><dd>04:30</dd></div></dl></div>
          <figure className="taishan-memory-cover"><div className="taishan-memory-cover-art" aria-hidden="true"><span /><i /><i /><i /></div><figcaption><strong>我们到过这里</strong><span>THE MORNING WE KEPT</span></figcaption><small>08 / AUG / 2026</small></figure>
        </header>

        <section className="taishan-memory-section" aria-labelledby="taishan-moments-title"><div className="taishan-memory-heading"><div><p>FOUR MOMENTS</p><h2 id="taishan-moments-title">一路上的四个时刻</h2></div><span>点击回看</span></div><div className="taishan-moments-layout"><div className="taishan-moment-list" role="tablist" aria-label="泰山旅程回忆">{memories.map((item, index) => <button type="button" role="tab" aria-selected={selected === index} className={'taishan-moment' + (selected === index ? ' is-selected' : '')} key={item.no} onClick={() => { setSelected(index); setSaved(false); }}><span className="taishan-moment-number">{item.no}</span><span><strong>{item.place}</strong><small>{item.time} · {item.mark}</small></span><b>↗</b></button>)}</div><article className="taishan-moment-detail" aria-live="polite"><header><span>{memory.time} · {memory.place}</span><b>{memory.altitude}</b></header><h3>{memory.title}</h3><p>{memory.text}</p><footer><span>{memory.no} / 04</span><span>TAISHAN MEMORY</span></footer></article></div></section>

        <section className="taishan-memory-letter" aria-labelledby="taishan-letter-title"><div><p>ONE LINE TO KEEP</p><h2 id="taishan-letter-title">给那天留一句话</h2><span>写给以后再打开这页的我们。</span></div><form onSubmit={(event) => { event.preventDefault(); if (note.trim()) saveMemory(); }}><label htmlFor="taishan-note">这一天后来被你记成了什么？</label><textarea id="taishan-note" value={note} maxLength={100} onChange={(event) => { setNote(event.target.value); setSaved(false); }} placeholder="比如：山顶的风很大，但我们笑得更大声。" rows="3" /><div><small>{note.length} / 100</small><button type="submit" disabled={!note.trim()}>{saved ? '✓ 已收好' : '收进回忆'}</button></div><p aria-live="polite">{saved ? '这句话和那天一起被保存了。' : ' '}</p></form></section>
        <footer className="taishan-memory-footer"><span>NOT A GUIDE · A DAY WE REMEMBER</span><a href="/games/">回到全部记录 ↗</a></footer>
      </div>
    </main>
  );
}
