import { useRecoilState } from "recoil";
import { boardState } from "../../../atoms";
import {
  DragDropContext,
  Draggable,
  DraggableLocation,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import * as style from "../style/boards.styles";
import Lottie from "lottie-react";
import EmptyLottie from "../../../assets/emptyLottie.json";
import { useState } from "react";
import TrashBin from "../../TrashBin";
import BoardItem from "./BoardItem";

const Boards = () => {
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
                        <BoardItem
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

export default Boards;
