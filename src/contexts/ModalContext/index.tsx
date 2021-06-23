import { ReactNode, createContext, useContext, useState } from 'react';
import { Modal, ModalOverlay } from '@chakra-ui/react';

interface ModalContextProviderProps {
  children: React.ReactNode;
}

interface IModalContext {
  isOpen: boolean;
  open: (node: ReactNode) => void;
  close: () => void;
}

const defaultValue: IModalContext = {
  isOpen: false,
  open: () => {},
  close: () => {},
};

export const ModalContext = createContext<IModalContext>(defaultValue);
export const useModalContext = () => useContext(ModalContext);

export const ModalContextProvider = (props: ModalContextProviderProps) => {
  const { children } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [contents, setContents] = useState<ReactNode>(null);

  const open = (node: ReactNode) => {
    setContents(node);
    setIsOpen(true);
  };

  const close = () => {
    setContents(null);
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isOpen, open, close }}>
      <Modal isOpen={isOpen} onClose={close} size='2xl'>
        <ModalOverlay />
        {contents}
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};
