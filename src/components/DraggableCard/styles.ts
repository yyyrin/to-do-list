import styled, { css } from "styled-components";
import DeleteIc from "../../assets/delteIc.svg?react";
import EditIc from "../../assets/editIc.svg?react";
import FilledDeleteIc from "../../assets/filledDeleteIc.svg?react";

export const Card = styled.div<{ $isDragging: boolean; $isEdit: boolean }>`
  height: 58px;
  border: 2px solid black;
  border-radius: 4px;
  padding: 14px 12px;
  margin-bottom: 8px;
  background-color: ${(props) =>
    props.$isEdit ? "white" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.$isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  opacity: ${(props) => (props.$isDragging ? 0.7 : 1)};
  transition: background-color 0.3 ease, opacity 0.3 ease, box-shadow 0.3 ease;

  p {
    color: ${(props) => (props.$isEdit ? "black" : "white")};
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

export const EditForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 4px;

  input {
    width: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 14px;
    font-weight: 500;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

export const EditCancelBtn = styled(FilledDeleteIc)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  flex-shrink: 0;
`;
