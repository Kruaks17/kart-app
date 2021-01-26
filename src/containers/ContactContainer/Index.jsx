import React, {useState, useEffect} from 'react';
import Cosmic from 'cosmicjs';

import SiteNavigation  from '../../components/SiteNavigation';
import HomeContent from '../../components/HomeContent';
import Container from '../../components/Container';
import PageTitle from '../../components/PageTitle';
 
function ContactContainer(){
    const [pageData, setPageData] = useState(null);

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

    function renderPage(){
        <>
        <SiteNavigation />
            <Container as="main">
                <PageTitle>{pageData.title}</PageTitle>
                <HomeContent dangerouslySetInnerHTML={{__html:pageData.content}} />
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