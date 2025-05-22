import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CameraCard from './CameraCard';
import { Box, useTheme } from '@mui/material';

const CARD_ASPECT_RATIO = 9 / 16; // height / width for 16:9
const CARD_GAP = 16; // px gap between cards (same as `gap={4}` = 32px = 2rem)

const CameraGrid = ({ cameras = [], onCameraClick, theme, searchCamera = '', columns = 4 }) => {
  console.log(cameras)
  // const filteredCameras = cameras.filter((camera) =>
  //   camera.camera_name.toLowerCase().includes(searchCamera.toLowerCase())
  // );

  const [placeholderCount, setPlaceholderCount] = useState(16);

  useEffect(() => {
    if (cameras.length === 0) {
      const updateCount = () => {
        const screenHeight = window.innerHeight;
        const screenWidth = window.innerWidth;
        const containerWidth = screenWidth * 0.9; // approximate usable width
        const cardWidth = containerWidth / columns;
        const cardHeight = cardWidth * CARD_ASPECT_RATIO;
        const totalVerticalSpace = screenHeight - 100; // subtract header or margin estimate
        const rows = Math.floor(totalVerticalSpace / (cardHeight + CARD_GAP));
        setPlaceholderCount(rows * columns);
      };

      updateCount();
      window.addEventListener('resize', updateCount);
      return () => window.removeEventListener('resize', updateCount);
    }
  }, [cameras.length, columns]);

  const camerasToRender = cameras.length > 0 ? cameras : Array.from({ length: placeholderCount });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        display="grid"
        gap={4}
        gridTemplateColumns={`repeat(${columns}, 1fr)`}
        sx={{
          width: '100%',
          '@media (max-width: 600px)': {
            gridTemplateColumns: `repeat(1, 1fr)`,
          },
        }}
      >
        {camerasToRender.map((camera, index) => (
          <motion.div
            key={camera?.camera_id || `placeholder-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            style={{ width: '100%' }}
          >
            <CameraCard
              camera={camera || null}
              onCameraClick={onCameraClick}
              theme={theme}
            />
          </motion.div>
        ))}
      </Box>
    </motion.div>
  );
};

export default CameraGrid;
