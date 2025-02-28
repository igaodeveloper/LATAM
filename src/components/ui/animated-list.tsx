import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const listVariants = cva("", {
  variants: {
    variant: {
      default: "",
      separated: "divide-y",
      bordered: "border rounded-md overflow-hidden",
      cards: "space-y-4",
      grid: "grid gap-4",
    },
    animation: {
      none: "",
      fadeIn: "",
      slideInLeft: "",
      slideInRight: "",
      slideInUp: "",
      slideInDown: "",
      staggered: "",
    },
    itemAnimation: {
      none: "",
      fadeIn: "animate-fade-in",
      slideInLeft: "animate-slide-in-left",
      slideInRight: "animate-slide-in-right",
      slideInUp: "animate-slide-in-up",
      slideInDown: "animate-slide-in-down",
      zoomIn: "animate-zoom-in",
      flipInX: "animate-flip-in-x",
      flipInY: "animate-flip-in-y",
    },
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    },
    hover: {
      none: "",
      highlight: "[&>*:hover]:bg-muted/50",
      scale: "[&>*:hover]:scale-[1.02] [&>*]:transition-transform",
      lift: "[&>*:hover]:translate-y-[-2px] [&>*:hover]:shadow-md [&>*]:transition-all",
    },
  },
  defaultVariants: {
    variant: "default",
    animation: "none",
    itemAnimation: "none",
    hover: "none",
  },
});

export interface AnimatedListProps
  extends React.HTMLAttributes<HTMLUListElement>,
    VariantProps<typeof listVariants> {}

const AnimatedList = React.forwardRef<HTMLUListElement, AnimatedListProps>(
  (
    { className, variant, animation, itemAnimation, columns, hover, ...props },
    ref,
  ) => {
    // Apply staggered animation class to parent if staggered animation is selected
    const containerClass = animation === "staggered" ? "stagger-container" : "";

    // Apply item animation class to children
    const childrenWithAnimation = React.Children.map(
      props.children,
      (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            className: cn(
              child.props.className,
              itemAnimation,
              animation === "staggered" ? "stagger-item" : "",
            ),
            style: {
              ...child.props.style,
              animationDelay:
                animation === "staggered" ? `${index * 0.1}s` : undefined,
            },
          });
        }
        return child;
      },
    );

    return (
      <ul
        className={cn(
          listVariants({ variant, animation, itemAnimation, columns, hover }),
          containerClass,
          className,
        )}
        ref={ref}
        {...props}
      >
        {childrenWithAnimation}
      </ul>
    );
  },
);
AnimatedList.displayName = "AnimatedList";

export { AnimatedList, listVariants };
