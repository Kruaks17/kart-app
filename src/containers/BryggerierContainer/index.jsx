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
    let popup= null;

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
                center:[10.741882324218748,59.913557717561645],
                zoom:10.5
            })
            .on('load', () =>{
                pageData.objects.map(item =>{
                    let marker = new Mapbox.Marker({
                        type: 'Point',
                        draggable: false,
                        color:'black',
                    })
                    .setLngLat(item.metadata.coordinates)
                    .setPopup(new Mapbox.Popup({
                        cursor:'pointer'
                    })
                    .setHTML(`
                      <div class="popup">
                      <h2>${item.title}</h2>
                      <p>${item.metadata.pop_text}</p>
                      <a style={{cursor:"point"}} href="/bryggerier/${item.slug}">Les mer om bryggeri</a>
                      </div>
                      `))
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
                
                  {/*pageData.objects.map(item => {
                    return( 
                        < PostLink
                        url={`/bryggerier/${item.slug}`}
                        title={item.title}
                        image={item.image}
                        date={`01.29.2021`}
                        key={item.slug}
                        />
                    )
                })*/}
                
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
