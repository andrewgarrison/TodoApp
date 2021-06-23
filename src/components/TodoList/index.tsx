import { VStack } from '@chakra-ui/react';
import { Todo } from '../Todo';
import { ITodo } from '../../types';

interface TodoListProps {
  todos: ITodo[];
}

export function TodoList({ todos }: TodoListProps) {
  return (
    <VStack spacing={4} mt={24}>
      {(todos || []).map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </VStack>
  );
}
