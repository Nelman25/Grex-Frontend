import planAndOrganizeHero from "@/assets/Group 68.svg";
import collaborateHero from "@/assets/Group 69.svg";
import getStartedHero from "@/assets/Group 70.svg";
import planIcon from "@/assets/Group 73.svg";
import collabIcon from "@/assets/Group.svg";
import team from "@/assets/team-add-svgrepo-com.svg";
import { fadeInUp, pulseGlow, staggerContainer, viewport } from "@/lib/motion";
import { motion } from "motion/react";

export default function ProcessFlow() {
  return (
    <div>
      <motion.div
        variants={fadeInUp}
      className="relative flex flex-col space-y-4 items-center justify-center max-w-[690px] mx-auto mt-72"
      >
        <motion.div
          variants={pulseGlow}
          initial="initial"
          animate="pulse"
          className="absolute -top-30 size-[400px] rounded-full bg-brand-primary opacity-20 blur-[70px] z-0"
        />
        <h1 className="text-dark-text text-5xl text-center font-semibold">Everything Your Team Needs, All in One Place</h1>
        <p className="text-dark-subtle text-center text-xl">
          From organizing tasks to tracking progress, Grex keeps your team aligned and productive.
        </p>
      </motion.div>

      {/* Process Flow Section */}
      <motion.div variants={staggerContainer} className="flex justify-center space-x-4 mt-40 max-w-[1400px] mx-auto">
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col items-end pt-52">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ duration: 0.7 }}
              className="mb-4"
            >
              <h2 className="text-end font-semibold text-2xl text-dark-text">Kickstart Your Next Project with Grex</h2>
              <p className="text-end text-lg text-dark-subtle">
                Create a new workspace or import an existing project into Grex — and start collaborating instantly.
              </p>
            </motion.div>
            <motion.img
              src={getStartedHero}
              className="w-[600px]"
              alt="Get started hero"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>

          <div className="flex flex-col items-end">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ duration: 0.7 }}
              className="mb-4"
            >
              <h2 className="text-end font-semibold text-2xl text-dark-text">Stay Connected, Work as One</h2>
              <p className="text-end text-lg text-dark-subtle">
                Chat, share files, and track progress in real time—stay connected and productive with your team, wherever you are.
              </p>
            </motion.div>
            <motion.img
              src={collaborateHero}
              className="w-[600px]"
              alt="Collaborate hero"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
        </div>

        {/* Center Timeline */}
        <motion.div className="flex flex-col justify-center items-center mx-auto">
          {/* Get Started Circle */}
          <motion.div
            className="size-60 bg-blue-800/20 rounded-full flex items-center justify-center mt-1"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewport}
            transition={{ duration: 0.6 }}
          >
            <motion.div className="size-42 bg-blue-800/60 rounded-full flex flex-col space-y-2 items-center py-7">
              <motion.img src={team} alt="team icon" className="size-16" transition={{ duration: 0.5 }} />
              <span className="text-blue-400 font-semibold text-center text-lg">Get Started</span>
            </motion.div>
          </motion.div>
          <motion.div
            className="w-0.5 h-40 bg-blue-600 blur-[4px] mt-1 origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={viewport}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          />
          <motion.div
            className="size-10 rounded-full bg-gray-800 border border-blue-800"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewport}
            transition={{ duration: 0.4, delay: 0.5 }}
            whileHover={{ scale: 1.2 }}
          />
          <motion.div
            className="w-0.5 h-40 bg-blue-600 blur-[4px] mt-1 origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={viewport}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          />

          {/* Plan & Organize Circle */}
          <motion.div
            className="size-60 bg-green-800/20 rounded-full flex items-center justify-center mt-1"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewport}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div className="size-42 bg-green-800/60 rounded-full flex flex-col space-y-2 items-center py-7">
              <motion.img src={planIcon} alt="team icon" className="size-16" transition={{ duration: 0.5 }} />
              <span className="text-green-400 font-semibold text-center text-lg">Plan & Organize</span>
            </motion.div>
          </motion.div>
          <motion.div
            className="w-0.5 h-40 bg-green-600 blur-[4px] mt-1 origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={viewport}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          />
          <motion.div
            className="size-10 rounded-full bg-gray-800 border border-green-800"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewport}
            transition={{ duration: 0.4, delay: 0.7 }}
            whileHover={{ scale: 1.2 }}
          />
          <motion.div
            className="w-0.5 h-40 bg-green-600 blur-[4px] mt-1 origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={viewport}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          />

          {/* Collaborate Circle */}
          <motion.div
            className="size-60 bg-yellow-800/20 rounded-full flex items-center justify-center mt-1"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewport}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div className="size-42 bg-yellow-800/60 rounded-full flex flex-col space-y-2 items-center py-7">
              <motion.img src={collabIcon} alt="team icon" className="size-16" transition={{ duration: 0.5 }} />
              <span className="text-yellow-400 font-semibold text-center text-lg block w-[130px]">Collaborate in real-time</span>
            </motion.div>
          </motion.div>
          <motion.div
            className="w-0.5 h-40 bg-yellow-600 blur-[4px] mt-1 origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={viewport}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          />
          <motion.div
            className="size-10 rounded-full bg-gray-800 border border-yellow-800"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewport}
            transition={{ duration: 0.4, delay: 0.9 }}
            whileHover={{ scale: 1.2 }}
          />
          <motion.div
            className="w-0.5 h-40 bg-yellow-600 blur-[4px] mt-1 origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={viewport}
            transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
          />
        </motion.div>

        <div className="flex-1 flex flex-col justify-center pt-32">
          <div className="flex flex-col items-end">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ duration: 0.7 }}
              className="mb-4"
            >
              <h2 className="font-semibold text-2xl text-dark-text">Plan & Organize Effortlessly</h2>
              <p className="text-lg text-dark-subtle">
                Create a new workspace or import an existing project into Grex — and start collaborating instantly.
              </p>
            </motion.div>
            <motion.img
              src={planAndOrganizeHero}
              className="w-[600px]"
              alt="Plan and organize hero"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
