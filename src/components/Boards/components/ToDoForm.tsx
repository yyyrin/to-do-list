import { useForm } from "react-hook-form";
import * as style from "../style/toDoForm.styles";

interface ToDoFormData {
  toDo: string;
}

const ToDoForm = ({ onValid }: { onValid: (data: ToDoFormData) => void }) => {
  const { register, handleSubmit } = useForm<ToDoFormData>();

  return (
    <style.Form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("toDo", { required: true })}
        type="text"
        placeholder={`Add task on task`}
        autoComplete="off"
      />
    </style.Form>
  );
};

export default ToDoForm;
