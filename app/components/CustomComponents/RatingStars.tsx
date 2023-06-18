"use client";
import React from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

const RatingStars = ({ value }: { value: number }) => {
  return (
    <Rating
      name="text-feedback"
      value={value}
      readOnly
      precision={0.1}
      emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
    />
  );
};

export default RatingStars;
