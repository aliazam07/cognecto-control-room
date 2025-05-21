import React, { useState, useEffect,useContext } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
//   Modal,
  IconButton,
  CircularProgress,
  Collapse,
//   Badge,
  Tooltip,
  Fade,
  useTheme,
  useMediaQuery,
  Divider,
//   TextField,
//   InputAdornment,
//   Button, ButtonGroup
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import WindowOutlinedIcon from '@mui/icons-material/WindowOutlined'; // 2-col
import GridOnOutlinedIcon from '@mui/icons-material/GridOnOutlined'; // 4-col
import GridViewIcon from '@mui/icons-material/GridView'; // default (4-col)
// import CloseIcon from "@mui/icons-material/Close";
// import SearchIcon from "@mui/icons-material/Search";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import VideocamIcon from "@mui/icons-material/Videocam";
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import CameraAltIcon from "@mui/icons-material/CameraAlt";
// import DarkModeIcon from "@mui/icons-material/DarkMode";
// import LightModeIcon from "@mui/icons-material/LightMode";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
import { motion } from "framer-motion";
// import VideoPlayer from "./components/VideoPlayer/index";
import CameraGrid from "./components/CameraGrid";
import { fetchData } from './api/index.ts';
// import { socket } from "./api/socket.ts";
import ThemeContext from "./theme/ThemeContext.jsx";
import CameraModal from './components/CameraModel.jsx'
// import CameraCard from "./components/CameraCard.jsx";
import { useCameraStatus } from "./components/context/CameraStatusContext.js";

function Main() {
  const { cameraStatusMap } = useCameraStatus();
  const drawerWidth = 260;
  const [cities, setCities] = useState([]);
  const [allData, setAllData] = useState([]);
  const [expandedCities, setExpandedCities] = useState(null);
  const [expandedDistricts, setExpandedDistricts] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [loading, setLoading] = useState(true);
  const { darkMode, setDarkMode } = useContext(ThemeContext); // ✅ Correct
  const [expandedCamera, setExpandedCamera] = useState(null);
  const [expandedPlaces, setExpandedPlaces] = useState(null);
  const [searchCity, setSearchCity] = useState("");
  const [searchCamera, setSearchCamera] = useState("");

//   const [districts, setDistricts] = useState([]);
//   const [places, setPlaces] = useState([]);
  const [cameras, setCameras] = useState([]);

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [columnCount, setColumnCount] = useState(3);

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const hoverColor = darkMode
    ? "rgba(255,255,255,0.08)"
    : "rgba(63, 81, 181, 0.08)";
  const cameraHoverColor = darkMode
    ? "rgba(255,255,255,0.1)"
    : "rgba(63, 81, 181, 0.1)";


  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     getCities().then(setCities);
  //     setLoading(false);
  //     // Auto-expand the first city on load
  //     if (cities.length > 0) {
  //       setExpandedCities({ [cities[0].id]: true });
  //     }
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, [cities]);

  useEffect(() => {
  const timer = setTimeout(async () => {
    const data = await fetchData();
    setAllData(data);
    setCities(data); // if you only need name/id here
    setLoading(false);
    if (data.length > 0) {
      setExpandedCities({ [data[0].id]: true });
    }
  }, 1000);

  return () => clearTimeout(timer);
}, []);


  const iconStyle = (active) => ({
    backgroundColor: active ? '#1F60C01F' : 'transparent',
    color: active ? '#1F60C0' : 'primary.main',
    boxShadow: active ? '#1F60C01F' : 'none',
    // border: '1px solid',
    borderColor: 'primary.main',
    mr: 1,
    borderRadius:"6px",
    '&:hover': {
      backgroundColor: active ? '#1F60C0' : 'rgba(25, 118, 210, 0.04)',
      color: active ? 'white' : '#1F60C0',
    },
  });

  const handleCityClick = (cityId) => {
  setSelectedCity(cityId);
  setExpandedCities(prev => (prev === cityId ? null : cityId));
  setExpandedDistricts(null);
  setExpandedPlaces(null);
  setSelectedPlace(null);
};

  const handleDistrictClick = (districtId) => {
  setSelectedDistrict(districtId);
  setExpandedDistricts(prev => (prev === districtId ? null : districtId));
  setExpandedPlaces(null);
};

  const handlePlaceClick = (placeId) => {
  const city = allData.find(city => city.id === selectedCity);
  const district = city?.districts.find(d => d.id === selectedDistrict);
  const place = district?.places.find(p => p.id === placeId);
  
  if (place) {
    setCameras(place.cameras);
  }
  setExpandedPlaces(prev => (prev === placeId ? null : placeId));
};

  const handlePlaceExpand = (CameraId) => {
  const city = allData.find(city => city.id === selectedCity);
  const district = city?.districts.find(d => d.id === selectedDistrict);
  const place = district?.places.find(p => p.id === selectedPlace);
  const camera = place?.camera.find(p => p.id === selectedCamera);
  if (camera) {
    setCameras(cameras);
  }
  setExpandedCamera(CameraId);
};



  const handleCameraClick = (camera) => {
    
    setSelectedCamera(camera);
    setModalOpen(true);
    handlePlaceExpand(camera)
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
  <>
  <CssBaseline />
  <AppBar
    position="fixed"
    sx={{
      width: '100%',
      bgcolor: "#F9FAFB",
      transition: "background-color 0.3s ease",
      boxShadow: "none",
      zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure AppBar is above Drawer
      
      
    }}
  >
    <Toolbar 
      sx={{
       display: "flex", 
       justifyContent: "space-between" ,
       height: {
        xs: '56px',
        sm: '64px',
        md: '72px',
      },
      }}
    >
      {/* Left Section: Logo */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 , width:{md: '235px',   // >=900px
          lg: '275px',   // >=1200px (Full HD)
          xl: '315px'},}}>
        <CameraAltOutlinedIcon
          sx={{
            color: darkMode ? "#ffffff" : "#1F60C0",
            fontSize: "1.5rem",
          }}
        />
        <Typography
          sx={{
            color: darkMode ? "#ffffff" : "#1F60C0",
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          Cognecto
        </Typography>
        
        
      </Box>
      {!isMobile && (<Divider orientation="vertical" flexItem />)}
      {!isMobile && (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent:'space-between',flexGrow:1 }}>
      {/* Center Section (Live Streaming) - Hidden on mobile */}
      
        <Box sx={{ display: "flex", alignItems: "center", gap: 1,ml:2 }}>
          <svg width="32" height="32" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M31.7001 6.30659C31.4855 6.22314 31.247 6.22314 31.0205 6.30659L8.4276 14.8788L31.3663 23.8921L54.3049 14.8788L31.7001 6.30659ZM6.56771 45.3166C6.56771 45.7101 6.81808 46.0677 7.18768 46.2108L28.5049 54.2942V28.9233L6.56771 20.3035V45.3166ZM34.2276 54.2942L55.5448 46.2108C55.9144 46.0677 56.1648 45.7101 56.1648 45.3166V20.3035L34.2276 28.9233V54.2942ZM28.9937 0.965369C30.5198 0.381173 32.2008 0.381173 33.7269 0.965369L57.5716 10.0145C60.1707 10.9921 61.8875 13.4719 61.8875 16.2499V45.3166C61.8875 48.0945 60.1707 50.5744 57.5836 51.5639L33.7388 60.613C32.2127 61.1972 30.5317 61.1972 29.0056 60.613L5.16087 51.5639C2.56179 50.5744 0.844971 48.0945 0.844971 45.3166V16.2499C0.844971 13.4719 2.56179 10.9921 5.14895 10.0025L28.9937 0.953447V0.965369Z" fill="#696969"/>
          </svg>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#696969", fontSize: "1.5rem" }}
          >
            Live Streaming
          </Typography>
        </Box>
      

      {/* Right Section (Grid Switcher or Hamburger) */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        
          <>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#696969", fontSize: "1rem", mr: 1 }}
            >
              Grid:
            </Typography>
            <Tooltip title="2 Columns">
              <IconButton onClick={() => setColumnCount(2)} sx={iconStyle(columnCount === 2)}>
                <WindowOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="3 Columns">
              <IconButton onClick={() => setColumnCount(3)} sx={iconStyle(columnCount === 3)}>
                <GridOnOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="4 Columns">
              <IconButton onClick={() => setColumnCount(4)} sx={iconStyle(columnCount === 4)}>
                <GridViewIcon />
              </IconButton>
            </Tooltip>
          </>

        
      </Box>
      </Box>
      )}
      {isMobile && (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent:'space-between' }}>
        <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
        {open ? <CloseRoundedIcon sx={{ color: '#1F60C0' }}  />:(
          <MenuIcon sx={{ color: '#1F60C0' }} />
        )}
        </IconButton>
      </Box>)}
    </Toolbar>
  </AppBar>

  {/* Main layout area */}
  <Box sx={{ display: "flex" }}>
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? open : true}
      onClose={handleDrawerToggle}
      sx={{
        width: {md: '260px',
          lg: '300px',   
          xl: '340px',},
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          top: {
              xs: '56px',
              sm: '64px',
              md: '72px',
            },
            height: {
              xs: 'calc(100vh - 56px)',
              sm: 'calc(100vh - 64px)',
              md: 'calc(100vh - 72px)',
            },
          width:isMobile? `calc(100% - 100px)`: {md: '260px',   
          lg: '300px',   
          xl: '340px',},
          boxSizing: "border-box",
          overflowY: "scroll",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
          zIndex: isMobile ? 1300 : "auto",
          backgroundImage: darkMode
            ? "linear-gradient(rgba(26, 26, 46, 0.9), rgba(26, 26, 46, 0.9))"
            : "linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9))",
          borderRight: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
        },
      }}
    >
          

          {/* <Divider /> */}

          <Box sx={{ p: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: "bold",
                color : darkMode
                ? "linear-gradient(rgba(26, 26, 46, 0.9), rgba(26, 26, 46, 0.9))"
                : "primary.main",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {/* <LocationOnIcon fontSize="small"/> */}
              LOCATIONS
            </Typography>
          </Box>

          {/* <Box sx={{ px: 2, py: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Search cities..."
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: darkMode
                ? "linear-gradient(rgba(26, 26, 46, 0.9), rgba(26, 26, 46, 0.9))"
                : "linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9))",
                  borderRadius: 2,
                },
              }}
            />
          </Box> */}


          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress size={30} />
            </Box>
          ) : (
            <List
              sx={{
                "& .MuiListItemButton-root:hover": { bgcolor: hoverColor },
              }}
            >
              {cities?.filter((city) =>
                  city.name.toLowerCase().includes(searchCity.toLowerCase())
                ).map((city) => (
                <motion.div
                  key={city?.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                      handleCityClick(city?.id)
                      }}
                      sx={{
                        color: expandedCities=== city?.id
                          ? `#1f60c0`: "",
                        transition: "all 0.2s ease",
                        marginRight:"7%",
                      }}
                    > <Box display="flex" alignItems="center" gap={1}>
                        <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="9.82401" cy="9.57813" r="8.40367" stroke="#1F60C0" stroke-width="1.86748"/>
                          <circle cx="9.82403" cy="9.57811" r="1.86748" fill="#1F60C0"/>
                        </svg>
  
                        <ListItemText
                          primary={city.name}
                          // primaryTypographyProps={{
                          //   fontWeight: expandedCities=== city?.id
                          //     ? "bold"
                          //     : "regular",
                          // }}
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ ml: 'auto', pr: 2 }}
                      >
                        ({city?.districts?.length || 0})
                      </Typography> 
                      {expandedCities=== city?.id ? (
                        <RemoveOutlinedIcon color="primary" /> //color="secondary" change colour if need
                      ) : (
                        <AddOutlinedIcon />
                      )}
                      
                    </ListItemButton>
                  </ListItem>

                  <Collapse
                    in={expandedCities=== city?.id }
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {city?.districts?.map((district) => (
                        <motion.div
                          key={district?.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ListItem disablePadding>
                            <ListItemButton
                              sx={{
                                pl: 2,
                                ml: 1,
                                marginRight:"7%",
                                color: expandedDistricts=== district?.id 
                                  ? `#1f60c0`
                                  : "",
                                transition: "all 0.2s ease",
                              }}
                              onClick={() => {
                              handleDistrictClick(district?.id);}}
                            >
                            <Box display="flex" alignItems="center" gap={1}>
                            <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M21.5141 17.4122C21.5141 17.8557 21.269 18.2409 20.8955 18.4393L11.6748 23.6216C11.4881 23.7617 11.2546 23.8317 11.0095 23.8317C10.7644 23.8317 10.531 23.7617 10.3442 23.6216L1.12355 18.4393C0.93643 18.341 0.779832 18.1933 0.670773 18.0122C0.561713 17.8311 0.504361 17.6236 0.504948 17.4122V6.90763C0.504948 6.4641 0.750055 6.07893 1.12355 5.88051L10.3442 0.698251C10.531 0.55819 10.7644 0.488159 11.0095 0.488159C11.2546 0.488159 11.4881 0.55819 11.6748 0.698251L20.8955 5.88051C21.269 6.07893 21.5141 6.4641 21.5141 6.90763V17.4122ZM11.0095 2.99759L4.05316 6.90763L11.0095 10.8177L17.9659 6.90763L11.0095 2.99759ZM2.8393 16.7236L9.84236 20.6686V12.8369L2.8393 8.9035V16.7236ZM19.1798 16.7236V8.9035L12.1767 12.8369V20.6686L19.1798 16.7236Z" fill="#1F60C0"/>
                            </svg>
                            <ListItemText
                                primary={district?.name}
                                // primaryTypographyProps={{
                                //   fontWeight: expandedDistricts=== district?.id 
                                //     ? "bold"
                                //     : "regular",
                                // }}
                              />
                              <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ ml: 'auto', pr: 2 }}
                                      >
                                        ({district.places?.length || 0})
                                      </Typography>
                            </Box>
                              
                              {expandedDistricts=== district?.id  ? (
                                <RemoveOutlinedIcon color="primary"  /> //color="secondary" change colour if need
                              ) : (
                                <AddOutlinedIcon />
                              )}
                            </ListItemButton>
                          </ListItem>

                          <Collapse
                            in={expandedDistricts=== district?.id }
                            timeout="auto"
                            unmountOnExit
                          >
                            <List component="div" disablePadding>
                              {district?.places?.map((place) => (
                                <motion.div
                                  key={place?.id}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <ListItem disablePadding>
                                    <ListItemButton
                                      sx={{
                                        pl: 3,
                                        ml: 2,
                                        marginRight:"7%",
                                        background: expandedPlaces=== place?.id 
                                          ? `#9ABCEE`
                                          : "",
                                        borderRadius: expandedPlaces=== place?.id 
                                          ? `6px`
                                          : "",
                                      }}
                                      onClick={() => {
                                        handlePlaceClick(place?.id);
                                        setSelectedPlace(place);
                                      }}
                                    >
                                      <Box display="flex" alignItems="center" gap={1}>
                                      <img src="./images/placesIcon.png" alt="place" width={20} height={20} />
                                      <ListItemText
                                        primary={place?.name}
                                        // primaryTypographyProps={{
                                        //   fontWeight:expandedPlaces=== place?.id 
                                        //     ? "bold"
                                        //     : "regular",
                                        // }
                                        // }
                                      />
                                      </Box>
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ ml: 'auto', pr: 2 }}
                                      >
                                        ({place?.cameras?.length || 0})
                                      </Typography>

                                      {expandedPlaces=== place?.id  ? (
                                        <RemoveOutlinedIcon  /> //color="secondary" change colour if need
                                      ) : (
                                        <AddOutlinedIcon />
                                      )}

                                    </ListItemButton>
                                  </ListItem>
                                  <Collapse
                                    in={expandedPlaces=== place?.id }
                                    timeout="auto"
                                    unmountOnExit
                                  >
                                  <List component="div" disablePadding>
                                    {place?.cameras?.map((camera) => (
                                      <motion.div
                                        key={camera?.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <ListItem disablePadding>
                                          <ListItemButton
                                            sx={{
                                              pl: 4,
                                              ml: 3,
                                              marginRight:"7%",
                                              // borderLeft: expandedPlaces=== place?.id 
                                              //   ? `4px solid ${theme.palette.warning.main}`
                                              //   : "4px solid transparent",
                                              // transition: "all 0.2s ease",
                                            }}
                                            onClick={() => {
                                              handleCameraClick(camera?.id);
                                              setSelectedCamera(camera);
                                            }}
                                          >
                                            <Box display="flex" alignItems="center" gap={1}>
                                            <img src="./images/placesIcon.png" alt="place" width={20} height={20} />
                                            <ListItemText
                                              primary={camera?.name}
                                              // primaryTypographyProps={{
                                              //   fontWeight:expandedCamera=== camera?.id 
                                              //     ? "bold"
                                              //     : "regular",
                                              // }}
                                            />
                                            
                                            </Box>
                                            <Box position="absolute" right="10%">  
                                              {cameraStatusMap?.[camera?.id] ? <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <ellipse cx="4.57032" cy="4.53402" rx="4.57032" ry="4.53402" transform="matrix(-1 0 0 1 9.7262 0.642578)" fill="#00C577"/>
                                                </svg>
                                                 : <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                   <ellipse cx="4.57032" cy="4.53402" rx="4.57032" ry="4.53402" transform="matrix(-1 0 0 1 9.14062 0.421875)" fill="#FF2F40"/>
                                                   </svg>
                                                   }
                                            </Box>

                                            </ListItemButton>
                                            
                                          </ListItem>
                                          
                                        </motion.div>
                                      ))}
                                    </List>
                                  </Collapse>
                                </motion.div>
                              ))}
                            </List>
                          </Collapse>
                        </motion.div>
                      ))}
                    </List>
                  </Collapse>
                </motion.div>
              ))}
            </List>
          )}
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: {
              xs: '6px',
              sm: '14px',
              md: '22px',
            },
            height: {
              xs: 'calc(100vh - 6px)',
              sm: 'calc(100vh - 14px)',
              md: 'calc(100vh - 22px)',
            },
            backgroundColor: "#FFF",
            overflow: "auto"
          }}
        >


          <Toolbar />

          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70vh",
                flexDirection: "column",
              }}
            >
              <CircularProgress size={50} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Loading surveillance system...
              </Typography>
            </Box>
          ) : selectedPlace ? (
            <Fade in={!!selectedPlace} timeout={800}>
              <Box>   
               
                {/* <Box            // Icon & Camera Name , Search Bar
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 3,
                    pb: 2,
                    borderBottom: 1,
                    borderColor: "divider",
                  }}
                >
                  <VideocamIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
                  <Typography variant="subtitle1" sx={{ flexGrow: 1, fontSize: '0.95rem' }}>
                    {selectedPlace.name} Surveillance
                  </Typography>
                  <Box sx={{ px: 1.5, py: 0.5 }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      placeholder="Search cameras..."
                      value={searchCamera}
                      onChange={(e) => setSearchCamera(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon color="action" fontSize="small" />
                          </InputAdornment>
                        ),
                        sx: {
                          fontSize: '0.85rem',
                          backgroundColor: darkMode
                            ? "linear-gradient(rgba(26, 26, 46, 0.9), rgba(26, 26, 46, 0.9))"
                            : "linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9))",
                          borderRadius: 1.5,
                          py: 0.2,
                          px: 1.5,
                        },
                      }}
                      inputProps={{ style: { fontSize: '0.85rem' } }}
                    />
                  </Box>
                </Box> */}

                <CameraGrid
                  cameras={cameras}
                  searchCamera={searchCamera}
                  onCameraClick={handleCameraClick}
                  theme={theme}
                  columns={columnCount}
                />
              </Box>
            </Fade>
          ) : (
            <Box 
            > 
             <CameraGrid
                cameras={cameras}
                searchCamera={searchCamera}
                onCameraClick={handleCameraClick}
                theme={theme}
                columns={columnCount}
              />
         
            </Box>
          )}
        </Box>
        <CameraModal open={modalOpen} onClose={setModalOpen} selectedCamera={selectedCamera}/>
      </Box>
      </>
  );
}
export default Main;
