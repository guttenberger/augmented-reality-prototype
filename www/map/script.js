class LatLngRepository {
  save(latlng) {
    let list = this.getAll();

    list.push(latlng);

    localStorage.setItem('positions', JSON.stringify(list));
  }

  removeAll() {
    localStorage.setItem('positions', "[]");
  }

  getAll() {
    return JSON.parse(localStorage.getItem('positions') || "[]");
  }
}

class MapCreator {
  map = L.map('mapid', { preferCanvas: true }).setView([52.520008, 13.404954], 10);
  markers = [];
  positionRepo = new LatLngRepository();
  positionMarker;

  init() {
    this.initMap();
    this.initMarkers();
  }

  zoomToCurrentPosition() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.map.setView([position.coords.latitude, position.coords.longitude], 18);
        this.addPositionMarker(L.latLng(position.coords.latitude, position.coords.longitude));
      }
    );
  }

  addPositionMarker(latlng) {
    if (this.positionMarker)
      this.map.removeLayer(this.positionMarker);

    this.positionMarker = L.circleMarker(latlng, {
      color: '#3388ff',
      radius: 4
    }).addTo(this.map);
  }

  onMapClick(e) {
    let marker = L.marker(e.latlng)
      .bindPopup(
        `<p> You clicked the map at ${e.latlng.toString()} </p>`
      ).openPopup()
      .addTo(this.map);

    this.positionRepo.save(e.latlng);
    this.markers.push(marker);
  }

  initMap() {
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.map);

    this.map.on('click', this.onMapClick.bind(this));
  }
  
  initMarkers() {
    let positions = this.positionRepo.getAll();

    for (let { lat, lng } of positions) {
      let marker = L.marker([lat, lng], { title: "Markierte Stelle" })
        .addTo(this.map);
  
      this.markers.push(marker);
    }
  }

  removeAllMarkers() {
    for (let marker of this.markers) {
      this.map.removeLayer(marker);
    }
  
    this.positionRepo.removeAll();
  }
}

void function main() {
  mymap = new MapCreator();
  mymap.init();
}();