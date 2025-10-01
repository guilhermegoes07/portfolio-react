import { Repo } from '../types';

// --- IMPORTANT ---
// The public GitHub REST API does not provide an endpoint to fetch a user's *pinned* repositories directly.
// This requires using the GraphQL API with authentication.
// To keep this portfolio simple and not require a backend or auth tokens,
// this service MOCKS the data.
//
// Data updated with projects provided by Guilherme.

const GITHUB_USERNAME = 'guilhermegoes07'; // Updated GitHub username

const mockPinnedRepos: Omit<Repo, 'id' | 'html_url'>[] = [
  {
    name: 'LuminaEstacionamento',
    description: 'O App de Gerenciamento de Estacionamento é uma solução simples e eficiente para controlar a entrada e saída de veículos em estacionamentos. Com ele, você pode registrar veículos, gerenciar pagamentos e emitir comprovantes de forma rápida e organizada.',
    homepage: null,
    topics: ['flutter', 'dart', 'mobile', 'parking-app'],
  },
  {
    name: 'LuminaFinancesMobile',
    description: 'O projeto busca oferecer uma interface limpa e intuitiva para que o usuário possa organizar suas receitas e despesas de forma eficiente, aprofundando conhecimentos em desenvolvimento multiplataforma.',
    homepage: null,
    topics: ['flutter', 'dart', 'fintech', 'mobile'],
  },
  {
    name: 'LuminaFinances',
    description: 'Um sistema de gerenciamento financeiro pessoal desenvolvido em Laravel para controlar receitas, despesas, metas e transações, com relatórios e análises.',
    homepage: null,
    topics: ['laravel', 'php', 'blade', 'javascript', 'docker'],
  },
  {
    name: 'LuminaProducts',
    description: 'Gerenciamento de Produtos utilizando React no frontend e Node.js no backend. O sistema gerencia produtos com funcionalidades de CRUD e implementa autenticação de usuário via JWT.',
    homepage: null,
    topics: ['react', 'nodejs', 'typescript', 'fullstack', 'jwt'],
  }
];

export const fetchPinnedRepos = async (): Promise<Repo[]> => {
  // Simulate network delay
  await new Promise(res => setTimeout(res, 500));

  // Add id and construct html_url from the mock data
  return mockPinnedRepos.map((repo, index) => ({
    ...repo,
    id: index,
    html_url: `https://github.com/${GITHUB_USERNAME}/${repo.name}`,
  }));
};