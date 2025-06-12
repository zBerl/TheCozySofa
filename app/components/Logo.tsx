interface LogoProps {
  variant?: 'header' | 'footer'
}

export default function Logo({ variant = 'header' }: LogoProps) {
  return (
    <svg 
      viewBox="0 0 400 100" 
      xmlns="http://www.w3.org/2000/svg" 
      className={variant === 'header' ? 'logo-header' : 'logo-footer'}
    >
      <defs>
        {/* Gradient for the sofa */}
        <linearGradient id="sofaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#FF6B6B', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#FF8E8E', stopOpacity: 1 }} />
        </linearGradient>
        
        {/* Gradient for accent elements */}
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#4ECDC4', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#45B7AA', stopOpacity: 1 }} />
        </linearGradient>
        
        {/* Shadow filter */}
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#00000020"/>
        </filter>
      </defs>
      
      {/* Background circle for visual balance */}
      <circle cx="50" cy="50" r="35" fill="url(#accentGradient)" opacity="0.1"/>
      
      {/* Main sofa illustration */}
      <g transform="translate(15, 25)" filter="url(#softShadow)">
        {/* Sofa base */}
        <rect x="0" y="25" width="70" height="25" rx="8" fill="url(#sofaGradient)"/>
        
        {/* Sofa back */}
        <rect x="5" y="10" width="60" height="25" rx="12" fill="url(#sofaGradient)"/>
        
        {/* Left armrest */}
        <rect x="0" y="15" width="12" height="30" rx="6" fill="url(#sofaGradient)"/>
        
        {/* Right armrest */}
        <rect x="58" y="15" width="12" height="30" rx="6" fill="url(#sofaGradient)"/>
        
        {/* Decorative cushions */}
        <circle cx="20" cy="22" r="4" fill="#FFE66D" opacity="0.8"/>
        <circle cx="35" cy="22" r="4" fill="#A8E6CF" opacity="0.8"/>
        <circle cx="50" cy="22" r="4" fill="#FFB3BA" opacity="0.8"/>
        
        {/* Cozy details */}
        <rect x="15" y="35" width="40" height="3" rx="1.5" fill="#FF8E8E" opacity="0.6"/>
        
        {/* Legs */}
        <rect x="8" y="47" width="3" height="8" rx="1.5" fill="#8B4513" opacity="0.7"/>
        <rect x="25" y="47" width="3" height="8" rx="1.5" fill="#8B4513" opacity="0.7"/>
        <rect x="42" y="47" width="3" height="8" rx="1.5" fill="#8B4513" opacity="0.7"/>
        <rect x="59" y="47" width="3" height="8" rx="1.5" fill="#8B4513" opacity="0.7"/>
      </g>
      
      {/* Brand text */}
      <g transform="translate(120, 30)">
        {/* "The" */}
        <text x="0" y="20" fontFamily="'Segoe UI', system-ui, -apple-system, sans-serif" 
              fontSize="16" fontWeight="300" fill="#666666">The</text>
        
        {/* "Cozy" */}
        <text x="35" y="20" fontFamily="'Segoe UI', system-ui, -apple-system, sans-serif" 
              fontSize="24" fontWeight="700" fill="#FF6B6B">Cozy</text>
        
        {/* "Sofa" */}
        <text x="100" y="20" fontFamily="'Segoe UI', system-ui, -apple-system, sans-serif" 
              fontSize="24" fontWeight="700" fill="#4ECDC4">Sofa</text>
        
        {/* Tagline */}
        <text x="0" y="40" fontFamily="'Segoe UI', system-ui, -apple-system, sans-serif" 
              fontSize="10" fontWeight="400" fill="#999999" letterSpacing="1px">
              COMFORT • STYLE • HOME
        </text>
      </g>
      
      {/* Decorative elements */}
      <g opacity="0.3">
        {/* Floating comfort bubbles */}
        <circle cx="320" cy="25" r="2" fill="#FFE66D"/>
        <circle cx="330" cy="20" r="1.5" fill="#A8E6CF"/>
        <circle cx="340" cy="30" r="1" fill="#FFB3BA"/>
        
        {/* Minimalist line accent */}
        <line x1="320" y1="60" x2="360" y2="60" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round"/>
        
        {/* Small decorative dots */}
        <circle cx="325" cy="70" r="1" fill="#FF6B6B"/>
        <circle cx="335" cy="68" r="1" fill="#4ECDC4"/>
        <circle cx="345" cy="72" r="1" fill="#FFE66D"/>
      </g>
      
      {/* Subtle background pattern */}
      <g opacity="0.05">
        <pattern id="dots" patternUnits="userSpaceOnUse" width="20" height="20">
          <circle cx="10" cy="10" r="1" fill="#FF6B6B"/>
        </pattern>
        <rect x="0" y="0" width="400" height="100" fill="url(#dots)"/>
      </g>
    </svg>
  )
} 