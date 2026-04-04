import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ViewName = "home" | "digital-roadmap" | "cybersecurity" | "ai" | "erp-process";

type DashboardCard = {
  value: string;
  label: string;
};

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
      className="fixed bottom-5 right-5 z-[60]"
    >
      <div className="flex items-center gap-2 rounded-full border border-cyan-400/20 bg-slate-950/90 p-2 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
        <a
          href="tel:+3725000000"
          className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 text-sm font-medium text-white transition hover:border-cyan-400/20 hover:bg-white/10"
          aria-label="Helista kohe"
        >
          📞 Helista
        </a>
        <motion.button
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onContact}
          className="inline-flex h-11 items-center justify-center rounded-full bg-cyan-400 px-4 text-sm font-semibold text-slate-950 transition"
        >
          Broneeri konsultatsioon
        </motion.button>
      </div>
    </motion.div>
  );
}

function HeroDiagram({ dashboardCards }: { dashboardCards: DashboardCard[] }) {
  const deltas = ["+14%", "+9%", "-18%", "+1.8x"];
  const trendData = [
    { x: 0, y: 82, label: "Jan" },
    { x: 50, y: 68, label: "Feb" },
    { x: 100, y: 72, label: "Mar" },
    { x: 150, y: 48, label: "Apr" },
    { x: 200, y: 54, label: "May" },
    { x: 250, y: 28, label: "Jun" },
    { x: 300, y: 18, label: "Jul" },
  ];
  const trendPoints = trendData.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-cyan-950/30"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-sm text-slate-400">Tootmise juhtimispaneel</div>
          <div className="text-xl font-semibold text-white">Reaalajas tootmise ülevaade</div>
        </div>
        <motion.div
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300"
        >
          ● Live
        </motion.div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {dashboardCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="rounded-2xl border border-white/10 bg-slate-800 p-5 transition-shadow hover:shadow-lg hover:shadow-cyan-950/30"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-2xl font-semibold text-white">{card.value}</div>
              <div className={`text-xs font-medium ${i === 2 ? "text-amber-300" : "text-emerald-300"}`}>
                {deltas[i]}
              </div>
            </div>
            <div className="mt-1 text-sm text-slate-400">{card.label}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 rounded-2xl border border-white/10 bg-slate-800 p-4"
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="text-sm text-slate-400">Tootmise KPI trend (viimased 6 kuud)</div>
          <div className="text-xs text-slate-500">OTD · tsükliaeg · läbilaskevõime</div>
        </div>
        <div className="relative h-28 w-full">
          <svg viewBox="0 0 300 100" className="h-full w-full" preserveAspectRatio="none">
            <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(255,255,255,0.08)" />
            <line x1="0" y1="40" x2="300" y2="40" stroke="rgba(255,255,255,0.08)" />
            <line x1="0" y1="60" x2="300" y2="60" stroke="rgba(255,255,255,0.08)" />
            <line x1="0" y1="80" x2="300" y2="80" stroke="rgba(255,255,255,0.08)" />
            <motion.polyline
              fill="none"
              stroke="#22d3ee"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={trendPoints}
              initial={{ pathLength: 0, opacity: 0.4 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.25 }}
            />
            {trendData.map((point, i) => (
              <motion.circle
                key={point.label}
                cx={point.x}
                cy={point.y}
                r="3.5"
                fill="#22d3ee"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.25, delay: 0.35 + i * 0.08 }}
              />
            ))}
          </svg>
          <div className="absolute inset-x-0 bottom-0 flex justify-between px-0.5 text-[10px] text-slate-500">
            {trendData.map((point) => (
              <span key={point.label}>{point.label}</span>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { title: "Tööjaamad", value: "12 aktiivset", tone: "border-white/10 bg-white/5 text-slate-400" },
          { title: "Planeerimine", value: "ERP juhitud", tone: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200" },
          { title: "Efektiivsus", value: "+32% tootlikkus", tone: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200" },
        ].map((item) => (
          <motion.div
            key={item.title}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.18 }}
            className={`rounded-xl border p-3 text-center ${item.tone}`}
          >
            <div className="text-xs">{item.title}</div>
            <div className="mt-1 font-semibold text-white">{item.value}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
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
      eyebrow="Digitaalne teekaart"
      title="Selge plaan, kuidas tehnoloogia toetab teie äri kasvu"
      intro="Digitaalne teekaart ei ole raport. See on otsuste tegemise tööriist. Loome struktureeritud plaani, mis näitab täpselt, mida teha, millal teha ja mis mõju see annab."
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
      intro="Küberturvalisus ei ole tehniline lisakiht. See on ettevõtte vara, andmete ja maine kaitse. Aitame viia kaitse tasemele, mis on juhtidele arusaadav, töötajatele teostatav ja ettevõttele päriselt kasulik."
      sections={[
        {
          title: "1. Riskide ja nõrkuste kaardistus",
          text: "Hindame võrku, seadmeid, kasutajaõigusi, varundust ja põhilisi turvameetmeid. Tulemuseks on arusaadav pilt, kus on kõige suuremad äririskid.",
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
          text: "Aitame meetmed reaalselt kasutusele võtta: seadistused, juhised, töötajate teadlikkus ja pidev kontroll. Turvalisus peab jääma igapäevase töö osaks.",
        },
      ]}
      outcomes={[
        "Selge riskikaart ja prioriteedid",
        "Konkreetne tegevusplaan küberturbe tugevdamiseks",
        "Praktilised meetmed, mis ei halvenda töökiirust",
        "Suurem vastavus, väiksem äririsk ja parem töökindlus",
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
      title="Tehisintellekt, mis toetab protsesse — mitte lihtsalt ei muljeta"
      intro="AI väärtus ei teki sellest, et meeskond kirjutab paremaid prompte. Väärtus tekib siis, kui AI on seotud konkreetse protsessi, õige sisendi ja mõõdetava väljundiga. Aitame muuta AI äris reaalseks tööriistaks."
      sections={[
        {
          title: "1. Kasutuskohad, mis annavad päris mõju",
          text: "Leiame protsessid, kus AI aitab säästa aega, vähendada käsitööd või parandada otsuste kiirust. Fookus on ärilisel tulemusel, mitte trendil.",
        },
        {
          title: "2. Andmed ja töövood",
          text: "Kaardistame, milliseid andmeid on vaja ja kuidas AI sobitub olemasolevasse protsessi. Hea lahendus algab korrektsest sisendist ja selgest tööloogikast.",
        },
        {
          title: "3. Integreerimine olemasolevasse süsteemi",
          text: "AI ei pea elama eraldi tööriistana. Aitame siduda selle CRM-i, ERP, kliendipäringute, tootmise planeerimise või dokumentide töövooga.",
        },
        {
          title: "4. Mõõdetav kasutuselevõtt",
          text: "Seame mõõdikud, et AI mõju oleks nähtav: kiirem reageerimine, väiksem käsitöö, parem prioriseerimine või täpsem planeerimine.",
        },
      ]}
      outcomes={[
        "Selged AI kasutusjuhud, mis sobivad teie ettevõttele",
        "Integratsiooniplaan olemasolevate süsteemidega",
        "Mõõdikud, mille järgi AI mõju hinnata",
        "Lahendused, mis säästavad aega ja tõstavad töökiirust",
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
      intro="ERP ei lahenda probleeme üksi. Tulemus tekib siis, kui protsessid on läbi mõeldud, süsteemid on õigesti seotud ja info liigub automaatselt. Aitame kujundada terviklahenduse, mitte ainult tarkvaravaliku."
      sections={[
        {
          title: "1. Protsesside kaardistus",
          text: "Vaatame läbi, kuidas liigub töö müügist tellimuseni, tootmisest tarneni ja finantsini. Selgitame välja, kus tekivad katkestused, dubleerimine ja viivitused.",
        },
        {
          title: "2. Süsteemide roll ja vastutus",
          text: "Määratleme, millist rolli peab täitma ERP, millised andmed peavad olema seal keskelt hallatud ja millised liidesed on vaja ülejäänud tarkvaraga.",
        },
        {
          title: "3. Terviklik andmevoog",
          text: "Eesmärk ei ole lihtsalt uus tarkvara. Eesmärk on olukord, kus andmed liiguvad õigel ajal õigesse kohta ja juht näeb protsessi tervikpilti ilma käsitööta.",
        },
        {
          title: "4. Juurutusplaan ja kasutuselevõtt",
          text: "Koostame realistliku plaani, kuidas ERP või protsessimuudatus samm-sammult kasutusele võtta, millised on sõltuvused ja millal on mõju nähtav.",
        },
      ]}
      outcomes={[
        "Kaardistatud protsessid ja selged vastutused",
        "Arusaadav ERP roll ja süsteemide arhitektuur",
        "Vähem dubleerimist ja rohkem automaatset andmeliikumist",
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
  dashboardCards,
  openContact,
  setCurrentView,
}: {
  isScrolled: boolean;
  activeSection: string;
  services: Service[];
  reasons: Reason[];
  beforeAfter: BeforeAfterRow[];
  stats: { value: string; label: string }[];
  dashboardCards: DashboardCard[];
  openContact: () => void;
  setCurrentView: (view: ViewName) => void;
}) {
  return (
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
          <div
            className={`font-semibold uppercase tracking-[0.24em] text-cyan-300 transition-all duration-300 ${
              isScrolled ? "text-xs" : "text-sm"
            }`}
          >
            IT & Digikonsultatsioon
          </div>

          <nav
            className={`hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-sm text-slate-300 transition-all duration-300 md:flex ${
              isScrolled ? "scale-[0.95]" : "scale-100"
            }`}
          >
            {[
              { id: "teenused", label: "Teenused" },
              { id: "miks", label: "Miks meie" },
              { id: "tulemused", label: "Tulemused" },
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
              IT- ja digikonsultant VKE-dele
            </div>
            <h1 className="max-w-xl text-5xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
              IT, mis töötab. Äri, mis kasvab.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300 md:text-xl">
              Lõpetage IT probleemide lahendamine ja hakake juhtima äri. Me loome süsteemi, kus andmed liiguvad automaatselt, otsused põhinevad faktidel ja riskid on kontrolli all.
            </p>
            <div className="mt-5 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              Tüüpiline tulemus: vähem käsitööd · rohkem kontrolli · kiirem kasv
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
            <HeroDiagram dashboardCards={dashboardCards} />
          </div>
        </section>

        {/* Trust logos / references */}
        <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <div className="text-center mb-6">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Usaldavad ettevõtted</div>
            <p className="mt-3 text-slate-400">Näited klientidest, kellega oleme koostööd teinud</p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
            {["Raintar", "Monik", "Raditex", "Maadlex", "Scandic"].map((name) => (
              <motion.div
                key={name}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex h-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm text-slate-400 transition hover:border-cyan-400/30 hover:text-white"
              >
                {name}
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Juhi kiire kokkuvõte</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Kui täna on nii, siis meie viime selle siia.
              </h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {[
                ["IT on must kast", "Selge süsteem ja juhtimistaseme ülevaade"],
                ["Andmed on Excelites ja e-kirjades", "Üks usaldusväärne tõe allikas"],
                ["Käsitöö ja dubleerimine söövad aega", "Automaatne andmeliikumine süsteemide vahel"],
                ["Riskid on ebaselged", "95%+ turvatase ja väiksem äririsk"],
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

        <section className="mx-auto max-w-7xl scroll-mt-28 px-6 py-20 lg:px-8" id="about">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
                Üks partner. Kõik kriitilised punktid kaetud.
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                IT ei pea olema killustunud, reageeriv ega raskesti juhitav.
              </h2>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-lg leading-8 text-slate-300">
              Väikeettevõtte IT on sageli killustunud: keegi haldab võrku, keegi hooldab arvuteid, strateegia on katmata, andmed on laiali ja turvariskid jäävad tähelepanuta. Me ei täida üksikut lünka. Aitame näha ja lahendada kogu pilti — strateegiast protsessideni, tarkvaravalikust küberturvalisuse ja AI rakendamiseni. Ilma tehnilise žargoonita.
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl scroll-mt-28 px-6 py-20 lg:px-8" id="miks">
          <div className="mb-12 max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Miks valida meid</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Konsultatsioon, mis on korraga strateegiline, praktiline ja juhtidele arusaadav.
            </h2>
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
              Viis valdkonda. Üks tervikpilt.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Ei üksiklahendusi. Ei osalist pilti. Katame kõik kriitilised punktid — strateegiast teostuseni.
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

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8" id="pricing">
          <div className="mb-12 max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Hinnastamine</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Selge loogika. Läbipaistev hinnastus.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Iga ettevõtte lähteolukord on erinev. Me ei paku universaalset hinnakirja, vaid selget mudelit — mida tehakse, mis see maksab ja millist tulemust see annab.
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
                tier: "Digitaalne teekaart",
                badge: "Core",
                price: "2 500 – 6 000 €",
                title: "Strateegia + prioriteedid + investeeringu loogika",
                items: [
                  "Äriprotsesside detailne analüüs",
                  "Süsteemide ja andmevoogude kaardistus",
                  "3–5 aasta digitaalne teekaart",
                ],
                fit: "Sobib kui plaanid investeeringuid ja vajad selget tegevusplaani.",
                featured: true,
              },
              {
                tier: "Juurutusvalmis",
                badge: "Advanced",
                price: "6 000 – 12 000 €",
                title: "Analüüsist teostuseni",
                items: [
                  "Kõik eelnev +",
                  "Tarkvaravalik ja arhitektuur",
                  "Juurutusplaan ja töötoad meeskonnaga",
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
                  onClick={openContact}
                  className={`mt-6 w-full rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                    plan.featured
                      ? "bg-cyan-400 text-slate-950 hover:-translate-y-0.5"
                      : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  Aruta sobivat varianti
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
                  ["Küberturbe audit", "2 000 – 5 000 €"],
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
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Mida hind sõltub?</div>
              <h3 className="mt-4 text-2xl font-semibold text-white">Täpsustame mahu pärast esmast konsultatsiooni</h3>
              <div className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
                <p>• ettevõtte suurus ja protsesside keerukus</p>
                <p>• olemasolevate süsteemide arv ja seisukord</p>
                <p>• soovitud tulemuse sügavus ja teostusvalmidus</p>
              </div>
              <p className="mt-6 text-sm leading-7 text-slate-300">
                45-minutilise konsultatsiooni jooksul ütleme täpselt, milline lähenemine on mõistlik — ja mis see maksab.
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

        <section className="mx-auto max-w-7xl scroll-mt-28 px-6 py-20 lg:px-8" id="tulemused">
          <div className="mb-12 max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
              Mida see tähendab praktikas
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Enne ja pärast — selges keeles.
            </h2>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
            <div className="grid grid-cols-2 border-b border-white/10 bg-white/[0.03] px-6 py-5 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
              <div>Enne</div>
              <div>Pärast</div>
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

        <section className="mx-auto max-w-7xl scroll-mt-28 px-6 py-20 lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Usaldus ja tulemus</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Vähem raportit. Rohkem otsuseid, mida saab ellu viia.
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                Me ei anna 80-leheküljelist analüüsi, mis jääb sahtlisse. Anname selge järjestuse, mida teha kõigepealt, mida järgmisena ja millist mõju see teie ettevõttele annab.
              </p>
            </div>
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
                Alustame tasuta konsultatsiooniga.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                45 minutiga saate selge pildi: kus kaotate aega, kus on suurimad riskid ja mida teha järgmisena. Ilma kohustuseta jätkata.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-200">
                <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2">Konfidentsiaalne</span>
                <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2">Ilma kohustuseta</span>
                <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2">Vastus 24h jooksul</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10"
            >
              <h3 className="text-2xl font-semibold text-white">Broneeri tasuta konsultatsioon</h3>
              <p className="mt-3 text-slate-300">Võite täita vormi või võtta otse ühendust.</p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    name: "Mark Maslov",
                    role: "IT & Digital Transformation Consultant",
                    phone: "+372 500 0000",
                    email: "mark@firma.ee",
                  },
                  {
                    name: "Anna Saar",
                    role: "Cybersecurity & AI Specialist",
                    phone: "+372 511 1111",
                    email: "anna@firma.ee",
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
                      <div className="text-sm text-slate-300">✉️ {person.email}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 text-sm text-slate-400">või saada päring:</div>

              <form className="mt-4 space-y-4" onSubmit={(e) => e.preventDefault()}>
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
                  <option>Protsessid on aeglased või käsitsi</option>
                  <option>Süsteemid ei suhtle omavahel</option>
                  <option>Küberturvalisus on ebaselge</option>
                  <option>Puudub ülevaade andmetest</option>
                  <option>Tahan AI-d äris rakendada</option>
                </select>
                <textarea
                  name="message"
                  className="min-h-[120px] w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                  placeholder="Kirjeldage lühidalt, mis on teie peamine väljakutse"
                />
                <motion.button
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full rounded-2xl bg-cyan-400 px-6 py-4 text-sm font-semibold text-slate-950 transition"
                >
                  Saada päring →
                </motion.button>
                <p className="text-sm text-slate-400">Vastame 24 tunni jooksul. Ilma müügisurveta.</p>
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
              { name: "Eesti Infotehnoloogia Liit", short: "ITL" },
              { name: "Eesti Kaubandus-Tööstuskoda", short: "KTK" },
              { name: "Cyber Security Cluster", short: "CSC" },
            ].map((org) => (
              <motion.div
                key={org.name}
                whileHover={{ y: -4, scale: 1.02 }}
                className="flex h-24 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-center transition hover:border-cyan-400/30 hover:bg-white/[0.07]"
              >
                <div className="text-lg font-semibold text-white">{org.short}</div>
                <div className="mt-1 text-xs text-slate-400">{org.name}</div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <div>© 2026 IT & Digikonsultatsioon</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">
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

    const sectionIds = ["teenused", "miks", "tulemused", "kontakt"];
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
      title: "Digitaalne teekaart ja strateegia",
      text: "Loome selge 3–5 aasta plaani, kuidas tehnoloogia toetab teie äri kasvu. Konkreetsed prioriteedid, kulud ja mõõdetavad tulemused — mitte 80-leheküljeline raport.",
      icon: "01",
      detailView: "digital-roadmap",
      ctaLabel: "Loe lähemalt",
    },
    {
      title: "Protsessid ja tarkvaravalik",
      text: "Kaardistame, kus kaob aeg, raha ja kvaliteet. Leiame tarkvarad, mis omavahel päriselt suhtlevad — andmed liiguvad automaatselt, käsitöö kaob.",
      icon: "02",
      detailView: "erp-process",
      ctaLabel: "Loe lähemalt",
    },
    {
      title: "Küberturvalisus",
      text: "Enamik selle suurusega ettevõtteid täidab alla 50% küberturbe põhinõuetest. Viime kaitse 95%+ tasemele — ilma et see igapäevatööd segaks.",
      icon: "03",
      detailView: "cybersecurity",
      ctaLabel: "Loe lähemalt",
    },
    {
      title: "AI nutikas rakendamine",
      text: "Integreerime tehisintellekti teie äriprotsessidesse: automaatne päringute analüüs, tootmisplaani optimeerimine ja ajakulu vähendamine. Reaalne mõju — mitte katsetused.",
      icon: "04",
      detailView: "ai",
      ctaLabel: "Loe lähemalt",
    },
    {
      title: "Juurutamine ja tugi",
      text: "Oleme kõrval ideest kuni toimiva lahenduseni. Aitame arhitektuuri, integratsioonide ja meeskonna koolitusega — kuni kõik töötab nii nagu peab.",
      icon: "05",
      ctaLabel: "Broneeri konsultatsioon",
    },
  ];

  const reasons: Reason[] = [
    {
      title: "Ärieesmärgid enne tehnoloogiat",
      text: "Me ei müü tööriistu. Seome tehnoloogia teie konkreetsete eesmärkide, mõõdikute ja kasvuplaaniga.",
    },
    {
      title: "Strateegiast juurutuseni",
      text: "Alates hetkeolukorra hindamisest kuni arhitektuuri, integratsioonide ja kasutuselevõtuni — üks partner kogu teel.",
    },
    {
      title: "Tulemused, mida saab mõõta",
      text: "Fookus on läbilaskevõimel, kuluefektiivsusel, andmenähtavusel ja turvalisusel — mitte lihtsalt tehnilisel tegevusloetelul.",
    },
  ];

  const beforeAfter: BeforeAfterRow[] = [
    {
      before: "Andmed hajutatud Excelites ja e-kirjades",
      after: "Üks usaldusväärne tõe allikas — reaalajas",
    },
    {
      before: "IT on must kast, keegi ei tea mis toimub",
      after: "Juht näeb päringuid, konversiooni ja töökiirust faktide põhjal",
    },
    {
      before: "Küberturbe nõuetest täidetud alla 50%",
      after: "Vastavus 95%+ tasemel, seadmed kaitstud ja juhised paigas",
    },
    {
      before: "Tehisintellekt tähendab vaid promptide kirjutamist",
      after: "AI säästab tunde ja eurosid igal nädalal",
    },
  ];

  const stats = useMemo(
    () => [
      { value: "2x", label: "vähem käsitööd" },
      { value: "95%+", label: "kontrollitud turvatase" },
      { value: "1.8x", label: "parem tootlikkus" },
    ],
    []
  );

  const dashboardCards: DashboardCard[] = [
    { value: "128", label: "tellimust nädalas" },
    { value: "92%", label: "täitmise täpsus (OTD)" },
    { value: "6.5h", label: "keskmine tootmistsükkel" },
    { value: "1.8x", label: "läbilaskevõime kasv" },
  ];

  const openContact = () => {
    pendingScrollRef.current = "kontakt";
    setCurrentView("home");
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
        dashboardCards={dashboardCards}
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
