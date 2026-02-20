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
      className={`flex flex-col mb-12 ${alignmentClass}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="font-mono text-primary text-sm font-bold">{number}.</span>
        <span className="font-mono text-primary/60 text-sm tracking-widest uppercase">{subtitle}</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white relative">
        {title}
        <div className={`absolute -bottom-4 ${align === "center" ? "left-1/2 -translate-x-1/2" : align === "right" ? "right-0" : "left-0"} w-20 h-1 bg-primary rounded-full`} />
        <div className={`absolute -bottom-4 ${align === "center" ? "left-1/2 -translate-x-1/2" : align === "right" ? "right-0" : "left-0"} w-20 h-1 bg-primary blur-sm`} />
      </h2>
    </motion.div>
  );
}
