"use client";
import styles from "./style.module.scss";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

export default function Companies() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-200, 0]);
  return (
    <motion.main style={{ y }} ref={container} className={styles.company}>
      <div>
        <h2
          style={{
            textAlign: "center",
            width: "100%",
            marginBottom: 0,
          }}
        >
          Our Partners
        </h2>
        <p
          style={{
            textAlign: "center",
            width: "100%",
            marginBottom: 80,
          }}
        >
          We have worked with those world class companies
        </p>
      </div>
      <div className={styles.body}>
        <div className={styles.logos}>
          <div className={styles.logosSlide}>
            <img src="/images/sponsors/bongodev.svg" />
            <img src="/images/sponsors/hackerverse.png" />
            <img src="/images/sponsors/vivasoft.jpg" />
          </div>
          <div className={styles.logosSlide}>
            <img src="/images/sponsors/bongodev.svg" />
            <img src="/images/sponsors/hackerverse.png" />
            <img src="/images/sponsors/vivasoft.jpg" />
          </div>
        </div>
      </div>
    </motion.main>
  );
}
