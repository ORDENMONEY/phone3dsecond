"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "📷",
    title: "Photo 200 MP",
    desc: "Capteur principal 200 MP avec zoom optique 10x, mode nuit IA et stabilisation sensor-shift.",
    grad: "from-violet-500/20 to-violet-500/0",
  },
  {
    icon: "⚡",
    title: "Charge 120W",
    desc: "0 à 100 % en 19 minutes. Batterie 5500 mAh qui tient 2 jours en usage intensif.",
    grad: "from-cyan-500/20 to-cyan-500/0",
  },
  {
    icon: "🖥️",
    title: "Écran 120 Hz",
    desc: "AMOLED 6.8\" LTPO, 2600 nits de pics, HDR10+ et protection Gorilla Glass Victus.",
    grad: "from-fuchsia-500/20 to-fuchsia-500/0",
  },
  {
    icon: "🧠",
    title: "Puce IA Ultra",
    desc: "Processeur gravé en 3 nm avec NPU dédié : traduction, retouche et assistant en temps réel.",
    grad: "from-emerald-500/20 to-emerald-500/0",
  },
  {
    icon: "🛡️",
    title: "Titane IP69",
    desc: "Châssis en titane grade 5, résistant à l&apos;eau, la poussière et aux chutes jusqu'à 2 m.",
    grad: "from-amber-500/20 to-amber-500/0",
  },
  {
    icon: "🔐",
    title: "Sécurité FaceID",
    desc: "Détection faciale 3D, coffre d'applications et puce de sécurité certifiée bancaire.",
    grad: "from-sky-500/20 to-sky-500/0",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function Features() {
  return (
    <section id="features" className="relative z-10 py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className="chip mb-4 inline-block">✨ Caractéristiques</span>
          <h2 className="section-title">
            Une technologie <span className="text-gradient">sans compromis</span>
          </h2>
          <p className="mt-4 text-slate-400">
            Chaque détail a été repensé pour vous offrir l&apos;expérience
            mobile la plus fluide jamais créée.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.article
              key={f.title}
              custom={i % 3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              className={`glass card-hover group relative overflow-hidden rounded-3xl p-7 bg-gradient-to-b ${f.grad}`}
            >
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-3xl ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                {f.icon}
              </div>
              <h3 className="mb-2.5 text-xl font-bold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-slate-400">{f.desc}</p>
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-500/10 blur-2xl transition-all duration-500 group-hover:bg-violet-500/25" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}