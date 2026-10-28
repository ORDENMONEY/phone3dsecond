"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="relative z-10 border-t border-white/10 bg-night/60 py-14 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <a href="#accueil" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 text-lg">
                📱
              </span>
              <span className="text-lg font-black">
                Phone<span className="text-gradient">Compte</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm text-slate-400">
              La boutique 3D de smartphones nouvelle génération. Qualité
              premium, prix juste, livraison express.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-300">
              Boutique
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a className="transition hover:text-white" href="#produits">Premium</a></li>
              <li><a className="transition hover:text-white" href="#produits">Milieu de gamme</a></li>
              <li><a className="transition hover:text-white" href="#produits">Entrée de gamme</a></li>
              <li><a className="transition hover:text-white" href="#produits">Accessoires</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-300">
              Aide
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a className="transition hover:text-white" href="#">Suivi de commande</a></li>
              <li><a className="transition hover:text-white" href="#">Retours &amp; garantie</a></li>
              <li><a className="transition hover:text-white" href="#">Paiement 4x</a></li>
              <li><a className="transition hover:text-white" href="#">Nous contacter</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-300">
              Newsletter
            </h4>
            <p className="mb-4 text-sm text-slate-400">
              Recevez les nouveautés et promos en avant-première.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2"
            >
              <input
                type="email"
                required
                placeholder="votre@email.com"
                className="glass min-w-0 flex-1 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-violet-400/60 focus:outline-none"
              />
              <button className="btn-primary !rounded-full !px-5 !py-2.5 text-sm">
                OK
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
          <span>© 2026 PhoneCompte — Tous droits réservés.</span>
          <span>Conçu avec 💜 · Site 3D immersif</span>
        </div>
      </div>
    </motion.footer>
  );
}