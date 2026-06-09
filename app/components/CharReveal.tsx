"use client";
import { Fragment, useMemo } from "react";
import { motion } from "framer-motion";

interface Props {
  text: string;
  className?: string;
  startDelay?: number;
  charDelay?: number;
}

export function CharReveal({ text, className, startDelay = 0, charDelay = 0.024 }: Props) {
  const words = useMemo(() => {
    let i = 0;
    return text.split(" ").map(word => ({
      word,
      chars: word.split("").map(char => ({ char, idx: i++ })),
    }));
  }, [text]);

  return (
    <span className={className}>
      {words.map(({ chars }, wi) => (
        <Fragment key={wi}>
          {/* overflow-hidden creates the "wipe from below" mask */}
          <span className="inline-block overflow-hidden align-bottom leading-[1.2]">
            {chars.map(({ char, idx }) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                  delay: startDelay + idx * charDelay,
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
          {wi < words.length - 1 && " "}
        </Fragment>
      ))}
    </span>
  );
}
