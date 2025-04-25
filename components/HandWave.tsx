"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function HandWave() {
  const [infite, setInfinite] = useState(false);

  return (
    <motion.svg
      onClick={() => setInfinite(true)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="200"
      height="200"
      style={{ originX: "30%", originY: "70%" }}
      initial={{ x: -50, y: 30 }}
      animate={{ rotate: [60, 20, 60, 20, 60] }}
      transition={{
        duration: 1.5,
        repeat: infite ? Infinity : 10,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      <path
        d="M20 10 C22 5, 30 5, 32 10 L32 30 C30 35, 22 35, 20 30 Z"
        fill="#7B371A"
      />
    </motion.svg>
  );
}
