import styled from "styled-components";

export const Boards = styled.div`
  display: flex;
  justify-content: start;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
  flex-shrink: 0;
  white-space: nowrap;
  margin: 16px auto;
  overflow-x: auto;
  padding-bottom: 24px;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 60px;

  p {
    text-align: center;
    font-weight: 600;
    font-size: 18px;
  }
`;

export const LottieContainer = styled.div`
  margin-top: 30px;
  width: 200px;
  height: 200px;
`;
