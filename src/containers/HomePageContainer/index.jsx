import React,{useState, useEffect} from 'react';
import Cosmic from 'cosmicjs';

import SiteNavigation  from '../../components/SiteNavigation';
import Container  from '../../components/Container';
import PageTitle from '../../components/PageTitle';
import HomeContent from '../../components/HomeContent';

function HomePageContainer(){

    const [pageData, setPageData] = useState(null);

    useEffect(() =>{
        const client = new Cosmic();
        const bucket = client.bucket({
            slug: process.env.BUCKET_SLUG,
            read_key:process.env.READ_KEY
        });
        bucket.geObject({
            slug: 'homepage',
            limit: 5,
            props: 'slug, title, content',
            sort: '-created_at'
        })
            .then (data =>{
                setPageData(data.object);
            })
            .catch (error =>{
                console.log(error);
            });
    },[]);


    function renderPage(){
        return (
            <>
                <SiteNavigation />
                <Container as="main">
                    <PageTitle>{pageData.title}</PageTitle>
                    <HomeContent dangerouslySetInnerHTML={{__html: pageData.content}} />
                </Container>
            </>
        )
}
    return(
        <>
        {(pageData === null ) ? renderSekeleton() : renderPage()}
        </>

    )

};
export default HomePageContainer;