import React from "react";
import { Box, CircularProgress } from "@mui/material";
import CityList from "./Sidebar/CityList";

const SidebarContainer = ({
  loading,
  cities,
  districts,
  places,
  cameras,
  expandedCities,
  expandedDistricts,
  expandedPlaces,
  hoverColor,
  searchCity,
  handleCityClick,
  handleDistrictClick,
  handlePlaceClick,
  setSelectedPlace,
  theme,
}) => {
  return loading ? (
    <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
      <CircularProgress size={30} />
    </Box>
  ) : (
    <CityList
      cities={cities}
      districts={districts}
      places={places}
      cameras={cameras}
      expandedCities={expandedCities}
      expandedDistricts={expandedDistricts}
      expandedPlaces={expandedPlaces}
      hoverColor={hoverColor}
      searchCity={searchCity}
      handleCityClick={handleCityClick}
      handleDistrictClick={handleDistrictClick}
      handlePlaceClick={handlePlaceClick}
      setSelectedPlace={setSelectedPlace}
      theme={theme}
    />
  );
};

export default SidebarContainer;
