import * as style from "./styles";

const Header = () => {
  return (
    <style.HeaderContainer>
      <hr />
      <style.Title>TO DO LIST</style.Title>
      <hr />
      <style.SubWrapper>
        <style.SubTitle>Create a new board 👉</style.SubTitle>
        <style.BoardCreateForm>
          <input
            type="text"
            placeholder={`Type board name here and press enter to create`}
          />
        </style.BoardCreateForm>
      </style.SubWrapper>
      <hr />
    </style.HeaderContainer>
  );
};

export default Header;
