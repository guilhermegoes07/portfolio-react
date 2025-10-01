import React from "react";
import { useState, useEffect } from "react";

import { Repo } from "./types";
import { fetchPinnedRepos } from "./services/githubService";

// FIX: Imported `ExternalLinkIcon` to be used in the ProjectCard component.
import {
  LinkedInIcon,
  GitHubIcon,
  CodeIcon,
  BulletIcon,
  MailIcon,
  ExternalLinkIcon,
} from "./components/icons";

// Helper component for section titles
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12">
    <span className="relative inline-block">
      {children}
      <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-primary-purple to-neon-pink rounded-full"></span>
    </span>
  </h2>
);

// Header Component
const Header: React.FC = () => {
  const [top, setTop] = useState(true);

  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  const navLinks = [
    { href: "#about", label: "Sobre" },
    { href: "#skills", label: "Ferramentas" },
    { href: "#experience", label: "Experiência" },
    { href: "#projects", label: "Projetos" },
    { href: "#education", label: "Formação" },
    { href: "#contact", label: "Contato" },
  ];

  return (
    <header
      className={`fixed w-full z-30 transition duration-300 ease-in-out ${
        !top && "bg-dark-bg bg-opacity-90 backdrop-blur-sm shadow-lg"
      }`}
    >
      <div className="container mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0 mr-4">
            <a
              href="#home"
              className="text-2xl font-bold font-display tracking-wider text-highlight-purple hover:text-white transition duration-300"
            >
              GS
            </a>
          </div>
          <nav className="hidden md:flex md:grow">
            <ul className="flex grow justify-end flex-wrap items-center">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-medium text-gray-300 hover:text-highlight-purple px-5 py-3 flex items-center transition duration-150 ease-in-out"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

// Home Section Component
const HomeSection: React.FC = () => (
  <section
    id="home"
    className="relative min-h-screen flex items-center justify-center text-center overflow-hidden"
  >
    <div className="absolute inset-0 bg-dark-bg bg-opacity-50 z-10"></div>
    <div className="absolute inset-0 z-0">
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-purple rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-neon-pink rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-highlight-purple rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
    </div>
    <div className="container mx-auto px-4 sm:px-6 z-20">
      <h1 className="text-5xl md:text-7xl font-extrabold font-display mb-4 bg-clip-text text-transparent bg-gradient-to-r from-highlight-purple to-white">
        Guilherme Santiago
      </h1>
      <h2 className="text-xl md:text-2xl font-semibold text-gray-300 mb-8">
        Desenvolvedor Mobile | Especialista Flutter, Android Nativo & iOS
      </h2>
      <p className="max-w-2xl mx-auto text-lg text-gray-400 mb-10">
        Transformando ideias em soluções mobile seguras e de alta performance.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="#projects"
          className="bg-primary-purple text-white font-bold py-3 px-8 rounded-full hover:bg-highlight-purple transition duration-300 transform hover:scale-105"
        >
          Meus Projetos
        </a>
        <a
          href="#contact"
          className="bg-transparent border-2 border-highlight-purple text-highlight-purple font-bold py-3 px-8 rounded-full hover:bg-highlight-purple hover:text-white transition duration-300 transform hover:scale-105"
        >
          Contato
        </a>
      </div>
      <div className="flex justify-center space-x-6 mt-12">
        <a
          href="https://www.linkedin.com/in/guilherme-santiago-goes/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-highlight-purple transition duration-300"
        >
          <LinkedInIcon className="w-8 h-8" />
        </a>
        <a
          href="https://github.com/guilhermegoes07"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-highlight-purple transition duration-300"
        >
          <GitHubIcon className="w-8 h-8" />
        </a>
      </div>
    </div>
  </section>
);

// About Section Component
const AboutSection: React.FC = () => (
  <section id="about" className="py-20 md:py-32">
    <div className="container mx-auto px-4 sm:px-6">
      <SectionTitle>Sobre Mim</SectionTitle>
      <div className="max-w-3xl mx-auto text-center text-lg text-gray-300 leading-relaxed">
        <p>
          Desenvolvedor de Software com mais de 6 anos de experiência,
          especializado no ciclo completo de desenvolvimento de aplicações
          mobile para iOS e Android, com foco principal em Flutter. Possuo
          sólida vivência no setor de pagamentos e fintech, desenvolvendo
          soluções seguras e de alta performance. Minha experiência abrange
          desde a arquitetura de software com padrões como MVVM e Clean
          Architecture, até o desenvolvimento de backends robustos com Python,
          Java e Node.js, e a automação de processos de CI/CD. Sou um
          profissional com fortes habilidades de resolução de problemas,
          habituado a ambientes de desenvolvimento dinâmicos e colaborativos.
        </p>
      </div>
    </div>
  </section>
);

// Skills Section Component
const SkillsSection: React.FC = () => {
  const skills = {
    Linguagens: [
      "Dart",
      "Kotlin",
      "Java",
      "Swift",
      "Objective-C",
      "Python",
      "PHP",
      "Node.js",
      "JavaScript",
      "SQL",
    ],
    Mobile: [
      "Flutter (Riverpod, BLoC, Provider, GetX)",
      "Android Nativo SDK",
      "iOS SDK",
    ],
    Backend: [
      "Python (Flask, Django)",
      "Node.js",
      "PHP (Laravel)",
      "APIs RESTful",
      "WebSockets",
    ],
    "DevOps & Cloud": [
      "CI/CD (CodeMagic, Jenkins, GitHub Actions)",
      "Docker",
      "AWS (EC2, S3, RDS)",
    ],
    "Arquitetura & Testes": [
      "MVVM",
      "MVC",
      "Clean Architecture",
      "Testes Unitários",
      "Testes de UI",
    ],
    Idiomas: ["Inglês (Avançado/Fluente)", "Português (Nativo)"],
  };

  return (
    <section id="skills" className="py-20 md:py-32 bg-black bg-opacity-20">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionTitle>Minhas Ferramentas</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, items]) => (
            <div
              key={category}
              className="bg-gray-900 bg-opacity-50 p-6 rounded-lg border border-gray-700 hover:border-primary-purple transition-all duration-300 transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-bold text-highlight-purple mb-4">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="bg-gray-700 text-gray-300 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Experience Section Component
const ExperienceSection: React.FC = () => {
  const experiences = [
    {
      role: "Mobile Developer",
      company: "Multiplus Card Brasil",
      period: "junho de 2025 - Atualmente",
      highlights: [
        "Desenvolvimento de um módulo de pagamento em Flutter com integração via bridge com SDK nativo em Kotlin para terminais POS, otimizando o fluxo de transação.",
        "Implementação de fluxo de transações TEF (Transferência Eletrônica de Fundos) seguindo padrões de segurança PCI e consumindo APIs REST.",
      ],
    },
    {
      role: "Fullstack & Mobile Developer",
      company: "Autônomo",
      period: "janeiro de 2019 - Atualmente",
      highlights: [
        "Criação de scripts em Python para automação de build e deploy (CI/CD), reduzindo o tempo manual em mais de 50%.",
        "Manutenção de app legado com módulos em Objective-C e Java, garantindo interoperabilidade com novas features em Flutter.",
        "Arquitetura de app e-commerce com Flutter, Clean Architecture e MVVM (Riverpod).",
        "Diagnóstico e correção de memory leaks em app iOS com Xcode Instruments, melhorando a performance em 80%.",
      ],
    },
    {
      role: "Fullstack & Mobile Developer",
      company: "Kamay",
      period: "dezembro de 2024 - junho de 2025",
      highlights: [
        "Responsável pelo ciclo completo de publicação e manutenção de apps na App Store e Google Play.",
        "Implementação de suíte de testes unitários (flutter_test) e de UI (integration_test), atingindo mais de 90% de cobertura de código.",
      ],
    },
    {
      role: "Fullstack & Mobile Developer",
      company: "Fachini IT",
      period: "Junho de 2024 - Dezembro de 2024",
      highlights: [
        "Atuação como desenvolvedor na FachiniIT, trabalhando em diversos projetos e linguagens, aprimorando expertise em desenvolvimento web e flutter.",
        "Responsável pela manutenção e atualização de sistemas para diversas empresas, o que me providenciou uma atuação ampla, conhecendo várias regras de negócio.",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionTitle>Experiência</SectionTitle>
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-700"></div>
          {experiences.map((exp, index) => (
            <div key={index} className="mb-12 flex items-center w-full">
              <div
                className={`order-1 w-5/12 ${
                  index % 2 === 0 ? "text-right" : "text-left"
                }`}
              ></div>
              <div className="z-10 flex items-center order-1 bg-primary-purple shadow-xl w-8 h-8 rounded-full">
                <CodeIcon className="w-5 h-5 mx-auto text-white" />
              </div>
              <div
                className={`order-1 bg-gray-900 bg-opacity-50 rounded-lg shadow-xl w-5/12 p-6 border border-gray-700 ${
                  index % 2 === 0 ? "ml-4" : "mr-4 text-right"
                }`}
              >
                <h3 className="mb-2 font-bold text-highlight-purple text-xl">
                  {exp.role}
                </h3>
                <p className="text-sm font-semibold text-gray-400 mb-2">
                  {exp.company} | {exp.period}
                </p>
                <ul
                  className={`list-none text-sm text-gray-300 ${
                    index % 2 !== 0 ? "text-right" : "text-left"
                  }`}
                >
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="mb-2">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Project Card Component
const ProjectCard: React.FC<{ repo: Repo }> = ({ repo }) => (
  <div className="bg-gray-900 bg-opacity-50 rounded-lg p-6 flex flex-col h-full border border-gray-700 hover:border-primary-purple transition-all duration-300 transform hover:-translate-y-2">
    <div className="flex-grow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-highlight-purple">{repo.name}</h3>
        <div className="flex space-x-3">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <GitHubIcon className="w-6 h-6" />
          </a>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <ExternalLinkIcon className="w-6 h-6" />
            </a>
          )}
        </div>
      </div>
      <p className="text-gray-400 mb-4 text-sm">{repo.description}</p>
    </div>
    <div className="flex flex-wrap gap-2 mt-auto">
      {repo.topics.map((topic) => (
        <span
          key={topic}
          className="bg-gray-700 text-xs text-gray-300 px-2 py-1 rounded-md"
        >
          {topic}
        </span>
      ))}
    </div>
  </div>
);

// Projects Section Component
const ProjectsSection: React.FC<{
  repos: Repo[];
  loading: boolean;
  error: string | null;
}> = ({ repos, loading, error }) => (
  <section id="projects" className="py-20 md:py-32 bg-black bg-opacity-20">
    <div className="container mx-auto px-4 sm:px-6">
      <SectionTitle>Projetos em Destaque</SectionTitle>
      {loading && <p className="text-center">Carregando projetos...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {repos.map((repo) => (
            <ProjectCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </div>
  </section>
);

// Education Section Component
const EducationSection: React.FC = () => {
  const items = [
    "Bacharelado, Tecnologia da Informação - Univesp (Cursando)",
    "Bacharelado (Incompleto), Ciência da Computação - UNESP",
    "Certificação: Desenvolvimento Android - 2018",
    "Certificação: Desenvolvimento Web Completo: 20 cursos + 20 projetos",
  ];

  return (
    <section id="education" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionTitle>Formação</SectionTitle>
        <div className="max-w-2xl mx-auto">
          <ul className="space-y-4">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex items-start p-4 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-800"
              >
                <BulletIcon className="w-6 h-6 text-primary-purple flex-shrink-0 mr-4 mt-1" />
                <span className="text-gray-300 text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

// Contact Section Component
const ContactSection: React.FC = () => (
  <section id="contact" className="py-20 md:py-32 bg-black bg-opacity-20">
    <div className="container mx-auto px-4 sm:px-6 text-center">
      <SectionTitle>Vamos Conversar?</SectionTitle>
      <p className="max-w-xl mx-auto text-lg text-gray-400 mb-8">
        Estou aberto a novas oportunidades e projetos. Sinta-se à vontade para
        entrar em contato.
      </p>
      <a
        href="mailto:gscog05@gmail.com"
        className="inline-flex items-center justify-center bg-primary-purple text-white font-bold py-3 px-8 rounded-full hover:bg-highlight-purple transition duration-300 transform hover:scale-105 text-lg"
      >
        <MailIcon className="w-6 h-6 mr-3" />
        gscog05@gmail.com
      </a>
      <div className="flex justify-center space-x-6 mt-12">
        <a
          href="https://www.linkedin.com/in/guilherme-santiago-goes/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-highlight-purple transition duration-300"
        >
          <LinkedInIcon className="w-8 h-8" />
        </a>
        <a
          href="https://github.com/guilhermegoes07"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-highlight-purple transition duration-300"
        >
          <GitHubIcon className="w-8 h-8" />
        </a>
      </div>
    </div>
  </section>
);

// Footer Component
const Footer: React.FC = () => (
  <footer className="py-6 bg-black bg-opacity-30">
    <div className="container mx-auto px-4 sm:px-6 text-center text-gray-500">
      <p>
        &copy; {new Date().getFullYear()} Guilherme Santiago. Todos os direitos
        reservados.
      </p>
    </div>
  </footer>
);

// Main App Component
const App: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRepos = async () => {
      try {
        setLoading(true);
        const pinnedRepos = await fetchPinnedRepos();
        setRepos(pinnedRepos);
      } catch (err) {
        setError("Falha ao carregar os projetos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadRepos();
  }, []);

  return (
    <div className="bg-dark-bg">
      <Header />
      <main>
        <HomeSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection repos={repos} loading={loading} error={error} />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
