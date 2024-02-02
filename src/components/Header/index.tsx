import { useForm } from "react-hook-form";
import * as style from "./styles";
import { useSetRecoilState } from "recoil";
import { IBoard, boardState } from "../../atoms";

interface IBoardForm {
  board: string;
}

const Header = () => {
  const setBoard = useSetRecoilState(boardState);
  const { register, setValue, handleSubmit } = useForm<IBoardForm>();

  const onValid = ({ board }: IBoardForm) => {
    // 새로운 board 생성
    const newBoard: IBoard = {
      title: board,
      content: [],
    };

    setBoard((currnetBoards) => {
      return [...currnetBoards, newBoard];
    });

    // 입력 필드 초기화
    setValue("board", "");
  };

  return (
    <style.HeaderContainer>
      <hr />
      <style.Title>TO DO LIST</style.Title>
      <hr />
      <style.SubWrapper>
        <style.SubTitle>Create a new board 👉</style.SubTitle>
        <style.BoardForm onSubmit={handleSubmit(onValid)}>
          <input
            {...register("board", { required: true })}
            type="text"
            placeholder={`Type board name here and press enter to create`}
            autoComplete="off"
          />
        </style.BoardForm>
      </style.SubWrapper>
      <hr />
    </style.HeaderContainer>
  );
};

export default Header;
