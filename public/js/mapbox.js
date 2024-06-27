const locations = JSON.parse(document.getElementById("map").dataset.locations);

mapboxgl.accessToken = process.env.MAP_TOKEN;

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
});
