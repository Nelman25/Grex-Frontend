import DnDDemo from "@/assets/DnDDemo.mp4";
import { Button } from "@/components/ui/button";
import { WordRotate } from "@/components/ui/word-rotate";
import { fadeInUp, slideInLeft, staggerContainer } from "@/lib/motion";
import { motion } from "motion/react";
import { Link } from "react-router";

export default function Hero({ onScrollToFeatures }: { onScrollToFeatures: () => void }) {
  return (
    <motion.div variants={staggerContainer} className="relative mt-20 mx-auto w-full max-w-[1300px] flex-col space-x-8">
      <motion.div variants={slideInLeft} className="flex-1 flex flex-col space-y-4">
        <motion.h1 className=" mx-auto text-dark-text text-center text-5xl font-semibold" variants={fadeInUp}>
          All-in-One Collaboration for Teams That
          <WordRotate
            className="text-brand-primary"
            words={["Achieve More", "Stay Aligned", "Move Faster", "Innovate Together", "Work Smarter", "Communicate Seamlessly"]}
          />
        </motion.h1>
        <motion.p className="text-dark-subtle text-lg text-center max-w-[800px] mx-auto" variants={fadeInUp}>
          Plan projects, manage tasks, share files, and communicate in real time — all from one web-based platform, with smart
          assistance from @GrexAI.
        </motion.p>
        <motion.div className="flex space-x-4 mx-auto relative z-10" variants={fadeInUp}>
          <motion.div whileTap={{ scale: 0.95 }}>
            <Link to="/auth/signin">
              <Button className="px-8 py-7 text-lg font-normal transition-colors text-light-text bg-gradient-to-b from-brand-primary to-brand-dark border border-brand-light/40 border-t border-t-brand-soft hover:to-brand-primary">
                Get Started for Free
              </Button>
            </Link>
          </motion.div>
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              onClick={onScrollToFeatures}
              className="px-8 py-7 text-lg font-normal transition-colors text-dark-text bg-dark-surface hover:bg-black/60 border border-dark-muted border-t border-t-dark-subtle"
            >
              Explore Features
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-12 flex flex-col items-center"
      >
        <motion.video
          src={DnDDemo}
          autoPlay
          loop
          muted
          playsInline
          className="w-3xl rounded-xl transition-shadow duration-300 shadow-[0_0px_100px_rgba(210,255,40,0.20)] hover:shadow-[0_0px_100px_rgba(210,255,40,0.40)]"
        />
      </motion.div>
    </motion.div>
  );
}
