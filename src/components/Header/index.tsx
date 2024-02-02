import { useForm } from "react-hook-form";
import * as style from "./styles";
import { useSetRecoilState } from "recoil";
import { IBoard, boardState } from "../../atoms";

interface BoardFormInput {
  board: string;
}

const Header = () => {
  const setBoard = useSetRecoilState(boardState);
  const { register, setValue, handleSubmit } = useForm<BoardFormInput>();

  const onBoardCreate = ({ board }: BoardFormInput) => {
    const newBoard: IBoard = {
      title: board,
      content: [],
    };

    setBoard((currnetBoards) => [...currnetBoards, newBoard]);

    setValue("board", "");
  };

  return (
    <style.HeaderContainer>
      <hr />
      <style.Title>TO DO LIST</style.Title>
      <hr />
      <style.SubWrapper>
        <style.SubTitle>Create a new board 👉</style.SubTitle>
        <style.BoardForm onSubmit={handleSubmit(onBoardCreate)}>
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
