import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const onDragEnd = () => {};

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId="one">
          {(provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              <Draggable draggableId="first" index={0}>
                {(provided) => (
                  <li ref={provided.innerRef} {...provided.draggableProps}>
                    <span {...provided.dragHandleProps}>🔥</span>
                    One
                  </li>
                )}
              </Draggable>
              <Draggable draggableId="second" index={1}>
                {(provided) => (
                  <li ref={provided.innerRef} {...provided.draggableProps}>
                    <span {...provided.dragHandleProps}>🔥</span>
                    Two
                  </li>
                )}
              </Draggable>
            </ul>
          )}
        </Droppable>
      </div>
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
*/
