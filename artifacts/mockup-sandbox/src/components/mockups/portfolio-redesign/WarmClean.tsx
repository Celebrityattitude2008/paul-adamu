import React from 'react';
import { Github, Linkedin, Mail, ExternalLink, ArrowRight, ShieldCheck, Code, Server, Terminal, Lock } from 'lucide-react';

export default function WarmClean() {
  return (
    <div className="min-h-screen overflow-y-auto bg-[#FAFAF8] text-[#57534E] selection:bg-amber-100 selection:text-amber-900 font-body">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
        .font-heading { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}} />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#FAFAF8]/90 backdrop-blur-md border-b border-stone-200/50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-heading font-bold text-xl tracking-tight text-[#1C1917] flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-amber-950">P</div>
            Paul Adamu
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#home" className="hover:text-amber-600 transition-colors">Home</a>
            <a href="#work" className="hover:text-amber-600 transition-colors">Work</a>
            <a href="https://github.com/pazti" target="_blank" rel="noreferrer" className="hover:text-amber-600 transition-colors flex items-center gap-1.5"><Github className="w-4 h-4"/> GitHub</a>
            <a href="#" className="hover:text-amber-600 transition-colors flex items-center gap-1.5"><Linkedin className="w-4 h-4"/> LinkedIn</a>
            <a href="#contact" className="bg-amber-400 hover:bg-amber-500 text-amber-950 px-5 py-2.5 rounded-full font-semibold transition-all shadow-sm shadow-amber-500/20">Hire Me</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="pt-24 pb-20 md:pt-32 md:pb-28 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 space-y-8 order-2 md:order-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-800 text-sm font-medium font-heading">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            Available for new opportunities
          </div>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-[#1C1917] leading-[1.1] tracking-tight">
            Full-Stack Developer <br className="hidden lg:block" />
            <span className="text-stone-300 font-light">&</span> <span className="text-amber-500">Cybersecurity Specialist</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-500 max-w-2xl leading-relaxed mx-auto md:mx-0">
            I build secure, scalable web systems that protect user data while delivering exceptional experiences. Bridging the gap between beautiful code and ironclad security.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <a href="#work" className="bg-[#1C1917] hover:bg-stone-800 text-white px-8 py-3.5 rounded-full font-medium transition-colors flex items-center gap-2">
              View My Work <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#contact" className="bg-white hover:bg-stone-50 text-[#1C1917] border border-stone-200 px-8 py-3.5 rounded-full font-medium transition-colors">
              Get In Touch
            </a>
          </div>
        </div>
        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 shrink-0 order-1 md:order-2">
          <div className="absolute inset-0 bg-amber-200 rounded-full blur-3xl opacity-30 -z-10 transform translate-x-8 translate-y-8"></div>
          <div className="w-full h-full rounded-full border-2 border-stone-200/50 p-2 overflow-hidden bg-white/50 backdrop-blur-sm relative">
             <div className="w-full h-full rounded-full bg-stone-100 flex items-center justify-center overflow-hidden relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-amber-100/80 to-stone-50 opacity-80"></div>
               <svg className="w-32 h-32 text-stone-300" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
             </div>
          </div>
          
          <div className="absolute -bottom-4 md:bottom-8 -left-4 md:-left-8 bg-white p-4 rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-stone-500 font-medium">Security First</p>
              <p className="text-sm font-bold text-[#1C1917]">OWASP Certified</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="border-y border-stone-200/50 bg-white/50 backdrop-blur-sm relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-wrap justify-center gap-12 md:gap-32">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-[#1C1917] font-heading mb-1">3+</h3>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest">Years Experience</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-[#1C1917] font-heading mb-1">20+</h3>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest">Projects Shipped</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-[#1C1917] font-heading mb-1">100%</h3>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest">Secure Delivery</p>
          </div>
        </div>
      </section>

      {/* About & Skills */}
      <section className="py-24 px-6 max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold text-[#1C1917] font-heading">The Engineer</h2>
          <p className="text-lg text-stone-600 leading-relaxed">
            I specialize in developing modern web applications with a security-first mindset. 
            In an era where digital threats are constantly evolving, I believe robust security 
            shouldn't compromise a smooth, elegant user experience.
          </p>
          <p className="text-lg text-stone-600 leading-relaxed">
            From architecting zero-trust dashboards to building secure authentication fortresses, 
            I write code that both users and security auditors love.
          </p>
        </div>
        <div className="lg:w-1/2 w-full">
          <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm border border-stone-100">
            <h3 className="font-heading text-lg font-semibold text-[#1C1917] mb-6 flex items-center gap-2">
              <Code className="w-5 h-5 text-amber-500" /> Technical Arsenal
            </h3>
            <div className="flex flex-wrap gap-3">
              {['TypeScript', 'Python', 'React', 'Next.js', 'Node.js', 'Firebase', 'Tailwind CSS', 'Git', 'OWASP', 'Cryptography', 'Penetration Testing'].map(skill => (
                <span key={skill} className="px-4 py-2.5 bg-stone-50 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-800 text-stone-600 text-sm font-medium rounded-xl border border-stone-100 transition-all cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section id="work" className="py-24 bg-white/50 border-y border-stone-200/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1C1917] font-heading mb-4">Featured Work</h2>
              <p className="text-stone-500 text-lg max-w-xl">A selection of recent projects highlighting secure architecture and modern development practices.</p>
            </div>
            <a href="https://github.com/pazti" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-amber-600 font-medium hover:text-amber-700 transition-colors">
              View full GitHub <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group bg-white rounded-[2rem] p-3 shadow-sm shadow-stone-200/20 border border-stone-100 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1 transition-all duration-300">
              <div className="aspect-[4/3] bg-stone-50 rounded-3xl mb-6 relative overflow-hidden flex flex-col items-center justify-center border border-stone-100">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 to-transparent"></div>
                <Lock className="w-16 h-16 text-amber-400 mb-4 drop-shadow-sm relative z-10 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-stone-50 to-transparent"></div>
              </div>
              <div className="px-5 pb-5">
                <div className="flex gap-2 mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg">React</span>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-stone-50 text-stone-600 rounded-lg">TypeScript</span>
                </div>
                <h3 className="text-xl font-bold text-[#1C1917] font-heading mb-3 group-hover:text-amber-600 transition-colors">ZeroTrust Dashboard</h3>
                <p className="text-sm text-stone-500 mb-6 line-clamp-2 leading-relaxed">An enterprise-grade monitoring dashboard implementing zero-trust architecture principles for sensitive data access.</p>
                <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1C1917] hover:text-amber-600 transition-colors">
                  View Case Study <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="group bg-white rounded-[2rem] p-3 shadow-sm shadow-stone-200/20 border border-stone-100 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1 transition-all duration-300">
              <div className="aspect-[4/3] bg-stone-50 rounded-3xl mb-6 relative overflow-hidden flex flex-col items-center justify-center border border-stone-100">
                <div className="absolute inset-0 bg-gradient-to-br from-stone-200/50 to-transparent"></div>
                <Terminal className="w-16 h-16 text-stone-400 mb-4 drop-shadow-sm relative z-10 group-hover:text-amber-400 group-hover:scale-110 transition-all duration-500" />
                <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-stone-50 to-transparent"></div>
              </div>
              <div className="px-5 pb-5">
                <div className="flex gap-2 mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg">Python</span>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-stone-50 text-stone-600 rounded-lg">Security</span>
                </div>
                <h3 className="text-xl font-bold text-[#1C1917] font-heading mb-3 group-hover:text-amber-600 transition-colors">SecureShell Monitor</h3>
                <p className="text-sm text-stone-500 mb-6 line-clamp-2 leading-relaxed">A lightweight daemon that monitors SSH login attempts and automatically bans suspicious IP addresses in real-time.</p>
                <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1C1917] hover:text-amber-600 transition-colors">
                  View Case Study <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="group bg-white rounded-[2rem] p-3 shadow-sm shadow-stone-200/20 border border-stone-100 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1 transition-all duration-300 md:col-span-2 lg:col-span-1">
              <div className="aspect-[4/3] bg-stone-50 rounded-3xl mb-6 relative overflow-hidden flex flex-col items-center justify-center border border-stone-100">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-200/30 to-transparent"></div>
                <Server className="w-16 h-16 text-stone-500 mb-4 drop-shadow-sm relative z-10 group-hover:text-amber-400 group-hover:scale-110 transition-all duration-500" />
                <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-stone-50 to-transparent"></div>
              </div>
              <div className="px-5 pb-5">
                <div className="flex gap-2 mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg">Node.js</span>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-stone-50 text-stone-600 rounded-lg">Firebase</span>
                </div>
                <h3 className="text-xl font-bold text-[#1C1917] font-heading mb-3 group-hover:text-amber-600 transition-colors">Auth Fortress API</h3>
                <p className="text-sm text-stone-500 mb-6 line-clamp-2 leading-relaxed">A robust authentication microservice providing passwordless login, MFA, and JWT management for SaaS platforms.</p>
                <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1C1917] hover:text-amber-600 transition-colors">
                  View Case Study <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 md:py-32">
        <div className="max-w-4xl mx-auto bg-amber-400 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden shadow-xl shadow-amber-500/20">
          <div className="absolute top-0 right-0 w-72 h-72 bg-amber-300 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500 rounded-full blur-3xl opacity-30 translate-y-1/4 -translate-x-1/4"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-950 font-heading mb-6 tracking-tight">Let's build something secure together.</h2>
            <p className="text-amber-900/80 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed font-medium">
              Currently open for new opportunities. Whether you have a question or just want to say hi, my inbox is open.
            </p>
            <a href="mailto:hello@example.com" className="inline-flex items-center gap-2 bg-[#1C1917] text-white px-8 py-4 rounded-full font-medium hover:bg-stone-800 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-amber-900/10">
              <Mail className="w-5 h-5" /> Say Hello
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200/50 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-heading font-bold text-lg text-[#1C1917] flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-amber-400 flex items-center justify-center text-amber-950 text-xs">P</div>
            Paul Adamu
          </div>
          <p className="text-sm text-stone-500 font-medium">
            © {new Date().getFullYear()} Paul Adamu. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-stone-400">
            <a href="https://github.com/pazti" target="_blank" rel="noreferrer" className="hover:text-amber-500 transition-colors p-2">
              <span className="sr-only">GitHub</span>
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-amber-500 transition-colors p-2">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
