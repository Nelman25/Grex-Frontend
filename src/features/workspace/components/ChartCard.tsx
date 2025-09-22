import type { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  title: string;
  subtitle: string;
};

export default function ChartCard({ title, subtitle, children }: Props) {
  return (
    <div className="border p-4 rounded-sm bg-dark-surface shadow-sm shadow-white/20">
      <div className="mb-4">
        <h2 className="text-dark-text font-medium text-lg">{title}</h2>
        <p className="text-dark-subtle">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
