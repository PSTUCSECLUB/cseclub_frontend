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
import {
  getAlumni,
  updateAlumni,
  updateAlumniPhoto,
} from "../../actions/alumniActions";
import { Alert, CircularProgress } from "@mui/joy";
import FeedbackModal from "../../components/FeedbackModal";
import { useParams, useRouter } from "next/navigation";
import useFeather from "@/app/hooks/useFeather";
import { useIsAdmin } from "@/app/hooks/isAdmin";
import Link from "next/link";
export default function UpdateAlumni() {
  useIsAdmin();
  let { id } = useParams();
  let router = useRouter();
  const [alumni, setAlumni] = useState(null);
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

  useEffect(() => {
    (async () => {
      try {
        // await async "fetchBooks()" function
        const { alumni } = await getAlumni(id);
        setAlumni(alumni);
        initAlumniFormInputs(alumni);
        setLoading(false);
        setError(null);
      } catch (err) {
        setLoading(false);
        setError(err);
      }
    })();
  }, []);

  function initAlumniFormInputs(alumni) {
    nameInput.setValue(alumni.name);
    emailInput.setValue(alumni.email);
    sessionInput.setValue(alumni.session);
    jobRoleInput.setValue(alumni.jobRole);
    jobCompanyInput.setValue(alumni.jobCompany);
    let socialLinks = alumni.socialLinks;
    if (socialLinks) {
      facebookInput.setValue(socialLinks?.facebook);
      twitterInput.setValue(socialLinks?.twitter);
      linkedinInput.setValue(socialLinks?.linkedin);
    }
  }

  const handleSubmit = async (e) => {
    let { name, email, session, jobRole, jobCompany, socialLinks } = alumni;
    let updatedData = {};
    if (name !== nameInput.value) {
      updatedData.name = nameInput.value;
    }
    if (email !== emailInput.value) {
      updatedData.email = emailInput.value;
    }
    if (session !== sessionInput.value) {
      updatedData.session = sessionInput.value;
    }
    if (jobRole !== jobRoleInput.value) {
      updatedData.jobRole = jobRoleInput.value;
    }
    if (jobCompany !== jobCompanyInput.value) {
      updatedData.jobCompany = jobCompanyInput.value;
    }
    let links = {};
    if (socialLinks?.facebook !== facebookInput.value) {
      links.facebook = facebookInput.value;
    } else {
      links.facebook = socialLinks.facebook;
    }
    if (socialLinks?.twitter !== twitterInput.value) {
      links.twitter = twitterInput.value;
    } else {
      links.twitter = socialLinks.twitter;
    }
    if (socialLinks?.linkedin !== linkedinInput.value) {
      links.linkedin = linkedinInput.value;
    } else {
      links.linkedin = socialLinks.linkedin;
    }
    let isLinkUpdated = false;
    for (let i of Object.keys(links)) {
      if (links[i] !== socialLinks[i]) {
        isLinkUpdated = true;
        break;
      }
    }
    if (isLinkUpdated) updatedData.socialLinks = links;
    console.log(updatedData);
    try {
      setLoading(true);
      let data;
      if (Object.keys(updatedData).length !== 0)
        data = await updateAlumni(id, updatedData);
      if (photo) {
        let photoFormData = new FormData();
        photoFormData.append("photo", photo);
        await updateAlumniPhoto(id, photoFormData);
      }

      // Optionally, you can update the data in the SWR cache
      // by calling the `mutate` function.
      setData(data || photo);

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
        Update Alumni Details
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
            src={photo ? URL.createObjectURL(photo) : alumni?.photo}
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
          msg={"Alumni " + alumni.name + " is updated Successfully"}
          actions={[
            <Button size="sm" onClick={() => setData(null)}>
              Update Again
            </Button>,
            <Button variant="outlined" size="sm">
              <Link
                style={{ font: "inherit", textDecoration: "none" }}
                href={"/admin/alumnies"}
              >
                View Alumnies
              </Link>
            </Button>,
          ]}
        />
      )}
    </Sheet>
  );
}
