export default function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-2 animate-breathe" aria-hidden="true">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="text-rice-300"
      >
        <path
          d="M6 4C6 4 10 2 12 8C14 2 18 4 18 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="9" cy="5" r="1" fill="currentColor" />
        <circle cx="15" cy="5" r="1" fill="currentColor" />
        <path
          d="M8 10L12 14L16 10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-xs font-sans font-light tracking-widest text-rice-400 uppercase">
        scroll
      </span>
    </div>
  )
}
