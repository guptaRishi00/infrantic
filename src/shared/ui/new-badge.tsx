export function NewBadge({ label }: { label: string }) {
  return (
    <span className="rounded border border-blue-200 bg-blue-50 px-1 py-px text-[9px] leading-none font-semibold tracking-wide text-blue-600 uppercase">
      {label}
    </span>
  );
}
