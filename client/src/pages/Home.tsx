import { useState, useEffect, useRef } from "react";
import Typewriter from "typewriter-effect";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Github, Linkedin, Mail, ChevronDown, Send, Shield, Lock, Code,
  Terminal, ExternalLink, Trophy, BookOpen, Cpu, Globe, ChevronRight,
  Copy, Check, Eye, Star, Zap, Database, Server, X, MapPin, Calendar,
  Fingerprint, Bug, Network, Cloud, BrainCircuit, ShieldCheck, BarChart3, ShoppingCart, Search
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
  { label: "Projects Built", value: "15+", icon: Code },
  { label: "Vulnerabilities Found", value: "30+", icon: Shield },
  { label: "Certifications", value: "5", icon: Trophy },
  { label: "Months Experience", value: "18+", icon: Star },
];

const experience = [
  {
    role: "CIB Summer Program",
    company: "Commercial International Bank (CIB)",
    period: "05/2025 – 09/2025",
    type: "Internship",
    color: "#4ade80",
    description: "Gained insights into the banking sector, digital transformation, and financial services. Participated in structured learning sessions and hands-on banking operations.",
    tags: ["Banking", "Fintech", "Digital Transformation"],
  },
  {
    role: "Full-Stack Developer",
    company: "MAIM Digital Solutions",
    period: "07/2025 – 09/2025",
    type: "Internship",
    color: "#60a5fa",
    description: "Learned and applied core web technologies including React.js and built RESTful APIs using Node.js and Express.js. Delivered production-ready features.",
    tags: ["React", "Node.js", "REST APIs"],
  },
  {
    role: "Front-End Web Developer",
    company: "Elevvo Pathways",
    period: "04/2025 – 08/2025",
    type: "Internship",
    color: "#a78bfa",
    description: "Completed an intensive front-end internship focusing on responsive design and modern UI/UX practices. Shipped multiple client-facing components.",
    tags: ["HTML/CSS", "Responsive Design", "UI/UX"],
  },
  {
    role: "Cybersecurity Intern",
    company: "Hack Secure",
    period: "04/2025 – 05/2025",
    type: "Internship",
    color: "#f59e0b",
    description: "Participated in red teaming simulations and secure coding assessments. Conducted vulnerability scans and web penetration testing exercises.",
    tags: ["Pentesting", "Red Team", "OWASP"],
  },
  {
    role: "IT Support Assistant",
    company: "Mega Store",
    period: "06/2024 – 11/2024",
    type: "Part-time",
    color: "#f87171",
    description: "Installed and configured operating systems, software, and hardware. Ensured device security with updates and patches.",
    tags: ["IT Support", "Networking", "Security"],
  },
];

const projects = [
  {
    title: "EventX Studio",
    description: "Production-ready MERN stack application with JWT auth, RBAC, MFA (2FA), session/device tracking, and account lockout protection. Secured with rate limiting, CSRF protection, CORS policies, and HTTP security headers. Built complete event lifecycle features including CRUD, media uploads, ticketing system, QR-based validation, and real-time analytics dashboards using Recharts.",
    tech: ["MongoDB", "Express", "React", "Node.js", "JWT", "RBAC", "MFA", "Recharts"],
    type: "Secure MERN Stack",
    period: "04/2025 – 09/2025",
    org: "MAIM Digital Solutions",
    githubUrl: "https://github.com/mostafa-karam/eventx-studio",
    demoUrl: "https://eventx-studio.vercel.app/",
    featured: true,
    stats: { stars: 12, views: 340 },
    icon: "Shield",
    hasPreview: true,
  },
  {
    title: "Faculty of Computer and Data Science Platform",
    description: "Responsive front-end for enterprise-grade academic management platform. Implemented role-based access control with specialized interfaces for students, faculty, and administrators. Created interactive dashboards with Chart.js data visualizations for academic performance metrics. Designed mobile-first responsive UI with custom component library and modular JavaScript architecture.",
    tech: ["React", "Chart.js", "JavaScript", "Responsive Design", "HTML/CSS"],
    type: "Management Platform",
    period: "05/2025 – Present",
    org: "Personal Project",
    githubUrl: "https://github.com/mostafa-karam/FCDS",
    demoUrl: "https://fcds-mk.vercel.app/",
    featured: true,
    stats: { stars: 8, views: 210 },
    icon: "BarChart3",
    hasPreview: true,
  },
  {
    title: "Vulnerability Analyst & Penetration Tester",
    description: "Systematic web application security testing focusing on SQLi, XSS, and authentication flaws. Expertise with Burp Suite, OWASP ZAP, Gobuster, and Nmap for reconnaissance and enumeration. Performed comprehensive vulnerability analysis, network scanning, service discovery, and wrote structured reports with risk assessment and mitigation strategies.",
    tech: ["Burp Suite", "OWASP ZAP", "Nmap", "Gobuster", "Python"],
    type: "Security Research",
    period: "11/2025 – Present",
    org: "DEPI",
    githubUrl: "https://github.com/mostafa-karam",
    demoUrl: "#",
    featured: false,
    stats: { stars: 10, views: 240 },
    icon: "Bug",
    hasPreview: false,
  },
  {
    title: "Cyber Security Tools Suite",
    description: "Desktop application suite featuring password strength analyzer, port scanner, and file encryption tool. Built with Python and Tkinter for intuitive GUI. Integrated real-time feedback, threading for async operations, and cryptographic operations. Demonstrates secure coding practices and red team methodologies.",
    tech: ["Python", "Tkinter", "Cryptography", "Socket", "Threading"],
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
    title: "E-commerce System",
    description: "Full-featured e-commerce application with comprehensive product catalog, user authentication, and order management. Applied OOP principles to create extensible product hierarchy supporting books, electronics, and clothing. Developed intuitive GUI using Java Swing with responsive design. Implemented persistent shopping cart system with complete checkout process.",
    tech: ["Java", "Swing", "OOP", "JDBC", "Database"],
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
    description: "Cloud-hosted file-sharing web application leveraging AWS infrastructure. Utilized EC2 for compute, S3 for scalable storage, IAM for secure access control, and VPC for network isolation. Implemented automated backup mechanisms and integrated CloudFront CDN for fast content delivery. Deployed with focus on security, scalability, and cost-optimization.",
    tech: ["AWS EC2", "S3", "IAM", "VPC", "CloudFront", "Node.js"],
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
    { name: "Python", level: 85, color: "#3776AB" },
    { name: "JavaScript", level: 90, color: "#F7DF1E" },
    { name: "Java", level: 70, color: "#007396" },
    { name: "Bash/Shell", level: 75, color: "#4EAA25" },
    { name: "PHP", level: 65, color: "#777BB4" },
  ],
  "Web Development": [
    { name: "React.js", level: 88, color: "#61DAFB" },
    { name: "Node.js", level: 82, color: "#339933" },
    { name: "Express.js", level: 80, color: "#ffffff" },
    { name: "MySQL / PostgreSQL", level: 72, color: "#4479A1" },
    { name: "REST APIs", level: 85, color: "#4ade80" },
  ],
  "Cybersecurity": [
    { name: "Burp Suite", level: 80, color: "#FF6633" },
    { name: "Nmap / Wireshark", level: 78, color: "#1679A7" },
    { name: "Metasploit", level: 70, color: "#4ade80" },
    { name: "OWASP Testing", level: 85, color: "#f59e0b" },
    { name: "Penetration Testing", level: 75, color: "#f87171" },
  ],
  "Cloud & DevOps": [
    { name: "AWS (EC2/S3/IAM)", level: 72, color: "#FF9900" },
    { name: "Linux Administration", level: 80, color: "#FCC624" },
    { name: "Git / GitHub", level: 90, color: "#f5f5f5" },
    { name: "Docker", level: 55, color: "#2496ED" },
  ],
};

const certifications = [
  { name: "CCNA – Cisco Networking", org: "Cisco", icon: Globe, color: "#1BA0D7" },
  { name: "Red Teaming & Ethical Hacking", org: "DEPI", icon: Shield, color: "#ef4444" },
  { name: "AWS Cloud Foundations", org: "Amazon Web Services", icon: Server, color: "#FF9900" },
  { name: "Web Application Security", org: "Hack Secure", icon: Lock, color: "#4ade80" },
  { name: "Python Programming", org: "CodeAlpha", icon: Code, color: "#3776AB" },
];

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
      className="relative bg-card border border-border rounded-xl p-6 text-center group hover:border-primary/40 transition-all hover:shadow-[0_0_30px_rgba(74,222,128,0.08)]"
    >
      <div className="absolute top-3 right-3 opacity-10 group-hover:opacity-20 transition-opacity">
        <stat.icon className="w-8 h-8 text-primary" />
      </div>
      <div className="text-3xl font-mono font-bold text-primary mb-1">
        {isNaN(target) ? stat.value : `${count}${stat.value.replace(/\d+/, "")}`}
      </div>
      <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest">{stat.label}</div>
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
  };
  
  const IconComponent = iconMap[project.icon || "Code"] || Code;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative flex flex-col bg-gradient-to-br from-card/80 to-card/30 border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(74,222,128,0.15)] ${project.featured ? "border-primary/40 md:col-span-2" : "border-border/70"}`}
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(90deg, transparent, ${typeColor}, transparent)` }} />
      
      {/* Side accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 opacity-70 group-hover:opacity-100 transition-opacity duration-300" style={{ background: typeColor }} />
      
      {/* Background animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/4 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Icon background decoration */}
      <div className="absolute -top-12 -right-12 w-40 h-40 opacity-[0.08] group-hover:opacity-[0.12] transition-opacity duration-500 pointer-events-none">
        <IconComponent className="w-full h-full text-primary" />
      </div>

      <div className="p-7 relative z-10 flex flex-col h-full">
        {/* Header with type and icon */}
        <div className="flex items-start justify-between mb-4 gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 border transition-all duration-300" style={{ background: `${typeColor}15`, borderColor: `${typeColor}30`, boxShadow: `0 0 12px ${typeColor}20` }}>
                <IconComponent className="w-4 h-4" style={{ color: typeColor }} />
              </div>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-[10px] font-mono uppercase tracking-widest font-bold px-2.5 py-1 rounded-lg border transition-all duration-200 cursor-default"
                style={{
                  color: typeColor,
                  background: `${typeColor}12`,
                  borderColor: `${typeColor}25`,
                }}
              >
                {project.type}
              </motion.span>
              {project.featured && (
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-lg bg-primary/15 border border-primary/30 text-primary font-bold">⭐ Featured</span>
              )}
            </div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-tight">{project.title}</h3>
          </div>
        </div>

        {/* Meta info */}
        {(project.period || project.org) && (
          <div className="flex flex-wrap gap-3 mb-3 text-xs text-muted-foreground/70">
            {project.period && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span className="font-mono">{project.period}</span>
              </div>
            )}
            {project.org && (
              <div className="flex items-center gap-1">
                <span className="text-primary/60">•</span>
                <span className="font-medium">{project.org}</span>
              </div>
            )}
          </div>
        )}
        
        {/* Description */}
        <p className="text-sm text-muted-foreground/90 leading-relaxed mb-4 group-hover:text-muted-foreground transition-colors flex-grow">{project.description}</p>
        
        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className="px-2.5 py-1 rounded-lg bg-primary/6 border border-primary/15 text-primary/85 text-[11px] font-mono font-medium hover:bg-primary/12 hover:border-primary/30 transition-all cursor-default"
            >
              {t}
            </motion.span>
          ))}
        </div>

        {/* Footer with stats and actions */}
        <div className="flex flex-col gap-3 pt-5 border-t border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-muted-foreground/70">
              <motion.span className="flex items-center gap-1.5 hover:text-yellow-500 transition-colors cursor-default">
                <Star className="w-3.5 h-3.5" />
                <span className="font-semibold">{project.stats.stars}</span>
              </motion.span>
              <motion.span className="flex items-center gap-1.5 hover:text-blue-400 transition-colors cursor-default">
                <Eye className="w-3.5 h-3.5" />
                <span className="font-semibold">{project.stats.views}</span>
              </motion.span>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
                className="p-1.5 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
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
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded-lg hover:bg-primary/5 group/link font-medium"
                >
                  <Github className="w-3.5 h-3.5 group-hover/link:scale-110 transition-transform" />
                  <span>Code</span>
                </motion.a>
              )}
              {project.demoUrl && project.demoUrl !== "#" && (
                <motion.button
                  whileHover={{ x: -2 }}
                  onClick={handlePreview}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded-lg hover:bg-primary/5 group/link font-medium"
                >
                  <Eye className="w-3.5 h-3.5 group-hover/link:scale-110 transition-transform" />
                  <span>Preview</span>
                </motion.button>
              )}
            </div>
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
  const [projectSort, setProjectSort] = useState<"date" | "complexity" | "techs">("date");
  const [projectSearch, setProjectSearch] = useState("");

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
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background z-0" />
        <motion.div style={{ y: y1 }} className="hidden sm:block absolute top-1/4 left-6 w-72 h-72 bg-primary/4 rounded-full blur-3xl" />
        <motion.div style={{ y: y2 }} className="hidden sm:block absolute bottom-1/4 right-6 w-96 h-96 bg-blue-500/4 rounded-full blur-3xl" />

        <div className="container px-6 z-10 flex flex-col md:flex-row items-center justify-between gap-12 max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="flex flex-col items-center md:items-start text-center md:text-left flex-1"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-primary text-xs font-mono mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Open to opportunities · Alexandria, Egypt
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight leading-none"
            >
              <span className="text-foreground">Mostafa</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-400 to-emerald-500">
                Karam
              </span>
            </motion.h1>

            <div className="text-lg md:text-xl font-mono text-primary mb-6 h-8">
              <Typewriter
                options={{
                  strings: ["Cybersecurity Analyst", "Red Teamer", "Full Stack Developer", "Bug Bounty Hunter", "Security Researcher"],
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
              className="text-muted-foreground text-base md:text-lg mb-8 max-w-lg leading-relaxed"
            >
              CS student at <span className="text-foreground font-medium">Alexandria University</span> bridging
              secure infrastructure with scalable web applications. Passionate about offensive security,
              CTFs, and building resilient systems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="w-full flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
            >
              <Link to="projects" smooth={true} duration={600} offset={-100}>
                <Button size="lg" className="w-full sm:w-auto bg-primary text-black hover:bg-primary/90 font-bold font-mono hover:shadow-[0_0_25px_rgba(74,222,128,0.4)] transition-all">
                  View Projects <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <a href="/resume.pdf" download="Mostafa_Karam_Resume.pdf">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary/40 text-primary hover:bg-primary/8 font-mono">
                  Download CV
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-10 flex gap-5 justify-center md:justify-start"
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
            className="flex justify-center relative flex-1"
          >
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[380px] lg:h-[380px] group">
              <div className="absolute -inset-4 border border-dashed border-primary/30 rounded-2xl animate-[spin_25s_linear_infinite]" />
              <div className="absolute -inset-2 border border-primary/10 rounded-2xl animate-[pulse_4s_ease-in-out_infinite]" />
              <div className="absolute inset-0 border-2 border-primary/20 rounded-2xl overflow-hidden z-10 group-hover:border-primary/50 transition-all duration-500">
                <img src={profileImg} alt="Mostafa Karam"
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-5 -right-5 bg-black/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-primary/30 z-20 shadow-lg">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-primary" />
                  <span className="text-xs font-mono text-primary">Sec Expert</span>
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
      <section className="py-12 bg-secondary/5 border-y border-border">
        <div className="container px-6 max-w-[1100px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-28 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-20 right-0 w-80 h-80 bg-primary/3 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-20 left-0 w-60 h-60 bg-blue-500/3 blur-[80px] rounded-full pointer-events-none" />

        <div className="container px-6 max-w-[1100px] mx-auto">
          <SectionHeading title="About Me" subtitle="Who I Am" number="01" align="center" />

          <div className="grid md:grid-cols-12 gap-8 items-start">
            {/* Left: Main bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-7 space-y-6"
            >
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I'm a <span className="text-foreground font-semibold">Cybersecurity-focused Computer Science student</span> at
                  Alexandria University, Egypt. My journey began with curiosity about how systems break,
                  which naturally evolved into a passion for both securing and building them.
                </p>
                <p>
                  With a dual focus on <span className="text-primary font-medium">offensive security</span> and
                  <span className="text-primary font-medium"> full-stack development</span>, I bridge the gap between writing
                  secure code and understanding how attackers think. I actively hunt bugs on HackerOne,
                  Bugcrowd, YesWeHack, and Intigriti.
                </p>
                <p>
                  When not researching vulnerabilities or building web apps, I'm deep in CTF competitions,
                  studying new attack vectors, or automating security workflows with Python.
                </p>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {[
                  { icon: BookOpen, label: "Education", value: "Alexandria University, CS 2023–Present", color: "#4ade80" },
                  { icon: MapPin, label: "Location", value: "Smouha, Alexandria, Egypt", color: "#60a5fa" },
                  { icon: Globe, label: "Languages", value: "Arabic (Native) · English (Fluent)", color: "#a78bfa" },
                  { icon: Zap, label: "Status", value: "Open to internships & freelance", color: "#f59e0b" },
                ].map(({ icon: Icon, label, value, color }) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="group relative flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-card to-card/50 border border-border/60 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(74,222,128,0.08)] overflow-hidden"
                  >
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 relative z-10 border border-border/40 group-hover:border-primary/30 transition-colors" style={{ background: `${color}12`, boxShadow: `0 0 12px ${color}15` }}>
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                    <div className="min-w-0 relative z-10">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground group-hover:text-primary/70 transition-colors mb-0.5">{label}</div>
                      <div className="text-sm text-foreground font-medium leading-tight">{value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Specializations */}
              <div className="pt-2">
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Fingerprint className="w-3 h-3 text-primary" /> Core Specializations
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { label: "Web App Security", icon: ShieldCheck },
                    { label: "Penetration Testing", icon: Bug },
                    { label: "Full Stack Dev", icon: Code },
                    { label: "Network Security", icon: Network },
                    { label: "Cloud Security", icon: Cloud },
                    { label: "Bug Bounty", icon: BrainCircuit },
                  ].map(({ label, icon: Icon }) => (
                    <motion.span
                      key={label}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary/8 to-primary/4 border border-primary/25 text-primary/90 text-xs font-mono hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(74,222,128,0.15)] cursor-pointer group"
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
              className="md:col-span-5 space-y-5"
            >
              {/* Enhanced terminal block */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-black/70 to-black/40 rounded-xl border border-border/80 overflow-hidden shadow-2xl hover:shadow-[0_0_30px_rgba(74,222,128,0.1)] transition-all duration-500"
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
                  <span className="text-xs text-muted-foreground font-mono flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                    </span>
                    mostafa@kali ~ bash
                  </span>
                  <div className="w-12" />
                </div>
                <div className="p-5 font-mono text-sm space-y-3 min-h-[280px] flex flex-col">
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
                    className="text-muted-foreground/80 leading-relaxed text-xs border-l-2 border-primary/40 ml-2 pl-4 py-1"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span className="text-emerald-400">Break systems ethically</span> to make the web safer.<br/>
                    <span className="text-emerald-400">Build fast, ship secure.</span> Repeat.
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
                    className="pl-5 grid grid-cols-2 gap-x-4 gap-y-1 text-xs"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    {["web-security/", "full-stack/", "pentest/", "bug-bounty/", "cloud-infra/", "automation/"].map((f, i) => (
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
                      className="group flex items-center gap-3 bg-gradient-to-r from-card to-card/40 border border-border/60 rounded-lg p-3.5 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_15px_rgba(74,222,128,0.1)] cursor-default"
                    >
                      <div className="w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0 border border-border/40 group-hover:border-primary/40 transition-colors" style={{ background: `${cert.color}15`, boxShadow: `0 0 8px ${cert.color}20` }}>
                        <cert.icon className="w-4 h-4" style={{ color: cert.color }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">{cert.name}</div>
                        <div className="text-xs text-muted-foreground/80">{cert.org}</div>
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
      <section id="skills" className="py-28 bg-secondary/5 border-y border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/3 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-500/3 blur-[80px] rounded-full pointer-events-none" />
        <div className="container px-6 max-w-[1100px] mx-auto relative z-10">
          <SectionHeading title="Technical Arsenal" subtitle="Skills & Tools" number="02" align="center" />

          {/* Tab selector with icons */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {Object.keys(skills).map((tab) => {
              const Icon = skillTabIcons[tab] || Code;
              const isActive = activeSkillTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveSkillTab(tab)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-mono transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-black font-bold shadow-[0_0_20px_rgba(74,222,128,0.3)]"
                      : "bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSkillTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              {/* Skill bars in a nice card */}
              <div className="bg-card border border-border rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-5">
                  {skills[activeSkillTab as keyof typeof skills].map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <SkillBar {...skill} />
                    </motion.div>
                  ))}
                </div>

                {/* Category insight tag */}
                <div className="mt-8 pt-6 border-t border-border/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {(() => { const Icon = skillTabIcons[activeSkillTab] || Code; return <Icon className="w-4 h-4 text-primary" />; })()}
                    <span className="text-xs font-mono text-primary">{activeSkillTab}</span>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">
                    {skills[activeSkillTab as keyof typeof skills].length} skills tracked
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bug bounty card */}
          <div className="mt-10 max-w-3xl mx-auto">
            <BugBountySection />
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="py-28 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/2 blur-[120px] rounded-full pointer-events-none" />
        <div className="container px-6 max-w-[1100px] mx-auto">
          <SectionHeading title="Professional Journey" subtitle="Experience" number="03" align="center" />

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
                      <div className="group bg-card border border-border rounded-xl p-5 hover:border-primary/25 transition-all duration-300 hover:shadow-[0_4px_30px_rgba(0,0,0,0.3)] relative overflow-hidden">
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
                          <p className="text-xs text-muted-foreground leading-relaxed mb-3">{job.description}</p>
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
      <section id="projects" className="py-28 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-primary/[0.02]" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/3 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-500/3 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container px-6 max-w-[1100px] mx-auto relative z-10">
          <SectionHeading title="Selected Works" subtitle="Projects" number="04" align="center" />

          {/* Project controls: Premium Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 space-y-5"
          >
            {/* Modern Search bar */}
            <motion.div 
              whileHover={{ y: -2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 pointer-events-none" />
              <div className="relative flex items-center gap-3 px-6 py-4 rounded-2xl border border-primary/20 bg-gradient-to-r from-card/80 to-card/40 backdrop-blur-xl hover:border-primary/40 transition-all duration-300 group">
                <motion.div
                  animate={{ scale: projectSearch ? 1.1 : 1, color: projectSearch ? "#4ade80" : "#a1a1a1" }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Search className="w-5 h-5" />
                </motion.div>
                <input
                  type="text"
                  placeholder="Search projects, technologies, expertise..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground/40 text-foreground font-medium"
                />
                <AnimatePresence>
                  {projectSearch && (
                    <motion.button
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      onClick={() => setProjectSearch("")}
                      className="text-muted-foreground hover:text-primary transition-colors p-1.5 hover:bg-primary/5 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Filter and Sort controls - Premium Design */}
            <div className="flex flex-wrap items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-card/50 to-card/30 border border-border/40 backdrop-blur-sm">
              {/* Label */}
              <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-wider">Filter:</span>
              
              {/* Filter tabs with premium styling */}
              <div className="flex flex-wrap gap-2 flex-1">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setProjectFilter(null)}
                  className={`relative px-4 py-2 rounded-full font-mono text-xs font-bold transition-all duration-300 overflow-hidden group ${
                    projectFilter === null
                      ? "bg-gradient-to-r from-primary to-primary/80 text-black shadow-lg shadow-primary/40"
                      : "bg-card/60 border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <span className="relative">All</span>
                </motion.button>
                {Array.from(new Set(projects.map(p => p.type))).map(type => (
                  <motion.button
                    key={type}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setProjectFilter(type)}
                    className={`relative px-4 py-2 rounded-full font-mono text-xs font-bold transition-all duration-300 overflow-hidden group ${
                      projectFilter === type
                        ? "bg-gradient-to-r from-primary to-primary/80 text-black shadow-lg shadow-primary/40"
                        : "bg-card/60 border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    <span className="relative">{type.split(" ")[0]}</span>
                  </motion.button>
                ))}
              </div>
              
              {/* Sort dropdown - Premium */}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-wider hidden sm:inline">Sort:</span>
                <select
                  value={projectSort}
                  onChange={(e) => setProjectSort(e.target.value as "date" | "complexity" | "techs")}
                  className="px-4 py-2 rounded-full border border-border/60 bg-card/60 backdrop-blur-sm text-muted-foreground text-xs font-mono font-bold hover:border-primary/40 hover:text-primary transition-all duration-300 cursor-pointer outline-none appearance-none pr-8"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23a1a1a1' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 10px center',
                    paddingRight: '28px'
                  }}
                >
                  <option value="date">Latest</option>
                  <option value="complexity">Complex</option>
                  <option value="techs">Techs</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Featured projects - Enhanced */}
          {projects.filter(p => p.featured).length > 0 && (
            <div className="mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-8 flex items-center gap-4"
              >
                <div className="h-12 w-1 bg-gradient-to-b from-primary via-primary/60 to-primary/20 rounded-full" />
                <div>
                  <motion.p 
                    className="text-base font-mono text-primary font-bold uppercase tracking-widest flex items-center gap-2"
                    whileHover={{ x: 2 }}
                  >
                    <motion.span animate={{ rotate: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }}>✦</motion.span>
                    Featured Projects
                    <motion.span animate={{ rotate: [0, -12, 0] }} transition={{ duration: 2, repeat: Infinity }}>✦</motion.span>
                  </motion.p>
                  <p className="text-xs text-muted-foreground/70 mt-1">Showcasing my most impressive and complete work</p>
                </div>
              </motion.div>
              <div className="grid md:grid-cols-2 gap-7">
                {projects.filter(p => p.featured).map((project, index) => (
                  <EnhancedProjectCard
                    key={project.title}
                    project={project}
                    index={index}
                    onPreview={(proj) => {
                      setSelectedProject(proj);
                      setIsPreviewOpen(true);
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Filtered and sorted projects */}
          <div className="space-y-8">
            {projects.filter(p => !p.featured).length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <div className="h-9 w-0.5 bg-gradient-to-b from-primary/60 to-primary/10 rounded-full" />
                <div>
                  <p className="text-sm font-mono text-muted-foreground/80 font-bold uppercase tracking-widest">Portfolio</p>
                  <p className="text-xs text-muted-foreground/60 mt-0.5">Complete collection of projects & research</p>
                </div>
              </motion.div>
            )}
            
            {/* Projects grid - Dynamic masonry layout */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {(() => {
                let filtered = projects.filter(p => !p.featured);
                
                // Apply search filter
                if (projectSearch) {
                  filtered = filtered.filter(p =>
                    p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
                    p.description.toLowerCase().includes(projectSearch.toLowerCase()) ||
                    p.tech.some(t => t.toLowerCase().includes(projectSearch.toLowerCase()))
                  );
                }
                
                // Apply type filter
                if (projectFilter) {
                  filtered = filtered.filter(p => p.type === projectFilter);
                }
                
                // Apply sorting
                filtered.sort((a, b) => {
                  if (projectSort === "date") {
                    return (new Date(b.period.split(" – ")[1]).getTime() || 0) - (new Date(a.period.split(" – ")[1]).getTime() || 0);
                  } else if (projectSort === "complexity") {
                    return b.stats.views - a.stats.views;
                  } else if (projectSort === "techs") {
                    return b.tech.length - a.tech.length;
                  }
                  return 0;
                });
                
                if (filtered.length === 0) {
                  return (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="md:col-span-2 lg:col-span-3 py-16 text-center"
                    >
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="inline-block mb-4 text-4xl"
                      >
                        🔍
                      </motion.div>
                      <p className="text-muted-foreground text-sm font-mono">No projects match your filters.</p>
                      <p className="text-muted-foreground/60 text-xs font-mono mt-1">Try adjusting your search or selecting different categories.</p>
                    </motion.div>
                  );
                }
                
                return filtered.map((project, index) => (
                  <EnhancedProjectCard
                    key={project.title}
                    project={project}
                    index={index}
                    onPreview={(proj) => {
                      setSelectedProject(proj);
                      setIsPreviewOpen(true);
                    }}
                  />
                ));
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683311-eac922347aa1?w=1920&q=80')] bg-cover bg-center opacity-[0.03] pointer-events-none" />
        <div className="container px-6 relative z-10 max-w-[1100px] mx-auto">
          <SectionHeading title="Get In Touch" subtitle="Contact" number="05" align="center" />

          <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 space-y-6"
            >
              <div>
                <h3 className="font-bold text-foreground mb-2 font-mono text-sm">Let's work together</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Open to internships, freelance projects, and security collaborations.
                  Whether you have a project or just want to chat — my inbox is open.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { icon: Mail, label: "mostafa.karam.work@gmail.com", href: "mailto:mostafa.karam.work@gmail.com" },
                  { icon: Globe, label: "Alexandria, Egypt", href: "#" },
                ].map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center group-hover:border-primary/30 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    {label}
                  </a>
                ))}
              </div>

              <div>
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">Social</p>
                <div className="flex gap-3">
                  {[
                    { href: "https://github.com/mostafa-karam", icon: Github },
                    { href: "https://linkedin.com/in/mostafakrm", icon: Linkedin },
                  ].map(({ href, icon: Icon }) => (
                    <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-card p-7 rounded-2xl border border-border shadow-2xl relative overflow-hidden">
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
