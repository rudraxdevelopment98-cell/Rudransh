"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";

const KEY = "rudransh-cookie-region";

/** Cookie + region notice (globalElements). Persists a dismissal locally. */
export function CookieNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* ignore */
    }
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-30"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div className="container-luxe pb-6">
            <div className="flex flex-col items-start gap-4 border border-ink/10 bg-bone px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-sm text-ink/70">
                We use cookies to improve your experience. Herbal product
                availability and shipping vary by region — some items may not be
                available in your country.
              </p>
              <button onClick={dismiss} className="btn-primary shrink-0">
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
