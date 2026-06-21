"use client";

import { useState } from "react";

/** Footer newsletter capture. Wire to Klaviyo in phase 2 (KLAVIYO_PUBLIC_KEY). */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <form
      className="mt-8"
      onSubmit={(e) => {
        e.preventDefault();
        if (!email) return;
        setDone(true);
        setEmail("");
      }}
    >
      <label className="text-caption uppercase tracking-label text-gold">
        Join the ritual
      </label>
      {done ? (
        <p className="mt-3 text-sm text-bone/80">
          Thank you — welcome to Rudransh.
        </p>
      ) : (
        <div className="mt-3 flex border-b border-bone/30 focus-within:border-gold">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="w-full bg-transparent py-2 text-bone placeholder:text-bone/40 focus:outline-none"
          />
          <button
            type="submit"
            className="text-caption uppercase tracking-button text-gold"
          >
            Subscribe
          </button>
        </div>
      )}
    </form>
  );
}
