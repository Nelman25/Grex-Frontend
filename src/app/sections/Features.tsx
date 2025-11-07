import { FEATURE_CARDS } from "@/constants";
import { pulseGlow, viewport } from "@/lib/motion";
import { motion } from "motion/react";

export default function Features({ ref }: { ref: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div>
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
          className="absolute -top-30 size-[400px] rounded-full bg-brand-primary opacity-20 blur-[70px] z-0"
        />
        <h1 className="text-dark-text text-5xl text-center font-semibold">Discover What Grex Can Do</h1>
        <p className="text-dark-subtle text-center text-xl">
          All the tools you need to plan, collaborate, and keep your team moving forward.
        </p>
      </motion.div>

      {/* Features Grid */}
      <div ref={ref} className="max-w-[800px] mx-auto flex flex-col justify-center gap-4 mt-32 font-inter">
        {FEATURE_CARDS.map((feature, index) => (
          <motion.section
            id="features"
            key={feature.description}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{
              scale: 1.02,
              y: -5,
              transition: { type: "spring", stiffness: 300 },
            }}
            className="bg-dark-surface/60 rounded border border-dark-muted p-8 cursor-pointer"
          >
            <motion.div className="size-14 rounded bg-brand-dark p-4 mb-4" transition={{ duration: 0.5 }}>
              <feature.icon className="size-6 text-brand-light" />
            </motion.div>
            <h2 className="text-dark-text text-xl font-medium">{feature.title}</h2>
            <p className="text-dark-subtle">{feature.description}</p>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
