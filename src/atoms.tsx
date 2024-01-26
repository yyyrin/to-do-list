import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

export interface IToDoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
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
