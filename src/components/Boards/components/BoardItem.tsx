import { useForm } from "react-hook-form";
import { IBoard, ITodo, boardState } from "../../../atoms";
import { useSetRecoilState } from "recoil";
import * as style from "../style/boardItem.styles";
import BoardItemTitle from "./BoardItemTitle";
import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";

interface ToDoFormData {
  toDo: string;
}

const BoardItem = ({ content, title }: IBoard) => {
  const setBoards = useSetRecoilState(boardState);
  const { register, handleSubmit, setValue } = useForm<ToDoFormData>();

  const onToDoCreate = ({ toDo }: ToDoFormData) => {
    const newToDo: ITodo = {
      id: Date.now(),
      text: toDo,
    };

    setBoards((currentBoards) => {
      const updatedBoards = [...currentBoards];
      const targetBoardIndex = updatedBoards.findIndex(
        (board) => board.title === title
      );

      if (targetBoardIndex !== -1) {
        updatedBoards[targetBoardIndex] = {
          ...updatedBoards[targetBoardIndex],
          content: [...updatedBoards[targetBoardIndex].content, newToDo],
        };
      }

      return updatedBoards;
    });

    setValue("toDo", "");
  };

  return (
    <style.Wrapper>
      <BoardItemTitle title={title} />
      <style.Form onSubmit={handleSubmit(onToDoCreate)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on task`}
          autoComplete="off"
        />
      </style.Form>
      <Droppable droppableId={title} type="card">
        {(provided) => (
          <style.Area ref={provided.innerRef} {...provided.droppableProps}>
            {content.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
                title={title}
              />
            ))}
            {provided.placeholder}
          </style.Area>
        )}
      </Droppable>
    </style.Wrapper>
  );
};

export default BoardItem;
