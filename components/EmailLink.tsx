"use client";

import { useEffect, useState } from "react";

const DEFAULT_CLASS =
  "border-b-2 border-accent px-1 pb-1 text-[clamp(10px,2vw,30px)] font-semibold tracking-[-0.02em] text-ink no-underline transition-colors duration-300 hover:bg-accent hover:text-on-accent";

/**
 * Assembles the email address at runtime from split parts, defeating automatic
 * email-obfuscation scripts that rewrite literal `name@domain` mailto links.
 * Renders a masked label until mount. `className` replaces the default
 * (Contact-section) styling.
 */
export function EmailLink({
  user,
  domain,
  className = DEFAULT_CLASS,
}: {
  user: string;
  domain: string;
  className?: string;
}) {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    // String.fromCharCode(64) === "@"
    setAddress(user + String.fromCharCode(64) + domain);
  }, [user, domain]);

  return (
    <a
      href={address ? `mailto:${address}` : "#"}
      suppressHydrationWarning
      className={className}
    >
      {address ?? `${user} [at] ${domain}`}
    </a>
  );
}
