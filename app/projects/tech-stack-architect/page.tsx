import { projects } from "../../../data/portfolio";
import RadialRevealButton from "../../../components/originkit/RadialRevealButton";

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
          <section><h2>Workflow</h2><p className="mono workflow">Define → Analyze → Recommend → Validate → Blueprint</p><p>The system works with component, domain and recipe registries, dependencies and conflicts, then produces recommendations and a blueprint.</p></section>
          <section><h2>Technical structure</h2><p>The application uses a Next.js/React frontend with TypeScript, Tailwind CSS and shadcn/ui. The architecture engine is deterministic and in-memory. Project documentation also records a persistence path through an API, persistence service, repository layer and Supabase.</p></section>
          <section><h2>Implementation evidence</h2><p>Documented work includes recommendation scoring, dependency/conflict handling, validation, recipes, Markdown/JSON blueprint export and persistence operations such as Save, Open, List and Delete. Current deployment availability of persistence depends on its environment configuration, so this portfolio does not describe it as universally enabled.</p></section>
          <section><h2>Status & limits</h2><p>This is the flagship technical project in the portfolio. The deterministic architecture engine is presented separately from environment-dependent persistence so the case study does not imply that every deployment has the same capabilities.</p></section>
          <section><h2>Inspect the work</h2><div className="actions case-actions"><RadialRevealButton label="GitHub repository ↗" link={project.repository ?? ""} padding="13px 18px" rounded={100} font={{ fontFamily: "Manrope, system-ui, sans-serif", fontWeight: 700, fontSize: 14 }} colors={{ fill: "#d8ff64", hoverFill: "#008E8E", textColor: "#10130b", hoverTextColor: "#ffffff" }} border={{ borderWidth: 1, borderStyle: "solid", borderColor: "#d8ff64" }} />{project.live && <RadialRevealButton label="Live project ↗" link={project.live} padding="13px 18px" rounded={100} font={{ fontFamily: "Manrope, system-ui, sans-serif", fontWeight: 700, fontSize: 14 }} colors={{ fill: "#101318", hoverFill: "#008E8E", textColor: "#f2f4f7", hoverTextColor: "#ffffff" }} border={{ borderWidth: 1, borderStyle: "solid", borderColor: "#242a32" }} />}</div></section>
        </div>
      </div>
    </main>
  );
}
