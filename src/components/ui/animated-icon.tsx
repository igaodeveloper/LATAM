import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const iconVariants = cva("", {
  variants: {
    variant: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      destructive: "text-destructive",
      success: "text-green-500",
      warning: "text-amber-500",
      info: "text-blue-500",
    },
    size: {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-8 w-8",
      "2xl": "h-10 w-10",
      "3xl": "h-12 w-12",
    },
    animation: {
      none: "",
      spin: "animate-spin",
      pulse: "animate-pulse",
      bounce: "animate-bounce",
      float: "animate-float",
      jello: "animate-jello",
      heartbeat: "animate-heartbeat",
      shake: "hover:animate-jello",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    animation: "none",
  },
});

export interface AnimatedIconProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconVariants> {
  icon: React.ReactNode;
}

const AnimatedIcon = React.forwardRef<HTMLDivElement, AnimatedIconProps>(
  ({ className, variant, size, animation, icon, ...props }, ref) => {
    return (
      <div
        className={cn(iconVariants({ variant, size, animation }), className)}
        ref={ref}
        {...props}
      >
        {icon}
      </div>
    );
  },
);
AnimatedIcon.displayName = "AnimatedIcon";

export { AnimatedIcon, iconVariants };
