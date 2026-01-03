interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article';
}

export default function GlassCard({
  children,
  className = '',
  as: Component = 'div',
}: GlassCardProps) {
  return (
    <Component className={`glass-card p-8 ${className}`}>
      {children}
    </Component>
  );
}
