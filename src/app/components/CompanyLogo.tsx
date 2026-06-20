import React from 'react';

interface CompanyLogoProps {
  name: string;
  className?: string;
}

export function CompanyLogo({ name, className = "w-16 h-16" }: CompanyLogoProps) {
  const getLogoSvg = () => {
    switch (name) {
      case '바디텍메드':
        return (
          <svg viewBox="0 0 236.38 236.37" className="w-full h-full p-1" fill="none">
            {/* Official Boditech CI Symbol */}
            <path d="M197.71 0H45.28A45.16 45.16 0 0013.4 13.14a1.42 1.42 0 00-.12.13 1.79 1.79 0 00-.14.13A45.16 45.16 0 000 45.28v152.43c0 43 45.08 53 82.69 15.4l65-65.42 65.44-65C250.73 45.08 240.68 0 197.71 0z" fill="#005A9C" />
            <path fill="#fff" opacity="0.3" d="M0 150.46v28.77a52.68 52.68 0 0179.49 36.94c1.08-1 2.14-2 3.2-3.06l65-65.42 15.16-15.05A115.72 115.72 0 000 150.46z" />
            <path fill="#fff" opacity="0.3" d="M79.49 216.17A52.68 52.68 0 000 179.23v18.48c0 41.76 42.57 52.41 79.49 18.46z" />
          </svg>
        );
      case '유바이오로직스':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full p-2" fill="none">
            {/* Official EuBiologics CI: Blue shield with green/white arches */}
            <path d="M50 5 C75 5, 90 20, 90 45 C90 70, 70 88, 50 95 C30 88, 10 70, 10 45 C10 20, 25 5, 50 5 Z" fill="#00467F" />
            <path d="M30 40 Q50 30 70 40 Q50 45 30 40" fill="#8DC63F" />
            <path d="M25 53 Q50 43 75 53 Q50 58 25 53" fill="#ffffff" />
            <path d="M35 66 Q50 56 65 66 Q50 71 35 66" fill="#8DC63F" />
          </svg>
        );
      case '휴젤':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full p-1.5" fill="none">
            {/* Official Hugel Navy Circle & white H */}
            <circle cx="50" cy="50" r="45" fill="#0A2540" />
            <rect x="30" y="25" width="10" height="50" rx="2" fill="#ffffff" />
            <rect x="60" y="25" width="10" height="50" rx="2" fill="#ffffff" />
            <rect x="38" y="45" width="24" height="10" rx="1" fill="#ffffff" />
          </svg>
        );
      case '에이프릴바이오':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full p-2" fill="none">
            {/* Official AprilBio Butterfly DNA Helix (Blue/Orange) */}
            <path d="M45 20 C25 20, 20 40, 40 50 C20 60, 25 80, 45 80 C50 65, 45 50, 45 20 Z" fill="#0072CE" />
            <path d="M55 20 C75 20, 80 40, 60 50 C80 60, 75 80, 55 80 C50 65, 55 50, 55 20 Z" fill="#FF8200" />
            <circle cx="50" cy="50" r="6" fill="#ffffff" />
          </svg>
        );
      case '애드바이오텍':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full p-2" fill="none">
            {/* Official AdBiotech Bold Red AD Badge */}
            <rect x="10" y="10" width="80" height="80" rx="18" fill="#E60012" />
            <path d="M25 70 L40 30 H48 L63 70 H55 L50 55 H38 L34 70 Z M44 41 L40 50 H48 Z" fill="#ffffff" />
            <path d="M58 30 H68 C76 30, 80 40, 80 50 C80 60, 76 70, 68 70 H58 Z M66 38 V62 H68 C71 62, 73 58, 73 50 C73 42, 71 38, 68 38 Z" fill="#ffffff" />
          </svg>
        );
      case '파마리서치':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full p-1.5" fill="none">
            {/* Official PharmaResearch sophisticated Forest Green leaf */}
            <path d="M50 10 C75 10, 85 35, 75 65 C65 85, 50 90, 50 90 C50 90, 35 85, 25 65 C15 35, 25 10, 50 10 Z" fill="#005844" />
            <path d="M50 90 C50 70, 60 50, 75 35 M50 70 C40 60, 30 50, 25 40 M50 50 C45 40, 40 30, 35 25" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          </svg>
        );
      case '메디아나':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full p-2" fill="none">
            {/* Official Mediana Crimson ECG Line */}
            <rect x="10" y="10" width="80" height="80" rx="18" fill="#E30613" />
            <path d="M22 50 H33 L40 22 L48 78 L56 38 L62 56 L67 50 H78" stroke="#ffffff" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        );
      case '대한과학':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full p-2" fill="none">
            {/* Official Daihan Scientific Blue hexagon beaker */}
            <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" fill="#004B87" />
            <path d="M36 33 H64 L59 65 A13 13 0 0 1 41 65 Z" stroke="#ffffff" strokeWidth="4.5" strokeLinejoin="round" fill="none" />
            <circle cx="50" cy="55" r="4" fill="#8DC63F" />
          </svg>
        );
      case '제테마':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full p-1.5" fill="none">
            {/* Official Jetema Violet gradient & Gold crown */}
            <circle cx="50" cy="50" r="45" fill="url(#jetemaGrad)" />
            <defs>
              <linearGradient id="jetemaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5B2C84" />
                <stop offset="100%" stopColor="#8F54A0" />
              </linearGradient>
            </defs>
            <path d="M30 65 L36 40 L50 53 L64 40 L70 65 H30 Z M50 25 L45 35 H55 Z" fill="#FFD700" />
          </svg>
        );
      case '대화제약':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full p-1.5" fill="none">
            {/* Official Daehwa Pharm Green/Blue twin leaves */}
            <path d="M47 90 C27 70, 18 45, 45 20 C47 35, 47 65, 47 90 Z" fill="#009A44" />
            <path d="M53 90 C73 70, 82 45, 55 20 C53 35, 53 65, 53 90 Z" fill="#005CA9" />
          </svg>
        );
      case '삼아제약':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full p-1.5" fill="none">
            {/* Official Sama Pharm Rose Circle & Child-Mother Sun */}
            <circle cx="50" cy="50" r="45" fill="#E6007E" />
            <circle cx="50" cy="35" r="10" fill="#ffffff" />
            <path d="M30 75 C30 55, 70 55, 70 75 Z" fill="#ffffff" />
          </svg>
        );
      case '메디안디노스틱':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full p-2" fill="none">
            {/* Official Median Diagnostics Blue veterinary checkmark badge */}
            <rect x="10" y="10" width="80" height="80" rx="18" fill="#00A0E9" />
            <path d="M25 35 V65 H35 V48 L50 63 L65 48 V65 H75 V35 L50 55 Z" fill="#ffffff" />
          </svg>
        );
      case '파마리서치바이오':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full p-1.5" fill="none">
            {/* Official PharmaResearch Bio Green leaf with Orange accent */}
            <path d="M50 10 C75 10, 85 35, 75 65 C65 85, 50 90, 50 90 C50 90, 35 85, 25 65 C15 35, 25 10, 50 10 Z" fill="#005844" />
            <path d="M50 90 C50 70, 60 50, 75 35 M50 70 C40 60, 30 50, 25 40 M50 50 C45 40, 40 30, 35 25" stroke="#FF8200" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          </svg>
        );
      case '바이오프로테크':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full p-1.5" fill="none">
            {/* Official Bioprotech Sky Blue Electrode circular sensor */}
            <circle cx="50" cy="50" r="45" fill="#009FE3" />
            <circle cx="50" cy="50" r="23" stroke="#ffffff" strokeWidth="5.5" fill="none" />
            <path d="M27 50 H73 M50 27 V73" stroke="#ffffff" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full p-2" fill="none">
            {/* Default stylish placeholder */}
            <rect x="10" y="10" width="80" height="80" rx="18" fill="#9CA3AF" />
            <path d="M35 50 H65 M50 35 V65" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" fill="none" />
          </svg>
        );
    }
  };

  return (
    <div className={`rounded-xl border border-gray-200/60 bg-white flex items-center justify-center shadow-sm overflow-hidden ${className}`}>
      {getLogoSvg()}
    </div>
  );
}

export default CompanyLogo;
