import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { ITodo } from "../atoms";

const Wrapper = styled.div`
  width: 300px;
  background-color: ${(props) => props.theme.boardColor};
  padding-top: 10px;
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

interface IAreaProps {
  $isDraggingOver: boolean;
  $isDraggingFromThisWith: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.$isDraggingOver
      ? "#dfe6e9"
      : props.$isDraggingFromThisWith
      ? "#b2b3c3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

interface IForm {
  toDo: string;
}

const Board = ({ toDos, boardId }: IBoardProps) => {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    setValue("toDo", "");
  };

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            $isDraggingOver={snapshot.isDraggingOver}
            $isDraggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;

/* Droppablestate snapshot

- isDraggingOver: boolean
  - 현재 선택한 Draggable이 특정 Droppable 위에 드래깅 되고 있는지 여부 확인

- draggingOverWith: ?DraggableId
  - Droppable 위로 드래그하는 Draggable ID

- draggingFromThisWith: ?DraggableId
  - 현재 Droppable에서 벗어나 드래깅되고 있는 Draggable ID

- isUsingPlaceholder: boolean
  - placeholder가 사용되고 있는지 여부
*/

/* useRef()

- .current 프로퍼티로 전달된 인자(initalValue)로 초기화된 변경 가능한 ref를 반환함
- 반환된 객체는 컴포넌트의 전 생명주기(life cycle) 동안 유지됨
- 일반적인 사용 사례는 children에 접근하는 경우이며, 이를 통해 DOM 요소나 다른 컴포넌트에 접근할 수 있음
- useRef는 함수 컴포넌트에서 변경 가능한 상태를 유지할 수 있는 유일한 방법이며, 렌더링과 관계없이 값이 보존됨
- 주로 이전 상태 또는 프로퍼티 값을 저장하고 싶을 때 활용됨

- ref 속성 대신 useRef()를 사용하는 것이 더 유용함
- 클래스 컴포넌트에서는 인스턴스 필드를 사용하여 상태를 관리하지만, 함수 컴포넌트에서는 useRef를 사용하여 유지되는 값을 갖게 됨

- 주의: useRef를 사용하여 DOM에 직접 접근하는 것은 피해야 하며, 이런 경우에는 useEffect와 함께 활용하는 것이 좋음
*/
