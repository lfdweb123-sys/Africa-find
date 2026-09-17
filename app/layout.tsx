export const metadata = {
  title: "Africa Find",
  description: "Moteur de recherche IA pour le commerce et les services africains",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
