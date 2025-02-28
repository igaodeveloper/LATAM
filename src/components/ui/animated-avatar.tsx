import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        xs: "h-6 w-6",
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
        "2xl": "h-20 w-20",
      },
      border: {
        none: "",
        thin: "border",
        medium: "border-2",
        thick: "border-4",
      },
      borderColor: {
        default: "border-border",
        primary: "border-primary",
        secondary: "border-secondary",
        accent: "border-accent",
        muted: "border-muted",
        success: "border-green-500",
        warning: "border-amber-500",
        danger: "border-red-500",
        info: "border-blue-500",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
        spin: "animate-spin",
        float: "animate-float",
        jello: "animate-jello",
        fadeIn: "animate-fade-in",
        zoomIn: "animate-zoom-in",
      },
      hover: {
        none: "",
        scale: "hover:scale-110 transition-transform",
        rotate: "hover:rotate-12 transition-transform",
        glow: "hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-shadow",
        shake: "hover:animate-jello",
      },
    },
    defaultVariants: {
      size: "md",
      border: "none",
      borderColor: "default",
      animation: "none",
      hover: "none",
    },
  },
);

export interface AnimatedAvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {}

const AnimatedAvatar = React.forwardRef<HTMLDivElement, AnimatedAvatarProps>(
  (
    { className, size, border, borderColor, animation, hover, ...props },
    ref,
  ) => (
    <div
      className={cn(
        avatarVariants({ size, border, borderColor, animation, hover }),
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
AnimatedAvatar.displayName = "AnimatedAvatar";

const AnimatedAvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, ...props }, ref) => (
  <img
    className={cn("aspect-square h-full w-full", className)}
    ref={ref}
    {...props}
  />
));
AnimatedAvatarImage.displayName = "AnimatedAvatarImage";

const AnimatedAvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    delayMs?: number;
  }
>(({ className, ...props }, ref) => (
  <div
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className,
    )}
    ref={ref}
    {...props}
  />
));
AnimatedAvatarFallback.displayName = "AnimatedAvatarFallback";

export { AnimatedAvatar, AnimatedAvatarImage, AnimatedAvatarFallback };
