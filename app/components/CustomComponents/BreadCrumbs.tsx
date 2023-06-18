"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { usePathname } from "next/navigation";
import Link from "next/link";

const breadcrumbNameMap: { [key: string]: string } = {
  "/inbox": "Inbox",
  "/inbox/important": "Important",
  "/trash": "Trash",
  "/spam": "Spam",
  "/drafts": "Drafts",
};

function Page() {
  const pathName = usePathname();
  const pathnames = pathName.split("/").filter((x) => x);
  console.log(pathnames);
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link href="/">Home</Link>
      {pathnames.map((value: string, index: number) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return last ? (
          <Typography color="text.primary" key={to}>
            {value}
          </Typography>
        ) : (
          <Link href={to}>{value}</Link>
        );
      })}
    </Breadcrumbs>
  );
}

export default function RouterBreadcrumbs() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: 360 }}>
      <Page />
    </Box>
  );
}
