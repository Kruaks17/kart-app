import React, {useState, useEffect} from 'react';
import Cosmic from 'cosmicjs';
import Plot from 'react-plotly.js';

import SiteNavigation  from '../../components/SiteNavigation';
import HomeContent from '../../components/HomeContent';
import PageTitle from '../../components/PageTitle';
import Container from '../../components/Container';
import PageSkeleton from '../../components/PageSkeleton';

function AboutContainer(){
    const [pageData, setPageData] = useState(null);

    useEffect(() =>{

        const client = new Cosmic();
        const bucket = client.bucket({
            slug: process.env.BUCKET_SLUG,
            read_key: process.env.READ_KEY
        });

         bucket.getObject({
            slug:'om-oss',
            props:'slug,title,content'
        })
        .then(data =>{
            setPageData(data.object); 
        })
        .catch (error =>{
            console.log(error);
        });
    }, [])
    

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
                <PageTitle>{pageData.title}</PageTitle>
                <HomeContent dangerouslySetInnerHTML={{__html:pageData.content}} />
                <h2>Salgsutvikling øl som viser hvor mye små og store bryggerier har solgt:</h2>
                <Plot className="plotChart"
                     data={[
                        {type: 'bar', 
                        x:[2019,2020,'years'], 
                        marker:{color:'#344966'},
                        y:[750406,815566],
                         },
                        {type: 'bar', 
                        x:[2019,2020,'years'], 
                        marker:{color:'#B4CDED'},
                        y:[19839851,20250729]} 
                        ]}
                        layout={{height:'50vh', width:'50vw',
                        paper_bgcolor:'#e8eddf',
                        title:'Slagstall for norskbrygget øl i liter'}}
                />
                <p>Data hentet inn fra <a href="https://www.drikkeglede.no/tall_og_fakta/"> Bryggeri & Drikkervareforeningen </a>   </p>
            </Container>
        </>
        )
    }

    return (
        <>
        {(pageData === null)? renderSkeleton() : renderPage()}
        </>
)
};
export default AboutContainer;