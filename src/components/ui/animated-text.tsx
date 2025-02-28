import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textVariants = cva("", {
  variants: {
    variant: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      accent: "text-accent-foreground",
      primary: "text-primary",
      secondary: "text-secondary",
      gradient:
        "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    animation: {
      none: "",
      fadeIn: "animate-fade-in",
      slideInLeft: "animate-slide-in-left",
      slideInRight: "animate-slide-in-right",
      slideInUp: "animate-slide-in-up",
      slideInDown: "animate-slide-in-down",
      typing: "typing",
      gradient: "gradient-text",
      pulse: "animate-pulse",
      jello: "animate-jello",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    weight: "normal",
    animation: "none",
  },
});

export interface AnimatedTextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {}

const AnimatedText = React.forwardRef<HTMLParagraphElement, AnimatedTextProps>(
  ({ className, variant, size, weight, animation, ...props }, ref) => {
    return (
      <p
        className={cn(
          textVariants({ variant, size, weight, animation }),
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
AnimatedText.displayName = "AnimatedText";

export { AnimatedText, textVariants };
