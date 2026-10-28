"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const phones = [
  {
    id: 1,
    name: "Ultra 5G Pro",
    cat: "premium",
    price: "899 900 F",
    oldPrice: "1 049 900 F",
    badge: "🔥 Best-seller",
    screen: "linear-gradient(150deg,#3b0764,#0e7490)",
    specs: ["200 MP", "12/256 Go", "120 Hz", "5500 mAh"],
  },
  {
    id: 2,
    name: "Ultra 5G",
    cat: "premium",
    price: "649 900 F",
    oldPrice: "749 900 F",
    badge: "✨ Nouveau",
    screen: "linear-gradient(150deg,#581c87,#155e75)",
    specs: ["108 MP", "8/128 Go", "120 Hz", "5000 mAh"],
  },
  {
    id: 3,
    name: "Neo Lite",
    cat: "milieu",
    price: "349 900 F",
    oldPrice: "419 900 F",
    badge: "💰 Bon plan",
    screen: "linear-gradient(150deg,#7e22ce,#0e7490)",
    specs: ["64 MP", "6/128 Go", "90 Hz", "4800 mAh"],
  },
  {
    id: 4,
    name: "Neo Air",
    cat: "milieu",
    price: "279 900 F",
    oldPrice: null,
    badge: null,
    screen: "linear-gradient(150deg,#86198f,#1e40af)",
    specs: ["50 MP", "4/64 Go", "90 Hz", "4500 mAh"],
  },
  {
    id: 5,
    name: "Mini Go",
    cat: "entree",
    price: "129 900 F",
    oldPrice: "159 900 F",
    badge: "🎯 Entrée de gamme",
    screen: "linear-gradient(150deg,#4c1d95,#312e81)",
    specs: ["13 MP", "3/32 Go", "60 Hz", "4000 mAh"],
  },
  {
    id: 6,
    name: "Mini Go+",
    cat: "entree",
    price: "169 900 F",
    oldPrice: null,
    badge: null,
    screen: "linear-gradient(150deg,#5b21b6,#1e3a8a)",
    specs: ["48 MP", "4/64 Go", "60 Hz", "4200 mAh"],
  },
];

const filters = [
  { key: "tous", label: "Tous" },
  { key: "premium", label: "Premium" },
  { key: "milieu", label: "Milieu de gamme" },
  { key: "entree", label: "Entrée de gamme" },
];

export default function Products() {
  const [cat, setCat] = useState("tous");
  const visible = phones.filter((p) => cat === "tous" || p.cat === cat);

  const addToCart = (name) => {
    window.dispatchEvent(new CustomEvent("phonecompte:add-to-cart"));
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(30);
    }
  };

  return (
    <section id="produits" className="relative z-10 py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <span className="chip mb-4 inline-block">🛍️ Boutique</span>
          <h2 className="section-title">
            Choisissez votre <span className="text-gradient">compagnon</span>
          </h2>
          <p className="mt-4 text-slate-400">
            Du haut de gamme à l&apos;entrée de gamme, il y a un PhoneCompte
            pour chaque budget.
          </p>
        </motion.div>

        {/* Filtres */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-12 flex flex-wrap justify-center gap-2.5"
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setCat(f.key)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                cat === f.key
                  ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-glow scale-105"
                  : "glass text-slate-300 hover:text-white hover:border-white/30"
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Grille produits */}
        <motion.div layout className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.article
                layout
                key={p.id}
                initial={{ opacity: 0, scale: 0.85, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: -30 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="product-card glass group relative overflow-hidden rounded-3xl p-7"
                style={{ transformStyle: "preserve-3d", perspective: "800px" }}
              >
                {p.badge && (
                  <span className="absolute left-5 top-5 z-10 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-3 py-1 text-[11px] font-bold shadow-glow">
                    {p.badge}
                  </span>
                )}

                {/* Mockup téléphone en CSS */}
                <div className="relative mx-auto mb-7 mt-6 flex justify-center">
                  <div className="css-phone">
                    <div className="notch" />
                    <div className="screen" style={{ background: p.screen }}>
                      <span className="text-lg font-black tracking-tight text-white/90 drop-shadow">
                        {p.name}
                      </span>
                      <span className="mt-1.5 text-[9px] font-semibold uppercase tracking-widest text-white/60">
                        PhoneCompte
                      </span>
                    </div>
                  </div>
                  {/* Reflet sous le téléphone */}
                  <div className="absolute -bottom-5 left-1/2 h-3 w-28 -translate-x-1/2 rounded-full bg-violet-500/30 blur-lg transition-all duration-500 group-hover:w-36 group-hover:bg-violet-400/50" />
                </div>

                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold">{p.name}</h3>
                  <div className="text-right">
                    <div className="text-lg font-black text-gradient">
                      {p.price}
                    </div>
                    {p.oldPrice && (
                      <div className="text-xs text-slate-500 line-through">
                        {p.oldPrice}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-6 flex flex-wrap gap-2">
                  {p.specs.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => addToCart(p.name)}
                  className="btn-primary w-full !py-3 text-sm"
                >
                  🛒 Ajouter au panier
                </button>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center text-sm text-slate-500"
        >
          💳 Paiement mobile accepté — MTN MoMo, Moov Money, Wave &amp; carte
          bancaire
        </motion.p>
      </div>
    </section>
  );
}