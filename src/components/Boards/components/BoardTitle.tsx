import { useEffect, useState } from "react";
import * as style from "../style/boardTitle.styles";
import { useRecoilState } from "recoil";
import { boardState } from "../../../atoms";
import { useForm } from "react-hook-form";

interface IBoardTitleProps {
  title: string;
}

interface EditBoardForm {
  editTitle: string;
}

const BoardTitle = ({ title }: IBoardTitleProps) => {
  const [boards, setBoards] = useRecoilState(boardState);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const { register, handleSubmit, setFocus, reset } = useForm<EditBoardForm>();

  const onShowEditTitle = () => {
    setIsEditTitle(true);
  };

  // board title 수정
  const onEditTitle = ({ editTitle }: EditBoardForm) => {
    setIsEditTitle(false);

    setBoards((currentBoard) => {
      const updatedBoards = [...currentBoard];
      const targetBoardIndex = updatedBoards.findIndex(
        (board) => board.title === title
      );

      if (targetBoardIndex !== -1) {
        updatedBoards[targetBoardIndex] = {
          ...updatedBoards[targetBoardIndex],
          title: editTitle,
        };
      }

      return updatedBoards;
    });
  };

  const onCancelEditTitle = () => {
    setIsEditTitle(false);
  };

  // board 삭제
  const onDelete = () => {
    const updatedBoards = boards.filter((board) => board.title !== title);
    setBoards(updatedBoards);
  };

  useEffect(() => {
    if (isEditTitle) {
      reset();
      setFocus("editTitle");
    }
  }, [isEditTitle, setFocus, reset]);

  return (
    <style.TitleContainer>
      {isEditTitle ? (
        <style.EditBoardForm onSubmit={handleSubmit(onEditTitle)}>
          <input
            {...register("editTitle", { required: true })}
            type="text"
            placeholder="Type here"
            defaultValue={title}
            autoComplete="off"
          />
          <style.EditCancelBtn onClick={onCancelEditTitle} />
        </style.EditBoardForm>
      ) : (
        <>
          <h2>{title}</h2>
          <style.IconContainer>
            <style.EditIcStyle onClick={onShowEditTitle} />
            <style.DeleteIcStyle onClick={onDelete} />
          </style.IconContainer>
        </>
      )}
    </style.TitleContainer>
  );
};

export default BoardTitle;
