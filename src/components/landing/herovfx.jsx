import React, { useState, useEffect } from "react"

import Hero from "./hero"
export default function HeroVFX() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div>
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        {isClient && (
          <svg
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 160 90"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#4338CA" />
              </linearGradient>
              <filter id="goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="1.2" // Reduced the blur for a sharper effect
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 10 -2" // Adjusted values for a quicker transition
                  result="goo"
                />
              </filter>
            </defs>

            <g filter="url(#goo)">
              <path
                d="M-16,0 L176,0 L176,8.7 Q80,8.7 -16,8.7 Z"
                fill="url(#gradient)"
              >
                <animate
                  attributeName="d"
                  values="
                  M-16,0 L176,0 L176,8.7 Q80,8.7 -16,8.7 Z;
                  M-16,0 L176,0 L176,8.7 Q80,8.7 -16,8.7 Z;
                  M-16,0 L176,0 L176,8.7 Q80,8.7 -16,8.7 Z
                "
                  dur="10s"
                  repeatCount="indefinite"
                />
              </path>

              <path
                d="M-16,90 L176,90 L176,85 Q80,85 -16,85 Z"
                fill="url(#gradient)"
              >
                <animate
                  attributeName="d"
                  values="
                  M-16,90 L176,90 L176,85 Q80,85 -16,85 Z;
                  M-16,90 L176,90 L176,85 Q80,85 -16,85 Z;
                  M-16,90 L176,90 L176,85 Q80,85 -16,85 Z
                "
                  dur="8s"
                  repeatCount="indefinite"
                />
              </path>

              {[...Array(5)].map((_, i) => (
                <circle
                  key={i}
                  r={`${Math.random() * (10 - 5) + 5}`}
                  fill="url(#gradient)"
                >
                  <animate
                    attributeName="cx"
                    values="80;76;84;80"
                    dur={`${15 + i * 2}s`}
                    repeatCount="indefinite"
                    calcMode="spline"
                    keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
                  />
                  <animate
                    attributeName="cy"
                    values={i % 2 === 0 ? "-20;120;-20" : "120;-20;120"}
                    dur={`${45 + i * 10}s`}
                    repeatCount="indefinite"
                    calcMode="spline"
                    keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                  />
                  {/* <animate
                    attributeName="r"
                    values="5.4;7.2;5.4"
                    dur={`${5 + i}s`}
                    repeatCount="indefinite"
                    calcMode="spline"
                    keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
                  /> */}
                </circle>
              ))}
            </g>
          </svg>
        )}
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-10">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <Hero />
        </div>
      </div>
    </div>
  )
}
