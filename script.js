// ============================================================
// Interactive Web GIS of Pakistan
// Web GIS Applications (MET418) - Lab No. 3
// ============================================================

// -----------------------------
// 1. Create the Leaflet map
// -----------------------------
const map = L.map("map", {
  zoomControl: true
}).setView([30.5, 69.3], 5);

// -----------------------------
// 2. Basemaps
// -----------------------------
const osm = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }
);

const satellite = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    maxZoom: 19,
    attribution: "Tiles &copy; Esri"
  }
);

// Start with OpenStreetMap
osm.addTo(map);

// -----------------------------
// 3. Custom marker symbols
// -----------------------------
const cityIcon = L.divIcon({
  className: "",
  html: '<div class="city-marker">C</div>',
  iconSize: [26, 26],
  iconAnchor: [13, 13],
  popupAnchor: [0, -13]
});

const weatherIcon = L.divIcon({
  className: "",
  html: '<div class="weather-marker">W</div>',
  iconSize: [25, 25],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12]
});

// -----------------------------
// 4. City data
// -----------------------------
const cities = [
  {name:"Islamabad", province:"Islamabad Capital Territory", type:"Capital City", lat:33.6844, lon:73.0479},
  {name:"Lahore", province:"Punjab", type:"Major City", lat:31.5204, lon:74.3587},
  {name:"Karachi", province:"Sindh", type:"Major City", lat:24.8607, lon:67.0011},
  {name:"Peshawar", province:"Khyber Pakhtunkhwa", type:"Major City", lat:34.0151, lon:71.5249},
  {name:"Quetta", province:"Balochistan", type:"Provincial Capital", lat:30.1798, lon:66.9750},
  {name:"Multan", province:"Punjab", type:"Major City", lat:30.1575, lon:71.5249},
  {name:"Faisalabad", province:"Punjab", type:"Major City", lat:31.4504, lon:73.1350},
  {name:"Rawalpindi", province:"Punjab", type:"Major City", lat:33.5651, lon:73.0169},
  {name:"Gujranwala", province:"Punjab", type:"Major City", lat:32.1877, lon:74.1945},
  {name:"Sialkot", province:"Punjab", type:"Industrial City", lat:32.4945, lon:74.5229},
  {name:"Hyderabad", province:"Sindh", type:"Major City", lat:25.3960, lon:68.3578},
  {name:"Sukkur", province:"Sindh", type:"Regional City", lat:27.7244, lon:68.8228},
  {name:"Abbottabad", province:"Khyber Pakhtunkhwa", type:"Regional City", lat:34.1688, lon:73.2215},
  {name:"Bahawalpur", province:"Punjab", type:"Regional City", lat:29.3956, lon:71.6836},
  {name:"Gwadar", province:"Balochistan", type:"Coastal City", lat:25.1264, lon:62.3225}
];

// -----------------------------
// 5. Weather station data
// NOTE: Values are sample academic values,
// not live observations.
// -----------------------------
const weatherStations = [
  {name:"Islamabad Weather Station", city:"Islamabad", temp:27.0, rainfall:2.4, lat:33.6167, lon:73.1000},
  {name:"Lahore Weather Station", city:"Lahore", temp:31.0, rainfall:1.8, lat:31.5200, lon:74.4000},
  {name:"Karachi Weather Station", city:"Karachi", temp:29.0, rainfall:0.4, lat:24.9000, lon:67.1000},
  {name:"Peshawar Weather Station", city:"Peshawar", temp:30.0, rainfall:1.2, lat:34.0000, lon:71.5000},
  {name:"Quetta Weather Station", city:"Quetta", temp:24.0, rainfall:0.8, lat:30.2500, lon:66.9500},
  {name:"Multan Weather Station", city:"Multan", temp:34.0, rainfall:0.5, lat:30.2000, lon:71.4500},
  {name:"Faisalabad Weather Station", city:"Faisalabad", temp:32.0, rainfall:1.5, lat:31.4200, lon:73.1000},
  {name:"Rawalpindi Weather Station", city:"Rawalpindi", temp:28.0, rainfall:2.8, lat:33.6000, lon:73.0500},
  {name:"Gujranwala Weather Station", city:"Gujranwala", temp:30.0, rainfall:2.0, lat:32.1500, lon:74.2000},
  {name:"Sialkot Weather Station", city:"Sialkot", temp:29.0, rainfall:2.5, lat:32.5000, lon:74.5300},
  {name:"Hyderabad Weather Station", city:"Hyderabad", temp:31.0, rainfall:0.7, lat:25.4000, lon:68.3700},
  {name:"Sukkur Weather Station", city:"Sukkur", temp:33.0, rainfall:0.3, lat:27.7000, lon:68.8500},
  {name:"Abbottabad Weather Station", city:"Abbottabad", temp:23.0, rainfall:3.2, lat:34.1700, lon:73.2300},
  {name:"Bahawalpur Weather Station", city:"Bahawalpur", temp:33.0, rainfall:0.6, lat:29.4000, lon:71.6800},
  {name:"Gwadar Weather Station", city:"Gwadar", temp:28.0, rainfall:0.2, lat:25.1200, lon:62.3300}
];

// -----------------------------
// 6. Create layer groups
// -----------------------------
const cityLayer = L.layerGroup();
const weatherLayer = L.layerGroup();

// -----------------------------
// 7. Add city markers + popups
// -----------------------------
cities.forEach(city => {
  const marker = L.marker([city.lat, city.lon], {
    icon: cityIcon,
    title: city.name
  });

  marker.bindPopup(`
    <h3 class="popup-title">${city.name}</h3>
    <table class="popup-table">
      <tr><td>Name</td><td>${city.name}</td></tr>
      <tr><td>Province</td><td>${city.province}</td></tr>
      <tr><td>Type</td><td>${city.type}</td></tr>
      <tr><td>Latitude</td><td>${city.lat.toFixed(4)}</td></tr>
      <tr><td>Longitude</td><td>${city.lon.toFixed(4)}</td></tr>
    </table>
  `);

  marker.addTo(cityLayer);
});

// -----------------------------
// 8. Add weather markers + popups
// -----------------------------
weatherStations.forEach(station => {
  const marker = L.marker([station.lat, station.lon], {
    icon: weatherIcon,
    title: station.name
  });

  marker.bindPopup(`
    <h3 class="popup-title">${station.name}</h3>
    <table class="popup-table">
      <tr><td>Station</td><td>${station.name}</td></tr>
      <tr><td>City</td><td>${station.city}</td></tr>
      <tr><td>Temperature</td><td>${station.temp.toFixed(1)} °C</td></tr>
      <tr><td>Rainfall</td><td>${station.rainfall.toFixed(1)} mm</td></tr>
      <tr><td>Latitude</td><td>${station.lat.toFixed(4)}</td></tr>
      <tr><td>Longitude</td><td>${station.lon.toFixed(4)}</td></tr>
    </table>
  `);

  marker.addTo(weatherLayer);
});

// Turn both thematic layers on initially
cityLayer.addTo(map);
weatherLayer.addTo(map);

// -----------------------------
// 9. Layer control
// -----------------------------
const baseMaps = {
  "OpenStreetMap": osm,
  "Satellite Imagery": satellite
};

const overlayMaps = {
  "Cities (15)": cityLayer,
  "Weather Stations (15)": weatherLayer
};

L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(map);

// -----------------------------
// 10. Scale bar
// -----------------------------
L.control.scale({
  imperial: false,
  metric: true
}).addTo(map);

// -----------------------------
// 11. Optional: fit map to Pakistan
// -----------------------------
const pakistanBounds = [
  [23.5, 60.8],
  [37.2, 77.2]
];

map.fitBounds(pakistanBounds, {
  padding: [10, 10]
});
