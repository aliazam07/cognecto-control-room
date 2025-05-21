// components/VideoPlayer/NativePlayer.jsx
import React, { useEffect, useRef, useState ,useCallback} from "react";
import { CircularProgress, Typography, Box } from "@mui/material";
import {OverlayLoader, ErrorBox} from './Overlay';
import SnapshotButton from "../SnapshotButton";
import { useCameraStatus } from "../context/CameraStatusContext";

const NativePlayer = ({ url,cameraId }) => {
  const { setCameraOnlineStatus } = useCameraStatus();
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const updateStatus = useCallback((status) => {
    setCameraOnlineStatus(cameraId, status);
  },
  [cameraId, setCameraOnlineStatus]
  );

  useEffect(() => {
    const video = videoRef.current;
    const handleLoaded = () => {
    updateStatus?.(true); // ✅ Set status to online
    setLoading(false)};
    const handleStreamError = () => {
      setError(true);
      updateStatus?.(false); // ❌ Set status to offline
      setLoading(false);
    };

    video.src = url;
    video.addEventListener("loadeddata", handleLoaded);
    video.addEventListener("error", handleStreamError);

    return () => {
      video.removeEventListener("loadeddata", handleLoaded);
      video.removeEventListener("error", handleStreamError);
    };
  }, []);

  return (
    <>
      {loading && (
        <OverlayLoader text="Loading stream..." />
      )}
      {error ? (
        <ErrorBox />
      ) : (
      <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
        <SnapshotButton videoRef={videoRef} />
        <video ref={videoRef} autoPlay muted controls playsInline style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </Box>
      )}
    </>
  );
};

export default NativePlayer;
