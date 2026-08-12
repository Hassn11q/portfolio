/**
 * Every field here is taken from a public source: the LinkedIn profile,
 * the GitHub account, or the published OSACT7 paper. Nothing is inferred.
 */

export const profile = {
  name: "Hassn Alqaeri",
  nameArabic: "حسن القعيري",
  role: "Full-stack AI Engineer",
  location: "Riyadh, Saudi Arabia",
  siteUrl: "https://hassnalqaeri.com",

  /** LinkedIn headline, verbatim. */
  headline:
    "AI Engineer @ Confidential Government | LLMs & AI Agents | Scalable AI Solutions",

  metaDescription:
    "Hassn Alqaeri is a full-stack AI engineer in Riyadh working on LLM systems end to end: retrieval, agents, model fine-tuning, serving, and the interfaces on top. Co-author of the winning system at the KSAA-2026 shared task on Arabic speech diacritization.",

  /** Hero. Two lines of display type, then one short paragraph. */
  hero: {
    headline: "I build LLM systems end to end, and they have to work in Arabic.",
    lede: "Full-stack AI engineer in Riyadh. Data, models, agents, APIs and the interface on top, taken from experiment to something people can run.",
  },

  /** Who is speaking, before any claim is made. */
  bio: {
    lead: "I am an AI engineer in Riyadh. I build production AI systems end to end: data processing, model development, LLM integration, agent orchestration, and deployment.",
    body: [
      "I studied computer science at King Saud University and started in computer vision at KACST, where the work was detection, tracking, and building the annotated datasets underneath them. Two intensive programmes at Tuwaiq Academy took me from there into data science and AWS architecture, and a startup internship put the first models in front of users.",
      "Since April 2025 I have been an AI engineer on a government team in Riyadh, working on large language models and agents. Alongside that, a system I helped build won Task 2 of the KSAA-2026 shared task on Arabic diacritization, and the write-up was published at OSACT7 in Palma de Mallorca.",
    ],
    facts: [
      { label: "Now", value: "AI Engineer, government team in Riyadh" },
      { label: "Based in", value: "Riyadh, Saudi Arabia" },
      { label: "Degree", value: "BSc Computer Science, King Saud University" },
      { label: "Working since", value: "2023" },
      { label: "Languages", value: "Arabic, English" },
    ],
  },

  links: {
    github: "https://github.com/Hassn11q",
    linkedin: "https://www.linkedin.com/in/hassnalqaeri",
    kaggle: "https://www.kaggle.com/hassn1",
  },

  githubUser: "Hassn11q",
} as const;
