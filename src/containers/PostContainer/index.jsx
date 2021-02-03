import React, {useState, useEffect} from 'react';
import Cosmic from 'cosmicjs';

import SiteNavigation  from '../../components/SiteNavigation';
import Container from '../../components/Container';
import PageTitle from '../../components/PageTitle';
import HomeContent from '../../components/HomeContent';
import PageSkeleton from '../../components/PageSkeleton';

function PostContainer({match}){
    const [pageData, setPageData] = useState(null);

    useEffect(() =>{
        const client = new Cosmic();
        const bucket = client.bucket({
            slug:process.env.BUCKET_SLUG,
            read_key: process.env.READ_KEY
        });

        bucket.getObject({
            type: 'article',
            limit:9,
            slug:match.params.slug,
            props:'slug,title,content,metafields',
            sort: '-created_at'
        })
        .then (data =>{
            setPageData(data.object);
            console.log(data);
        })
        .catch(error =>{
            console.log(error);
        });

    }, [])

    function renderSkeleton(){
        return(
            <PageSkeleton />
        );
    }

    function renderPage(){
        return(
        <>
            <SiteNavigation />
            <Container as="main">
                <PageTitle>{pageData.title}</PageTitle>
                <HomeContent dangerouslySetInnerHTML={{__html:pageData.content}}   /> 
            </Container>
        </>
        )
    }

    return(
        <>
        {(pageData === null ) ? renderSkeleton() : renderPage()}
        </>
    )
};

export default PostContainer;
