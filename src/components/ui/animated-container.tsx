import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const containerVariants = cva("", {
  variants: {
    variant: {
      default: "bg-background",
      card: "bg-card rounded-lg border shadow-sm",
      muted: "bg-muted",
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      accent: "bg-accent text-accent-foreground",
      gradient: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white",
    },
    animation: {
      none: "",
      fadeIn: "animate-fade-in",
      slideInLeft: "animate-slide-in-left",
      slideInRight: "animate-slide-in-right",
      slideInUp: "animate-slide-in-up",
      slideInDown: "animate-slide-in-down",
      zoomIn: "animate-zoom-in",
      flipInX: "animate-flip-in-x",
      flipInY: "animate-flip-in-y",
      rotateIn: "animate-rotate-in",
      float: "animate-float",
      revealLeft: "reveal-left",
      revealRight: "reveal-right",
      revealTop: "reveal-top",
      revealBottom: "reveal-bottom",
    },
    padding: {
      none: "p-0",
      sm: "p-2",
      md: "p-4",
      lg: "p-6",
      xl: "p-8",
    },
    rounded: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
    shadow: {
      none: "shadow-none",
      sm: "shadow-sm",
      md: "shadow",
      lg: "shadow-lg",
      xl: "shadow-xl",
    },
    hover: {
      none: "",
      lift: "hover-lift",
      scale: "hover:scale-105 transition-transform",
      glow: "hover-glow",
      rotate: "hover-rotate",
      shake: "hover-shake",
    },
  },
  defaultVariants: {
    variant: "default",
    animation: "none",
    padding: "none",
    rounded: "none",
    shadow: "none",
    hover: "none",
  },
});

export interface AnimatedContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

const AnimatedContainer = React.forwardRef<
  HTMLDivElement,
  AnimatedContainerProps
>(
  (
    {
      className,
      variant,
      animation,
      padding,
      rounded,
      shadow,
      hover,
      style,
      ...props
    },
    ref,
  ) => {
    // Handle animation delay if provided in style
    const animationDelay = style?.animationDelay
      ? style.animationDelay
      : undefined;

    return (
      <div
        className={cn(
          containerVariants({
            variant,
            animation,
            padding,
            rounded,
            shadow,
            hover,
          }),
          className,
        )}
        ref={ref}
        style={{
          ...style,
          animationDelay,
        }}
        {...props}
      />
    );
  },
);
AnimatedContainer.displayName = "AnimatedContainer";

export { AnimatedContainer, containerVariants };
