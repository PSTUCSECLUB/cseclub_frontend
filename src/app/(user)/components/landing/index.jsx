"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import { slideUp } from "./animation";
import { motion } from "framer-motion";
import { Typography } from "@mui/joy";

export default function Home() {
  return (
    <motion.main
      variants={slideUp}
      initial="initial"
      animate="enter"
      className={styles.landing}
    >
      <Image
        style={{ opacity: 0.2 }}
        src={"/images/main.gif"}
        fill={true}
        alt="background"
      />

      <div className={styles.description}>
        <Typography
          level="p"
          sx={{
            margin: "auto",
            color: "white",
            fontSize: { lg: 24, md: 20, sm: 18, xs: 16 },
            margin: 0,
          }}
        >
          Largest Computer Science Club in Southern Bangladesh
        </Typography>
        <Typography
          level="h1"
          sx={{
            color: "white",
            fontWeight: 700,
            fontSize: { lg: 68, md: 58, sm: 52, xs: 40 },
            margin: 1,
          }}
        >
          CSE CLUB, PSTU
        </Typography>
      </div>
    </motion.main>
  );
}
