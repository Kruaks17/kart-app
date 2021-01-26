import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle `

    * {
        box-sizing: border-box;
        margin: 5px;
    }
    body {
        font-family: 'ff-dagny-web-pro', sans-serif;
    }
    html{
        font-size:20px;

    }

`;

export default GlobalStyle;