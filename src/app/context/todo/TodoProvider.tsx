import {
  ReactNode,
  useMemo,
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";

import { State, TodoContextType } from "@app/context/todo/types";
import { reducer } from "@app/context/todo/reducer";

const TodosContext = createContext<TodoContextType | undefined>(undefined);

const initialState: State = {
  todos: [],
  selectedTodo: null,
  filterColor: "default",
};

function init(initial: State): State {
  const todosLocal = localStorage.getItem("todos");
  const filterLocal = localStorage.getItem("filter");
  return {
    ...initial,
    todos: todosLocal ? JSON.parse(todosLocal) : initial.todos,
    filterColor: filterLocal ? JSON.parse(filterLocal) : initial.filterColor,
  };
}

export function TodoProvider({ children }: { children: ReactNode }) {
  const [{ todos, filterColor, selectedTodo }, dispatch] = useReducer(
    reducer,
    initialState,
    init
  );

  useEffect(() => {
    // localStorage.clear()
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("filter", JSON.stringify(filterColor));
  }, [todos, filterColor]);

  const processedTodos = useMemo(() => {
    const completedTodos = todos.filter((item) => item.complete);
    const activeTodos = todos.filter((item) => !item.complete);
    const pinnedTodos = [...activeTodos].sort(
      (a, b) => Number(b.isPinned) - Number(a.isPinned)
    );
    const filterTodos =
      filterColor === "default"
        ? pinnedTodos
        : pinnedTodos.filter((item) => item.color === filterColor);

    return { completedTodos, filterTodos };
  }, [todos, filterColor]);

  const value: TodoContextType = {
    todos,
    selectedTodo,
    filterColor,
    dispatch,
    processedTodos,
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("Ops, problems with TodosContext");
  }
  return context;
}
