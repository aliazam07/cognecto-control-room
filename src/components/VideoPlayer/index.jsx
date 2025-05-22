import React,{useState} from "react";
import { Box } from "@mui/material";
import HlsPlayer from "./HlsPlayer";
import DashPlayer from "./DashPlayer";
import NativePlayer from "./NativePlayer";
import WebRTCPlayer from "./WebRTCPlayer";

const getStreamType = (url) => {
  if (!url) return null;
  if (url.includes(".m3u8")) return "hls";
  if (url.includes(".mpd")) return "dash";
  if (url.includes(".mp4") || url.startsWith("http")) return "native";
  if (url.startsWith("webrtc://") || url.includes("rtc")) return "webrtc";
  return "unknown";
};

const VideoPlayer = ({  cameraId}) => {
  // const streamType = getStreamType(hslUrl);

  return (
    <Box sx={{ position: "relative", height: "100%", bgcolor: "black" }}>

      {/* {streamType === "hls" && ( */}
        <HlsPlayer  cameraId={cameraId}/>
      {/* )} */}
      {/* {streamType === "dash" && <DashPlayer url={hslUrl} cameraId={cameraId} />}
      {streamType === "native" && <NativePlayer url={hslUrl} cameraId={cameraId}/>}
      {streamType === "webrtc" && <WebRTCPlayer url={hslUrl} cameraId={cameraId}/>}
      {streamType === "unknown" && <div>Unsupported stream type</div>} */}
    </Box>
  );
};

export default VideoPlayer;
