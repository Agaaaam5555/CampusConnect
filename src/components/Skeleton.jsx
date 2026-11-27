export default function Skeleton({ count = 4, className = "h-28" }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2" aria-busy="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`animate-pulse rounded-2xl bg-surface2 ${className}`} />
      ))}
    </div>
  );
}
