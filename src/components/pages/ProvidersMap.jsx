import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

function Map() {
  return <GoogleMap defaultZoom={10} defaultCenter={{ lat: 45, lng: -75 }} />;
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
