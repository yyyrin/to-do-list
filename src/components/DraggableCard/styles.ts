import styled, { css } from "styled-components";
import DeleteIc from "../../assets/delteIc.svg?react";
import EditIc from "../../assets/editIc.svg?react";

export const Card = styled.div<{ $isDragging: boolean }>`
  border-radius: 4px;
  padding: 14px 12px;
  margin-bottom: 8px;
  background-color: ${(props) =>
    props.$isDragging ? "rgba(0, 0, 0, 0.5)" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.$isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;

  p {
    color: white;
    font-size: 14px;
    font-weight: 500;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

const IconStyle = css`
  width: 10px;
  height: 10px;
  fill: grey;
  cursor: pointer;
  transition: fill 0.3 ease;
  flex-shrink: 0;
  &:hover {
    fill: white;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const DeleteIcStyle = styled(DeleteIc)`
  ${IconStyle}
`;

export const EditIcStyle = styled(EditIc)`
  ${IconStyle}
`;
