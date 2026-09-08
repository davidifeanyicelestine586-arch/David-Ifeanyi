import { projects } from "../../data/portfolio";
import RadialRevealButton from "../../components/originkit/RadialRevealButton";

const buttonFont = {
  fontFamily: "Manrope, system-ui, sans-serif",
  fontWeight: 700,
  fontSize: 14,
  lineHeight: 1.2,
};

export default function ProjectsPage() {
  return (
    <main className="page-shell">
      <div className="container">
        <a className="back" href="/">← Home</a>

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
                          <RadialRevealButton
                            label="Explore project →"
                            link={primaryHref}
                            newTab={false}
                            rounded={100}
                            padding="13px 20px"
                            font={buttonFont}
                            colors={{
                              fill: "#d8ff64",
                              textColor: "#10130b",
                              hoverFill: "#008E8E",
                              hoverTextColor: "#ffffff",
                            }}
                            border={{ borderWidth: 1, borderStyle: "solid", borderColor: "#d8ff64" }}
                          />
                        ) : project.live ? (
                          <a className="button button-project-primary" href={primaryHref} target="_blank" rel="noreferrer">
                            View live project ↗
                          </a>
                        ) : (
                          <a className="button button-project-primary" href={primaryHref} target="_blank" rel="noreferrer">
                            Explore repository ↗
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
