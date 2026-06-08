const muted = "text-[rgba(17,17,17,0.8)]";

export function Footer() {
  return (
    <footer className="flex w-full flex-col gap-4">
      <div className="h-px w-full bg-black/10" />
      <div className="flex flex-col gap-3 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between">
        <p className={`font-light text-base leading-[22px] ${muted} opacity-80`}>
          vahlephic ⓒ 2026
        </p>

        <div className="flex items-center gap-2">
          <a href="https://www.instagram.com/vahlephic/" target="_blank" rel="noopener noreferrer"
             className="bg-[rgba(43,43,43,0.05)] p-[5px] rounded-full transition-transform duration-150 hover:scale-110 active:scale-95">
            <img src="/Instagram Icon.png" alt="Instagram" className="theme-icon size-5 object-contain" />
          </a>
          <a href="https://dribbble.com/vahlephic" target="_blank" rel="noopener noreferrer"
             className="bg-[rgba(43,43,43,0.05)] p-[5px] rounded-full overflow-hidden transition-transform duration-150 hover:scale-110 active:scale-95">
            <img src="/Dribbble Icon.png" alt="Dribbble" className="theme-icon size-5 object-contain" />
          </a>
          <a href="https://www.linkedin.com/in/rizalvahlevi/" target="_blank" rel="noopener noreferrer"
             className="bg-[rgba(43,43,43,0.05)] p-[5px] rounded-full transition-transform duration-150 hover:scale-110 active:scale-95">
            <svg className="theme-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
