// components/VideoPlayer/WebRTCPlayer.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import { CircularProgress, Typography, Box } from "@mui/material";
import {OverlayLoader, ErrorBox} from './Overlay';
import SnapshotButton from "../SnapshotButton";
import { useCameraStatus } from "../context/CameraStatusContext";

const WebRTCPlayer = ({ url,cameraId }) => {
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

    const pc = new RTCPeerConnection();
    const signalingUrl = url.startsWith("webrtc://")
      ? url.replace("webrtc://", "wss://")
      : url;
    const ws = new WebSocket(signalingUrl);


    ws.onopen = () => {
      const offer = pc.createOffer({ offerToReceiveVideo: true }).then((offer) => {
        pc.setLocalDescription(offer);
        ws.send(JSON.stringify({ offer }));
      });
    };

    ws.onmessage = async (message) => {
      const data = JSON.parse(message.data);
      if (data.answer) {
        await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
      } else if (data.candidate) {
        await pc.addIceCandidate(data.candidate);
      }
    };

    pc.ontrack = (event) => {
      video.srcObject = event.streams[0];
      updateStatus?.(true); // ✅ Set status to online
      setLoading(false);
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        ws.send(JSON.stringify({ candidate: event.candidate }));
      }
    };

    pc.onconnectionstatechange = () => {
      if (pc.connectionState === "failed" || pc.connectionState === "disconnected") {
        setError(true);
        updateStatus?.(false); // ❌ Set status to offline
      }
    };

    return () => {
      pc.close();
      ws.close();
    };
  }, []);

  return (
    <>
      {loading && (
        <OverlayLoader text="Connecting WebRTC..." />
      )}
      {error ? (
        <ErrorBox />
      ) : (
        <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
          <SnapshotButton videoRef={videoRef} />
          <video ref={videoRef} autoPlay muted playsInline controls style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </Box>
      )}
    </>
  );
};

export default WebRTCPlayer;
