import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IToDoState, toDoState } from "./atoms";
import Board from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  // 드래그가 끝났을 때 실행되는 함수
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;

    // same board movement
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        // 1) Delete item on source.index
        boardCopy.splice(source.index, 1);
        // 2) Put back the item on the destination.index
        boardCopy.splice(destination?.index, 0, draggableId);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }

    // cross board movement
    if (destination.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, draggableId);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }

    /*
    // 한 번에 처리하는 방법
    setToDos((allBoards) => {
      const copyToDos: IToDoState = {};
      Object.keys(allBoards).forEach((toDosKey) => {
        copyToDos[toDosKey] = [...allBoards[toDosKey]];
      });
      copyToDos[source.droppableId].splice(source.index, 1);
      copyToDos[destination.droppableId].splice(
        destination.index,
        0,
        draggableId
      );
      return copyToDos;
    });
    */
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
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

- <Draggable /> list의 키
  - <Draggable /> list를 렌더링하는 경우 각 <Draggable />에 key prop을 추가하는 것이 중요
  - 규칙
    - key는 list 내에서 고유해야 함
    - key에 item의 index가 포함되어서는 안 됨(map의 index 사용 X)
    - 일반적으로 draggableId를 key로 사용하면 안 됨
    - list에 key가 없으면 React가 경고하지만 index를 key로 사용하는 경우 경고하지 않음
    - key를 올바르게 사용하는 것이 중요!!!
*/
