import { memo, useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import * as style from "./styles";
import { useRecoilCallback, useSetRecoilState } from "recoil";
import { IBoard, boardState } from "../../atoms";
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

  const onShowEdit = () => {
    setIsEdit(true);
  };

  // toDo 수정 완료하는 함수
  const onEdlit = ({ editToDo }: IEditForm) => {
    setIsEdit(false);

    // recoil state 업데이트
    setBoard((currentBoard) => {
      const updatedBoards = [...currentBoard];
      const targetBoardIndex = updatedBoards.findIndex(
        (board) => board.title === title
      );

      if (targetBoardIndex !== -1) {
        // 해당 board의 할 일 목록에서 수정하려는 toDoId를 가진 항목의 인덱스 찾기
        const indexToDoEdit = updatedBoards[targetBoardIndex].content.findIndex(
          (toDo) => toDo.id === toDoId
        );

        // 해당 toDoId를 가진 항목이 현재 board의 할 일 목록에 존재하는 경우
        if (indexToDoEdit !== -1) {
          // 현재 board의 할 일 목록의 복사본
          const updatedContent = [...updatedBoards[targetBoardIndex].content];
          // 해당 항목을 수정하고 재할당
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
        // 해당 board의 할 일 목록에서 삭제하려는 toDoId를 가진 항목의 인덱스 찾기
        const indexToRemove = updatedBoards[targetBoardIndex].content.findIndex(
          (toDo) => toDo.id === toDoId
        );

        // 해당 toDoId를 가진 항목이 현재 board의 할 일 목록에 존재하는 경우
        if (indexToRemove !== -1) {
          // 현재 board의 할 일 목록의 복사본을 만들어서 해당 항목을 삭제하고 updatedBoards에 할당
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
          {!isEdit && (
            <>
              <p>{toDoText}</p>
              <style.IconContainer>
                <style.EditIcStyle onClick={onShowEdit} />
                <style.DeleteIcStyle onClick={onDelete} />
              </style.IconContainer>
            </>
          )}
          {isEdit && (
            <>
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
            </>
          )}
        </style.Card>
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

/* Draggablestate snapshot

- isDragging: boolean
  - Draggable이 활발하게 드래그 중이거나 드롭 애니메이션인 경우 true로 설정함
*/
