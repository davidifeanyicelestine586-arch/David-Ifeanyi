import { projects } from "../../../data/portfolio";
import RadialRevealButton from "../../../components/originkit/RadialRevealButton";

const project = projects.find((item) => item.name === "Tech Stack Architect");

const buttonFont = {
  fontFamily: "Manrope, system-ui, sans-serif",
  fontWeight: 700,
  fontSize: 14,
};

export default function TechStackArchitectCaseStudy() {
  if (!project) return null;

  return (
    <main className="case-study">
      <div className="container">
        <a className="back" href="/#projects">← Back to projects</a>
        <div className="eyebrow">Featured case study · {project.status}</div>
        <h1>{project.name}</h1>
        <p className="case-lede">{project.description}</p>
        <div className="tags">
          {project.stack.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
        </div>

        <div className="case-grid">
          <section>
            <h2>Overview</h2>
            <p>
              Tech Stack Architect is a client-side Next.js workspace for assembling,
              validating and exporting technology-stack blueprints. Its current engine
              uses structured registry data and deterministic rules rather than opaque
              AI-generated recommendations.
            </p>
          </section>

          <section>
            <h2>Workflow</h2>
            <p className="mono workflow">Define → Analyze → Recommend → Validate → Blueprint</p>
            <p>
              A project definition is normalized, relevant registry metadata is analyzed,
              compatible technologies are ranked, the selected stack is validated, and a
              blueprint can be exported as Markdown or JSON.
            </p>
          </section>

          <section>
            <h2>Recommendation engine</h2>
            <p>
              Recommendations are scored from explicit signals including selected-domain
              matches, normalized metadata terms, difficulty preference, recipe relevance
              and registry dependency compatibility. Scores are deterministic and capped
              at 100, with explanations shown alongside recommendations.
            </p>
          </section>

          <section>
            <h2>Validation</h2>
            <p>
              Selected technologies pass through dependency, conflict, pin and rule
              validation before the blueprint is generated. Declared conflicts can prevent
              incompatible items from being added through the conservative bulk-add flow.
            </p>
          </section>

          <section>
            <h2>Current scope & limits</h2>
            <p>
              The current product is intentionally client-side and in-memory. It does not
              currently include authentication, persistence, a database, backend services,
              external APIs, AI/LLM integrations or cloud integrations. Those capabilities
              are separate from the current implementation and are not represented here as
              completed features.
            </p>
          </section>

          <section>
            <h2>Inspect the work</h2>
            <div className="actions case-actions">
              {project.repository && (
                <RadialRevealButton
                  label="GitHub repository ↗"
                  link={project.repository}
                  padding="13px 18px"
                  rounded={100}
                  font={buttonFont}
                  colors={{
                    fill: "#d8ff64",
                    hoverFill: "#008E8E",
                    textColor: "#10130b",
                    hoverTextColor: "#ffffff",
                  }}
                  border={{ borderWidth: 1, borderStyle: "solid", borderColor: "#d8ff64" }}
                />
              )}
              {project.live && (
                <RadialRevealButton
                  label="Live project ↗"
                  link={project.live}
                  padding="13px 18px"
                  rounded={100}
                  font={buttonFont}
                  colors={{
                    fill: "#101318",
                    hoverFill: "#008E8E",
                    textColor: "#f2f4f7",
                    hoverTextColor: "#ffffff",
                  }}
                  border={{ borderWidth: 1, borderStyle: "solid", borderColor: "#242a32" }}
                />
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
