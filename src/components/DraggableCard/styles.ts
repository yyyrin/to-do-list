import styled from "styled-components";

export const Card = styled.div<{ $isDragging: boolean }>`
  border-radius: 4px;
  padding: 14px 10px;
  margin-bottom: 8px;
  background-color: ${(props) =>
    props.$isDragging ? "rgba(0, 0, 0, 0.5)" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.$isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};

  color: white;
  font-size: 14px;
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
