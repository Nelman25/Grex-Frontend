import type { PropsWithChildren } from "react";
import { Label } from "./ui/label";

type Props = PropsWithChildren & {
  id: string;
  label: string;
  error?: string;
};

export default function RHFFormField({ id, label, error, children }: Props) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <p className="text-error text-xs">{error}</p>}
    </div>
  );
}
