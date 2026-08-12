/**
 * Publication, competition result, awards and credentials. Every entry is
 * listed on the LinkedIn profile or in the published paper.
 */

export type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: string;
  note: string;
  links: { label: string; href: string }[];
};

export type Award = {
  title: string;
  issuer: string;
  year: string;
  body: string;
  links?: { label: string; href: string }[];
};

export type Credential = {
  name: string;
  issuer: string;
  year?: string;
  /** Simple Icons slug, where the issuer has an official mark. */
  icon?: string;
};

export const publications: Publication[] = [
  {
    title:
      "Thaka at KSAA-2026 Task 2: Regularized Fine-Tuning for Arabic Speech Diacritization",
    authors: "Meshal Alamr, Hassan Alqaeri, Abdullah Aldahlawi",
    venue:
      "The 7th Workshop on Open-Source Arabic Corpora and Processing Tools (OSACT7), LREC 2026, Palma de Mallorca",
    year: "2026",
    note: "Describes the system that placed first in Task 2 of the KSAA-2026 shared task on Arabic speech dictation with automatic diacritization, organised by the King Salman Global Academy for Arabic Language.",
    links: [
      { label: "ACL Anthology", href: "https://aclanthology.org/2026.osact-1.29/" },
      { label: "arXiv", href: "https://arxiv.org/abs/2605.25928" },
    ],
  },
];

export const awards: Award[] = [
  {
    title: "First place, KSAA-2026 shared task, Task 2",
    issuer: "King Salman Global Academy for Arabic Language",
    year: "2026",
    body: "Arabic speech dictation with automatic diacritization. 23.26% WER on the primary metric, ahead of every other participating system.",
    links: [
      { label: "Paper", href: "https://aclanthology.org/2026.osact-1.29/" },
      { label: "Shared task", href: "https://arai.ksaa.gov.sa/sharedTask2026/" },
    ],
  },
  {
    title: "Paper accepted and presented at OSACT7, LREC 2026",
    issuer: "LREC 2026, Palma de Mallorca",
    year: "2026",
    body: "The winning system written up as a shared-task paper and published in the workshop proceedings.",
    links: [{ label: "arXiv", href: "https://arxiv.org/abs/2605.25928" }],
  },
  {
    title: "Dean's Award for Academic Excellence",
    issuer: "King Saud University",
    year: "2022",
    body: "Awarded for academic standing during the computer science degree.",
  },
];

/** The credentials worth naming, out of the 25 listed on LinkedIn. */
export const credentials: Credential[] = [
  { name: "NVIDIA Certified Associate, Generative AI with LLMs", issuer: "NVIDIA", icon: "nvidia" },
  {
    name: "NVIDIA Certified Associate, Generative AI with Multimodal Models",
    issuer: "NVIDIA",
    icon: "nvidia",
  },
  { name: "AI Agents Fundamentals", issuer: "Hugging Face", year: "2025", icon: "huggingface" },
  { name: "LLM Practitioner", issuer: "SDAIA", year: "2023" },
  { name: "Advanced Artificial Intelligence", issuer: "KAUST Academy", year: "2023" },
  { name: "McKinsey Forward Program", issuer: "McKinsey & Company", year: "2024" },
  { name: "AWS Cloud Practitioner Essentials", issuer: "Saudi Digital Academy", year: "2024" },
  { name: "HCIA-AI V3.0", issuer: "Huawei", year: "2023", icon: "huawei" },
];

export const programs = [
  "Developing Generative AI Solutions, SDAIA Academy, July 2026",
  "SDAIA T5 Data Science Bootcamp, Tuwaiq Academy, 2024",
  "AWS Solutions Architect Bootcamp, Tuwaiq Academy, 2024",
];

export const recognition = [
  {
    title: "First place, KSAA-2026 shared task, Task 2",
    body: "Arabic speech dictation with automatic diacritization, King Salman Global Academy for Arabic Language. 23.26% WER on the primary metric.",
    year: "2026",
  },
  {
    title: "Dean's Award for Academic Excellence",
    body: "King Saud University.",
    year: "2022",
  },
];

export const certifications = {
  named: [
    "NVIDIA Certified Associate, Generative AI with LLMs",
    "NVIDIA Certified Associate, Generative AI with Multimodal Models",
  ],
  programs,
  total: 25,
};
