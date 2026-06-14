import { cn } from "@/lib/utils";

type InputProps = {
  type?: string;
  value?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};
export default function Input({
  type = "text",
  value,
  onChange,
  placeholder,
  className,
}: InputProps) {
  return (
    <div className="relative group">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="absolute top-1/2 -translate-y-1/2 left-2 fill-secondary-300 group-hover:fill-primary-700 transition duration-200"
      >
        <path d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14" />
      </svg>
      <input
        className={cn(
          "pl-12 pr-4 py-2 text-sm outline-none ring-2 ring-secondary-300 rounded-lg hover:ring-2  hover:ring-primary-700 transition duration-200",
          className,
        )}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
