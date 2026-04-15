import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CookieConsent from "./components/CookieConsent";

type ViewName = "home" | "digital-roadmap" | "cybersecurity" | "ai" | "erp-process";

type Service = {
  title: string;
  text: string;
  icon: string;
  detailView?: Exclude<ViewName, "home">;
  ctaLabel?: string;
};

type Reason = {
  title: string;
  text: string;
};

type BeforeAfterRow = {
  before: string;
  after: string;
};

type DetailSection = {
  title: string;
  text: string;
};

type DetailPageProps = {
  onBack: () => void;
  onContact: () => void;
};

const scrollToSection = (id: string) => {
  if (typeof document === "undefined") return;
  const element = document.getElementById(id);
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth", block: "start" });
};

function StickyContactCTA({ onContact }: { onContact: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.6, ease: "easeOut" }}
      className="fixed bottom-20 right-5 z-[60]"
    >
      <div className="flex items-center gap-2 rounded-full border border-cyan-400/20 bg-slate-950/90 p-2 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
        <a
          href="tel:+3725011797"
          className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 text-sm font-medium text-white transition hover:border-cyan-400/20 hover:bg-white/10"
          aria-label="Helista kohe"
        >
          📞 Helista
        </a>
        <motion.button
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          onClick={onContact}
          className="inline-flex h-11 items-center justify-center rounded-full bg-cyan-400 px-4 text-sm font-semibold text-slate-950 transition"
        >
          Broneeri konsultatsioon
        </motion.button>
      </div>
    </motion.div>
  );
}

function HeroSquare() {
  return (
    <div style={{ width: "100%", aspectRatio: "1", maxWidth: 560, margin: "0 auto", marginTop: "100px" }}>
      <img
        src="/HeroSquare.png"
        alt="IT-konsultatsioon – optimeeritud protsessid ja turvalisus"
        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
      />
    </div>
  );
}

function _HeroSquareOld_UNUSED() {
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
    <div style={{ width: "100%", aspectRatio: "1", maxWidth: 560, margin: "0 auto" }}>
      <style>{css}</style>
      <svg width="100%" height="100%" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
        <rect width="500" height="500" rx="14" fill="#060A20" />
        <g opacity=".05" stroke="#1BC9E4" strokeWidth=".5">
          <line x1="0" y1="62"  x2="500" y2="62"  /><line x1="0" y1="125" x2="500" y2="125" />
          <line x1="0" y1="187" x2="500" y2="187" /><line x1="0" y1="250" x2="500" y2="250" />
          <line x1="0" y1="312" x2="500" y2="312" /><line x1="0" y1="375" x2="500" y2="375" />
          <line x1="0" y1="437" x2="500" y2="437" />
          <line x1="62"  y1="0" x2="62"  y2="500" /><line x1="125" y1="0" x2="125" y2="500" />
          <line x1="187" y1="0" x2="187" y2="500" /><line x1="250" y1="0" x2="250" y2="500" />
          <line x1="312" y1="0" x2="312" y2="500" /><line x1="375" y1="0" x2="375" y2="500" />
          <line x1="437" y1="0" x2="437" y2="500" />
        </g>
        <g fill="#1BC9E4" opacity=".09">
          <circle cx="62"  cy="62"  r="1.5" /><circle cx="125" cy="62"  r="1.5" />
          <circle cx="375" cy="62"  r="1.5" /><circle cx="437" cy="62"  r="1.5" />
          <circle cx="62"  cy="437" r="1.5" /><circle cx="125" cy="437" r="1.5" />
          <circle cx="375" cy="437" r="1.5" /><circle cx="437" cy="437" r="1.5" />
          <circle cx="62"  cy="187" r="1.5" /><circle cx="437" cy="187" r="1.5" />
          <circle cx="62"  cy="312" r="1.5" /><circle cx="437" cy="312" r="1.5" />
        </g>
        <g stroke="#1BC9E4" strokeWidth="1" fill="none" opacity=".3">
          <path d="M22 42 L22 18 L46 18"       /><path d="M478 42 L478 18 L454 18"    />
          <path d="M22 458 L22 482 L46 482"    /><path d="M478 458 L478 482 L454 482" />
        </g>
        <g stroke="#53709A" strokeWidth=".5" fill="none" opacity=".18">
          <path d="M62 125 L125 125 L125 187"  /><path d="M437 375 L375 375 L375 312" />
          <path d="M62 375 L125 375 L125 312"  /><path d="M437 125 L375 125 L375 187" />
        </g>
        <line x1="250" y1="210" x2="250" y2="105" stroke="#1BC9E4" className="hs-lv"  />
        <line x1="250" y1="290" x2="250" y2="392" stroke="#1BC9E4" className="hs-lv2" />
        <line x1="127" y1="250" x2="210" y2="250" stroke="#1BC9E4" className="hs-lv"  />
        <line x1="290" y1="250" x2="372" y2="250" stroke="#1BC9E4" className="hs-lv2" />
        <circle className="hs-rng"  cx="250" cy="250" r="55" />
        <circle className="hs-rng2" cx="250" cy="250" r="55" />
        <circle cx="250" cy="210" r="3" fill="#1BC9E4" className="hs-bk2" />
        <circle cx="250" cy="290" r="3" fill="#1BC9E4" className="hs-bk"  />
        <circle cx="210" cy="250" r="3" fill="#1BC9E4" className="hs-bk2" />
        <circle cx="290" cy="250" r="3" fill="#1BC9E4" className="hs-bk"  />
        <circle cx="250" cy="105" r="3" fill="#53709A" />
        <circle cx="250" cy="392" r="3" fill="#53709A" />
        <circle cx="127" cy="250" r="3" fill="#53709A" />
        <circle cx="372" cy="250" r="3" fill="#53709A" />
        <g transform="translate(250,250)">
          <circle r="44" fill="none" stroke="#224B61" strokeWidth="1.5" />
          <rect x="-26" y="-26" width="52" height="52" rx="6" fill="#224B61" stroke="#1BC9E4" strokeWidth="1.5" />
          <rect x="-17" y="-17" width="34" height="34" rx="3" fill="#060A20" />
          <line x1="-8" y1="-26" x2="-8" y2="-36" stroke="#1BC9E4" strokeWidth="1.5" />
          <line x1="0"  y1="-26" x2="0"  y2="-36" stroke="#1BC9E4" strokeWidth="1.5" />
          <line x1="8"  y1="-26" x2="8"  y2="-36" stroke="#1BC9E4" strokeWidth="1.5" />
          <line x1="-8" y1="26" x2="-8" y2="36" stroke="#1BC9E4" strokeWidth="1.5" />
          <line x1="0"  y1="26" x2="0"  y2="36" stroke="#1BC9E4" strokeWidth="1.5" />
          <line x1="8"  y1="26" x2="8"  y2="36" stroke="#1BC9E4" strokeWidth="1.5" />
          <line x1="-26" y1="-8" x2="-36" y2="-8" stroke="#1BC9E4" strokeWidth="1.5" />
          <line x1="-26" y1="0"  x2="-36" y2="0"  stroke="#1BC9E4" strokeWidth="1.5" />
          <line x1="-26" y1="8"  x2="-36" y2="8"  stroke="#1BC9E4" strokeWidth="1.5" />
          <line x1="26" y1="-8" x2="36" y2="-8" stroke="#1BC9E4" strokeWidth="1.5" />
          <line x1="26" y1="0"  x2="36" y2="0"  stroke="#1BC9E4" strokeWidth="1.5" />
          <line x1="26" y1="8"  x2="36" y2="8"  stroke="#1BC9E4" strokeWidth="1.5" />
          <line x1="-17" y1="-5" x2="17" y2="-5" stroke="#224B61" strokeWidth=".8" />
          <line x1="-17" y1="5"  x2="17" y2="5"  stroke="#224B61" strokeWidth=".8" />
          <circle r="8" fill="#1BC9E4" />
          <circle r="3.5" fill="#060A20" className="hs-bk" />
        </g>
        <text x="250" y="308" fontSize="14" fill="#1BC9E4" textAnchor="middle" fontFamily="monospace" letterSpacing="1.8" opacity=".55">OPTIMEERITUD</text>
        <text x="250" y="320" fontSize="14" fill="#1BC9E4" textAnchor="middle" fontFamily="monospace" letterSpacing="1.8" opacity=".55">PROTSESSID</text>
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
        <circle cx="140" cy="140" r="1.5" fill="#1BC9E4" opacity=".35" className="hs-bk"  />
        <circle cx="362" cy="132" r="1.5" fill="#53709A" opacity=".45" className="hs-bk2" />
        <circle cx="142" cy="362" r="1.5" fill="#1BC9E4" opacity=".3"  className="hs-bk"  />
        <circle cx="360" cy="368" r="1.5" fill="#53709A" opacity=".4"  className="hs-bk2" />
        <circle cx="194" cy="462" r="1.5" fill="#1BC9E4" opacity=".25" className="hs-bk"  />
        <circle cx="308" cy="40"  r="1.5" fill="#53709A" opacity=".28" className="hs-bk2" />
        <g transform="translate(450,28)">
          <rect x="-22" y="-11" width="50" height="22" rx="11" fill="#060A20" stroke="#1BC9E4" strokeWidth=".8" />
          <circle cx="-10" cy="0" r="3.5" fill="#1BC9E4" className="hs-bk" />
          <text x="1" y="4" fontSize="9" fill="#1BC9E4" fontFamily="monospace" fontWeight="500">Live</text>
        </g>
      </svg>
    </div>
  );
}

function DetailPageHeader({
  title,
  eyebrow,
  onBack,
  onContact,
}: {
  title: string;
  eyebrow: string;
  onBack: () => void;
  onContact: () => void;
}) {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`sticky top-0 z-40 border-b border-white/10 backdrop-blur-xl transition-all duration-300 ${
        isCompact ? "bg-slate-950/92" : "bg-slate-950/75"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 transition-all duration-300 lg:px-8 ${
          isCompact ? "py-3" : "py-4"
        }`}
      >
        <div className="flex min-w-0 items-center gap-3">
          <motion.button
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={onBack}
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-slate-300 transition hover:border-cyan-400/20 hover:bg-cyan-400/10 hover:text-white"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
            <span>Tagasi</span>
          </motion.button>

          <div className="min-w-0">
            <div
              className={`truncate text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-300 transition-all duration-300 ${
                isCompact ? "opacity-80" : "opacity-100"
              }`}
            >
              {eyebrow}
            </div>
            <div
              className={`truncate font-semibold text-white transition-all duration-300 ${
                isCompact ? "text-sm" : "text-base"
              }`}
            >
              {title}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.div
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="hidden rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300 sm:block"
          >
            Konsultatsiooniteenus
          </motion.div>

          <motion.button
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={onContact}
            className={`rounded-full bg-cyan-400 font-medium text-slate-950 transition-all duration-300 ${
              isCompact ? "px-4 py-2 text-sm" : "px-5 py-2.5 text-sm"
            }`}
          >
            Broneeri konsultatsioon
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}

function DetailPageTemplate({
  eyebrow,
  title,
  intro,
  sections,
  outcomes,
  onBack,
  onContact,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: DetailSection[];
  outcomes: string[];
  onBack: () => void;
  onContact: () => void;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <DetailPageHeader title={title} eyebrow={eyebrow} onBack={onBack} onContact={onContact} />

      <main className="px-6 py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-8 shadow-2xl shadow-cyan-950/10 md:p-10"
          >
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">{eyebrow}</div>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">{title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{intro}</p>
          </motion.div>

          <div className="mt-16 space-y-10">
            {sections.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-8"
              >
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{step.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
            className="mt-20 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-10"
          >
            <h2 className="text-2xl font-semibold">Mida te lõpuks saate?</h2>
            <ul className="mt-6 space-y-3 text-slate-300">
              {outcomes.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </motion.div>

          <div className="mt-16 flex items-center gap-4">
            <motion.button
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onContact}
              className="rounded-2xl bg-cyan-400 px-6 py-4 font-semibold text-slate-950"
            >
              Broneeri konsultatsioon
            </motion.button>
            <button
              type="button"
              onClick={onBack}
              className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              Tagasi avalehele
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export function DigitalRoadmapPage({ onBack, onContact }: DetailPageProps) {
  return (
    <DetailPageTemplate
      eyebrow="Digitaliseerimise teekaart"
      title="Selge plaan, kuidas tehnoloogia toetab teie äri kasvu"
      intro="Digitaaliseerimise teekaart ei ole raport. See on otsuste tegemise tööriist. Loome struktureeritud plaani, mis näitab täpselt, mida teha, millal teha ja mis mõju see annab."
      sections={[
        {
          title: "1. Hetkeolukorra kaardistus",
          text: "Analüüsime protsesse, süsteeme ja andmevooge. Selgitame välja, kus tekivad kitsaskohad ja kus kaob aeg või raha.",
        },
        {
          title: "2. Prioriteetide määramine",
          text: "Määrame, millised tegevused annavad suurima mõju. Fookus on ärilisel väärtusel, mitte tehnoloogial.",
        },
        {
          title: "3. Arhitektuur ja lahendused",
          text: "Valime sobivad tarkvarad ja defineerime, kuidas süsteemid omavahel suhtlevad. Tekib terviklik arhitektuur.",
        },
        {
          title: "4. Tegevusplaan",
          text: "Koostame konkreetse tegevuskava koos ajakava, investeeringute ja oodatava tulemusega.",
        },
      ]}
      outcomes={[
        "Selge IT ja digitaliseerimise plaan",
        "Prioriteedid ja investeeringute loogika",
        "Ülevaade süsteemidest ja andmetest",
        "Konkreetne tegevuskava",
      ]}
      onBack={onBack}
      onContact={onContact}
    />
  );
}

export function CybersecurityPage({ onBack, onContact }: DetailPageProps) {
  return (
    <DetailPageTemplate
      eyebrow="Küberturvalisus"
      title="Kaitse, mis vähendab riski ja toetab igapäevast tööd"
      intro="Küberturvalisus ei ole tehniline lisakohustus. See on ettevõtte vara, andmete ja maine kaitse. Aitame tõsta kaitse vajalikule tasemele, mis annab juhtidele kindlustunde ja tagab ettevõtte toimepidevuse."
      sections={[
        {
          title: "1. Olukorra kaardistus",
          text: "Hindame võrku, seadmeid, kasutajaõigusi, varundust ja põhilisi turvameetmeid. Tulemuseks on arusaadav pilt hetkeolukorrast, võimalikest riskidest.",
        },
        {
          title: "2. Prioriteetsed kaitsemeetmed",
          text: "Määrame, millised sammud annavad kiireima mõju: ligipääsude korrastamine, 2FA, krüpteerimine, varundus, seadmete kaitse ja protseduurid.",
        },
        {
          title: "3. Vastavus ja töökindlus",
          text: "Viime küberturbe taseme vastavusse tänapäevaste nõuetega nii, et see toetab tööd, mitte ei takista seda. Fookus on praktilisel kasutusel ja reaalsel riskide vähendamisel.",
        },
        {
          title: "4. Juurutamine ja harjumused",
          text: "Aitame meetmed reaalselt kasutusele võtta: seadistused, juhised, töötajate teadlikkuse tõstmine ja pidev kontroll. Turvalisus peab jääma igapäevase töö osaks.",
        },
      ]}
      outcomes={[
        "Selge riskikaart ja prioriteedid",
        "Konkreetne tegevusplaan küberturbe tugevdamiseks",
        "Praktilised meetmed, mis ei mõjuta töökiirust",
        "Suurem andmeturvalisus, väiksem äririsk ja parem võrgu töökindlus",
      ]}
      onBack={onBack}
      onContact={onContact}
    />
  );
}

export function AIPage({ onBack, onContact }: DetailPageProps) {
  return (
    <DetailPageTemplate
      eyebrow="AI lahendused"
      title="Tehisintellekt, mis toetab protsesse — mitte lihtsalt ei loo teksti"
      intro="AI väärtus ei teki sellest, et meeskond kirjutab paremaid prompte. Väärtus tekib siis, kui AI on seotud konkreetse protsessi, õige sisendi ja mõõdetava väljundiga. Aitame muuta AI äris reaalseks tööriistaks."
      sections={[
        {
          title: "1. Kasutuskohad, mis annavad päris mõju",
          text: "Leiame protsessid, kus AI aitab säästa aega, vähendada käsitsi sisestamisi või parandada otsuste kiirust. Fookus on reaalsel ärilisel tulemusel.",
        },
        {
          title: "2. Andmed ja töövood",
          text: "Kaardistame, milliseid andmeid on vaja ja kuidas AI sobitub olemasolevasse protsessi. Hea lahendus algab korrektsest sisendist ja selgest protsessi loogikast.",
        },
        {
          title: "3. Integreerimine olemasolevasse süsteemi",
          text: "AI ei pea elama eraldi tööriistana. Aitame siduda selle CRM-i, ERP, kliendipäringute, tootmise planeerimise või dokumentide töövooga.",
        },
        {
          title: "4. Mõõdetav tulemus",
          text: "Seame mõõdikud, et AI mõju oleks nähtav: kiirem reageerimine, väiksem käsitöö või täpsem planeerimine.",
        },
      ]}
      outcomes={[
        "Selged AI kasutusjuhud, mis sobivad teie ettevõttele",
        "Integratsiooniplaan olemasolevate süsteemidega",
        "Mõõdikud, mille järgi AI mõju hinnata",
        "Lahendused, mis säästavad aega ja tõstavad efektiivsust",
      ]}
      onBack={onBack}
      onContact={onContact}
    />
  );
}

export function ERPProcessPage({ onBack, onContact }: DetailPageProps) {
  return (
    <DetailPageTemplate
      eyebrow="ERP ja protsessid"
      title="Süsteemid ja protsessid, mis töötavad ühe loogilise tervikuna"
      intro="ERP ei lahenda probleeme üksi. Tulemus tekib siis, kui protsessid on läbi mõeldud, süsteemid on õigesti seotud ja info liigub automaatselt. Aitame mitte ainult tarkvara valida, vaid kujundada terviklahendus."
      sections={[
        {
          title: "1. Protsesside kaardistus",
          text: "Vaatame läbi, kuidas liigub töö müügist tellimuseni, tootmisest tarneni ja finantsini. Selgitame välja, kus tekivad katkestused, dubleerimine ja viivitused.",
        },
        {
          title: "2. Süsteemide roll ja vastutus",
          text: "Määratleme, millist rolli peab täitma ERP, millised andmed peavad olema seal keskelt hallatud ja millised liidestused on vajalikud ülejäänud tarkvaraga.",
        },
        {
          title: "3. Terviklik andmevoog",
          text: "Eesmärk ei ole lihtsalt uus tarkvara. Eesmärk on olukord, kus andmed liiguvad õigel ajal õigesse kohta ja juht näeb protsessi tervikpilti.",
        },
        {
          title: "4. Juurutusplaan ja kasutuselevõtt",
          text: "Koostame realistliku plaani, kuidas ERP või protsessimuudatus samm-sammult kasutusele võtta. Vajadusel oleme abiks juurutamisel või täidame juurutaja rolli.",
        },
      ]}
      outcomes={[
        "Kaardistatud protsessid ja selged vastutused",
        "Arusaadav ERP roll ja süsteemide arhitektuur",
        "Vähem dubleerimist ja rohkem automaatset andmete liikumist",
        "Realistlik juurutusplaan koos prioriteetidega",
      ]}
      onBack={onBack}
      onContact={onContact}
    />
  );
}

function HomeView({
  isScrolled,
  activeSection,
  services,
  reasons,
  beforeAfter,
  stats,
  openContact,
  setCurrentView,
}: {
  isScrolled: boolean;
  activeSection: string;
  services: Service[];
  reasons: Reason[];
  beforeAfter: BeforeAfterRow[];
  stats: { value: string; label: string }[];
  openContact: () => void;
  setCurrentView: (view: ViewName) => void;
}) {
  return (
    <>
    <div className="relative min-h-screen bg-slate-950 text-white">
      <StickyContactCTA onContact={openContact} />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute right-0 top-96 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <header
        className={`sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl transition-all duration-300 ${
          isScrolled ? "bg-slate-950/90" : "bg-slate-950/70"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-300 lg:px-8 ${
            isScrolled ? "py-2" : "py-4"
          }`}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`font-semibold uppercase tracking-[0.24em] text-cyan-300 transition-all duration-300 ${
              isScrolled ? "text-xs" : "text-sm"
            }`}
          >
            <img src="/logo_white.svg" alt="Logo" className="h-5 w-auto w-auto sm:h-7" />
          </button>

          <nav
            className={`hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-sm text-slate-300 transition-all duration-300 md:flex ${
              isScrolled ? "scale-[0.95]" : "scale-100"
            }`}
          >
            {[
              { id: "miks", label: "Meist" },
              { id: "teenused", label: "Teenused" },
              { id: "pricing", label: "Hinnastamine" },
              { id: "kontakt", label: "Kontakt" },
            ].map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`group relative rounded-full px-4 py-2.5 transition-all duration-200 ${
                    isActive ? "text-white" : "text-slate-300 hover:text-white"
                  }`}
                >
                  {isActive ? (
                    <>
                      <motion.span
                        layoutId="nav-active-glow"
                        transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.9 }}
                        className="pointer-events-none absolute inset-[-6px] rounded-full bg-cyan-400/12 blur-md"
                      />
                      <motion.span
                        layoutId="nav-active-pill"
                        transition={{ type: "spring", stiffness: 560, damping: 24, mass: 0.7 }}
                        className="absolute inset-0 rounded-full bg-white/12 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_0_22px_rgba(34,211,238,0.08)]"
                      />
                    </>
                  ) : null}

                  <motion.span
                    key={`${item.id}-${isActive ? "active" : "inactive"}`}
                    animate={isActive ? { scale: [1, 1.06, 1] } : { scale: 1 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="relative z-10 inline-block"
                  >
                    {item.label}
                  </motion.span>

                  {!isActive ? (
                    <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/0 via-cyan-400/8 to-cyan-400/0 opacity-0 blur-sm transition-opacity duration-200 group-hover:opacity-100" />
                  ) : null}
                </button>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => scrollToSection("kontakt")}
            className={`rounded-full border border-cyan-400/30 bg-cyan-400/10 text-sm font-medium text-cyan-200 transition-all duration-300 hover:bg-cyan-400/20 ${
              isScrolled ? "px-3 py-1.5" : "px-4 py-2"
            }`}
          >
            Tasuta konsultatsioon
          </button>
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto grid max-w-7xl gap-14 px-6 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-28 lg:pt-24">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-cyan-400/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
              Strateegiline IT-konsultant tootmisettevõtetele
            </div>
            <h1 className="max-w-xl text-5xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
              Targad IT-lahendused panevad teie äri kasvama
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300 md:text-xl">
              Aitame ettevõtetel viia protsessid, tarkvarad ja andmed ühtseks tervikuks - et otsused oleksid kiired, täpsed ja toetaks teie kasvu
            </p>
            <div className="mt-5 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              Põhjalik ülevaade · selge tegevusplaan · mõõdetavad tulemused
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollToSection("kontakt")}
                className="rounded-2xl bg-cyan-400 px-6 py-4 text-center text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
              >
                Broneeri tasuta konsultatsioon
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("teenused")}
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Vaata lahendusi
              </button>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/20">
                  <div className="text-lg font-semibold text-white">{stat.value}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <HeroSquare />
          </div>
        </section>

        <section className="mx-auto max-w-7xl scroll-mt-28 px-6 py-20 lg:px-8" id="about">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
                Väljakutsed ettevõtetele
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Paljud ettevõtted seisavad silmitsi samade probleemidega:  
              </h2>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-lg leading-8 text-slate-300">
              Ettevõtted kaotavad iga päev aega ja raha protsessidele, mis ei toimi, tarkvarale, mis toeta äri eesmärke ning riskidele, mida ei märgata. Andmed excelites ja meilides ei lase teha kiireid ja kaalutletuid otsuseid.
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Väljakutsed ettevõtetele</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Hea äri ja halvasti toimiv IT ei saa koos eksisteerida
              </h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {[
                ["Killustatud läbipaistmatud andmed", "Oluline info on peidus Exceli tabelites, e-mailides ja eraldiseisvates süsteemides, mis omavahel ei suhtle. Puudub reaalne ja kiire ülevaade tootmisest, müügist ning tegelikest kuludest."],
                ["Juhtimine ja otsustamine", "Otsuseid tehakse kõhutunde ja tunnetuse, mitte reaalajas kättesaadavate andmete põhjal. Suureneb risk teha valesid investeeringuid ja magada maha kriitilised kohad efektiivsuse tõstmiseks."],
                ["IT-süsteemid ja -tugi", "IT-partner keskendub vaid jooksvate tulekahjude kustutamisele, puudub pikaajaline plaan ja ennetav arendus. Uute lahenduste juurutamine venib kuude viisi või ebaõnnestub täielikult, sest puudub tehnoloogiline visioon."],
                ["Teadvustamata riskid ja turvalisus", "Küberturvalisus on ebaselge või alahinnatud risk, millele mõeldakse alles pärast intsidenti. Ettevõte on haavatav rünnakutele ja andmekadudele, mis võivad halvata kogu tootmise ja äritegevuse."],
              ].map(([before, after]) => (
                <motion.div
                  key={before}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-white/10 bg-slate-900/60 p-5"
                >
                  <div className="text-sm text-slate-400">{before}</div>
                  <div className="mt-3 text-base font-semibold text-white">{after}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        

        <section className="mx-auto max-w-7xl scroll-mt-28 px-6 py-20 lg:px-8" id="miks">
          <div className="mb-12 max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Miks valida meid strateegiliseks IT-partneriks</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Strateegiline, praktiline ja tulemustele orienteeritud
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Kiire tehnoloogilise arengute ajastul muutub selge IT-strateegia veelgi olulisemaks. See aitab ettevõtetel digitaaltehnoloogiaid ja tehisintellekti süsteeme sihipäraselt rakendada, äri eesmärke tõhusalt toetada ning riske varakult tuvastada ja minimeerida.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {reasons.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-8 transition hover:border-cyan-400/25 hover:bg-white/[0.07]"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-sm font-semibold text-cyan-300">
                  0{index + 1}
                </div>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-base leading-7 text-slate-300">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl scroll-mt-28 px-6 py-20 lg:px-8" id="teenused">
          <div className="mb-12 max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Mida me teeme</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Viis sammu teie äri täieliku kontrollini
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Vaatame suurt pilti ja ühendame strateegia, protsessid ja tehnoloogia üheks tervikuks.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group rounded-[2rem] border border-white/10 bg-white/5 p-8 transition hover:border-cyan-400/30 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-cyan-950/20"
              >
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-sm font-semibold text-cyan-300 transition group-hover:bg-cyan-400/15">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                    <p className="mt-3 text-base leading-7 text-slate-300">{service.text}</p>
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={() => {
                          if (service.detailView) {
                            setCurrentView(service.detailView);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          } else {
                            openContact();
                          }
                        }}
                        className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-400/15 hover:text-white"
                      >
                        {service.ctaLabel ?? "Loe lähemalt"} →
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl scroll-mt-28 px-6 py-20 lg:px-8" id="tulemused">
          <div className="mb-12 max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
              Mõju ettevõtte äritulemustele
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Nutikas tootmine algab selgest ja toimivast süsteemist
            </h2>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
            <div className="grid grid-cols-2 border-b border-white/10 bg-white/[0.03] px-6 py-5 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
              <div>Olukord praegu</div>
              <div>Tulemus</div>
            </div>
            {beforeAfter.map((row, index) => (
              <motion.div
                key={row.before}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="grid grid-cols-1 border-b border-white/10 last:border-b-0 md:grid-cols-2"
              >
                <div className="px-6 py-6 text-slate-300">{row.before}</div>
                <div className="px-6 py-6 font-medium text-white">{row.after}</div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl scroll-mt-28 px-6 py-20 lg:px-8" id="pricing">
          <div className="mb-12 max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Hinnastamine</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Selge loogika. Läbipaistev hinnastus
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Iga ettevõtte lähteolukord on erinev. Me ei paku universaalset hinnakirja, vaid selget mudelit — mida tehakse, palju see maksab ja millist tulemust see annab.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                tier: "Audit",
                badge: "Start",
                price: "1 500 – 2 500 €",
                title: "Selge ülevaade ja esimesed otsused",
                items: [
                  "Hetkeolukorra kaardistus",
                  "Peamised kitsaskohad ja riskid",
                  "Konkreetne soovituste nimekiri",
                ],
                fit: "Sobib kui puudub selge ülevaade ja vaja kiiret hinnangut.",
                featured: false,
              },
              {
                tier: "Digitaliseerimise teekaart",
                badge: "Core",
                price: "5 000 – 15 000 €",
                title: "Strateegia + prioriteedid + investeeringud + tasuvus",
                items: [
                  "Tarneahela ja äriprotsesside detailne analüüs",
                  "Süsteemide ja andmevoogude kaardistus ning protsessi kirjeldused",
                  "3 aasta digitaaliseerimise teekaart",
                ],
                fit: "Sobib kui plaanid investeeringuid ja vajad selget tegevusplaani. Aitame EL-i toetuse saamisel",
                featured: true,
              },
              {
                tier: "Digitaalne transformatsioon",
                badge: "Advanced",
                price: "6 000 – 12 000 €",
                title: "Analüüsist teostuseni",
                items: [
                  "Kõik eelnev + lisaks:",
                  "Tarkvara valik ja arhitektuur",
                  "Juurutusplaan ja soovi korral juurutus.",
                ],
                fit: "Sobib kui soovid reaalselt muutused ellu viia.",
                featured: false,
              },
            ].map((plan, index) => (
              <motion.div
                key={plan.tier}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`relative rounded-[2rem] border p-8 transition ${
                  plan.featured
                    ? "border-cyan-400/30 bg-gradient-to-br from-cyan-400/12 to-white/[0.04] shadow-2xl shadow-cyan-950/20"
                    : "border-white/10 bg-white/5 hover:border-cyan-400/20 hover:bg-white/[0.07]"
                }`}
              >
                {plan.featured ? (
                  <div className="absolute -top-3 left-8 rounded-full border border-cyan-400/30 bg-cyan-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                    Soovitatud
                  </div>
                ) : null}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{plan.badge}</div>
                    <h3 className="mt-3 text-2xl font-semibold text-white">{plan.tier}</h3>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                    Pakett
                  </div>
                </div>
                <div className="mt-6 text-3xl font-semibold text-white">{plan.price}</div>
                <p className="mt-3 text-base leading-7 text-slate-300">{plan.title}</p>
                <div className="mt-6 space-y-3">
                  {plan.items.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-slate-300">
                      <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-cyan-300" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/50 p-4 text-sm leading-6 text-slate-300">
                  {plan.fit}
                </div>
                <button
                  type="button"
                  onClick={() => scrollToSection("kontakt")}
                  className={`mt-6 w-full rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                    plan.featured
                      ? "bg-cyan-400 text-slate-950 hover:-translate-y-0.5"
                      : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  Küsi hinnapakkumist
                </button>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45 }}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-8"
            >
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Lisateenused</div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  ["Küberturbe audit", "5 000 – 12 000 €"],
                  ["AI kasutusjuhtude kaardistus", "3 000 – 7 000 €"],
                  ["ERP / protsesside analüüs", "3 500 – 8 000 €"],
                  ["Juurutamise ja arenduse tugi", "alates 800 €/päev"],
                ].map(([name, price]) => (
                  <div key={name} className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">
                    <div className="text-base font-semibold text-white">{name}</div>
                    <div className="mt-2 text-sm text-slate-300">{price}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 p-8"
            >
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Millest hind sõltub?</div>
              <h3 className="mt-4 text-2xl font-semibold text-white">Täpsustame mahu pärast esmast konsultatsiooni</h3>
              <div className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
                <p>• ettevõtte suurus ja protsesside keerukus</p>
                <p>• olemasolevate süsteemide arv ja seisukord</p>
                <p>• soovitud tulemuse ja ressursid teostuseks</p>
              </div>
              <p className="mt-6 text-sm leading-7 text-slate-300">
                45-minutilise konsultatsiooni jooksul ütleme täpselt, milline lähenemine on mõistlik — ja orienteeruvalt hind.
              </p>
              <button
                type="button"
                onClick={openContact}
                className="mt-6 rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
              >
                Broneeri tasuta konsultatsioon
              </button>
            </motion.div>
          </div>
        </section>

        

        <section className="mx-auto max-w-7xl scroll-mt-28 px-6 py-20 lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Usaldus ja tulemus</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Andmetest otsusteni
              </h2>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Otsustest tulemusteni
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                Me ei tee 80-leheküljelist analüüsi, mis jääb sahtlisse. Anname selge järjestuse, mida teha kõigepealt, mida järgmisena ja millist mõju see teie ettevõttele annab. Muudame teie IT toimivaks süsteemiks, mis annab kontrolli ja toetab kasvu. Aitame sul teha õiged IT-otsused – kiiremini ja väiksema riskiga.
              </p>
            </div>
          </div>
        </section>

        {/* Trust logos / references */}
        <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <div className="text-center mb-6">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Kliendid, kes on meid usaldanud</div>
            <p className="mt-3 text-slate-400">Meie kliendid on tootmisettevõtted, kes ei otsinud lihtsalt IT-partnerit,</p>
            <p className="mt-3 text-slate-400">vaid terviklikku lähenemist oma protsesside ja süsteemide korrastamiseks</p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
            {[
              { name: "Haapsalu Uks", file: "haapsalu_uks_logo.png" },
              { name: "Harviker", file: "harviker_logo.jpg" },
              { name: "Sulemees", file: "sulemees_logo.png" },
              { name: "Carglass", file: "carglass_logo.png" },
              { name: "Printbest", file: "printbest_logo.png" },
            ].map((client) => (
              <motion.div
                key={client.name}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex h-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm text-slate-400 transition hover:border-cyan-400/30 hover:text-white"
              >
                <img
                src={`/clients/${client.file}`}
                alt={client.name}
                className="max-h-18 w-auto object-contain opacity-50 grayscale brightness-100 transition hover:opacity-80"
               />
             </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl scroll-mt-28 px-6 py-20 lg:px-8" id="kontakt">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 p-8 md:p-10"
            >
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Järgmine samm</div>
              <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Alustame tasuta konsultatsiooniga
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                45 minutiga saate selge pildi: kus kaotate aega, kus on suurimad riskid ja mida teha järgmisena. Ilma kohustuseta jätkata.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-200">
                <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2">Konfidentsiaalne</span>
                <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2">Ilma kohustuseta</span>
                <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2">Vastus 24h jooksul</span>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    name: "Mark Maslov",
                    role: "Cybersecurity & AI Consultant",
                    phone: "+372 512 9624",
                    email: "mark@raditex.ee",
                  },
                  {
                    name: "Mait Ruut",
                    role: "IT & Digital Transformation Consultant",
                    phone: "+372 501 1797",
                    email: "mait@raditex.ee",
                  },
                ].map((person) => (
                  <motion.div
                    key={person.email}
                    whileHover={{ y: -4 }}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/30 hover:bg-white/[0.07]"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-500/30 font-semibold text-white">
                      {person.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-white">{person.name}</div>
                      <div className="text-sm text-slate-400">{person.role}</div>
                      <div className="mt-2 text-sm text-slate-300">📞 {person.phone}</div>
                      <a href={`mailto:${person.email}`} className="text-sm text-slate-300 hover:text-cyan-300 transition">
                        ✉️ {person.email}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10"
            >
              <h3 className="text-4xl font-semibold text-white">Broneeri tasuta konsultatsioon</h3>
              <p className="mt-3 text-slate-300">Võite täita vormi või võtta otse ühendust.</p>

              <div className="mt-10 text-sm text-slate-400">Saada päring:</div>

              <form className="mt-4 space-y-4" action="https://formspree.io/f/mgoppvpy" method="POST">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="given-name"
                    className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                    placeholder="Teie eesnimi"
                  />
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                    placeholder="Ettevõtte nimi"
                  />
                </div>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="work email"
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                  placeholder="Tööalane e-post"
                />
                <select
                  name="company-size"
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Ettevõtte suurus
                  </option>
                  <option>Kuni 10 töötajat</option>
                  <option>11–30 töötajat</option>
                  <option>31–80 töötajat</option>
                  <option>80+ töötajat</option>
                </select>
                <select
                  name="challenge"
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Suurim väljakutse
                  </option>
                  <option>Protsessid on aeglased või palju käsitööd</option>
                  <option>Süsteemid ei suhtle omavahel</option>
                  <option>Küberturvalisus on ohus</option>
                  <option>Puudub ülevaade andmetest</option>
                  <option>Tahan AI-d äris rakendada</option>
                </select>
                <textarea
                  name="message"
                  className="min-h-[120px] w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                  placeholder="Kirjeldage lühidalt, mis on teie peamine väljakutse"
                  />

                  <input type="hidden" name="_replyto" value="info@raditex.ee" />
                <motion.button
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full rounded-2xl bg-cyan-400 px-6 py-4 text-sm font-semibold text-slate-950 transition"
                >
                  Saada päring →
                </motion.button>
                <p className="text-sm text-slate-400">Vastame kirjalikult 24 tunni jooksul.</p>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Memberships / organizations */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="text-center mb-10">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Kuulume organisatsioonidesse</div>
            <h3 className="mt-4 text-2xl font-semibold text-white md:text-3xl">
              Usaldusväärne partner ka professionaalses võrgustikus
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { name: "Eesti Infotehnoloogia ja Telekommunikatsiooni Liit", short: "ITL", file: "itl_logo.png" },
              { name: "Eesti Konsultantide Assotsiatsioon", short: "KTK", file: "eka_logo.png" },
              { name: "Eesti Väike- ja Keskmiste Ettevõtjate Assotsiatsioon", short: "CSC", file: "evea_logo.png" },
              { name: "Riigi Infosüsteemi Amet", short: "CSC", file: "RIA.png" },
              ].map((org) => (
                <motion.div
                  key={org.name}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="flex h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 text-center transition hover:border-cyan-400/30 hover:bg-white/[0.07]"
                >
                  <img
                    src={`/clients/${org.file}`}
                    alt={org.name}
                    className="max-h-10 w-auto object-contain opacity-50 grayscale brightness-100 transition hover:opacity-80"
                />
               <div className="text-xs text-slate-400">{org.name}</div>
          </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <div>© 2026 Raditex OÜ</div>
          <div className="flex gap-6">
            <a href="/privaatsus/index.html" target="_blank" className="hover:text-white">
              Privaatsus
            </a>
            <a href="#teenused" className="hover:text-white">
              Teenused
            </a>
            <a href="#" className="hover:text-white">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
    <CookieConsent />
    </>
  );
}

export default function Page() {
  const [currentView, setCurrentView] = useState<ViewName>("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("teenused");
  const pendingScrollRef = useRef<string | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || currentView !== "home") return;

    const sectionIds = ["miks", "teenused", "pricing", "kontakt"];
    const handleScroll = () => {
      const offset = 160;
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (window.scrollY + offset >= top) current = id;
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentView]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [currentView]);

  // After navigating back to home, scroll to the pending section once the view has mounted
  useEffect(() => {
    if (currentView === "home" && pendingScrollRef.current) {
      const id = pendingScrollRef.current;
      pendingScrollRef.current = null;
      const timer = setTimeout(() => scrollToSection(id), 50);
      return () => clearTimeout(timer);
    }
  }, [currentView]);

  const services: Service[] = [
    {
      title: "Digitaaliseerimise teekaart ja strateegia",
      text: "Loome selge 3–5 aasta plaani, kuidas tehnoloogia toetab teie äri kasvu. Konkreetsed prioriteedid, kulud ja mõõdetavad tulemused — mitte 80-leheküljeline raport.",
      icon: "DT",
      detailView: "digital-roadmap",
      ctaLabel: "Loe lähemalt",
    },
    {
      title: "Protsessid ja tarkvaravalik",
      text: "Kaardistame, kus kaob aeg, raha ja kvaliteet. Leiame tarkvarad, mis omavahel päriselt suhtlevad — andmed liiguvad automaatselt, käsitöö kaob.",
      icon: "PT",
      detailView: "erp-process",
      ctaLabel: "Loe lähemalt",
    },
    {
      title: "Küberturvalisus",
      text: "Enamik selle suurusega ettevõtteid täidab alla 50% küberturbe põhinõuetest. Viime kaitse 95%+ tasemele — ilma et see igapäevatööd segaks.",
      icon: "CS",
      detailView: "cybersecurity",
      ctaLabel: "Loe lähemalt",
    },
    {
      title: "AI nutikas rakendamine",
      text: "Integreerime tehisintellekti teie äriprotsessidesse: automaatne päringute analüüs, tootmisplaani optimeerimine ja ajakulu vähendamine. Reaalne mõju — mitte katsetused.",
      icon: "AI",
      detailView: "ai",
      ctaLabel: "Loe lähemalt",
    },
    {
      title: "Juurutamine ja tugi",
      text: "Aitame teha tarkvara valikuid, juurutada, arendada. Kirjeldame arhitektuuri, loome integratsioonid ja koolitame meeskonna — kuni kõik töötab nii nagu peab.",
      icon: "DS",
      ctaLabel: "Broneeri konsultatsioon",
    },
  ];

  const reasons: Reason[] = [
    {
      title: "Ärieesmärgid enne tehnoloogiat",
      text: "Seome tehnoloogia teie konkreetsete eesmärkide, mõõdikute ja kasvuplaaniga.",
    },
    {
      title: "Strateegiast juurutuseni",
      text: "Hetkeolukorra hindamisest kuni arhitektuuri, integratsioonide ja kasutuselevõtuni — üks partner kellele toetuda.",
    },
    {
      title: "Tulemused, mida saab mõõta",
      text: "Fookus on teie äri kriitilistel näitajatel:tellimuste läbiminek, kuluefektiivsus, andmete nähtavus ja turvalisus- mitte lihtsalt tehnilisel teostusel",
    },
  ];

  const beforeAfter: BeforeAfterRow[] = [
    {
      before: "Andmed hajutatud Excelites ja e-kirjades",
      after: "Kõik kriitilised andmed on ühes süsteemis, reaalajas kättesaadavad",
    },
    {
      before: "Erinevad tarkvarad ei suhtle omavahel, info sisestamine dubleeritud",
      after: "Süsteemid omavahel integreeritud, andmed liiguvad automaatselt",
    },
    {
      before: "Küberturbe nõuetest täidetud alla 50%",
      after: "Vastavus 95%+ tasemel, riskid kaardistatud, turvameetmed rakendatud, töötajad koolitatud",
    },
    {
      before: "Ei tea kust digitaliseerimisega alustada",
      after: "Selge digitaliseerimise teekaart (prioriteedid, ajakava, investeeringud)",
    },
  ];

  const stats = useMemo(
    () => [
      { value: "10+", label: "aastat tootmise kogemust" },
      { value: "120+", label: "digitaliseerimise projekti" },
      { value: "4.8 miljonit €", label: "digi investeeringuid" },
    ],
    []
  );

  const openContact = () => {
    if (currentView === "home") {
    scrollToSection("kontakt");
    } else {
      pendingScrollRef.current = "kontakt";  
      setCurrentView("home");
    } 
  };

  const detailProps: DetailPageProps = {
    onBack: () => setCurrentView("home"),
    onContact: openContact,
  };

  const viewContent =
    currentView === "digital-roadmap" ? (
      <DigitalRoadmapPage {...detailProps} />
    ) : currentView === "cybersecurity" ? (
      <CybersecurityPage {...detailProps} />
    ) : currentView === "ai" ? (
      <AIPage {...detailProps} />
    ) : currentView === "erp-process" ? (
      <ERPProcessPage {...detailProps} />
    ) : (
      <HomeView
        isScrolled={isScrolled}
        activeSection={activeSection}
        services={services}
        reasons={reasons}
        beforeAfter={beforeAfter}
        stats={stats}
        openContact={openContact}
        setCurrentView={setCurrentView}
      />
    );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentView}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.32, ease: "easeOut" }}
      >
        {viewContent}
      </motion.div>
    </AnimatePresence>
  );
}
