import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-footer border-t border-footer-border text-footer-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image
              src="/Optimizely_Logo.png"
              alt="Optimizely"
              width={0}
              height={0}
              sizes="28px"
              className="h-7 w-auto shrink-0 brightness-0 invert"
            />
            <span className="font-semibold text-footer-heading text-base">
              Optimizely CMS Sample Site
            </span>
          </Link>
          <p className="text-sm text-footer-muted">
            &copy; {new Date().getFullYear()} Dan Isaacs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
