// src/api/index.ts
import axios from 'axios';
import {
  fallbackData
} from '../data/fallBackData';

const API_BASE = 'https://your-backend-api.com';

export const fetchData = async () => {
  try {
    const res = await axios.get(`${API_BASE}/get-data`);
    return res.data;
  } catch {
    console.warn('API failed, using fallback cities');
    return fallbackData;
  }
};


// export const getCameras = async (placeId: number) => {
//   try {
//     const res = await axios.post(`${API_BASE}/cameras`,placeId);
//     return res.data;
//   } catch {
//     console.warn(`API failed, using fallback cameras for place ${placeId}`);
//     return fallbackCameras.filter(camera => camera.placeId === placeId);
//   }
// };


// Socket reference should be globally accessible or passed as a parameter
// export const getCameras = (socket, placeId: number) => {
//   return new Promise((resolve) => {
//     socket.emit('get_cameras', { placeId });

//     const timeout = setTimeout(() => {
//       console.warn('Socket response timeout, using fallback data.');
//       const fallback = fallbackCameras.filter(camera => camera.placeId === placeId);
//       resolve(fallback);
//     }, 2000); // fallback after 5s

//     socket.once('camera_response', (data) => {
//       clearTimeout(timeout);

//       if (data && data.placeId === placeId) {
//         resolve(data.cameras);
//       } else {
//         console.warn('Invalid or mismatched data, using fallback.');
//         const fallback = fallbackCameras.filter(camera => camera.placeId === placeId);
//         resolve(fallback);
//       }
//     });
//   });
// };
