import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import useFeather from "@/app/hooks/useFeather";
import Link from "next/link";
import { Box, Divider, Modal, ModalDialog } from "@mui/joy";

export default function EventCard({ event, handleDelete }) {
  let [open, setOpen] = React.useState(false);
  useFeather();
  return (
    <Card variant="outlined" sx={{ width: 320 }}>
      <div>
        <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
          {event.title}
        </Typography>
        <Typography level="body2">
          {event.startDate} to {event.endDate}
        </Typography>
        <IconButton
          aria-label="bookmark Bahamas Islands"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
          onClick={() => setOpen(true)}
        >
          <i data-feather="x"></i>
        </IconButton>
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img src={event.image} loading="lazy" alt="" />
      </AspectRatio>
      <CardContent orientation="horizontal">
        <div>
          <Button variant="outlined">
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              href={"/events/" + event._id}
            >
              View Event
            </Link>
          </Button>
        </div>
        <Button
          variant="solid"
          size="sm"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: "auto", fontWeight: 600 }}
        >
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            href={"/admin/updateEvent/" + event._id}
          >
            Update Event
          </Link>
        </Button>
      </CardContent>
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
                handleDelete(event._id);
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
    </Card>
  );
}
