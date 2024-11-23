import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, LoadScript, HeatmapLayer } from "@react-google-maps/api";

const mapContainerStyle = {
  height: "500px",
  width: "100%",
};

const center = {
  lat: 9.9281, // San José, Costa Rica
  lng: -84.0907,
};

const HeatMap = () => {
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    if (window.google && window.google.maps) {
      const data = [
        new window.google.maps.LatLng(9.9285, -84.0912),
        new window.google.maps.LatLng(9.9270, -84.0907),
        new window.google.maps.LatLng(9.9289, -84.0889),
        { location: new window.google.maps.LatLng(9.9300, -84.0920), weight: 5 },
        { location: new window.google.maps.LatLng(9.9265, -84.0890), weight: 3 },
      ];
      console.log("Heatmap Data:", data);
      setHeatmapData(data);
    } else {
      console.error("Google Maps API not loaded.");
    }
  }, []);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
      >
        {heatmapData.length > 0 && (
          <HeatmapLayer
            data={heatmapData}
            options={{
              radius: 30, // Adjust for better visibility
              opacity: 0.8, // Set opacity
              gradient: [
                "rgba(0, 255, 255, 0)",
                "rgba(0, 255, 255, 1)",
                "rgba(0, 191, 255, 1)",
                "rgba(0, 127, 255, 1)",
                "rgba(0, 63, 255, 1)",
                "rgba(0, 0, 255, 1)",
                "rgba(63, 0, 255, 1)",
                "rgba(127, 0, 255, 1)",
                "rgba(191, 0, 255, 1)",
                "rgba(255, 0, 255, 1)",
                "rgba(255, 0, 191, 1)",
                "rgba(255, 0, 127, 1)",
                "rgba(255, 0, 63, 1)",
                "rgba(255, 0, 0, 1)",
              ],
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default HeatMap;
