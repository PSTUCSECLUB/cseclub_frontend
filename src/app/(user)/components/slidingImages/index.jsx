import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import styles from "./style.module.scss";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

const slider1 = [
  {
    color: "#e3e5e7",
    src: "img1.jpg",
  },
  {
    color: "#d6d7dc",
    src: "img2.jpg",
  },
  {
    color: "#e3e3e3",
    src: "img1.jpg",
  },
  {
    color: "#21242b",
    src: "img2.jpg",
  },
];

export default function index() {
  const isTabletLand = useMediaQuery({ query: "(max-width: 1324px)" });
  const isTabletPort = useMediaQuery({ query: "(max-width: 720px)" });

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);
  function responsiveSlides(slides) {
    if (isTabletPort) return slides.slice(0, 2);
    if (isTabletLand) return slides.slice(0, 3);

    return slides;
  }

  return (
    <div ref={container} className={styles.slidingImages}>
      <motion.div style={{ x: x1 }} className={styles.slider}>
        {responsiveSlides(slider1).map((project, index) => {
          return (
            <div
              key={index}
              className={styles.slideInstance}
              // style={{ backgroundColor: "#50f7a6" }}
            >
              <div className={styles.imageContainer}>
                <Image
                  fill={true}
                  alt={"image"}
                  src={`/images/${project.src}`}
                />
              </div>
            </div>
          );
        })}
      </motion.div>
      <motion.div style={{ x: x2 }} className={styles.slider}>
        {responsiveSlides(slider1).map((project, index) => {
          return (
            <div
              key={index}
              className={styles.slideInstance}
              // style={{ backgroundColor: "#50f7a6" }}
            >
              <div key={index} className={styles.imageContainer}>
                <Image
                  fill={true}
                  alt={"image"}
                  src={`/images/${project.src}`}
                />
              </div>
            </div>
          );
        })}
      </motion.div>
      <motion.div style={{ height }} className={styles.circleContainer}>
        <div className={styles.circle}></div>
      </motion.div>
      <Image
        fill={true}
        src={"/texture.jpg"}
        style={{
          top: 0,
          pointerEvents: "none",
          opacity: 0.1,
          objectFit: "cover",
        }}
        alt="texture"
      />
    </div>
  );
}
