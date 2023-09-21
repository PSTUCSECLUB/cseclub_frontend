"use client";
import {
  Box,
  Button,
  IconButton,
  Input,
  Select,
  Option,
  Sheet,
  Typography,
} from "@/app/lib/mui";
import React, { useState } from "react";
import useFeather from "@/app/hooks/useFeather";

export default function Filter({ setSearch, setActiveField, setShouldFetch }) {
  const [expand, setExpand] = useState(true);
  const [name, setName] = useState("");
  const [session, setSession] = useState("2017-18");
  const [jobRole, setJobRole] = useState("");
  const [jobCompany, setJobCompany] = useState("");
  useFeather();
  function toggleExpand() {
    setExpand((expand) => !expand);
  }

  const handleName = (e) => {
    setName(e.target.value);
    setSearch(e.target.value);
    setActiveField("name");
    resetFields("name");
  };
  const handleSession = (e, value) => {
    setSession(value);
    setSearch(value);
    setActiveField("session");
    resetFields("session");
    setShouldFetch(true);
  };

  const handleJobRole = (e) => {
    setJobRole(e.target.value);
    setSearch(e.target.value);
    setActiveField("jobRole");
    resetFields("jobRole");
  };

  const handleJobCompany = (e) => {
    setJobCompany(e.target.value);
    setSearch(e.target.value);
    setActiveField("jobCompany");
    resetFields("jobCompany");
  };

  function resetFields(except) {
    if (except !== "name") setName("");
    if (except !== "session") setSession("");
    if (except !== "jobRole") setJobRole("");
    if (except !== "jobCompany") setJobCompany("");
  }
  return (
    <Sheet
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 1,
        position: "sticky",
        top: 0,
        zIndex: 3,
        transition: "all .2s",
        p: expand ? 2 : 1,
      }}
    >
      <Box sx={{ display: expand ? "block" : "none" }}>
        <Typography
          color="info"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: 1,
            fontSize: "14px",
            mb: 0.5,
            flexWrap: "wrap",
          }}
        >
          {" "}
          <i data-feather="info"></i> You can filter alumnies based on their job
          role, company, sessions{" "}
        </Typography>
      </Box>
      <Box
        sx={{
          display: expand ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 2,
          transition: "height 0.4s",
          overflow: "hidden",
        }}
      >
        <Input
          value={name}
          onChange={handleName}
          type="text"
          placeholder="Name"
          sx={{ borderRadius: 50, borderColor: "rgb(80, 247, 166)" }}
        />
        <Input
          value={jobRole}
          onChange={handleJobRole}
          type="text"
          placeholder="Job Role"
          sx={{ borderRadius: 50, borderColor: "rgb(80, 247, 166)" }}
        />
        <Input
          value={jobCompany}
          onChange={handleJobCompany}
          type="text"
          placeholder="Job Company"
          sx={{ borderRadius: 50, borderColor: "rgb(80, 247, 166)" }}
        />
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Typography>Session:</Typography>
          <Select
            value={session}
            defaultValue={"2017-18"}
            onChange={handleSession}
            sx={{ borderRadius: 50, borderColor: "rgb(80, 247, 166)" }}
          >
            {generateSessions().map((s, i) => {
              return (
                <Option value={s} key={i}>
                  {s}
                </Option>
              );
            })}
          </Select>
        </Box>
      </Box>
      <Box>
        {expand && <IconBtn type={"up"} onClick={toggleExpand} />}
        {!expand && <IconBtn type={"down"} onClick={toggleExpand} />}
      </Box>
    </Sheet>
  );
}

function IconBtn({ type, onClick }) {
  useFeather();
  if (type === "down") {
    return (
      <IconButton size="sm" variant="plain" onClick={onClick}>
        <i data-feather="chevrons-down"></i>
        Expand Filter
      </IconButton>
    );
  }
  if (type == "up") {
    return (
      <IconButton size="sm" variant="plain" onClick={onClick}>
        <i data-feather="chevrons-up"></i>
        Collaspe
      </IconButton>
    );
  }
  return "";
}

function generateSessions() {
  let sessions = [];
  let to = Number(String(new Date().getFullYear()).slice(2));
  let pre = "20";
  for (let i = 0; i < to; i++) {
    let end = i < 10 ? "0" + i : i + "";
    let endPlus = i + 1 < 10 ? "0" + String(i + 1) : i + 1 + "";
    sessions.push(`${pre}${end}-${endPlus}`);
  }
  return sessions;
}
