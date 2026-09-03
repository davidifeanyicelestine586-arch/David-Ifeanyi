import { projects } from "../../data/portfolio";

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
              <p className="mono">{project.stack.join(" · ")}</p>
              <div className="actions">
                <a className="text-link" href={project.repository} target="_blank" rel="noreferrer">Repository ↗</a>
                {project.live && <a className="text-link" href={project.live} target="_blank" rel="noreferrer">Live project ↗</a>}
                {project.caseStudy && <a className="text-link" href={project.caseStudy}>Case study →</a>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
