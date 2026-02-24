import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Menu, X, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "About", to: "about" },
  { name: "Skills", to: "skills" },
  { name: "Experience", to: "experience" },
  { name: "Projects", to: "projects" },
  { name: "Contact", to: "contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border py-4 shadow-lg"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center max-w-[1100px] relative z-[60]">
        <Link
          to="hero"
          smooth={true}
          duration={500}
          className="cursor-pointer group flex items-center gap-2 pointer-events-auto"
        >
          <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all">
            <Terminal className="w-5 h-5 text-primary" />
          </div>
          <span className="font-mono text-xl font-bold tracking-tighter text-foreground group-hover:text-primary transition-colors">
            MK<span className="text-primary">.dev</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 pointer-events-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              smooth={true}
              duration={500}
              offset={-100}
              className="font-mono text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors relative group"
            >
              <span className="text-primary opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-1">
                &gt;
              </span>
              {item.name}
            </Link>
          ))}
          <div className="flex items-center gap-4 ml-4">
            <a
              href="/resume.pdf" 
              download="Mostafa_Karam_Resume.pdf"
              className="px-5 py-2 rounded font-mono text-sm font-bold bg-primary text-black hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(74,222,128,0.4)] transition-all"
            >
              Download CV
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden pointer-events-auto">
          <button
            className="text-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  smooth={true}
                  duration={500}
                  offset={-100}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-mono text-lg text-foreground hover:text-primary cursor-pointer"
                >
                  <span className="text-primary mr-2">0{navItems.indexOf(item) + 1}.</span>
                  {item.name}
                </Link>
              ))}
              <a
                href="#"
                className="mt-4 px-5 py-3 text-center rounded font-mono text-sm font-bold bg-primary text-black"
              >
                Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
