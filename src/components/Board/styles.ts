import styled from "styled-components";

export const Wrapper = styled.div`
  width: 240px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 10px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  border: 3px solid black;
  overflow: hidden;
  max-width: 100%;
`;

export const TitleContainer = styled.div`
  background-color: ${(props) => props.theme.cardHeadColor};
  padding: 16px 20px;
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

export const Form = styled.form`
  width: 100%;
  padding: 16px 20px;

  input {
    width: 100%;
    border: none;
    border-bottom: 3px solid black;
    outline: none;
    padding-bottom: 4px;
    background-color: transparent;
    font-size: 14px;
    font-weight: 500;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    /* TODO: 글자 수 제한하기 */
  }
`;

export const Area = styled.div`
  background-color: transparent;
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 0px 20px 14px 20px;
`;
