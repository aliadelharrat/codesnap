import { CodeIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  text?: string;
  className?: string;
}

export default function Loading({
  size = "md",
  showText = true,
  text = "Loading snippet",
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-20",
        className
      )}
    >
      <div className="relative">
        <div
          className={cn(
            "rounded-full border-4 border-muted-foreground/30 border-t-primary animate-spin",
            sizeClasses[size]
          )}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <CodeIcon className={cn("text-primary/70", iconSizes[size])} />
        </div>
      </div>
      {showText && <p className="mt-4 text-sm text-muted-foreground">{text}</p>}
    </div>
  );
}
