import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipRoot = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    animation?: "none" | "fade" | "slide" | "zoom" | "flip" | "scale";
  }
>(({ className, animation = "none", sideOffset = 4, ...props }, ref) => {
  const animationClass = {
    none: "",
    fade: "animate-fade-in",
    slide:
      "data-[side=top]:animate-slide-in-down data-[side=bottom]:animate-slide-in-up data-[side=left]:animate-slide-in-right data-[side=right]:animate-slide-in-left",
    zoom: "animate-zoom-in",
    flip: "data-[side=top]:animate-flip-in-x data-[side=bottom]:animate-flip-in-x data-[side=left]:animate-flip-in-y data-[side=right]:animate-flip-in-y",
    scale: "animate-scale-in",
  }[animation];

  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md",
        animationClass,
        className,
      )}
      {...props}
    />
  );
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

const AnimatedTooltip = ({
  children,
  content,
  animation = "fade",
  delayDuration = 300,
  ...props
}: {
  children: React.ReactNode;
  content: React.ReactNode;
  animation?: "none" | "fade" | "slide" | "zoom" | "flip" | "scale";
  delayDuration?: number;
} & React.ComponentPropsWithoutRef<typeof TooltipContent>) => {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <TooltipRoot>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent animation={animation} {...props}>
          {content}
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
};

export {
  AnimatedTooltip,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
};
