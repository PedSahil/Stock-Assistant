import React, { useState } from "react";
import axios from 'axios'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";

const NewDistributor = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI modal controls
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  //   const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = {
      name,
      contact,
      // You can add other fields here if needed
    };
  
    try {
      const response = await axios.post("http://localhost:5000/api/distributors", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 201) {
        console.log("Distributor added:", response.data);
  
        // Reset form and close modal
        setName("");
        setContact("");
        onClose();
      } else {
        console.error("Failed to add distributor:", response);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <>
      {/* Button to open modal */}
      <Button
        onClick={onOpen}
        borderRadius="1rem"
        variant="outline"
        colorScheme="green"
      >
        Add New Distributor
      </Button>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> New Distributor</ModalHeader>

          <ModalBody>
            <form  encType="multipart/form-data">
              <FormControl id="name" isRequired>
                <FormLabel>Distributor Name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>

              <FormControl id="contact" isRequired mt={4}>
                <FormLabel>Contact</FormLabel>
                <Input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewDistributor;
