import { projects } from "../../../data/portfolio";

const project = projects.find((item) => item.name === "Tech Stack Architect");

export default function TechStackArchitectCaseStudy() {
  if (!project) return null;

  return (
    <main className="case-study">
      <div className="container">
        <a className="back" href="/#projects">← Back to projects</a>
        <div className="eyebrow">Featured case study · {project.status}</div>
        <h1>{project.name}</h1>
        <p className="case-lede">{project.description}</p>
        <div className="tags">{project.stack.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>

        <div className="case-grid">
          <section><h2>Overview</h2><p>The project explores how software architecture decisions can be represented as structured data and processed through a deterministic workflow rather than relying on opaque recommendations.</p></section>
          <section><h2>Workflow</h2><p className="mono">Define → Analyze → Recommend → Validate → Blueprint</p><p>The system works with component, domain and recipe registries, dependencies and conflicts, then produces recommendations and a blueprint.</p></section>
          <section><h2>Technical structure</h2><p>The application uses a Next.js/React frontend with TypeScript, Tailwind CSS and shadcn/ui. The architecture engine is deterministic and in-memory. Project documentation also records a persistence path through an API, persistence service, repository layer and Supabase.</p></section>
          <section><h2>Implementation evidence</h2><p>Documented work includes recommendation scoring, dependency/conflict handling, validation, recipes, Markdown/JSON blueprint export and persistence operations such as Save, Open, List and Delete. Current deployment availability of persistence depends on its environment configuration, so this portfolio does not describe it as universally enabled.</p></section>
          <section><h2>Status & limits</h2><p>This is the flagship technical project in the portfolio. The deterministic architecture engine is presented separately from environment-dependent persistence so the case study does not imply that every deployment has the same capabilities.</p></section>
          <section><h2>Inspect the work</h2><div className="actions"><a className="button primary" href={project.repository} target="_blank" rel="noreferrer">GitHub repository ↗</a>{project.live && <a className="button" href={project.live} target="_blank" rel="noreferrer">Live project ↗</a>}</div></section>
        </div>
      </div>
    </main>
  );
}
