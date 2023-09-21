import { AspectRatio, Avatar, Box, Typography } from "@/app/lib/mui";
import Image from "next/image";
import React from "react";

//   background: `-webkit-linear-gradient(to right, #16222a, #3a6073); /* Chrome 10-25, Safari 5.1-6 */`,
// background: `linear-gradient(to right, #16222a, #3a6073);`,

export default function Cover() {
  return (
    <Box
      sx={{
        height: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Box>
        <Image
          alt="cover"
          height={150}
          width={160}
          src={"/imgs/connected.png"}
        />
      </Box>
      <Box>
        <Typography level="h2" sx={{ mb: 1, mt: 2 }}>
          Our Alumnies
        </Typography>
        <Typography>Strong network build power</Typography>
      </Box>
    </Box>
  );
}
