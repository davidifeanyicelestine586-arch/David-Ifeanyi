const projects = [
  {
    name: "Tech Stack Architect",
    status: "Flagship",
    description: "A deterministic architecture workspace that analyzes project definitions, recommends compatible technologies, validates decisions, and generates implementation blueprints.",
    stack: "Next.js · React · TypeScript · Tailwind · shadcn/ui · Supabase",
    href: "/projects/tech-stack-architect",
  },
  {
    name: "Sharp AI",
    status: "MVP / in development",
    description: "An AI content studio exploring generation of blog, social and email formats from a single idea, with a small backend proxy and local usage tracking.",
    stack: "React · TypeScript · Express · OpenAI",
    href: "https://github.com/davidifeanyicelestine586-arch/sharp-ai",
  },
  {
    name: "StoryPix",
    status: "Needs current-source review",
    description: "An AI creative application repository whose current source needs to be evaluated beyond its inherited AI Studio README before stronger claims are made.",
    stack: "React · Vite · Express · Gemini",
    href: "https://github.com/davidifeanyicelestine586-arch/StoryPix",
  },
  {
    name: "Ediccrew.com",
    status: "Active web project",
    description: "A technology-focused WordPress publication and web project covering technology, people, trends, tools and practical build-oriented topics.",
    stack: "WordPress · Elementor · SEO · Web tooling",
    href: "https://ediccrew.com",
  },
  {
    name: "ToolStack Backend",
    status: "Prototype",
    description: "A small FastAPI experiment that loads a tool registry and returns recommendations using simple tag-in-query matching.",
    stack: "Python · FastAPI",
    href: "https://github.com/davidifeanyicelestine586-arch/toolstack-backend",
  },
  {
    name: "VizualMecha Studio",
    status: "Early stage",
    description: "An early-stage project exploring a virtual mechatronics lab and 3D visualization direction. The larger concept is kept separate from the limited repository implementation.",
    stack: "Mechatronics · 3D visualization concepts",
    href: "https://github.com/davidifeanyicelestine586-arch/VizualMecha-Studio-",
  },
  {
    name: "My First Line of Code",
    status: "Early milestone",
    description: "A simple first web programming project preserved as part of the progression from beginner programming work toward larger systems.",
    stack: "HTML · CSS · JavaScript",
    href: "https://github.com/davidifeanyicelestine586-arch/my-first-line-of-code",
  },
];

export default function ProjectsPage() {
  return (
    <main className="page-shell">
      <div className="container">
        <a className="back" href="/">← Home</a>
        <div className="eyebrow">Selected work</div>
        <h1>Projects</h1>
        <p className="page-lede">A documented progression from early web work to increasingly structured software and engineering projects.</p>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project-card" key={project.name}>
              <div className="project-meta"><span>{project.status}</span></div>
              <h2>{project.name}</h2>
              <p>{project.description}</p>
              <p className="mono">{project.stack}</p>
              <a className="text-link" href={project.href} target={project.href.startsWith("http") ? "_blank" : undefined} rel={project.href.startsWith("http") ? "noreferrer" : undefined}>Inspect project →</a>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
