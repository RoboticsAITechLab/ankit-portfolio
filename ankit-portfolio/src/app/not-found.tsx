import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-20 text-center">
      <Container>
        <span className="font-mono text-sm text-[var(--accent)] font-semibold uppercase tracking-wider">
          404 Error
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--foreground)] mt-2 mb-4 font-mono">
          PAGE NOT FOUND
        </h1>
        <p className="text-sm text-[var(--foreground-secondary)] max-w-md mx-auto mb-8">
          The page or route you are attempting to inspect does not exist or has been relocated.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-5 py-2.5 rounded-[var(--radius-md)] bg-[var(--accent)] text-[var(--accent-foreground)] font-mono text-xs font-semibold hover:opacity-90 transition-opacity"
        >
          Return to Terminal Home
        </Link>
      </Container>
    </div>
  );
}
