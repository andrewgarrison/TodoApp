import { format } from 'date-fns';
import { Box, Stack, Heading, Text, IconButton } from '@chakra-ui/react';
import { EditIcon, CloseIcon } from '@chakra-ui/icons';
import { useModalContext, useTodoContext } from '../../contexts';
import { ITodo, CategoryNames, Colors } from '../../types';
import { FormModal } from '../../components/FormModal';

interface TodoProps {
  todo: ITodo;
}

export function Todo(props: TodoProps) {
  const { todo } = props;
  const { title, description, category, dueDate } = todo;
  const { open } = useModalContext();
  const { removeTodo } = useTodoContext();
  const categoryColors: Record<CategoryNames, Colors> = {
    Productivity: 'red',
    Errands: 'orange',
    Work: 'gold',
    Cleaning: 'green',
    Fitness: 'blue',
    Personal: 'indigo',
    Other: 'purple',
  };

  console.log(dueDate);

  return (
    <Box
      p='4'
      w='100%'
      border='1px solid'
      borderColor='gray.200'
      borderRadius='md'
    >
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Box>
          <Stack direction='row'>
            {category && (
              <Text fontSize='xs' color={categoryColors[category]}>
                {category}
              </Text>
            )}
            {dueDate && (
              <Text fontSize='xs' color='gray.600'>
                {format(new Date(dueDate), 'MM/dd/yy, h:mmaaa')}
              </Text>
            )}
          </Stack>
          <Heading as='h4' size='md' mt='0.5' mb='1'>
            {title}
          </Heading>
          {description && (
            <Text fontSize='sm' color='gray.600'>
              {description}
            </Text>
          )}
        </Box>
        <Stack direction='row'>
          <IconButton
            aria-label='Edit Todo'
            icon={<EditIcon />}
            variant='ghost'
            size='xs'
            onClick={() => open(<FormModal formType='Edit' todo={todo} />)}
          />
          <IconButton
            aria-label='Remove Todo'
            icon={<CloseIcon />}
            variant='ghost'
            size='xs'
            colorScheme='red'
            onClick={() => removeTodo(todo)}
          />
        </Stack>
      </Box>
    </Box>
  );
}
