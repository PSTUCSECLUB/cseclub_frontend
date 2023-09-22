import { Box, Typography } from "@mui/joy";
import styles from "./style.module.scss";
import Image from "next/image";

export default function index() {
  return (
    <div className={styles.footer}>
      <div className={styles.links}>
        <a>It Carnival 2023</a>
        <a>Hackathon</a>
      </div>
      <Box>
        <Typography sx={{ mb: 1 }} variant="body-1">
          This site is developed by
        </Typography>
        <div className={styles.developers}>
          <DeveloperItem name={"Jamatul Talukder"} img={"/images/me.png"} />
          <DeveloperItem name={"Md Tahsin Amin"} img={"/images/tahsin.jpg"} />
        </div>
      </Box>
    </div>
  );
}

function DeveloperItem({ name, img }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        alt="image"
        style={{ objectFit: "cover", borderRadius: "50%" }}
        height={50}
        width={50}
        src={img}
      />
      <Typography sx={{ fontSize: 14 }} variant="body-3">
        {name}
      </Typography>
    </Box>
  );
}
