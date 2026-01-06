export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0B0E1A] via-[#0F1430] to-[#06080F]">
      {children}
    </main>
  );
}

