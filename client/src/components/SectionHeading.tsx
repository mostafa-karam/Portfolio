import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle: string;
  number: string;
  align?: "left" | "center" | "right";
}

export function SectionHeading({ title, subtitle, number, align = "left" }: SectionHeadingProps) {
  const alignmentClass = 
    align === "center" ? "text-center items-center" : 
    align === "right" ? "text-right items-end" : 
    "text-left items-start";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col mb-14 ${alignmentClass}`}
    >
      <div className="inline-flex items-center gap-2 mb-3 rounded-full border border-primary/20 bg-primary/5 px-3 py-1">
        <span className="font-mono text-primary text-xs font-bold">{number}.</span>
        <span className="font-mono text-primary/70 text-xs tracking-widest uppercase">{subtitle}</span>
      </div>
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white relative">
        {title}
        <div className={`absolute -bottom-5 ${align === "center" ? "left-1/2 -translate-x-1/2" : align === "right" ? "right-0" : "left-0"} h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent`} />
        <div className={`absolute -bottom-5 ${align === "center" ? "left-1/2 -translate-x-1/2" : align === "right" ? "right-0" : "left-0"} h-px w-32 bg-primary blur-sm`} />
      </h2>
    </motion.div>
  );
}
