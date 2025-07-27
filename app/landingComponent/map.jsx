"use client";
import { Component } from 'react';

class Map extends Component {
  componentDidMount() {
    // Make sure the SimpleMaps library is available
    if (typeof simplemaps_worldmap !== 'undefined') {
      simplemaps_worldmap.load();
    } else {
      // If not loaded yet, wait a bit and try again
      setTimeout(() => {
        if (typeof simplemaps_worldmap !== 'undefined') {
          simplemaps_worldmap.load();
        }
      }, 100);
    }
  }

  render() {
    return <div id="map"></div>;
  }
}

export default Map;