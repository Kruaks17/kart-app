import React, {useEffect, useRef} from 'react';
import Mapbox from 'mapbox-gl';

let map = null;
let marker = null;

function Mapbox() {
    const mapElement= useRef(null);
    Mapbox.accessToken= process.env.MAPBOX_API_KEY;
     
useEffect(() =>{

    map = new Mapbox.Map({
        container: mapElement.current,
        style:'mapbox://styles/mapbox/streets-v11',
        center:[59.91412969508033, 10.751924829843674],
        zoom:10
    })

    map.on ('load', function(){
        map.addSource('places',{
            'type': 'geojson',
            'data':{
                'type': 'FeatureCollection',
                'features':[
                    {
                        "type": "FeatureCollection",
                        "features": [
                          {
                            "type": "Feature",
                            "properties": {
                                'description':
                                '<strong>Nydalen Bryggeri & Spiseri</strong>'
                            },
                            "geometry": {
                              "type": "Point",
                              "coordinates": [
                                10.764514803886414,
                                59.950057173315706
                              ]
                            }
                          },
                          {
                            "type": "Feature",
                            "properties": {
                                'description':
                                '<strong>Ringnes Bryggeri</strong>'
                            },
                            "geometry": {
                              "type": "Point",
                              "coordinates": [
                                10.759367644786835,
                                59.93014737149238
                              ]
                            }
                          },
                          {
                            "type": "Feature",
                            "properties": {
                                'description':
                                '<strong>Grünerløkka Brygghus</strong>'
                            },
                            "geometry": {
                              "type": "Point",
                              "coordinates": [
                                10.759362280368805,
                                59.92500507595949
                              ]
                            }
                          },
                          {
                            "type": "Feature",
                            "properties": {
                                'description':
                                '<strong>Schouskjelleren Mikrobryggeri'
                            },
                            "geometry": {
                              "type": "Point",
                              "coordinates": [
                                10.760209858417511,
                                59.91836299687466
                              ]
                            }
                          },
                          {
                            "type": "Feature",
                            "properties": {
                                'description':
                                '<strong>Crowbar og Bryggeri</strong>'
                            },
                            "geometry": {
                              "type": "Point",
                              "coordinates": [
                                10.753450691699982,
                                59.91719602601576
                              ]
                            }
                          },
                          {
                            "type": "Feature",
                            "properties": {
                                'description':
                                '<strong>Brygg</strong>'
                            },
                            "geometry": {
                              "type": "Point",
                              "coordinates": [
                                10.748679041862488,
                                59.913222908609164
                              ]
                            }
                          },
                          {
                            "type": "Feature",
                            "properties": {
                                'description':
                                '<strong>Amundsen Bryggeri & Spiseri</strong>'
                            },
                            "geometry": {
                              "type": "Point",
                              "coordinates": [
                                10.734806656837463,
                                59.91349452094963
                              ]
                            }
                          },
                          {
                            "type": "Feature",
                            "properties": {
                                'description':
                                '<strong>Røør</strong>'
                            },
                            "geometry": {
                              "type": "Point",
                              "coordinates": [
                                10.740471482276917,
                                59.91517860231149
                              ]
                            }
                          },
                          {
                            "type": "Feature",
                            "properties": {
                                'descritption':
                                '<strong>Oslo Mikrobryggeri</strong>'
                            },
                            "geometry": {
                              "type": "Point",
                              "coordinates": [
                                10.724122077226639,
                                59.9242691490841
                              ]
                            }
                          }
                        ]
                      }
                ]
            }
        })
    })

    map.addLayer({
        'id': places,
        'type':'symbol',
        'source':'places',
    
    });
    map.on('click', 'places', function (e) {
        let coordinates = e.features[0].geometry.coordinates.slice();
        let description = e.features[0].properties.description;

        while (Math.abs(e.lnglat.lng - coordinates[0]) > 180){
            coordinates[0] += e.lnglat.lng >coordinates[0] ? 360:
            -360;
        }

        new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addto(map);
    });        

    map.on('mouseenter', 'places', function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'places', function(){
        map.getCanvas().style.cursor='';
    });

});

}

const newMarker = new Mapbox.Marker()
.setLngLat(event.lnglat);

if (marker !== null){
    marker.remove();
}


export default Mapbox;