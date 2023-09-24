"use client";
import useFeather from "@/app/hooks/useFeather";
import { Box, Divider, Grid, ListItem, Sheet, Typography } from "@mui/joy";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export default function Footer() {
  useFeather();
  return (
    <Box
      component="footer"
      sx={{
        p: 5,
        color: "white",
        background: "#0f0f0f",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 5,
          p: 3,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <Image
            style={{
              borderRadius: 5,
              padding: "5px 10px",
              background: "white",
            }}
            src={"/logo_w.png"}
            height={48}
            width={140}
            alt="cseclublogo"
          />
        </Box>
        <Typography sx={{ width: 300, textAlign: "center", color: "white" }}>
          CSE CLUB, PSTU is the largest computer science in bangladesh. It holds
          various events and provides student platforms for growth
        </Typography>
        <Box component={"ul"} sx={{ display: "flex", gap: 3 }}>
          <ListItem>
            <Link
              href={"/"}
              style={{
                color: "white",
                font: "inherit",
                textDecoration: "none",
              }}
            >
              Home
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href={"/events"}
              style={{
                color: "#f4f4f4",
                font: "inherit",
                textDecoration: "none",
              }}
            >
              Events
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href={"/alumnies"}
              style={{
                color: "#f4f4f4",
                font: "inherit",
                textDecoration: "none",
              }}
            >
              Alumnies
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href={"/blogs"}
              style={{
                color: "#f4f4f4",
                font: "inherit",
                textDecoration: "none",
              }}
            >
              Blogs
            </Link>
          </ListItem>
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: {
            xs: "center",
            md: '"space-between"',
          },
          alignItems: "center",
          p: 5,
          gap: 2,
          textAlign: "center",
        }}
      >
        <Typography color="#f4f4f4">
          @CSE CLUB, PSTU. All rights reserved
        </Typography>
        <Box sx={{ display: "flex", gap: 3 }}>
          <Link href={"facebook"} style={{ font: "inherit", color: "white" }}>
            <i data-feather="facebook" />
          </Link>
          <Link href={"facebook"} style={{ font: "inherit", color: "white" }}>
            <i data-feather="twitter" />
          </Link>
          <Link href={"facebook"} style={{ font: "inherit", color: "white" }}>
            <i data-feather="linkedin" />
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
