import React, { useState } from "react";
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
import { Constant_String } from "../../sinppets/Constant";

const NewProduct = ({distributorId}) => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI modal controls
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [expiry, setExpiry] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("expiry", expiry);
    formData.append("image", image);

    try {
      console.log(1);
      const response = await fetch(`${Constant_String}/api/products/${distributorId}`, {
        method: "POST",
        body: formData,
      });

      // Log response details to see what's happening
      // console.log("Response status:", response.status);
      // console.log("Response body:", await response.text());

      if (response.ok) {
        console.log(2);
        const result = await response.json();
        console.log("Product added:", result);

        // Reset form and close modal
        setProductName("");
        setPrice("");
        setExpiry("");
        setImage(null);
        onClose(); // Close modal if you have one
      } else {
        // If response is not ok, throw an error
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
        Add New Product
      </Button>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Product</ModalHeader>

          <ModalBody>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <FormControl id="productName" isRequired>
                <FormLabel>Product Name</FormLabel>
                <Input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </FormControl>

              <FormControl id="price" isRequired mt={4}>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </FormControl>

              <FormControl id="expiry" isRequired mt={4}>
                <FormLabel>Expiry Date</FormLabel>
                <Input
                  type="date"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                />
              </FormControl>

              <FormControl id="image" isRequired mt={4}>
                <FormLabel>Upload Image</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
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

export default NewProduct;
