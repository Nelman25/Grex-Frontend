import { viewport } from "@/lib/motion";
import { motion } from "motion/react";
import logo from "@/assets/Vector.svg";

export default function Footer() {
  /* Footer (MOCK, for filler lang muna ngayon)*/
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewport}
      transition={{ duration: 0.7 }}
      className="mt-40 border-t border-dark-muted"
    >
      <div className="max-w-[1400px] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info (MOCK)*/}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <motion.img src={logo} alt="grex logo" className="w-[24px] h-[36px]" />
              <span className="uppercase font-k2d text-2xl text-dark-text">GREX</span>
            </div>
            <p className="text-dark-subtle text-sm max-w-[250px]">
              All-in-one collaboration platform for teams that achieve more together.
            </p>
          </div>

          {/* Product Links (MOCK)*/}
          <div>
            <h3 className="text-dark-text font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {["Features", "Pricing", "Security", "Integrations", "Changelog"].map((item) => (
                <motion.li key={item} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <a href="#" className="text-dark-subtle hover:text-dark-text transition-colors text-sm">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Company Links (MOCK)*/}
          <div>
            <h3 className="text-dark-text font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {["About Us", "Careers", "Blog", "Press Kit", "Contact"].map((item) => (
                <motion.li key={item} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <a href="#" className="text-dark-subtle hover:text-dark-text transition-colors text-sm">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Resources (MOCK)*/}
          <div>
            <h3 className="text-dark-text font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {["Documentation", "Help Center", "Community", "API Reference", "Status"].map((item) => (
                <motion.li key={item} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <a href="#" className="text-dark-subtle hover:text-dark-text transition-colors text-sm">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section (MOCK)*/}
        <div className="mt-12 pt-8 border-t border-dark-muted flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-dark-subtle text-sm">© {new Date().getFullYear()} Grex. All rights reserved.</p>

          {/* Legal Links (MOCK)*/}
          <div className="flex space-x-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <motion.a
                key={item}
                href="#"
                className="text-dark-subtle hover:text-dark-text transition-colors text-sm"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
