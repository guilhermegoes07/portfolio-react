import React from "react";
import { useState, useEffect, useRef } from "react";

import { Repo } from "./types";
import { fetchPinnedRepos, type Locale } from "./services/githubService";

// FIX: Imported `ExternalLinkIcon` to be used in the ProjectCard component.
import {
  LinkedInIcon,
  GitHubIcon,
  CodeIcon,
  BulletIcon,
  MailIcon,
  ExternalLinkIcon,
} from "./components/icons";

const getPreferredLocale = (): Locale => {
  if (typeof navigator === "undefined") {
    return "pt";
  }

  return navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en";
};

const portfolioCopy = {
  pt: {
    navLinks: [
      { href: "#about", label: "Sobre" },
      { href: "#skills", label: "Competências" },
      { href: "#experience", label: "Experiência" },
      { href: "#projects", label: "Projetos" },
      { href: "#education", label: "Formação" },
      { href: "#contact", label: "Contato" },
    ],
    home: {
      title: "Engenheiro de Software Mobile | Especialista em Flutter | Desenvolvedor com IA",
      subtitle:
        "7+ anos entregando soluções mobile, fintech e healthtech com Clean Architecture, SDD e integrações nativas em Swift e Kotlin.",
      primaryAction: "Meus Projetos",
      secondaryAction: "Contato",
    },
    about: {
      title: "Sobre Mim",
      body:
        "Sou Mobile Software Engineer com 7 anos de experiência prática em desenvolvimento de software, com foco em aplicações mobile de alta performance e arquiteturas escaláveis. Minha trajetória une base Fullstack e especialização em Flutter, com atuação forte em integrações nativas em Kotlin e Swift, comunicação com hardwares e sistemas transacionais em fintech. Trabalho com Clean Architecture, gerência de estado avançada e automação de CI/CD para entregar código testável, sustentável e pronto para produção.",
    },
    skillsTitle: "Competências",
    skills: [
      {
        category: "Linguagens",
        items: ["Dart", "Kotlin", "Java", "Swift", "PHP", "Node.js", "JavaScript", "SQL"],
      },
      {
        category: "Mobile",
        items: [
          "Flutter (Bloc, Cubit, Riverpod, GetX)",
          "Android Nativo SDK",
          "iOS SDK",
          "Integração com SDKs nativas",
        ],
      },
      {
        category: "Backend",
        items: ["Laravel", "Symfony", "PHP", "APIs RESTful", "WebSockets"],
      },
      {
        category: "DevOps & Cloud",
        items: ["CI/CD (CodeMagic, GitHub Actions)", "Docker", "App Store & Google Play"],
      },
      {
        category: "Arquitetura & Testes",
        items: ["Clean Architecture", "SDD", "Testes Unitários", "Testes de UI"],
      },
      {
        category: "Dados & Automação",
        items: ["SQLite", "Hive", "Logging", "Automação de processos"],
      },
      {
        category: "Idiomas",
        items: [
          "Português (Native or Bilingual)",
          "English (Full Professional)",
          "Spanish (Limited Working)",
        ],
      },
    ],
    experienceTitle: "Experiência",
    experiences: [
      {
        role: "FullStack & Mobile Developer",
        company: "Data Core Solutions Services",
        period: "outubro de 2025 - Atualmente",
        highlights: [
          "Concepção e entrega de um aplicativo mobile de alta performance para uma rede de academias, usando Cubit para estado e Dio para consumo eficiente de APIs.",
          "Arquitetura de comunicação em tempo real com WebSockets, Firebase Cloud Messaging e Bloc para fluxos complexos de dados.",
          "Automatização de esteiras de CI/CD para distribuição na App Store e Google Play e evolução de ecossistema web com PHP Symfony.",
        ],
      },
      {
        role: "Mobile Developer",
        company: "Multiplus Card Brasil",
        period: "maio de 2025 - outubro de 2025",
        highlights: [
          "Integração de soluções de TEF em Flutter e Dart para terminais POS e dispositivos móveis, com customização de SDKs nativas de adquirentes.",
          "Estruturação de comunicação com APIs REST e WebSockets, aplicando padrões rigorosos de segurança de dados e logging para ambientes transacionais.",
          "Desenvolvimento de funcionalidades nativas Android para garantir interoperabilidade total entre Java/Kotlin e o código em Flutter.",
        ],
      },
      {
        role: "Fullstack & Mobile Developer",
        company: "Kamay",
        period: "junho de 2024 - maio de 2025",
        highlights: [
          "Desenvolvimento de soluções para HealthTech com foco em otimização do fluxo de centros cirúrgicos e permanência de pacientes.",
          "Construção de painéis administrativos com JavaScript, Blade e Tailwind, estruturando a arquitetura backend em Laravel.",
          "Evolução do ecossistema móvel em Flutter, com deploy via CodeMagic e publicação nas lojas.",
        ],
      },
      {
        role: "Fullstack & Mobile Developer",
        company: "Santiago Soluções Tech",
        period: "outubro de 2022 - maio de 2024",
        highlights: [
          "Liderança técnica em consultoria própria, orquestrando arquitetura e entrega de produtos digitais escaláveis para clientes B2B.",
          "Desenvolvimento de apps multiplataforma para Candor Studios e franquias de grande porte com Flutter, Riverpod, BLoC e GetX.",
          "Implementação de abordagens offline-first com SQLite e Hive, além de pipelines de CI/CD e soluções como automação, e-commerce e chatbots.",
        ],
      },
      {
        role: "Desenvolvedor Freelancer",
        company: "DevRoom",
        period: "março de 2019 - outubro de 2022",
        highlights: [
          "Atuação autônoma focada na construção de ecossistemas digitais do zero, com desafios de lógica, arquitetura e escalabilidade.",
          "Desenvolvimento fullstack de aplicação multiplataforma com economia in-game, mecânicas sociais e interação em tempo real.",
          "Concepção de sistema dinâmico de posicionamento de jogadores com minimapa síncrono em tempo real.",
        ],
      },
    ],
    projectsTitle: "Projetos em Destaque",
    projectsLoading: "Carregando projetos...",
    projectsError: "Falha ao carregar os projetos.",
    educationTitle: "Formação",
    education: [
      "Bacharelado, Computer Software Engineering - Centro Universitário UniFatecie (maio de 2026 - maio de 2030)",
      "Associate's degree, Inteligência Artificial e Machine Learning - Centro Universitário UniFatecie (maio de 2026 - maio de 2028)",
      "Bacharelado (Incompleto), Computer Science - UNESP (março de 2024 - julho de 2025)",
      "Certificação: Desenvolvimento Android 2018",
      "Certificação: 2º Delphi Noroeste Paulista",
      "Certificação: Desenvolvimento Web Completo - 20 cursos + 20 projetos",
      "Honorable Mention - Olimpíada Brasileira de Matemática das Escolas Públicas",
    ],
    contact: {
      title: "Vamos Conversar?",
      pitch:
        "Aberto a oportunidades em mobile, fintech, healthtech e projetos com integração nativa em Flutter, Kotlin e Swift.",
      details: ["Telefone: +55 (18) 98172-4728", "LinkedIn: linkedin.com/in/guilherme-santiago-goes"],
    },
    footer: "Todos os direitos reservados.",
  },
  en: {
    navLinks: [
      { href: "#about", label: "About" },
      { href: "#skills", label: "Skills" },
      { href: "#experience", label: "Experience" },
      { href: "#projects", label: "Projects" },
      { href: "#education", label: "Education" },
      { href: "#contact", label: "Contact" },
    ],
    home: {
      title: "Mobile Software Engineer | Flutter Specialist | AI-Boosted Developer",
      subtitle:
        "7+ years delivering mobile, fintech, and healthtech solutions with Clean Architecture, SDD, and native Swift and Kotlin integrations.",
      primaryAction: "My Projects",
      secondaryAction: "Contact",
    },
    about: {
      title: "About Me",
      body:
        "I am a Mobile Software Engineer with 7 years of hands-on software experience, focused on high-performance mobile apps and scalable architectures. My background combines Fullstack roots with strong Flutter specialization, including native Kotlin and Swift integrations, hardware communication, and transaction systems in fintech. I work with Clean Architecture, advanced state management, and CI/CD automation to deliver testable, maintainable, production-ready code.",
    },
    skillsTitle: "Skills",
    skills: [
      {
        category: "Programming Languages",
        items: ["Dart", "Kotlin", "Java", "Swift", "PHP", "Node.js", "JavaScript", "SQL"],
      },
      {
        category: "Mobile",
        items: [
          "Flutter (Bloc, Cubit, Riverpod, GetX)",
          "Native Android SDK",
          "iOS SDK",
          "Native SDK integration",
        ],
      },
      {
        category: "Backend",
        items: ["Laravel", "Symfony", "PHP", "RESTful APIs", "WebSockets"],
      },
      {
        category: "DevOps & Cloud",
        items: ["CI/CD (CodeMagic, GitHub Actions)", "Docker", "App Store & Google Play"],
      },
      {
        category: "Architecture & Testing",
        items: ["Clean Architecture", "SDD", "Unit Tests", "UI Tests"],
      },
      {
        category: "Data & Automation",
        items: ["SQLite", "Hive", "Logging", "Process automation"],
      },
      {
        category: "Spoken Languages",
        items: ["Portuguese (Native or Bilingual)", "English (Full Professional)", "Spanish (Limited Working)"],
      },
    ],
    experienceTitle: "Experience",
    experiences: [
      {
        role: "FullStack & Mobile Developer",
        company: "Data Core Solutions Services",
        period: "Oct 2025 - Present",
        highlights: [
          "Designed and delivered a high-performance mobile app for a gym network, using Cubit for state management and Dio for efficient API consumption.",
          "Built real-time communication architecture with WebSockets, Firebase Cloud Messaging, and Bloc for complex data flows.",
          "Automated CI/CD pipelines for App Store and Google Play distribution and evolved the web ecosystem with PHP Symfony.",
        ],
      },
      {
        role: "Mobile Developer",
        company: "Multiplus Card Brasil",
        period: "May 2025 - Oct 2025",
        highlights: [
          "Integrated TEF solutions in Flutter and Dart for POS terminals and mobile devices, customizing native acquirer SDKs.",
          "Structured REST and WebSocket communication with strict data security and logging practices for transactional environments.",
          "Built native Android features to ensure full interoperability between Java/Kotlin libraries and the Flutter codebase.",
        ],
      },
      {
        role: "Fullstack & Mobile Developer",
        company: "Kamay",
        period: "Jun 2024 - May 2025",
        highlights: [
          "Developed HealthTech solutions focused on optimizing surgical center workflows and patient stay management.",
          "Built administrative dashboards with JavaScript, Blade, and Tailwind while structuring the backend architecture in Laravel.",
          "Advanced the mobile ecosystem in Flutter, handling deployment through CodeMagic and app store publication.",
        ],
      },
      {
        role: "Fullstack & Mobile Developer",
        company: "Santiago Soluções Tech",
        period: "Oct 2022 - May 2024",
        highlights: [
          "Led a self-owned technology consultancy, orchestrating architecture and delivery of scalable digital products for B2B clients.",
          "Built multiplatform apps for Candor Studios and large franchises with Flutter, Riverpod, BLoC, and GetX.",
          "Implemented offline-first approaches with SQLite and Hive, along with CI/CD pipelines and solutions such as automation, e-commerce, and chatbots.",
        ],
      },
      {
        role: "Freelance Developer",
        company: "DevRoom",
        period: "Mar 2019 - Oct 2022",
        highlights: [
          "Worked independently on digital ecosystems from scratch, facing logic, architecture, and scalability challenges.",
          "Engineered a fullstack multiplatform game application with in-game economy, social mechanics, and real-time interaction.",
          "Designed a dynamic player positioning system integrated with a real-time synchronized minimap.",
        ],
      },
    ],
    projectsTitle: "Featured Projects",
    projectsLoading: "Loading projects...",
    projectsError: "Failed to load projects.",
    educationTitle: "Education",
    education: [
      "Bachelor's degree, Computer Software Engineering - Centro Universitário UniFatecie (May 2026 - May 2030)",
      "Associate's degree, Artificial Intelligence and Machine Learning - Centro Universitário UniFatecie (May 2026 - May 2028)",
      "Bachelor's degree (Incomplete), Computer Science - UNESP (Mar 2024 - Jul 2025)",
      "Certification: Android Development 2018",
      "Certification: 2nd Delphi Noroeste Paulista",
      "Certification: Complete Web Development - 20 courses + 20 projects",
      "Honorable Mention - Brazilian Public Schools Mathematics Olympiad",
    ],
    contact: {
      title: "Let's Talk?",
      pitch:
        "Open to opportunities in mobile, fintech, healthtech, and projects with native Flutter, Kotlin, and Swift integrations.",
      details: ["Phone: +55 (18) 98172-4728", "LinkedIn: linkedin.com/in/guilherme-santiago-goes"],
    },
    footer: "All rights reserved.",
  },
} as const;

type PortfolioCopy = (typeof portfolioCopy)[Locale];

const locale = getPreferredLocale();
const copy = portfolioCopy[locale];

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
  const navLinks = copy.navLinks;

  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

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
        {copy.home.title}
      </h2>
      <p className="max-w-2xl mx-auto text-lg text-gray-400 mb-10">
        {copy.home.subtitle}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="#projects"
          className="bg-primary-purple text-white font-bold py-3 px-8 rounded-full hover:bg-highlight-purple transition duration-300 transform hover:scale-105"
        >
          {copy.home.primaryAction}
        </a>
        <a
          href="#contact"
          className="bg-transparent border-2 border-highlight-purple text-highlight-purple font-bold py-3 px-8 rounded-full hover:bg-highlight-purple hover:text-white transition duration-300 transform hover:scale-105"
        >
          {copy.home.secondaryAction}
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
      <SectionTitle>{copy.about.title}</SectionTitle>
      <div className="max-w-3xl mx-auto text-center text-lg text-gray-300 leading-relaxed">
        <p>{copy.about.body}</p>
      </div>
    </div>
  </section>
);

// Skills Section Component
const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-20 md:py-32 bg-black bg-opacity-20">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionTitle>{copy.skillsTitle}</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {copy.skills.map(({ category, items }) => (
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
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    const container = carouselRef.current;
    const card = cardRefs.current[index];

    if (!container || !card) {
      return;
    }

    container.scrollTo({
      left: card.offsetLeft - container.offsetLeft,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  const handleScroll = () => {
    const container = carouselRef.current;

    if (!container) {
      return;
    }

    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let nextIndex = 0;
    let nextDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) {
        return;
      }

      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - containerCenter);

      if (distance < nextDistance) {
        nextDistance = distance;
        nextIndex = index;
      }
    });

    setActiveIndex(nextIndex);
  };

  return (
    <section id="experience" className="py-20 md:py-32 bg-black bg-opacity-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
          <div className="max-w-2xl">
            <SectionTitle>{copy.experienceTitle}</SectionTitle>
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
              disabled={activeIndex === 0}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-700 bg-gray-900 bg-opacity-70 text-gray-200 transition duration-300 hover:border-primary-purple hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Experiência anterior"
            >
              <span className="text-2xl leading-none">‹</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(Math.min(activeIndex + 1, copy.experiences.length - 1))}
              disabled={activeIndex === copy.experiences.length - 1}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-700 bg-gray-900 bg-opacity-70 text-gray-200 transition duration-300 hover:border-primary-purple hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Próxima experiência"
            >
              <span className="text-2xl leading-none">›</span>
            </button>
          </div>
        </div>
        <div className="mb-6 flex items-center justify-center gap-2">
          {copy.experiences.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollToIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 bg-gradient-to-r from-primary-purple to-neon-pink"
                  : "w-2.5 bg-gray-700 hover:bg-gray-500"
              }`}
              aria-label={`Ir para experiência ${index + 1}`}
              aria-pressed={index === activeIndex}
            />
          ))}
        </div>
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {copy.experiences.map((exp, index) => (
            <article
              key={index}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              className="relative min-w-[88%] snap-start sm:min-w-[70%] lg:min-w-[48%] xl:min-w-[38%]"
            >
              <div className="h-full rounded-2xl border border-gray-700 bg-gray-900 bg-opacity-55 p-6 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-primary-purple md:p-8">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-gray-700 bg-black bg-opacity-30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-gray-400">
                      <CodeIcon className="h-4 w-4 text-primary-purple" />
                      {String(index + 1).padStart(2, "0")} / {String(copy.experiences.length).padStart(2, "0")}
                    </p>
                    <h3 className="text-2xl font-bold text-highlight-purple">
                      {exp.role}
                    </h3>
                  </div>
                  <span className="rounded-full border border-primary-purple/40 bg-primary-purple/10 px-3 py-1 text-xs font-semibold text-primary-purple">
                    {index === activeIndex ? "Ativo" : ""}
                  </span>
                </div>
                <p className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-gray-400">
                  {exp.company}
                </p>
                <div className="mb-6 inline-flex rounded-full border border-gray-700 bg-black bg-opacity-30 px-4 py-2 text-sm text-gray-300">
                  {exp.period}
                </div>
                <ul className="space-y-4 text-sm leading-relaxed text-gray-300">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-primary-purple to-neon-pink" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
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
      <SectionTitle>{copy.projectsTitle}</SectionTitle>
      {loading && <p className="text-center">{copy.projectsLoading}</p>}
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
  return (
    <section id="education" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionTitle>{copy.educationTitle}</SectionTitle>
        <div className="max-w-2xl mx-auto">
          <ul className="space-y-4">
            {copy.education.map((item, index) => (
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
      <SectionTitle>{copy.contact.title}</SectionTitle>
      <p className="max-w-xl mx-auto text-lg text-gray-400 mb-8">
        {copy.contact.pitch}
      </p>
      <div className="mb-8 text-gray-300 space-y-2">
        {copy.contact.details.map((detail) => (
          <p key={detail}>{detail}</p>
        ))}
      </div>
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
        &copy; {new Date().getFullYear()} Guilherme Santiago. {copy.footer}
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
    document.documentElement.lang = locale;
  }, []);

  useEffect(() => {
    const loadRepos = async () => {
      try {
        setLoading(true);
        const pinnedRepos = await fetchPinnedRepos(locale);
        setRepos(pinnedRepos);
      } catch (err) {
        setError(copy.projectsError);
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
