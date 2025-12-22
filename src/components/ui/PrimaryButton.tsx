import Link from "next/link";

type PrimaryButtonProps = {
  href: string;
  children: React.ReactNode;
};

export function PrimaryButton({ href, children }: PrimaryButtonProps) {
  return (
    <Link
      href={href}
      className="rounded-full bg-igates-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-igates-500/30 transition hover:bg-igates-400"
    >
      {children}
    </Link>
  );
}
