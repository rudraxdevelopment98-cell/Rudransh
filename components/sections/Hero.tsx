"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { EASE } from "@/lib/motion";

/** Immersive full-bleed hero — single CTA, display headline over botanical still. */
export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&q=80&w=2400"
        alt="Raw herbs on natural linen in soft light"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-forest-deep/25 to-forest-deep/30" />

      <div className="container-luxe relative pb-24 pt-40">
        <motion.p
          className="text-caption uppercase tracking-label text-gold"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          Premium herbal wellness
        </motion.p>
        <motion.h1
          className="mt-6 max-w-4xl font-display text-hero text-bone"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        >
          Ancient herbs. Modern life.
        </motion.h1>
        <motion.p
          className="mt-6 max-w-xl text-lg text-bone/80"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
        >
          A guided wellness system — not a catalogue. Choose by how you want to
          feel, and we&apos;ll show you the ritual.
        </motion.p>
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
        >
          <ButtonLink href="/#goals" variant="secondary" className="border-bone text-bone">
            Shop by goal
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}
