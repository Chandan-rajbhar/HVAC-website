import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-lg border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-black/50 px-3 py-1.5 text-xs text-slate-900 dark:text-white shadow-sm transition-colors file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:outline-none focus-visible:border-[#7E8056] focus-visible:ring-2 focus-visible:ring-[#7E8056]/20 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
