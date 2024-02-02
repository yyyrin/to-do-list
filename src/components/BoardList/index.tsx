import { useRecoilState } from "recoil";
import { boardState } from "../../atoms";
import {
  DragDropContext,
  Draggable,
  DraggableLocation,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import * as style from "./styles";
import Board from "../Board";
import Lottie from "lottie-react";
import EmptyLottie from "../../assets/emptyLottie.json";
import { useState } from "react";
import TrashBin from "../TrashBin";

const BoardList = () => {
  const [boards, setBoards] = useRecoilState(boardState);
  const [trashBinShow, setTrashBinShow] = useState(false);

  const onDragStart = ({ type }: { type: string }) => {
    if (type === "card") {
      setTrashBinShow(true);
    }
  };

  const onDragEnd = ({ destination, source, type }: DropResult) => {
    setTrashBinShow(false);
    if (!destination) return;

    if (type === "board") {
      handleBoardMove(source, destination);
    }

    if (type === "card") {
      handleCardMove(source, destination);
    }
  };

  // board 이동 처리 함수
  const handleBoardMove = (
    source: DraggableLocation,
    destination: DraggableLocation
  ) => {
    setBoards((currentBoard) => {
      const updatedBoards = [...currentBoard];
      const [movedBoard] = updatedBoards.splice(source.index, 1);
      updatedBoards.splice(destination.index, 0, movedBoard);
      return updatedBoards;
    });
  };

  // card 이동 처리 함수
  const handleCardMove = (
    source: DraggableLocation,
    destination: DraggableLocation
  ) => {
    if (destination.droppableId === "trashbin") {
      handleTrashBinMove(source);
    }

    if (destination.droppableId === source.droppableId) {
      handleSameBoardMove(source, destination);
    }

    if (destination.droppableId !== source.droppableId) {
      handleDifferentBoardMove(source, destination);
    }
  };

  // 쓰레기통 이동 처리 함수
  const handleTrashBinMove = (source: DraggableLocation) => {
    setBoards((currentBoards) => {
      const updatedBoards = [...currentBoards];
      const targetBoardIndex = updatedBoards.findIndex(
        (board) => board.title === source.droppableId
      );
      const targetBoardContent = [...updatedBoards[targetBoardIndex].content];

      targetBoardContent.splice(source.index, 1);
      updatedBoards[targetBoardIndex] = {
        title: source.droppableId,
        content: [...targetBoardContent],
      };
      return [...updatedBoards];
    });
  };

  // 같은 board 내에서의 이동 처리 함수
  const handleSameBoardMove = (
    source: DraggableLocation,
    destination: DraggableLocation
  ) => {
    setBoards((currentBoards) => {
      const updatedBoards = [...currentBoards];
      const sourceBoard = updatedBoards.find(
        (board) => board.title === source.droppableId
      );

      if (sourceBoard) {
        const updatedContent = [...sourceBoard.content];
        const [removedItem] = updatedContent.splice(source.index, 1);
        updatedContent.splice(destination.index, 0, removedItem);

        return updatedBoards.map((board) =>
          board.title === source.droppableId
            ? { ...board, content: updatedContent }
            : board
        );
      }

      return updatedBoards;
    });
  };

  // 다른 board로의 이동 처리 함수
  const handleDifferentBoardMove = (
    source: DraggableLocation,
    destination: DraggableLocation
  ) => {
    setBoards((currentBoards) => {
      const updatedBoards = [...currentBoards];
      const sourceBoard = updatedBoards.find(
        (board) => board.title === source.droppableId
      );
      const destinationBoard = updatedBoards.find(
        (board) => board.title === destination.droppableId
      );

      if (sourceBoard && destinationBoard) {
        const updatedSourceContent = [...sourceBoard.content];
        const updatedDestinationContent = [...destinationBoard.content];
        const [removedItem] = updatedSourceContent.splice(source.index, 1);
        updatedDestinationContent.splice(destination.index, 0, removedItem);

        return updatedBoards.map((board) =>
          board.title === source.droppableId
            ? { ...board, content: updatedSourceContent }
            : board.title === destination.droppableId
            ? { ...board, content: updatedDestinationContent }
            : board
        );
      }

      return updatedBoards;
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      {boards.length ? (
        <>
          <Droppable
            droppableId="boardsArea"
            type="board"
            direction="horizontal"
          >
            {(provided) => (
              <style.Boards
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {boards.map((board, index) => (
                  <Draggable
                    draggableId={`board-${index}`}
                    index={index}
                    key={`board-${index}`}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        <Board
                          title={board.title}
                          key={board.title}
                          content={board.content}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </style.Boards>
            )}
          </Droppable>
          <TrashBin trashBinShow={trashBinShow} />
        </>
      ) : (
        <style.Wrapper>
          <p>The board is empty.</p>
          <p>Please create a new board!</p>
          <style.LottieContainer>
            <Lottie animationData={EmptyLottie} />
          </style.LottieContainer>
        </style.Wrapper>
      )}
    </DragDropContext>
  );
};

export default BoardList;

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
