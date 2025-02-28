import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    animation?: "none" | "fade" | "slide" | "scale";
  }
>(({ className, animation = "none", ...props }, ref) => {
  const animationClass = {
    none: "",
    fade: "animate-fade-in",
    slide: "animate-slide-in-down",
    scale: "animate-zoom-in",
  }[animation];

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        animationClass,
        className,
      )}
      {...props}
    />
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    activeAnimation?: "none" | "pulse" | "glow" | "scale" | "underline";
  }
>(({ className, activeAnimation = "none", ...props }, ref) => {
  const activeAnimationClass = {
    none: "",
    pulse: "data-[state=active]:animate-pulse",
    glow: "data-[state=active]:shadow-[0_0_10px_rgba(59,130,246,0.5)]",
    scale: "data-[state=active]:scale-105",
    underline:
      "data-[state=active]:after:content-[''] data-[state=active]:after:block data-[state=active]:after:w-full data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary data-[state=active]:after:mt-1 data-[state=active]:after:animate-slide-in-right",
  }[activeAnimation];

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        activeAnimationClass,
        className,
      )}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & {
    animation?: "none" | "fade" | "slide" | "zoom" | "flip";
  }
>(({ className, animation = "none", ...props }, ref) => {
  const animationClass = {
    none: "",
    fade: "animate-fade-in",
    slide: "animate-slide-in-right",
    zoom: "animate-zoom-in",
    flip: "animate-flip-in-y",
  }[animation];

  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        animationClass,
        className,
      )}
      {...props}
    />
  );
});
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
