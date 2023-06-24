"use client";
import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

export default function FeedbackRating({
  value,
  setValue,
}: {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [hover, setHover] = React.useState(-1);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue ? newValue : 0);
        }}
        precision={0.25}
      />
    </Box>
  );
}
