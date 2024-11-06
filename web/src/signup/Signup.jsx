import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Input,
  Spacer,
  Square,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const Signup = () => {
  return (
    <VStack h="100vh" bgColor="#F9F9F9">
      <Container
        borderRadius="1em"
        w="lg"
        h="70vh"
        mt="7em"
        bg="white"
        color="gray.400"
      >
        <Flex h="100%" p="2em" gap="2em" direction="column">
          <Center
            mx="auto"
            w="100%"
            h="15%"
            color="black"
            fontSize="2rem"
            fontWeight={600}
          >
            Sign Up
          </Center>

          <Flex h="40%" direction="column" gap="2em">
            <Input m="1em" variant="flushed" placeholder="Enter Mobile" />
            
            <Input m="1em" variant="flushed" placeholder="Enter Email" />
            
            <Input m="1em" variant="flushed" placeholder="Enter New Password" />
          </Flex>

          <Box  textAlign="right">
            <Button w="20%" colorScheme="teal" variant="solid">
              Button
            </Button>
          </Box>
        </Flex>
      </Container>
    </VStack>
  );
};

export default Signup;
