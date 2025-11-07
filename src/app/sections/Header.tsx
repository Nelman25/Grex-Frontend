import logo from "@/assets/Vector.svg";
import { Button } from "@/components/ui/button";
import { itemVariants } from "@/lib/motion";
import { motion } from "motion/react";
import { Link } from "react-router";

export default function Header() {
  return (
    <motion.header variants={itemVariants} className="p-4 flex justify-between">
      <div className="flex space-x-2 items-center">
        <motion.img
          src={logo}
          alt="grex logo"
          className="w-[24px] h-[32px]"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <span className="uppercase font-medium text-2xl text-dark-text">GREX</span>
      </div>

      <div className="flex space-x-4">
        <Link to="/auth/signin">
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button className="text-xs md:text-sm text-dark-text bg-dark-surface hover:bg-black/60 border border-dark-muted border-t border-t-dark-subtle">
              Log in
            </Button>
          </motion.div>
        </Link>

        <Link to="/auth/signup">
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button className="text-xs md:text-sm text-light-text bg-gradient-to-b from-brand-primary to-brand-dark border border-brand-light/60 border-t border-t-brand-soft hover:to-brand-primary">
              Sign up
            </Button>
          </motion.div>
        </Link>
      </div>
    </motion.header>
  );
}
