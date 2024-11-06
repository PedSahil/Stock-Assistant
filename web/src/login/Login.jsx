import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Input,
  Link,
  Spacer,
  Square,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const Login = () => {
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
        <Flex h="70%" p="2em" gap="2em" direction="column">
          <Center
            mx="auto"
            w="100%"
            h="15%"
            color="black"
            fontSize="2rem"
            fontWeight={600}
          >
            Quick Login
          </Center>
          <Spacer />
          <Flex h="40%" direction="column" gap="2em">
            <Input p='0' m="1em" variant="flushed" placeholder="Enter Mobile" />
          </Flex>

          <Flex >
           <Link color="#007CEE">Sign up ? </Link>
           <Spacer/>
            <Button w="20%" colorScheme="blue" color="white" variant="solid">
              Next
            </Button>
          </Flex>
        </Flex>
      </Container>
    </VStack>
  );
};

export default Login;
