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
import { addAlumni } from "../actions/alumniActions";
import { Alert, CircularProgress } from "@mui/joy";
import FeedbackModal from "../components/FeedbackModal";
import useFeather from "@/app/hooks/useFeather";
import NLink from "next/link";
export default function AddAlumni() {
  const nameInput = useInput("");
  const emailInput = useInput("");
  const sessionInput = useInput("");
  const jobRoleInput = useInput("");
  const jobCompanyInput = useInput("");
  const facebookInput = useInput("");
  const twitterInput = useInput("");
  const linkedinInput = useInput("");

  // photo
  const [photo, setPhoto] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useFeather();
  function validateInputs() {
    if (nameInput.value === "") {
      setError(new Error("Name is not given!"));
      return false;
    }
    if (sessionInput.value === "") {
      setError(new Error("Session is not given!"));
      return false;
    }
    if (!photo) {
      setError(new Error("Photo is not given!"));
      return false;
    }
    return true;
  }

  function reset() {
    nameInput.reset();
    sessionInput.reset();
    emailInput.reset();
    setPhoto(null);
    jobCompanyInput.reset();
    jobRoleInput.reset();
    facebookInput.reset();
    twitterInput.reset();
    linkedinInput.reset();
    setLoading(false);
    setError(null);
    setData(null);
  }

  const handleSubmit = async (e) => {
    if (!validateInputs()) return;
    const formData = new FormData();
    formData.append("name", nameInput.value);
    formData.append("email", emailInput.value);
    formData.append("session", sessionInput.value);
    formData.append("photo", photo);
    formData.append("jobRole", jobRoleInput.value);
    formData.append("jobCompany", jobCompanyInput.value);
    let socialLinks = {};
    socialLinks.facebook = facebookInput.value;
    socialLinks.linkedin = linkedinInput.value;
    socialLinks.twitter = twitterInput.value;
    formData.append("socialLinks", JSON.stringify(socialLinks));

    try {
      setLoading(true);
      const data = await addAlumni(formData);
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
        Provide Alumni Details
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
          Name
        </FormLabel>
        <Box sx={{ display: { xs: "contents", sm: "flex" }, gap: 2 }}>
          <FormControl sx={{ flex: 1 }}>
            <FormLabel sx={{ display: { sm: "none" } }}>Full name</FormLabel>
            <Input
              value={nameInput.value}
              onChange={nameInput.onChange}
              placeholder="first name"
            />
          </FormControl>
        </Box>

        <Divider role="presentation" />

        <FormControl sx={{ display: { sm: "contents" } }}>
          <FormLabel>Email</FormLabel>
          <Input
            value={emailInput.value}
            onChange={emailInput.onChange}
            type="email"
            startDecorator={<i data-feather="mail" />}
            placeholder="email"
          />
        </FormControl>

        <Divider role="presentation" />
        <FormControl sx={{ display: { sm: "contents" } }}>
          <FormLabel>Session</FormLabel>
          <Input
            value={sessionInput.value}
            onChange={sessionInput.onChange}
            type="text"
            startDecorator={<i data-feather="mail" />}
            placeholder="session"
          />
        </FormControl>

        <Divider role="presentation" />

        <Box>
          <FormLabel>Photo</FormLabel>
          <FormHelperText>
            This will be displayed on alumni profile.
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
          <Avatar
            size="lg"
            src={
              photo ? URL.createObjectURL(photo) : "/static/images/avatar/1.jpg"
            }
            sx={{ "--Avatar-size": "64px" }}
          />
          <DropZone setPhoto={setPhoto} />
        </Box>

        <Divider role="presentation" />

        <FormControl sx={{ display: { sm: "contents" } }}>
          <FormLabel> Job role</FormLabel>
          <Input value={jobRoleInput.value} onChange={jobRoleInput.onChange} />
        </FormControl>
        <Divider role="presentation" />
        <FormControl sx={{ display: { sm: "contents" } }}>
          <FormLabel> Job company</FormLabel>
          <Input
            value={jobCompanyInput.value}
            onChange={jobCompanyInput.onChange}
          />
        </FormControl>

        <Divider role="presentation" />

        <FormControl sx={{ display: { sm: "contents" } }}>
          <FormLabel> Facebook link</FormLabel>
          <Input
            value={facebookInput.value}
            onChange={facebookInput.onChange}
          />
        </FormControl>

        <Divider role="presentation" />
        <FormControl sx={{ display: { sm: "contents" } }}>
          <FormLabel> Twitter link</FormLabel>
          <Input value={twitterInput.value} onChange={twitterInput.onChange} />
        </FormControl>

        <Divider role="presentation" />
        <FormControl sx={{ display: { sm: "contents" } }}>
          <FormLabel> Linkedin</FormLabel>
          <Input
            value={linkedinInput.value}
            onChange={linkedinInput.onChange}
          />
        </FormControl>

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
          msg={
            "Alumni " +
            data.alumni.name +
            " is added to the website Successfully"
          }
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
