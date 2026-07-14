import { useState, useEffect, useRef, useCallback } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import paulPhoto from "@/imports/paul.png";
import {
  Linkedin,
  Instagram,
  Youtube,
  ExternalLink,
  ArrowRight,
  Shield,
  Code2,
  ChevronLeft,
  Menu,
  X,
  Lock,
  Globe,
  Cpu,
  Terminal,
  Layers,
  Eye,
  ChevronRight,
} from "lucide-react";
import {
  SiTypescript,
  SiPython,
  SiFirebase,
  SiJavascript,
  SiGit,
  SiReact,
  SiFigma,
  SiC,
  SiTailwindcss,
  SiSupabase,
  SiOwasp,
  SiPhp,
} from "react-icons/si";
import type { IconType } from "react-icons";
import type { Project } from "@/lib/types";
import { subscribeToProjects } from "@/lib/projects";
import { sendMessage } from "@/lib/messages";

// ─── Types ───────────────────────────────────────────────────────────────────

type Page = "home" | "work" | "case-study";

export type { Project };

// ─── Tech Stack ───────────────────────────────────────────────────────────────

const TECH_STACK: { label: string; icon: IconType; color: string }[] = [
  { label: "TypeScript", icon: SiTypescript, color: "#3178c6" },
  { label: "Python", icon: SiPython, color: "#3776ab" },
  { label: "Firebase", icon: SiFirebase, color: "#ffca28" },
  { label: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
  { label: "Git", icon: SiGit, color: "#f05032" },
  { label: "React", icon: SiReact, color: "#61dafb" },
  { label: "Figma", icon: SiFigma, color: "#f24e1e" },
  { label: "C", icon: SiC, color: "#a8b9cc" },
  { label: "Tailwind CSS", icon: SiTailwindcss, color: "#38bdf8" },
  { label: "Supabase", icon: SiSupabase, color: "#3ecf8e" },
  { label: "OWASP", icon: SiOwasp, color: "#00549e" },
  { label: "PHP", icon: SiPhp, color: "#777bb4" },
];

// ─── Projects data hook (Firestore-backed) ───────────────────────────────────

function useProjects() {
  const [projects, setProjects] = useState<Project[] | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToProjects(setProjects);
    return unsubscribe;
  }, []);

  return projects; // null = loading, [] = loaded but empty
}

// ─── Keyframe Styles Injected Once ───────────────────────────────────────────

const GLOBAL_STYLES = `
  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
  @keyframes floatUp {
    0%   { opacity: 0; transform: translateY(24px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 12px rgba(0,255,204,0.3); }
    50%       { box-shadow: 0 0 28px rgba(0,255,204,0.7), 0 0 60px rgba(0,255,204,0.2); }
  }
  @keyframes scanline {
    0%   { top: -10%; }
    100% { top: 110%; }
  }
  @keyframes starDrift {
    0%   { transform: translateY(0px);   opacity: 0.6; }
    50%  { opacity: 1; }
    100% { transform: translateY(-60px); opacity: 0; }
  }
  @keyframes gridFade {
    0%   { opacity: 0.04; }
    100% { opacity: 0.07; }
  }
  .marquee-inner { animation: marquee 28s linear infinite; }
  .cursor-blink  { animation: blink 1s step-end infinite; }
  .float-in      { animation: floatUp 0.7s ease both; }
  .pulse-glow    { animation: pulseGlow 3s ease-in-out infinite; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #0d1117; }
  ::-webkit-scrollbar-thumb { background: rgba(0,255,204,0.3); border-radius: 2px; }

  .nav-link {
    position: relative;
    color: #8b949e;
    font-size: 0.82rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: color 0.3s;
    font-family: 'JetBrains Mono', monospace;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    left: 0; bottom: -3px;
    width: 0; height: 1px;
    background: #00ffcc;
    transition: width 0.35s cubic-bezier(0.4,0,0.2,1);
  }
  .nav-link:hover { color: #00ffcc; }
  .nav-link:hover::after { width: 100%; }
  .nav-link.active { color: #00ffcc; }
  .nav-link.active::after { width: 100%; }

  .tilt-card {
    transform-style: preserve-3d;
    transition: transform 0.15s ease, box-shadow 0.3s ease;
  }
`;

// ─── Star Field Background ────────────────────────────────────────────────────

function StarField() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    delay: Math.random() * 6,
    dur: Math.random() * 4 + 4,
  }));

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,204,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,204,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Stars */}
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            opacity: 0.4,
            animation: `starDrift ${s.dur}s ${s.delay}s ease-in-out infinite alternate`,
          }}
        />
      ))}
      {/* Gradient vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(0,112,243,0.08) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header({
  page,
  setPage,
}: {
  page: Page;
  setPage: (p: Page) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
      style={{
        background: "rgba(13,17,23,0.88)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,255,204,0.1)",
      }}
    >
      {/* Logo */}
      <button
        onClick={() => setPage("home")}
        className="flex items-center gap-2 group"
      >
        <div
          className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold"
          style={{
            background: "rgba(0,255,204,0.12)",
            border: "1px solid rgba(0,255,204,0.4)",
            color: "#00ffcc",
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.05em",
          }}
        >
          ZTI
        </div>
        <span
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "1rem",
            fontWeight: 700,
            color: "#00ffcc",
            letterSpacing: "0.02em",
          }}
        >
          Paul Adamu
        </span>
      </button>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-8">
        <button className="nav-link" onClick={() => setPage("home")}>
          Home
        </button>
        <button
          className={`nav-link ${page === "work" || page === "case-study" ? "active" : ""}`}
          onClick={() => setPage("work")}
        >
          Work
        </button>
        <a
          href="https://linkedin.com/in/paul-adamu-67bb46324"
          target="_blank"
          rel="noreferrer"
          style={{
            background: "rgba(0,255,204,0.1)",
            border: "1px solid rgba(0,255,204,0.35)",
            color: "#00ffcc",
            padding: "0.42rem 1.1rem",
            borderRadius: "6px",
            fontSize: "0.78rem",
            fontWeight: 600,
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            transition: "background 0.3s, box-shadow 0.3s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "rgba(0,255,204,0.2)";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow =
              "0 0 16px rgba(0,255,204,0.3)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "rgba(0,255,204,0.1)";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
          }}
        >
          Hire Me
        </a>
      </nav>

      {/* Mobile menu button */}
      <button
        className="md:hidden"
        style={{ color: "#8b949e" }}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="absolute top-full left-0 right-0 flex flex-col gap-4 px-6 py-6 md:hidden"
          style={{
            background: "rgba(13,17,23,0.97)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(0,255,204,0.1)",
          }}
        >
          <button
            className="nav-link text-left"
            onClick={() => {
              setPage("home");
              setMenuOpen(false);
            }}
          >
            Home
          </button>
          <button
            className="nav-link text-left"
            onClick={() => {
              setPage("work");
              setMenuOpen(false);
            }}
          >
            Work
          </button>
        </div>
      )}
    </header>
  );
}

// ─── Typewriter ───────────────────────────────────────────────────────────────

function Typewriter({ phrases }: { phrases: string[] }) {
  const [displayText, setDisplayText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    const speed = deleting ? 40 : 80;

    const t = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) {
          setDisplayText(current.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        } else {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        if (charIdx > 0) {
          setDisplayText(current.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        } else {
          setDeleting(false);
          setPhraseIdx((i) => (i + 1) % phrases.length);
        }
      }
    }, speed);

    return () => clearTimeout(t);
  }, [charIdx, deleting, phraseIdx, phrases]);

  return (
    <span style={{ color: "#00ffcc" }}>
      {displayText}
      <span className="cursor-blink" style={{ color: "#00ffcc" }}>
        |
      </span>
    </span>
  );
}

// ─── Countdown Timer ─────────────────────────────────────────────────────────

function CountdownTimer() {
  const targetDate = new Date("2026-08-22T00:00:00").getTime();

  const calc = () => {
    const diff = targetDate - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Days", value: time.d },
    { label: "Hours", value: time.h },
    { label: "Min", value: time.m },
    { label: "Sec", value: time.s },
  ];

  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex items-center gap-2">
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: "#00ffcc",
            boxShadow: "0 0 6px #00ffcc",
            animation: "pulseGlow 1.5s ease-in-out infinite",
          }}
        />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.7rem",
            color: "#8b949e",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Next Major Release
        </span>
      </div>
      <div className="flex gap-3">
        {units.map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col items-center px-3 py-2.5 rounded-lg min-w-[64px]"
            style={{
              background: "rgba(0,255,204,0.04)",
              border: "1px solid rgba(0,255,204,0.18)",
            }}
          >
            <span
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "1.8rem",
                fontWeight: 700,
                color: "#00ffcc",
                lineHeight: 1,
                textShadow: "0 0 14px rgba(0,255,204,0.5)",
              }}
            >
              {String(value).padStart(2, "0")}
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6rem",
                color: "#8b949e",
                marginTop: "0.3rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tech Stack Marquee ───────────────────────────────────────────────────────

function TechMarquee() {
  const doubled = [...TECH_STACK, ...TECH_STACK];

  return (
    <div className="relative w-full overflow-hidden py-6" style={{ background: "rgba(22,27,34,0.6)", borderTop: "1px solid rgba(0,255,204,0.08)", borderBottom: "1px solid rgba(0,255,204,0.08)" }}>
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, #0d1117 0%, transparent 100%)",
        }}
      />
      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, #0d1117 0%, transparent 100%)",
        }}
      />

      <div className="flex marquee-inner" style={{ width: "max-content" }}>
        {doubled.map((tech, i) => (
          <div
            key={i}
            className="flex items-center gap-2 mx-5 px-4 py-2 rounded-full select-none"
            style={{
              background: "rgba(33,38,45,0.8)",
              border: "1px solid rgba(0,255,204,0.12)",
              whiteSpace: "nowrap",
            }}
          >
            <tech.icon size={16} style={{ color: tech.color, flexShrink: 0 }} />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.78rem",
                fontWeight: 500,
                color: "#8b949e",
                letterSpacing: "0.04em",
              }}
            >
              {tech.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: (p: Project) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
      const y = -((e.clientY - rect.top) / rect.height - 0.5) * 18;
      el.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`;
      el.style.boxShadow = `
        ${-x * 1.5}px ${y * 1.5}px 40px rgba(0,112,243,0.15),
        0 0 30px rgba(0,255,204,0.08)
      `;
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0) rotateY(0) scale(1)";
    el.style.boxShadow = "none";
  }, []);

  const categoryColor: Record<string, string> = {
    web: "#0070f3",
    cybersec: "#00ffcc",
    design: "#7c3aed",
  };

  return (
    <div
      ref={cardRef}
      className="tilt-card rounded-xl overflow-hidden cursor-pointer flex flex-col group"
      style={{
        background: "#161b22",
        border: "1px solid rgba(0,255,204,0.1)",
        transition: "transform 0.15s ease, box-shadow 0.3s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: 220 }}>
        <ImageWithFallback
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ opacity: 0.75 }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(22,27,34,1) 0%, rgba(22,27,34,0.3) 60%, transparent 100%)",
          }}
        />
        {/* Hover shimmer */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,255,204,0.06) 0%, rgba(0,112,243,0.06) 100%)",
          }}
        />
        {/* Category pill */}
        <div className="absolute top-3 left-3">
          <span
            className="px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              background: `rgba(${project.category === "cybersec" ? "0,255,204" : project.category === "web" ? "0,112,243" : "124,58,237"},0.15)`,
              border: `1px solid ${categoryColor[project.category]}40`,
              color: categoryColor[project.category],
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {project.tag}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-5">
        <h3
          className="text-lg font-bold mb-2 group-hover:text-[#00ffcc] transition-colors duration-300"
          style={{ fontFamily: "'Inter', sans-serif", color: "#f0f6fc" }}
        >
          {project.title}
        </h3>
        <p
          className="text-sm leading-relaxed flex-1 mb-4"
          style={{ color: "#8b949e" }}
        >
          {project.description}
        </p>

        {/* Language bars */}
        <div className="space-y-1.5 mb-5">
          {project.bars.map((bar) => (
            <div key={bar.label} className="flex items-center gap-2">
              <div
                className="rounded-full"
                style={{
                  width: `${bar.pct}%`,
                  height: 3,
                  background: bar.color,
                  opacity: 0.8,
                  minWidth: 24,
                  maxWidth: "100%",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.67rem",
                  color: "#8b949e",
                }}
              >
                {bar.label} {bar.pct}%
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-300"
          style={{
            color: "#00ffcc",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.76rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          View Project <ArrowRight size={14} />
        </div>
      </div>
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────

function HomePage({ setPage, setSelectedProject }: { setPage: (p: Page) => void; setSelectedProject: (p: Project) => void }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const projects = useProjects();
  const featured = (projects ?? []).filter((p) => p.featured).slice(0, 2);
  const preview = featured.length > 0 ? featured : (projects ?? []).slice(0, 2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendError(null);
    try {
      await sendMessage(formData);
      setSubmitted(true);
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  const stats = [
    { label: "Projects Shipped", value: "12+" },
    { label: "Security Audits", value: "8" },
    { label: "Years Active", value: "3+" },
    { label: "Certifications", value: "4" },
  ];

  return (
    <main className="relative min-h-screen" style={{ zIndex: 1 }}>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="flex flex-col md:flex-row-reverse items-center justify-between gap-12 px-6 md:px-16 lg:px-24 pt-20 pb-16 max-w-7xl mx-auto">

        {/* Profile Image */}
        <div className="flex-shrink-0 float-in">
          <div
            className="relative rounded-2xl overflow-hidden pulse-glow"
            style={{
              width: 280,
              height: 320,
              border: "1px solid rgba(0,255,204,0.3)",
              background: "#161b22",
            }}
          >
            <ImageWithFallback
              src={paulPhoto}
              alt="Paul Adamu — Full-Stack Developer & Cybersecurity Specialist"
              className="w-full h-full object-cover object-top"
              style={{
                transform: "rotate(90deg) scale(1.4)",
                transformOrigin: "center center",
                opacity: photoLoaded ? 1 : 0,
                transition: "opacity 0.4s ease",
              }}
              onLoad={() => setPhotoLoaded(true)}
            />
            {!photoLoaded && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: "#161b22" }}
              >
                <div
                  className="rounded-full animate-spin"
                  style={{
                    width: 32,
                    height: 32,
                    border: "3px solid rgba(0,255,204,0.15)",
                    borderTopColor: "#00ffcc",
                  }}
                />
              </div>
            )}
            {/* Scan line effect */}
            <div
              className="absolute left-0 right-0 pointer-events-none"
              style={{
                height: 2,
                background:
                  "linear-gradient(to right, transparent, rgba(0,255,204,0.4), transparent)",
                animation: "scanline 4s linear infinite",
              }}
            />
            {/* Corner accents */}
            {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
              <div
                key={i}
                className={`absolute ${pos} w-4 h-4`}
                style={{
                  borderTop: i < 2 ? "2px solid #00ffcc" : "none",
                  borderBottom: i >= 2 ? "2px solid #00ffcc" : "none",
                  borderLeft: i % 2 === 0 ? "2px solid #00ffcc" : "none",
                  borderRight: i % 2 === 1 ? "2px solid #00ffcc" : "none",
                }}
              />
            ))}

            {/* Status badge overlay */}
            <div
              className="absolute bottom-3 left-3 right-3 flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{
                background: "rgba(13,17,23,0.85)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(0,255,204,0.2)",
              }}
            >
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  background: "#00ffcc",
                  boxShadow: "0 0 6px #00ffcc",
                  animation: "pulseGlow 1.5s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  color: "#00ffcc",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Available for Work
              </span>
            </div>
          </div>
        </div>

        {/* Hero Text */}
        <div className="flex-1 flex flex-col gap-6 float-in" style={{ animationDelay: "0.1s" }}>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full w-fit"
            style={{
              background: "rgba(0,112,243,0.1)",
              border: "1px solid rgba(0,112,243,0.3)",
            }}
          >
            <Shield size={12} style={{ color: "#0070f3" }} />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                color: "#0070f3",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Full-Stack Developer · Cybersecurity Specialist
            </span>
          </div>

          <div>
            <h1
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "clamp(2.6rem, 6vw, 4.5rem)",
                fontWeight: 800,
                color: "#f0f6fc",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              Paul{" "}
              <span
                style={{
                  color: "#00ffcc",
                  textShadow: "0 0 30px rgba(0,255,204,0.4)",
                }}
              >
                Adamu
              </span>
            </h1>

            <p
              className="mt-3 text-xl"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                color: "#8b949e",
                minHeight: "2rem",
              }}
            >
              <Typewriter
                phrases={[
                  "Secure Architectures & Modern Interfaces",
                  "Zero-Trust Security Frameworks",
                  "High-Fidelity Web Experiences",
                  "Vulnerability Research & Hardening",
                ]}
              />
            </p>
          </div>

          <p
            className="text-base leading-relaxed max-w-xl"
            style={{ color: "#8b949e", fontFamily: "'Inter', sans-serif" }}
          >
            I build web systems that are fast, visually sharp, and hardened against
            modern threats — bridging the gap between elegant interfaces and
            enterprise-grade security postures.
          </p>

          {/* CTA Row */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setPage("work")}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300"
              style={{
                background: "#00ffcc",
                color: "#0d1117",
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 24px rgba(0,255,204,0.5)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }}
            >
              View My Work <ArrowRight size={16} />
            </button>
            <a
              href="#contact"
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300"
              style={{
                background: "transparent",
                border: "1px solid rgba(240,246,252,0.2)",
                color: "#f0f6fc",
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,255,204,0.4)";
                (e.currentTarget as HTMLAnchorElement).style.color = "#00ffcc";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(240,246,252,0.2)";
                (e.currentTarget as HTMLAnchorElement).style.color = "#f0f6fc";
              }}
            >
              Get In Touch
            </a>
          </div>

          {/* Countdown */}
          <div className="pt-2">
            <CountdownTimer />
          </div>
        </div>
      </section>

      {/* ── TECH MARQUEE ──────────────────────────────────────────── */}
      <TechMarquee />

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 lg:px-24 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center p-6 rounded-xl text-center"
              style={{
                background: "rgba(22,27,34,0.8)",
                border: "1px solid rgba(0,255,204,0.08)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: "#00ffcc",
                  textShadow: "0 0 18px rgba(0,255,204,0.35)",
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.7rem",
                  color: "#8b949e",
                  marginTop: "0.4rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────── */}
      <section id="about" className="px-6 md:px-16 lg:px-24 py-16 max-w-7xl mx-auto">
        <div
          className="rounded-2xl p-8 md:p-12 relative overflow-hidden"
          style={{
            background: "rgba(22,27,34,0.7)",
            border: "1px solid rgba(0,255,204,0.1)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(0,112,243,0.08) 0%, transparent 70%)",
            }}
          />
          <div className="grid md:grid-cols-2 gap-10 relative">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Code2 size={16} style={{ color: "#00ffcc" }} />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.7rem",
                    color: "#00ffcc",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  About
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  fontWeight: 700,
                  color: "#f0f6fc",
                  marginBottom: "1rem",
                  lineHeight: 1.2,
                }}
              >
                Building Secure,{" "}
                <span style={{ color: "#0070f3" }}>Modern Web</span> Systems
              </h2>
              <p style={{ color: "#8b949e", lineHeight: 1.8 }}>
                I specialize in crafting web experiences that are
                pixel-precise on the surface and armored underneath. With a
                background in full-stack development and cybersecurity, I
                approach every project as both a UX challenge and a threat model.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { icon: <Shield size={18} />, title: "Security-First Mindset", desc: "Every line of code reviewed for OWASP vulnerabilities, XSS vectors, and auth edge cases." },
                { icon: <Globe size={18} />, title: "Frontend Precision", desc: "React, Tailwind, and animation libraries used to build interfaces that feel alive." },
                { icon: <Terminal size={18} />, title: "Full-Stack Capability", desc: "Firebase, REST APIs, and server-side rendering when the brief demands it." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 p-4 rounded-xl"
                  style={{ background: "rgba(33,38,45,0.6)", border: "1px solid rgba(0,255,204,0.06)" }}
                >
                  <div style={{ color: "#00ffcc", flexShrink: 0, marginTop: 2 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, color: "#f0f6fc", fontSize: "0.92rem", marginBottom: "0.25rem" }}>{item.title}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "#8b949e", lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS PREVIEW ──────────────────────────────── */}
      <section className="px-6 md:px-16 lg:px-24 py-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "1.4rem",
              fontWeight: 700,
              color: "#f0f6fc",
            }}
          >
            Featured Work
          </h2>
          <button
            onClick={() => setPage("work")}
            className="flex items-center gap-1 text-sm transition-colors duration-300"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "#8b949e",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontSize: "0.72rem",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#00ffcc")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#8b949e")}
          >
            View All <ChevronRight size={14} />
          </button>
        </div>
        {preview.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {preview.map((p) => (
              <ProjectCard key={p.id} project={p} onSelect={(proj) => { setSelectedProject(proj); setPage("case-study"); }} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl" style={{ background: "rgba(22,27,34,0.5)", border: "1px dashed rgba(0,255,204,0.15)" }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", color: "#8b949e", fontSize: "0.85rem" }}>
              {projects === null ? "// Loading projects…" : "// No projects published yet — check back soon"}
            </p>
          </div>
        )}
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────── */}
      <section id="contact" className="px-6 md:px-16 lg:px-24 py-16 max-w-7xl mx-auto">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <Lock size={14} style={{ color: "#00ffcc" }} />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.68rem",
                color: "#00ffcc",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Encrypted Channel
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 700,
              color: "#f0f6fc",
              marginBottom: "0.5rem",
            }}
          >
            Send a Message
          </h2>
          <p style={{ color: "#8b949e", fontSize: "0.9rem", marginBottom: "2rem" }}>
            Open to freelance projects, security audits, and collaborations.
          </p>

          {submitted ? (
            <div
              className="flex flex-col items-center gap-4 py-12 rounded-2xl text-center"
              style={{
                background: "rgba(0,255,204,0.05)",
                border: "1px solid rgba(0,255,204,0.2)",
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,255,204,0.15)" }}
              >
                <Shield size={24} style={{ color: "#00ffcc" }} />
              </div>
              <p style={{ fontFamily: "'Orbitron', sans-serif", color: "#00ffcc", fontSize: "1rem", fontWeight: 600 }}>
                Message Transmitted
              </p>
              <p style={{ color: "#8b949e", fontSize: "0.85rem" }}>
                I'll get back to you within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {[
                { key: "name", label: "Full Name", type: "text", placeholder: "Your name" },
                { key: "email", label: "Email Address", type: "email", placeholder: "you@domain.com" },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <label
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.68rem",
                      color: "#8b949e",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {label}
                  </label>
                  <input
                    type={type}
                    name={key}
                    placeholder={placeholder}
                    required
                    value={formData[key as keyof typeof formData]}
                    onChange={(e) => setFormData((f) => ({ ...f, [key]: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg outline-none transition-all duration-300"
                    style={{
                      background: "#21262d",
                      border: "1px solid rgba(0,255,204,0.12)",
                      color: "#f0f6fc",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.9rem",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "rgba(0,255,204,0.4)";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,255,204,0.06)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(0,255,204,0.12)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
              ))}
              <div className="flex flex-col gap-1.5">
                <label
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.68rem",
                    color: "#8b949e",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="How can I help you?"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg outline-none transition-all duration-300 resize-none"
                  style={{
                    background: "#21262d",
                    border: "1px solid rgba(0,255,204,0.12)",
                    color: "#f0f6fc",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.9rem",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,255,204,0.4)";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,255,204,0.06)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,255,204,0.12)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
              {sendError && (
                <p
                  className="text-sm rounded-lg px-4 py-3"
                  style={{ background: "rgba(248,81,73,0.1)", border: "1px solid rgba(248,81,73,0.3)", color: "#f85149" }}
                >
                  {sendError}
                </p>
              )}
              <button
                type="submit"
                disabled={sending}
                className="w-full py-3.5 rounded-lg font-semibold text-sm transition-all duration-300"
                style={{
                  background: "#00ffcc",
                  color: "#0d1117",
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.04em",
                  opacity: sending ? 0.6 : 1,
                  cursor: sending ? "not-allowed" : "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 24px rgba(0,255,204,0.4)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                }}
              >
                {sending ? "Transmitting…" : "Transmit Message"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer
        className="px-6 md:px-16 py-10 text-center"
        style={{ borderTop: "1px solid rgba(0,255,204,0.08)" }}
      >
        <div className="flex justify-center gap-6 mb-6">
          {[
            { href: "https://linkedin.com/in/paul-adamu-67bb46324", icon: <Linkedin size={20} />, label: "LinkedIn" },
            { href: "https://www.instagram.com/pa_zti", icon: <Instagram size={20} />, label: "Instagram" },
            { href: "https://www.youtube.com/@officialpauladamu", icon: <Youtube size={20} />, label: "YouTube" },
          ].map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="transition-all duration-300"
              style={{ color: "#8b949e" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#00ffcc";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#8b949e";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              }}
            >
              {icon}
            </a>
          ))}
        </div>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.68rem",
            color: "#30363d",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          © 2026 Paul Adamu All Rights Reserved
        </p>
      </footer>
    </main>
  );
}

// ─── WORK PAGE ────────────────────────────────────────────────────────────────

type FilterKey = "all" | "web" | "cybersec" | "design";

function WorkPage({
  setPage,
  setSelectedProject,
}: {
  setPage: (p: Page) => void;
  setSelectedProject: (p: Project) => void;
}) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const projects = useProjects();

  const filters: { key: FilterKey; label: string }[] = [
    { key: "all", label: "All" },
    { key: "web", label: "Web" },
    { key: "cybersec", label: "Cybersec" },
    { key: "design", label: "Design" },
  ];

  const filtered =
    activeFilter === "all"
      ? projects ?? []
      : (projects ?? []).filter((p) => p.category === activeFilter);

  return (
    <main className="min-h-screen px-6 md:px-16 lg:px-24 py-16 max-w-7xl mx-auto relative" style={{ zIndex: 1 }}>
      {/* Page Header */}
      <div className="mb-12 float-in">
        <div className="flex items-center gap-2 mb-4">
          <Layers size={14} style={{ color: "#0070f3" }} />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.68rem",
              color: "#0070f3",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </span>
        </div>
        <h1
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
            fontWeight: 800,
            color: "#f0f6fc",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
          }}
        >
          Selected{" "}
          <span
            style={{
              color: "#00ffcc",
              textShadow: "0 0 30px rgba(0,255,204,0.3)",
            }}
          >
            Projects
          </span>
        </h1>
        <p
          className="mt-4 max-w-lg"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "#8b949e",
            fontSize: "1rem",
            lineHeight: 1.7,
          }}
        >
          A collection of secure architectures, modern interfaces, and
          full-stack systems built with precision.
        </p>
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 flex-wrap mb-10 relative">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveFilter(key)}
            className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              background:
                activeFilter === key
                  ? "#00ffcc"
                  : "rgba(33,38,45,0.8)",
              color:
                activeFilter === key ? "#0d1117" : "#8b949e",
              border:
                activeFilter === key
                  ? "1px solid #00ffcc"
                  : "1px solid rgba(0,255,204,0.1)",
              boxShadow:
                activeFilter === key
                  ? "0 0 16px rgba(0,255,204,0.3)"
                  : "none",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div
        className="grid gap-6"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
      >
        {filtered.map((project) => (
          <div
            key={project.id}
            style={{
              gridColumn: project.featured && activeFilter === "all" ? "span 2" : "span 1",
            }}
            className="transition-all duration-500"
          >
            <ProjectCard
              project={project}
              onSelect={(p) => {
                setSelectedProject(p);
                setPage("case-study");
              }}
            />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-24">
          <p style={{ fontFamily: "'JetBrains Mono', monospace", color: "#8b949e", fontSize: "0.85rem" }}>
            {projects === null
              ? "// Loading projects…"
              : "// No projects published in this category yet"}
          </p>
        </div>
      )}
    </main>
  );
}

// ─── CASE STUDY PAGE ──────────────────────────────────────────────────────────

function CaseStudyPage({
  project,
  setPage,
}: {
  project: Project;
  setPage: (p: Page) => void;
}) {
  const [activeScreen, setActiveScreen] = useState(0);

  const categoryColor: Record<string, string> = {
    web: "#0070f3",
    cybersec: "#00ffcc",
    design: "#7c3aed",
  };

  return (
    <main className="min-h-screen relative" style={{ zIndex: 1 }}>
      {/* Back button */}
      <div className="px-6 md:px-16 lg:px-24 pt-10 max-w-7xl mx-auto">
        <button
          onClick={() => setPage("work")}
          className="flex items-center gap-2 mb-8 transition-colors duration-300 group"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.72rem",
            color: "#8b949e",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#00ffcc")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#8b949e")}
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Work
        </button>
      </div>

      {/* Split-pane layout */}
      <div className="px-6 md:px-16 lg:px-24 pb-20 max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">

        {/* ── LEFT: Technical Details ─────────────────────────────── */}
        <div className="flex flex-col gap-8 float-in">

          {/* Category + Tag */}
          <div className="flex items-center gap-3">
            <span
              className="px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                background: `rgba(${project.category === "cybersec" ? "0,255,204" : project.category === "web" ? "0,112,243" : "124,58,237"},0.12)`,
                border: `1px solid ${categoryColor[project.category]}40`,
                color: categoryColor[project.category],
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {project.tag}
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                color: "#8b949e",
                letterSpacing: "0.1em",
              }}
            >
              {project.year}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              color: "#f0f6fc",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {project.title}
          </h1>

          {/* Long description */}
          <p style={{ color: "#8b949e", lineHeight: 1.85, fontFamily: "'Inter', sans-serif" }}>
            {project.longDescription}
          </p>

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Role", value: project.role },
              { label: "Year", value: project.year },
              { label: "Status", value: "Live" },
              { label: "Type", value: project.tag },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="p-4 rounded-xl"
                style={{
                  background: "rgba(22,27,34,0.8)",
                  border: "1px solid rgba(0,255,204,0.08)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6rem",
                    color: "#8b949e",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: "0.4rem",
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "#f0f6fc",
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* Language breakdown */}
          <div
            className="p-6 rounded-xl"
            style={{
              background: "rgba(22,27,34,0.8)",
              border: "1px solid rgba(0,255,204,0.08)",
            }}
          >
            <div
              className="mb-4"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                color: "#8b949e",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Language Breakdown
            </div>
            <div className="space-y-3">
              {project.bars.map((bar) => (
                <div key={bar.label}>
                  <div className="flex justify-between mb-1">
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: "#f0f6fc" }}>
                      {bar.label}
                    </span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: bar.color }}>
                      {bar.pct}%
                    </span>
                  </div>
                  <div className="w-full rounded-full h-1.5" style={{ background: "rgba(33,38,45,1)" }}>
                    <div
                      className="h-1.5 rounded-full transition-all duration-1000"
                      style={{
                        width: `${bar.pct}%`,
                        background: `linear-gradient(to right, ${bar.color}cc, ${bar.color})`,
                        boxShadow: `0 0 8px ${bar.color}60`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Used */}
          <div>
            <div
              className="mb-3"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                color: "#8b949e",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Technologies Used
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-lg text-xs"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    background: "rgba(33,38,45,0.8)",
                    border: "1px solid rgba(0,255,204,0.12)",
                    color: "#f0f6fc",
                    letterSpacing: "0.04em",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Live Link */}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-3 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300"
            style={{
              background: "#00ffcc",
              color: "#0d1117",
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.03em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 28px rgba(0,255,204,0.45)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
            }}
          >
            <ExternalLink size={16} /> View Live Project
          </a>
        </div>

        {/* ── RIGHT: Glass Dashboard Frame ────────────────────────── */}
        <div className="flex flex-col gap-5 float-in" style={{ animationDelay: "0.15s" }}>
          {/* Main screenshot frame */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "rgba(22,27,34,0.7)",
              border: "1px solid rgba(0,255,204,0.15)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 0 60px rgba(0,112,243,0.08), 0 0 0 1px rgba(0,255,204,0.05)",
            }}
          >
            {/* Browser chrome mock */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ borderBottom: "1px solid rgba(0,255,204,0.1)", background: "rgba(13,17,23,0.5)" }}
            >
              <div className="flex gap-1.5">
                {["#f85149", "#e3b341", "#3fb950"].map((c) => (
                  <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.8 }} />
                ))}
              </div>
              <div
                className="flex-1 mx-4 px-3 py-1 rounded text-center"
                style={{
                  background: "rgba(33,38,45,0.6)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.62rem",
                  color: "#8b949e",
                  letterSpacing: "0.04em",
                }}
              >
                {project.liveUrl.replace("https://", "")}
              </div>
              <Eye size={12} style={{ color: "#8b949e" }} />
            </div>

            {/* Screenshot */}
            <div className="relative" style={{ height: 360 }}>
              <ImageWithFallback
                src={project.screens[activeScreen]}
                alt={`${project.title} — screenshot ${activeScreen + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Scanline overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 2px)",
                }}
              />
              {/* Inner glow */}
              <div
                className="absolute inset-0 pointer-events-none rounded-b-2xl"
                style={{
                  boxShadow: "inset 0 0 40px rgba(0,112,243,0.06)",
                }}
              />
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-3">
            {project.screens.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveScreen(i)}
                className="relative rounded-xl overflow-hidden flex-1 transition-all duration-300"
                style={{
                  height: 80,
                  border: `1px solid ${i === activeScreen ? "rgba(0,255,204,0.5)" : "rgba(0,255,204,0.08)"}`,
                  boxShadow: i === activeScreen ? "0 0 14px rgba(0,255,204,0.2)" : "none",
                }}
              >
                <ImageWithFallback
                  src={src}
                  alt={`Screen ${i + 1}`}
                  className="w-full h-full object-cover"
                  style={{ opacity: i === activeScreen ? 1 : 0.45 }}
                />
              </button>
            ))}
          </div>

          {/* Cyber stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Performance", value: "98", unit: "/100" },
              { label: "Accessibility", value: "94", unit: "/100" },
              { label: "Security", value: "A+", unit: "" },
            ].map(({ label, value, unit }) => (
              <div
                key={label}
                className="p-4 rounded-xl text-center"
                style={{
                  background: "rgba(22,27,34,0.8)",
                  border: "1px solid rgba(0,255,204,0.08)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    color: "#00ffcc",
                    textShadow: "0 0 10px rgba(0,255,204,0.4)",
                    lineHeight: 1,
                  }}
                >
                  {value}
                  <span style={{ fontSize: "0.7rem", opacity: 0.6 }}>{unit}</span>
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6rem",
                    color: "#8b949e",
                    marginTop: "0.4rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div
      className="min-h-screen relative"
      style={{
        background: "#0d1117",
        color: "#f0f6fc",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Inject keyframe styles once */}
      <style>{GLOBAL_STYLES}</style>

      {/* Persistent star field background */}
      <StarField />

      {/* Header */}
      <Header page={page} setPage={setPage} />

      {/* Page Router */}
      {page === "home" && (
        <HomePage
          setPage={setPage}
          setSelectedProject={setSelectedProject}
        />
      )}
      {page === "work" && (
        <WorkPage
          setPage={setPage}
          setSelectedProject={setSelectedProject}
        />
      )}
      {page === "case-study" && selectedProject && (
        <CaseStudyPage project={selectedProject} setPage={setPage} />
      )}
    </div>
  );
}
