const PATHS = {
  home: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
  pot: <path d="M4 11h16v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z M2 11h2 M20 11h2 M9 7c0-1.5 1-2 1-3 M14 7c0-1.5 1-2 1-3" />,
  history: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></>,
  basket: <path d="M5 9h14l-1.5 10a2 2 0 0 1-2 1.7h-7a2 2 0 0 1-2-1.7z M9 9l3-5 3 5" />,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c0-3.5 3-5.5 6.5-5.5S15.5 16.5 15.5 20 M16 4.5a3.5 3.5 0 0 1 0 7 M18 14.8c2 .7 3.5 2.3 3.5 5.2" /></>,
  logout: <path d="M9 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4 M16 8l4 4-4 4 M20 12H9" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  eyeoff: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><path d="M3 3l18 18" /></>,
  trash: <path d="M4 7h16 M9 7V4h6v3 M6 7l1 13h10l1-13" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  arrowleft: <path d="M19 12H5 M11 6l-6 6 6 6" />,
  alert: <><circle cx="12" cy="12" r="9" /><path d="M12 8v5 M12 16.5v.5" /></>,
}

export default function Icon({ name, size = 20 }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" focusable="false"
    >
      {PATHS[name]}
    </svg>
  )
}
