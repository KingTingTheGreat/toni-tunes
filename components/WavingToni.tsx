"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function WavingToni() {
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="flex p-4" onClick={() => setInfinite(true)}>
      <div style={{ width: 200, height: 200 }} className="md:hidden"></div>
      <Image src="/toni.svg" alt="Mr.Toni" width={180} height={180} />
      <motion.svg
        key={infinite ? "infinite" : "once"}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="15 0 25 40"
        width="130"
        height="130"
        style={{ originX: "30%", originY: "80%" }}
        initial={{ x: -50, y: 30 }}
        animate={{ rotate: [50, 10, 50, 10, 50] }}
        transition={{
          duration: 1.5,
          repeat: infinite ? Infinity : 2,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        <path
          d="M20 10 C22 5, 30 5, 32 10 L32 30 C30 35, 22 35, 20 30 Z"
          fill="#7B371A"
        />
      </motion.svg>
    </div>
  );
}
