import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

export interface IBoard {
  title: string;
  content: ITodo[];
}

// localStorage에서 값을 가져오거나 저장하는 동작을 수행하는 함수
const syncWithLocalStorage = (key: string, defaultValue: IBoard[]) => {
  const storedValue = localStorage.getItem(key);

  if (storedValue) {
    try {
      return JSON.parse(storedValue);
    } catch (error) {
      console.log("Error parsing localStorage", error);
      return defaultValue;
    }
  }

  return defaultValue;
};

export const boardState = atom<Array<IBoard>>({
  key: "board",
  default: syncWithLocalStorage("board", []),
  // Recoil에서 상태 변경 시 특정 동작을 수행할 때 사용되는 부분
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newValue) => {
        try {
          localStorage.setItem("board", JSON.stringify(newValue));
        } catch (error) {
          console.log("Error saving to localStorage", error);
        }
      });
    },
  ],
});
