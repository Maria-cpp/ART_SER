// Typed JSON loaders + the editable-file registry used by the admin API.
//
// Reads use static imports so content is bundled and available in Server Components.
// Writes (admin) go through fs in app/api/admin — see EDITABLE_FILES allowlist below.

import { Localized } from "@/lib/i18n";

import companyData from "@/data/company.json";
import servicesData from "@/data/services.json";
import categoriesData from "@/data/categories.json";
import projectsData from "@/data/projects.json";
import jvData from "@/data/jv-projects.json";
import govData from "@/data/government-projects.json";
import manufacturingData from "@/data/manufacturing.json";
import galleryData from "@/data/gallery.json";
import clientsData from "@/data/clients.json";
import teamData from "@/data/team.json";
import certificationsData from "@/data/certifications.json";
import contactData from "@/data/contact.json";

// ---- Types ---------------------------------------------------------------

export interface Stat { value: string; label: Localized; }
export interface Company {
  name: string;
  legalName: string;
  logo: string;
  tagline: Localized;
  shortDescription: Localized;
  story: Localized;
  stats: Stat[];
  mission: Localized;
  vision: Localized;
}

export interface Service { id: string; icon: string; title: Localized; description: Localized; }
export interface Category { id: string; icon: string; href: string; name: Localized; }
export interface Project {
  id: string; title: Localized; category: Localized; location: string; year: number; image: string; summary: Localized;
}
export interface JvProject {
  id: string; title: Localized; partners: string[]; location: string; year: number; image: string; summary: Localized;
}
export interface GovProject {
  id: string; title: Localized; authority: Localized; location: string; year: number; image: string; summary: Localized;
}
export interface Capability { id: string; title: Localized; description: Localized; }
export interface Manufacturing { intro: Localized; capabilities: Capability[]; }
export interface GalleryItem { id: string; image: string; caption: Localized; }
export interface Client { id: string; name: string; logo: string; sector: Localized; }
export interface TeamMember { id: string; name: string; photo: string; role: Localized; bio: Localized; }
export interface Certification { id: string; name: string; issuer: string; year: number; image: string; description: Localized; }
export interface Office { city: string; label: Localized; address: string; phone: string; }
export interface Contact {
  email: string; phone: string; whatsapp: string;
  headquarters: { label: Localized; address: string };
  offices: Office[];
  social: Record<string, string>;
  mapEmbed: string;
}

// ---- Loaders -------------------------------------------------------------

export const getCompany = (): Company => companyData as Company;
export const getServices = (): Service[] => (servicesData as { items: Service[] }).items;
export const getCategories = (): Category[] => (categoriesData as { items: Category[] }).items;
export const getProjects = (): Project[] => (projectsData as { items: Project[] }).items;
export const getJvProjects = (): JvProject[] => (jvData as { items: JvProject[] }).items;
export const getGovProjects = (): GovProject[] => (govData as { items: GovProject[] }).items;
export const getManufacturing = (): Manufacturing => manufacturingData as Manufacturing;
export const getGallery = (): GalleryItem[] => (galleryData as { items: GalleryItem[] }).items;
export const getClients = (): Client[] => (clientsData as { items: Client[] }).items;
export const getTeam = (): TeamMember[] => (teamData as { items: TeamMember[] }).items;
export const getCertifications = (): Certification[] => (certificationsData as { items: Certification[] }).items;
export const getContact = (): Contact => contactData as Contact;

// ---- Admin editable-file registry (allowlist) ---------------------------
// The admin API will only read/write filenames present here. This prevents
// path traversal and limits what the dashboard can touch.

export const EDITABLE_FILES = [
  "company.json",
  "services.json",
  "categories.json",
  "projects.json",
  "jv-projects.json",
  "government-projects.json",
  "manufacturing.json",
  "gallery.json",
  "clients.json",
  "team.json",
  "certifications.json",
  "contact.json",
  "quotes.json"
] as const;

export type EditableFile = (typeof EDITABLE_FILES)[number];

export function isEditableFile(name: string): name is EditableFile {
  return (EDITABLE_FILES as readonly string[]).includes(name);
}
