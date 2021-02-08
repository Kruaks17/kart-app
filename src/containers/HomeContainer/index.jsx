import React,{useState, useEffect,useRef} from 'react';
import Cosmic from 'cosmicjs';



import SiteNavigation  from '../../components/SiteNavigation';
import Container  from '../../components/Container';
import PageTitle from '../../components/PageTitle';
import HomeContent from '../../components/HomeContent';
import PageSkeleton from '../../components/PageSkeleton';



function HomeContainer(){

    

    const [pageData, setPageData] = useState(null);

    useEffect(() =>{
        const client = new Cosmic();
        const bucket = client.bucket({
            slug: process.env.BUCKET_SLUG,
            read_key:process.env.READ_KEY
        });
        bucket.getObject({
            slug: 'hjem',
            props: 'title,slug,content,metadata'
        })
            .then (data =>{
                setPageData(data.object)
                console.log(data);
            })
            .catch (error =>{
                console.log(error);
            });
    },[]);

    // Vær data // 
    

    

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
                    <PageTitle>{pageData.title}</PageTitle >
                    <HomeContent dangerouslySetInnerHTML={{__html: pageData.content}} />
                    
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



export default HomeContainer;