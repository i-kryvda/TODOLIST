import TodoConfirmModal from "@components/molecules/TodoConfirmModal/TodoConfirmModal";
import { useTodos } from "@app/context/todo";

import TodoPanel from "@components/organisms/TodoPanel/TodoPanel";
import TodoList from "@components/organisms/TodoList/TodoList";

import { deleteTodo, clearTodoToDelete } from "@app/context/todo/actions";
import { toast } from "react-toastify";

export default function TodoWidgets() {
  const { selectedTodo, dispatch } = useTodos();

  const onDeleteTodo = () => {
    toast.info("DELETE");
    if (!selectedTodo) return;
    dispatch(deleteTodo(selectedTodo.id));
    dispatch(clearTodoToDelete());
  };

  const onCanselDelete = () => {
    dispatch(clearTodoToDelete());
  };

  return (
    <main className="main">
      <section className="todo">
        <div className="todo__container">
          <TodoPanel />
          <TodoList />
        </div>
      </section>
      {!!selectedTodo && (
        <TodoConfirmModal onConfirm={onDeleteTodo} onCansel={onCanselDelete} />
      )}
    </main>
  );
}
