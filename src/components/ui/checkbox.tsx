import { cn } from "@/lib/utils";

type CheckboxProps = {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
};

export default function Checkbox({
  label,
  checked,
  onChange,
  className,
}: CheckboxProps) {
  return (
    <label
      className={cn(
        "flex items-center gap-2 cursor-pointer select-none",
        className,
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-secondary-300 accent-primary"
      />

      {label && <span className="text-sm text-secondary-700">{label}</span>}
    </label>
  );
}
