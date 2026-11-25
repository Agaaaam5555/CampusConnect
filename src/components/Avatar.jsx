const palette = ["#4f46e5", "#0e9384", "#e5484d", "#c2410c", "#7c3aed", "#0891b2"];

export default function Avatar({ name = "?", size = 40 }) {
  const i = [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % palette.length;
  const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  return (
    <span
      aria-hidden="true"
      className="inline-flex shrink-0 items-center justify-center rounded-full font-display font-bold text-white"
      style={{ width: size, height: size, background: palette[i], fontSize: size * 0.38 }}
    >
      {initials}
    </span>
  );
}
