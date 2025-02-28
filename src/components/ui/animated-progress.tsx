import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
        xl: "h-4",
      },
      variant: {
        default: "",
        success: "bg-green-100",
        warning: "bg-amber-100",
        danger: "bg-red-100",
        info: "bg-blue-100",
      },
      animation: {
        none: "",
        progress: "progress-bar",
        pulse: "animate-pulse",
        shimmer: "animate-shimmer",
        indeterminate:
          "after:absolute after:inset-0 after:w-1/3 after:animate-shimmer after:bg-white/20 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
      animation: "none",
    },
  },
);

const progressIndicatorVariants = cva("h-full w-full flex-1 transition-all", {
  variants: {
    variant: {
      default: "bg-primary",
      success: "bg-green-500",
      warning: "bg-amber-500",
      danger: "bg-red-500",
      info: "bg-blue-500",
    },
    animation: {
      none: "",
      smooth: "transition-[width] duration-500 ease-in-out",
      steps: "transition-[width] duration-500 ease-steps",
      bounce: "transition-[width] duration-500 ease-bounce",
    },
  },
  defaultVariants: {
    variant: "default",
    animation: "none",
  },
});

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value?: number;
  max?: number;
  indicatorVariant?: VariantProps<typeof progressIndicatorVariants>["variant"];
  indicatorAnimation?: VariantProps<
    typeof progressIndicatorVariants
  >["animation"];
}

const AnimatedProgress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value,
      max = 100,
      size,
      variant,
      animation,
      indicatorVariant,
      indicatorAnimation,
      ...props
    },
    ref,
  ) => {
    const percentage =
      value != null ? (Math.min(Math.max(value, 0), max) / max) * 100 : null;

    return (
      <div
        className={cn(
          progressVariants({ size, variant, animation }),
          className,
        )}
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value ?? undefined}
        {...props}
      >
        {percentage != null && (
          <div
            className={cn(
              progressIndicatorVariants({
                variant: indicatorVariant || (variant as any),
                animation: indicatorAnimation,
              }),
            )}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
    );
  },
);
AnimatedProgress.displayName = "AnimatedProgress";

export { AnimatedProgress };
