import {
  Box,
  Button,
  Divider,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
} from "@mui/joy";
import React, { useState } from "react";

export default function DeleteItem({ action = () => {} }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outlined" color="danger" onClick={() => setOpen(true)}>
        Delete
      </Button>
      <Modal open={open}>
        <ModalDialog sx={{ width: 280, textAlign: "center" }}>
          <Typography level="h6" sx={{ mb: 1 }}>
            <i data-feather="info"></i> Are you sure ?
          </Typography>

          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
            <Button
              onClick={() => {
                setOpen(false);
                action();
              }}
              variant="solid"
              size="sm"
              color="danger"
            >
              Yes
            </Button>
            <Button
              size="sm"
              variant="outlined"
              onClick={() => {
                setOpen(false);
              }}
            >
              No
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  );
}
