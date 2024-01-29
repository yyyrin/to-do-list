import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "styled-components";
import { RecoilRoot } from "recoil";
import { theme } from "./style/theme.ts";
import GlobalStyle from "./style/GlobalStyle.ts";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </>
);
