/** Simple line-art Kathputli mark. Replace with the final brand asset when ready. */
export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className="text-brand-800"
      >
        <path d="M11 9l1.5-4 3.5 2.5L19.5 5 21 9" />
        <circle cx="16" cy="12.5" r="3.5" />
        <path d="M12 18h8l1.5 9h-11z" />
        <path d="M12 19.5L7 24M20 19.5l5 4.5" />
      </svg>
      <span className="text-[15px] font-semibold leading-none text-ink">
        Tara
      </span>
    </div>
  );
}
