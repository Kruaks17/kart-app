import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle `

    * {
        box-sizing: border-box;
        margin: 5px;
        
    }
    body {
        font-family: 'ff-dagny-web-pro', sans-serif;
        background-color: #e8eddf;
    }
    html{
        font-size:20px;

    }
    h1{
        text-align:center;
        font-weight: 900;
    }
    .ingress{
        font-family: 'ff-dagny-web-pro', sans-serif;
        font-size:1.2rem;

        display:block;
        justify-content:center;
        align-items:center;
        margin:auto;
    }
    .mapboxgl-popup{
        max-width: 400px;
        font-size:12px;
        font-family: 'ff-dagny-web-pro', sans-serif;
    }
    .plotChart{
        display:flex;
        justify-content:center;
        align-items:center;
        margin-top: 30px;
        box-sizing: border-box;
    }
    .popup img {
        width:50% ;
    }
    .info{
        display:flex;
        justify-content:center;
        align-items:center;

        text-align:center;
    }
`;

export default GlobalStyle;