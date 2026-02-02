import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Don't forget the Leaflet CSS
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Center the map on the approximate location from your image (Addis Ababa, Ethiopia)
const initialCenter = [9.071741, 38.4988255]; // [lat, lng]

const OpenMapComponent = () => {
  return (
    // MapContainer requires a defined height/width (via CSS or inline style)
    <MapContainer
      center={initialCenter}
      zoom={11}
      scrollWheelZoom={false}
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Add a marker for the "Abinet" location */}
      <Marker position={initialCenter}>
        <Popup>
          This is an approximate location <br /> based on your image.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default OpenMapComponent;
