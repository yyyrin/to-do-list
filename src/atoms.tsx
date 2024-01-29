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
  // localStorage에서 해당 key에 해당하는 값을 가져옴
  const storedValue = localStorage.getItem(key);

  if (storedValue) {
    try {
      // 저장된 값을 JSON 파싱하여 반환
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
          // 변경된 상태를 JSON 문자열로 변환하여 localStorage 저장
          localStorage.setItem("board", JSON.stringify(newValue));
        } catch (error) {
          console.log("Error saving to localStorage", error);
        }
      });
    },
  ],
});

/* Selector

- set?
  - 이 속성이 설정되면 selector는 쓰기 가능한 상태를 설정함
  - 첫 번째 매개변수로 콜백 객체와 새로 입력 값이 전달됨
  - selector가 재설정되면 새로 입력 값은 T 타입의 값 또는 DefaultValue 타입의 객체일 수 있음
  - 콜백에는 다음이 포함됨

- get 매개변수
  - 다른 atom이나 selector로부터 값을 찾는데 사용되는 함수
  - 주어진 atom이나 selector를 구독하지 않음

- set 매개변수
  - 업스트림 Recoil 상태를 업데이트하는 함수
  - 첫 번째 매개변수는 Recoil state, 두 번째 매개변수는 새로운 값(newValue)
  - 새로운 값은 업데이트 함수를 통해 전파되거나 DefaultValue 객체일 수 있음

```
const proxySelector = selector({
  key: "ProxySelector",
  get: ({ get }) => ({...get(myAtom), extraField: "hi"}),
  set: ({ set }, newValue) => set(myAtom, newValue),
});
```
*/
