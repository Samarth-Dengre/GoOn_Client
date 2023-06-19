"use client";
import React from "react";
import * as MUI from "@mui/icons-material";

const Icons = ({
  name,
  size,
  color,
}: {
  name: string;
  size: number;
  color: string;
}) => {
  const Icon: any = MUI[name];
  return <Icon sx={{ fontSize: size, color: color }} />;
};

export default Icons;
