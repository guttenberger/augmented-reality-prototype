var mymap = L.map('mapid').setView([52.520008, 13.404954], 10);
var markers = [];

function initMap() {

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
  }).addTo(mymap);

  var popup = L.popup();

  function onMapClick(e) {
    var markerId = JSON.stringify(e.latlng);

    L.marker(e.latlng)
      .bindPopup(
        `<p> You clicked the map at ${e.latlng.toString()} </p>`
      ).openPopup()
      .addTo(mymap);

    saveLatLng(e.latlng);
    
    console.log(localStorage.getItem("position"))
  }

  mymap.on('click', onMapClick);
}

function initMarkers() {
  let positions = getAllLatLng();

  console.log(positions);

  for (let { lat, lng } of positions) {
    var marker = L.marker([lat, lng], { title: "Markierte Stelle" })
      .addTo(mymap);

    markers.push(marker);
  }
}

function removeAllMarkers() {

  for(let marker of markers) {
    mymap.removeLayer(marker);
  }

  localStorage.clear();
}


function saveLatLng(latlng) {
  var list = getAllLatLng();

  list.push(latlng);

  localStorage.setItem('positions', JSON.stringify(list));
}

function removeLatLng(latlng) {
  var list = getAllLatLng();

  var index = list.indexOf(latlng);
  list.slice(index, 1);

  localStorage.setItem('positions', JSON.stringify(list));
}

function getAllLatLng() {
  return JSON.parse(localStorage.getItem('positions') || "[]");
}

(function main() {
  initMap();
  initMarkers();
})();