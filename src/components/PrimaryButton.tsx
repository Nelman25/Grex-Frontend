import type { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  className?: string;
  onClick?: () => void;
};

export default function PrimaryButton({ children, className }: Props) {
  return (
    <button
      className={`px-2 py-1 rounded text-lg text-light-text bg-gradient-to-b from-brand-primary to-brand-dark border border-brand-light border-t border-t-brand-soft hover:to-brand-primary ${className}`}
    >
      {children}
    </button>
  );
}
