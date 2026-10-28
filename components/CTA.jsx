"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CTA() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);

  return (
    <section ref={ref} className="relative z-10 overflow-hidden py-24">
      {/* Éléments flottants parallaxe */}
      <motion.span
        style={{ y: y1 }}
        className="pointer-events-none absolute left-[8%] top-10 text-5xl opacity-30 animate-float max-md:hidden"
      >
        📱
      </motion.span>
      <motion.span
        style={{ y: y2 }}
        className="pointer-events-none absolute right-[8%] bottom-10 text-5xl opacity-30 animate-float max-md:hidden"
      >
        🛍️
      </motion.span>

      <motion.div
        style={{ scale }}
        className="mx-auto max-w-5xl px-5 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/10 p-12 text-center max-md:p-8 max-sm:rounded-3xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.35), rgba(217,70,239,0.2), rgba(6,182,212,0.3))",
          }}
        >
          <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-violet-400/20 blur-3xl" />

          <h2 className="section-title mx-auto max-w-2xl">
            Prêt à passer à la <span className="text-gradient">vitesse supérieure</span> ?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-slate-200">
            Commandez aujourd&apos;hui et recevez votre téléphone demain.
            Première coque offerte 🎁 pour toute commande avant ce soir.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a href="#produits" className="btn-primary !px-9 !py-4 text-base">
              🚀 Commander maintenant
            </a>
            <a href="#avis" className="btn-ghost !px-9 !py-4">
              💬 Lire les avis
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-slate-300">
            <span>🚀 Livraison 24h</span>
            <span>🔄 Retour 30j</span>
            <span>🛡️ Garantie 2 ans</span>
            <span>💳 4x sans frais</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}