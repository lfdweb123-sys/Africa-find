export default function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 480 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustration d'un réseau de recherche"
    >
      <circle cx="240" cy="180" r="150" stroke="#1f7a72" strokeOpacity="0.18" strokeWidth="1.5" />
      <circle cx="240" cy="180" r="108" stroke="#1f7a72" strokeOpacity="0.28" strokeWidth="1.5" />
      <circle cx="240" cy="180" r="66" stroke="#1f7a72" strokeOpacity="0.4" strokeWidth="1.5" />

      <g stroke="#10182b" strokeOpacity="0.35" strokeWidth="1.4">
        <line x1="240" y1="180" x2="118" y2="96" />
        <line x1="240" y1="180" x2="358" y2="120" />
        <line x1="240" y1="180" x2="356" y2="248" />
        <line x1="240" y1="180" x2="150" y2="272" />
        <line x1="240" y1="180" x2="96" y2="196" />
      </g>

      <circle cx="240" cy="180" r="10" fill="#10182b" />

      <circle cx="118" cy="96" r="7" fill="#d99a2b" />
      <circle cx="358" cy="120" r="7" fill="#1f7a72" />
      <circle cx="356" cy="248" r="7" fill="#1f7a72" />
      <circle cx="150" cy="272" r="7" fill="#d99a2b" />
      <circle cx="96" cy="196" r="7" fill="#1f7a72" />

      <g stroke="#10182b" strokeWidth="2.5" strokeLinecap="round">
        <line x1="358" y1="70" x2="382" y2="94" />
        <circle cx="342" cy="54" r="20" stroke="#10182b" strokeWidth="2.5" fill="#eceee6" />
      </g>
    </svg>
  );
}
