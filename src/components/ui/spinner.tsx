import { cn } from "@/lib/utils";

type SpinnerProps = {
  className?: string;
};

export default function Spinner({ className }: SpinnerProps) {
  return (
    <div
      className={cn(
        "h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-primary",
        className,
      )}
    />
  );
}
