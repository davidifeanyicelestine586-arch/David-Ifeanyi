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
          <div className="eyebrow">Selected work · Portfolio</div>
          <h1>Projects</h1>
          <p className="page-lede">
            A documented progression from early web work to increasingly structured
            software and engineering projects.
          </p>
        </header>

        <div className="project-list">
          {projects.map((project, index) => {
            const featured = index === 0;

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
                    <div className="tags">
                      {project.stack.map((tag) => (
                        <span className="tag" key={tag}>{tag}</span>
                      ))}
                    </div>

                    <div className="actions">
                      {project.caseStudy && (
                        <RadialRevealButton
                          label="Read case study →"
                          link={project.caseStudy}
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
                          border={{
                            borderWidth: 1,
                            borderStyle: "solid",
                            borderColor: "#d8ff64",
                          }}
                        />
                      )}

                      {project.repository && (
                        <a className="text-link" href={project.repository} target="_blank" rel="noreferrer">
                          Repository ↗
                        </a>
                      )}

                      {project.live && (
                        <a className="text-link" href={project.live} target="_blank" rel="noreferrer">
                          Live project ↗
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
