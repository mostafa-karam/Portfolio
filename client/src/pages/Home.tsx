import { useState, useEffect, useRef } from "react";
import Typewriter from "typewriter-effect";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Github, Linkedin, Mail, ChevronDown, Send, Shield, Lock, Code,
  Terminal, ExternalLink, Trophy, BookOpen, Cpu, Globe, ChevronRight,
  Copy, Check, Eye, Star, Zap, Database, Server, X, MapPin, Calendar,
  Fingerprint, Bug, Network, Cloud, BrainCircuit, ShieldCheck, BarChart3, ShoppingCart, Search, Phone
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import confetti from "canvas-confetti";
import { Link } from "react-scroll";
import { Navbar } from "@/components/Navbar";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useContact } from "@/hooks/use-contact";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import profileImg from "@assets/photo_2025-01-26_16-06-16_1771256993035.jpg";

// ── DATA ────────────────────────────────────────────────────────────────────

const stats = [
  { label: "Vulnerabilities Reported", value: "15+", icon: Shield },
  { label: "Critical/High Findings", value: "7", icon: Bug },
  { label: "Training Tracks", value: "5", icon: Trophy },
  { label: "Security Report Pages", value: "31", icon: BookOpen },
];

const experience = [
  {
    role: "Vulnerability Analyst & Penetration Tester (Project Lead)",
    company: "Digital Egypt Pioneers Initiative (DEPI)",
    period: "11/2025 – 07/2026",
    type: "Government Program",
    color: "#4ade80",
    description: "Directed a 5-member red team through a full black-box assessment of an internal non-production web app. Found 10 vulnerabilities, achieved root-level compromise, and authored a 31-page security assessment report with CVSS ratings, proof-of-concept evidence, and remediation roadmap.",
    tags: ["Red Team Lead", "OWASP Top 10", "Reporting"],
  },
  {
    role: "Web Development Intern",
    company: "Maim Digital Solutions (FCDS Collaboration)",
    period: "07/2025 – 09/2025",
    type: "Internship",
    color: "#60a5fa",
    description: "Architected EventX Studio, a secure MERN event platform with JWT, RBAC, MFA, rate limiting, CSRF tokens, CORS policies, and HTTP security headers. Configured Jest, Supertest, and Cypress test suites.",
    tags: ["MERN", "Secure Auth", "Testing"],
  },
  {
    role: "Summer Program Participant",
    company: "Commercial International Bank (CIB)",
    period: "05/2025 – 09/2025",
    type: "Program",
    color: "#06b6d4",
    description: "Gained exposure to how major financial institutions approach cybersecurity, fraud prevention, compliance, transaction security, and digital banking infrastructure.",
    tags: ["Banking Security", "Fraud Prevention", "Compliance"],
  },
  {
    role: "Front-End Development Intern",
    company: "Elevvo Pathways",
    period: "04/2025 – 08/2025",
    type: "Internship",
    color: "#a78bfa",
    description: "Built a role-based academic platform front-end with separate student, faculty, and admin dashboards, Chart.js visualizations, mobile-first layouts, and a custom JavaScript component library.",
    tags: ["Role-Based UI", "Chart.js", "Responsive Design"],
  },
  {
    role: "Cybersecurity Intern",
    company: "Hack Secure",
    period: "04/2025 – 05/2025",
    type: "Internship",
    color: "#f59e0b",
    description: "Executed independent web app penetration tests against simulated targets, reported SQLi, XSS, IDOR, and authentication bypass issues, and built 3 Python desktop security tools with Tkinter.",
    tags: ["Burp Suite", "Nmap", "Python Tools"],
  },
  {
    role: "IT Support & Customer Service Assistant",
    company: "Mega Store",
    period: "06/2024 – 11/2024",
    type: "Part-time",
    color: "#f87171",
    description: "Configured and maintained operating systems, hardware, and enterprise software for 20+ end-user devices while producing maintenance reports for asset tracking and audit readiness.",
    tags: ["IT Support", "Troubleshooting", "Asset Tracking"],
  },
];

const projects = [
  {
    title: "TryHackMe Road — Full Web Application Penetration Test",
    description: "Led a 5-member black-box pentest against a production-like Linux web server. Discovered exposed admin paths, exploited IDOR for admin takeover, bypassed MIME validation to upload a PHP reverse shell, found unauthenticated MongoDB, dumped backup credentials, and achieved full root access. Delivered 10 findings, including 2 Critical and 5 High, in a 31-page CVSS-scored report.",
    tech: ["Nmap", "Gobuster", "WhatWeb", "Burp Suite", "Metasploit", "Netcat", "LinPEAS", "Nikto"],
    type: "Security Research",
    period: "01/2026 – 06/2026",
    org: "Shield Secure Consulting",
    githubUrl: "https://github.com/mostafa-karam",
    demoUrl: "#",
    featured: true,
    stats: { stars: 14, views: 420 },
    icon: "Bug",
    hasPreview: false,
  },
  {
    title: "EventX Studio — Secure MERN Stack Event Platform",
    description: "Production-ready MERN event platform with JWT auth, RBAC, MFA, session/device tracking, account lockout, rate limiting, CSRF tokens, CORS policies, and HTTP security headers. Includes event CRUD, Cloudinary media uploads, QR ticket validation, capacity management, Stripe payments, real-time Recharts analytics, and Jest/Supertest/Cypress test coverage.",
    tech: ["MongoDB", "Express", "React", "Node.js", "JWT", "RBAC", "MFA", "Docker", "Cypress"],
    type: "Secure MERN Stack",
    period: "08/2025 – 01/2026",
    org: "Maim Digital Solutions",
    githubUrl: "https://github.com/mostafa-karam/eventx-studio",
    demoUrl: "https://eventx-studio.vercel.app/",
    featured: true,
    stats: { stars: 12, views: 340 },
    icon: "Shield",
    hasPreview: true,
  },
  {
    title: "Interactive Bug Bounty Checklist Tool",
    description: "Client-side checklist used during HackerOne and Bugcrowd sessions. Covers OWASP Top 10, IDOR, broken access control, authentication, XSS, SQLi, CSRF, SSRF, file upload, API security, and business logic testing with persistent checkbox state, per-category progress bars, severity labels, and one-click export.",
    tech: ["HTML", "CSS", "Vanilla JavaScript", "OWASP Top 10", "Bug Bounty"],
    type: "Security Tool",
    period: "01/2026 – 06/2026",
    org: "Personal Security Research",
    githubUrl: "https://github.com/mostafa-karam",
    demoUrl: "#",
    featured: true,
    stats: { stars: 11, views: 260 },
    icon: "ShieldCheck",
    hasPreview: false,
  },
  {
    title: "Cybersecurity Desktop Toolkit — Python Security Tools Suite",
    description: "Python/Tkinter suite containing a real-time password strength analyzer, multi-threaded TCP port scanner that scans 1,000 ports in under 10 seconds, and AES-based file encryption/decryption utility with secure key handling, progress tracking, and drag-and-drop support.",
    tech: ["Python", "Tkinter", "Socket", "Cryptography", "Threading"],
    type: "Security Tools",
    period: "02/2025 – 05/2025",
    org: "Hack Secure Internship",
    githubUrl: "https://github.com/mostafa-karam",
    demoUrl: "#",
    featured: false,
    stats: { stars: 9, views: 180 },
    icon: "Terminal",
    hasPreview: false,
  },
  {
    title: "Faculty of Computer and Data Science Platform",
    description: "Responsive academic platform front-end with role-based student, faculty, and admin dashboards. Built Chart.js visualizations for academic metrics, a custom JavaScript component library, modular UI architecture, and mobile-first layouts.",
    tech: ["React", "Chart.js", "JavaScript", "Responsive Design", "HTML/CSS"],
    type: "Management Platform",
    period: "04/2025 – 08/2025",
    org: "Elevvo Pathways",
    githubUrl: "https://github.com/mostafa-karam/FCDS",
    demoUrl: "https://fcds-mk.vercel.app/",
    featured: false,
    stats: { stars: 8, views: 210 },
    icon: "BarChart3",
    hasPreview: true,
  },
  {
    title: "E-Commerce System — Full-Featured Java Application",
    description: "Java desktop application using OOP design patterns, polymorphism, inheritance, and factory patterns for an extensible product hierarchy. Includes product catalog search/filter, user authentication, persistent shopping cart sessions, order management, checkout flow, and Java Swing GUI with MVC separation.",
    tech: ["Java", "Java Swing", "OOP", "Design Patterns", "MVC"],
    type: "E-commerce System",
    period: "02/2024 – 08/2024",
    org: "Personal Project",
    githubUrl: "https://github.com/mostafa-karam",
    demoUrl: "#",
    featured: false,
    stats: { stars: 7, views: 150 },
    icon: "ShoppingCart",
    hasPreview: false,
  },
  {
    title: "AWS File-Sharing Application",
    description: "Cloud-hosted file-sharing application using EC2, S3, IAM, VPC, and CloudFront. Designed around AWS security foundations including least-privilege identity, storage controls, network isolation, backup strategy, and cost-aware deployment decisions.",
    tech: ["AWS EC2", "S3", "IAM", "VPC", "CloudFront", "Cloud Security"],
    type: "Cloud Infrastructure",
    period: "03/2025 – 06/2025",
    org: "AWS Academy Project",
    githubUrl: "https://github.com/mostafa-karam",
    demoUrl: "#",
    featured: false,
    stats: { stars: 6, views: 95 },
    icon: "Cloud",
    hasPreview: false,
  },
];

const skills = {
  "Programming": [
    { name: "Python Security Tooling", level: 88, color: "#3776AB" },
    { name: "Bash Scripting", level: 78, color: "#4EAA25" },
    { name: "JavaScript", level: 86, color: "#F7DF1E" },
    { name: "PHP", level: 68, color: "#777BB4" },
    { name: "Java OOP", level: 74, color: "#007396" },
  ],
  "Web Development": [
    { name: "React.js", level: 88, color: "#61DAFB" },
    { name: "Node.js", level: 82, color: "#339933" },
    { name: "Express.js", level: 80, color: "#ffffff" },
    { name: "MongoDB", level: 76, color: "#47A248" },
    { name: "REST APIs / JWT", level: 85, color: "#4ade80" },
  ],
  "Cybersecurity": [
    { name: "Burp Suite / OWASP ZAP", level: 86, color: "#FF6633" },
    { name: "Nmap / Gobuster / Nikto", level: 84, color: "#1679A7" },
    { name: "Metasploit / Netcat", level: 78, color: "#4ade80" },
    { name: "IDOR, XSS, SQLi, CSRF", level: 86, color: "#f59e0b" },
    { name: "Reporting / CVSS", level: 82, color: "#f87171" },
  ],
  "Cloud & DevOps": [
    { name: "AWS EC2 / S3 / IAM / VPC", level: 78, color: "#FF9900" },
    { name: "GuardDuty / CloudTrail", level: 70, color: "#06b6d4" },
    { name: "Kali / Ubuntu / Windows Server", level: 82, color: "#FCC624" },
    { name: "Git / GitHub / Docker", level: 84, color: "#2496ED" },
  ],
};

const certifications = [
  { name: "Red Teaming, Ethical Hacking & Penetration Testing", org: "Udemy · 09/2025 – Present", icon: Shield, color: "#ef4444" },
  { name: "AWS Academy Graduate — Cloud Security Foundations", org: "Amazon Web Services · 05/2026", icon: Server, color: "#FF9900" },
  { name: "Cisco CCNA — All 3 Modules Completed", org: "New Horizon + Cisco Networking Academy", icon: Globe, color: "#1BA0D7" },
  { name: "AWS Academy Graduate — Cloud Foundations", org: "Amazon Web Services · 05/2025", icon: Cloud, color: "#f59e0b" },
  { name: "Web Application Security & Python Tools", org: "Hack Secure", icon: Lock, color: "#4ade80" },
];

const impactHighlights = [
  { label: "Red Team Lead", value: "5-person", detail: "Directed a full black-box assessment", icon: ShieldCheck },
  { label: "Security Findings", value: "10", detail: "2 Critical and 5 High vulnerabilities", icon: Bug },
  { label: "Report Quality", value: "31 pages", detail: "CVSS, POCs, risk, and remediation", icon: BookOpen },
  { label: "Practice", value: "Active", detail: "HackerOne and Bugcrowd methodology", icon: Search },
];

const capabilityGroups = [
  {
    title: "Recon & Mapping",
    icon: Search,
    color: "#38bdf8",
    tools: ["Nmap", "Gobuster", "WhatWeb", "Nikto", "Wireshark"],
    outcome: "Map services, hidden paths, exposed tech, and weak network surfaces.",
  },
  {
    title: "Web Exploitation",
    icon: Bug,
    color: "#f97316",
    tools: ["Burp Suite", "OWASP ZAP", "Sqlmap", "Hydra", "Manual Testing"],
    outcome: "Validate IDOR, XSS, SQLi, CSRF, auth bypass, and file upload impact.",
  },
  {
    title: "Post-Exploitation",
    icon: Terminal,
    color: "#4ade80",
    tools: ["Metasploit", "Netcat", "LinPEAS", "Python3", "GCC"],
    outcome: "Enumerate Linux targets, stabilize access, and prove privilege impact.",
  },
  {
    title: "Secure Engineering",
    icon: Code,
    color: "#a78bfa",
    tools: ["React", "Node.js", "Express", "MongoDB", "JWT", "Docker"],
    outcome: "Build security-first MERN apps with auth, testing, and hardening built in.",
  },
  {
    title: "Cloud & Networks",
    icon: Cloud,
    color: "#f59e0b",
    tools: ["AWS IAM", "EC2", "S3", "VPC", "GuardDuty", "CCNA"],
    outcome: "Apply cloud security foundations, network segmentation, and least privilege.",
  },
  {
    title: "Reporting",
    icon: BookOpen,
    color: "#22c55e",
    tools: ["CVSS", "POC Screenshots", "Risk Notes", "Remediation", "Executive Summary"],
    outcome: "Turn technical findings into prioritized fixes stakeholders can understand.",
  },
];

const projectFilters = Array.from(new Set(projects.map((p) => p.type)));

const projectVisuals: Record<string, { label: string; metric: string; lines: string[]; panels: string[] }> = {
  "Security Research": {
    label: "Pentest Report",
    metric: "10 findings",
    lines: ["IDOR -> admin takeover", "RCE via upload bypass", "MongoDB credential dump"],
    panels: ["2 Critical", "5 High", "Root access"],
  },
  "Secure MERN Stack": {
    label: "App Dashboard",
    metric: "Auth hardened",
    lines: ["JWT + RBAC + MFA", "CSRF + rate limits", "Stripe + QR validation"],
    panels: ["Events", "Tickets", "Analytics"],
  },
  "Security Tool": {
    label: "Checklist UI",
    metric: "OWASP flow",
    lines: ["Access control", "Authentication", "Injection testing"],
    panels: ["IDOR", "XSS", "SQLi"],
  },
  "Security Tools": {
    label: "Desktop Toolkit",
    metric: "3 tools",
    lines: ["Password entropy", "1,000-port scanner", "AES file encryption"],
    panels: ["Scanner", "Analyzer", "Encryptor"],
  },
  "Management Platform": {
    label: "Academic Portal",
    metric: "3 dashboards",
    lines: ["Student dashboard", "Faculty insights", "Admin analytics"],
    panels: ["Charts", "Roles", "Reports"],
  },
  "E-commerce System": {
    label: "Java Storefront",
    metric: "MVC app",
    lines: ["Product catalog", "Persistent cart", "Order checkout"],
    panels: ["Books", "Electronics", "Clothing"],
  },
  "Cloud Infrastructure": {
    label: "AWS Topology",
    metric: "Secure cloud",
    lines: ["EC2 compute layer", "S3 storage controls", "IAM least privilege"],
    panels: ["EC2", "S3", "IAM"],
  },
};

// ── PROJECT PREVIEW MODAL ────────────────────────────────────────────

function ProjectPreviewModal({ project, isOpen, onClose }: { project: typeof projects[0]; isOpen: boolean; onClose: () => void }) {
  if (!isOpen || !project.demoUrl || project.demoUrl === "#") return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 cursor-pointer"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 z-50 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 p-6 bg-card border border-border rounded-t-2xl">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">{project.title}</h2>
                <p className="text-sm text-muted-foreground">Live Preview</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 hover:bg-card-foreground/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-muted-foreground hover:text-foreground" />
              </motion.button>
            </div>

            {/* Preview Container */}
            <div className="flex-1 bg-card border border-t-0 border-border rounded-b-2xl overflow-hidden relative">
              <motion.iframe
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                src={project.demoUrl}
                className="w-full h-full border-0"
                title={`${project.title} Preview`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
              
              {/* Loading indicator */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 flex gap-3 justify-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-black font-bold hover:shadow-[0_0_20px_rgba(74,222,128,0.4)] transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                Open in New Tab
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={onClose}
                className="px-6 py-3 rounded-lg border border-primary/40 text-primary hover:bg-primary/5 font-medium transition-all"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── COMPONENTS ───────────────────────────────────────────────────────────────

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const fontSize = 13;
    const cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);
    const chars = "01アイウエオカキクケコ";
    let frame = 0;
    const draw = () => {
      frame++;
      if (frame % 2 !== 0) { requestAnimationFrame(draw); return; }
      ctx.fillStyle = "rgba(0,0,0,0.04)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(74,222,128,0.35)";
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      requestAnimationFrame(draw);
    };
    const raf = requestAnimationFrame(draw);
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-[0.06]" />;
}

function SkillBar({ name, level, color }: { name: string; level: number; color: string }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setAnimated(true);
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="group relative">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
          <span className="text-sm font-mono text-muted-foreground group-hover:text-foreground transition-colors">{name}</span>
        </div>
        <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ color, background: `${color}15`, border: `1px solid ${color}30` }}>{level}%</span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}60, ${color})` }}
          initial={{ width: 0 }}
          animate={{ width: animated ? `${level}%` : 0 }}
          transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
        />
      </div>
    </div>
  );
}

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const target = parseInt(stat.value);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(start);
        }, 40);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="dossier-card corner-cuts p-5 text-left group hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="absolute top-3 right-3 opacity-10 group-hover:opacity-25 transition-opacity">
        <stat.icon className="w-8 h-8 text-primary" />
      </div>
      <div className="relative z-10 text-3xl font-mono font-bold text-primary mb-2">
        {isNaN(target) ? stat.value : `${count}${stat.value.replace(/\d+/, "")}`}
      </div>
      <div className="relative z-10 text-[11px] text-muted-foreground font-mono uppercase tracking-widest leading-relaxed">{stat.label}</div>
    </motion.div>
  );
}

function CertCard({ cert, index }: { cert: typeof certifications[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="flex items-center gap-3 bg-card border border-border rounded-lg p-3 hover:border-primary/30 transition-all group"
    >
      <div className="w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: `${cert.color}15` }}>
        <cert.icon className="w-4 h-4" style={{ color: cert.color }} />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-medium text-foreground truncate">{cert.name}</div>
        <div className="text-xs text-muted-foreground">{cert.org}</div>
      </div>
      <Check className="w-4 h-4 text-primary ml-auto flex-shrink-0 opacity-70" />
    </motion.div>
  );
}

function EnhancedProjectCard({ project, index, onPreview }: { project: typeof projects[0]; index: number; onPreview?: (project: typeof projects[0]) => void }) {
  const [copied, setCopied] = useState(false);
  
  // Color mapping for project types
  const typeColors: Record<string, string> = {
    "Secure MERN Stack": "#4ade80",
    "Management Platform": "#60a5fa",
    "Security Research": "#f59e0b",
    "Security Tool": "#22c55e",
    "Security Tools": "#f87171",
    "E-commerce System": "#a78bfa",
    "Cloud Infrastructure": "#06b6d4",
  };
  
  const typeColor = typeColors[project.type] || "#4ade80";
  
  const handleCopy = () => {
    navigator.clipboard.writeText(project.githubUrl || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handlePreview = () => {
    if (onPreview) {
      onPreview(project);
    }
  };
  
  // Get the icon component dynamically
  const iconMap: Record<string, any> = {
    "Shield": Shield,
    "BarChart3": BarChart3,
    "Bug": Bug,
    "Terminal": Terminal,
    "ShoppingCart": ShoppingCart,
    "Cloud": Cloud,
    "ShieldCheck": ShieldCheck,
  };
  
  const IconComponent = iconMap[project.icon || "Code"] || Code;
  const visual = projectVisuals[project.type] || projectVisuals["Security Research"];

  if (!project.featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: index * 0.04 }}
        className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#080b0d]/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:bg-white/[0.035]"
      >
        <div className="absolute inset-x-0 top-0 h-px opacity-70" style={{ background: `linear-gradient(90deg, transparent, ${typeColor}, transparent)` }} />
        <div className="flex h-full flex-col">
          <div className="mb-4 flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.035]">
              <IconComponent className="h-5 w-5" style={{ color: typeColor }} />
            </div>
            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full border px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest" style={{ color: typeColor, borderColor: `${typeColor}35`, background: `${typeColor}10` }}>
                  {project.type}
                </span>
                <span className="text-[11px] text-muted-foreground/70">{project.period}</span>
              </div>
              <h3 className="text-lg font-bold leading-tight text-foreground transition-colors group-hover:text-primary">{project.title}</h3>
            </div>
          </div>

          <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

          <div className="mb-5 flex flex-wrap gap-2">
            {project.tech.slice(0, 5).map((t) => (
              <span key={t} className="rounded-md border border-white/10 bg-white/[0.035] px-2.5 py-1 text-[11px] font-mono text-muted-foreground">
                {t}
              </span>
            ))}
            {project.tech.length > 5 && (
              <span className="rounded-md border border-white/10 bg-white/[0.035] px-2.5 py-1 text-[11px] font-mono text-muted-foreground">
                +{project.tech.length - 5}
              </span>
            )}
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
            <span className="text-[11px] font-mono text-muted-foreground/60">{project.org}</span>
            <div className="flex items-center gap-2">
              <button onClick={handleCopy} className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-primary" title="Copy GitHub URL">
                {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
              </button>
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-primary" title="Open code">
                  <Github className="h-4 w-4" />
                </a>
              )}
              {project.demoUrl && project.demoUrl !== "#" && (
                <button onClick={handlePreview} className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-primary" title="Preview project">
                  <Eye className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className={`group relative overflow-hidden rounded-xl border border-white/10 bg-[#080b0d]/90 transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_24px_70px_rgba(0,0,0,0.35)] ${project.featured ? "lg:col-span-2" : ""}`}
    >
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${typeColor}, transparent)` }} />
      <div className="absolute -right-10 -top-10 h-32 w-32 opacity-[0.06] transition-opacity group-hover:opacity-[0.12]">
        <IconComponent className="h-full w-full" style={{ color: typeColor }} />
      </div>

      <div className="relative z-10">
        <div className={`${project.featured ? "h-56 md:h-64" : "h-44"} relative overflow-hidden border-b border-white/10 bg-[#050708]`}>
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${typeColor}22, transparent 42%), radial-gradient(circle at 78% 20%, ${typeColor}24, transparent 32%)` }} />
          <div className="absolute inset-0 opacity-25 cyber-grid" />
          <div className="relative z-10 flex h-full flex-col p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
              </div>
              <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                {visual.label}
              </span>
            </div>

            <div className="grid flex-1 grid-cols-[1fr_0.72fr] gap-3">
              <div className="rounded-xl border border-white/10 bg-black/45 p-4 backdrop-blur-sm">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border" style={{ borderColor: `${typeColor}40`, background: `${typeColor}14` }}>
                    <IconComponent className="h-4 w-4" style={{ color: typeColor }} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60">Preview</div>
                    <div className="text-sm font-mono font-bold text-foreground">{visual.metric}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {visual.lines.map((line) => (
                    <div key={line} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: typeColor }} />
                      <span className="truncate">{line}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-2">
                {visual.panels.map((panel) => (
                  <div key={panel} className="flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.045] px-2 text-center text-[11px] font-mono text-foreground">
                    {panel}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`relative z-10 flex h-full flex-col ${project.featured ? "p-7 md:p-8" : "p-6"}`}>
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-widest" style={{ color: typeColor, borderColor: `${typeColor}35`, background: `${typeColor}10` }}>
                {project.type}
              </span>
              {project.featured && <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Featured</span>}
            </div>
            <h3 className={`${project.featured ? "text-2xl md:text-3xl" : "text-xl"} font-bold leading-tight text-foreground transition-colors group-hover:text-primary`}>{project.title}</h3>
          </div>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.035]">
            <IconComponent className="h-5 w-5" style={{ color: typeColor }} />
          </div>
        </div>

        <div className="mb-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground/75">
          <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{project.period}</span>
          <span className="inline-flex items-center gap-1.5"><Terminal className="h-3.5 w-3.5" />{project.org}</span>
        </div>

        <p className={`mb-5 flex-grow text-sm leading-relaxed text-muted-foreground ${project.featured ? "md:text-[15px]" : ""}`}>{project.description}</p>

        {project.featured && (
          <div className="mb-5 grid sm:grid-cols-3 gap-2">
            {[
              { label: "Scope", value: project.type },
              { label: "Timeline", value: project.period },
              { label: "Context", value: project.org },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.025] p-3">
                <div className="mb-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground/55">{item.label}</div>
                <div className="text-xs font-semibold leading-snug text-foreground">{item.value}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mb-6 flex flex-wrap gap-2">
          {project.tech.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.025 }}
              className="rounded-md border border-white/10 bg-white/[0.035] px-2.5 py-1 text-[11px] font-mono text-muted-foreground transition-colors hover:border-primary/25 hover:text-primary"
            >
              {t}
            </motion.span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground/55">Selected work</span>
          <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-primary"
                title="Copy GitHub URL"
              >
                {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
              </motion.button>
              {project.githubUrl && (
                <motion.a
                  whileHover={{ x: 2 }}
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-primary"
                >
                <Github className="w-3.5 h-3.5" />
                  <span>Code</span>
                </motion.a>
              )}
              {project.demoUrl && project.demoUrl !== "#" && (
                <motion.button
                  whileHover={{ x: -2 }}
                  onClick={handlePreview}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-primary"
                >
                <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </motion.button>
              )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BugBountySection() {
  const platforms = [
    { name: "HackerOne", color: "#00B140", badge: "Active" },
    { name: "Bugcrowd", color: "#F26522", badge: "Active" },
    { name: "YesWeHack", color: "#FF5C5C", badge: "Active" },
    { name: "Intigriti", color: "#FF6900", badge: "Active" },
  ];
  const focus = ["Broken Access Control (BAC)", "IDOR & BOLA", "Authentication Bypass", "Business Logic Flaws", "Mass Assignment"];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card border border-border rounded-2xl p-8 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/3 rounded-full blur-3xl pointer-events-none" />
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Zap className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-foreground font-mono">Bug Bounty Hunting</h3>
          <p className="text-xs text-muted-foreground">Active researcher — web-only targets</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-xs text-primary font-mono">Actively Hunting</span>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">Platforms</p>
          <div className="flex flex-wrap gap-2">
            {platforms.map((p) => (
              <span key={p.name} className="px-3 py-1 rounded-full border text-xs font-mono" style={{ borderColor: `${p.color}40`, color: p.color, background: `${p.color}10` }}>
                {p.name}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">Focus Areas</p>
          <div className="space-y-1.5">
            {focus.map((f) => (
              <div key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                <ChevronRight className="w-3 h-3 text-primary flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────

export default function Home() {
  const contactMutation = useContact();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, 220]);
  const y2 = useTransform(scrollY, [0, 600], [0, -160]);
  const [activeSkillTab, setActiveSkillTab] = useState("Programming");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState<string | null>(null);
  const [projectSearch, setProjectSearch] = useState("");

  const visibleProjects = projects
    .filter((project) => {
      const query = projectSearch.trim().toLowerCase();
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.type.toLowerCase().includes(query) ||
        project.org.toLowerCase().includes(query) ||
        project.tech.some((tool) => tool.toLowerCase().includes(query));

      return matchesSearch && (!projectFilter || project.type === projectFilter);
    })
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return b.stats.views - a.stats.views;
    });

  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = (data: InsertMessage) => {
    contactMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ["#4ade80", "#22c55e", "#16a34a"] });
      },
    });
  };

  const skillTabIcons: Record<string, any> = {
    "Programming": Code,
    "Web Development": Globe,
    "Cybersecurity": Shield,
    "Cloud & DevOps": Cloud,
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20">
      <MatrixRain />
      <div className="cyber-grid fixed inset-0 opacity-[0.12] z-0 pointer-events-none" />
      <Navbar />

      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden scanline">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(74,222,128,0.12),transparent_28%),radial-gradient(circle_at_85%_30%,rgba(56,189,248,0.1),transparent_30%),linear-gradient(to_bottom,transparent,rgba(0,0,0,0.68))] z-0" />
        <motion.div style={{ y: y1 }} className="hidden sm:block absolute top-1/4 left-6 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <motion.div style={{ y: y2 }} className="hidden sm:block absolute bottom-1/4 right-6 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

        <div className="container px-6 z-10 grid lg:grid-cols-[1.05fr_0.95fr] items-center gap-10 max-w-[1160px] mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-black/40 text-primary text-xs font-mono mb-6 backdrop-blur-xl"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Open to security roles · Alexandria, Egypt
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-7xl font-bold mb-4 tracking-tight leading-[0.95]"
            >
              <span className="text-foreground">Mostafa Karam</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-400 to-emerald-500">
                Abd El-Kader
              </span>
            </motion.h1>

            <div className="text-lg md:text-xl font-mono text-primary mb-6 h-8">
              <Typewriter
                options={{
                  strings: ["Junior Penetration Tester", "Web Application Security", "Red Teaming", "Bug Bounty Hunter", "Secure MERN Developer"],
                  autoStart: true,
                  loop: true,
                  cursor: "_",
                  delay: 45,
                  deleteSpeed: 25,
                }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-muted-foreground text-base md:text-lg mb-8 max-w-2xl leading-relaxed"
            >
              Cybersecurity-focused CS student at <span className="text-foreground font-medium">Alexandria University</span>,
              specializing in web application penetration testing and red teaming. Led a 5-member assessment
              that uncovered 10 vulnerabilities and produced a 31-page professional report.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="w-full flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Link to="projects" smooth={true} duration={600} offset={-100} className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-primary text-black hover:bg-primary/90 font-bold font-mono hover:shadow-[0_0_25px_rgba(74,222,128,0.4)] transition-all">
                  View Projects <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <a href="/resume.pdf" download="Mostafa_Karam_Resume.pdf" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary/40 text-primary hover:bg-primary/8 font-mono">
                  Download CV
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl"
            >
              {impactHighlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.08 }}
                  className="dossier-card corner-cuts p-4 text-left"
                >
                  <div className="relative z-10 flex items-center gap-2 text-primary mb-2">
                    <item.icon className="w-4 h-4" />
                    <span className="text-[10px] font-mono uppercase tracking-widest">{item.label}</span>
                  </div>
                  <div className="relative z-10 text-xl font-mono font-bold text-foreground">{item.value}</div>
                  <div className="relative z-10 mt-1 text-[11px] leading-relaxed text-muted-foreground">{item.detail}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.15 }}
              className="mt-8 flex gap-4 justify-center lg:justify-start"
            >
              {[
                { href: "https://github.com/mostafa-karam", icon: Github, label: "GitHub" },
                { href: "https://linkedin.com/in/mostafakrm", icon: Linkedin, label: "LinkedIn" },
                { href: "mailto:mostafa.karam.work@gmail.com", icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all group"
                  aria-label={label}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="flex justify-center relative"
          >
            <div className="relative w-full max-w-[430px] group">
              <div className="dossier-card corner-cuts p-4">
                <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-primary">Security Profile</div>
                    <div className="text-sm font-semibold text-foreground mt-1">Mostafa Karam Abd El-Kader</div>
                  </div>
                  <div className="rounded-md border border-primary/30 px-2 py-1 text-[10px] font-mono text-primary">ACTIVE</div>
                </div>
                <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-lg border border-primary/20">
                <img src={profileImg} alt="Mostafa Karam"
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 grid grid-cols-3 gap-2">
                    {["Pentest", "Cloud", "MERN"].map((tag) => (
                      <span key={tag} className="rounded-md border border-white/15 bg-black/55 px-2 py-1 text-center text-[10px] font-mono text-white backdrop-blur">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="relative z-10 mt-4 grid grid-cols-2 gap-3">
                  {[
                    ["Focus", "Web App Security"],
                    ["Base", "Alexandria, Egypt"],
                    ["Platforms", "HackerOne · Bugcrowd"],
                    ["Edge", "Security + Engineering"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-lg border border-white/10 bg-black/20 p-3">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60">{label}</div>
                      <div className="mt-1 text-xs font-medium text-foreground">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-5 -right-5 bg-black/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-primary/30 z-20 shadow-lg">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-primary" />
                  <span className="text-xs font-mono text-primary">Pentest</span>
                </div>
              </motion.div>
              <motion.div animate={{ y: [4, -4, 4] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-5 -left-5 bg-black/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-blue-400/30 z-20 shadow-lg">
                <div className="flex items-center gap-1.5">
                  <Code className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-mono text-blue-400">Full Stack</span>
                </div>
              </motion.div>
              <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 -right-12 bg-black/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-yellow-400/30 z-20 shadow-lg hidden lg:flex">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs font-mono text-yellow-400">Bug Hunter</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <Link to="about" smooth={true} duration={800}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer text-muted-foreground hover:text-primary transition-colors z-10">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown size={22} />
          </motion.div>
        </Link>
      </section>

      {/* ── STATS BAR ── */}
      <section className="section-band py-14">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] via-transparent to-cyan-500/[0.03]" />
        <div className="container px-6 max-w-[1160px] mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-20 sm:py-28 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-20 right-0 w-80 h-80 bg-primary/3 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-20 left-0 w-60 h-60 bg-blue-500/3 blur-[80px] rounded-full pointer-events-none" />

        <div className="container px-4 sm:px-6 max-w-[1160px] mx-auto">
          <SectionHeading title="Security Dossier" subtitle="Who I Am" number="01" align="center" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start overflow-hidden">
            {/* Left: Main bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full min-w-0 max-w-full space-y-5 sm:space-y-6 md:col-span-7"
            >
              <div className="dossier-card w-full max-w-full p-5 sm:p-7 space-y-4 overflow-hidden text-sm sm:text-base text-muted-foreground leading-relaxed">
                <p>
                  I'm a <span className="text-foreground font-semibold">Cybersecurity-focused Computer Science student</span> at
                  Alexandria University, specializing in web application penetration testing, red teaming,
                  cloud security, and secure web development.
                </p>
                <p>
                  I led a <span className="text-primary font-medium">5-member red team</span> through a full black-box assessment
                  that uncovered 10 vulnerabilities, including 2 Critical and 5 High findings, and achieved
                  root-level compromise with results documented in a 31-page report.
                </p>
                <p>
                  I actively practice bug bounty methodology on HackerOne and Bugcrowd, and I build security-first
                  software, including MERN platforms, Python desktop tools, and client-side testing checklists.
                </p>
                <div className="relative z-10 grid sm:grid-cols-3 gap-3 pt-3">
                  {[
                    ["Method", "OWASP Top 10"],
                    ["Output", "CVSS + POCs"],
                    ["Style", "Clear remediation"],
                  ].map(([label, value]) => (
                    <div key={label} className="min-w-0 rounded-lg border border-white/10 bg-black/20 p-3">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-primary/70">{label}</div>
                      <div className="mt-1 text-sm font-semibold text-foreground">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 sm:pt-4">
                {[
                  { icon: BookOpen, label: "Education", value: "B.Sc. CS, Cybersecurity · 2023–2027", color: "#4ade80" },
                  { icon: MapPin, label: "Location", value: "Alexandria, Egypt", color: "#60a5fa" },
                  { icon: Globe, label: "Languages", value: "Arabic (Native) · English (Conversational)", color: "#a78bfa" },
                  { icon: Zap, label: "Status", value: "Open to pentest, SOC, and security internships", color: "#f59e0b" },
                ].map(({ icon: Icon, label, value, color }) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="group dossier-card flex w-full max-w-full min-w-0 items-start gap-3 overflow-hidden p-4 hover:border-primary/30 transition-all duration-300"
                  >
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 relative z-10 border border-border/40 group-hover:border-primary/30 transition-colors" style={{ background: `${color}12`, boxShadow: `0 0 12px ${color}15` }}>
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                    <div className="min-w-0 relative z-10">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground group-hover:text-primary/70 transition-colors mb-0.5">{label}</div>
                      <div className="text-sm text-foreground font-medium leading-tight break-words">{value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Specializations */}
              <div className="pt-2 pb-14 sm:pb-0">
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Fingerprint className="w-3 h-3 text-primary" /> Core Specializations
                </p>
                <div className="flex flex-wrap gap-2 pr-14 sm:pr-0">
                  {[
                    { label: "Web App Pentesting", icon: ShieldCheck },
                    { label: "Red Teaming", icon: Bug },
                    { label: "Cloud Security", icon: Cloud },
                    { label: "Network Security", icon: Network },
                    { label: "Bug Bounty", icon: BrainCircuit },
                    { label: "Secure MERN", icon: Code },
                  ].map(({ label, icon: Icon }) => (
                    <motion.span
                      key={label}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="inline-flex min-w-0 items-center gap-1.5 rounded-lg border border-primary/25 bg-gradient-to-r from-primary/8 to-primary/4 px-2.5 py-1.5 text-[11px] font-mono text-primary/90 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(74,222,128,0.15)] sm:gap-2 sm:px-3 sm:text-xs cursor-pointer group"
                    >
                      <Icon className="w-3.5 h-3.5 group-hover:text-primary transition-colors" />
                      <span className="font-medium">{label}</span>
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Terminal + Certs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full min-w-0 max-w-full space-y-5 md:col-span-5"
            >
              {/* Enhanced terminal block */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="dossier-card w-full max-w-full overflow-hidden transition-all duration-500"
              >
                {/* Terminal title bar */}
                <div className="flex items-center justify-between px-4 py-3.5 border-b border-border/40 bg-gradient-to-r from-white/[0.03] to-transparent backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ delay: 0, duration: 2, repeat: Infinity }}
                      className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ delay: 0.2, duration: 2, repeat: Infinity }}
                      className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ delay: 0.4, duration: 2, repeat: Infinity }}
                      className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer"
                    />
                  </div>
                  <span className="min-w-0 truncate text-[10px] text-muted-foreground font-mono flex items-center gap-2 sm:text-xs">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                    </span>
                    mostafa@kali ~ bash
                  </span>
                  <div className="w-12" />
                </div>
                <div className="min-w-0 p-4 sm:p-5 font-mono text-sm space-y-3 min-h-[280px] flex flex-col overflow-hidden">
                  <motion.div 
                    className="flex gap-2 items-center"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <span className="text-primary font-bold">❯</span>
                    <span className="text-foreground">whoami</span>
                  </motion.div>
                  <motion.div 
                    className="text-primary/80 pl-5 text-sm font-semibold"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    mostafa-karam
                  </motion.div>

                  <motion.div 
                    className="flex gap-2 items-center mt-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="text-primary font-bold">❯</span>
                    <span className="text-foreground">cat <span className="text-blue-400">mission.txt</span></span>
                  </motion.div>
                  <motion.div 
                    className="text-muted-foreground/80 leading-relaxed text-xs border-l-2 border-primary/40 ml-2 pl-4 py-1 break-words"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span className="text-emerald-400">Find real risk, prove impact,</span> and write reports people can act on.<br/>
                    <span className="text-emerald-400">Build secure systems</span> with the attacker mindset in the room.
                  </motion.div>

                  <motion.div 
                    className="flex gap-2 items-center mt-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span className="text-primary font-bold">❯</span>
                    <span className="text-foreground">ls <span className="text-yellow-400">./skills/</span></span>
                  </motion.div>
                  <motion.div 
                    className="pl-5 grid grid-cols-2 gap-x-3 gap-y-1 text-xs"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    {["web-pentest/", "red-team/", "bug-bounty/", "cloud-security/", "secure-mern/", "reporting/"].map((f, i) => (
                      <motion.div
                        key={f}
                        initial={{ opacity: 0, x: -5 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.65 + i * 0.05 }}
                      >
                        <span className="text-blue-400/90 font-medium">{f}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  <div className="flex gap-2 items-center mt-auto">
                    <span className="text-primary font-bold">❯</span>
                    <motion.span 
                      className="animate-pulse text-foreground"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      _
                    </motion.span>
                  </div>
                </div>
              </motion.div>

              {/* Certifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Trophy className="w-3 h-3 text-primary" /> Certifications & Training
                </p>
                <div className="space-y-2.5">
                  {certifications.map((cert, i) => (
                    <motion.div
                      key={cert.name}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    className="group dossier-card flex w-full max-w-full min-w-0 items-center gap-3 overflow-hidden p-3.5 hover:border-primary/40 transition-all duration-300 cursor-default"
                    >
                      <div className="w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0 border border-border/40 group-hover:border-primary/40 transition-colors" style={{ background: `${cert.color}15`, boxShadow: `0 0 8px ${cert.color}20` }}>
                        <cert.icon className="w-4 h-4" style={{ color: cert.color }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium text-foreground group-hover:text-primary transition-colors">{cert.name}</div>
                        <div className="truncate text-xs text-muted-foreground/80">{cert.org}</div>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="flex-shrink-0"
                      >
                        <Check className="w-4 h-4 text-primary opacity-70 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="py-28 relative overflow-hidden border-y border-white/10 bg-[#050708]">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(74,222,128,0.05),transparent_22%,rgba(56,189,248,0.035)_70%,transparent)]" />
        <div className="container px-6 max-w-[1160px] mx-auto relative z-10">
          <SectionHeading title="Skills & Tools" subtitle="Capabilities" number="02" align="center" />

          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 md:p-6"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-2">Core Stack</p>
                  <h3 className="text-2xl font-bold text-foreground">What I Use In The Field</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    A focused view of the tools I use to discover, exploit, validate, build, and document security work.
                  </p>
                </div>
                <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                  <Cpu className="h-5 w-5 text-primary" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-6">
                {Object.keys(skills).map((tab) => {
                  const Icon = skillTabIcons[tab] || Code;
                  const isActive = activeSkillTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveSkillTab(tab)}
                      className={`flex min-h-[54px] items-center gap-3 rounded-xl border px-3 text-left transition-all ${
                        isActive
                          ? "border-primary/45 bg-primary/12 text-primary"
                          : "border-white/10 bg-black/20 text-muted-foreground hover:border-white/20 hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="text-xs font-mono font-semibold">{tab}</span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSkillTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="rounded-xl border border-white/10 bg-black/25 p-5"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {(() => { const Icon = skillTabIcons[activeSkillTab] || Code; return <Icon className="h-4 w-4 text-primary" />; })()}
                      <span className="font-mono text-sm font-bold text-foreground">{activeSkillTab}</span>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      {skills[activeSkillTab as keyof typeof skills].length} tools
                    </span>
                  </div>
                  <div className="space-y-4">
                    {skills[activeSkillTab as keyof typeof skills].map((skill) => (
                      <SkillBar key={skill.name} {...skill} />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {capabilityGroups.map((group, index) => (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-white/[0.04]"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border" style={{ background: `${group.color}12`, borderColor: `${group.color}35` }}>
                      <group.icon className="h-5 w-5" style={{ color: group.color }} />
                    </div>
                    <div>
                      <div className="mb-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground/50">Lane 0{index + 1}</div>
                      <h3 className="font-mono font-bold text-foreground group-hover:text-primary transition-colors">{group.title}</h3>
                    </div>
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{group.outcome}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.tools.map((tool) => (
                      <span key={tool} className="rounded-full border border-white/10 bg-black/25 px-2.5 py-1 text-[11px] font-mono text-muted-foreground">
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 rounded-2xl border border-primary/15 bg-primary/[0.035] p-5"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-mono font-bold text-foreground">Bug bounty focus</h3>
                <p className="mt-1 text-sm text-muted-foreground">Active methodology across access control, auth, injection, upload, and business logic testing.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["HackerOne", "Bugcrowd", "IDOR", "XSS", "SQLi", "CSRF", "Business Logic"].map((item) => (
                  <span key={item} className="rounded-full border border-primary/20 bg-black/20 px-3 py-1 text-xs font-mono text-primary/90">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="py-28 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/2 blur-[120px] rounded-full pointer-events-none" />
        <div className="container px-6 max-w-[1160px] mx-auto">
          <SectionHeading title="Mission History" subtitle="Experience" number="03" align="center" />

          <div className="max-w-4xl mx-auto">
            {/* Vertical timeline for all screen sizes */}
            <div className="relative pl-8 md:pl-0">
              {/* Timeline line */}
              <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-border to-transparent md:-translate-x-px" />

              <div className="space-y-8">
                {experience.map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative md:flex md:gap-8 items-start ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute left-[-1.42rem] md:left-1/2 top-5 w-4 h-4 rounded-full border-2 border-background z-10 md:-translate-x-1/2 flex-shrink-0"
                      style={{ background: job.color, boxShadow: `0 0 12px ${job.color}60` }}
                    />

                    {/* Date label for desktop */}
                    <div className={`hidden md:flex md:w-[calc(50%-2rem)] flex-col ${index % 2 === 0 ? "items-end text-right pr-10" : "items-start text-left pl-10"}`}>
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="pt-4"
                      >
                        <div className="flex items-center gap-1.5 mb-1 text-xs text-muted-foreground font-mono">
                          <Calendar className="w-3 h-3" />
                          {job.period}
                        </div>
                        <div className="font-bold text-foreground text-sm">{job.company}</div>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-mono border" style={{ borderColor: `${job.color}40`, color: job.color, background: `${job.color}10` }}>
                          {job.type}
                        </span>
                      </motion.div>
                    </div>

                    {/* Card */}
                    <div className={`md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:pl-10" : "md:pr-10"}`}>
                      <div className="group dossier-card p-5 hover:border-primary/35 transition-all duration-300 relative overflow-hidden">
                        {/* Left accent bar */}
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-xl transition-all duration-300" style={{ background: job.color, opacity: 0.6 }} />

                        <div className="pl-3">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-sm leading-tight">{job.role}</h3>
                          </div>
                          {/* Mobile: show company + date */}
                          <div className="md:hidden flex items-center gap-2 mb-2">
                            <span className="text-xs text-muted-foreground">{job.company}</span>
                            <span className="text-[10px] text-muted-foreground/60">·</span>
                            <span className="text-[10px] text-muted-foreground/80 font-mono">{job.period}</span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed mb-4">{job.description}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {job.tags.map(t => (
                              <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono" style={{ background: `${job.color}12`, color: job.color, border: `1px solid ${job.color}25` }}>{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-28 relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(74,222,128,0.035)_34%,transparent_78%)]" />
        <div className="container px-6 max-w-[1160px] mx-auto relative z-10">
          <SectionHeading title="Security Workbench" subtitle="Selected Work" number="04" align="center" />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 grid gap-5 rounded-xl border border-white/10 bg-white/[0.025] p-5 md:grid-cols-[1fr_0.95fr] md:p-6"
          >
            <div>
              <p className="mb-2 text-xs font-mono uppercase tracking-[0.22em] text-primary/80">Case studies and shipped systems</p>
              <h3 className="max-w-2xl text-2xl font-bold leading-tight text-foreground md:text-3xl">
                Proof-focused projects with clear scope, tools, and security impact.
              </h3>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {[
                  { label: "Projects", value: projects.length },
                  { label: "Featured", value: projects.filter((project) => project.featured).length },
                  { label: "Toolsets", value: new Set(projects.flatMap((project) => project.tech)).size },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg border border-white/10 bg-black/20 p-3">
                    <div className="text-xl font-bold text-foreground">{item.value}</div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-end gap-4">
              <div className="relative flex min-h-[46px] w-full items-center gap-3 rounded-lg border border-white/10 bg-black/25 px-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search projects, tools, topics"
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/45"
                />
                {projectSearch && (
                  <button onClick={() => setProjectSearch("")} className="rounded-md p-1 text-muted-foreground hover:text-primary">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setProjectFilter(null)}
                  className={`rounded-lg border px-3 py-2 text-xs font-mono transition-all ${projectFilter === null ? "border-primary/50 bg-primary text-black" : "border-white/10 bg-black/25 text-muted-foreground hover:text-foreground"}`}
                >
                  All
                </button>
                {projectFilters.map((type) => (
                  <button
                    key={type}
                    onClick={() => setProjectFilter(type)}
                    className={`rounded-lg border px-3 py-2 text-xs font-mono transition-all ${projectFilter === type ? "border-primary/50 bg-primary text-black" : "border-white/10 bg-black/25 text-muted-foreground hover:text-foreground"}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {visibleProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl border border-white/10 bg-white/[0.025] py-16 text-center"
            >
              <Search className="w-9 h-9 mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground text-sm font-mono">No projects match your filters.</p>
              <p className="text-muted-foreground/60 text-xs font-mono mt-1">Try another category or keyword.</p>
            </motion.div>
          ) : (
            <>
              <div className="mb-6">
                <EnhancedProjectCard
                  project={{ ...visibleProjects[0], featured: true }}
                  index={0}
                  onPreview={(proj) => {
                    setSelectedProject(proj);
                    setIsPreviewOpen(true);
                  }}
                />
              </div>

              {visibleProjects.length > 1 && (
                <div>
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <h3 className="font-mono text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">More evidence</h3>
                    <span className="text-xs text-muted-foreground/60">{visibleProjects.length - 1} matching projects</span>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    {visibleProjects.slice(1).map((project, index) => (
                      <EnhancedProjectCard
                        key={project.title}
                        project={{ ...project, featured: false }}
                        index={index + 1}
                        onPreview={(proj) => {
                          setSelectedProject(proj);
                          setIsPreviewOpen(true);
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(74,222,128,0.1),transparent_30%),linear-gradient(to_bottom,transparent,rgba(0,0,0,0.35))] pointer-events-none" />
        <div className="container px-6 relative z-10 max-w-[1160px] mx-auto">
          <SectionHeading title="Open Channel" subtitle="Contact" number="05" align="center" />

          <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-7">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 dossier-card p-7 space-y-6"
            >
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-mono text-primary mb-4">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  Available for security work
                </div>
                <h3 className="font-bold text-foreground mb-2 font-mono text-xl">Let's work together</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Open to penetration testing, SOC, secure web development, and security internship opportunities.
                  If you need clear reporting and practical remediation, my inbox is open.
                </p>
              </div>

              <div className="relative z-10 space-y-3">
                {[
                  { icon: Mail, label: "mostafa.karam.work@gmail.com", href: "mailto:mostafa.karam.work@gmail.com" },
                  { icon: Phone, label: "+20 101 118 7105", href: "tel:+201011187105" },
                  { icon: Globe, label: "Alexandria, Egypt", href: "#" },
                ].map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group">
                    <div className="w-9 h-9 rounded-lg bg-black/30 border border-white/10 flex items-center justify-center group-hover:border-primary/30 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    {label}
                  </a>
                ))}
              </div>

              <div className="relative z-10">
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">Social</p>
                <div className="flex gap-3">
                  {[
                    { href: "https://github.com/mostafa-karam", icon: Github },
                    { href: "https://linkedin.com/in/mostafakrm", icon: Linkedin },
                  ].map(({ href, icon: Icon }) => (
                    <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg border border-white/10 bg-black/25 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-3"
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="dossier-card space-y-4 p-7">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="bg-background border-border focus:border-primary/50 h-11 font-mono text-sm" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} className="bg-background border-border focus:border-primary/50 h-11 font-mono text-sm" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell me about your project or inquiry..." {...field} className="bg-background border-border focus:border-primary/50 min-h-[140px] resize-none font-mono text-sm" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" className="w-full h-11 bg-primary text-black font-bold hover:bg-primary/90 font-mono transition-all hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]" disabled={contactMutation.isPending}>
                    {contactMutation.isPending ? (
                      <span className="flex items-center gap-2"><span className="animate-spin h-4 w-4 border-2 border-black/30 border-t-black rounded-full" />Sending...</span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">Send Message <Send size={15} /></span>
                    )}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 bg-background border-t border-border">
        <div className="container px-6 max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-primary" />
            <span className="font-mono text-sm text-foreground">Mostafa Karam</span>
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            Built with React · TypeScript · Tailwind CSS
          </p>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} · All rights reserved
          </p>
        </div>
      </footer>

      {/* Project Preview Modal */}
      {selectedProject && (
        <ProjectPreviewModal
          project={selectedProject}
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </div>
  );
}
