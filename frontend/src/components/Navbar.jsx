function HomeIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </svg>
  );
}

export default function Navbar() {
  return (
    <nav className="flex h-14 items-center gap-3 border-b border-[#e5e5e5] bg-white px-4">
      <a
        className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-[#f0f0f0]"
        href="/"
        aria-label="Home"
      >
        <HomeIcon />
      </a>
      <h1 className="text-xl font-semibold">NoteWorks</h1>
    </nav>
  );
}
