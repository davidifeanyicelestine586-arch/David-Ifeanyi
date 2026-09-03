const projects = [
  {
    name: "Tech Stack Architect", status: "Flagship",
    description: "A technical workspace for defining a project, analyzing requirements, recommending compatible technologies, validating decisions, and generating an implementation blueprint.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Supabase"], href: "https://architect.ediccrew.com", repo: "https://github.com/davidifeanyicelestine586-arch/tech-stack-architect", featured: true,
  },
  {
    name: "Sharp AI", status: "MVP",
    description: "An AI-assisted content studio for turning one idea into blog, social and email formats. Production persistence, authentication and billing boundaries remain incomplete.",
    stack: ["Next.js", "React", "TypeScript", "Express", "OpenAI"], repo: "https://github.com/davidifeanyicelestine586-arch/sharp-ai",
  },
  {
    name: "StoryPix", status: "Early-stage",
    description: "An AI-oriented creative application in active development. The repository requires continued source-level verification before stronger claims about its current feature set.",
    stack: ["React", "Vite", "TypeScript", "Express"], repo: "https://github.com/davidifeanyicelestine586-arch/StoryPix",
  },
  {
    name: "Ediccrew Workflow", status: "Android project",
    description: "An Android project in the portfolio. Its public repository requires security hygiene work, so sensitive repository artifacts are deliberately not reproduced here.",
    stack: ["Android", "Gradle"], repo: "https://github.com/davidifeanyicelestine586-arch/Ediccrew-workflow",
  },
  {
    name: "VizualMecha Studio", status: "Early-stage",
    description: "An early-stage project exploring virtual mechatronics and 3D visualization concepts. The broader concept is kept distinct from what is currently implemented in the repository.",
    stack: ["Mechatronics", "3D Visualization"], repo: "https://github.com/davidifeanyicelestine586-arch/VizualMecha-Studio-",
  },
  {
    name: "ToolStack Backend", status: "Prototype",
    description: "A small FastAPI prototype that loads a tool registry and returns recommendations using simple tag-in-query matching.",
    stack: ["Python", "FastAPI"], repo: "https://github.com/davidifeanyicelestine586-arch/toolstack-backend",
  },
  {
    name: "My First Line of Code", status: "Early milestone",
    description: "A simple first web programming project preserved as part of the progression toward larger systems.",
    stack: ["HTML", "CSS", "JavaScript"], repo: "https://github.com/davidifeanyicelestine586-arch/my-first-line-of-code",
  },
];

const skills = [
  ["Programming", "Python · JavaScript · TypeScript · HTML · CSS"],
  ["Frontend", "React · Next.js · Tailwind CSS · shadcn/ui · responsive UI"],
  ["Backend & APIs", "REST APIs · Express · FastAPI · integrations · API error handling"],
  ["Data & persistence", "PostgreSQL · Supabase · persistence patterns · repository patterns"],
  ["Development", "Git · GitHub · debugging · testing · build verification · CLI"],
  ["Web systems", "WordPress · Elementor · SEO · Search Console · GA4 · GTM"],
  ["AI-assisted development", "Coding agents · prompt engineering · AI-assisted debugging"],
  ["Engineering", "Mechatronics · electronics · embedded concepts · Arduino · control concepts"],
];

export default function Home() {
  return (<>
    <nav className="nav" aria-label="Primary navigation"><div className="container nav-inner"><a className="brand" href="#top">David<span>.</span></a><div className="nav-links"><a href="#about">About</a><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="#journey">Journey</a><a href="#contact">Contact</a></div></div></nav>
    <main id="top">
      <header className="hero"><div className="container"><div className="eyebrow">Mechatronics Engineering × Software Development</div><h1>I build practical software while learning to engineer better systems.</h1><p className="lede">I’m David Ifeanyi, a Mechatronics Engineering student developing practical capabilities across web development, software systems, automation and AI-assisted development through hands-on projects.</p><div className="actions"><a className="button primary" href="#projects">View projects ↓</a><a className="button" href="https://github.com/davidifeanyicelestine586-arch" target="_blank" rel="noreferrer">GitHub ↗</a><a className="button" href="#contact">Contact</a></div></div></header>
      <section id="about"><div className="container"><div className="section-head"><h2>About</h2><p className="section-copy">My engineering education gives me a systems-oriented foundation. Alongside it, I have been teaching myself software and web development by building, debugging, documenting and iterating on real projects. I’m interested in the space where physical systems, software and practical problem solving meet.</p></div></div></section>
      <section id="skills"><div className="container"><div className="section-head"><h2>Technical areas</h2><p className="section-copy">A working map of technologies and areas supported by documented project work and learning. It is intentionally not a proficiency scorecard.</p></div><div className="skill-grid">{skills.map(([name,list])=><div className="skill" key={name}><strong>{name}</strong><span>{list}</span></div>)}</div></div></section>
      <section id="projects"><div className="container"><div className="section-head"><h2>Selected work</h2><p className="section-copy">Projects are presented according to technical significance, evidence and current maturity. Status labels are deliberately conservative.</p></div><div className="grid">{projects.map(p=><article className={`card ${p.featured?"featured":""}`} key={p.name}><div className="card-top"><h3>{p.name}</h3><span className="status">{p.status}</span></div><p>{p.description}</p><div className="tags">{p.stack.map(tag=><span className="tag" key={tag}>{tag}</span>)}</div><div className="actions"><a className="link" href={p.repo} target="_blank" rel="noreferrer">Repository ↗</a>{p.href&&<a className="link" href={p.href} target="_blank" rel="noreferrer">Live project ↗</a>}</div></article>)}</div><div className="actions section-action"><a className="button" href="/projects">View all project details →</a></div></div></section>
      <section id="featured"><div className="container"><div className="section-head"><h2>Featured system</h2><p className="section-copy">Tech Stack Architect is the clearest example of my move from building individual interfaces toward thinking about structured technical systems.</p></div><div className="card featured"><div className="eyebrow">Define → Analyze → Recommend → Validate → Blueprint</div><h3 className="feature-title">A deterministic architecture workflow</h3><p>The project uses structured registries and rules to reason about technologies, dependencies and conflicts. Its documented persistence work adds a separate data path through an API, persistence service, repository layer and Supabase. The portfolio deliberately keeps those concerns distinct rather than presenting persistence as automatically available in every deployment.</p><div className="tags"><span className="tag">Deterministic reasoning</span><span className="tag">Dependency handling</span><span className="tag">Validation</span><span className="tag">Blueprint export</span></div><a className="link" href="/projects/tech-stack-architect">Read case study →</a></div></div></section>
      <section id="journey"><div className="container"><div className="section-head"><h2>Development journey</h2><p className="section-copy">The portfolio is not meant to hide the learning curve. The progression from first code to larger systems is part of the evidence.</p></div><div className="journey"><div className="journey-item"><div className="year">EARLY</div><div><h3>First code</h3><p>Early web programming work established the starting point and remains a marker of the learning journey.</p></div></div><div className="journey-item"><div className="year">BUILDING</div><div><h3>Web & software systems</h3><p>Projects expanded into React, Next.js, APIs, backend services, databases, deployment and structured application architecture.</p></div></div><div className="journey-item"><div className="year">CURRENT</div><div><h3>Systems thinking</h3><p>Current work increasingly explores deterministic tooling, persistence boundaries, AI-assisted development and the connection between engineering and software.</p></div></div></div></div></section>
      <section id="contact"><div className="container contact-box"><div><div className="eyebrow">Get in touch</div><h2>Have a technical project, opportunity or useful problem to discuss?</h2></div><div className="actions"><a className="button primary" href="mailto:davidifeanyicelestine586@gmail.com">Email me</a><a className="button" href="https://www.linkedin.com/in/davidify" target="_blank" rel="noreferrer">LinkedIn ↗</a></div></div></section>
    </main><footer><div className="container footer-inner"><span>David Ifeanyi</span><span className="mono">Built around evidence, not hype.</span></div></footer>
  </>);
}
