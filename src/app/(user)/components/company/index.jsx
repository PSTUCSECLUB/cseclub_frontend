"use client";
import styles from "./style.module.scss";
import { motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";

export default function Companies() {
  return (
    <motion.main className={styles.company}>
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
          <div class={styles.logosSlide}>
            <img src="/images/logos/3m.svg" />
            <img src="/images/logos/barstool-store.svg" />
            <img src="/images/logos/budweiser.svg" />
            <img src="/images/logos/buzzfeed.svg" />
            <img src="/images/logos/forbes.svg" />
            <img src="/images/logos/macys.svg" />
            <img src="/images/logos/menshealth.svg" />
            <img src="/images/logos/mrbeast.svg" />
          </div>
          <div class={styles.logosSlide}>
            <img src="/images/logos/3m.svg" />
            <img src="/images/logos/barstool-store.svg" />
            <img src="/images/logos/budweiser.svg" />
            <img src="/images/logos/buzzfeed.svg" />
            <img src="/images/logos/forbes.svg" />
            <img src="/images/logos/macys.svg" />
            <img src="/images/logos/menshealth.svg" />
            <img src="/images/logos/mrbeast.svg" />
          </div>
        </div>
      </div>
    </motion.main>
  );
}
