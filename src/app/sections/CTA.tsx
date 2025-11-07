import { Button } from "@/components/ui/button";
import { pulseGlow, viewport } from "@/lib/motion";
import { motion } from "motion/react";
import { Link } from "react-router";

export default function CTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.7 }}
      className="relative flex flex-col space-y-4 items-center justify-center max-w-[690px] mx-auto mt-60"
    >
      <motion.div
        variants={pulseGlow}
        initial="initial"
        animate="pulse"
        className="absolute -top-30 size-96 rounded-full bg-brand-primary opacity-20 blur-[70px] z-0"
      />

      <h1 className="text-dark-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-semibold">
        Ready to supercharge your{" "}
        <motion.span
          className="text-brand-primary"
          animate={{
            backgroundPosition: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background: "linear-gradient(90deg, #3b82f6, #60a5fa, #3b82f6)",
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          team collaboration?
        </motion.span>
      </h1>

      <p className="text-dark-subtle text-center text-base sm:text-lg lg:w-lg">
        Join thousands of teams already using Grex to streamline their projects and boost productivity.
      </p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={viewport}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to="/auth/signup">
          <Button className="relative z-10 bg-brand-primary border border-brand-light border-t border-t-brand-soft  text-light-text text-base lg:px-8 lg:py-6 hover:bg-brand-primary/80 mt-4">
            Start Collaborating Now
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
