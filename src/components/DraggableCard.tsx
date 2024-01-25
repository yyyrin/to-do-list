import { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 5px;
`;

interface IDraggableCardProps {
  toDo: string;
  index: number;
}

const DraggableCard = ({ toDo, index }: IDraggableCardProps) => {
  console.log(toDo, "has been rendered");

  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
};

export default memo(DraggableCard);

/* React.memo

- 고차 컴포넌트(Higher Order Component)
- 컴포넌트가 동일한 props로 동일한 결과를 렌더링해낸다면, React memo를 호출하고 결과를 메모이징(Memoizing)하도록 래핑하여 경우에 따라 성능 향상을 누릴 수 있음
- React는 컴포넌트를 렌더링하지 않고 마지막으로 렌더링된 결과를 재사용함

- React.memo는 props 변화에만 영향을 줌
- React.memo로 감싸진 함수 컴포넌트 구현에 useState 또는 useReducer, useContext 훅을 사용한다면, 여전히 state나 context가 변할 때 다시 렌더링됨
- 이 메서드는 오직 성능 최적화를 위하여 사용됨
- 렌더링을 "방지"하기 위하여 사용지 말기!! 버그를 만들 수 있음

- DraggableCard에게 동일한 index와 동일한 todo prop을 받으면 리렌더링을 하지 않도록 하기 위함

- 현재 React 18.2 버전에서는 memo(컴포넌트명, arePropsEqual?)로 사용
  - React.memo로 사용해도 지장X
*/
