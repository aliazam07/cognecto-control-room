import axios from 'axios';

const API_BASE = 'https://your-backend-api.com';

// Fetch cameras via WebSocket
export const fetchData = (socket: any, asset_id: number): Promise<any> => {
  return new Promise((resolve) => {
    socket.emit('get_cameras', { asset_id });


    socket.once('camera_response', (data) => {
      if (data) {
        resolve(data);
      }
    });
  });
};

// Fetch camera via REST API
export const getCamera = async (asset_id: number): Promise<any> => {
  try {
    const res = await axios.post(`${API_BASE}/get-camera`, { asset_id });
    return res.data;
  } catch (error) {
    console.warn('API failed:', error);
    throw error; // ✅ THROW the error so fetchCameras enters catch block
  }
};

