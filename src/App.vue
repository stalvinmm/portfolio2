<template>
  <div id="app-root">
    <!-- Custom Cursor -->
    <div class="cursor-dot" ref="cursorDot"></div>
    <div class="cursor-ring" ref="cursorRing"></div>

    <!-- Page Transition Overlay -->
    <div class="page-transition-overlay" ref="transitionOverlay">
      <div class="transition-bar" v-for="n in 5" :key="n"></div>
    </div>

    <v-app>
      <!-- Nav -->
      <v-app-bar
        flat
        color="transparent"
        class="nav-bar"
        :class="{ scrolled: scrolled }"
      >
        <v-container class="d-flex align-center">
          <span class="nav-logo" ref="navLogo">SMM</span>
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
          >
            Hire Me
          </v-btn>
          <v-btn
            class="d-flex d-md-none"
            icon
            variant="text"
            @click="mobileMenu = true"
          >
            <v-icon color="white">mdi-menu</v-icon>
          </v-btn>
        </v-container>
      </v-app-bar>

      <v-main style="background: #050510">
        <!-- Hero -->
        <section id="hero" class="hero-section">
          <canvas ref="threeCanvas" class="three-canvas"></canvas>
          <v-container class="hero-container">
            <div class="hero-badge reveal-fade" ref="heroBadge">
              <span class="badge-dot"></span>
              Available for new projects
            </div>
            <h1 class="hero-title">
              <span class="text-reveal-line"
                ><span class="text-reveal-inner">Hi, I'm</span></span
              >
              <span class="text-reveal-line accent-line"
                ><span class="text-reveal-inner hero-name-highlight"
                  >Stalvin</span
                ></span
              >
              <span class="text-reveal-line"
                ><span class="text-reveal-inner">Full Stack Web</span></span
              >
              <span class="text-reveal-line"
                ><span class="text-reveal-inner">Developer</span></span
              >
            </h1>
            <p class="hero-sub reveal-fade" style="animation-delay: 0.9s">
              Building dynamic, responsive web applications<br
                class="d-none d-md-block"
              />
              with Vue.js, React &amp; Laravel — 4+ years of experience.
            </p>
            <div
              class="hero-actions reveal-fade d-flex flex-wrap gap-3"
              style="animation-delay: 1.1s"
            >
              <v-btn
                color="accent"
                variant="flat"
                rounded="pill"
                size="large"
                class="magnetic-btn"
                @click="scrollTo('projects')"
              >
                View Projects <v-icon end>mdi-arrow-right</v-icon>
              </v-btn>
              <v-btn
                color="white"
                variant="outlined"
                rounded="pill"
                size="large"
                class="magnetic-btn"
                @click="scrollTo('contact')"
              >
                Get In Touch
              </v-btn>
            </div>
            <div
              class="hero-stats d-flex flex-wrap gap-6 mt-10 reveal-fade"
              style="animation-delay: 1.3s"
            >
              <div v-for="stat in stats" :key="stat.label" class="stat-item">
                <div class="stat-number" :data-target="stat.raw">
                  0{{ stat.suffix }}
                </div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            </div>
          </v-container>
          <div
            class="hero-scroll-indicator reveal-fade"
            style="animation-delay: 1.5s"
          >
            <span>scroll</span>
            <div class="scroll-line"></div>
          </div>
        </section>

        <!-- Tech Stack Marquee -->
        <section class="marquee-section">
          <div class="marquee-track">
            <div class="marquee-inner">
              <span
                v-for="tech in [...techStack, ...techStack]"
                :key="Math.random()"
                class="marquee-item"
              >
                {{ tech.icon }} {{ tech.name }}
              </span>
            </div>
          </div>
        </section>

        <!-- Skills -->
        <section id="skills" class="section-pad">
          <v-container>
            <SectionTitle label="What I Do" title="Skills & Expertise" dark />
            <v-row class="mt-8" justify="center">
              <v-col
                v-for="(cat, i) in skillCategories"
                :key="cat.title"
                cols="12"
                sm="6"
                md="4"
              >
                <v-card
                  class="skill-card gsap-reveal h-100"
                  :data-delay="i * 0.1"
                  variant="flat"
                >
                  <v-card-text class="pa-6">
                    <div class="skill-icon-wrap mb-4">
                      <v-icon :icon="cat.icon" size="28" color="accent" />
                    </div>
                    <div class="skill-cat-title mb-3">{{ cat.title }}</div>
                    <div class="d-flex flex-wrap gap-2">
                      <v-chip
                        style="color: white"
                        v-for="skill in cat.skills"
                        :key="skill"
                        size="small"
                        variant="tonal"
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
        <section id="experience" class="section-pad experience-section">
          <v-container>
            <SectionTitle label="Career" title="Work Experience" dark />
            <v-row class="mt-8" justify="center">
              <v-col cols="12" md="8">
                <div class="timeline">
                  <div
                    v-for="(exp, i) in experiences"
                    :key="i"
                    class="timeline-item gsap-reveal"
                    :data-delay="i * 0.1"
                  >
                    <div class="timeline-dot"></div>
                    <v-card class="timeline-card" variant="flat">
                      <v-card-text class="pa-6">
                        <div
                          class="d-flex flex-wrap align-center justify-space-between mb-2"
                        >
                          <div class="exp-title">{{ exp.role }}</div>
                          <v-chip
                            size="small"
                            :color="exp.color"
                            variant="tonal"
                            >{{ exp.period }}</v-chip
                          >
                        </div>
                        <div class="exp-company mb-4">
                          <v-icon size="16" color="accent" class="mr-1"
                            >mdi-domain</v-icon
                          >
                          {{ exp.company }}, {{ exp.location }}
                          <v-chip
                            size="x-small"
                            class="ml-2"
                            color="accent"
                            variant="outlined"
                            >{{ exp.type }}</v-chip
                          >
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

        <!-- Projects – Bento Grid -->
        <section id="projects" class="section-pad">
          <v-container>
            <SectionTitle label="Portfolio" title="Featured Projects" dark />
            <div class="bento-grid mt-8">
              <div
                v-for="(project, i) in projects"
                :key="project.name"
                class="bento-card gsap-reveal"
                :class="project.size"
                :data-delay="i * 0.07"
                :style="`--card-bg: ${project.color}`"
                @click="openModal(project)"
              >
                <div class="bento-bg"></div>
                <div class="bento-content">
                  <span class="bento-emoji">{{ project.emoji }}</span>
                  <div class="bento-info">
                    <div class="bento-name">{{ project.name }}</div>
                    <div class="bento-period">{{ project.period }}</div>
                    <p class="bento-desc">{{ project.desc }}</p>
                    <div class="bento-stack">
                      <span
                        v-for="tech in project.stack.slice(0, 3)"
                        :key="tech"
                        class="stack-pill"
                        >{{ tech }}</span
                      >
                    </div>
                  </div>
                </div>
                <div class="bento-hover-arrow">
                  <v-icon color="white" size="20">mdi-arrow-top-right</v-icon>
                </div>
              </div>
            </div>
          </v-container>
        </section>

        <!-- Strengths & Hobbies -->
        <section class="section-pad strengths-section">
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <SectionTitle label="Personal" title="Strengths" dark />
                <div class="strengths-list mt-6">
                  <div
                    v-for="(s, i) in strengths"
                    :key="s"
                    class="strength-item gsap-reveal"
                    :data-delay="i * 0.1"
                  >
                    <span class="strength-icon">✦</span> {{ s }}
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <SectionTitle label="Life" title="Hobbies" dark />
                <div class="hobbies-grid mt-6">
                  <div
                    v-for="(h, i) in hobbies"
                    :key="h.name"
                    class="hobby-chip gsap-reveal"
                    :data-delay="i * 0.08"
                  >
                    <span>{{ h.icon }}</span> {{ h.name }}
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </section>

        <!-- Education -->
        <section id="education" class="section-pad education-section">
          <v-container>
            <SectionTitle label="Background" title="Education" dark />
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
                      class="edu-card gsap-reveal h-100"
                      :data-delay="i * 0.1"
                      variant="flat"
                    >
                      <v-card-text class="pa-6">
                        <div class="edu-icon-wrap mb-3">
                          <v-icon icon="mdi-school" size="24" color="accent" />
                        </div>
                        <div class="edu-degree mb-1">{{ edu.degree }}</div>
                        <div class="edu-school mb-1">{{ edu.school }}</div>
                        <v-chip size="small" variant="tonal" color="accent">{{
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
                <div class="d-flex flex-wrap justify-center gap-4">
                  <v-btn
                    href="mailto:contactstalvin@gmail.com"
                    color="accent"
                    variant="flat"
                    rounded="pill"
                    size="large"
                    prepend-icon="mdi-email-outline"
                    class="magnetic-btn email-btn"
                  >
                    Email Me
                  </v-btn>
                  <v-btn
                    href="https://linkedin.com/in/stalvinmm"
                    target="_blank"
                    color="white"
                    variant="outlined"
                    rounded="pill"
                    size="large"
                    prepend-icon="mdi-linkedin"
                    class="magnetic-btn"
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
            class="footer-container d-flex align-center justify-space-between"
          >
            <span class="footer-logo">SMM</span>
            <span class="footer-copy">© 2026 Stalvin Melron Menezes</span>
            <span class="footer-made">Made with Vue 3 + Vuetify 3</span>
          </v-container>
        </footer>
      </v-main>

      <Transition name="menu-fade">
        <div
          v-if="mobileMenu"
          class="menu-overlay"
          @click.self="mobileMenu = false"
        >
          <div class="menu-panel">
            <div class="menu-header">
              <span class="menu-logo">SMM</span>

              <v-btn icon variant="text" @click="mobileMenu = false">
                <v-icon color="white">mdi-close</v-icon>
              </v-btn>
            </div>

            <div class="menu-links">
              <div
                v-for="link in navLinks"
                :key="link.id"
                class="menu-item"
                @click="
                  scrollTo(link.id);
                  mobileMenu = false;
                "
              >
                {{ link.label }}
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </v-app>

    <!-- Project Modal -->
    <Transition name="modal-transition">
      <div v-if="activeModal" class="modal-backdrop" @click.self="closeModal">
        <div class="modal-panel" ref="modalPanel">
          <button class="modal-close" @click="closeModal">
            <v-icon>mdi-close</v-icon>
          </button>
          <div class="modal-header" :style="`background: ${activeModal.color}`">
            <span class="modal-emoji">{{ activeModal.emoji }}</span>
          </div>
          <div class="modal-body">
            <div
              class="d-flex align-center justify-space-between mb-2 flex-wrap gap-2"
            >
              <h2 class="modal-title">{{ activeModal.name }}</h2>
              <v-chip
                size="small"
                :color="activeModal.statusColor"
                variant="tonal"
                >{{ activeModal.status }}</v-chip
              >
            </div>
            <p class="modal-period">{{ activeModal.period }}</p>
            <p class="modal-desc">{{ activeModal.desc }}</p>
            <div class="modal-stack mt-4">
              <span
                v-for="tech in activeModal.stack"
                :key="tech"
                class="stack-pill-lg"
                >{{ tech }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import SectionTitle from "./components/SectionTitle.vue";

// ─── Refs ───────────────────────────────────────────────
const cursorDot = ref(null);
const cursorRing = ref(null);
const threeCanvas = ref(null);
const transitionOverlay = ref(null);
const activeModal = ref(null);
const scrolled = ref(false);
const mobileMenu = ref(false);

// ─── Data ────────────────────────────────────────────────
const navLinks = [
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const stats = [
  { raw: 4, suffix: "+", label: "Years Experience" },
  { raw: 10, suffix: "+", label: "Projects Shipped" },
  { raw: 30, suffix: "%", label: "Dev Time Saved" },
  { raw: 25, suffix: "%", label: "Performance Boost" },
];

const techStack = [
  { icon: "⚡", name: "Vue 3" },
  { icon: "⚛️", name: "React" },
  { icon: "🐘", name: "PHP" },
  { icon: "🔴", name: "Laravel" },
  { icon: "🗄️", name: "MySQL" },
  { icon: "💅", name: "Vuetify 3" },
  { icon: "🎨", name: "MUI" },
  { icon: "🌐", name: "REST APIs" },
  { icon: "📦", name: "Bitbucket" },
  { icon: "🔧", name: "VS Code" },
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

const experiences = [
  {
    role: "Full Stack Web Developer",
    company: "Agilets Pvt Ltd",
    location: "Bengaluru",
    period: "Nov 2021 – Present",
    type: "Full Time",
    color: "accent",
    points: [
      "Enhanced and launched <strong>10+ responsive web modules</strong> using Vue.js, Laravel, and MySQL — improving app performance by <strong>25%</strong>.",
      "Designed reusable components across <strong>5+ major projects</strong>, cutting development time by <strong>30%</strong>.",
      "Maintained <strong>100% project documentation</strong> and contributed to internal wikis for onboarding.",
    ],
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
    size: "bento-md",
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
    size: "bento-md",
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
    size: "bento-sm",
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
    size: "bento-sm",
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
    size: "bento-sm",
  },
  {
    name: "Book Whisperers",
    emoji: "📚",
    color: "linear-gradient(135deg,#F7971E 0%,#FFD200 100%)",
    period: "Sep 2022 – Apr 2023",
    status: "Completed",
    statusColor: "info",
    stack: ["Vue 2", "Laravel 8", "Vuetify 2", "MySQL"],
    desc: "Online course platform with registration, quizzes, certification, payments, and interactive polls and surveys.",
    size: "bento-sm",
  },
  {
    name: "EDO Job Portal",
    emoji: "💼",
    color: "linear-gradient(135deg,#11998E 0%,#38EF7D 100%)",
    period: "Mar 2022 – Feb 2023",
    status: "Completed",
    statusColor: "info",
    stack: ["Vue 2", "Laravel 8", "Vuetify 2", "Bootstrap", "MySQL"],
    desc: "Enhanced job portal with advanced search, filtering, and Zoom API integration for seamless interview scheduling.",
    size: "bento-sm",
  },
  {
    name: "Housing Interest",
    emoji: "🏠",
    color: "linear-gradient(135deg,#FF6A00 0%,#EE0979 100%)",
    period: "Jan 2022 – Feb 2023",
    status: "Completed",
    statusColor: "info",
    stack: ["Vue 2", "Laravel 8", "Vuetify 2", "Bootstrap", "MySQL"],
    desc: "Real estate marketplace for the Western Australian market with Google Places API integration and PWA support.",
    size: "bento-sm",
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

const strengths = [
  "Effective Communication",
  "Ability to cope with different situations",
  "Positive attitude towards work",
];

const hobbies = [
  { icon: "⚽", name: "Sports" },
  { icon: "✈️", name: "Travelling" },
  { icon: "🐾", name: "Pet Care" },
  { icon: "🎵", name: "Music" },
  { icon: "🔭", name: "Exploration" },
  { icon: "🌐", name: "Internet Browsing" },
];

// ─── Custom Cursor ────────────────────────────────────────
let mouseX = 0,
  mouseY = 0;
let ringX = 0,
  ringY = 0;
let rafId = null;

function onMouseMove(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursorDot.value) {
    cursorDot.value.style.left = mouseX + "px";
    cursorDot.value.style.top = mouseY + "px";
  }
}

function animateCursor() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  if (cursorRing.value) {
    cursorRing.value.style.left = ringX + "px";
    cursorRing.value.style.top = ringY + "px";
  }
  rafId = requestAnimationFrame(animateCursor);
}

function onMouseEnterLink() {
  cursorRing.value?.classList.add("hovered");
}
function onMouseLeaveLink() {
  cursorRing.value?.classList.remove("hovered");
}

// ─── Three.js Particles ───────────────────────────────────
let threeCleanup = null;

async function initThree() {
  const THREE =
    await import("https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js");

  const canvas = threeCanvas.value;
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.offsetWidth / canvas.offsetHeight,
    0.1,
    100,
  );
  camera.position.z = 3;

  const count = 2000;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const mat = new THREE.PointsMaterial({
    color: 0xe94560,
    size: 0.015,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geo, mat);
  scene.add(points);

  // Secondary subtle particles
  const mat2 = new THREE.PointsMaterial({
    color: 0x4a00e0,
    size: 0.01,
    transparent: true,
    opacity: 0.4,
  });
  const geo2 = new THREE.BufferGeometry();
  const pos2 = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) pos2[i] = (Math.random() - 0.5) * 10;
  geo2.setAttribute("position", new THREE.BufferAttribute(pos2, 3));
  const points2 = new THREE.Points(geo2, mat2);
  scene.add(points2);

  let mx = 0,
    my = 0;
  window.addEventListener("mousemove", (e) => {
    mx = (e.clientX / window.innerWidth - 0.5) * 2;
    my = -(e.clientY / window.innerHeight - 0.5) * 2;
  });

  let animId;
  function animate() {
    animId = requestAnimationFrame(animate);
    points.rotation.y += 0.0005;
    points.rotation.x += 0.0002;
    points2.rotation.y -= 0.0003;
    points.rotation.y += mx * 0.0005;
    points.rotation.x += my * 0.0005;
    renderer.render(scene, camera);
  }
  animate();

  const onResize = () => {
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
    camera.updateProjectionMatrix();
  };
  window.addEventListener("resize", onResize);

  threeCleanup = () => {
    cancelAnimationFrame(animId);
    window.removeEventListener("resize", onResize);
    renderer.dispose();
  };
}

// ─── GSAP-like Scroll Reveals ─────────────────────────────
let scrollObserver = null;

function initScrollReveal() {
  const elements = document.querySelectorAll(".gsap-reveal");
  scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseFloat(el.dataset.delay || 0);
          setTimeout(() => {
            el.classList.add("revealed");
          }, delay * 1000);
          scrollObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.12 },
  );
  elements.forEach((el) => scrollObserver.observe(el));
}

// ─── Text Reveal Animation ────────────────────────────────
function initTextReveal() {
  const lines = document.querySelectorAll(".text-reveal-inner");
  lines.forEach((el, i) => {
    el.style.animationDelay = `${0.3 + i * 0.15}s`;
    el.classList.add("text-reveal-animate");
  });
}

// ─── Animated Counters ────────────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll(".stat-number");
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.textContent.replace(/[0-9]/g, "");
        let current = 0;
        const step = Math.ceil(target / 40);
        const interval = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current + suffix;
          if (current >= target) clearInterval(interval);
        }, 40);
        obs.unobserve(el);
      });
    },
    { threshold: 0.5 },
  );
  counters.forEach((el) => obs.observe(el));
}

// ─── Magnetic Buttons ─────────────────────────────────────
function initMagnetic() {
  document.querySelectorAll(".magnetic-btn").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });
}

// ─── Page Transition ──────────────────────────────────────
function runEntryTransition() {
  const overlay = transitionOverlay.value;
  if (!overlay) return;
  overlay.classList.add("exit");
  setTimeout(() => {
    overlay.style.display = "none";
  }, 900);
}

// ─── Scroll handler ───────────────────────────────────────
function onScroll() {
  scrolled.value = window.scrollY > 40;
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ─── Modal ────────────────────────────────────────────────
function openModal(project) {
  activeModal.value = project;
}
function closeModal() {
  activeModal.value = null;
}

// ─── Lifecycle ───────────────────────────────────────────
onMounted(async () => {
  window.addEventListener("scroll", onScroll);
  window.addEventListener("mousemove", onMouseMove);
  animateCursor();

  document.querySelectorAll("a, button, .bento-card").forEach((el) => {
    el.addEventListener("mouseenter", onMouseEnterLink);
    el.addEventListener("mouseleave", onMouseLeaveLink);
  });

  await nextTick();
  runEntryTransition();
  initTextReveal();
  initScrollReveal();
  initCounters();
  initMagnetic();
  await initThree();
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("mousemove", onMouseMove);
  cancelAnimationFrame(rafId);
  scrollObserver?.disconnect();
  threeCleanup?.();
});
</script>

<style>
@import "./assets/styles/portfolio.css";
</style>
