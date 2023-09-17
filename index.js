// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;


async function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lng: -80.1, lat: 25.9 },
    zoom: 12,
    mapId: "MAPMAP"
  });
  //infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");


  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          
        },
      );
    } else {
      // Browser doesn't support Geolocation
      //handleLocationError(false, infoWindow, map.getCenter());
    }
  });
    var response = await fetch("https://discount-hub-api-ftp53nna7a-uc.a.run.app/nearby?loc=25.9107681%20-80.1418737&r=100000");
  const discounts = await response.json();

  discounts.forEach(function (d) {
    console.log(d)
    var arr = d["location"].split(" ")
    var positon = new google.maps.LatLng(arr[0], arr[1])

    console.log(positon)

    var priceTag = document.createElement("div");

    priceTag.className = "price-tag";
    priceTag.textContent = d["amount"];

    new AdvancedMarkerElement({
    map,
    position: positon,
    content: priceTag,
    });

    var sidebar = document.getElementById("sidebar");
    var infoPanel = document.createElement("div");
    sidebar.appendChild(infoPanel);

    if (d["description"] == null) {
      d["description"] = ""
    }

    infoPanel.innerHTML = `<h1>${d["title"]} | ${d["amount"]}</h1><p>${d["description"]}</p><p><b>Must be a ${d["requirement"]}.</b></p>`





});

}

window.initMap = initMap;


