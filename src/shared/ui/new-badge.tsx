export function NewBadge({ label }: { label: string }) {
  return (
    <span className="rounded border border-brand-200 bg-brand-50 px-1 py-px text-[9px] leading-none font-semibold tracking-wide text-brand-700 uppercase">
      {label}
    </span>
  );
}
