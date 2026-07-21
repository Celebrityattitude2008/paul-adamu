import { Github, Linkedin, Mail, ExternalLink, Shield, Code2, Database, Lock, Terminal, CheckCircle2, ArrowRight, Send } from 'lucide-react';

export function SlateGold() {
  return (
    <div className="min-h-screen overflow-y-auto bg-[#0F172A] text-[#F8FAFC]">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#0F172A]/80 backdrop-blur-xl border-b border-[#334155]/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight">
            <span className="text-[#F8FAFC]">Paul</span>
            <span className="text-[#EAB308]"> Adamu</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-[#CBD5E1] hover:text-[#EAB308] transition-colors text-sm font-medium">Home</a>
            <a href="#work" className="text-[#CBD5E1] hover:text-[#EAB308] transition-colors text-sm font-medium">Work</a>
            <a href="https://github.com/pazti" target="_blank" rel="noopener noreferrer" className="text-[#CBD5E1] hover:text-[#EAB308] transition-colors text-sm font-medium">GitHub</a>
            <a href="#" className="text-[#CBD5E1] hover:text-[#EAB308] transition-colors text-sm font-medium">LinkedIn</a>
            <button className="bg-[#EAB308] text-[#0F172A] px-5 py-2 rounded-lg font-semibold text-sm hover:bg-[#F59E0B] transition-all hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]">
              Hire Me
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="relative px-6 py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E293B]/40 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[#1E293B] border border-[#EAB308]/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-[#EAB308] rounded-full animate-pulse" />
              <span className="text-[#EAB308] text-sm font-medium">Available for new opportunities</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Paul Adamu
            </h1>
            
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-[#EAB308]" />
              <p className="text-xl md:text-2xl text-[#CBD5E1]">
                Full-Stack Developer <span className="text-[#EAB308]">·</span> Cybersecurity Specialist
              </p>
            </div>
            
            <p className="text-lg text-[#94A3B8] leading-relaxed mb-10 max-w-2xl">
              I build secure, scalable web applications with a security-first mindset. From architecting robust APIs to implementing zero-trust authentication systems, I combine full-stack expertise with cybersecurity best practices.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#work" className="group inline-flex items-center gap-2 bg-[#EAB308] text-[#0F172A] px-6 py-3 rounded-lg font-semibold hover:bg-[#F59E0B] transition-all hover:shadow-[0_0_24px_rgba(234,179,8,0.4)]">
                View My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 bg-[#1E293B] text-[#F8FAFC] px-6 py-3 rounded-lg font-semibold border border-[#334155] hover:border-[#EAB308]/50 transition-all">
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-16 border-y border-[#334155]/50 bg-gradient-to-r from-[#1E293B]/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#EAB308] mb-2">5+</div>
              <div className="text-sm text-[#94A3B8] uppercase tracking-wider">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#EAB308] mb-2">47</div>
              <div className="text-sm text-[#94A3B8] uppercase tracking-wider">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#EAB308] mb-2">12</div>
              <div className="text-sm text-[#94A3B8] uppercase tracking-wider">Certifications</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#EAB308] mb-2">99.8%</div>
              <div className="text-sm text-[#94A3B8] uppercase tracking-wider">Uptime Record</div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-sm font-semibold text-[#EAB308] mb-4 uppercase tracking-wider">About Me</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Building secure systems for the modern web</h2>
              <div className="space-y-4 text-[#94A3B8] leading-relaxed">
                <p>
                  With over five years of experience at the intersection of full-stack development and cybersecurity, I specialize in creating applications that don't compromise on security or user experience.
                </p>
                <p>
                  My approach combines modern web technologies with OWASP standards, secure coding practices, and threat modeling. Every line of code is written with both functionality and security in mind.
                </p>
                <p>
                  From authentication systems to real-time monitoring dashboards, I deliver production-grade solutions that protect what matters most.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { icon: Shield, title: 'Security-First Architecture', desc: 'Zero-trust principles, encryption at rest and in transit' },
                { icon: Code2, title: 'Modern Tech Stack', desc: 'React, TypeScript, Python, Firebase, Tailwind CSS' },
                { icon: Database, title: 'Scalable Solutions', desc: 'Cloud-native infrastructure built for growth' },
              ].map((item, i) => (
                <div key={i} className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 hover:border-[#EAB308]/30 transition-colors group">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-[#EAB308]/10 rounded-lg flex items-center justify-center group-hover:bg-[#EAB308]/20 transition-colors">
                        <item.icon className="w-6 h-6 text-[#EAB308]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#F8FAFC] mb-2">{item.title}</h3>
                      <p className="text-sm text-[#94A3B8]">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="px-6 py-24 bg-gradient-to-b from-[#1E293B]/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-semibold text-[#EAB308] mb-4 uppercase tracking-wider">Technical Expertise</div>
            <h2 className="text-4xl md:text-5xl font-bold">Skills & Technologies</h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              'TypeScript', 'Python', 'React', 'Next.js', 'Node.js', 
              'Firebase', 'PostgreSQL', 'Tailwind CSS', 'Git', 
              'Docker', 'AWS', 'OWASP', 'Penetration Testing', 
              'OAuth 2.0', 'JWT', 'Encryption', 'Threat Modeling'
            ].map((skill, i) => (
              <div 
                key={i} 
                className="bg-[#1E293B] border border-[#334155] rounded-lg px-5 py-3 text-[#F8FAFC] font-medium hover:border-[#EAB308] hover:shadow-[0_0_16px_rgba(234,179,8,0.15)] transition-all cursor-default"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section id="work" className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-semibold text-[#EAB308] mb-4 uppercase tracking-wider">Portfolio</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
            <p className="text-[#94A3B8] max-w-2xl mx-auto">
              A selection of recent work showcasing security-focused application development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'ZeroTrust Dashboard',
                desc: 'Real-time security monitoring platform with role-based access control and audit logging. Built with React, Firebase, and custom authentication middleware.',
                tags: ['React', 'Firebase', 'Security'],
                icon: Shield
              },
              {
                title: 'SecureShell Monitor',
                desc: 'SSH connection monitoring tool with intrusion detection alerts. Python-based backend with WebSocket real-time updates and encrypted storage.',
                tags: ['Python', 'WebSocket', 'Encryption'],
                icon: Terminal
              },
              {
                title: 'Auth Fortress API',
                desc: 'OAuth 2.0 compliant authentication service with MFA support, rate limiting, and comprehensive security headers. Production-ready REST API.',
                tags: ['Node.js', 'OAuth', 'PostgreSQL'],
                icon: Lock
              }
            ].map((project, i) => (
              <div 
                key={i} 
                className="group bg-[#1E293B] border border-[#334155] rounded-2xl p-8 hover:border-[#EAB308]/40 transition-all hover:shadow-[0_8px_32px_rgba(234,179,8,0.12)]"
              >
                <div className="w-14 h-14 bg-[#EAB308]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#EAB308]/20 transition-colors">
                  <project.icon className="w-7 h-7 text-[#EAB308]" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-[#F8FAFC]">{project.title}</h3>
                <p className="text-[#94A3B8] mb-6 leading-relaxed">{project.desc}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="text-xs bg-[#0F172A] text-[#EAB308] px-3 py-1 rounded-full font-medium border border-[#EAB308]/20">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <a href="#" className="inline-flex items-center gap-2 text-[#EAB308] font-semibold text-sm group-hover:gap-3 transition-all">
                  View Case Study
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 py-24 border-t border-[#334155]/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-sm font-semibold text-[#EAB308] mb-4 uppercase tracking-wider">Get In Touch</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Build Something Secure</h2>
          <p className="text-[#94A3B8] mb-12 text-lg">
            Available for contract work, consulting, and full-time opportunities. Let's discuss how I can help secure your next project.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a 
              href="mailto:paul@example.com" 
              className="inline-flex items-center justify-center gap-3 bg-[#EAB308] text-[#0F172A] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#F59E0B] transition-all hover:shadow-[0_0_28px_rgba(234,179,8,0.4)]"
            >
              <Mail className="w-5 h-5" />
              paul@example.com
            </a>
            <a 
              href="#" 
              className="inline-flex items-center justify-center gap-3 bg-[#1E293B] text-[#F8FAFC] px-8 py-4 rounded-lg font-semibold text-lg border border-[#334155] hover:border-[#EAB308]/50 transition-all"
            >
              <Send className="w-5 h-5" />
              Schedule a Call
            </a>
          </div>
          
          <div className="flex justify-center gap-6">
            <a 
              href="https://github.com/pazti" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-[#1E293B] border border-[#334155] rounded-lg flex items-center justify-center hover:border-[#EAB308] hover:bg-[#EAB308]/10 transition-all"
            >
              <Github className="w-5 h-5 text-[#CBD5E1]" />
            </a>
            <a 
              href="#" 
              className="w-12 h-12 bg-[#1E293B] border border-[#334155] rounded-lg flex items-center justify-center hover:border-[#EAB308] hover:bg-[#EAB308]/10 transition-all"
            >
              <Linkedin className="w-5 h-5 text-[#CBD5E1]" />
            </a>
            <a 
              href="mailto:paul@example.com" 
              className="w-12 h-12 bg-[#1E293B] border border-[#334155] rounded-lg flex items-center justify-center hover:border-[#EAB308] hover:bg-[#EAB308]/10 transition-all"
            >
              <Mail className="w-5 h-5 text-[#CBD5E1]" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-[#334155]/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#64748B]">
            <div>© 2024 Paul Adamu. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="https://github.com/pazti" target="_blank" rel="noopener noreferrer" className="hover:text-[#EAB308] transition-colors">GitHub</a>
              <a href="#" className="hover:text-[#EAB308] transition-colors">LinkedIn</a>
              <a href="mailto:paul@example.com" className="hover:text-[#EAB308] transition-colors">Email</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
