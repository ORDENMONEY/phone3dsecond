import "./globals.css";

export const metadata = {
  title: "PhoneCompte — Smartphones Premium 3D",
  description:
    "Découvrez la nouvelle génération de smartphones. Site 3D immersif avec animations au scroll, conçu pour mobile.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050510",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="bg-night text-white antialiased overflow-x-hidden selection:bg-accent selection:text-white">
        {children}
      </body>
    </html>
  );
}
