import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip, { chipClasses } from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import Stack from "@mui/joy/Stack";
import Sheet from "@mui/joy/Sheet";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Typography from "@mui/joy/Typography";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import DropZone from "./DropZone";
import FileUpload from "./FileUpload";
import CountrySelector from "./CountrySelector";
import EditorToolbar from "./EditorToolbar";

export default function MyProfile() {
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
            <Input placeholder="first name" defaultValue="Siriwat" />
          </FormControl>
        </Box>

        <Divider role="presentation" />

        <FormControl sx={{ display: { sm: "contents" } }}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            startDecorator={<i data-feather="mail" />}
            placeholder="email"
            defaultValue="siriwatk@test.com"
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
            src="/static/images/avatar/1.jpg"
            sx={{ "--Avatar-size": "64px" }}
          />
          <DropZone />
        </Box>

        <Divider role="presentation" />

        <FormControl sx={{ display: { sm: "contents" } }}>
          <FormLabel> Job role</FormLabel>
          <Input defaultValue="UI Developer" />
        </FormControl>
        <Divider role="presentation" />
        <FormControl sx={{ display: { sm: "contents" } }}>
          <FormLabel> Job company</FormLabel>
          <Input defaultValue="UI Developer" />
        </FormControl>

        <Divider role="presentation" />

        <FormControl sx={{ display: { sm: "contents" } }}>
          <FormLabel> Facebook link</FormLabel>
          <Input defaultValue="www.facebook.com" />
        </FormControl>

        <Divider role="presentation" />
        <FormControl sx={{ display: { sm: "contents" } }}>
          <FormLabel> Twitter link</FormLabel>
          <Input defaultValue="www.twitter.com" />
        </FormControl>

        <Divider role="presentation" />
        <FormControl sx={{ display: { sm: "contents" } }}>
          <FormLabel> Linkedin</FormLabel>
          <Input defaultValue="www.linkedin.com" />
        </FormControl>

        <Divider role="presentation" />

        <Box
          sx={{
            gridColumn: "1/-1",
            justifySelf: "flex-end",
            display: "flex",
            gap: 1,
          }}
        >
          <Button variant="outlined" color="neutral" size="sm">
            Cancel
          </Button>
          <Button size="sm">Save</Button>
        </Box>
      </Box>
    </Sheet>
  );
}
