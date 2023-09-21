"use client";
import * as React from "react";
import Avatar from "@mui/joy/Avatar";

import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import useFeather from "@/app/hooks/useFeather";
import { IconButton } from "@mui/joy";

export default function ExecutiveCard({ executive, handleDelete, setId }) {
  useFeather();

  return (
    <Card
      sx={{
        width: 170,
        maxWidth: "100%",
        boxShadow: "lg",
      }}
    >
      {" "}
      <IconButton
        aria-label="bookmark Bahamas Islands"
        variant="plain"
        color="neutral"
        size="sm"
        sx={{
          position: "absolute",
          top: "0.5rem",
          left: "0.5rem",
          zIndex: 100,
        }}
        onClick={() => handleDelete(executive._id)}
      >
        <i data-feather="x"></i>
      </IconButton>{" "}
      <IconButton
        aria-label="bookmark Bahamas Islands"
        variant="plain"
        color="neutral"
        size="sm"
        sx={{
          position: "absolute",
          top: "0.5rem",
          right: "0.5rem",
          zIndex: 100,
        }}
        onClick={() => setId(executive._id)}
      >
        <i data-feather="edit-2"></i>
      </IconButton>
      <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
        <Avatar src={executive.image} sx={{ "--Avatar-size": "6rem" }} />
        <Typography fontSize="md" fontWeight="lg" sx={{ mt: 1, mb: 0.5 }}>
          {executive.name}
        </Typography>
        <Typography level="body2" sx={{ maxWidth: "24ch" }}>
          {executive.role}
        </Typography>
      </CardContent>
    </Card>
  );
}
