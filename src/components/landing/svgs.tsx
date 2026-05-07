export const MainPill = () => (
  <svg width="190" height="190" viewBox="0 0 190 190">
    <defs>
      <radialGradient id="pillGrad" cx="40%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#f8f5fc" />
        <stop offset="100%" stopColor="#a090c8" />
      </radialGradient>
    </defs>
    <ellipse cx="95" cy="95" rx="80" ry="80" fill="url(#pillGrad)" />
    <ellipse cx="70" cy="60" rx="35" ry="20" fill="rgba(255,255,255,0.35)" transform="rotate(-20 70 60)" />
    <text x="95" y="105" textAnchor="middle" fontFamily="'Fraunces', serif" fontStyle="italic" fontSize="22" fill="#6a5a8a" opacity="0.7">novo</text>
  </svg>
);

export const SmallPill = ({ size = 40, color = "#c8b8e8" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 40 40">
    <ellipse cx="20" cy="20" rx="16" ry="16" fill={color} opacity="0.6" />
    <ellipse cx="15" cy="14" rx="7" ry="4" fill="rgba(255,255,255,0.4)" transform="rotate(-15 15 14)" />
  </svg>
);

export const InjectionPen = ({ rotation, color, label, delay }: { rotation: number; color: string; label: string; delay: number }) => (
  <div
    className={`animate-pen-${delay}`}
    style={{
      position: 'absolute',
      transformOrigin: '50% 100%',
      transform: `rotate(${rotation}deg)`,
    }}
  >
    <svg width="36" height="200" viewBox="0 0 36 200">
      <defs>
        <linearGradient id={`pen-${label}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0ede8" />
          <stop offset="100%" stopColor="#d8d4cc" />
        </linearGradient>
      </defs>
      <rect x="8" y="30" width="20" height="140" rx="4" fill={`url(#pen-${label})`} />
      <rect x="14" y="0" width="8" height="35" rx="2" fill="#c8c4bc" />
      <rect x="8" y="90" width="20" height="30" rx="2" fill={color} />
      <text x="18" y="109" textAnchor="middle" fontSize="7" fill="white" fontFamily="'DM Sans', sans-serif" fontWeight="500">{label}</text>
      <rect x="10" y="170" width="16" height="20" rx="8" fill="#e0dcd4" />
    </svg>
  </div>
);

export const CheckCircle = ({ filled = true }: { filled?: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" className="shrink-0">
    {filled ? (
      <>
        <circle cx="11" cy="11" r="11" fill="#a8d44a" />
        <path d="M7 11l3 3 5-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ) : (
      <>
        <circle cx="11" cy="11" r="10" fill="none" stroke="#a8d44a" strokeWidth="1.5" />
        <path d="M7 11l3 3 5-5" stroke="#a8d44a" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </>
    )}
  </svg>
);
