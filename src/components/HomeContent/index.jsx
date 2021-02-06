import styled from 'styled-components';

const HomeContent = styled.article `

    img {

       max-width: 100%;
       max-height:100%;
       
    
    }
    ul{
        list-style: none;
        border: 1px solid black;
        padding:1rem;

        display:block;
        justify-content:center;
        align-items:center;

    }
    p:empty {
        display: none;
    }
    article{
        font-family: 'ff-dagny-web-pro', sans-serif;;
        color: black;
    }
    article img{
        box-sizing: border-box;
    }
    h1{
        font-family:'franklin-gothic-atf', sans-serif; ;
        display: block;
        justify-content:center;
        align-items:center;

        
    }
`;

export default HomeContent;


