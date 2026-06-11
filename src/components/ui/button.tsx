import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
const buttonVariants = cva(
  "text-sm font-medium rounded-full cursor-pointer py-3 px-6 transition duration-200",
  {
    variants: {
      variant: {
        default: " text-white bg-primary hover:bg-primary-700",
        secondary: "hover:bg-gray-100  rounded-xl",
        outline: "hover:bg-gray-100 border border-gray-200",
        link: "text-para p-0 hover:text-primary hover:underline",
      },
    },
  },
);
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { name: React.ReactNode };
export default function Button({
  name,
  className,
  variant = "default",
  onClick,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, className }))}
      onClick={onClick}
      type={type}
      {...props}
    >
      {name}
    </button>
  );
}
