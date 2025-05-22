// components/VideoPlayer/HlsPlayer.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import Hls from "hls.js";
import { CircularProgress, Typography, Box } from "@mui/material";
import {OverlayLoader, ErrorBox} from './Overlay';
import SnapshotButton from "../SnapshotButton";
import { useCameraStatus } from "../context/CameraStatusContext";

const HlsPlayer = ({ cameraId }) => {
  const { setCameraOnlineStatus } = useCameraStatus();
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const url = `http://18.220.202.145/hls/${cameraId}.m3u8`
  console.log(url)

  const updateStatus = useCallback((status) => {
    setCameraOnlineStatus(cameraId, status);
  },
  [cameraId, setCameraOnlineStatus]
  );

  useEffect(() => {
  console.log("Mounting camera", cameraId, "with URL:", url);
  if (!videoRef.current) return;

  const video = videoRef.current;
  let hls;

  const handleLoaded = () => {
    console.log("Working fine for camera:", cameraId);
    updateStatus?.(true);
    setLoading(false);
  };

  const handleStreamError = (err) => {
    console.log("Stream error for camera:", cameraId, err);
    setError(true);
    setLoading(false);
    updateStatus?.(false);
  };
  if (cameraId === ""){
    handleStreamError()
  }
  if (Hls.isSupported()) {
    hls = new Hls({
      enableWorker: true,
      lowLatencyMode: true,
      liveSyncDurationCount: 3,
      maxBufferLength: 10,
      maxMaxBufferLength: 30,
    });

    hls.loadSource(url);
    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      // hls.currentLevel = 0;
      // hls.loadLevel = 0;
      // hls.nextLevel = 0;
      hls.startLevel = 0;

      console.log('Available Quality Levels:', hls.levels.map((l, i) => ({
        index: i,
        resolution: l.height,
        bitrate: l.bitrate
      })));
      handleLoaded()
      setLoading(false);
    });

    hls.on(Hls.Events.ERROR, (_, data) => {
      if (data.fatal) {
        // handleStreamError(data)
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            hls.startLoad();
            handleStreamError(data)
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            hls.recoverMediaError();
            handleStreamError(data)
            break;
          default:
            hls.destroy();
            handleStreamError(data);
            break;
        }
      }
    });
  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = url;
    video.addEventListener("loadedmetadata", handleLoaded);
    video.addEventListener("error", handleStreamError);
  } else {
    handleStreamError("HLS not supported");
  }

  return () => {
    if (hls) hls.destroy();
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
        <video
          ref={videoRef}
          autoPlay
          muted
          controls
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Box>
      )}
    </>
  );
};

export default HlsPlayer;
