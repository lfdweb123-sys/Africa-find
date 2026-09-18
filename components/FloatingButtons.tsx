"use client";

import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { whatsAppLink } from "@/lib/site-config";
import styles from "./FloatingButtons.module.css";

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 480);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label="Revenir en haut de la page"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`${styles["fab"]} ${styles["top"]} ${
          showTop ? styles["visible"] : ""
        }`}
      >
        <ArrowUp size={20} strokeWidth={2} />
      </button>

      <a
        href={whatsAppLink("Bonjour, j'ai une question sur Africa Find.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Discuter sur WhatsApp"
        className={`${styles["fab"]} ${styles["whatsapp"]} ${styles["visible"]}`}
      >
        <MessageCircle size={22} strokeWidth={2} />
      </a>
    </>
  );
}
