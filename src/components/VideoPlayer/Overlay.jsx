import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";

export const OverlayLoader = ({ text }) => (
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1,
      bgcolor: "rgba(0,0,0,0.6)",
    }}
  >
    <CircularProgress />
    <Typography variant="caption" sx={{ mt: 2, color: "white" }}>
      {text}
    </Typography>
  </Box>
);

export const ErrorBox = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      aspectRatio: '16 / 9',
      color: "white",
      bgcolor: "rgba(0,0,0,0.8)",
    }}
  >
    <Box sx={{ textAlign: "center" }}>
      <VideocamIcon sx={{ fontSize: 40, color: "error.main", mb: 1 }} />
      <Typography>Error loading stream</Typography>
    </Box>
  </Box>
);

const Overlay = ({ title, isCameraOnline }) => (
  <Box
    sx={{
      position: "absolute",
      top: "8px",
      right: "8px",
      color: "white",
      bgcolor: "rgba(0,0,0,0.6)",
      padding: "4px 10px",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      gap: 1.5,
      zIndex: 2,
    }}
  >

    {/* 👇 Camera Status Dot */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          bgcolor: isCameraOnline ? "limegreen" : "red",
          boxShadow: `0 0 6px ${isCameraOnline ? "limegreen" : "red"}`,
        }}
      />
    </Box>
  </Box>
);

export default Overlay;
