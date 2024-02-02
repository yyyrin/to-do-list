import styled from "styled-components";
import BinIc from "../../assets/binIc.svg?react";

export const Boards = styled.div`
  display: flex;
  justify-content: start;
  align-items: flex-start;
  width: 100%;
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

export const BinIcStyle = styled(BinIc)`
  width: 40px;
  height: 40px;
  transition: fill 0.3s ease;
`;

export const TrashBin = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  border: 3px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 30px;
  right: 40px;
  transition: border-color 0.3s ease;
  &:hover {
    border-color: red;
    ${BinIcStyle} {
      fill: red;
    }
  }
`;
