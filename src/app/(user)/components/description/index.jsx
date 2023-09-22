import styles from "./style.module.scss";
import { useInView, motion } from "framer-motion";
import { useRef } from "react";
import { slideUp, opacity } from "./animation";
import Image from "next/image";
export default function index() {
  const desc =
    "CSE club is the most wonderful things that ever happend on the earth! CSE club is the most wonderful things that ever happend on the earth!";
  const description = useRef(null);
  const isInView = useInView(description);
  return (
    <div ref={description} className={styles.description}>
      <Image
        fill={true}
        src={"/texture.jpg"}
        style={{
          pointerEvents: "none",
          top: 50,
          opacity: 0.1,
          objectFit: "cover",
        }}
        alt="texture"
      />
      <div className={styles.body} data-scroll data-scroll-speed={0.1}>
        <h2 style={{ fontWeight: 700 }}>
          {"Who We Are ?".split(" ").map((word, index) => {
            return (
              <span key={index} className={styles.mask}>
                <motion.span
                  variants={slideUp}
                  custom={index}
                  animate={isInView ? "open" : "closed"}
                  key={index}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </h2>
        <p>
          {desc.split(" ").map((word, index) => {
            return (
              <span key={index} className={styles.mask}>
                <motion.span
                  variants={slideUp}
                  custom={index}
                  animate={isInView ? "open" : "closed"}
                  key={index}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
}
