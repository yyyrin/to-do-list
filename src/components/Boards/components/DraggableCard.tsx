import { memo, useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import * as style from "../style/draggableCard.styles";
import { useRecoilCallback, useSetRecoilState } from "recoil";
import { IBoard, boardState } from "../../../atoms";
import { useForm } from "react-hook-form";

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
  title: string;
}

interface IEditForm {
  editToDo: string;
}

const DraggableCard = ({
  toDoId,
  toDoText,
  index,
  title,
}: IDraggableCardProps) => {
  const setBoard = useSetRecoilState(boardState);
  const [isEdit, setIsEdit] = useState(false);
  const { register, handleSubmit, setFocus, reset } = useForm<IEditForm>();

  useEffect(() => {
    if (isEdit) {
      setFocus("editToDo");
    }
  }, [isEdit, setFocus]);

  const onShowEdit = () => setIsEdit(true);

  const onEdlit = ({ editToDo }: IEditForm) => {
    setIsEdit(false);

    setBoard((currentBoard) => {
      const updatedBoards = [...currentBoard];
      const targetBoardIndex = updatedBoards.findIndex(
        (board) => board.title === title
      );

      if (targetBoardIndex !== -1) {
        const indexToDoEdit = updatedBoards[targetBoardIndex].content.findIndex(
          (toDo) => toDo.id === toDoId
        );

        if (indexToDoEdit !== -1) {
          const updatedContent = [...updatedBoards[targetBoardIndex].content];
          updatedContent[indexToDoEdit] = {
            ...updatedContent[indexToDoEdit],
            text: editToDo,
          };

          updatedBoards[targetBoardIndex] = {
            ...updatedBoards[targetBoardIndex],
            content: updatedContent,
          };
        }
      }

      return updatedBoards;
    });

    reset();
  };

  const onDelete = useRecoilCallback(({ set }) => () => {
    set(boardState, (prevBoardState: IBoard[]) => {
      const updatedBoards = [...prevBoardState];
      const targetBoardIndex = updatedBoards.findIndex(
        (board) => board.title === title
      );

      if (targetBoardIndex !== -1) {
        const indexToRemove = updatedBoards[targetBoardIndex].content.findIndex(
          (toDo) => toDo.id === toDoId
        );

        if (indexToRemove !== -1) {
          const updatedContent = [...updatedBoards[targetBoardIndex].content];
          updatedContent.splice(indexToRemove, 1);

          updatedBoards[targetBoardIndex] = {
            ...updatedBoards[targetBoardIndex],
            content: updatedContent,
          };
        }
      }

      return updatedBoards;
    });
  });

  const onCancelEdit = () => {
    setIsEdit(false);
    reset();
  };

  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(provided, snapshot) => (
        <style.Card
          $isDragging={snapshot.isDragging}
          $isEdit={isEdit}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {isEdit ? (
            <style.EditForm onSubmit={handleSubmit(onEdlit)}>
              <input
                {...register("editToDo", { required: true })}
                type="text"
                placeholder="Type here"
                defaultValue={toDoText}
                autoComplete="off"
              />
              <style.EditCancelBtn onClick={onCancelEdit} />
            </style.EditForm>
          ) : (
            <>
              <p>{toDoText}</p>
              <style.IconContainer>
                <style.EditIcStyle onClick={onShowEdit} />
                <style.DeleteIcStyle onClick={onDelete} />
              </style.IconContainer>
            </>
          )}
        </style.Card>
      )}
    </Draggable>
  );
};

export default memo(DraggableCard);
