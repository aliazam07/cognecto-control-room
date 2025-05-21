// context/CameraStatusContext.js
import { createContext, useContext, useState, useEffect } from "react";

const CameraStatusContext = createContext();

export const CameraStatusProvider = ({ children }) => {
  const [cameraStatusMap, setCameraStatusMap] = useState({}); // key = cameraId or title

  const setCameraOnlineStatus = (key, status) => {
    console.log("setCameraOnlineStatus called", { key, status });
    setCameraStatusMap(prev => ({
      ...prev,
      [key]: status,
    }));
  };
  useEffect(() => {
    console.log("Current cameraStatusMap:", cameraStatusMap);
  }, [cameraStatusMap]);

  return (
    <CameraStatusContext.Provider value={{ cameraStatusMap, setCameraOnlineStatus }}>
      {children}
    </CameraStatusContext.Provider>
  );
};

export const useCameraStatus = () => useContext(CameraStatusContext);
