---
name: Flaticon icon requests
description: How to handle a request for tech-stack icons "from flaticon.com"
---
Flaticon isn't scriptable/fetchable the way this agent operates — there's no API
key flow set up, and reusing individual icons has per-icon attribution/download
requirements. When a user asks for tech-stack brand icons (language/framework/tool
logos) "from Flaticon," substitute `react-icons/si` (Simple Icons) instead: same
recognizable brand marks, MIT-licensed, works as normal React components with
`size` and `style.color` props, no attribution needed.

**Why:** Confirmed working substitute in a real request for TypeScript, Python,
Firebase, JavaScript, Git, React, Figma, C, Tailwind CSS, Supabase, and OWASP logos
— all exist as `SiTypescript`, `SiPython`, `SiFirebase`, `SiJavascript`, `SiGit`,
`SiReact`, `SiFigma`, `SiC`, `SiTailwindcss`, `SiSupabase`, `SiOwasp`.

**How to apply:** Install `react-icons`, import from `react-icons/si`, and note the
substitution to the user rather than silently doing something different than asked.
