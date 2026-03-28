import { useState, useEffect, useRef } from "react";
import Typewriter from "typewriter-effect";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Github, Linkedin, Mail, ChevronDown, Send, Shield, Lock, Code,
  Terminal, ExternalLink, Trophy, BookOpen, Cpu, Globe, ChevronRight,
  Copy, Check, Eye, Star, Zap, Database, Server, X
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
    description: "Production-ready MERN stack application with JWT auth, Role-Based Access Control, Multi-Factor Authentication, rate limiting, and CSRF protection — security-first architecture.",
    tech: ["MongoDB", "Express", "React", "Node.js", "JWT", "MFA"],
    type: "Secure MERN Stack",
    githubUrl: "https://github.com/mostafa-karam/eventx-studio",
    demoUrl: "https://eventx-studio.vercel.app/",
    featured: true,
    stats: { stars: 12, views: 340 },
  },
  {
    title: "FCDS Platform",
    description: "Academic management platform with role-based dashboards, interactive data visualizations using Chart.js, and a responsive admin interface.",
    tech: ["JavaScript", "Chart.js", "Responsive UI", "PHP"],
    type: "Management Platform",
    githubUrl: "https://github.com/mostafa-karam/FCDS",
    demoUrl: "https://fcds-mk.vercel.app/",
    featured: true,
    stats: { stars: 8, views: 210 },
  },
  {
    title: "Web Vulnerability Analyst",
    description: "Systematic web application security testing targeting SQLi, XSS, and authentication flaws using Burp Suite, OWASP ZAP, and Nmap. Documented findings in professional reports.",
    tech: ["Burp Suite", "Nmap", "OWASP ZAP", "Python"],
    type: "Security Research",
    githubUrl: "https://github.com/mostafa-karam/tryhackme.com-road",
    demoUrl: "#",
    featured: false,
    stats: { stars: 5, views: 120 },
  },
  {
    title: "CodeAlpha Security Tools",
    description: "Suite of Python security tools built during internship: Password Strength Checker, Port Scanner, and File Encryption Tool — all with modern GUIs.",
    tech: ["Python", "Tkinter", "Cryptography", "Socket"],
    type: "Security Tools",
    githubUrl: "https://github.com/mostafa-karam",
    demoUrl: "#",
    featured: false,
    stats: { stars: 9, views: 180 },
  },
  {
    title: "AWS File-Sharing App",
    description: "Simplified file-sharing web application on AWS using EC2, S3, IAM, and VPC. Implemented all bonus tasks including automated backups and CDN integration.",
    tech: ["AWS EC2", "S3", "IAM", "VPC", "CloudFront"],
    type: "Cloud Infrastructure",
    githubUrl: "https://github.com/mostafa-karam",
    demoUrl: "#",
    featured: false,
    stats: { stars: 6, views: 95 },
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
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-mono text-muted-foreground group-hover:text-foreground transition-colors">{name}</span>
        <span className="text-xs font-mono" style={{ color }}>{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}88, ${color})` }}
          initial={{ width: 0 }}
          animate={{ width: animated ? `${level}%` : 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
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

function EnhancedProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(project.githubUrl || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative bg-card border rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(74,222,128,0.1)] ${project.featured ? "border-primary/30" : "border-border"}`}
    >
      {project.featured && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
      )}
      {project.featured && (
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono uppercase tracking-wider">Featured</span>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className="text-[10px] font-mono text-primary/70 uppercase tracking-widest block mb-1">{project.type}</span>
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <span key={t} className="px-2 py-0.5 rounded-md bg-primary/5 border border-primary/10 text-primary/80 text-[11px] font-mono">{t}</span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Star className="w-3 h-3" />{project.stats.stars}</span>
            <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{project.stats.views}</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleCopy} className="text-muted-foreground hover:text-primary transition-colors">
              {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
            </button>
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-4 h-4" /><span>Source</span>
              </a>
            )}
            {project.demoUrl && project.demoUrl !== "#" && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                <ExternalLink className="w-4 h-4" /><span>Demo</span>
              </a>
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
  const [showAllProjects, setShowAllProjects] = useState(false);

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

  const visibleProjects = showAllProjects ? projects : projects.slice(0, 3);

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
              {/* Rotating dashed border */}
              <div className="absolute -inset-4 border border-dashed border-primary/30 rounded-2xl animate-[spin_25s_linear_infinite]" />
              <div className="absolute -inset-2 border border-primary/10 rounded-2xl animate-[pulse_4s_ease-in-out_infinite]" />

              {/* Photo */}
              <div className="absolute inset-0 border-2 border-primary/20 rounded-2xl overflow-hidden z-10 group-hover:border-primary/50 transition-all duration-500">
                <img src={profileImg} alt="Mostafa Karam"
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-5 -right-5 bg-black/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-primary/30 z-20 shadow-lg"
              >
                <div className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-primary" />
                  <span className="text-xs font-mono text-primary">Sec Expert</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-5 -left-5 bg-black/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-blue-400/30 z-20 shadow-lg"
              >
                <div className="flex items-center gap-1.5">
                  <Code className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-mono text-blue-400">Full Stack</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 -right-12 bg-black/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-yellow-400/30 z-20 shadow-lg hidden lg:flex"
              >
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
      <section id="about" className="py-24 relative">
        <div className="container px-6 max-w-[1100px] mx-auto">
          <SectionHeading title="About Me" subtitle="Who I Am" number="01" align="center" />
          <div className="grid md:grid-cols-12 gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-7 space-y-4 text-muted-foreground leading-relaxed text-center md:text-left"
            >
              <p>
                I'm a <span className="text-foreground font-semibold">Cybersecurity-focused Computer Science student</span> at
                Alexandria University, Egypt. My journey began with curiosity about how systems break,
                which naturally evolved into a passion for both securing and building them.
              </p>
              <p>
                With a dual focus on <span className="text-primary">offensive security</span> and
                <span className="text-primary"> full-stack development</span>, I bridge the gap between writing
                secure code and understanding how attackers think. I actively hunt bugs on HackerOne,
                Bugcrowd, YesWeHack, and Intigriti.
              </p>
              <p>
                When not researching vulnerabilities or building web apps, I'm deep in CTF competitions,
                studying new attack vectors, or automating security workflows with Python.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-4">
                {[
                  ["🎓", "Alexandria University, CS 2023–Present"],
                  ["📍", "Smouha, Alexandria, Egypt"],
                  ["💬", "Arabic (Native) · English (Fluent)"],
                  ["🎯", "Open to internships & freelance"],
                ].map(([emoji, text]) => (
                  <div key={text} className="flex items-start gap-2 text-sm">
                    <span>{emoji}</span>
                    <span className="text-muted-foreground">{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-5 space-y-4"
            >
              {/* Terminal block */}
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-black/20">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="ml-2 text-xs text-muted-foreground font-mono">terminal</span>
                </div>
                <div className="p-4 font-mono text-sm space-y-2">
                  <div className="flex gap-2"><span className="text-green-500">❯</span><span className="text-foreground">whoami</span></div>
                  <div className="text-muted-foreground pl-4">mostafa-karam</div>
                  <div className="flex gap-2 mt-2"><span className="text-green-500">❯</span><span className="text-foreground">cat skills.txt</span></div>
                  <div className="text-muted-foreground pl-4 space-y-0.5">
                    <div><span className="text-primary">→</span> Web Application Security</div>
                    <div><span className="text-primary">→</span> Full Stack Development</div>
                    <div><span className="text-primary">→</span> Bug Bounty Hunting</div>
                    <div><span className="text-primary">→</span> Penetration Testing</div>
                  </div>
                  <div className="flex gap-2 mt-2"><span className="text-green-500">❯</span><span className="text-foreground animate-pulse">_</span></div>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3 flex items-center gap-2">
                  <BookOpen className="w-3 h-3" /> Certifications & Training
                </p>
                <div className="space-y-2">
                  {certifications.map((cert, i) => <CertCard key={cert.name} cert={cert} index={i} />)}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="py-24 bg-secondary/5 border-y border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/3 blur-[120px] rounded-full pointer-events-none" />
        <div className="container px-6 max-w-[1100px] mx-auto relative z-10">
          <SectionHeading title="Technical Arsenal" subtitle="Skills & Tools" number="02" align="center" />

          {/* Tab selector */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {Object.keys(skills).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSkillTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-mono transition-all ${
                  activeSkillTab === tab
                    ? "bg-primary text-black font-bold"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSkillTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto"
            >
              {skills[activeSkillTab as keyof typeof skills].map((skill) => (
                <SkillBar key={skill.name} {...skill} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Bug bounty card */}
          <div className="mt-12 max-w-3xl mx-auto">
            <BugBountySection />
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="py-24">
        <div className="container px-6 max-w-[1100px] mx-auto">
          <SectionHeading title="Professional Journey" subtitle="Experience" number="03" align="center" />
          <div className="max-w-3xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-border to-transparent md:translate-x-[-0.5px] hidden md:block" />

            <div className="space-y-6">
              {experience.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative md:flex md:gap-8 items-start ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Timeline dot */}
                  <div className="hidden md:block absolute left-1/2 top-4 w-3 h-3 rounded-full border-2 border-background z-10 -translate-x-1/2 shadow-[0_0_10px_rgba(74,222,128,0.5)]"
                    style={{ background: job.color }} />

                  <div className={`md:w-1/2 ${index % 2 === 0 ? "md:text-right md:pr-10" : "md:text-left md:pl-10"}`}>
                    <div className="hidden md:block">
                      <span className="text-xs font-mono text-muted-foreground">{job.period}</span>
                      <div className="font-bold text-foreground">{job.company}</div>
                    </div>
                  </div>

                  <div className="md:w-1/2 bg-card border border-border rounded-xl p-5 hover:border-primary/20 transition-all group">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-sm">{job.role}</h3>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono border" style={{ borderColor: `${job.color}40`, color: job.color, background: `${job.color}10` }}>{job.type}</span>
                        </div>
                        <div className="text-xs text-muted-foreground md:hidden">{job.company} · {job.period}</div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">{job.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {job.tags.map(t => (
                        <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-primary/5 text-primary/70">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-24 bg-secondary/5 border-y border-border">
        <div className="container px-6 max-w-[1100px] mx-auto">
          <SectionHeading title="Selected Works" subtitle="Projects" number="04" align="center" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProjects.map((project, index) => (
              <EnhancedProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
          {!showAllProjects && projects.length > 3 && (
            <div className="text-center mt-10">
              <Button
                variant="outline"
                className="border-primary/40 text-primary hover:bg-primary/5 font-mono"
                onClick={() => setShowAllProjects(true)}
              >
                Show All Projects ({projects.length}) <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683311-eac922347aa1?w=1920&q=80')] bg-cover bg-center opacity-[0.03] pointer-events-none" />
        <div className="container px-6 relative z-10 max-w-[1100px] mx-auto">
          <SectionHeading title="Get In Touch" subtitle="Contact" number="05" align="center" />

          <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-10">
            {/* Left info */}
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

            {/* Form */}
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
    </div>
  );
}