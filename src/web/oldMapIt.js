import React from 'react';
import { Map, TileLayer, LayersControl } from 'react-leaflet'
import GoogleLayer from './GoogleLayer'
const { BaseLayer} = LayersControl;
const key = 'AIzaSyBqK4f8zbMrK4K5cxWb8_10Zkbk7LHMrKE';
const terrain = 'TERRAIN';
const road = 'ROADMAP';
const satellite = 'SATELLITE';
const hydrid = 'HYBRID';
//// Google's map type. Valid values are 'roadmap', 'satellite' or 'terrain'. 'hybrid' is not really supported.

export default class MapIt extends React.Component {

   constructor(props) {
        super(props)
    }

  render() {
    return (
      <Map center={[42.09618442380296, -71.5045166015625]} zoom={2} zoomControl={true} className="map">
        <LayersControl position='topright'>
          <BaseLayer  name='OpenStreetMap.Mapnik'>
            <TileLayer  url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"/>
          </BaseLayer>
         <BaseLayer checked name='Google Maps Roads'>
            <GoogleLayer googlekey={key}  maptype={road} />
          </BaseLayer>
         <BaseLayer  name='Google Maps Terrain'>
            <GoogleLayer googlekey={key}  maptype={terrain} />
          </BaseLayer>
           <BaseLayer  name='Google Maps Satellite'>
            <GoogleLayer googlekey={key}  maptype={satellite} />
          </BaseLayer>
            <BaseLayer  name='Google Maps Hydrid'>
            <GoogleLayer googlekey={key}  maptype={hydrid}  libraries={['geometry', 'places']} />
          </BaseLayer>
          <BaseLayer  name='Google Maps with Libraries'>
            <GoogleLayer googlekey={key}  maptype={hydrid}  libraries={['geometry', 'places']} />
          </BaseLayer>
        </LayersControl>
      </Map>
    )
  }
}
