import { useId, useState } from 'react';
import { binaryMessages, fuseGaussian, trajectoryEstimate } from '../../lib/factorGraphMath.mjs';

const number = (n) => n.toFixed(4);
function Slider({ label, value, onChange, min, max, step = 0.05 }) {
  const id = useId();
  return <label htmlFor={id}><span>{label}：<strong>{Number(value).toFixed(2)}</strong></span><input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} /></label>;
}

function Fusion() {
  const [z, setZ] = useState(4);
  const [sigma, setSigma] = useState(2);
  const result = fuseGaussian(z, sigma);
  const curves = [...result.factors.map((f) => ({ ...f, color: '#879480' })), { mean: result.mean, sigma: Math.sqrt(result.variance), color: '#a14f38' }];
  const peak = Math.max(...curves.map((f) => 1 / f.sigma));
  const path = (f) => Array.from({ length: 181 }, (_, i) => {
    const x = -4 + i / 15;
    const height = Math.exp(-0.5 * ((x - f.mean) / f.sigma) ** 2) / f.sigma;
    return `${i === 0 ? 'M' : 'L'}${30 + i * 3},${180 - height / peak * 145}`;
  }).join(' ');
  return <>
    <h3>实验：哪只传感器更能影响结果？</h3>
    <p>先验固定为 N(0, 4)，A 为 2 ± 1 m。改变 B 的读数与标准差，先预测结果向哪边移动，再观察曲线。</p>
    <div className="fg-lab-controls"><Slider label="B 的读数（m）" value={z} onChange={setZ} min={-2} max={6} step={0.1} /><Slider label="B 的标准差（m）" value={sigma} onChange={setSigma} min={0.2} max={4} step={0.1} /></div>
    <svg viewBox="0 0 600 215" role="img" aria-label={`三个灰绿证据曲线与棕色后验密度曲线。后验均值 ${number(result.mean)} 米，标准差 ${number(Math.sqrt(result.variance))} 米。`}>
      <path d="M30 180H570" stroke="#b6c0b0" />
      {curves.map((f, i) => <path key={i} d={path(f)} fill="none" stroke={f.color} strokeWidth={i === 3 ? 3 : 1.5} strokeDasharray={i === 0 ? '5 4' : undefined} />)}
      {[-4, -2, 0, 2, 4, 6, 8].map((x) => <text key={x} x={30 + (x + 4) * 45} y="203" textAnchor="middle" fill="#69716a" fontSize="13">{x} m</text>)}
    </svg>
    <div className="fg-lab-output" aria-live="polite"><p>后验均值 <strong>{number(result.mean)} m</strong> · 方差 <strong>{number(result.variance)} m²</strong></p><p>信息权重：先验 0.25，A 1.00，B {number(1 / sigma ** 2)}。</p></div>
    <p className="fg-fine">灰绿：各证据的归一化高斯形状（先验为虚线）；棕色：后验。纵轴共用一个缩放系数，横轴显示 −4 到 8 m，宽曲线的尾部可能超出画面。B 的观测值已固定，绘制的是似然随 x 的形状。</p>
    <button type="button" onClick={() => { setZ(4); setSigma(2); }}>恢复课文数值</button>
  </>;
}

function Messages() {
  const [prior, setPrior] = useState(0.4);
  const [agreement, setAgreement] = useState(0.9);
  const [evidence, setEvidence] = useState(0.8);
  const [step, setStep] = useState(0);
  const result = binaryMessages(prior, agreement, evidence);
  const vector = (v) => `[${v.map(number).join(', ')}]`;
  const stages = [
    ['① 从观测叶子出发', `e → x₂ = ${vector(result.evidence)}；x₂ → f 原样转交。`],
    ['② 关系因子消去 x₂', `f → x₁ = ${vector(result.message)}。每个分量对 x₂ 的两种取值求和。`],
    ['③ 与先验相乘并归一化', `p(x₁ | z) = ${vector(result.marginalOne)}；归一化常数 Z = ${number(result.partition)}。`],
    ['④ 反向计算另一个边缘', `x₁ → f = ${vector(result.prior)}；f → x₂ = ${vector(result.forward)}；p(x₂ | z) = ${vector(result.marginalTwo)}。`],
  ];
  return <>
    <h3>实验：沿着树传一条消息</h3>
    <p>向量顺序都是 [状态 0，状态 1]。关系因子“相同”取 a，“不同”取 1 − a；观测似然是 [1 − e，e]。本例采用对称的二值传感器模型。</p>
    <div className="fg-lab-controls"><Slider label="先验 P(x₁ = 1)" value={prior} onChange={setPrior} min={0.05} max={0.95} /><Slider label="关系因子相同权重 a" value={agreement} onChange={setAgreement} min={0.05} max={0.95} /><Slider label="观测似然 e" value={evidence} onChange={setEvidence} min={0.05} max={0.95} /></div>
    <div className="fg-lab-output" aria-live="polite"><strong>{stages[step][0]}</strong><p className="fg-message">{stages[step][1]}</p>
      {step >= 2 && <div className="fg-bars"><span>P(x₁ = 1 | z) = {number(result.marginalOne[1])}</span><div className="fg-bar"><span style={{ width: `${100 * result.marginalOne[1]}%` }} /></div>{step === 3 && <><span>P(x₂ = 1 | z) = {number(result.marginalTwo[1])}</span><div className="fg-bar"><span style={{ width: `${100 * result.marginalTwo[1]}%` }} /></div></>}</div>}
    </div>
    <div className="fg-lab-actions"><button type="button" onClick={() => setStep((value) => (value + 1) % stages.length)}>{step === 3 ? '重新走一遍' : '下一步消息 →'}</button><button type="button" onClick={() => { setPrior(0.4); setAgreement(0.9); setEvidence(0.8); setStep(0); }}>恢复课文数值</button></div>
    <p className="fg-fine">试着把 a 调成 0.50：此时 x₂ 的证据无法改变 x₁ 的先验。再调成 0.10，观察偏好相反状态的关系如何传递证据。</p>
  </>;
}

function Trajectory() {
  const [observation, setObservation] = useState(2.4);
  const [sigma, setSigma] = useState(0.5);
  const [loop, setLoop] = useState(false);
  const [absolute, setAbsolute] = useState(true);
  const result = trajectoryEstimate({ observation, sigma, loop, absolute });
  const values = result.state || [0, 1, 2];
  const minimum = Math.min(-0.5, ...values, observation) - 0.2;
  const maximum = Math.max(3, ...values, observation) + 0.2;
  const y = (v) => 185 - (v - minimum) / (maximum - minimum) * 150;
  return <>
    <h3>实验：让整条轨迹一起调整</h3>
    <p>运动观测都是 +1 m，标准差 0.5 m；先验 x₀ = 0 ± 1 m。可添加 x₂ − x₀ = 2 ± 0.2 m 的回环。末端观测会通过共享变量影响过去的位置。</p>
    <div className="fg-lab-controls"><Slider label="末端观测 z₂（m）" value={observation} onChange={setObservation} min={1} max={5} step={0.1} /><Slider label="末端标准差（m）" value={sigma} onChange={setSigma} min={0.2} max={2} step={0.1} /><label className="fg-toggle"><input type="checkbox" checked={loop} onChange={(e) => setLoop(e.target.checked)} />加入回环因子</label><label className="fg-toggle"><input type="checkbox" checked={absolute} onChange={(e) => setAbsolute(e.target.checked)} />保留绝对约束（先验与末端观测）</label></div>
    {result.error ? <div className="fg-lab-output" role="status"><strong>解不唯一：整条轨迹可以任意平移。</strong><p>这里只剩相对位移。即使添加回环，[0, 1, 2] 和 [10, 11, 12] 也具有相同代价。恢复绝对约束后才能报告唯一的位置估计。</p></div> : <>
      <svg viewBox="0 0 600 225" role="img" aria-label={`轨迹估计：${result.state.map(number).join('、')} 米。灰色虚线为运动累积值 0、1、2 米；棕色实线为联合估计。`}>
        <path d={`M90 ${y(0)}L300 ${y(1)}L510 ${y(2)}`} fill="none" stroke="#879480" strokeDasharray="5 5" strokeWidth="2" />
        <path d={values.map((v, i) => `${i ? 'L' : 'M'}${90 + i * 210} ${y(v)}`).join(' ')} fill="none" stroke="#a14f38" strokeWidth="2.5" />
        {values.map((v, i) => <g key={i}><circle cx={90 + i * 210} cy={y(v)} r="6" fill="#a14f38" /><text x={90 + i * 210} y={y(v) - 14} textAnchor="middle" fill="#344832" fontSize="14">{v.toFixed(3)} m</text><text x={90 + i * 210} y="217" textAnchor="middle" fill="#69716a" fontSize="14">x{i}</text></g>)}
        <path d={`M498 ${y(observation)}h24m-12 -7v14`} stroke="#526b48" strokeWidth="2" />
      </svg>
      <p className="fg-fine">横轴为时刻；纵向高度为位置。灰色虚线：只累积运动的轨迹；棕色实线：联合估计；绿色十字：末端观测。</p>
      <div className="fg-lab-output" aria-live="polite"><p>估计 x = [{result.state.map(number).join(', ')}] m</p><p>总目标 F = ½ ∑ 白化残差² = <strong>{number(result.cost)}</strong></p><p className="fg-message">{result.residuals.map((f) => `${f.name}：${number(f.whitened)}`).join('；')}</p></div>
    </>}
    <div className="fg-lab-actions"><button type="button" onClick={() => { setObservation(2.4); setSigma(0.5); setLoop(false); setAbsolute(true); }}>恢复课文数值</button></div>
    <p className="fg-fine">先把末端读数改成 5，观察错误观测如何拉动全局；再增大它的标准差。这里使用普通最小二乘，没有自动识别异常值。</p>
  </>;
}

export default function FactorGraphLab({ mode = 'fusion' }) {
  return <section className="fg-lab" aria-label="因子图交互实验">{mode === 'messages' ? <Messages /> : mode === 'trajectory' ? <Trajectory /> : <Fusion />}<noscript><p>当前展示默认参数的计算结果。启用 JavaScript 后可调整参数；下方正文也提供完整手算过程。</p></noscript></section>;
}
