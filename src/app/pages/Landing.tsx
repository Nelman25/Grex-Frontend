import { containerVariants } from "@/lib/motion";
import { motion } from "framer-motion";
import { useRef } from "react";

import CTA from "../sections/CTA";
import Features from "../sections/Features";
import Footer from "../sections/Footer";
import Header from "../sections/Header";
import Hero from "../sections/Hero";
import ProcessFlow from "../sections/ProcessFlow";

export default function Landing() {
  const featuresRef = useRef<HTMLDivElement | null>(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-w-screen min-h-screen bg-dark-bg scroll-smooth"
    >
      <Header />
      <Hero onScrollToFeatures={scrollToFeatures} />
      <ProcessFlow />
      <Features ref={featuresRef} />
      <CTA />
      <Footer />
    </motion.div>
  );
}
