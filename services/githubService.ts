import { Repo } from '../types';

export type Locale = 'pt' | 'en';

// --- IMPORTANT ---
// The public GitHub REST API does not provide an endpoint to fetch a user's *pinned* repositories directly.
// This requires using the GraphQL API with authentication.
// To keep this portfolio simple and not require a backend or auth tokens,
// this service MOCKS the data.
//
// Data updated with projects provided by Guilherme.

const GITHUB_USERNAME = 'guilhermegoes07'; // Updated GitHub username

const mockPinnedRepos = {
  pt: [
    {
      name: 'Flutter User API',
      description: 'Este projeto é a solução para o Desafio Técnico - Desenvolvedor(a) Flutter proposto pela Bus2. O objetivo é criar um aplicativo que consome a API pública randomuser.me para exibir, salvar e gerenciar perfis de usuários aleatórios.',
      homepage: null,
      topics: ['flutter', 'dart', 'api', 'randomuser', 'mobile'],
    },
    {
      name: 'LuminaEstacionamento',
      description: 'Aplicativo de gerenciamento de estacionamento para controlar entrada, saída, pagamentos e comprovantes de forma rápida e organizada.',
      homepage: null,
      topics: ['flutter', 'dart', 'mobile', 'parking-app'],
    },
    {
      name: 'LuminaFinancesMobile',
      description: 'Interface limpa e intuitiva para organizar receitas e despesas com foco em uma experiência mobile eficiente.',
      homepage: null,
      topics: ['flutter', 'dart', 'fintech', 'mobile'],
    },
    {
      name: 'LuminaFinances',
      description: 'Sistema pessoal de gestão financeira desenvolvido em Laravel para controlar receitas, despesas, metas e transações com relatórios e análises.',
      homepage: null,
      topics: ['laravel', 'php', 'blade', 'javascript', 'docker'],
    },
    {
      name: 'LuminaProducts',
      description: 'Gerenciamento de produtos com React no frontend e Node.js no backend, com CRUD e autenticação de usuário via JWT.',
      homepage: null,
      topics: ['react', 'nodejs', 'typescript', 'fullstack', 'jwt'],
    },
  ],
  en: [
    {
      name: 'Flutter User API',
      description: 'This project is the solution for the Flutter Developer technical challenge proposed by Bus2. The goal is to build an app that consumes the public randomuser.me API to display, save, and manage random user profiles.',
      homepage: null,
      topics: ['flutter', 'dart', 'api', 'randomuser', 'mobile'],
    },
    {
      name: 'LuminaEstacionamento',
      description: 'Parking management app to handle vehicle entry, exit, payments, and receipts quickly and in an organized way.',
      homepage: null,
      topics: ['flutter', 'dart', 'mobile', 'parking-app'],
    },
    {
      name: 'LuminaFinancesMobile',
      description: 'A clean, intuitive interface for organizing income and expenses with a strong mobile-first experience.',
      homepage: null,
      topics: ['flutter', 'dart', 'fintech', 'mobile'],
    },
    {
      name: 'LuminaFinances',
      description: 'A personal finance management system built with Laravel to track income, expenses, goals, and transactions with reports and insights.',
      homepage: null,
      topics: ['laravel', 'php', 'blade', 'javascript', 'docker'],
    },
    {
      name: 'LuminaProducts',
      description: 'Product management system using React on the frontend and Node.js on the backend, with CRUD and JWT authentication.',
      homepage: null,
      topics: ['react', 'nodejs', 'typescript', 'fullstack', 'jwt'],
    },
  ],
};

export const fetchPinnedRepos = async (locale: Locale = 'pt'): Promise<Repo[]> => {
  // Simulate network delay
  await new Promise(res => setTimeout(res, 500));

  // Add id and construct html_url from the mock data
  return mockPinnedRepos[locale].map((repo, index) => ({
    ...repo,
    id: index,
    html_url: `https://github.com/${GITHUB_USERNAME}/${repo.name}`,
  }));
};