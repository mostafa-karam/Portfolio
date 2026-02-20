import { motion } from "framer-motion";
import { 
  SiGnubash, SiMysql, SiExpress,
  SiWireshark, SiBurpsuite, SiKalilinux
} from "react-icons/si";
import { 
  FaPython, FaJava, FaHtml5, FaCss3, FaJs, 
  FaPhp, FaReact, FaNodeJs, FaAws, 
  FaLinux, FaWindows, FaShieldAlt 
} from "react-icons/fa";

const skills = {
  programming: [
    { name: "Python", icon: FaPython, color: "#3776AB" },
    { name: "Java", icon: FaJava, color: "#007396" },
    { name: "Bash", icon: SiGnubash, color: "#4EAA25" },
  ],
  web: [
    { name: "React", icon: FaReact, color: "#61DAFB" },
    { name: "Node.js", icon: FaNodeJs, color: "#339933" },
    { name: "PHP", icon: FaPhp, color: "#777BB4" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
  ],
  security: [
    { name: "Burp Suite", icon: SiBurpsuite, color: "#FF6633" },
    { name: "Wireshark", icon: SiWireshark, color: "#1679A7" },
    { name: "Nmap", icon: FaShieldAlt, color: "#fff" }, 
    { name: "Metasploit", icon: FaShieldAlt, color: "#fff" },
  ],
  infrastructure: [
    { name: "AWS", icon: FaAws, color: "#FF9900" },
    { name: "Linux", icon: FaLinux, color: "#FCC624" },
    { name: "Kali", icon: SiKalilinux, color: "#557C94" },
  ]
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 }
};

export function TechStack() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {Object.entries(skills).map(([category, items], catIndex) => (
        <motion.div 
          key={category}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: catIndex * 0.2 }}
          className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-colors"
        >
          <h3 className="text-xl font-mono font-bold text-primary mb-4 capitalize border-b border-border pb-2">
            // {category}
          </h3>
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-3 sm:grid-cols-4 gap-4"
          >
            {items.map((skill) => (
              <motion.div 
                key={skill.name}
                variants={item}
                className="flex flex-col items-center gap-2 group cursor-default"
              >
                <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center border border-border group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(74,222,128,0.2)] transition-all">
                  <skill.icon className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <span className="text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors text-center">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
