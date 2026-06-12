import { cn } from "@/lib/utils";

type BadgeProps = {
  name: string;
  className?: string;
};

export default function Badge({ name, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "text-xs px-2 py-1 font-medium bg-primary-50 text-primary",
        className,
      )}
    >
      {name}
    </span>
  );
}
