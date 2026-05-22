const SkillbridgeLogo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <svg
      width="500"
      height="500"
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g transform="translate(100, 150) scale(1.0)">
        <path d="M 50 150 Q 80 50 150 50 L 160 80 Q 100 80 80 150 Z" fill="currentColor" />
        <path d="M 170 50 Q 240 50 260 100 L 230 110 Q 210 80 160 80 Z" fill="currentColor" />
        <path d="M 270 100 L 320 50 L 320 90 L 350 90 L 350 120 L 320 120 L 320 160 Z" fill="currentColor" />
        <text x="175" y="250" fontFamily="Arial, sans-serif" fontSize="40" fontWeight="bold" fill="currentColor" textAnchor="middle">
          SkillBridge
        </text>
      </g>
    </svg>
  );
};

export default SkillbridgeLogo;
