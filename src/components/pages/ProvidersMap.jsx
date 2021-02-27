import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { useSelector, useDispatch } from "react-redux";

function Map() {
  const providersState = useSelector((state) => state.providersState);
  const [selected, setSelected] = useState(null);
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 37.430228143135366, lng: -122.08385467716393 }}
    >
      {providersState &&
        providersState.providers.map((provider) => (
          <Marker
            key={provider._id}
            position={{ lat: provider._geoloc.lat, lng: provider._geoloc.lng }}
            onClick={() => setSelected(provider)}
          />
        ))}
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
