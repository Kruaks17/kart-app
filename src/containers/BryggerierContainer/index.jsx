import React, {useState, useEffect} from 'react';
import Cosmic from 'cosmicjs';

import SiteNavigation  from '../../components/SiteNavigation';
import HomeContent from '../../components/HomeContent';
import PageTitle from '../../components/PageTitle';
import PostLink from '../../components/PostLink';
import Container from '../../components/Container';
import PageSkeleton from '../../components/PageSkeleton';

function BryggerierContainer(){
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
            props:'slug,title,content',
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

    function renderSkeleton() {
        return ( 
            <PageSkeleton />
        );
    }

    function renderPage(){
        <>
        <SiteNavigation />
            <Container as="main">
                <PageTitle>Bryggerier i Oslo</PageTitle>
                  {pageData.objects.map(item => {
                    return (
                        <PostLink 
                        url={`/bryggerier/${item.slug}`}
                        title={item.title}
                        date={`01.29.2021`}
                        key={item.slug}
                        />
                    );
                })} 
            </Container>
        
        </>
    }
    return (
        <>

        {(pageData === null) ? renderSkeleton() : renderPage()}
        </>
    )
}

export default BryggerierContainer;
