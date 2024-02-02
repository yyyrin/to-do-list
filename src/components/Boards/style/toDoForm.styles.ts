import styled from "styled-components";

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