import styled from "styled-components";
import Header from "./components/Header";
import Boards from "./components/Boards";
import Footer from "./components/Footer";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
`;

function App() {
  return (
    <AppContainer>
      <Header />
      <Boards />
      <Footer />
    </AppContainer>
  );
}

export default App;
