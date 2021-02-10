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

    //Henter inn Cosmic data, sluger og metadata
    useEffect(() =>{

        const client = new Cosmic();
        const bucket = client.bucket({
            slug: process.env.BUCKET_SLUG,
            read_key: process.env.READ_KEY
        });

         bucket.getObjects({
            type:'bryggerier',
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
  // Mapbox
  useEffect(() =>{
        if (pageData !== null){ 
            map = new Mapbox.Map({
                container: mapElement.current,
                style:'mapbox://styles/mapbox/streets-v11',
                center:[10.741882324218748,59.913557717561645],
                zoom:10.5
            })
            //Mapbox marker 
            .on('load',  () =>{
                pageData.objects.map(item =>{
                    let marker = new Mapbox.Marker({
                        type: 'Point',
                        draggable: false,
                        color:'black',
                    })
                    .setLngLat(item.metadata.coordinates)
                    // Popup i mapbox
                    .setPopup(new Mapbox.Popup({
                        cursor:'pointer'
                    })
                    .setHTML(`
                      <div class="popup"style:{{heigth:300px}}>
                      <h2>${item.title}</h2>
                      <p>${item.metadata.pop_text}</p>
                      <a style={{cursor:"point",text-decoration:"none"}} 
                      href="/bryggerier/${item.slug}">Les mer om stedet</a>
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
                <p className="info">Her kan sjekke ut hvor bryggeribarene 
                ligger i Oslo,<br></br>og få litt informasjon om stedene.</p>
                <div style={{height:'500px'}} ref={mapElement} ></div>   
            </Container>
        <footer> </footer>
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
