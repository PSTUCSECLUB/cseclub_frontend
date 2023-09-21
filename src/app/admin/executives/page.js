"use client";
import { Alert, Box, Button, CircularProgress, Typography } from "@mui/joy";
import React, { useEffect, useState } from "react";
import AddExecutive from "./components/AddExecutive";
import { deleteExecutive, getExecutives } from "../actions/executiveActions";
import ExecutiveCard from "./components/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastFailureConfig, toastSuccessConfig } from "../utils/toastConfig";
import UpdateExecutive from "./components/UpdateExecutive";

export default function Executives() {
  let [executives, setExecutives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // this id will be filled when we need to update
  const [id, setId] = useState("");
  useEffect(() => {
    (async () => {
      try {
        // await async "fetchBooks()" function
        const data = await getExecutives();
        setExecutives(data.executives);
        setLoading(false);
        setError(null);
      } catch (err) {
        setLoading(false);
        setError(err);
      }
    })();
  }, []);

  function newAdded(executive) {
    setExecutives([...executives, executive]);
  }
  function updateOne(updated) {
    let filtered = executives.filter((e) => e._id !== updated._id);
    setExecutives([...filtered, updated]);
  }
  async function handleDelete(id) {
    let prevExecutives = [...executives];
    let filteredExecutives = executives.filter((e) => e._id !== id);
    let executive = prevExecutives.filter((e) => e._id === id)[0];
    setExecutives(filteredExecutives);
    try {
      await deleteExecutive(id);
      toast.success(
        executive.name + " deleted successfully",
        toastSuccessConfig
      );
      prevExecutives.length = 0;
    } catch (error) {
      setExecutives(prevExecutives);
      toast.error(error.message, toastFailureConfig);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "80vh",
      }}
    >
      <Box>
        <Typography level="h4">Executives</Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 5 }}>
          <AddExecutive newAdded={newAdded} />
        </Box>
        {loading && (
          <CircularProgress
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          />
        )}
        {executives && (
          <Box sx={{ display: "flex", gap: 2 }}>
            {executives.map((e) => {
              return (
                <ExecutiveCard
                  handleDelete={handleDelete}
                  executive={e}
                  key={e._id}
                  setId={setId}
                ></ExecutiveCard>
              );
            })}
            {executives.length === 0 && (
              <Typography>Nothing to show!</Typography>
            )}
          </Box>
        )}
        {error && <Alert variant="danger">{error.message}</Alert>}
      </Box>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {id && (
        <UpdateExecutive
          id={id}
          setId={setId}
          executives={executives}
          updatedOne={updateOne}
        />
      )}
    </Box>
  );
}
