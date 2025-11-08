import { writable, derived } from 'svelte/store';
import en from './translations/en.json';

interface Translations {
  nav: {
    home: string;
    about: string;
    skills: string;
    services: string;
    contact: string;
  };
  hero: {
    name: string;
    title: string;
    subtitle: string;
    contact: string;
    at: string;
  };
  about: {
    title: string;
    subtitle: string;
    company: string;
    email: string;
    phone: string;
    whatsapp: string;
    linkedin: string;
    location: string;
    downloadCV: string;
    viewCV: string;
    description: string;
    learnMore: string;
  };
  skills: {
    title: string;
    description: string;
    viewSkills: string;
    pageTitle: string;
    pageDescription: string;
    frontend: { title: string };
    backend: { title: string };
    languages: { title: string };
    databases: { title: string };
    tools: { title: string };
    apis: { title: string };
    cloud: { title: string };
    mobile: { title: string };
    testing: { title: string };
  };
  services: {
    title: string;
    subtitle: string;
    learn_more: string;
    web_development: {
      title: string;
      description: string;
    };
    mobile_development: {
      title: string;
      description: string;
    };
    maintenance: {
      title: string;
      description: string;
    };
    security: {
      title: string;
      description: string;
    };
    training: {
      title: string;
      description: string;
    };
    cloud_devops: {
      title: string;
      description: string;
    };
    consulting: {
      title: string;
      description: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      message: string;
      sendMessage: string;
    };
    modal: {
      title: string;
      name: string;
      subject: string;
    };
  };
  footer: {
    copyright: string;
    social: {
      github: string;
      linkedin: string;
    };
  };
}

export const languages = {
  en: '🇬🇧 English'
} as const;

export const translations: Record<keyof typeof languages, Translations> = {
  en
};

export const currentLang = writable<keyof typeof languages>('en');

export const t = derived(currentLang, ($currentLang) => (key: string) => {
  const keys = key.split('.');
  return keys.reduce((obj: any, k) => obj?.[k], translations[$currentLang]) || key;
}); 