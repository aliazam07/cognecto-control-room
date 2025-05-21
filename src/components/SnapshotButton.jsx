import React, { useRef, useState } from "react";
import { IconButton, Box, Tooltip } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const SnapshotButton = ({ videoRef }) => {
  const canvasRef = useRef(null);
  const [snapshotUrl, setSnapshotUrl] = useState(null);

  const handleSnapshot = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL("image/png");
      setSnapshotUrl(imageUrl);

      // Trigger download
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `snapshot-${Date.now()}.png`;
      link.click();
    }
  };

  return (
    <>
      <canvas ref={canvasRef} style={{ display: "none" }} />

      <Box
        sx={{
          position: "absolute",
          bottom: 8,
          right: 8,
          zIndex: 20,
        }}
      >
        <Tooltip title="Capture Snapshot" arrow>
          <IconButton
            onClick={handleSnapshot}
            sx={{
              bgcolor: "rgba(0, 0, 0, 0.6)",
              color: "#fff",
              borderRadius: "50%",
              width: 40,
              height: 40,
              backdropFilter: "blur(4px)",
              boxShadow: 3,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.9)",
                color: "#000",
              },
            }}
          >
            <CameraAltIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
};

export default SnapshotButton;
