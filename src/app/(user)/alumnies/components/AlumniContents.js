"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Filter from "./Filter";
import {
  Divider,
  Sheet,
  Box,
  CircularProgress,
  Typography,
  Button,
} from "@mui/joy";
import AlumniCard from "./Card";
import { getAlumnies } from "@/app/admin/actions/alumniActions";
import { debounce } from "@/app/lib/debounce";

export default function AlumniContents() {
  let [search, setSearch] = useState("2017-18");
  let [activeField, setActiveField] = useState("session");
  let [alumnies, setAlumnies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shouldFetch, setShouldFetch] = useState(false);
  let [page, setPage] = useState(1);
  let [size, setSize] = useState(2);

  // For debouncing
  let func = useCallback(
    debounce(() => {
      setShouldFetch(true);
    }, 500),
    []
  );
  useEffect(() => {
    if (shouldFetch) {
      updateContents();
      setShouldFetch(false);
    }
  }, [shouldFetch]);

  useEffect(() => {
    // adding debouncing
    if (!loading) {
      setLoading(true);
      setPage(1);
    }
    if (alumnies.length) {
      setAlumnies([]);
    }
    if (!shouldFetch) {
      func();
    }
  }, [search, setShouldFetch]);

  function paginate() {
    return alumnies.slice(0, page * size);
  }

  // if (shouldFetch) updateContents();
  function updateContents() {
    return (async () => {
      try {
        // await async "fetchBooks()" function
        const { alumnies } = await getAlumnies(`?${activeField}=${search}`);
        setAlumnies(alumnies);
        setRowData(alumnies);
        setLoading(false);
        setError(null);
      } catch (err) {
        setLoading(false);
        setError(err);
      }
    })();
  }

  return (
    <Box sx={{ minHeight: "70vh" }}>
      <Filter
        setSearch={setSearch}
        setShouldFetch={setShouldFetch}
        setActiveField={setActiveField}
      />
      <Sheet
        sx={{
          py: 5,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography fontWeight={400} level="h6">
          Showing result's for {activeField} = {search ? search : "none"}
        </Typography>
      </Sheet>

      {search && (
        <Sheet
          sx={{
            display: "flex",
            gap: 2,

            flexWrap: "wrap",
            justifyContent: "center",
            minHeight: "20vh",
            alignItems: "center",
          }}
        >
          {!loading &&
            alumnies &&
            paginate(alumnies).map((a) => {
              return <AlumniCard alumni={a} key={a._id} />;
            })}
          {!loading && alumnies.length === 0 && (
            <Typography>There is no result!</Typography>
          )}
          {loading && <CircularProgress size="md" />}
        </Sheet>
      )}
      {!search && (
        <Typography textAlign={"center"}>Please search anything !</Typography>
      )}
      {alumnies.length > page * size && search && (
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button
            onClick={() => {
              setPage((page) => page + 1);
            }}
          >
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
}
