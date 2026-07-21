import { useState, useEffect, useRef, useCallback } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import paulPhoto from "@/imports/paul.png";
import {
  Github,
  Linkedin,
  Instagram,
  Youtube,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Code2,
  ChevronLeft,
  Menu,
  X,
  Lock,
  Globe,
  Terminal,
  Layers,
  Eye,
  ChevronRight,
  Mail,
  Server,
  Shield,
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
import type { Project, SiteSettings } from "@/lib/types";
import { subscribeToProjects } from "@/lib/projects";
import { sendMessage } from "@/lib/messages";
import { subscribeToSiteSettings, DEFAULT_SETTINGS } from "@/lib/settings";

// ─── Types ───────────────────────────────────────────────────────────────────

type Page = "home" | "work" | "case-study";

export type { Project };

// ─── Tech Stack ───────────────────────────────────────────────────────────────

const TECH_STACK: { label: string; icon: IconType; color: string }[] = [
  { label: "TypeScript", icon: SiTypescript, color: "#3178c6" },
  { label: "Python", icon: SiPython, color: "#3776ab" },
  { label: "Firebase", icon: SiFirebase, color: "#f59e0b" },
  { label: "JavaScript", icon: SiJavascript, color: "#d97706" },
  { label: "Git", icon: SiGit, color: "#f05032" },
  { label: "React", icon: SiReact, color: "#0ea5e9" },
  { label: "Figma", icon: SiFigma, color: "#f24e1e" },
  { label: "C", icon: SiC, color: "#6b7280" },
  { label: "Tailwind CSS", icon: SiTailwindcss, color: "#0ea5e9" },
  { label: "Supabase", icon: SiSupabase, color: "#10b981" },
  { label: "OWASP", icon: SiOwasp, color: "#d97706" },
  { label: "PHP", icon: SiPhp, color: "#7c3aed" },
];

// ─── Global Styles ────────────────────────────────────────────────────────────

const GLOBAL_STYLES = `
  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes floatUp {
    0%   { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulseAmber {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.5; }
  }
  .marquee-inner { animation: marquee 32s linear infinite; }
  .float-in      { animation: floatUp 0.6s ease both; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #fafaf8; }
  ::-webkit-scrollbar-thumb { background: #fbbf24; border-radius: 2px; }
`;

// ─── Data Hooks ───────────────────────────────────────────────────────────────

function useProjects() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  useEffect(() => {
    const unsub = subscribeToProjects(setProjects);
    return unsub;
  }, []);
  return projects;
}

function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  useEffect(() => {
    const unsub = subscribeToSiteSettings(setSettings);
    return unsub;
  }, []);
  return settings;
}

// ─── Countdown Timer ─────────────────────────────────────────────────────────

function CountdownTimer({ targetDate: targetDateStr }: { targetDate: string }) {
  const targetDate = new Date(`${targetDateStr}T00:00:00`).getTime();
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
    setTime(calc());
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDateStr]);

  const units = [
    { label: "Days", value: time.d },
    { label: "Hours", value: time.h },
    { label: "Min", value: time.m },
    { label: "Sec", value: time.s },
  ];

  return (
    <div className="flex flex-col items-start gap-2">
      <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest">
        Next Major Release
      </p>
      <div className="flex gap-2">
        {units.map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col items-center px-3 py-2 rounded-xl border border-stone-200 bg-white min-w-[56px]"
          >
            <span className="text-xl font-bold text-[#1C1917] font-['Plus_Jakarta_Sans']">
              {String(value).padStart(2, "0")}
            </span>
            <span className="text-[10px] text-stone-400 font-medium uppercase tracking-wider mt-0.5">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tech Marquee ─────────────────────────────────────────────────────────────

function TechMarquee() {
  const doubled = [...TECH_STACK, ...TECH_STACK];
  return (
    <div className="relative w-full overflow-hidden py-5 border-y border-stone-200/80 bg-white/60">
      <div
        className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #fafaf8 0%, transparent 100%)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #fafaf8 0%, transparent 100%)" }}
      />
      <div className="flex marquee-inner" style={{ width: "max-content" }}>
        {doubled.map((tech, i) => (
          <div
            key={i}
            className="flex items-center gap-2 mx-4 px-4 py-2 rounded-full bg-stone-50 border border-stone-200 select-none"
            style={{ whiteSpace: "nowrap" }}
          >
            <tech.icon size={15} style={{ color: tech.color, flexShrink: 0 }} />
            <span className="text-sm font-medium text-stone-500">{tech.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FAFAF8]/90 backdrop-blur-md border-b border-stone-200/60">
      <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between py-4">
        {/* Logo */}
        <button
          onClick={() => setPage("home")}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-amber-950 font-bold text-sm font-['Plus_Jakarta_Sans']">
            P
          </div>
          <span className="font-bold text-xl text-[#1C1917] font-['Plus_Jakarta_Sans'] tracking-tight">
            Paul Adamu
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-500">
          <button
            onClick={() => setPage("home")}
            className={`hover:text-amber-600 transition-colors ${page === "home" ? "text-amber-600" : ""}`}
          >
            Home
          </button>
          <button
            onClick={() => setPage("work")}
            className={`hover:text-amber-600 transition-colors ${page === "work" || page === "case-study" ? "text-amber-600" : ""}`}
          >
            Work
          </button>
          <a
            href="https://github.com/pazti"
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber-600 transition-colors flex items-center gap-1.5"
          >
            <Github className="w-4 h-4" /> GitHub
          </a>
          <a
            href="https://linkedin.com/in/paul-adamu-67bb46324"
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber-600 transition-colors flex items-center gap-1.5"
          >
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
          <a
            href="#contact"
            onClick={() => setPage("home")}
            className="bg-amber-400 hover:bg-amber-500 text-amber-950 px-5 py-2 rounded-full font-semibold text-sm transition-all shadow-sm shadow-amber-400/30"
          >
            Hire Me
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-stone-500"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#FAFAF8]/97 backdrop-blur-md border-b border-stone-200 flex flex-col gap-1 px-6 py-4 md:hidden">
          {[
            { label: "Home", action: () => { setPage("home"); setMenuOpen(false); } },
            { label: "Work", action: () => { setPage("work"); setMenuOpen(false); } },
          ].map(({ label, action }) => (
            <button
              key={label}
              onClick={action}
              className="text-left py-2.5 text-stone-600 font-medium hover:text-amber-600 transition-colors"
            >
              {label}
            </button>
          ))}
          <a
            href="https://github.com/pazti"
            target="_blank"
            rel="noreferrer"
            className="py-2.5 text-stone-600 font-medium hover:text-amber-600 transition-colors flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <Github className="w-4 h-4" /> GitHub
          </a>
          <a
            href="https://linkedin.com/in/paul-adamu-67bb46324"
            target="_blank"
            rel="noreferrer"
            className="py-2.5 text-stone-600 font-medium hover:text-amber-600 transition-colors flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
          <a
            href="#contact"
            onClick={() => { setPage("home"); setMenuOpen(false); }}
            className="mt-2 bg-amber-400 text-amber-950 px-5 py-2.5 rounded-full font-semibold text-sm text-center"
          >
            Hire Me
          </a>
        </div>
      )}
    </header>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({ project, onSelect }: { project: Project; onSelect: (p: Project) => void }) {
  const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    web:      { bg: "bg-sky-50",    text: "text-sky-700",    border: "border-sky-200" },
    cybersec: { bg: "bg-amber-50",  text: "text-amber-700",  border: "border-amber-200" },
    design:   { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200" },
  };
  const cat = categoryColors[project.category] ?? categoryColors.web;

  return (
    <div
      onClick={() => onSelect(project)}
      className="group bg-white rounded-3xl p-3 border border-stone-100 shadow-sm hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
    >
      {/* Image */}
      <div className="relative rounded-2xl overflow-hidden mb-5 bg-stone-50" style={{ height: 220 }}>
        <ImageWithFallback
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${cat.bg} ${cat.text} ${cat.border}`}>
            {project.tag}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-3 pb-3 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-[#1C1917] font-['Plus_Jakarta_Sans'] mb-2 group-hover:text-amber-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-stone-500 leading-relaxed flex-1 mb-4">
          {project.description}
        </p>

        {/* Language bars */}
        <div className="space-y-1.5 mb-4">
          {project.bars.map((bar) => (
            <div key={bar.label} className="flex items-center gap-2">
              <div
                className="rounded-full h-1"
                style={{ width: `${bar.pct}%`, background: bar.color, minWidth: 20, maxWidth: "100%", flexShrink: 0 }}
              />
              <span className="text-xs text-stone-400">{bar.label} {bar.pct}%</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-sm font-semibold text-[#1C1917] group-hover:text-amber-600 group-hover:gap-2.5 transition-all duration-300">
          View Case Study <ArrowRight className="w-4 h-4" />
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
  const settings = useSiteSettings();
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
    <main className="relative">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-20 flex flex-col md:flex-row items-center gap-12 float-in">
        {/* Text side */}
        <div className="flex-1 space-y-7 text-center md:text-left order-2 md:order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-800 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-500" style={{ animation: "pulseAmber 1.5s ease-in-out infinite" }} />
            Available for new opportunities
          </div>

          <h1 className="font-['Plus_Jakarta_Sans'] text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#1C1917] leading-[1.07] tracking-tight">
            Full-Stack{" "}
            <span className="text-amber-500">Developer</span>
            <br />& Cybersecurity
            <br />
            <span className="text-stone-300 font-light">Specialist</span>
          </h1>

          <p className="text-lg text-stone-500 max-w-2xl leading-relaxed mx-auto md:mx-0">
            I build web systems that are fast, visually sharp, and hardened against
            modern threats — bridging elegant interfaces with enterprise-grade security.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <button
              onClick={() => setPage("work")}
              className="bg-[#1C1917] hover:bg-stone-700 text-white px-7 py-3.5 rounded-full font-semibold flex items-center gap-2 transition-all hover:-translate-y-0.5"
            >
              View My Work <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#contact"
              className="bg-white hover:bg-stone-50 text-[#1C1917] border border-stone-200 px-7 py-3.5 rounded-full font-semibold transition-all"
            >
              Get In Touch
            </a>
          </div>

          <div className="pt-1">
            <CountdownTimer targetDate={settings.nextReleaseDate} />
          </div>
        </div>

        {/* Photo side */}
        <div className="relative shrink-0 order-1 md:order-2 w-60 h-60 md:w-80 md:h-80 lg:w-96 lg:h-96">
          <div className="absolute inset-0 bg-amber-200 rounded-full blur-3xl opacity-30 -z-10 translate-x-4 translate-y-4" />
          <div className="w-full h-full rounded-full border-2 border-stone-100 p-2 bg-white/60 backdrop-blur-sm overflow-hidden">
            <div className="w-full h-full rounded-full overflow-hidden bg-stone-100 relative">
              <ImageWithFallback
                src={paulPhoto}
                alt="Paul Adamu"
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
                <div className="absolute inset-0 flex items-center justify-center bg-stone-100">
                  <div className="w-7 h-7 rounded-full border-2 border-stone-200 border-t-amber-400 animate-spin" />
                </div>
              )}
            </div>
          </div>

          {/* Badge */}
          <div className="absolute -bottom-2 md:bottom-6 -left-2 md:-left-10 bg-white border border-stone-100 shadow-lg shadow-stone-200/60 rounded-2xl px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-stone-400 font-medium">Security First</p>
              <p className="text-sm font-bold text-[#1C1917]">OWASP Certified</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH MARQUEE ─────────────────────────────────────────── */}
      <TechMarquee />

      {/* ── STATS ────────────────────────────────────────────────── */}
      <section className="border-b border-stone-200/60 bg-white/50">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-wrap justify-center gap-10 md:gap-24">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-extrabold text-[#1C1917] font-['Plus_Jakarta_Sans'] mb-1">{stat.value}</p>
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col lg:flex-row gap-14 items-start">
        <div className="lg:w-1/2 space-y-5">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-widest">About</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1C1917] font-['Plus_Jakarta_Sans'] leading-snug">
            Building Secure,{" "}
            <span className="text-amber-500">Modern Web</span> Systems
          </h2>
          <p className="text-stone-500 leading-relaxed">
            I specialize in crafting web experiences that are pixel-precise on the
            surface and armored underneath. With a background in full-stack development
            and cybersecurity, I approach every project as both a UX challenge and a
            threat model.
          </p>
        </div>

        <div className="lg:w-1/2 w-full flex flex-col gap-3">
          {[
            { icon: <Shield className="w-4 h-4" />, title: "Security-First Mindset", desc: "Every line of code reviewed for OWASP vulnerabilities, XSS vectors, and auth edge cases." },
            { icon: <Globe className="w-4 h-4" />, title: "Frontend Precision", desc: "React, Tailwind, and animation libraries used to build interfaces that feel alive." },
            { icon: <Terminal className="w-4 h-4" />, title: "Full-Stack Capability", desc: "Firebase, REST APIs, and server-side rendering when the brief demands it." },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 p-5 bg-white border border-stone-100 rounded-2xl shadow-sm hover:shadow-md hover:border-amber-200 transition-all">
              <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="font-semibold text-[#1C1917] mb-1 text-sm">{item.title}</p>
                <p className="text-sm text-stone-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────── */}
      <section className="bg-white/50 border-y border-stone-200/60">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-center gap-2 mb-8">
            <Code2 className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-widest">Technical Arsenal</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {["TypeScript", "Python", "React", "Next.js", "Node.js", "Firebase", "Tailwind CSS", "Git", "OWASP", "Cryptography", "Penetration Testing", "PHP", "Supabase", "Figma"].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2.5 bg-stone-50 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-800 text-stone-600 text-sm font-medium rounded-xl border border-stone-200 transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED WORK ────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-semibold text-amber-600 uppercase tracking-widest">Portfolio</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1917] font-['Plus_Jakarta_Sans']">Featured Work</h2>
          </div>
          <button
            onClick={() => setPage("work")}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
          >
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {preview.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {preview.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onSelect={(proj) => { setSelectedProject(proj); setPage("case-study"); }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl border border-dashed border-stone-200 bg-stone-50/50">
            <p className="text-stone-400 text-sm font-medium">
              {projects === null ? "Loading projects…" : "No projects published yet — check back soon"}
            </p>
          </div>
        )}
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────── */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        {/* CTA banner */}
        <div className="bg-amber-400 rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden shadow-xl shadow-amber-500/20 mb-14">
          <div className="absolute top-0 right-0 w-72 h-72 bg-amber-300 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500 rounded-full blur-3xl opacity-30 translate-y-1/4 -translate-x-1/4 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-amber-950 font-['Plus_Jakarta_Sans'] mb-4 tracking-tight">
              Let's build something secure together.
            </h2>
            <p className="text-amber-900/80 text-lg mb-8 max-w-xl mx-auto">
              Currently open for new opportunities. Whether you have a question or just want to say hi, my inbox is open.
            </p>
            <a
              href="mailto:pauladamu600@gmail.com"
              className="inline-flex items-center gap-2 bg-[#1C1917] text-white px-7 py-3.5 rounded-full font-semibold hover:bg-stone-700 transition-all hover:scale-105"
            >
              <Mail className="w-5 h-5" /> Say Hello
            </a>
          </div>
        </div>

        {/* Contact form */}
        <div className="max-w-xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-widest">Send a Message</span>
          </div>
          <h3 className="text-2xl font-bold text-[#1C1917] font-['Plus_Jakarta_Sans'] mb-1">Direct Inbox</h3>
          <p className="text-stone-500 text-sm mb-8">Open to freelance projects, security audits, and collaborations.</p>

          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-12 rounded-2xl text-center bg-amber-50 border border-amber-200">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <Shield className="w-6 h-6" />
              </div>
              <p className="font-bold text-[#1C1917] font-['Plus_Jakarta_Sans']">Message Sent!</p>
              <p className="text-stone-500 text-sm">I'll get back to you within 48 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {[
                { key: "name",    label: "Full Name",      type: "text",  placeholder: "Your name" },
                { key: "email",   label: "Email Address",  type: "email", placeholder: "you@domain.com" },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">{label}</label>
                  <input
                    type={type}
                    name={key}
                    placeholder={placeholder}
                    required
                    value={formData[key as keyof typeof formData]}
                    onChange={(e) => setFormData((f) => ({ ...f, [key]: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-[#1C1917] text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all placeholder:text-stone-300"
                  />
                </div>
              ))}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="How can I help you?"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-[#1C1917] text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all resize-none placeholder:text-stone-300"
                />
              </div>
              {sendError && (
                <p className="text-sm rounded-xl px-4 py-3 bg-red-50 border border-red-200 text-red-600">{sendError}</p>
              )}
              <button
                type="submit"
                disabled={sending}
                className="w-full py-3.5 rounded-full font-semibold text-sm bg-amber-400 hover:bg-amber-500 text-amber-950 transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                {sending ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="border-t border-stone-200/60 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-lg text-[#1C1917] font-['Plus_Jakarta_Sans']">
            <div className="w-6 h-6 rounded bg-amber-400 flex items-center justify-center text-amber-950 text-xs font-bold">P</div>
            Paul Adamu
          </div>
          <p className="text-sm text-stone-400 font-medium">© {new Date().getFullYear()} Paul Adamu. All rights reserved.</p>
          <div className="flex items-center gap-2 text-stone-400">
            {[
              { href: "https://github.com/pazti", icon: <Github className="w-5 h-5" />, label: "GitHub" },
              { href: "https://linkedin.com/in/paul-adamu-67bb46324", icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn" },
              { href: "https://www.instagram.com/pa_zti", icon: <Instagram className="w-5 h-5" />, label: "Instagram" },
              { href: "https://www.youtube.com/@officialpauladamu", icon: <Youtube className="w-5 h-5" />, label: "YouTube" },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="p-2 hover:text-amber-500 transition-colors hover:-translate-y-0.5 transform"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}

// ─── WORK PAGE ────────────────────────────────────────────────────────────────

type FilterKey = "all" | "web" | "cybersec" | "design";

function WorkPage({ setPage, setSelectedProject }: { setPage: (p: Page) => void; setSelectedProject: (p: Project) => void }) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const projects = useProjects();

  const filters: { key: FilterKey; label: string }[] = [
    { key: "all",      label: "All" },
    { key: "web",      label: "Web" },
    { key: "cybersec", label: "Cybersec" },
    { key: "design",   label: "Design" },
  ];

  const filtered =
    activeFilter === "all"
      ? projects ?? []
      : (projects ?? []).filter((p) => p.category === activeFilter);

  return (
    <main className="max-w-6xl mx-auto px-6 py-16 float-in">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-semibold text-amber-600 uppercase tracking-widest">Portfolio</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#1C1917] font-['Plus_Jakarta_Sans'] leading-tight tracking-tight mb-4">
          Selected <span className="text-amber-500">Projects</span>
        </h1>
        <p className="text-stone-500 max-w-lg leading-relaxed">
          A collection of secure architectures, modern interfaces, and full-stack systems built with precision.
        </p>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 flex-wrap mb-10">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveFilter(key)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              activeFilter === key
                ? "bg-amber-400 text-amber-950 shadow-sm shadow-amber-400/40"
                : "bg-white border border-stone-200 text-stone-500 hover:border-amber-300 hover:text-amber-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
        {filtered.map((project) => (
          <div
            key={project.id}
            style={{ gridColumn: project.featured && activeFilter === "all" ? "span 2" : "span 1" }}
          >
            <ProjectCard
              project={project}
              onSelect={(p) => { setSelectedProject(p); setPage("case-study"); }}
            />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-24 rounded-2xl border border-dashed border-stone-200">
          <p className="text-stone-400 text-sm">
            {projects === null ? "Loading projects…" : "No projects in this category yet"}
          </p>
        </div>
      )}
    </main>
  );
}

// ─── CASE STUDY PAGE ──────────────────────────────────────────────────────────

function CaseStudyPage({ project, setPage }: { project: Project; setPage: (p: Page) => void }) {
  const [activeScreen, setActiveScreen] = useState(0);

  const categoryStyles: Record<string, { bg: string; text: string; border: string }> = {
    web:      { bg: "bg-sky-50",    text: "text-sky-700",    border: "border-sky-200" },
    cybersec: { bg: "bg-amber-50",  text: "text-amber-700",  border: "border-amber-200" },
    design:   { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200" },
  };
  const cat = categoryStyles[project.category] ?? categoryStyles.web;

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 float-in">
      {/* Back */}
      <button
        onClick={() => setPage("work")}
        className="flex items-center gap-2 mb-10 text-sm font-semibold text-stone-400 hover:text-amber-600 transition-colors group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Work
      </button>

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
        {/* ── LEFT: Details ──────────────────────────────────────── */}
        <div className="flex flex-col gap-7">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${cat.bg} ${cat.text} ${cat.border}`}>
              {project.tag}
            </span>
            <span className="text-xs text-stone-400">{project.year}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1C1917] font-['Plus_Jakarta_Sans'] leading-tight">
            {project.title}
          </h1>

          <p className="text-stone-500 leading-relaxed">{project.longDescription}</p>

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Role",   value: project.role },
              { label: "Year",   value: project.year },
              { label: "Status", value: "Live" },
              { label: "Type",   value: project.tag },
            ].map(({ label, value }) => (
              <div key={label} className="p-4 rounded-2xl bg-white border border-stone-100 shadow-sm">
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">{label}</p>
                <p className="text-sm font-semibold text-[#1C1917]">{value}</p>
              </div>
            ))}
          </div>

          {/* Language breakdown */}
          <div className="bg-white border border-stone-100 shadow-sm rounded-2xl p-6">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-4">Language Breakdown</p>
            <div className="space-y-3">
              {project.bars.map((bar) => (
                <div key={bar.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-[#1C1917]">{bar.label}</span>
                    <span className="text-sm font-semibold" style={{ color: bar.color }}>{bar.pct}%</span>
                  </div>
                  <div className="w-full rounded-full h-1.5 bg-stone-100">
                    <div
                      className="h-1.5 rounded-full transition-all duration-700"
                      style={{ width: `${bar.pct}%`, background: bar.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech used */}
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Technologies Used</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium bg-stone-50 border border-stone-200 text-stone-600"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Live link */}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-3.5 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 font-semibold text-sm transition-all hover:-translate-y-0.5 shadow-sm shadow-amber-400/40"
          >
            <ExternalLink className="w-4 h-4" /> View Live Project
          </a>
        </div>

        {/* ── RIGHT: Screenshots ─────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          {/* Main screenshot */}
          <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-sm bg-white">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-stone-100 bg-stone-50">
              <div className="flex gap-1.5">
                {["#f85149", "#e3b341", "#3fb950"].map((c) => (
                  <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.8 }} />
                ))}
              </div>
              <div className="flex-1 mx-3 px-3 py-1 rounded bg-stone-100 text-xs text-stone-400 text-center truncate">
                {project.liveUrl.replace("https://", "")}
              </div>
              <Eye className="w-3 h-3 text-stone-400" />
            </div>
            <div style={{ height: 360 }}>
              <ImageWithFallback
                src={project.screens[activeScreen]}
                alt={`${project.title} — screenshot ${activeScreen + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Thumbnails */}
          {project.screens.length > 1 && (
            <div className="flex gap-3">
              {project.screens.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveScreen(i)}
                  className={`relative rounded-xl overflow-hidden flex-1 transition-all duration-200 ${
                    i === activeScreen ? "ring-2 ring-amber-400 shadow-md" : "opacity-50 hover:opacity-70"
                  }`}
                  style={{ height: 72 }}
                >
                  <ImageWithFallback
                    src={src}
                    alt={`Screen ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Score cards */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Performance", value: "98", unit: "/100" },
              { label: "Accessibility", value: "94", unit: "/100" },
              { label: "Security", value: "A+", unit: "" },
            ].map(({ label, value, unit }) => (
              <div key={label} className="p-4 rounded-2xl bg-white border border-stone-100 shadow-sm text-center">
                <p className="text-2xl font-extrabold text-amber-500 font-['Plus_Jakarta_Sans'] leading-none mb-1">
                  {value}<span className="text-xs text-stone-400 font-normal">{unit}</span>
                </p>
                <p className="text-xs text-stone-400 font-medium uppercase tracking-wider">{label}</p>
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#FAFAF8",
        color: "#57534E",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{GLOBAL_STYLES}</style>
      <Header page={page} setPage={setPage} />

      {page === "home" && (
        <HomePage setPage={setPage} setSelectedProject={setSelectedProject} />
      )}
      {page === "work" && (
        <WorkPage setPage={setPage} setSelectedProject={setSelectedProject} />
      )}
      {page === "case-study" && selectedProject && (
        <CaseStudyPage project={selectedProject} setPage={setPage} />
      )}
    </div>
  );
}
