export type ProjectStatus = "Flagship" | "MVP" | "Early-stage" | "Android project" | "Prototype" | "Early milestone" | "Active web project";

export type Project = {
  name: string;
  status: ProjectStatus;
  description: string;
  stack: string[];
  repository: string;
  live?: string;
  caseStudy?: string;
};

export const profile = {
  name: "David Ifeanyi",
  role: "Mechatronics Engineering student developing practical software capabilities",
  email: "davidifeanyicelestine586@gmail.com",
  github: "https://github.com/davidifeanyicelestine586-arch",
  linkedin: "https://www.linkedin.com/in/davidify",
};

export const projects: Project[] = [
  { name: "Tech Stack Architect", status: "Flagship", description: "A deterministic architecture workspace for defining a project, analyzing requirements, recommending compatible technologies, validating decisions and generating an implementation blueprint.", stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Supabase"], repository: "https://github.com/davidifeanyicelestine586-arch/tech-stack-architect", live: "https://architect.ediccrew.com", caseStudy: "/projects/tech-stack-architect" },
  { name: "Sharp AI", status: "MVP", description: "An AI-assisted content studio for turning one idea into blog, social and email formats. Production persistence, authentication and billing boundaries remain incomplete.", stack: ["Next.js", "React", "TypeScript", "Express", "OpenAI"], repository: "https://github.com/davidifeanyicelestine586-arch/sharp-ai" },
  { name: "StoryPix", status: "Early-stage", description: "An AI-oriented creative application whose current feature set requires continued source-level verification beyond the inherited repository README.", stack: ["React", "Vite", "TypeScript", "Express"], repository: "https://github.com/davidifeanyicelestine586-arch/StoryPix" },
  { name: "Ediccrew Workflow", status: "Android project", description: "An Android project in the portfolio. Its repository has a documented security-hygiene concern, so sensitive artifacts are deliberately excluded from portfolio content.", stack: ["Android", "Gradle"], repository: "https://github.com/davidifeanyicelestine586-arch/Ediccrew-workflow" },
  { name: "Ediccrew.com", status: "Active web project", description: "A technology-focused WordPress publication and web project covering technology, people, trends, tools and practical build-oriented topics.", stack: ["WordPress", "Elementor", "SEO", "Web tooling"], repository: "https://github.com/davidifeanyicelestine586-arch", live: "https://ediccrew.com" },
  { name: "VizualMecha Studio", status: "Early-stage", description: "An early-stage project exploring virtual mechatronics and 3D visualization concepts. The broader concept is kept distinct from limited repository implementation.", stack: ["Mechatronics", "3D visualization"], repository: "https://github.com/davidifeanyicelestine586-arch/VizualMecha-Studio-" },
  { name: "ToolStack Backend", status: "Prototype", description: "A small FastAPI prototype that loads a tool registry and returns recommendations using simple tag-in-query matching.", stack: ["Python", "FastAPI"], repository: "https://github.com/davidifeanyicelestine586-arch/toolstack-backend" },
  { name: "My First Line of Code", status: "Early milestone", description: "A simple first web programming project preserved as part of the progression toward larger systems.", stack: ["HTML", "CSS", "JavaScript"], repository: "https://github.com/davidifeanyicelestine586-arch/my-first-line-of-code" },
];

export const skills = [
  ["Programming", ["Python", "JavaScript", "TypeScript", "HTML", "CSS"]],
  ["Frontend", ["React", "Next.js", "Tailwind CSS", "shadcn/ui", "responsive UI"]],
  ["Backend & APIs", ["REST APIs", "Express", "FastAPI", "API integrations"]],
  ["Data & persistence", ["PostgreSQL", "Supabase", "repository patterns"]],
  ["Development", ["Git", "GitHub", "debugging", "testing", "CLI"]],
  ["Web systems", ["WordPress", "Elementor", "SEO", "Search Console", "GA4", "GTM"]],
  ["AI-assisted development", ["Coding agents", "prompt engineering", "AI-assisted debugging"]],
  ["Engineering", ["Mechatronics", "electronics", "embedded concepts", "Arduino", "control concepts"]],
] as const;
