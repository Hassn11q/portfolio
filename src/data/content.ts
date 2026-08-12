import { profile } from "./profile";
import { projects } from "./projects";
import type { Project } from "./projects";
import { education, experience } from "./experience";
import type { Role } from "./experience";
import { awards, certifications, credentials, programs, publications, recognition } from "./record";
import type { Award, Credential, Publication } from "./record";
import { toolkit } from "./toolkit";
import type { ToolGroup } from "./toolkit";
import { repositories } from "./repositories";
import type { Repository } from "./repositories";
import {
  awardsAr,
  bioAr,
  credentialsAr,
  programsAr,
  certificationsAr,
  educationAr,
  experienceAr,
  profileAr,
  projectsAr,
  publicationsAr,
  recognitionAr,
  repositoriesAr,
  toolkitAr,
} from "./content-ar";
import { ui } from "./ui";
import type { Locale, UiStrings } from "./ui";

export type { Locale } from "./ui";

export type SiteContent = {
  locale: Locale;
  dir: "ltr" | "rtl";
  /** The name in the reading language, and the same name in the other script. */
  name: string;
  nameAlternate: string;
  role: string;
  location: string;
  metaDescription: string;
  hero: { headline: string; lede: string };
  bio: {
    lead: string;
    body: readonly string[];
    facts: readonly { label: string; value: string }[];
  };
  awards: Award[];
  credentials: Credential[];
  programs: readonly string[];
  projects: Project[];
  experience: Role[];
  education: {
    school: string;
    degree: string;
    period: string;
    honor: string;
    project: string;
  };
  publications: Publication[];
  recognition: { title: string; body: string; year: string }[];
  certifications: { named: string[]; programs: string[]; total: number };
  toolkit: ToolGroup[];
  repositories: Repository[];
  ui: UiStrings;
};

export const siteUrl = profile.siteUrl;
export const links = profile.links;
export const githubUser = profile.githubUser;

export const content: Record<Locale, SiteContent> = {
  en: {
    locale: "en",
    dir: "ltr",
    name: profile.name,
    nameAlternate: profile.nameArabic,
    role: profile.role,
    location: profile.location,
    metaDescription: profile.metaDescription,
    hero: profile.hero,
    bio: profile.bio,
    awards,
    credentials,
    programs,
    projects,
    experience,
    education,
    publications,
    recognition: [...recognition],
    certifications: {
      named: [...certifications.named],
      programs: [...certifications.programs],
      total: certifications.total,
    },
    toolkit,
    repositories,
    ui: ui.en,
  },
  ar: {
    locale: "ar",
    dir: "rtl",
    name: profileAr.name,
    nameAlternate: profileAr.nameLatin,
    role: profileAr.role,
    location: profileAr.location,
    metaDescription: profileAr.metaDescription,
    hero: profileAr.hero,
    bio: bioAr,
    awards: awardsAr,
    credentials: credentialsAr,
    programs: programsAr,
    projects: projectsAr,
    experience: experienceAr,
    education: educationAr,
    publications: publicationsAr,
    recognition: recognitionAr,
    certifications: certificationsAr,
    toolkit: toolkitAr,
    repositories: repositoriesAr,
    ui: ui.ar,
  },
};
