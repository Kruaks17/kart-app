import React, {useEffect, useRef} from 'react';
import Mapbox from 'mapbox-gl';



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

  });
};





export default Mapbox;