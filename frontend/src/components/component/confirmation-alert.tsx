'use client'

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton
  } from '@chakra-ui/react';
  import { useDisclosure } from '@chakra-ui/react';
  import React from 'react';
import { Button } from '../ui/button';
  
  export default function TransitionExample({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
  
    return (
      <>
        {children}
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />
  
          <AlertDialogContent>
            <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Are you sure you want to discard all of your notes? 44 words will be
              deleted.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                No
              </Button>
              <Button colorScheme="red" ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }
  