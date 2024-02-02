import styled from "styled-components";
import Header from "./components/Header";
import Boards from "./components/Boards";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100%;
  padding: 20px;
`;

function App() {
  return (
    <AppContainer>
      <Header />
      <Boards />
    </AppContainer>
  );
}

export default App;
