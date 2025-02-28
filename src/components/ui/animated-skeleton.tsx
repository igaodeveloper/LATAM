import { cn } from "@/lib/utils";

function AnimatedSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-shimmer rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export { AnimatedSkeleton };
