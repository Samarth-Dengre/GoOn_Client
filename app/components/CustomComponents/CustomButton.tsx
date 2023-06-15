"use client";
import { CustomButtonProps } from "@/utils/dataTypes";
import React from "react";

const CustomButton = (props: CustomButtonProps) => {
  return (
    <button
      className={props.className}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.title}
    </button>
  );
};

export default CustomButton;
