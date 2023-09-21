import { useState } from "react";
import Box from "@mui/joy/Box";
import Card, { CardProps } from "@mui/joy/Card";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import useFeather from "@/app/hooks/useFeather";
export default function DropZone({ sx, setPhoto, ...props }) {
  const [isDragOver, setIsDragOver] = useState(false);
  useFeather();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };
  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files[0];
    setPhoto(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };
  return (
    <Card
      variant="outlined"
      {...props}
      sx={[
        {
          borderRadius: "sm",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          alignItems: "center",
          px: 3,
          flexGrow: 1,
          border: isDragOver ? "2px solid" : "1px solid",
          borderColor: isDragOver ? "primary.500" : "neutral.700",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <FormControl sx={{ flex: 1, textAlign: "center" }}>
        <FormLabel sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box
            sx={{
              p: 1,
              bgcolor: "background.level1",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                bgcolor: "background.level2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i data-feather="upload-cloud" />
            </Box>
          </Box>
          <Link component={"span"}>Click here to upload</Link>
        </FormLabel>
        <Input
          sx={{ display: "none" }}
          id="photo"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </FormControl>
      <Typography level="body2" textAlign="center">
        {" "}
        or drag and drop
        <br /> SVG, PNG, JPG or GIF (max. 800x400px)
      </Typography>
    </Card>
  );
}
