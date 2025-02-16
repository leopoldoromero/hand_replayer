import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    html {
        font-size: calc(15px + 2 * ((100vw - 500px) / (2000 - 768)));
        height: 100%;
    }
    body{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        text-align: center;  
        margin: 0;
        padding: 0;
        background: linear-gradient(to bottom, black, #000040);
        color: #ffffff;
        font-family: 'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif;
        font-variant: tabular-nums;
        line-height: 1.5;
    }
`;

export default GlobalStyles;