import useFeather from "@/app/hooks/useFeather";
import {
  Box,
  Divider,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
} from "@mui/joy";
import React from "react";

export default function FeedbackModal({ msg, actions = [] }) {
  useFeather();
  return (
    <Modal open={true}>
      <ModalDialog sx={{ width: 400, textAlign: "center" }}>
        <Typography level="h4">Congratultations</Typography>
        <i data-feather="info" />
        <Typography sx={{ my: 2, width: "80%", mx: "auto" }}>{msg}</Typography>
        {actions.length && (
          <>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
              {actions.map((a, i) => {
                return <Box key={i}>{a}</Box>;
              })}
            </Box>
          </>
        )}
      </ModalDialog>
    </Modal>
  );
}
