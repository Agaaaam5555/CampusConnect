export default function PageHeader({ title, subtitle, children }) {
  return (
    <div className="mb-8 flex flex-wrap items-end gap-3">
      <div>
        <h1 className="text-3xl font-extrabold md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-1 max-w-xl text-muted">{subtitle}</p>}
      </div>
      <div className="ml-auto flex gap-2">{children}</div>
    </div>
  );
}
