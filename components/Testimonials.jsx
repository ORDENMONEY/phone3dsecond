"use client";

import { motion } from "framer-motion";

const reviews = [
  {
    name: "Aïcha K.",
    city: "Cotonou",
    stars: 5,
    text: "J'ai reçu mon Ultra 5G en moins de 24h ! L'écran est magnifique et la batterie me tient 2 jours entiers. Le service client est top 🙌",
    initials: "AK",
    grad: "from-violet-500 to-fuchsia-500",
  },
  {
    name: "Marc D.",
    city: "Porto-Novo",
    stars: 5,
    text: "Le rapport qualité-prix du Neo Lite est incroyable. Photos superbes, fluide, et le paiement en 4x m'a beaucoup aidé.",
    initials: "MD",
    grad: "from-cyan-500 to-blue-500",
  },
  {
    name: "Fatou B.",
    city: "Parakou",
    stars: 4,
    text: "Commande passée depuis mon téléphone, livrée chez moi à Parakou. Emballage premium et téléphone conforme aux photos 3D du site !",
    initials: "FB",
    grad: "from-emerald-500 to-teal-500",
  },
];

export default function Testimonials() {
  return (
    <section id="avis" className="relative z-10 py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="chip mb-4 inline-block">⭐ Avis clients</span>
          <h2 className="section-title">
            Ils nous font <span className="text-gradient">confiance</span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="text-2xl">⭐⭐⭐⭐⭐</span>
            <span className="font-semibold">4.9/5</span>
            <span className="text-sm text-slate-400">— 12 400 avis</span>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 60, rotate: i === 1 ? 0 : i === 0 ? -3 : 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.15 }}
              whileHover={{ y: -8, rotate: i === 1 ? 0 : i === 0 ? -1.5 : 1.5 }}
              className="glass card-hover relative rounded-3xl p-7"
            >
              <div className="mb-1 text-lg">
                {"⭐".repeat(r.stars)}
                <span className="opacity-25">{"⭐".repeat(5 - r.stars)}</span>
              </div>
              <blockquote className="mb-6 text-sm leading-relaxed text-slate-300">
                « {r.text} »
              </blockquote>
              <figcaption className="flex items-center gap-3.5">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${r.grad} text-sm font-black`}
                >
                  {r.initials}
                </span>
                <div>
                  <div className="text-sm font-bold">{r.name}</div>
                  <div className="text-xs text-slate-500">{r.city} ✓ Achat vérifié</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}