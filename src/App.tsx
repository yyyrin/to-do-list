import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
`;

const Board = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 20px 10px;
  border-radius: 5px;
  min-height: 200px;
`;

const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 5px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  // 드래그가 끝났을 때 실행되는 함수
  const onDragEnd = ({ destination, source }: DropResult) => {
    console.log(args);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(provided) => (
              <Board ref={provided.innerRef} {...provided.droppableProps}>
                {toDos.map((toDo, index) => (
                  <Draggable key={index} draggableId={toDo} index={index}>
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
                ))}
                {provided.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;

/* react-beautiful-dnd

- DragDropContext
  - drag 액션을 관리하는 컴포넌트
  - `onDragEnd` 콜백을 통해 드래그 종료 시의 동작을 정의할 수 있음

- Droppable
  - drag 가능한 아이템의 컨테이녀를 나타냄
  - `droppableId`로 식별하며, 그 안에 `Draggable` 컴포넌트를 포함함

- Draggable
  - 실제로 drag 되는 아이템을 나타냄
  - `draggableId`로 식별하며, `index`로 순서를 지정함

- dragHandleProps
  - drag handle을 구현하기 위한 프로퍼티들을 포함한 객체
  - 특정 영역을 drag handle로 사용하고 싶을 때, 해당 영역의 프로퍼티들을 `span` 또는 다른 요소로 전달함

- draggableProps
  - drag 되는 아이템에 적용해야 하는 프로퍼티들을 포함한 객체
  - 이를 통해 drag된 아이템의 스타일 등을 조절할 수 있음

- provided.placeholder (?ReactElement)
  - Draggable 엘리먼트를 드래그하는 동안 position: fixed(영역을 고정시킴)를 적용
  - Draggable을 드래그할 때 Droppable 리스트가 작아지는 것을 방지하기 위해 필요
  - Draggable 노드의 형제로 렌더링하는 게 좋음

- onDragEnd
  - result: DropResult
  - result.draggableId: 드래그 되었던 Draggable의 id
  - result.type: 드래그 되었던 Draggable의 type
  - result.source: Draggable 이 시작된 위치(location)
  - result.destination: Draggable이 끝난 위치(location). 만약에 Draggable이 시작한 위치와 같은 위치로 돌아오면 이 destination값은 null이 될 것.
*/
