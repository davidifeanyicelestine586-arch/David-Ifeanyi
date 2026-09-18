import Link from "next/link";
import { projects } from "../../data/portfolio";

export default function ProjectsPage() {
  return (
    <main className="page-shell">
      <div className="container">
        <Link className="back" href="/">← Home</Link>

        <header>
          <div className="eyebrow">Evidence · Portfolio</div>
          <h1>Projects</h1>
          <p className="page-lede">
            A documented progression from early web work to increasingly structured software
            and engineering projects. Each entry leads with what it is, then points to the
            strongest available evidence.
          </p>
        </header>

        <div className="project-list">
          {projects.map((project, index) => {
            const featured = index === 0;
            const primaryHref = project.caseStudy || project.live || project.repository;

            return (
              <article
                className={`project-card${featured ? " project-card-featured" : ""}`}
                key={project.name}
              >
                <div className="project-meta">
                  <span>{project.status}</span>
                  <span className="mono">{String(index + 1).padStart(2, "0")}</span>
                </div>

                <div className="project-card-content">
                  <div>
                    <h2>{project.name}</h2>
                    <p>{project.description}</p>
                  </div>

                  <div>
                    <div className="tags" aria-label={`${project.name} technologies`}>
                      {project.stack.map((tag) => (
                        <span className="tag" key={tag}>{tag}</span>
                      ))}
                    </div>

                    <div className="actions project-page-actions">
                      {primaryHref && (
                        project.caseStudy ? (
                          <Link className="button primary" href={primaryHref}>
                            Explore project →
                          </Link>
                        ) : (
                          <a
                            className="button primary"
                            href={primaryHref}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {project.live ? "View live project ↗" : "Explore repository ↗"}
                          </a>
                        )
                      )}

                      {project.live && project.live !== primaryHref && (
                        <a className="text-link" href={project.live} target="_blank" rel="noreferrer">
                          Live project ↗
                        </a>
                      )}

                      {project.repository && project.repository !== primaryHref && (
                        <a className="text-link" href={project.repository} target="_blank" rel="noreferrer">
                          Repository ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
