"use client";
import { Box, Button, Input, Sheet, Typography } from "@mui/joy";
import React, { useEffect, useState } from "react";
import DataTable from "../components/dataTable";
import { getAlumnies } from "../actions/alumniActions";
import { useLayoutEffect } from "react";
import useScript from "../useScript";
import AlumniDataTable from "../components/AlumniDataTable";
import Link from "next/link";
import { useIsAdmin } from "@/app/hooks/isAdmin";

const useEnhancedEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Alumnies() {
  useIsAdmin();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alumnies, setAlumnies] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowData, setRowData] = useState([]);
  const status = useScript(`https://unpkg.com/feather-icons`);

  useEnhancedEffect(() => {
    // Feather icon setup: https://github.com/feathericons/feather#4-replace
    // @ts-ignore
    if (typeof feather !== "undefined") {
      // @ts-ignore
      feather.replace();
    }
  }, [status]);

  useEffect(() => {
    (async () => {
      try {
        // await async "fetchBooks()" function
        const data = await getAlumnies();
        setAlumnies(data.alumnies);
        setRowData(data.alumnies);
        setLoading(false);
        setError(null);
      } catch (err) {
        setLoading(false);
        setError(err);
      }
    })();
  }, []);

  useEffect(() => {
    // adding debouncing
    let timeOutId;
    timeOutId = setTimeout(() => {
      clearTimeout(timeOutId);
      updateOnSearch();
    }, 300);
  }, [searchQuery]);

  function handleSearchInput(e) {
    setSearchQuery(e.target.value);
  }
  function updateOnSearch() {
    let filtered = alumnies?.filter((a) =>
      a.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
    if (filtered) setRowData(filtered);
  }

  return (
    <Sheet
      sx={{
        bgcolor: "background.body",
        flex: 1,
        maxWidth: 1200,
        width: "100%",
        mx: "auto",
      }}
    >
      {/* <Typography
        level="h1"
        fontSize="xl2"
        sx={{
          bgcolor: "background.body",
          mb: 1,
        }}
      >
        Alumnies
      </Typography> */}
      <Box sx={{ pt: 3, pb: 10 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 1,
            pb: 3,
          }}
        >
          <Input
            startDecorator={<i data-feather="search" />}
            sx={{ width: 280 }}
            variant="outlined"
            type="text"
            placeholder="Search Alumni"
            onChange={handleSearchInput}
          />
          <Button size="md">
            <Link
              href={"/admin/addAlumni"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Add Alumni
            </Link>
          </Button>
        </Box>
        <AlumniDataTable
          alumnies={alumnies}
          setAlumnies={setAlumnies}
          setRows={setRowData}
          rows={rowData}
        />
      </Box>
    </Sheet>
  );
}
