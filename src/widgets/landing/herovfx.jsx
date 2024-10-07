import React, { useState, useEffect } from "react"
import { Button } from "flowbite-react"
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
            viewBox="0 0 100 100"
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
                  stdDeviation="2"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                  result="goo"
                />
              </filter>
            </defs>

            <g filter="url(#goo)">
              <path
                d="M-10,0 L110,0 L110,8 Q50,8 -10,8 Z"
                fill="url(#gradient)"
              >
                <animate
                  attributeName="d"
                  values="
                  M-10,0 L110,0 L110,9.9 Q50,9.9 -10,9.9 Z;
                  M-10,0 L110,0 L110,9.9 Q50,9.9 -10,9.9 Z;
                  M-10,0 L110,0 L110,9.9 Q50,9.9 -10,9.9 Z
                "
                  dur="10s"
                  repeatCount="indefinite"
                />
              </path>

              <path
                d="M-10,101 L110,101 L110,91 Q50,91 -10,91 Z"
                fill="url(#gradient)"
              >
                <animate
                  attributeName="d"
                  values="
                  M-10,101 L110,101 L110,91 Q50,91 -10,91 Z;
                  M-10,101 L110,101 L110,91 Q50,91 -10,91 Z;
                  M-10,101 L110,101 L110,91 Q50,91 -10,91 Z
                "
                  dur="8s"
                  repeatCount="indefinite"
                />
              </path>

              {[...Array(8)].map((_, i) => (
                <circle key={i} r="6" fill="url(#gradient)">
                  <animate
                    attributeName="cx"
                    values="50;45;55;50"
                    dur={`${10 + i * 2}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cy"
                    values={i % 2 === 0 ? "0;100;0" : "100;0;100"}
                    dur={`${20 + i * 3}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="r"
                    values="6;8;6"
                    dur={`${5 + i}s`}
                    repeatCount="indefinite"
                    calcMode="spline"
                    keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
                  />
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
