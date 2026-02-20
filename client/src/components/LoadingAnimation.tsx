import { motion } from "framer-motion";

export function LoadingAnimation() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      onAnimationStart={() => document.body.style.overflow = "hidden"}
      onAnimationComplete={() => {
        document.body.style.overflow = "auto";
      }}
    >
      <div className="relative">
        <motion.div
          className="w-16 h-16 border-2 border-primary/20 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-0 w-16 h-16 border-t-2 border-primary rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center font-mono text-xs text-primary font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          MK
        </motion.div>
      </div>
    </motion.div>
  );
}
