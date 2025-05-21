// components/VideoPlayer/DashPlayer.jsx
import React, { useEffect, useRef, useState,useCallback } from "react";
import * as dashjs from "dashjs";
import { CircularProgress, Typography, Box } from "@mui/material";
import {OverlayLoader, ErrorBox} from './Overlay';
import SnapshotButton from "../SnapshotButton";
import { useCameraStatus } from "../context/CameraStatusContext";

const DashPlayer = ({ url,cameraId }) => {
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
    const player = dashjs.MediaPlayer().create();

    player.updateSettings({
      streaming: {
        abr: {
          autoSwitchBitrate: { video: true },
          initialBitrate: { video: 300 },
        },
      },
    });

    player.initialize(video, url, true);
    player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () =>{ 
      updateStatus?.(true); // ✅ Set status to online
      setLoading(false);
      
    });
    player.on(dashjs.MediaPlayer.events.ERROR, () => {
      setError(true);
      setLoading(false);
      updateStatus?.(false); // ❌ Set status to offline
    });

    return () => player.reset();
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

export default DashPlayer;
