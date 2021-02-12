import { createGlobalStyle } from 'styled-components';



export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #F0F0f5;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 16px Roboto, sans-serif;

  }

  /* #root {
    max-width: 1024px;
    margin: 0 auto;
    padding: 48px 28px;
  } */

  button {
    cursor: pointer;
  }
`;