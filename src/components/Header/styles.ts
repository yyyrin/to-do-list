import styled from "styled-components";

export const HeaderContainer = styled.div`
  hr {
    height: 1.5px;
    border: 0;
    background-color: black;
  }
`;

export const Title = styled.div`
  font-size: 40px;
  font-weight: 700;
  padding: 0px 6px;
`;

export const SubWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
  padding: 0px 6px;
`;

export const SubTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

export const BoardForm = styled.form`
  flex: 1;
  input {
    width: 100%;
    padding: 6px;
    border: none;
    outline: none;
    background-color: #dddddd;
    font-size: 16px;
    font-weight: 500;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;
