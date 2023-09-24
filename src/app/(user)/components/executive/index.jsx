"use client";
import styles from "./style.module.scss";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import Image from "next/image";

import { getExecutives } from "@/app/admin/actions/executiveActions";

export default function Executives() {
  let [executives, setExecutives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const data = await getExecutives();
        setExecutives(data.executives);
        setLoading(false);
        setError(null);
      } catch (err) {
        setLoading(false);
        setError(err);
      }
    })();
  }, []);

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const height = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <motion.main style={{ y }} ref={container} className={styles.executives}>
      <Image
        fill={true}
        src={"/texture1.jpg"}
        style={{
          top: 50,
          pointerEvents: "none",
          opacity: 0.009,
          zIndex: 0,
          objectFit: "cover",
        }}
        alt="texture"
      />

      <div>
        <h2
          style={{
            textAlign: "center",
            width: "100%",
            marginBottom: 0,
          }}
        >
          Our Executives
        </h2>
        <p
          style={{
            textAlign: "center",
            width: "100%",
            marginBottom: 80,
          }}
        >
          They works hard to give some idiots opportunity which gives them
          respects
        </p>
      </div>
      <div className={styles.body}>
        {executives.map((executive, index) => {
          return <Member member={executive} key={index} />;
        })}
      </div>
      <motion.div style={{ height }} className={styles.circleContainer}>
        <div className={styles.circle}></div>
      </motion.div>
    </motion.main>
  );
}

function Member({ member }) {
  return (
    <div className={styles.member}>
      <div className={styles.member__img}>
        <img
          width={120}
          height={100}
          style={{ objectFit: "cover" }}
          src={member.image}
        />
      </div>
      <div className={styles.member__descriptions}>
        <h3 style={{ marginBottom: "10px" }}>{member.name}</h3>
        <p style={{ margin: 0 }}>{member.role}</p>
      </div>
    </div>
  );
}
