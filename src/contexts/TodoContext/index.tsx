import { createContext, useContext } from 'react';
import { useLocalStorage } from '../../hooks';
import { ITodo } from '../../types';

interface TodoContextProviderProps {
  children: React.ReactNode;
}

interface ITodoContext {
  todos: ITodo[];
  addTodo: (todo: ITodo) => void;
  removeTodo: (todo: ITodo) => void;
  updateTodo: (todo: ITodo) => void;
}

const defaultValue: ITodoContext = {
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
  updateTodo: () => {},
};

export const TodoContext = createContext<ITodoContext>(defaultValue);
export const useTodoContext = () => useContext(TodoContext);

export const TodoContextProvider = (props: TodoContextProviderProps) => {
  const { children } = props;
  const [todos, setTodos] = useLocalStorage<ITodo[]>('todos', []);

  const addTodo = (todo: ITodo) => {
    setTodos([...todos, todo]);
  };

  const removeTodo = (todo: ITodo) => {
    const { id } = todo;
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (todo: ITodo) => {
    const { id } = todo;
    setTodos(todos.map((_todo) => (_todo.id === id ? todo : _todo)));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, removeTodo, updateTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
