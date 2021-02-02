import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle `

    * {
        box-sizing: border-box;
        margin: 5px;
        background-color: #e8eddf;
    }
    body {
        font-family: 'ff-dagny-web-pro', sans-serif;
    }
    html{
        font-size:20px;

    }
    h1{
        text-align:center;
        font-weight: 900;
    }
    
    
`;

export default GlobalStyle;