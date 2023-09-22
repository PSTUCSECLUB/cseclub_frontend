"use client";

import { useRef, useState } from "react";
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
import DropZone from "../components/DropZone";
import { useInput } from "@/app/hooks/useInput";
import { Alert, Card, CircularProgress, Textarea } from "@mui/joy";
import FadeAlert from "../components/FadeAlert";
import FeedbackModal from "../components/FeedbackModal";
import useFeather from "@/app/hooks/useFeather";
import Editor from "../components/Editor/Editor";
import Image from "next/image";
import ImageCard from "../components/ImageCard";
import Link from "@mui/joy/Link";
import NLink from "next/link";
import { addEvent } from "../actions/eventActions";
import MyEditor from "../components/Editor/quilEditor";
import EventPreview from "../components/EventPreview";
import { useIsAdmin } from "@/app/hooks/isAdmin";
export default function NewEvent() {
  useIsAdmin();
  const titleInput = useInput("");
  const shortDescInput = useInput("");
  const startDateInput = useInput("");
  const endDateInput = useInput("");
  const descInput = useInput("");
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
    titleInput.reset();
    startDateInput.reset();
    shortDescInput.reset();
    setImage(null);
    descInput.reset();
    endDateInput.reset();
    participantInput.reset();
    websiteLinkInput.reset();
    setLoading(false);
    setError(null);
    setData(null);
  }

  // generate a event object from the internal state
  // returned that event object
  function generateEvent() {
    let event = {};
    event.title = titleInput.value;
    event.participants = participantInput.value;
    event.websiteLink = websiteLinkInput.value;
    if (image) event.image = URL.createObjectURL(image);
    event.description = qValue;
    return event;
  }

  const handleSubmit = async (e) => {
    if (!validateInputs()) return;
    const formData = new FormData();
    formData.append("title", titleInput.value);
    formData.append("shortDescription", shortDescInput.value);
    formData.append("startDate", startDateInput.value);
    formData.append("participants", participantInput.value);
    formData.append("websiteLink", websiteLinkInput.value);
    formData.append("image", image);
    formData.append("endDate", endDateInput.value);
    formData.append("description", qValue);
    // let socialLinks = {};
    // socialLinks.facebook = facebookInput.value;
    // socialLinks.linkedin = linkedinInput.value;
    // socialLinks.twitter = twitterInput.value;
    // formData.append("socialLinks", JSON.stringify(socialLinks));

    try {
      setLoading(true);
      const data = await addEvent(formData);
      // Optionally, you can update the data in the SWR cache
      // by calling the `mutate` function.
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
        Provide Event Details
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
          {image && (
            <Box>
              <Image
                height={135}
                width={250}
                style={{ borderRadius: 5 }}
                src={
                  image
                    ? URL.createObjectURL(image)
                    : "/static/images/avatar/1.jpg"
                }
                alt="image"
              ></Image>
            </Box>
          )}
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
              Save
            </Button>
          )}
        </Box>
      </Box>
      {data && (
        <FeedbackModal
          msg={data.event.title + " is added to the website Successfully"}
          actions={[
            <Button size="sm" onClick={reset}>
              Add Another
            </Button>,
            <Button variant="outlined" size="sm">
              <NLink
                href={"/admin/events"}
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
