import styled, { css } from "styled-components";
import DeleteIc from "../../assets/delteIc.svg?react";
import EditIc from "../../assets/editIc.svg?react";
import FilledDeleteIc from "../../assets/filledDeleteIc.svg?react";

export const TitleContainer = styled.div`
  height: 62px;
  background-color: ${(props) => props.theme.cardHeadColor};
  padding: 16px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 4px;

  h2 {
    text-align: center;
    font-weight: 600;
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /* TODO: 글자 수 제한하기 */
  }
`;

export const EditBoardForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  input {
    width: 100%;
    border: none;
    border-bottom: 1px solid black;
    outline: none;
    padding-bottom: 4px;
    background-color: transparent;
    font-size: 18px;
    font-weight: 600;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-right: 10px;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const IconStyle = css`
  width: 12px;
  height: 12px;
  fill: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: all 0.3 ease;
  flex-shrink: 0;
  &:hover {
    fill: black;
  }
`;

export const DeleteIcStyle = styled(DeleteIc)`
  ${IconStyle}
`;

export const EditIcStyle = styled(EditIc)`
  ${IconStyle}
`;

export const EditCancelBtn = styled(FilledDeleteIc)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  flex-shrink: 0;
  fill: rgba(255, 0, 0, 0.5);
  &:hover {
    fill: red;
  }
`;
