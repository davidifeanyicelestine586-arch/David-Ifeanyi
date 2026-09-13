import { projects } from "../../../data/portfolio";

const project = projects.find((item) => item.name === "Tech Stack Architect");

export default function TechStackArchitectCaseStudy() {
  if (!project) return null;

  return (
    <main className="case-study">
      <div className="container">
        <a className="back" href="/">← Back to portfolio</a>
        <div className="eyebrow">Featured case study · {project.status}</div>
        <h1>{project.name}</h1>
        <p className="case-lede">{project.description}</p>
        <div className="tags" aria-label="Tech Stack Architect technologies">
          {project.stack.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
        </div>

        <div className="case-grid">
          <section>
            <h2>What it solves</h2>
            <p>
              Tech Stack Architect is a Next.js workspace for defining a project, analyzing its
              requirements, recommending compatible technologies, validating decisions and exporting
              technology-stack blueprints. It makes architecture decisions explicit instead of hiding
              them behind an opaque recommendation step.
            </p>
          </section>

          <section>
            <h2>How it works</h2>
            <p className="mono workflow">Define → Analyze → Recommend → Validate → Blueprint</p>
            <p>
              A project definition is normalized, registry metadata is analyzed, compatible
              technologies are ranked, the selected stack is validated, and a blueprint can be
              exported as Markdown or JSON.
            </p>
          </section>

          <section>
            <h2>Recommendation engine</h2>
            <p>
              Recommendations use explicit signals including domain matches, normalized metadata,
              difficulty preference, recipe relevance and registry dependency compatibility. Scores
              are deterministic and capped at 100, with explanations shown alongside recommendations.
            </p>
          </section>

          <section>
            <h2>Validation</h2>
            <p>
              Selected technologies pass through dependency, conflict, pin and rule validation before
              blueprint generation. Declared conflicts can prevent incompatible items from being added
              through the conservative bulk-add flow.
            </p>
          </section>

          <section>
            <h2>Persistence architecture</h2>
            <p>
              Project persistence is separated from the browser UI through a server-side API,
              persistence service and repository boundary backed by Supabase. Saved projects can be
              created, listed, opened, updated and deleted, with revision checks protecting against
              stale updates. The browser does not connect directly to Supabase.
            </p>
          </section>

          <section>
            <h2>Current scope</h2>
            <p>
              The current application includes deterministic registry-based recommendations and
              server-mediated project persistence. Authentication and accounts, teams, collaboration,
              billing, realtime collaboration and AI/LLM-powered recommendations are outside the
              current implementation.
            </p>
          </section>

          <section>
            <h2>Inspect the evidence</h2>
            <div className="actions case-actions">
              {project.live && (
                <a className="button" href={project.live} target="_blank" rel="noreferrer">
                  Open live project ↗
                </a>
              )}
              {project.repository && (
                <a className="button" href={project.repository} target="_blank" rel="noreferrer">
                  Inspect GitHub repository ↗
                </a>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
