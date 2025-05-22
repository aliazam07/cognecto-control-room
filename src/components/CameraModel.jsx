// src/components/CameraModal.jsx
import React from "react";
import { Modal, Box, Fade, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import VideoPlayer from "./VideoPlayer";

const CameraModal = ({ open, onClose, selectedCamera }) => {
  return (
    <Modal
      open={open}
      onClose={()=>onClose(false)}
      closeAfterTransition
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "85%",
            height: "85%",
            bgcolor: "black",
            boxShadow: 24,
            borderRadius: 2,
            outline: "none",
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ height: "100%" }}
          >
            <IconButton
              onClick={()=>onClose(false)}
              sx={{
                position: "absolute",
                top: 15,
                right: 15,
                color: "#696969",
                bgcolor: "rgba(255,255,255,0.5)",
                zIndex: 9999,
                "&:hover": {
                  bgcolor: "rgba(0,0,0,0.2)",
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s ease",
              }}
            >
              <CloseIcon />
            </IconButton>

            {selectedCamera && (
              <VideoPlayer
                cameraId = {selectedCamera.camera_id}
              />
            )}
          </motion.div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CameraModal;
