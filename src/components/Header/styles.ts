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
  padding-left: 6px;
`;

export const SubWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const SubTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  padding-left: 6px;
`;

export const BoardCreateForm = styled.form`
  flex: 1;
  input {
    width: 100%;
    padding: 6px;
    box-sizing: border-box;
  }
`;
