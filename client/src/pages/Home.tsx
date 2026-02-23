import { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown, Send, Shield, Server, Lock, Code, Terminal, Share2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import confetti from "canvas-confetti";
import { Link } from "react-scroll";

import { Navbar } from "@/components/Navbar";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { TechStack } from "@/components/TechStack";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useContact } from "@/hooks/use-contact";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";

import profileImg from "@assets/photo_2025-01-26_16-06-16_1771256993035.jpg";

// --- SECTIONS DATA ---
const experience = [
  {
    role: "CIB Summer Program",
    company: "Commercial International Bank (CIB)",
    period: "05/2025 – 09/2025",
    description: "Gained insights into the banking sector, digital transformation, and financial services."
  },
  {
    role: "Full-Stack Developer",
    company: "MAIM Digital Solutions",
    period: "07/2025 – 09/2025",
    description: "Learned and applied core web technologies (HTML, CSS, JS, React.js) and built RESTful APIs using Node.js and Express.js."
  },
  {
    role: "Front-End Web Developer",
    company: "Elevvo Pathways",
    period: "04/2025 – 08/2025",
    description: "Completed an intensive front-end internship focusing on responsive design and modern UI/UX practices."
  },
  {
    role: "Cybersecurity Intern",
    company: "Hack Secure",
    period: "04/2025 – 05/2025",
    description: "Participated in red teaming simulations and secure coding assessments. Conducted vulnerability scans and web penetration testing."
  },
  {
    role: "IT Support Assistant",
    company: "Mega Store",
    period: "06/2024 – 11/2024",
    description: "Installed and configured operating systems, software, and hardware. Ensured device security with updates and patches."
  }
];

const projects = [
  {
    title: "Vulnerability Analyst",
    description: "Conducted web application security testing focusing on SQLi, XSS, and authentication flaws using Burp Suite, OWASP ZAP, and Nmap.",
    tech: ["Burp Suite", "Nmap", "OWASP ZAP", "DEPI"],
    type: "Security Assessment",
    githubUrl: "https://github.com/mostafa-karam",
    demoUrl: "#"
  },
  {
    title: "EventX Studio",
    description: "Production-ready MERN stack application with JWT, RBAC, MFA, and advanced backend security (rate limiting, CSRF protection).",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    type: "Secure MERN Stack",
    githubUrl: "https://github.com/mostafa-karam",
    demoUrl: "#"
  },
  {
    title: "FCDS Platform",
    description: "Academic management platform with role-based access control and interactive dashboards using Chart.js.",
    tech: ["JavaScript", "Chart.js", "Responsive UI"],
    type: "Management Platform",
    githubUrl: "https://github.com/mostafa-karam",
    demoUrl: "#"
  }
];

export default function Home() {
  const contactMutation = useContact();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  
  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertMessage) => {
    contactMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4ade80', '#22c55e', '#16a34a'] // Green shades
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <div className="cyber-grid fixed inset-0 opacity-20 z-0 pointer-events-none" />
      
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section id="hero" className="relative min-h-[70vh] md:h-screen flex items-center justify-center pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-0" />
        
        {/* Decorative elements with parallax */}
        <motion.div 
          style={{ y: y1 }}
          className="hidden sm:block absolute top-1/4 left-6 w-48 h-48 sm:w-64 sm:h-64 bg-primary/5 rounded-full blur-3xl" 
        />
        <motion.div 
          style={{ y: y2 }}
          className="hidden sm:block absolute bottom-1/4 right-6 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/5 rounded-full blur-3xl" 
        />

        <div className="container px-6 z-10 flex flex-col md:flex-row items-center justify-between gap-12 max-w-[1100px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center md:items-start text-center md:text-left flex-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Available for work
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-foreground">
              Hi, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/60">
                Mostafa Karam
              </span>
            </h1>
            
            <div className="text-xl md:text-2xl font-mono text-primary mb-6 h-20 md:h-auto">
              <Typewriter
                options={{
                  strings: [
                    "Cybersecurity Analyst",
                    "Red Teamer",
                    "Full Stack Developer",
                    "Security Researcher"
                  ],
                  autoStart: true,
                  loop: true,
                  cursor: "_",
                  delay: 50,
                  deleteSpeed: 30,
                }}
              />
            </div>
            
            <p className="text-muted-foreground text-lg mb-8 max-w-lg leading-relaxed">
              I bridge the gap between secure infrastructure and scalable web applications. 
              Passionate about offensive security and building resilient systems.
            </p>
            
            <div className="w-full flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="projects" smooth={true} duration={500} offset={-100} className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-primary text-black hover:bg-primary/90 font-bold">
                  View Projects
                </Button>
              </Link>
              <a href="/resume.pdf" download="Mostafa_Karam_Resume.pdf" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary/50 text-primary hover:bg-primary/10">
                  Download CV
                </Button>
              </a>
            </div>

            <div className="mt-12 flex gap-6 text-muted-foreground justify-center md:justify-start">
              <a href="https://github.com/mostafa-karam" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:scale-110 transform duration-200">
                <Github size={24} />
              </a>
              <a href="https://linkedin.com/in/mostafakrm" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:scale-110 transform duration-200">
                <Linkedin size={24} />
              </a>
              <a href="mailto:mostafa.karam.work@gmail.com" className="hover:text-primary transition-colors hover:scale-110 transform duration-200">
                <Mail size={24} />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center relative group flex-1"
          >
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] transition-transform duration-500 group-hover:scale-105 group-hover:shadow-[0_0_50px_rgba(74,222,128,0.3)] rounded-2xl">
              {/* Profile Image with Cyber border */}
              <div className="absolute inset-0 border-2 border-primary/20 rounded-2xl overflow-hidden z-10">
                <img 
                  src={profileImg} 
                  alt="Mostafa Karam" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="absolute -inset-4 border border-primary/20 rounded-2xl animate-[pulse_3s_infinite]" />
              <div className="absolute -inset-2 border border-dashed border-primary/40 rounded-2xl animate-[spin_20s_linear_infinite]" />
              
              {/* Floating icons */}
              <div className="absolute -top-6 -right-6 bg-black/80 p-3 rounded-lg border border-primary/30 backdrop-blur-sm animate-bounce z-20">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-black/80 p-3 rounded-lg border border-primary/30 backdrop-blur-sm animate-bounce delay-700 z-20">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </motion.div>
        </div>

        <Link 
          to="about" 
          smooth={true} 
          duration={800} 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer animate-bounce text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronDown size={24} />
        </Link>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-24 relative bg-secondary/5">
        <div className="container px-6 max-w-[1100px] mx-auto">
          <SectionHeading title="About Me" subtitle="Who I Am" number="01" align="center" />
          
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-7 prose prose-invert max-w-none text-lg text-muted-foreground leading-relaxed text-center md:text-left"
            >
              <p className="mb-6">
                I am a <span className="text-white font-semibold">Cybersecurity-focused Computer Science student</span> based in Alexandria, Egypt. 
                My journey began with a curiosity about how systems break, which naturally evolved into a passion for securing them.
              </p>
              <p className="mb-6">
                With a strong foundation in <span className="text-primary">IT Support and System Administration</span>, I understand the infrastructure 
                that powers modern applications. I specialize in vulnerability assessment, secure coding practices, and endpoint protection.
              </p>
              <p>
                Currently pursuing my Bachelor's at <span className="text-white">Alexandria University</span>, I spend my free time 
                participating in CTFs, researching new vulnerabilities, and building tools to automate security workflows.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-5"
            >
              <div className="bg-card p-6 rounded-xl border border-border relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                <h3 className="text-card-foreground font-bold mb-4 flex items-center gap-2 justify-center md:justify-start">
                  <Terminal className="w-4 h-4 text-primary" />
                  Terminal
                </h3>
                <div className="font-mono text-sm space-y-2 text-left">
                  <div className="flex gap-2">
                    <span className="text-green-500">root@mk-portfolio:~$</span>
                    <span className="text-foreground">cat education.txt</span>
                  </div>
                  <div className="text-muted-foreground pl-4 border-l-2 border-border">
                    Bachelor's in Computer Science<br/>
                    Alexandria University<br/>
                    2023 - Present
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <span className="text-green-500">root@mk-portfolio:~$</span>
                    <span className="text-foreground">ls -la certs/</span>
                  </div>
                  <div className="text-muted-foreground pl-4 border-l-2 border-border">
                    - CCNA Cisco Networking<br/>
                    - Red Teaming & Ethical Hacking<br/>
                    - AWS Cloud Foundations
                  </div>

                  <div className="flex gap-2 mt-4">
                    <span className="text-green-500">root@mk-portfolio:~$</span>
                    <span className="text-foreground animate-pulse">_</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section id="skills" className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="container px-6 relative z-10 max-w-[1100px] mx-auto">
          <SectionHeading title="Technical Arsenal" subtitle="Skills & Tools" number="02" align="center" />
          <TechStack />
        </div>
      </section>

      {/* --- EXPERIENCE SECTION --- */}
      <section id="experience" className="py-24 bg-secondary/5">
        <div className="container px-6 max-w-[1100px] mx-auto">
          <SectionHeading title="Professional Journey" subtitle="Experience" number="03" align="center" />
          
          <div className="max-w-4xl mx-auto space-y-8">
            {experience.map((job, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="md:flex gap-8 items-stretch">
                  <div className="md:w-[200px] md:text-right shrink-0 flex flex-col justify-center">
                    <span className="text-sm font-mono text-primary/80 block mb-1">{job.period}</span>
                    <h4 className="font-bold text-foreground">{job.company}</h4>
                  </div>
                  
                  <div className="hidden md:flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(74,222,128,0.8)] z-10" />
                    <div className="w-px h-full bg-border" />
                  </div>

                  <div className="bg-card p-6 rounded-xl border border-border hover:border-primary/20 transition-all flex-grow mt-4 md:mt-0">
                    <h3 className="text-lg font-bold text-primary mb-2">{job.role}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="py-24 bg-background">
        <div className="container px-6 max-w-[1100px] mx-auto">
          <SectionHeading title="Selected Works" subtitle="Projects" number="04" align="center" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-24 bg-secondary/5 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683311-eac922347aa1?w=1920&q=80')] bg-cover bg-center opacity-5 mix-blend-overlay pointer-events-none" />
        {/* Abstract pattern overlay */}
        
        <div className="container px-6 relative z-10 max-w-[1100px] mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 font-mono">Initialize Connection</h2>
              <p className="text-muted-foreground">Have a project in mind or want to discuss security? Send an encrypted transmission.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-1 space-y-8 text-center md:text-left">
                <div>
                  <h3 className="text-foreground font-bold mb-2">Location</h3>
                  <p className="text-muted-foreground">Smouha, Alexandria, Egypt</p>
                </div>
                <div>
                  <h3 className="text-foreground font-bold mb-2">Contact Info</h3>
                  <p className="text-muted-foreground mb-1">mostafa.karam.work@gmail.com</p>
                  <p className="text-muted-foreground">+20 101 118 7105</p>
                </div>
                <div>
                  <h3 className="text-foreground font-bold mb-2">Social Status</h3>
                  <div className="flex gap-4 justify-center md:justify-start">
                    <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                      <Github size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                      <Linkedin size={18} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-card p-8 rounded-2xl border border-border shadow-2xl">
                    <div className="grid md:grid-cols-2 gap-6 text-left">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} className="bg-background border-border focus:border-primary/50 h-12" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" {...field} className="bg-background border-border focus:border-primary/50 h-12" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="text-left">
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Describe your project or inquiry..." {...field} className="bg-background border-border focus:border-primary/50 min-h-[150px] resize-none" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-primary text-black font-bold hover:bg-primary/90 transition-all"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? "Encrypting & Sending..." : (
                        <span className="flex items-center justify-center gap-2">
                          Send Transmission <Send size={16} />
                        </span>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-background border-t border-border text-center text-sm text-muted-foreground">
        <div className="container px-6 max-w-[1100px] mx-auto">
          <p className="font-mono mb-2 text-foreground">Designed & Built by Mostafa Karam</p>
          <p className="text-xs opacity-50">&copy; {new Date().getFullYear()} All rights reserved. Secure communication established.</p>
        </div>
      </footer>
    </div>
  );
}
