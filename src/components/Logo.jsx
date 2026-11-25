export default function Logo({ size = 28, invert = false }) {
  return (
    <span className="inline-flex items-center gap-2 font-display text-xl font-extrabold">
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill={invert ? "var(--accent)" : "var(--brand)"} />
        <circle cx="11" cy="16" r="5" fill={invert ? "#0f1b3d" : "var(--accent)"} />
        <circle cx="21" cy="16" r="5" fill="none" stroke={invert ? "#0f1b3d" : "var(--brandfg)"} strokeWidth="2.5" />
      </svg>
      CampusConnect
    </span>
  );
}
