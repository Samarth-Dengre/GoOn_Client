"use client";
import React from "react";
import * as MUI from "@mui/icons-material";

const Icons = ({
  name,
  size,
  color,
}: {
  name: keyof typeof MUI;
  size: number;
  color: string;
}) => {
  const Icon = MUI[name] as React.ElementType;
  return <Icon sx={{ fontSize: size, color: color }} />;
};

export default Icons;
