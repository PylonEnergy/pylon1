/** Display the supplied artwork with its transparent outer margins excluded. */
export default function BrandLogo({ className = "", onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <svg
      viewBox="190 760 1610 505"
      width="222"
      height="70"
      style={{ display: "block", maxWidth: "100%", height: "auto", ...(onDark ? { background: "white", borderRadius: 8, padding: 12 } : {}) }}
      className={className}
      role="img"
      aria-label="Pylon Energy"
      xmlns="http://www.w3.org/2000/svg"
    >
      <image href="/pylon-energy-logo.png" width="2000" height="2000" />
    </svg>
  );
}
