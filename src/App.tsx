import { Container, Heading, Button } from '@chakra-ui/react';
import { TodoList } from './components';
import { getReadableDate } from './utils';
import { useTodoContext, useModalContext } from './contexts';
import { FormModal } from './components/FormModal';

function App() {
  const { todos } = useTodoContext();
  const { open } = useModalContext();

  return (
    <Container maxW='container.md'>
      <Heading size='lg' my='8'>
        {getReadableDate(new Date())}
      </Heading>
      <Button
        colorScheme='blue'
        onClick={() => open(<FormModal formType='Add' />)}
      >
        Add Todo
      </Button>
      <TodoList todos={todos} />
    </Container>
  );
}

export default App;
