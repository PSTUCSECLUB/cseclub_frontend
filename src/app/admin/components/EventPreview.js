import * as React from "react";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import EventDetails from "@/app/(user)/events/components/events/eventDetails/EventDetails";

export default function EventPreview({ event }) {
  let [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <React.Fragment>
        <Button
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          Preview
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog
            layout="fullscreen"
            sx={{ overflow: "scroll", zIndex: 100000 }}
          >
            <ModalClose />
            <EventDetails event={event} />
          </ModalDialog>
        </Modal>
      </React.Fragment>
    </React.Fragment>
  );
}
