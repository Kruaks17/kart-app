import React, {useState, useEffect,useRef} from 'react';
import Cosmic from 'cosmicjs';
import Mapbox from 'mapbox-gl';

import SiteNavigation  from '../../components/SiteNavigation';
import HomeContent from '../../components/HomeContent';
import Container from '../../components/Container';
import PageTitle from '../../components/PageTitle';
import PageSkeleton from '../../components/PageSkeleton';

/*let map = null;*/

 
function ContactContainer(){
    const [pageData, setPageData] = useState(null);
    /*const [chartData, setChartData] = useState({
        data=[{
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
          {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]}
        ]} 
    );

    Mapbox.accessToken= 'pk.eyJ1IjoiYWt1c2VydSIsImEiOiJja2s2a296MzgwNTA1MnZwYnFmZHJnYmRkIn0.zosWj667losHkvnCgN51Gg';
    const mapElement = useRef(null);*/

    useEffect(() =>{

        const client = new Cosmic();
        const bucket = client.bucket({
            slug: process.env.BUCKET_SLUG,
            read_key: process.env.READ_KEY
        });

        bucket.getObject({
            slug:'kontakt',
            props:'title, content'
        })
        then (data =>{
            setPageData(data.getObject);
        })
        .catch (error =>{
            console.log(error);
        });
    }, []);

    
    
    /*useEffect(()=>{
        if (pageData !== null) {

        map = new Mapbox.Map ({
            container: mapElement.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center:[59.9262643262879, 10.775643508395412],
            zoom: 2
            });
        }
    }, [pageData]);*/

    function renderSkeleton(){
        return (
        <PageSkeleton />
        );
    }

    function renderPage(){
        <>
        <SiteNavigation />

            <Container as="main">
                <PageTitle>{pageData.title}</PageTitle>
                <HomeContent dangerouslySetInnerHTML={{__html:pageData.content}} />
                  <div ref={mapElement}></div>
            </Container>
        
        </>
    }
    return (
        <>

        {(pageData === null) ? renderSkeleton() : renderPage()}
        </>
    )
}
export default ContactContainer;