import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 16px auto;
  justify-content: center;
  align-items: center;
  overflow-x: auto;
`;

export const Boards = styled.div`
  display: flex;
  justify-content: start;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
  flex-shrink: 0;
  white-space: nowrap;
`;