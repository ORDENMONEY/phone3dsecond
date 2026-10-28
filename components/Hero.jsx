"use client";

import { motion } from "framer-motion";
import PhoneScene from "./PhoneScene";

const stats = [
  { value: "50K+", label: "Clients satisfaits" },
  { value: "120+", label: "Modèles disponibles" },
  { value: "24H", label: "Livraison express" },
  { value: "2 ans", label: "Garantie incluse" },
];

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Canvas 3D plein écran */}
      <PhoneScene />

      {/* Voile dégradé pour lisibilité du texte */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-night/85 via-night/40 to-transparent max-md:bg-gradient-to-b max-md:from-night/70 max-md:via-night/30 max-md:to-night/70" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-28 pb-20 lg:px-8">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-slate-200"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Nouveau — Série Ultra 5G disponible
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Le futur tient
            <br />
            <span className="text-gradient">dans votre main.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-lg text-slate-300 max-md:text-base"
          >
            Découvrez notre collection de smartphones nouvelle génération :
            écrans 120 Hz, capteurs 200 MP, batterie 5500 mAh et design titane
            premium. Livraison en 24h, garantie 2 ans.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a href="#produits" className="btn-primary">
              🚀 Découvrir la collection
            </a>
            <a href="#features" className="btn-ghost">
              ▶ Voir les caractéristiques
            </a>
          </motion.div>

          {/* Statistiques */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-black text-gradient sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-slate-400 sm:text-sm">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <motion.a
        href="#features"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        aria-label="Défiler vers le bas"
      >
        <div className="flex h-12 w-7 items-start justify-center rounded-full border-2 border-white/25 p-1.5">
          <motion.span
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-2 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400"
          />
        </div>
      </motion.a>
    </section>
  );
}