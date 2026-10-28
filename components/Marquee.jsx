"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const items = [
  "🚀 Livraison 24H",
  "🛡️ Garantie 2 ans",
  "💳 Paiement en 4x sans frais",
  "🔄 Retour gratuit 30 jours",
  "⚡ Charge rapide 120W",
  "📶 5G Ultra",
  "💎 Titane premium",
  "♻️ Emballage recyclable",
];

export default function Marquee() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["-8%", "-16%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-1.5, 1.5]);

  return (
    <section ref={ref} className="relative z-10 -mt-2 py-6">
      <motion.div
        style={{ x, rotate }}
        className="border-y border-white/10 bg-gradient-to-r from-violet-600/15 via-fuchsia-500/10 to-cyan-500/15 py-4 backdrop-blur-sm"
      >
        <div className="flex overflow-hidden">
          <div className="flex min-w-max animate-marquee items-center gap-10 pr-10">
            {[...items, ...items].map((it, i) => (
              <span
                key={i}
                className="whitespace-nowrap text-sm font-semibold text-slate-200"
              >
                {it}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}