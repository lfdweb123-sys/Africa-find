"use client";

import styles from "./StatusWave.module.css";

interface Props {
  active: boolean;
  tone: "teal" | "gold" | "down";
}

const BAR_COUNT = 24;

export default function StatusWave({ active, tone }: Props) {
  return (
    <div
      className={`${styles["wave"]} ${styles[tone]} ${
        active ? styles["active"] : styles["idle"]
      }`}
      aria-hidden="true"
    >
      {Array.from({ length: BAR_COUNT }).map((_, i) => (
        <span
          key={i}
          className={styles["bar"]}
          style={{ animationDelay: `${(i % 8) * 0.09}s` }}
        />
      ))}
    </div>
  );
}
