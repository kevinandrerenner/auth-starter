import Link from "next/link";

export default function AcceptTermsPrivacy() {
  return (
    <p className="text-sm text-muted-foreground text-center px-4">
      By clicking continue, you agree to our{" "}
      <Link
        href="/terms"
        className="text-muted-foreground underline hover:text-foreground"
      >
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link
        href="/privacy"
        className="text-muted-foreground underline hover:text-foreground"
      >
        Privacy Policy.
      </Link>
    </p>
  );
}