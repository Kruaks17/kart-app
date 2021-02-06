import React, {useState, useEffect,useRef} from 'react';
import Cosmic from 'cosmicjs';
import Mapbox from 'mapbox-gl';

import SiteNavigation  from '../../components/SiteNavigation';
import PageTitle from '../../components/PageTitle';
import PostLink from '../../components/PostLink';
import Container from '../../components/Container';
import PageSkeleton from '../../components/PageSkeleton';

    let map= null;
    let marker= null;

function BryggerierContainer(){
    
    const mapElement= useRef(null);
    Mapbox.accessToken= process.env.MAPBOX_API_KEY;

    const [pageData, setPageData] = useState(null);

    useEffect(() =>{

        const client = new Cosmic();
        const bucket = client.bucket({
            slug: process.env.BUCKET_SLUG,
            read_key: process.env.READ_KEY
        });

         bucket.getObjects({
            type: 'bryggerier',
            slug:'bryggerier',
            limit:9,
            props:'slug,title,content,metadata',
            sort: '-created_at'
        })
        .then (data =>{
            setPageData(data);
            console.log(data);
        })
        .catch (error =>{
            console.log(error);
        });
        
    }, []);

  useEffect(() =>{
        if (pageData !== null){ 
            map = new Mapbox.Map({
                container: mapElement.current,
                style:'mapbox://styles/mapbox/streets-v11',
                center:[10.751924829843674,59.91412969508033],
                zoom:10
            })
            .on('load', () =>{
                pageData.objects.map(item =>{
                    let marker = new Mapbox.Marker({
                        type: 'Point',
                        draggable: false,
                        anchor: 'bottom',  
                    })
                    .setLngLat(item.metadata.coordinates)
                    .addTo(map);
                })
            })
            
        }
      },[pageData]);

    function renderSkeleton() {
        return ( 
            <PageSkeleton />
        );
    }

    function renderPage(){
        return (
        <>
        <SiteNavigation />
            <Container as="main">
                <PageTitle>Bryggerier i Oslo</PageTitle>
                <div style={{height:'500px'}} ref={mapElement} ></div>  
                
                  {pageData.objects.map(item => {
                    return ( 
                        < PostLink
                        url={`/bryggerier/${item.slug}`}
                        title={item.title}
                        image={item.image}
                        date={`01.29.2021`}
                        key={item.slug}
                        />
                    )
                })}
                
            </Container>
        </>
        )
    }
    return (
        <>

        {(pageData === null) ? renderSkeleton() : renderPage()}
        </>
    )
}

export default BryggerierContainer;
