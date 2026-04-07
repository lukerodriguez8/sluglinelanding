import { motion } from "motion/react";

interface LogoProps {
  onClick?: () => void;
}

export default function Logo({ onClick }: LogoProps) {
  return (
    <motion.button
      onClick={onClick}
      className="flex items-center justify-center cursor-pointer group border-none bg-transparent p-0"
    >
      <div className="w-8 h-8 md:w-10 md:h-10 bg-white flex items-center justify-center rounded-sm transition-transform duration-300 group-active:scale-95">
        <span className="text-black font-display font-bold text-xl md:text-2xl leading-none">S</span>
      </div>
    </motion.button>
  );
}
