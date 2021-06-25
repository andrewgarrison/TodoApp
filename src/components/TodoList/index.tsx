import React, { useState, useEffect } from 'react';
import { VStack, Box, Select } from '@chakra-ui/react';
import { Todo } from '../Todo';
import { ITodo } from '../../types';

interface TodoListProps {
  todos: ITodo[];
}

type Filters = 'Category' | 'Due Date' | '';

export function TodoList({ todos }: TodoListProps) {
  const [filter, setFilter] = useState<Filters>('');
  const [sortedTodos, setSortedTodos] = useState<ITodo[]>(todos);

  useEffect(() => {
    if (filter === 'Due Date') {
      const sortedByDate = todos.sort((a: ITodo, b: ITodo) => {
        const aDate = new Date(a.dueDate || 0);
        const bDate = new Date(b.dueDate || 0);

        return aDate.getTime() - bDate.getTime();
      });
      setSortedTodos([...sortedByDate]);
    } else if (filter === 'Category') {
      const sortedByCategory = todos.sort((a: ITodo, b: ITodo) =>
        (a.category || '').localeCompare(b.category || '')
      );
      setSortedTodos([...sortedByCategory]);
    } else {
      setSortedTodos([...todos]);
    }
  }, [todos, filter]);

  return (
    <Box mt={24} mb={24}>
      <Select
        placeholder='Sort By...'
        w='300px'
        value={filter}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setFilter(e.target.value as Filters)
        }
      >
        <option value='Category'>Category</option>
        <option value='Due Date'>Due Date</option>
      </Select>
      <VStack spacing={4} mt={8}>
        {sortedTodos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </VStack>
    </Box>
  );
}
