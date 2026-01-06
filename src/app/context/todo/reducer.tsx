import { State, Action, ACTIONS } from "./types";

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ACTIONS.CREATE:
      return { ...state, todos: [action.payload, ...state.todos] };
    case ACTIONS.DELETE:
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== action.payload),
      };
    case ACTIONS.SET_TODO_TO_DELETE:
      return {
        ...state,
        selectedTodo: action.payload,
      };
    case ACTIONS.DONE:
      return {
        ...state,
        todos: state.todos.map((item) =>
          item.id === action.payload
            ? { ...item, complete: !item.complete }
            : item
        ),
      };
    case ACTIONS.EDIT:
      return {
        ...state,
        todos: state.todos.map((item) =>
          item.id === action.payload
            ? { ...item, isEditing: !item.isEditing }
            : item
        ),
      };
    case ACTIONS.PINNED:
      return {
        ...state,
        todos: state.todos.map((item) =>
          item.id === action.payload
            ? { ...item, isPinned: !item.isPinned }
            : item
        ),
      };
    case ACTIONS.PINNED_OFF:
      return {
        ...state,
        todos: state.todos.map((item) =>
          item.id === action.payload ? { ...item, isPinned: false } : item
        ),
      };
    case ACTIONS.UPDATE:
      return {
        ...state,
        todos: state.todos.map((item) =>
          item.id === action.payload.id
            ? { ...item, text: action.payload.value, isEditing: false }
            : item
        ),
      };
    case ACTIONS.PALETTE:
      return {
        ...state,
        todos: state.todos.map((item) =>
          item.id === action.payload.id
            ? { ...item, color: action.payload.color }
            : item
        ),
      };
    case ACTIONS.SET_FILTER_COLOR:
      return { ...state, filterColor: action.payload };

    default: {
      // const _exhaustiveCheck: never = action;
      return state;
    }
  }
}
