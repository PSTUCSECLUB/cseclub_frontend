"use client";

import * as React from "react";
import useFeather from "../hooks/useFeather";
import { useRouter } from "next/navigation";
import { useIsAdmin } from "../hooks/isAdmin";
import { Box, Card, CardContent, Typography } from "@mui/joy";
import Link from "next/link";

export default function JoyOrderDashboardTemplate() {
  useFeather();
  useIsAdmin();

  return (
    <Box>
      <h1>Dashboard</h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ mt: 10 }} fontSize={32} textAlign={"center"}>
          🎇🎇🎇 Welcome to the cse club Dashboard
        </Typography>
        <Box sx={{ p: 5, display: "flex", gap: 2 }}>
          <Item
            title={"Events"}
            description={"It will open the events"}
            link={"/admin/events"}
          />
          <Item
            title={"Alumnies"}
            description={"It will open the alumnies"}
            link={"/admin/alumnies"}
          />
          <Item
            title={"Executives"}
            description={"It will open the executives"}
            link={"/admin/executives"}
          />{" "}
        </Box>
      </Box>
    </Box>
  );
}

function Item({ title, description, link }) {
  return (
    <Link href={link} style={{ font: "inherit", textDecoration: "none" }}>
      <Card sx={{ p: 3 }}>
        <CardContent>
          <Typography fontSize={18} fontWeight={700} level="title-md">
            {title}
          </Typography>
          <Typography>{description}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
