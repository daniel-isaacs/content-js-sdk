import Image from "next/image";
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16 gap-3">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image
              src="/Optimizely_Logo.png"
              alt="Optimizely"
              width={0}
              height={0}
              sizes="36px"
              className="h-9 w-auto shrink-0"
              priority
            />
            <span className="font-semibold text-foreground text-xl">
              Optimizely CMS Sample Site
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
