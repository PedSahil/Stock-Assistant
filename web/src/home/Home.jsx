import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CheckIcon, SearchIcon } from "@chakra-ui/icons";
import React from "react";
// import AddDistributer from "../../sinppets/AddDistributer";
import ExpiryList from "../../sinppets/ExpiryList";
import { Link } from "react-router-dom";
import NewDistributor from "../popups/NewDistributor";
import DistributorList from "../../sinppets/DistributorLIst";

const Home = () => {
  return (
    <VStack bgColor="#F9F9F9" w="100vw" h="100vh">
      <HStack p="1rem" w="100%" gap="8rem">
        <Box w="10rem" h="4rem">
          <Image src="../Images/logo.png" alt="logo" />
        </Box>
        <Box>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none" // This ensures the icon doesn't interfere with typing
              children={<SearchIcon color="gray.500" />} // The color of the icon
            />
            <Input
              borderColor="gray.500"
              borderRadius="1rem"
              fontSize="1rem"
              w="40rem"
              variant="outline"
              placeholder="Outline"
            />
          </InputGroup>
        </Box>
        <Spacer />
        <HStack gap="3rem">
          <Box boxSize="2.5rem">
            <Image src="../Images/profile.png" alt="logo" />
          </Box>
          <Button colorScheme="red">Sign out</Button>
        </HStack>
      </HStack>
      {/* NAv bar Completed */}
      <HStack gap="10rem">
        <Box w="30rem" h="45rem" bgColor="white" p=".5rem">
          <Flex>
            <Text fontWeight="400" fontSize="1.6rem">
              Distributers
            </Text>
            <Spacer />
            <NewDistributor />
          </Flex>

          <Box h="80%" mt="1rem">
            <DistributorList />
          </Box>
        </Box>
        <Box bg="white" w="70rem" h="45rem" p="1rem">
          <VStack alignItems="start">
            <Text fontWeight="400" fontSize="1.6rem">
              Upcoming Expiry
            </Text>
            <Box h="100%" w="30rem" gap="1rem">
              <ExpiryList />
            </Box>
          </VStack>
        </Box>
      </HStack>
    </VStack>
  );
};

export default Home;
