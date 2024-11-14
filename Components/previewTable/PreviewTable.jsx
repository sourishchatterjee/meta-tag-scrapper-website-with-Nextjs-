import React from "react";
import { Typography, Box } from "@mui/material";

const PreviewTab = ({ metaTags }) => {
  return (
    <Box
      sx={{
        marginTop: "20px",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <Typography variant="subtitle1">Facebook Preview</Typography>
      <Typography>
        <strong>Title:</strong> {metaTags["og:title"] || "No title"}
      </Typography>
      <Typography>
        <strong>Description:</strong> {metaTags["og:description"] || "No description"}
      </Typography>
      <Typography variant="subtitle1">Twitter Preview</Typography>
      <Typography>
        <strong>Title:</strong> {metaTags["twitter:title"] || "No title"}
      </Typography>
      <Typography>
        <strong>Description:</strong> {metaTags["twitter:description"] || "No description"}
      </Typography>
    </Box>
  );
};

export default PreviewTab;
