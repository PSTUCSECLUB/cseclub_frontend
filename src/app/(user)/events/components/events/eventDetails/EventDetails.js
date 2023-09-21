"use client";
import { Avatar, AvatarGroup, Box, Typography } from "@mui/joy";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { getEvent } from "@/app/admin/actions/eventActions";
import "./style.css";
import Link from "next/link";

export default function EventDetails({ event }) {
  return (
    <Box>
      <Typography
        data-scroll
        data-scroll-speed={0.1}
        textAlign={"center"}
        fontWeight={700}
        level="h1"
        sx={{
          fontSize: { sm: 42, md: 48, lg: 64 },
          py: 5,
          pb: 2,
          pt: 15,
          px: 1,
        }}
      >
        {event?.title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mb: 9,
        }}
        data-scroll
        data-scroll-speed={0.1}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography level="body1">
            Total Participants : <span></span>
          </Typography>
          <AvatarGroup>
            {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" /> */}
            <Avatar>
              +<Typography fontSize={10}>{event?.participants}</Typography>
            </Avatar>
          </AvatarGroup>
        </Box>
        {event?.websiteLink && (
          <Link
            style={{ font: "inherit", textDecoration: "none" }}
            href={event?.websiteLink}
          >
            Visit Official Site
          </Link>
        )}
      </Box>
      <Box sx={{ width: "100%", textAlign: "center", mb: 5 }}>
        <img
          data-scroll
          data-scroll-speed={0.2}
          style={{ textAlign: "center" }}
          src={event.image}
          alt="eventimage"
          width={"100%"}
        />
      </Box>
      <Box
        component={"article"}
        sx={{
          width: {
            xs: "88%",
            sm: "75%",
            md: "70%",
            lg: "60%",
          },
          margin: "auto",
        }}
      >
        {event?.description && parse(event?.description)}
      </Box>
    </Box>
  );
}
