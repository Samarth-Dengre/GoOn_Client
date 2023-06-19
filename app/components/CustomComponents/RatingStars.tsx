"use client";
import React from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

const RatingStars = ({ value, count }: { value: number; count?: number }) => {
  return (
    <>
      <Rating
        name="text-feedback"
        value={value}
        readOnly
        precision={0.1}
        emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
        sx={{
          "& .MuiRating-iconFilled": {
            color: "#ff6d75",
          },
          fontSize: "1.1rem",
        }}
      />
      {count && <span>({count})</span>}
    </>
  );
};

export default RatingStars;
