"use client";

import { useEffect, useRef, useState } from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import DropZone from "../../components/DropZone";
import { useInput } from "@/app/hooks/useInput";
import NLink from "next/link";
import { Alert, AspectRatio, Card, CircularProgress, Textarea } from "@mui/joy";
import FeedbackModal from "../../components/FeedbackModal";
import useFeather from "@/app/hooks/useFeather";
import Editor from "../../components/Editor/Editor";
import Image from "next/image";
import ImageCard from "../../components/ImageCard";
import Link from "@mui/joy/Link";
import { addEvent, getEvent, updateEvent } from "../../actions/eventActions";
import { useParams } from "next/navigation";
import MyEditor from "../../components/Editor/quilEditor";
import EventPreview from "../../components/EventPreview";
import { useIsAdmin } from "@/app/hooks/isAdmin";
export default function UpdateEvent() {
  useIsAdmin();
  const [event, setEvent] = useState({});
  let { id } = useParams();
  const titleInput = useInput("");
  const shortDescInput = useInput("");
  const startDateInput = useInput("");
  const endDateInput = useInput("");

  const participantInput = useInput("");
  const websiteLinkInput = useInput("");

  const [qValue, setQValue] = useState("");
  const [qImageFiles, setQImageFiles] = useState([]);

  // photo
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  useFeather();

  useEffect(() => {
    (async () => {
      try {
        // await async "fetchBooks()" function
        const { event } = await getEvent(id);
        setEvent(event);
        initEventFormInputs(event);
        setLoading(false);
        setError(null);
      } catch (err) {
        setLoading(false);
        setError(err);
      }
    })();
  }, []);

  function initEventFormInputs(event) {
    titleInput.setValue(event.title);
    shortDescInput.setValue(event.shortDescription);
    startDateInput.setValue(event.startDate);
    endDateInput.setValue(event.endDate);
    participantInput.setValue(event?.participants);
    websiteLinkInput.setValue(event.websiteLink);
    setQValue(event.description);
    // get images link
    let matches = event.description.match(/src="(.*?)"/g);
    let qImgFiles = [];
    if (matches) {
      for (let m of matches) {
        qImgFiles.push(m.slice(5, m.length - 1));
      }
      setQImageFiles(qImgFiles);
    }
  }
  // generate a event object from the internal state
  // returned that event object
  function generateEvent() {
    let generatedEvent = {};
    generatedEvent.title = titleInput.value;
    generatedEvent.participants = participantInput.value;
    generatedEvent.websiteLink = websiteLinkInput.value;
    if (image) generatedEvent.image = URL.createObjectURL(image);
    else generatedEvent.image = event.image;
    generatedEvent.description = qValue;

    return generatedEvent;
  }

  function handleDescription(value) {
    setDescription({ value });
  }

  function validateInputs() {
    if (titleInput.value === "") {
      setError(new Error("Title is not given!"));
      return false;
    }
    if (shortDescInput.value === "") {
      setError(new Error("ShortDescription is not given!"));
      return false;
    }
    if (startDateInput.value === "") {
      setError(new Error("StartDate is not given!"));
      return false;
    }
    if (endDateInput.value === "") {
      setError(new Error("EndDate is not given!"));
      return false;
    }
    if (!image) {
      setError(new Error("Image is not given!"));
      return false;
    }
    return true;
  }

  function reset() {
    setData(null);
    setLoading(false);
    setError(null);
  }

  const handleSubmit = async (e) => {
    let {
      title,
      shortDescription,
      startDate,
      endDate,
      description: prevDesc,
      participants,
      websiteLink,
    } = event;
    let formData = new FormData();
    // we can't check formdata empty or not as older browser doesn't support the form.entries
    // that's why i am doing a work around here
    let updatedFlag = false;
    if (title !== titleInput.value) {
      updatedFlag = true;
      formData.append("title", titleInput.value);
    }
    if (shortDescription !== shortDescInput.value) {
      updatedFlag = true;
      formData.append("shortDescription", shortDescInput.value);
    }
    if (startDate !== startDateInput.value) {
      updatedFlag = true;
      formData.append("startDate", startDateInput.value);
    }
    if (endDate !== endDateInput.value) {
      updatedFlag = true;
      formData.append("endDate", endDateInput.value);
    }
    if (participants !== participantInput.value) {
      updatedFlag = true;
      formData.append("participants", participantInput.value);
    }
    if (websiteLink !== websiteLinkInput.value) {
      updatedFlag = true;
      formData.append("websiteLink", websiteLinkInput.value);
    }
    if (prevDesc !== qValue) {
      updatedFlag = true;
      formData.append("description", qValue);
    }

    if (image) {
      updatedFlag = true;
      formData.append("image", image);
    }

    try {
      setLoading(true);
      let data;
      if (updatedFlag) data = await updateEvent(id, formData);
      setData(data);
      console.log(data);

      setError(null);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setData(null);
      setError(error);
      setLoading(false);
    }
  };
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
      <Typography
        level="h1"
        fontSize="xl2"
        sx={{
          bgcolor: "background.body",
          mb: 1,
        }}
      >
        Update Event
      </Typography>

      <Box
        sx={{
          pt: 3,
          pb: 10,
          display: "grid",
          gridTemplateColumns: {
            xs: "100%",
            sm: "minmax(120px, 30%) 1fr",
            lg: "280px 1fr minmax(120px, 208px)",
          },
          columnGap: { xs: 2, sm: 3, md: 4 },
          rowGap: { xs: 2, sm: 2.5 },
          "& > hr": {
            gridColumn: "1/-1",
          },
        }}
      >
        <FormLabel sx={{ display: { xs: "none", sm: "block" } }}>
          Title :
        </FormLabel>
        <Box sx={{ display: { xs: "contents", sm: "flex" }, gap: 2 }}>
          <FormControl sx={{ flex: 1 }}>
            <FormLabel sx={{ display: { sm: "none" } }}>Full name</FormLabel>
            <Input
              value={titleInput.value}
              onChange={titleInput.onChange}
              placeholder="Title of the event ..."
            />
          </FormControl>
        </Box>

        <Divider role="presentation" />
        <FormControl
          sx={{ display: { sm: "contents" }, borderRadius: 5, pb: 5 }}
        >
          <FormLabel> Description : </FormLabel>
          {/* <Input value={descInput.value} onChange={descInput.onChange} /> */}
          <Box sx={{ mb: 10 }}>
            <MyEditor
              value={qValue}
              setValue={setQValue}
              setImageFiles={setQImageFiles}
              imageFiles={qImageFiles}
            />
          </Box>
        </FormControl>

        <Divider role="presentation" />
        <FormControl sx={{ display: { sm: "contents" } }}>
          <FormLabel>Short Description</FormLabel>
          <Textarea
            value={shortDescInput.value}
            onChange={shortDescInput.onChange}
            minRows={2}
            placeholder="Give a short description of the event ..."
          />
        </FormControl>

        <Divider role="presentation" />

        <FormControl sx={{ display: { sm: "contents" } }}>
          <FormLabel> Start Date : </FormLabel>
          <Input
            type="date"
            value={startDateInput.value}
            onChange={startDateInput.onChange}
          />
        </FormControl>
        <Divider role="presentation" />

        <FormControl sx={{ display: { sm: "contents" } }}>
          <FormLabel> End Date : </FormLabel>
          <Input
            type="date"
            value={endDateInput.value}
            onChange={endDateInput.onChange}
          />
        </FormControl>
        <Divider role="presentation" />

        <FormControl sx={{ display: { sm: "contents" } }}>
          <FormLabel> Participants : </FormLabel>
          <Input
            type="text"
            value={participantInput.value}
            onChange={participantInput.onChange}
          />
        </FormControl>
        <Divider role="presentation" />

        <FormControl sx={{ display: { sm: "contents" } }}>
          <FormLabel> Website Link : </FormLabel>
          <Input
            type="text"
            value={websiteLinkInput.value}
            onChange={websiteLinkInput.onChange}
          />
        </FormControl>
        <Divider role="presentation" />
        <Box>
          <FormLabel>Image</FormLabel>
          <FormHelperText>
            This will be displayed on events showcase.
          </FormHelperText>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 2.5,
          }}
        >
          <DropZone setPhoto={setImage} />

          <Box>
            <img
              src={image ? URL.createObjectURL(image) : event.image}
              loading="lazy"
              alt=""
              style={{ height: 170 }}
            />
          </Box>
        </Box>

        <Divider role="presentation" />

        {error && <Alert color="danger">{error.message}</Alert>}
        <Box
          sx={{
            gridColumn: "1/-1",
            justifySelf: "flex-end",
            display: "flex",
            gap: 1,
          }}
        >
          <EventPreview event={generateEvent()} />
          <Button variant="outlined" onClick={reset} color="neutral" size="sm">
            Reset
          </Button>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button onClick={handleSubmit} size="sm">
              Update
            </Button>
          )}
        </Box>
      </Box>
      {data && (
        <FeedbackModal
          msg={data.event.title + " is added to the website Successfully"}
          actions={[
            <Button size="sm" onClick={reset}>
              Update Again !
            </Button>,
            <Button variant="outlined" size="sm">
              <NLink
                href={"/admin/events/"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                View Events
              </NLink>
            </Button>,
          ]}
        />
      )}
    </Sheet>
  );
}
