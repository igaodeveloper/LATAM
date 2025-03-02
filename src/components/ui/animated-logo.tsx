import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "default" | "white";
}

const AnimatedLogo = ({
  className,
  size = "md",
  color = "default",
}: AnimatedLogoProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const colorMap = {
    default: "text-blue-700",
    white: "text-white",
  };

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Animation for the logo
    const paths = svg.querySelectorAll("path");

    // Reset animations
    paths.forEach((path) => {
      path.style.transform = "scale(1)";
      path.style.opacity = "1";
    });

    // Apply animations
    const animateLogo = () => {
      // Pulse animation for the main shape (blue background)
      paths[0].animate(
        [
          { transform: "scale(1)", opacity: 1 },
          { transform: "scale(1.05)", opacity: 0.9 },
          { transform: "scale(1)", opacity: 1 },
        ],
        {
          duration: 2000,
          iterations: Infinity,
        },
      );

      // Rotate and scale animation for the red shape
      if (paths[1]) {
        paths[1].animate(
          [
            { transform: "rotate(0deg) scale(1)" },
            { transform: "rotate(5deg) scale(1.02)" },
            { transform: "rotate(0deg) scale(1)" },
            { transform: "rotate(-5deg) scale(0.98)" },
            { transform: "rotate(0deg) scale(1)" },
          ],
          {
            duration: 5000,
            iterations: Infinity,
            easing: "ease-in-out",
          },
        );
      }

      // Shine effect for the white letters
      if (paths[2]) {
        paths[2].animate(
          [
            { opacity: 1, filter: "brightness(1)" },
            { opacity: 1, filter: "brightness(1.5)" },
            { opacity: 1, filter: "brightness(1)" },
          ],
          {
            duration: 3000,
            iterations: Infinity,
            delay: 1000,
          },
        );
      }
    };

    animateLogo();

    return () => {
      // Cleanup animations if needed
      paths.forEach((path) => {
        const animations = path.getAnimations();
        animations.forEach((animation) => animation.cancel());
      });
    };
  }, []);

  return (
    <div className={cn("relative", className)}>
      <svg
        ref={svgRef}
        className={cn(
          sizeMap[size],
          colorMap[color],
          "transition-all duration-300 filter drop-shadow-md",
        )}
        viewBox="0 0 200 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* LATAM Logo - Enhanced for animation */}
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0032A0" />
            <stop offset="100%" stopColor="#0050FF" />
          </linearGradient>
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E30613" />
            <stop offset="100%" stopColor="#FF3B4E" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background */}
        <path
          d="M20 10 H180 V40 H20 Z"
          fill="url(#blueGradient)"
          className="transition-all duration-300"
        />

        {/* Red shape */}
        <path
          d="M40 15 H160 V35 H40 Z"
          fill="url(#redGradient)"
          className="transition-all duration-300"
        />

        {/* LATAM text */}
        <path
          d="M50 20 H70 V30 H50 Z M80 20 H100 V30 H80 Z M110 20 H130 V30 H110 Z M140 20 H150 V30 H140 Z"
          fill="white"
          filter="url(#glow)"
          className="transition-all duration-300"
        />
      </svg>
    </div>
  );
};

export { AnimatedLogo };
