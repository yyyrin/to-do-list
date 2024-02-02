import { Droppable } from "react-beautiful-dnd";
import * as style from "../style/toDoArea.styles";
import { ITodo } from "../../../atoms";
import DraggableCard from "../../DraggableCard";

const ToDoArea = ({ content, title }: { content: ITodo[]; title: string }) => {
  return (
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
  );
};

export default ToDoArea;
