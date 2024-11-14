

import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Paper,
  Container,
  Grid,
  Snackbar,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import { CopyAll, Search, Edit, Preview } from '@mui/icons-material';
import { metaQuery } from "../../CustomsHooks/query";
import PreviewTab from "../../Components/previewTable/PreviewTable";


// Meta Tag Display Component
const MetaTagDisplay = ({ metaTags, copyToClipboard }) => (
  <Card 
    elevation={3}
    sx={{
      backgroundColor: "#FFFFFF",
      color: "#333333",
      borderRadius: "12px",
      position: "relative",
      overflow: "visible",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
    }}
  >
    <CardContent>
      <Box sx={{
        position: "absolute",
        top: "-20px",
        left: "20px",
        backgroundColor: "#6C63FF",
        padding: "8px 16px",
        borderRadius: "20px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
      }}>
        <Typography variant="subtitle2" sx={{ color: "white" }}>
          Meta Tags
        </Typography>
      </Box>

      <Box sx={{
        mt: 3,
        fontFamily: "'Fira Code', monospace",
        fontSize: "14px",
        lineHeight: "1.6"
      }}>
        <Typography sx={{ color: "#3F51B5" }}>{"<!-- HTML Meta Tags -->"}</Typography>
        <Typography sx={{ color: "#FF4081", pl: 2 }}>
          {`<title>${metaTags.title || "No title"}</title>`}
        </Typography>
        <Typography sx={{ color: "#FF4081", pl: 2 }}>
          {`<meta name="description" content="${metaTags.description || ""}" />`}
        </Typography>

        <Typography sx={{ color: "#3F51B5", mt: 2 }}>
          {"<!-- Facebook Meta Tags -->"}
        </Typography>
        {["og:url", "og:type", "og:title", "og:description", "og:image"].map((key) => (
          <Typography sx={{ color: "#FF4081", pl: 2 }} key={key}>
            {`<meta property="${key}" content="${metaTags[key] || ""}" />`}
          </Typography>
        ))}

        <Typography sx={{ color: "#3F51B5", mt: 2 }}>
          {"<!-- Twitter Meta Tags -->"}
        </Typography>
        {["twitter:card", "twitter:url", "twitter:title", "twitter:description", "twitter:image"].map((key) => (
          <Typography sx={{ color: "#FF4081", pl: 2 }} key={key}>
            {`<meta name="${key}" content="${metaTags[key] || ""}" />`}
          </Typography>
        ))}
      </Box>

      <Tooltip title="Copy to clipboard">
        <IconButton 
          onClick={copyToClipboard}
          sx={{
            position: "absolute",
            right: "16px",
            top: "16px",
            backgroundColor: "#6C63FF",
            color: "white",
            "&:hover": {
              backgroundColor: "#4E4DD0"
            }
          }}
        >
          <CopyAll />
        </IconButton>
      </Tooltip>
    </CardContent>
  </Card>
);

// Editable Fields Component
const EditableFields = ({ metaTags, onInputChange }) => (
  <Card elevation={3} sx={{ backgroundColor: "#F5F5F5", borderRadius: "12px" }}>
    <CardContent>
      <Box sx={{
        backgroundColor: "#6C63FF",
        padding: "8px 16px",
        borderRadius: "20px",
        display: "inline-block",
        mb: 3
      }}>
        <Typography variant="subtitle2" sx={{ color: "white" }}>
          <Edit sx={{ fontSize: 16, mr: 1, verticalAlign: "text-bottom" }} />
          Edit Meta Tags
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {[
          "title",
          "description",
          "og:url",
          "og:title",
          "og:description",
          "og:image",
          "twitter:card",
          "twitter:title",
          "twitter:description",
          "twitter:image"
        ].map((field) => (
          <Grid item xs={12} key={field}>
            <TextField
              label={field.replace("og:", "Open Graph ").replace("twitter:", "Twitter ")}
              value={metaTags[field] || ""}
              onChange={(e) => onInputChange(e, field)}
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#FFFFFF",
                  color: "#333333",
                  "&:hover fieldset": {
                    borderColor: "#6C63FF",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#555555",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#CCCCCC",
                },
              }}
            />
          </Grid>
        ))}
      </Grid>
    </CardContent>
  </Card>
);

// Preview Component
const PreviewSection = ({ metaTags }) => (
  <Card 
    elevation={3}
    sx={{
      backgroundColor: "#FFFFFF",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
    }}
  >
    <CardContent>
      <Box sx={{
        backgroundColor: "#6C63FF",
        padding: "8px 16px",
        borderRadius: "20px",
        display: "inline-block",
        mb: 3
      }}>
        <Typography variant="subtitle2" sx={{ color: "white" }}>
          <Preview sx={{ fontSize: 16, mr: 1, verticalAlign: "text-bottom" }} />
          Preview
        </Typography>
      </Box>

      {metaTags["og:image"] && (
        <Box sx={{
          textAlign: "center",
          mb: 3,
          "& img": {
            maxWidth: "100%",
            height: "auto",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
          }
        }}>
          <img
            src={metaTags["og:image"]}
            alt="Open Graph"
          />
        </Box>
      )}
      <PreviewTab metaTags={metaTags} />
    </CardContent>
  </Card>
);

// Main Component
export default function Home() {
  const urlFormat = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [metaTags, setMetaTags] = useState(null);
  const [editableMetaTags, setEditableMetaTags] = useState(null);
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);
  const [snackbar, setSnackbar] = useState({ 
    open: false, 
    message: "", 
    severity: "success" 
  });

  const { data, isError, isLoading } = metaQuery(url, isQueryEnabled);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setError(urlFormat.test(input) ? "" : "Invalid URL format");
    setUrl(input);
    setMetaTags(null);
    setIsQueryEnabled(false);
  };

  const handleCheckWebsite = () => {
    if (!url || error) return;
    setIsQueryEnabled(true);
  };

  const handleEditableInputChange = (e, key) => {
    const { value } = e.target;
    setEditableMetaTags(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const copyToClipboard = () => {
    if (!editableMetaTags) return;

    const metaTagsString = `
<!-- HTML Meta Tags -->
<title>${editableMetaTags.title || "No title"}</title>
<meta name="description" content="${editableMetaTags.description || ""}" />

<!-- Facebook Meta Tags -->
<meta property="og:url" content="${editableMetaTags["og:url"] || ""}" />
<meta property="og:type" content="${editableMetaTags["og:type"] || ""}" />
<meta property="og:title" content="${editableMetaTags["og:title"] || ""}" />
<meta property="og:description" content="${editableMetaTags["og:description"] || ""}" />
<meta property="og:image" content="${editableMetaTags["og:image"] || ""}" />

<!-- Twitter Meta Tags -->
<meta name="twitter:card" content="${editableMetaTags["twitter:card"] || ""}" />
<meta name="twitter:url" content="${editableMetaTags["twitter:url"] || ""}" />
<meta name="twitter:title" content="${editableMetaTags["twitter:title"] || ""}" />
<meta name="twitter:description" content="${editableMetaTags["twitter:description"] || ""}" />
<meta name="twitter:image" content="${editableMetaTags["twitter:image"] || ""}" />
    `;
    navigator.clipboard.writeText(metaTagsString);
    setSnackbar({ open: true, message: "Meta Tags copied to clipboard", severity: "success" });
  };

  useEffect(() => {
    if (data && !isError && !isLoading) {
      setMetaTags(data);
      setEditableMetaTags(data);
    }
  }, [data]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Website Meta Tags Scraper
        </Typography>
        <TextField
          label="Enter Website URL"
          value={url}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#FFFFFF",
              color: "#333333",
              "&:hover fieldset": {
                borderColor: "#6C63FF",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#555555",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#CCCCCC",
            },
          }}
        />
        <Button 
          onClick={handleCheckWebsite}
          sx={{
            mt: 2,
            backgroundColor: "#6C63FF",
            color: "white",
            "&:hover": {
              backgroundColor: "#4E4DD0"
            }
          }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Fetch Meta Tags"}
        </Button>
      </Box>

      {isError && (
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography variant="h6" color="error">Failed to fetch meta tags.</Typography>
        </Box>
      )}

      {metaTags && (
        <>
          <MetaTagDisplay metaTags={editableMetaTags} copyToClipboard={copyToClipboard} />
          <EditableFields metaTags={editableMetaTags} onInputChange={handleEditableInputChange} />
          <PreviewSection metaTags={editableMetaTags} />
        </>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      
    </Container>
    
  );
}
