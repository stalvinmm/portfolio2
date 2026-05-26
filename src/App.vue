<template>
  <v-app>
    <!-- Nav -->
    <v-app-bar
      flat
      color="white"
      :elevation="scrolled ? 2 : 0"
      class="nav-bar"
      style="transition: box-shadow 0.3s ease"
    >
      <v-container class="d-flex align-center">
        <span class="nav-logo">SMM</span>
        <v-spacer />
        <div class="nav-links d-none d-md-flex gap-2">
          <v-btn
            v-for="link in navLinks"
            :key="link.id"
            variant="text"
            class="nav-link-btn"
            @click="scrollTo(link.id)"
            >{{ link.label }}</v-btn
          >
        </div>
        <v-btn
          class="ml-4 hire-btn d-none d-md-flex"
          color="accent"
          variant="flat"
          rounded="pill"
          @click="scrollTo('contact')"
          >Hire Me</v-btn
        >
        <!-- mobile menu -->
        <v-menu>
          <template #activator="{ props }">
            <v-btn v-bind="props" icon class="d-flex d-md-none" variant="text">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </template>
          <v-list rounded="lg">
            <v-list-item
              v-for="link in navLinks"
              :key="link.id"
              @click="scrollTo(link.id)"
            >
              <v-list-item-title>{{ link.label }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-container>
    </v-app-bar>

    <v-main style="background: #f7f7f9">
      <!-- Hero -->
      <section id="hero" class="hero-section">
        <v-container class="hero-container">
          <div class="hero-badge animate-fade-up" style="animation-delay: 0.1s">
            <span class="badge-dot"></span>
            Available for new projects
          </div>
          <h1 class="hero-title animate-fade-up" style="animation-delay: 0.2s">
            Hi, I'm <span class="hero-name-highlight">Stalvin</span><br />
            Full Stack Web<br />Developer
          </h1>
          <p class="hero-sub animate-fade-up" style="animation-delay: 0.3s">
            Building dynamic, responsive web applications<br
              class="d-none d-md-block"
            />
            with Vue.js, React &amp; Laravel — 4+ years of experience.
          </p>
          <div
            class="hero-actions animate-fade-up d-flex flex-wrap gap-3"
            style="animation-delay: 0.4s"
          >
            <v-btn
              color="accent"
              variant="flat"
              rounded="pill"
              size="large"
              @click="scrollTo('projects')"
            >
              View Projects
              <v-icon end>mdi-arrow-right</v-icon>
            </v-btn>
            <v-btn
              color="primary"
              variant="outlined"
              rounded="pill"
              size="large"
              @click="scrollTo('contact')"
            >
              Get In Touch
            </v-btn>
          </div>
          <div
            class="hero-stats animate-fade-up d-flex flex-wrap gap-6 mt-10"
            style="animation-delay: 0.5s"
          >
            <div v-for="stat in stats" :key="stat.label" class="stat-item">
              <div class="stat-number">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </v-container>
        <div class="hero-blob blob-1"></div>
        <div class="hero-blob blob-2"></div>
        <div class="hero-blob blob-3"></div>
      </section>

      <!-- About / Skills -->
      <section id="skills" class="section-pad">
        <v-container>
          <SectionTitle label="What I Do" title="Skills & Expertise" />
          <v-row class="mt-8" justify="center">
            <v-col
              v-for="(cat, i) in skillCategories"
              :key="cat.title"
              cols="12"
              sm="6"
              md="4"
            >
              <v-card
                class="skill-card animate-slide-up h-100"
                :style="`animation-delay:${i * 0.1}s`"
                variant="flat"
              >
                <v-card-text class="pa-6">
                  <div class="skill-icon-wrap mb-4">
                    <v-icon :icon="cat.icon" size="28" color="accent" />
                  </div>
                  <div class="skill-cat-title mb-3">{{ cat.title }}</div>
                  <div class="d-flex flex-wrap gap-2">
                    <v-chip
                      v-for="skill in cat.skills"
                      :key="skill"
                      size="small"
                      variant="tonal"
                      color="primary"
                      class="skill-chip"
                      >{{ skill }}</v-chip
                    >
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Experience -->
      <section id="experience" class="section-pad" style="background: #fff">
        <v-container>
          <SectionTitle label="Career" title="Work Experience" />

          <v-row class="mt-8" justify="center">
            <v-col cols="12" md="8">
              <div class="timeline">
                <div
                  v-for="(exp, i) in experiences"
                  :key="i"
                  class="timeline-item animate-slide-up"
                  :style="`animation-delay:${i * 0.1}s`"
                >
                  <div class="timeline-dot"></div>

                  <v-card class="timeline-card" variant="flat">
                    <v-card-text class="pa-6">
                      <div
                        class="d-flex flex-wrap align-center justify-space-between mb-2"
                      >
                        <div class="exp-title">
                          {{ exp.role }}
                        </div>

                        <v-chip size="small" :color="exp.color" variant="tonal">
                          {{ exp.period }}
                        </v-chip>
                      </div>

                      <div class="exp-company mb-4">
                        <v-icon size="16" color="primary" class="mr-1">
                          mdi-domain
                        </v-icon>

                        {{ exp.company }}, {{ exp.location }}

                        <v-chip
                          size="x-small"
                          class="ml-2"
                          color="primary"
                          variant="outlined"
                        >
                          {{ exp.type }}
                        </v-chip>
                      </div>

                      <ul class="exp-list">
                        <li
                          v-for="(point, idx) in exp.points"
                          :key="idx"
                          v-html="point"
                        ></li>
                      </ul>
                    </v-card-text>
                  </v-card>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Projects -->
      <section id="projects" class="section-pad">
        <v-container>
          <SectionTitle label="Portfolio" title="Featured Projects" />
          <v-row class="mt-8">
            <v-col
              v-for="(project, i) in projects"
              :key="project.name"
              cols="12"
              md="6"
              lg="4"
            >
              <v-card
                class="project-card animate-slide-up h-100"
                :style="`animation-delay:${i * 0.08}s`"
                variant="flat"
                @mouseenter="hoveredProject = i"
                @mouseleave="hoveredProject = null"
              >
                <div
                  class="project-header"
                  :style="`background: ${project.color}`"
                >
                  <span class="project-emoji">{{ project.emoji }}</span>
                  <div
                    class="project-overlay"
                    :class="{ active: hoveredProject === i }"
                  >
                    <v-chip
                      v-for="tech in project.stack"
                      :key="tech"
                      size="x-small"
                      color="white"
                      variant="tonal"
                      class="ma-1"
                      >{{ tech }}</v-chip
                    >
                  </div>
                </div>
                <v-card-text class="pa-5">
                  <div class="d-flex align-center justify-space-between mb-1">
                    <div class="project-name">{{ project.name }}</div>
                    <v-chip
                      size="x-small"
                      variant="tonal"
                      :color="project.statusColor"
                      >{{ project.status }}</v-chip
                    >
                  </div>
                  <div class="project-period mb-3">{{ project.period }}</div>
                  <p class="project-desc">{{ project.desc }}</p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Education -->
      <section id="education" class="section-pad" style="background: #fff">
        <v-container>
          <SectionTitle label="Background" title="Education" />
          <v-row class="mt-8" justify="center">
            <v-col cols="12" md="8">
              <v-row>
                <v-col
                  v-for="(edu, i) in education"
                  :key="edu.degree"
                  cols="12"
                  sm="6"
                >
                  <v-card
                    class="edu-card animate-slide-up h-100"
                    :style="`animation-delay:${i * 0.1}s`"
                    variant="flat"
                  >
                    <v-card-text class="pa-6">
                      <div class="edu-icon-wrap mb-3">
                        <v-icon icon="mdi-school" size="24" color="accent" />
                      </div>
                      <div class="edu-degree mb-1">{{ edu.degree }}</div>
                      <div class="edu-school mb-1">{{ edu.school }}</div>
                      <v-chip size="small" variant="tonal" color="primary">{{
                        edu.period
                      }}</v-chip>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Contact -->
      <section id="contact" class="section-pad contact-section">
        <v-container>
          <SectionTitle label="Let's Connect" title="Get In Touch" dark />
          <v-row justify="center" class="mt-8">
            <v-col cols="12" md="6" class="text-center">
              <p class="contact-sub mb-8">
                I'm currently open to new opportunities.<br />
                Whether you have a project in mind or just want to chat — my
                inbox is always open.
              </p>
              <div
                class="d-flex flex-wrap justify-center gap-4 contact-actions"
              >
                <v-btn
                  href="mailto:contactstalvin@gmail.com"
                  color="accent"
                  variant="flat"
                  rounded="pill"
                  size="large"
                  prepend-icon="mdi-email-outline"
                  class="contact-btn"
                >
                  contactstalvin@gmail.com
                </v-btn>

                <v-btn
                  href="https://linkedin.com/in/stalvinmm"
                  target="_blank"
                  color="white"
                  variant="flat"
                  rounded="pill"
                  size="large"
                  prepend-icon="mdi-linkedin"
                  class="contact-btn"
                >
                  LinkedIn
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
        <div class="contact-blob"></div>
      </section>

      <!-- Footer -->
      <footer class="footer">
        <v-container
          class="d-flex flex-wrap align-center justify-space-between"
        >
          <span class="footer-logo">SMM</span>
          <span class="footer-copy">© 2026 Stalvin Melron Menezes</span>
          <span class="footer-made">Made with Vue 3 + Vuetify 3</span>
        </v-container>
      </footer>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import SectionTitle from "./components/SectionTitle.vue";

const scrolled = ref(false);
const hoveredProject = ref(null);

const experiences = [
  {
    role: "Full Stack Web Developer",
    company: "Agilets Pvt Ltd",
    location: "Bengaluru",
    period: "Nov 2021 – Present",
    type: "Full Time",
    color: "accent",
    points: [
      `Enhanced and launched <strong>10+ responsive web modules</strong> using Vue.js, Laravel, and MySQL — improving app performance by <strong>25%</strong>.`,

      `Designed reusable components across <strong>5+ major projects</strong>, cutting development time by <strong>30%</strong>.`,

      `Maintained <strong>100% project documentation</strong> and contributed to internal wikis for onboarding.`,
    ],
  },
];

const navLinks = [
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const stats = [
  { value: "4+", label: "Years Experience" },
  { value: "10+", label: "Projects Shipped" },
  { value: "30%", label: "Dev Time Saved" },
  { value: "25%", label: "Performance Improvement" },
];

const skillCategories = [
  {
    icon: "mdi-layers-outline",
    title: "Frontend",
    skills: [
      "Vue 3",
      "React",
      "Vuetify 3",
      "MUI",
      "Bootstrap",
      "HTML5",
      "CSS3",
      "JavaScript",
    ],
  },
  {
    icon: "mdi-server-outline",
    title: "Backend",
    skills: ["PHP", "Laravel 10", "RESTful APIs", "MySQL", "Oracle"],
  },
  {
    icon: "mdi-tools",
    title: "Tools & Platforms",
    skills: ["GitHub", "Bitbucket", "VS Code", "Postman", "Windows", "Linux"],
  },
];

const projects = [
  {
    name: "Pharmacare",
    emoji: "💊",
    color: "linear-gradient(135deg,#E94560 0%,#c73652 100%)",
    period: "Jan 2026 – Present",
    status: "Active",
    statusColor: "success",
    stack: ["Vue 3", "Vuetify 3", "MySQL", "PHP", "Laravel 10", "Bootstrap"],
    desc: "Patient registration module with configurable Terms & Conditions, PAF workflow covering submission, review, approval, and medicine dispensing.",
  },
  {
    name: "Sayaara",
    emoji: "🚗",
    color: "linear-gradient(135deg,#1A1A2E 0%,#16213E 100%)",
    period: "May 2024 – Present",
    status: "Active",
    statusColor: "success",
    stack: ["Vue 2", "Bootstrap", "MySQL", "PHP", "Laravel 8"],
    desc: "Vehicle job card lifecycle management with mechanic assignment, inventory, CRM module including calls, meetings, and timeline views.",
  },
  {
    name: "GulfMall",
    emoji: "🛍️",
    color: "linear-gradient(135deg,#0F3460 0%,#533483 100%)",
    period: "Jan 2024 – May 2024",
    status: "Completed",
    statusColor: "info",
    stack: ["React", "Laravel 8", "MUI", "MySQL"],
    desc: "Fully customizable multilingual RTL e-commerce app tailored for Arabic users with dynamic editable content pages.",
  },
  {
    name: "Agilesuite",
    emoji: "📊",
    color: "linear-gradient(135deg,#4A00E0 0%,#8E2DE2 100%)",
    period: "Oct 2023 – Jan 2024",
    status: "Completed",
    statusColor: "info",
    stack: ["Vue 3", "Laravel 8", "Vuetify 3", "MySQL"],
    desc: "CRM suite with lead management, call logging, meeting scheduling, and dynamic timeline tracking all lead interactions.",
  },
  {
    name: "Tradie Safe",
    emoji: "🔧",
    color: "linear-gradient(135deg,#134E5E 0%,#71B280 100%)",
    period: "Jul 2023 – Oct 2023",
    status: "Completed",
    statusColor: "info",
    stack: ["React", "Laravel 8", "Bootstrap", "MySQL"],
    desc: "Dynamic questionnaire builder with admin review workflows, secure access control, and user-friendly dashboards.",
  },
  {
    name: "The Book Whisperers",
    emoji: "📚",
    color: "linear-gradient(135deg,#F7971E 0%,#FFD200 100%)",
    period: "Sep 2022 – Apr 2023",
    status: "Completed",
    statusColor: "info",
    stack: ["Vue 2", "Laravel 8", "Vuetify 2", "MySQL"],
    desc: "Online course platform with registration, quizzes, certification, payments, and interactive polls and surveys.",
  },
  {
    name: "EDO Job Portal",
    emoji: "💼",
    color: "linear-gradient(135deg,#11998E 0%,#38EF7D 100%)",
    period: "Mar 2022 – Feb 2023",
    status: "Completed",
    statusColor: "info",
    stack: ["Vue 2", "Laravel 8", "Vuetify 2", "Bootstrap", "MySQL"],
    desc: "Enhanced a job portal with advanced search and filtering capabilities along with Zoom API integration for seamless interview scheduling and meetings.",
  },
  {
    name: "Housing Interest",
    emoji: "🏠",
    color: "linear-gradient(135deg,#FF6A00 0%,#EE0979 100%)",
    period: "Jan 2022 – Feb 2023",
    status: "Completed",
    statusColor: "info",
    stack: ["Vue 2", "Laravel 8", "Vuetify 2", "Bootstrap", "MySQL"],
    desc: "Real estate marketplace tailored for the Western Australian market with Google Places API integration and Progressive Web App (PWA) support.",
  },
];

const education = [
  {
    degree: "B.E. in Electronics & Communication",
    school: "Canara Engineering College",
    period: "2016 – 2020",
  },
  {
    degree: "PUC in Computer Science",
    school: "St. Aloysius College",
    period: "2014 – 2016",
  },
];

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function onScroll() {
  scrolled.value = window.scrollY > 40;
}

onMounted(() => window.addEventListener("scroll", onScroll));
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<style>
@import "./assets/styles/portfolio.css";
</style>
