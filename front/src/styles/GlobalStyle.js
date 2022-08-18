import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body{
        width: 100vw;
        min-width: 1100px;
        height: 100vh;
        margin: 0;
        padding: 0;
        font-family: 'Nanum Gothic', sans-serif;
        font-size: 16px;
        resize: none;
    }
`;

export default GlobalStyle;