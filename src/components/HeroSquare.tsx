import type { FC } from 'react';

const HeroSquare: FC = () => {
  const css = `
    @keyframes flow { to { stroke-dashoffset: -20 } }
    @keyframes ring {
      0%   { transform: scale(1);   opacity: .55 }
      100% { transform: scale(2.4); opacity: 0   }
    }
    @keyframes blink {
      0%, 100% { opacity: 1   }
      50%       { opacity: .12 }
    }
    .hs-lv  { stroke-dasharray: 5 4; stroke-width: 1.5; fill: none; animation: flow 1.9s linear infinite; }
    .hs-lv2 { stroke-dasharray: 5 4; stroke-width: 1.5; fill: none; animation: flow 1.9s linear infinite .95s; }
    .hs-rng  { transform-box: fill-box; transform-origin: center; animation: ring 3s ease-out infinite;      fill: none; stroke: #1BC9E4; stroke-width: .8; }
    .hs-rng2 { transform-box: fill-box; transform-origin: center; animation: ring 3s ease-out infinite 1.5s; fill: none; stroke: #1BC9E4; stroke-width: .8; }
    .hs-bk  { animation: blink 2.1s ease-in-out infinite; }
    .hs-bk2 { animation: blink 2.6s ease-in-out infinite .85s; }
  `;

  return (
    <div style={{ width: '100%', aspectRatio: '1', maxWidth: 560, margin: '0 auto' }}>
      <style>{css}</style>

      <svg width="100%" height="100%" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">

        {/* Background */}
        <rect width="500" height="500" rx="14" fill="#060A20" />

        {/* Circuit grid */}
        <g opacity=".05" stroke="#1BC9E4" strokeWidth=".5">
          <line x1="0" y1="62"  x2="500" y2="62"  />
          <line x1="0" y1="125" x2="500" y2="125" />
          <line x1="0" y1="187" x2="500" y2="187" />
          <line x1="0" y1="250" x2="500" y2="250" />
          <line x1="0" y1="312" x2="500" y2="312" />
          <line x1="0" y1="375" x2="500" y2="375" />
          <line x1="0" y1="437" x2="500" y2="437" />
          <line x1="62"  y1="0" x2="62"  y2="500" />
          <line x1="125" y1="0" x2="125" y2="500" />
          <line x1="187" y1="0" x2="187" y2="500" />
          <line x1="250" y1="0" x2="250" y2="500" />
          <line x1="312" y1="0" x2="312" y2="500" />
          <line x1="375" y1="0" x2="375" y2="500" />
          <line x1="437" y1="0" x2="437" y2="500" />
        </g>

        {/* Grid intersection dots */}
        <g fill="#1BC9E4" opacity=".09">
          <circle cx="62"  cy="62"  r="1.5" />
          <circle cx="125" cy="62"  r="1.5" />
          <circle cx="375" cy="62"  r="1.5" />
          <circle cx="437" cy="62"  r="1.5" />
          <circle cx="62"  cy="437" r="1.5" />
          <circle cx="125" cy="437" r="1.5" />
          <circle cx="375" cy="437" r="1.5" />
          <circle cx="437" cy="437" r="1.5" />
          <circle cx="62"  cy="187" r="1.5" />
          <circle cx="437" cy="187" r="1.5" />
          <circle cx="62"  cy="312" r="1.5" />
          <circle cx="437" cy="312" r="1.5" />
        </g>

        {/* Corner brackets */}
        <g stroke="#1BC9E4" strokeWidth="1" fill="none" opacity=".3">
          <path d="M22 42 L22 18 L46 18"       />
          <path d="M478 42 L478 18 L454 18"    />
          <path d="M22 458 L22 482 L46 482"    />
          <path d="M478 458 L478 482 L454 482" />
        </g>

        {/* Subtle circuit traces */}
        <g stroke="#53709A" strokeWidth=".5" fill="none" opacity=".18">
          <path d="M62 125 L125 125 L125 187"  />
          <path d="M437 375 L375 375 L375 312" />
          <path d="M62 375 L125 375 L125 312"  />
          <path d="M437 125 L375 125 L375 187" />
        </g>

        {/* Connection lines */}
        <line x1="250" y1="210" x2="250" y2="105" stroke="#1BC9E4" className="hs-lv"  />
        <line x1="250" y1="290" x2="250" y2="392" stroke="#1BC9E4" className="hs-lv2" />
        <line x1="127" y1="250" x2="210" y2="250" stroke="#1BC9E4" className="hs-lv"  />
        <line x1="290" y1="250" x2="372" y2="250" stroke="#1BC9E4" className="hs-lv2" />

        {/* Pulse rings */}
        <circle className="hs-rng"  cx="250" cy="250" r="55" />
        <circle className="hs-rng2" cx="250" cy="250" r="55" />

        {/* Junction dots: hub side */}
        <circle cx="250" cy="210" r="3" fill="#1BC9E4" className="hs-bk2" />
        <circle cx="250" cy="290" r="3" fill="#1BC9E4" className="hs-bk"  />
        <circle cx="210" cy="250" r="3" fill="#1BC9E4" className="hs-bk2" />
        <circle cx="290" cy="250" r="3" fill="#1BC9E4" className="hs-bk"  />
        {/* Junction dots: node side */}
        <circle cx="250" cy="105" r="3" fill="#53709A" />
        <circle cx="250" cy="392" r="3" fill="#53709A" />
        <circle cx="127" cy="250" r="3" fill="#53709A" />
        <circle cx="372" cy="250" r="3" fill="#53709A" />

        {/* ── CENTRAL HUB ── */}
        <g transform="translate(250,250)">
          <circle r="44" fill="none" stroke="#224B61" strokeWidth="1.5" />
          <rect x="-26" y="-26" width="52" height="52" rx="6" fill="#224B61" stroke="#1BC9E4" strokeWidth="1.5" />
          <rect x="-17" y="-17" width="34" height="34" rx="3" fill="#060A20" />
          {/* Pins: top */}
          <line x1="-8" y1="-26" x2="-8" y2="-36" stroke="#1BC9E4" strokeWidth="1.5" />
          <line x1="0"  y1="-26" x2="0"  y2="-36" stroke="#1BC9E4" strokeWidth="1.5" />
          <line x1="8"  y1="-26" x2="8"  y2="-36" stroke="#1BC9E4" strokeWidth="1.5" />
          {/* Pins: bottom */}
          <line x1="-8" y1="26" x2="-8" y2="36" stroke="#1BC9E4" strokeWidth="1.5" />
          <line x1="0"  y1="26" x2="0"  y2="36" stroke="#1BC9E4" strokeWidth="1.5" />
          <line x1="8"  y1="26" x2="8"  y2="36" stroke="#1BC9E4" strokeWidth="1.5" />
          {/* Pins: left */}
          <line x1="-26" y1="-8" x2="-36" y2="-8" stroke="#1BC9E4" strokeWidth="1.5" />
          <line x1="-26" y1="0"  x2="-36" y2="0"  stroke="#1BC9E4" strokeWidth="1.5" />
          <line x1="-26" y1="8"  x2="-36" y2="8"  stroke="#1BC9E4" strokeWidth="1.5" />
          {/* Pins: right */}
          <line x1="26" y1="-8" x2="36" y2="-8" stroke="#1BC9E4" strokeWidth="1.5" />
          <line x1="26" y1="0"  x2="36" y2="0"  stroke="#1BC9E4" strokeWidth="1.5" />
          <line x1="26" y1="8"  x2="36" y2="8"  stroke="#1BC9E4" strokeWidth="1.5" />
          {/* Inner trace lines */}
          <line x1="-17" y1="-5" x2="17" y2="-5" stroke="#224B61" strokeWidth=".8" />
          <line x1="-17" y1="5"  x2="17" y2="5"  stroke="#224B61" strokeWidth=".8" />
          {/* Core dot */}
          <circle r="8" fill="#1BC9E4" />
          <circle r="3.5" fill="#060A20" className="hs-bk" />
        </g>

        <text x="250" y="308" fontSize="14" fill="#1BC9E4" textAnchor="middle" fontFamily="monospace" letterSpacing="1.8" opacity=".55">OPTIMEERITUD</text>
        <text x="250" y="320" fontSize="14" fill="#1BC9E4" textAnchor="middle" fontFamily="monospace" letterSpacing="1.8" opacity=".55">PROTSESSID</text>

        {/* ── SECURITY NODE (top) ── */}
        <g transform="translate(250,75)">
          <rect x="-68" y="-30" width="136" height="60" rx="7" fill="#224B61" stroke="#1BC9E4" strokeWidth="1" />
          <rect x="-68" y="-30" width="136" height="3"  rx="1" fill="#1BC9E4" opacity=".6" />
          <rect x="-55" y="-6" width="19" height="16" rx="3" fill="#1BC9E4" />
          <path d="M-50,-6 L-50,-13 A6,6 0 0 1 -38,-13 L-38,-6" fill="none" stroke="#1BC9E4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="-45.5" cy="3" r="2" fill="#060A20" />
          <rect x="-47" y="4" width="3" height="3" fill="#060A20" />
          <text x="-24" y="2"  fontSize="13" fill="#1BC9E4" fontFamily="monospace" fontWeight="500" letterSpacing=".5">TURVALISUS</text>
          <text x="-24" y="16" fontSize="11" fill="#A8C1D9" fontFamily="monospace">ISO 27001</text>
          <circle cx="55" cy="-18" r="3.5" fill="#1BC9E4" className="hs-bk" />
        </g>

        {/* ── DATA NODE (bottom) ── */}
        <g transform="translate(250,422)">
          <rect x="-74" y="-30" width="148" height="60" rx="7" fill="#224B61" stroke="#1BC9E4" strokeWidth="1" />
          <rect x="-74" y="27"  width="148" height="3"  rx="1" fill="#1BC9E4" opacity=".4" />
          <rect x="-62" y="-14" width="26" height="6" rx="2" fill="#1BC9E4" />
          <rect x="-62" y="-6"  width="26" height="6" rx="2" fill="#1BC9E4" opacity=".58" />
          <rect x="-62" y="2"   width="26" height="6" rx="2" fill="#1BC9E4" opacity=".3"  />
          <circle cx="-43" cy="-11" r="1.5" fill="#B5BAC2" className="hs-bk"  />
          <circle cx="-43" cy="-3"  r="1.5" fill="#B5BAC2" className="hs-bk2" />
          <text x="-27" y="-9" fontSize="13" fill="#1BC9E4" fontFamily="monospace" fontWeight="500" letterSpacing=".5">KORRASTATUD</text>
          <text x="-27" y="6"  fontSize="13" fill="#1BC9E4" fontFamily="monospace" fontWeight="500" letterSpacing=".5">ANDMED</text>
          <text x="-27" y="20" fontSize="10" fill="#A8C1D9" fontFamily="monospace">24/7 monitooring</text>
        </g>

        {/* ── CLIENTS NODE (left) ── */}
        <g transform="translate(68,250)">
          <rect x="-59" y="-48" width="118" height="40" rx="6" fill="#224B61" stroke="#53709A" strokeWidth=".8" />
          <rect x="-59" y="-48" width="3"   height="40" rx="1" fill="#1BC9E4" opacity=".5" />
          <text x="-3" y="-30" fontSize="13" fill="#1BC9E4" fontFamily="monospace" textAnchor="middle" fontWeight="500" letterSpacing=".5">KLIENDID</text>
          <text x="0"  y="-14" fontSize="10" fill="#A8C1D9" fontFamily="monospace" textAnchor="middle">andmevoog</text>
          <rect x="-59" y="-4" width="118" height="40" rx="6" fill="#224B61" stroke="#53709A" strokeWidth=".8" opacity=".75" />
          <rect x="-59" y="-4" width="3"   height="40" rx="1" fill="#53709A" opacity=".5" />
          <text x="0" y="18" fontSize="13" fill="#1BC9E4" fontFamily="monospace" textAnchor="middle" fontWeight="500" letterSpacing=".5">TARNIJAD</text>
          <text x="0" y="28" fontSize="10" fill="#A8C1D9" fontFamily="monospace" textAnchor="middle">integratsioon</text>
        </g>

        {/* ── GROWTH NODE (right) ── */}
        <g transform="translate(432,250)">
          <rect x="-60" y="-46" width="120" height="92" rx="7" fill="#224B61" stroke="#53709A" strokeWidth="1" />
          <rect x="57"  y="-46" width="3"   height="92" rx="1" fill="#1BC9E4" opacity=".45" />
          <rect x="24" y="-42" width="28" height="16" rx="4" fill="#060A20" stroke="#1BC9E4" strokeWidth=".6" />
          <text x="38" y="-31" fontSize="12" fill="#1BC9E4" fontFamily="monospace" textAnchor="middle" fontWeight="500">AI</text>
          <text x="-8" y="-30" fontSize="11" fill="#1BC9E4" fontFamily="monospace" textAnchor="middle" letterSpacing="1">KASV</text>
          <text x="20" y="-2"  fontSize="21" fill="#1BC9E4" fontFamily="monospace" textAnchor="middle" fontWeight="bold">+14%</text>
          <rect x="-53" y="10"  width="10" height="18" rx="1" fill="#1BC9E4" opacity=".25" />
          <rect x="-40" y="2"   width="10" height="26" rx="1" fill="#1BC9E4" opacity=".52" />
          <rect x="-27" y="-10" width="10" height="38" rx="1" fill="#1BC9E4" />
          <line x1="-55" y1="15" x2="-13" y2="-13" stroke="#B5BAC2" strokeWidth="1.5" />
          <polygon points="-9,-17 -5,-9 -18,-12" fill="#B5BAC2" />
          <text x="-8" y="40" fontSize="8.5" fill="#A8C1D9" fontFamily="monospace" textAnchor="middle">Automatiseerimine</text>
        </g>

        {/* Ambient particles */}
        <circle cx="140" cy="140" r="1.5" fill="#1BC9E4" opacity=".35" className="hs-bk"  />
        <circle cx="362" cy="132" r="1.5" fill="#53709A" opacity=".45" className="hs-bk2" />
        <circle cx="142" cy="362" r="1.5" fill="#1BC9E4" opacity=".3"  className="hs-bk"  />
        <circle cx="360" cy="368" r="1.5" fill="#53709A" opacity=".4"  className="hs-bk2" />
        <circle cx="194" cy="462" r="1.5" fill="#1BC9E4" opacity=".25" className="hs-bk"  />
        <circle cx="308" cy="40"  r="1.5" fill="#53709A" opacity=".28" className="hs-bk2" />

        {/* Live badge */}
        <g transform="translate(450,28)">
          <rect x="-22" y="-11" width="50" height="22" rx="11" fill="#060A20" stroke="#1BC9E4" strokeWidth=".8" />
          <circle cx="-10" cy="0" r="3.5" fill="#1BC9E4" className="hs-bk" />
          <text x="1" y="4" fontSize="9" fill="#1BC9E4" fontFamily="monospace" fontWeight="500">Live</text>
        </g>

      </svg>
    </div>
  );
};

export default HeroSquare;
