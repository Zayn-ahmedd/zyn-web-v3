import React from "react";

export function ZynovaxLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 60"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-x-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f43f5e" /> {/* Rose 500 */}
          <stop offset="100%" stopColor="#ec4899" /> {/* Pink 500 */}
        </linearGradient>
      </defs>

      {/* Group slanted to the right by -15 degrees to match the custom italic typeface */}
      <g transform="skewX(-15) translate(20, 0)">
        {/* Z */}
        <path d="M 0 10 H 28 L 6 42 H 28 V 50 H 0 L 22 18 H 0 Z" />

        {/* Y */}
        <path d="M 36 10 L 46 28 V 50 H 54 V 28 L 64 10 H 55 L 50 20 L 45 10 Z" />

        {/* N */}
        <path d="M 72 50 V 10 H 80 L 96 38 V 10 H 104 V 50 H 96 L 80 22 V 50 Z" />

        {/* O */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 116 10 H 140 C 143 10 145 12 145 15 V 45 C 145 48 143 50 140 50 H 116 C 113 50 111 48 111 45 V 15 C 111 12 113 10 116 10 Z M 119 18 V 42 H 137 V 18 Z"
        />

        {/* V */}
        <path d="M 152 10 H 160 L 167 36 L 174 10 H 182 L 171 50 H 163 Z" />

        {/* A */}
        <path d="M 205 10 L 220 50 H 212 L 209 38 H 201 L 198 50 H 190 Z M 205 22 L 202 30 H 208 Z" />

        {/* X with customized split & bright gradient diagonal */}
        <g>
          {/* Main gradient diagonal (left-to-right) */}
          <path d="M 228 10 H 236 L 254 50 H 246 Z" fill="url(#logo-x-gradient)" />
          {/* Top-right diagonal slice */}
          <path d="M 258 10 H 250 L 244.5 22 H 252.5 Z" />
          {/* Bottom-left diagonal slice */}
          <path d="M 238.5 38 H 230.5 L 236 50 H 244 Z" />
        </g>
      </g>
    </svg>
  );
}
