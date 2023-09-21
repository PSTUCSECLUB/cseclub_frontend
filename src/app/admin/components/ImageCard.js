import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";

import Card from "@mui/joy/Card";

import IconButton from "@mui/joy/IconButton";

import useFeather from "@/app/hooks/useFeather";

export default function ImageCard({ imgUrl, id, handleRemove }) {
  useFeather();
  return (
    <Card variant="outlined" sx={{ width: 320 }}>
      <div>
        <IconButton
          aria-label="bookmark Bahamas Islands"
          variant="plain"
          color="neutral"
          size="sm"
          onClick={() => {
            handleRemove(id, imgUrl);
          }}
          sx={{
            position: "absolute",
            top: "0.2rem",
            right: "0.2rem",
            zIndex: 100,
          }}
        >
          <i data-feather="x" />
        </IconButton>
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img src={imgUrl} loading="lazy" alt="" />
      </AspectRatio>
    </Card>
  );
}
