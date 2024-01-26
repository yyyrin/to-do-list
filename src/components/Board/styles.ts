import styled from "styled-components";

export const Wrapper = styled.div`
  width: 300px;
  background-color: ${(props) => props.theme.boardColor};
  padding-top: 10px;
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IAreaProps {
  $isDraggingOver: boolean;
  $isDraggingFromThisWith: boolean;
}

export const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.$isDraggingOver
      ? "#dfe6e9"
      : props.$isDraggingFromThisWith
      ? "#b2b3c3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

export const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;
