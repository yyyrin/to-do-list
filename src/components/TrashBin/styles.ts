import styled from "styled-components";
import BinIc from "../../assets/binIc.svg?react";

export const BinIcStyle = styled(BinIc)<{ $isDraggingOver: boolean }>`
  width: 40px;
  height: 40px;
  transition: fill 0.3s ease;
  fill: ${(props) =>
    props.$isDraggingOver ? props.theme.accentColor : "black"};
  position: fixed;
  bottom: 40px;
  right: 50px;
`;

export const TrashBin = styled.div<{ $trashBinShow: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid ${(props) => props.theme.lineColor};
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 30px;
  right: 40px;
  transition: all 0.3s ease;
  display: flex;
  opacity: ${(props) => (props.$trashBinShow ? 1 : 0)};

  &:hover {
    border-color: ${(props) => props.theme.accentColor};
    ${BinIcStyle} {
      fill: ${(props) => props.theme.accentColor};
    }
  }
`;
