export default function FirstMeetingMemory() {
  return (
    <main className="fm-page">
      <div className="fm-shell">
        <header className="fm-nav">
          <a className="fm-back" href="/games/">
            <span aria-hidden="true">←</span>
            <span>记忆首页</span>
          </a>
          <p className="fm-archive">
            MEMORY ARCHIVE
            <span>NO. 01</span>
          </p>
        </header>

        <section className="fm-hero" aria-labelledby="fm-title">
          <div className="fm-date-block" aria-label="2025 年 10 月 18 日">
            <span className="fm-overline">THE BEGINNING</span>
            <p className="fm-date">10<span>.</span>18</p>
            <div className="fm-year-line">
              <span>OCTOBER</span>
              <span>2025</span>
            </div>
          </div>

          <div className="fm-hero-copy">
            <p className="fm-kicker"><span>01</span> 记忆档案</p>
            <h1 id="fm-title">第一次<br /><span>相遇</span></h1>
            <p className="fm-date-caption">计时与记忆的共同起点</p>
            <p className="fm-lead">
              从 2025 年 10 月 18 日起，首页计时器开始向前。日子不断增加，而这一天一直留在故事最前面。
            </p>
          </div>
        </section>

        <section className="fm-note" aria-labelledby="fm-note-title">
          <div className="fm-note-index">
            <span>01</span>
            <span>留在时间里</span>
          </div>
          <div className="fm-note-copy">
            <h2 id="fm-note-title">日子向前，<br />第一页留在这里。</h2>
            <p>
              以后还会有新的日期和故事，而 2025 年 10 月 18 日，始终是这段记忆的开端。
            </p>
          </div>
        </section>

        <section className="fm-details" aria-label="档案信息">
          <div className="fm-detail"><span>日期</span><strong>2025.10.18</strong></div>
          <div className="fm-detail"><span>档案编号</span><strong>记忆档案 · 01</strong></div>
          <div className="fm-detail"><span>时间线位置</span><strong>故事的起点</strong></div>
        </section>

        <footer className="fm-footer">
          <span>OPENING ENTRY / 001</span>
          <a href="/games/">回到记忆时间线 <span aria-hidden="true">↗</span></a>
        </footer>
      </div>
    </main>
  );
}
