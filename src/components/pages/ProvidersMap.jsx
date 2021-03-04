import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

import { useSelector, useDispatch } from "react-redux";

function Map() {
  const providersState = useSelector((state) => state.providersState);
  const [selected, setSelected] = useState(null);
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    try {
      const newCenter = providersState.providers[0]._geoloc;
      setCenter(newCenter);
    } catch (e) {}
  }, [providersState]);

  const onMarkerClustererClick = (markerClusterer) => {
    const clickedMarkers = markerClusterer.getMarkers();
    console.log(`Current clicked markers length: ${clickedMarkers.length}`);
    console.log(clickedMarkers);
  };

  //TODO: deal with overlapping markers (marker cluster?) https://developers.google.com/maps/documentation/javascript/marker-clustering
  return (
    <GoogleMap defaultZoom={10} center={center}>
      <MarkerClusterer
        onClick={() => onMarkerClustererClick}
        averageCenter
        enableRetinaIcons
        gridSize={5}
      >
        {providersState &&
          providersState.providers.map((provider) => (
            <Marker
              key={provider._id}
              position={{
                lat: provider._geoloc.lat,
                lng: provider._geoloc.lng,
              }}
              onClick={() => setSelected(provider)}
              label={provider.index.toString()}
            />
          ))}
      </MarkerClusterer>
      {selected && (
        <InfoWindow
          position={{ lat: selected._geoloc.lat, lng: selected._geoloc.lng }}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div style={{ color: "black" }}>
            <h4>{selected.name}</h4>
            <p>{selected.specialty}</p>
            <p>{selected.description}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function ProvidersMap() {
  const googleMapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_APIKEY}`;
  return (
    <div>
      <WrappedMap
        googleMapURL={`${googleMapURL}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
