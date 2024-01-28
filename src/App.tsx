import styled from "styled-components";
import BoardList from "./components/BoardList";
import Header from "./components/Header";

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
      <BoardList />
    </AppContainer>
  );
}

export default App;
