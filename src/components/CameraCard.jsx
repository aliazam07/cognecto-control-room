import React, { useState } from "react";
import { Box, Typography, IconButton, Paper, Tooltip } from "@mui/material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { motion } from "framer-motion";
import VideoPlayer from "../components/VideoPlayer/index";

const CameraCard = ({ camera, onCameraClick, theme }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isCameraAvailable = !!camera;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: isCameraAvailable ? 1.03 : 1 }}
      whileTap={{ scale: isCameraAvailable ? 0.98 : 1 }}
    >
      <Paper
        elevation={isHovered ? 8 : 3}
        sx={{
          // aspectRatio: '16/9',
          height: "auto",
          width: "100%",
          cursor: isCameraAvailable ? "pointer" : "default",
          borderRadius: "6px",
          overflow: "hidden",
          border:
            isHovered && isCameraAvailable
              ? `1px solid ${theme.palette.primary.main}`
              : "none",
          backgroundColor: isCameraAvailable ? "transparent" : "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "all 0.3s ease",
          border: "1px solid #C7C7C7",
          boxShadow: "none",
        }}
        onClick={() => isCameraAvailable && onCameraClick(camera)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Box
          sx={{
            flex: 1,
            position: "relative",
            aspectRatio: "16 / 9",
            borderBottom: "1px solid #C7C7C7",
          }}
        >
          {isCameraAvailable ? (
            <>
              <VideoPlayer
                cameraId={camera.camera_id}
              />

              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  padding: "8px 12px",
                  // background:
                  //   "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              ></Box>

              {isHovered && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "rgba(0,0,0,0.3)",
                    opacity: 1,
                    transition: "opacity 0.3s ease",
                  }}
                ></Box>
              )}
            </>
          ) : (
            <Box
              sx={{
                height: "100%",
                aspectRatio: "4 / 3",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "#757575",
                bgcolor: "white",
                px: 1,
                textAlign: "center",
              }}
            >
              <CameraAltOutlinedIcon
                sx={{ fontSize: { xs: 20, sm: 30 }, mb: 0.5 }}
              />
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize: { xs: "0.65rem", sm: "0.85rem" },
                  fontSize: "clamp(0.65rem, 1.2vw, 1rem)",
                  maxWidth: "80%",
                  lineHeight: 1.2,
                  wordWrap: "break-word",
                  fontWeight: 500,
                }}
              >
                No Camera Selected
              </Typography>
            </Box>
          )}
        </Box>

        {/* Bottom dummy name area */}
        <Box
          sx={{
            // height: 36,
            bgcolor: isCameraAvailable ? "white" : "white",
            color: isCameraAvailable ? "#696969" : "#424242",
            px: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "#696969",
              fontSize: "clamp(0.65rem, 1.2vw, 1rem)",
              whiteSpace: "wrap",
              textOverflow: "ellipsis",
              overflowX: "auto",
              fontWeight:500
            }}

          >
            {isCameraAvailable ? camera.camera_name : "Camera Name"}
          </Typography>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default CameraCard;
