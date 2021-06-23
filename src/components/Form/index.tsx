import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Select,
  Stack,
} from '@chakra-ui/react';
import { v4 } from 'uuid';
import { Formik, Field, Form, FieldProps } from 'formik';
import { ITodo, Categories, FormType } from '../../types';
import { useTodoContext, useModalContext } from '../../contexts';

interface TodoFormProps {
  formType: FormType;
  todo?: ITodo;
}

export const TodoForm = (props: TodoFormProps) => {
  const { addTodo, updateTodo } = useTodoContext();
  const { close } = useModalContext();
  const { formType, todo = { title: '', id: '' } } = props;

  return (
    <Formik
      initialValues={todo}
      onSubmit={(values: ITodo) => {
        if (formType === 'Add') addTodo({ ...values, id: v4() });
        if (formType === 'Edit') updateTodo(values);
        close();
      }}
    >
      <Form>
        <Field name='title'>
          {({ field }: FieldProps) => (
            <FormControl mb={4} isRequired>
              <FormLabel htmlFor='title'>Title</FormLabel>
              <Input {...field} id='title' placeholder='Title' />
            </FormControl>
          )}
        </Field>
        <Field name='description'>
          {({ field }: FieldProps) => (
            <FormControl mb={4}>
              <FormLabel htmlFor='description'>Description</FormLabel>
              <Textarea {...field} id='description' placeholder='Description' />
            </FormControl>
          )}
        </Field>
        <Stack direction='row' mb={8}>
          <Field name='dueDate'>
            {({ field }: FieldProps) => (
              <FormControl>
                <FormLabel htmlFor='dueDate'>Due Date</FormLabel>
                <Input
                  {...field}
                  type='datetime-local'
                  id='dueDate'
                  placeholder='Due Date'
                />
              </FormControl>
            )}
          </Field>
          <Field name='category'>
            {({ field }: FieldProps) => (
              <FormControl>
                <FormLabel htmlFor='category'>Category</FormLabel>
                <Select {...field} id='category' placeholder='Select Category'>
                  {Object.keys(Categories).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </FormControl>
            )}
          </Field>
        </Stack>
        <Button type='submit' variant='solid' colorScheme='blue' w='100%'>
          {formType} Todo
        </Button>
      </Form>
    </Formik>
  );
};
