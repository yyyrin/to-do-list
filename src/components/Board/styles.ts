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

export const Form = styled.form`
  width: 100%;
  padding: 16px 20px;

  input {
    width: 100%;
    border: none;
    border-bottom: 3px solid ${(props) => props.theme.lineColor};
    outline: none;
    padding-bottom: 4px;
    background-color: transparent;
    font-size: 12px;
    font-weight: 500;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

export const Area = styled.div`
  background-color: transparent;
  flex-grow: 1;
  transition: all 0.3s ease-in-out;
  padding: 0px 20px 14px 20px;
`;
