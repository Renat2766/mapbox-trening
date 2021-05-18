/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import ReactMapGl, {Marker, Popup} from 'react-map-gl'
import * as restaurantDate from './data/restaurants.json'
import {MdLocalBar} from 'react-icons/md'




function App() {
  const apiToken = 'pk.eyJ1IjoiZHVjZTIwMSIsImEiOiJja28xOHc2cmcwNjNlMm9seWVxdTl6MWMzIn0.2TccEnLb_8I_LxPfEqKjWg'
  const [viewport, setViewport] = useState({
    latitude: 55.7522,
    longitude: 37.6156,
    width: '100vw',
    height: '100vh',
    zoom: 10
  })
  const [selectedRest, setSeletedRest] = useState(null)

  useEffect(() => {
    const listener = e => {
      if(e.key === 'Escape'){
        setSeletedRest(null)
      }
    }
    window.addEventListener('keydown', listener)
  }, [])
  return (
    <div>
      <ReactMapGl 
      {...viewport} 
      mapboxApiAccessToken={apiToken}
      mapStyle="mapbox://styles/duce201/cko2kfdne1wx417onvm28roe3"
      onViewportChange={viewport => {
        setViewport(viewport)
      }}
      >
        {restaurantDate.features.map((restaur) => (
          <Marker key={restaur.properties.RESTAURANT_ID}
            latitude={restaur.geometry.coordinates[1]}
            longitude={restaur.geometry.coordinates[0]}
            >
            <button className="marker-btn"
            onClick={(e) => {
              e.preventDefault()
              setSeletedRest(restaur)
            }}
            >
              <MdLocalBar className="icon"/>
            </button>
          </Marker>
        )
        )}
        {selectedRest ? (
          <Popup 
          latitude={selectedRest.geometry.coordinates[1]} 
          longitude={selectedRest.geometry.coordinates[0]}
          onClose={() => {
            setSeletedRest(null)
          }}
          >
            <div>{selectedRest.properties.NAME}</div>
          </Popup>
        ) : null}
      </ReactMapGl>
    </div>
  );
}

export default App;
