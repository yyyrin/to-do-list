import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "../DraggableCard";
import { IBoard, ITodo, boardState } from "../../atoms";
import { useRecoilState } from "recoil";
import * as style from "./styles";

interface IForm {
  toDo: string;
}

const Board = ({ content, title }: IBoard) => {
  const [boards, setBoards] = useRecoilState(boardState);
  const { register, setValue, handleSubmit } = useForm<IForm>();

  // 폼 제출 시 호출되는 함수
  const onValid = ({ toDo }: IForm) => {
    // 새로운 toDo 생성
    const newToDo: ITodo = {
      id: Date.now(),
      text: toDo,
    };

    // recoil 상태 업데이트
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

    // 입력 필드 초기화
    setValue("toDo", "");
  };

  // board 삭제
  const onDelete = () => {
    const updatedBoards = boards.filter((board) => board.title !== title);

    setBoards(updatedBoards);
  };

  return (
    <style.Wrapper>
      <style.TitleContainer>
        <h2>{title}</h2>
        <style.DeleteIcStyle onClick={onDelete} />
      </style.TitleContainer>
      <style.Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on task`}
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
