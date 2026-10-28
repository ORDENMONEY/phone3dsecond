"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Showcase() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Rotation 3D + zoom pilotés par le scroll
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [25, 0, -25]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [12, -12]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const cards = [
    {
      icon: "🎬",
      title: "Cinéma 8K",
      text: "Filmez comme au cinéma avec le mode Dolby Vision HDR.",
    },
    {
      icon: "🎮",
      title: "Gaming extrême",
      text: "120 fps stables grâce au moteur graphique vapor chamber.",
    },
    {
      icon: "🌍",
      title: "5G Ultra",
      text: "Téléchargez un film 4K en moins de 30 secondes.",
    },
    {
      icon: "🔋",
      title: "Endurance 2 jours",
      text: "5500 mAh + charge intelligente adaptative IA.",
    },
  ];

  return (
    <section ref={ref} className="relative z-10 py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div style={{ perspective: 1200 }}>
          <motion.div
            style={{ rotateY, rotateX, scale }}
            className="glass relative overflow-hidden rounded-[2.5rem] p-10 max-md:p-7 max-sm:rounded-3xl"
          >
            {/* Fond qui glisse au scroll */}
            <motion.div
              style={{ x: bgX }}
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-violet-600/25 via-fuchsia-500/15 to-cyan-500/25"
            />
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-violet-500/25 blur-3xl" />

            <div className="relative">
              <h2 className="section-title mb-3 max-w-xl">
                Pensé pour <span className="text-gradient">l&apos;exceptionnel</span>
              </h2>
              <p className="mb-10 max-w-lg text-slate-300">
                Faites défiler et regardez cette carte pivoter en 3D pendant
                que vous explorez chaque univers.
              </p>

              <div className="grid gap-5 sm:grid-cols-2">
                {cards.map((c, i) => (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: i * 0.12 }}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-night/40 p-5 backdrop-blur-md transition duration-300 hover:border-violet-400/40 hover:bg-night/60"
                  >
                    <span className="text-3xl">{c.icon}</span>
                    <div>
                      <h3 className="font-bold">{c.title}</h3>
                      <p className="mt-1 text-sm text-slate-400">{c.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}