'use client'

import { useEffect } from 'react';
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';

const TabWarning = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // User switched tabs or minimized the window
        onOpen(); // Open the modal
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [onOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center"  color={'red'}>Warning</ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign="center">
          <p>You're not allowed to switch tabs during exams. This action will be reported to HR.</p>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button colorScheme="red" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TabWarning;
