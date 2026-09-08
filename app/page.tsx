import { profile, projects, skills } from "../data/portfolio";
import Globe from "../components/originkit/Globe";
import RadialRevealButton from "../components/originkit/RadialRevealButton";

export default function Home() {
  return (
    <>
      <nav className="nav" aria-label="Primary navigation">
        <div className="container nav-inner">
          <a className="brand" href="#top" aria-label="David Ifeanyi home">
            David<span>.</span>
          </a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#work">Work</a>
            <a href="#journey">Journey</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <main id="top">
        <header className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">Mechatronics Engineering × Software Development</div>
              <h1>I build practical software and explore the systems behind it.</h1>
              <p className="lede">
                I’m {profile.name}, a {profile.role.toLowerCase()}. I learn by building, debugging,
                documenting and iterating on real projects.
              </p>
              <div className="actions hero-actions">
                <RadialRevealButton
                  label="View selected work"
                  link="#work"
                  newTab={false}
                  padding="14px 20px"
                  rounded={100}
                  font={{ fontFamily: "Manrope, system-ui, sans-serif", fontWeight: 700, fontSize: 14 }}
                  colors={{ fill: "#d8ff64", hoverFill: "#008E8E", textColor: "#10130b", hoverTextColor: "#ffffff" }}
                  border={{ borderWidth: 1, borderStyle: "solid", borderColor: "#d8ff64" }}
                />
                <RadialRevealButton
                  label="Contact me"
                  link="#contact"
                  newTab={false}
                  padding="14px 20px"
                  rounded={100}
                  font={{ fontFamily: "Manrope, system-ui, sans-serif", fontWeight: 700, fontSize: 14 }}
                  colors={{ fill: "#101318", hoverFill: "#008E8E", textColor: "#f2f4f7", hoverTextColor: "#ffffff" }}
                  border={{ borderWidth: 1, borderStyle: "solid", borderColor: "#242a32" }}
                />
                <a className="hero-tertiary" href={profile.github} target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
              </div>
            </div>
            <div className="hero-visual" aria-hidden="true">
              <Globe style={{ width: "100%", height: "100%" }} />
            </div>
          </div>
        </header>

        <section id="about">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="eyebrow">01 · Identity</div>
                <h2>About</h2>
              </div>
              <p className="section-copy">
                My engineering education gives me a systems-oriented foundation. Alongside it, I have
                been learning software and web development by building, debugging, documenting and
                iterating on projects. I’m interested in the space where physical systems, software and
                practical problem solving meet.
              </p>
            </div>
          </div>
        </section>

        <section id="work">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="eyebrow">02 · Evidence</div>
                <h2>Selected work</h2>
              </div>
              <p className="section-copy">
                A focused view of projects that show how I learn and build. Start with the project,
                then follow the strongest available evidence.
              </p>
            </div>

            <div className="grid">
              {projects.map((p) => (
                <article className={`card ${p.caseStudy ? "featured" : ""}`} key={p.name}>
                  <div className="card-top">
                    <div>
                      <h3>{p.name}</h3>
                      <span className="project-type">Project</span>
                    </div>
                    <span className="status">{p.status}</span>
                  </div>
                  <p>{p.description}</p>
                  <div className="tags">
                    {p.stack.map((tag) => (
                      <span className="tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="actions project-actions">
                    {p.caseStudy && <a className="link link-primary" href={p.caseStudy}>Explore project →</a>}
                    {p.live && <a className="link link-secondary" href={p.live} target="_blank" rel="noreferrer">Live project ↗</a>}
                    {p.repository && <a className="link link-tertiary" href={p.repository} target="_blank" rel="noreferrer">Repository ↗</a>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="featured">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="eyebrow">03 · Proof anchor</div>
                <h2>Featured system</h2>
              </div>
              <p className="section-copy">
                The clearest example of my move from building individual interfaces toward thinking about
                structured technical systems.
              </p>
            </div>
            <div className="card featured feature-system">
              <div className="feature-system-grid">
                <div>
                  <div className="eyebrow">Tech Stack Architect</div>
                  <h3 className="feature-title">A deterministic architecture workflow</h3>
                  <p>
                    A structured workspace for defining a project, analyzing requirements, recommending
                    compatible technologies, validating decisions and generating an implementation blueprint.
                  </p>
                </div>
                <div>
                  <div className="workflow" aria-label="Tech Stack Architect workflow">
                    <span>Define</span><span>→</span><span>Analyze</span><span>→</span><span>Recommend</span>
                    <span>→</span><span>Validate</span><span>→</span><span>Blueprint</span>
                  </div>
                  <p className="feature-proof">
                    Its documented persistence work separates API, persistence service, repository and
                    Supabase concerns rather than assuming persistence is available everywhere.
                  </p>
                </div>
              </div>
              <div className="tags">
                <span className="tag">Deterministic reasoning</span>
                <span className="tag">Dependency handling</span>
                <span className="tag">Validation</span>
                <span className="tag">Blueprint export</span>
              </div>
              <a className="link link-primary" href="/projects/tech-stack-architect">Read case study →</a>
            </div>
          </div>
        </section>

        <section id="skills">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="eyebrow">Toolkit</div>
                <h2>Technical areas</h2>
              </div>
              <p className="section-copy">
                A working map of technologies and areas supported by documented project work and learning.
                It is intentionally not a proficiency scorecard.
              </p>
            </div>
            <div className="skill-grid">
              {skills.map(([name, list]) => (
                <div className="skill" key={name}>
                  <strong>{name}</strong>
                  <span>{list.join(" · ")}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="journey">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="eyebrow">04 · Trajectory</div>
                <h2>Development journey</h2>
              </div>
              <p className="section-copy">
                The progression from first code to larger systems is part of the evidence, not something to hide.
              </p>
            </div>
            <div className="journey">
              <div className="journey-item">
                <div className="year">EARLY</div>
                <div><h3>First code</h3><p>Early web programming work established the starting point and remains a marker of the learning journey.</p></div>
              </div>
              <div className="journey-item">
                <div className="year">BUILDING</div>
                <div><h3>Web & software systems</h3><p>Projects expanded into React, Next.js, APIs, backend services, databases, deployment and structured application architecture.</p></div>
              </div>
              <div className="journey-item">
                <div className="year">CURRENT</div>
                <div><h3>Systems thinking</h3><p>Current work increasingly explores deterministic tooling, persistence boundaries, AI-assisted development and the connection between engineering and software.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="container contact-box">
            <div>
              <div className="eyebrow">Get in touch</div>
              <h2>Let’s build something useful.</h2>
              <p className="section-copy contact-copy">
                Have a technical project, opportunity, collaboration or useful problem to discuss? I’d be glad to hear from you.
              </p>
            </div>
            <div className="actions contact-actions">
              <RadialRevealButton
                label="Email me"
                link={`mailto:${profile.email}`}
                padding="15px 22px"
                rounded={100}
                font={{ fontFamily: "Manrope, system-ui, sans-serif", fontWeight: 700, fontSize: 14 }}
                colors={{ fill: "#d8ff64", hoverFill: "#008E8E", textColor: "#10130b", hoverTextColor: "#ffffff" }}
                border={{ borderWidth: 1, borderStyle: "solid", borderColor: "#d8ff64" }}
              />
              <a className="button" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <span>{profile.name}</span>
          <span className="mono">Built around evidence, not hype.</span>
        </div>
      </footer>
    </>
  );
}
