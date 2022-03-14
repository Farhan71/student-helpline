import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '350px',
  height: '350px'
};

const center = {
  lat: 22.79184,
  lng: 91.103046
};

function Map() {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyA9qImOQ1bGsT2kyMQFZ7NENQAPiCaYqG0"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Map)