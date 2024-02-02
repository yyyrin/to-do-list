import styled from "styled-components";

export const Wrapper = styled.div`
  width: 260px;
  min-width: 260px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 10px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  border: 4px solid ${(props) => props.theme.lineColor};
  overflow: hidden;
  max-width: 100%;
  margin-right: 16px;
`;
