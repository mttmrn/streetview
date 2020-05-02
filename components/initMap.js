import { useEffect } from "react";

export default function initMap([...coordinates]) {
  let location = { lat: coordinates[0], lng: coordinates[1] };

  let map = new google.maps.Map(document.getElementById("map"), {
    center: location,
    zoom: 10,
  });
  let panorama = new google.maps.StreetViewPanorama(
    document.getElementById("pano"),
    {
      position: location,
      pov: {
        heading: 34,
        pitch: 10,
        zoom: 0,
      },
    }
  );
  map.setStreetView(panorama);

  panorama.addListener("position_changed", function () {
    let newPos = panorama.getPosition();
    console.log(newPos.lat()); // newPos.lat() returns a number value
    // ! (this was in the index.js file and using hooks to get new coordinates like setLat(newPos.lat()),
    // ! but it was causing unlimited rerenders. Not 100% on what the reason was)
  });
}

// probably going to need to use redux or useContext if I want to do this correctly
// set the value of state to whatever panorama.addListener returns then pass that to index.js
