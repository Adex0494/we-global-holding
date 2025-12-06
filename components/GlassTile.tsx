export default function GlassTile({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        bg-glass border border-white/10 
        rounded-2xl shadow-glass 
        p-6
      "
    >
      {children}
    </div>
  );
}
