import {
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { TodoForm } from '../Form';
import { ITodo, FormType } from '../../types';

interface FormModalProps {
  formType: FormType;
  todo?: ITodo;
}

export const FormModal = (props: FormModalProps) => {
  const { formType, todo = { title: '', id: '' } } = props;

  return (
    <ModalContent>
      <ModalHeader>{formType} Todo</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <TodoForm formType={formType} todo={todo} />
      </ModalBody>
      <ModalFooter />
    </ModalContent>
  );
};
