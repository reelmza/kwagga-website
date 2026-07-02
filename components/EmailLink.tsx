"use client";

import { useEffect, useState } from "react";

/**
 * Assembles the email address at runtime from split parts, defeating automatic
 * email-obfuscation scripts that rewrite literal `name@domain` mailto links.
 * Renders a masked label until mount.
 */
export function EmailLink({ user, domain }: { user: string; domain: string }) {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    // String.fromCharCode(64) === "@"
    setAddress(user + String.fromCharCode(64) + domain);
  }, [user, domain]);

  return (
    <a
      href={address ? `mailto:${address}` : "#contact"}
      suppressHydrationWarning
      className="border-b-2 border-accent px-1 pb-1 text-[clamp(10px,2vw,30px)] font-semibold tracking-[-0.02em] text-ink no-underline transition-colors duration-300 hover:bg-accent hover:text-on-accent"
    >
      {address ?? `${user} [at] ${domain}`}
    </a>
  );
}
