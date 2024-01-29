import { createGlobalStyle } from "styled-components";
import Reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
${Reset};

body {
  line-height: 1.2;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  background-color: ${(props) => props.theme.bgColor};
  color: black;
}
a {
  text-decoration:none;
  color:inherit;
}
`;

export default GlobalStyle;
