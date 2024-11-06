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
import AddProduct from "../../sinppets/AddProduct";
import NewProduct from "../popups/NewProduct";
import { Link, useParams } from "react-router-dom";
import SearchBar from "../../sinppets/SearchBar";

const Products = () => {
  const { distributorId } = useParams();
  console.log(distributorId)
  return (
    <Box p="1rem" bgColor="#F9F9F9" w="100vw" h="100vh">
      <HStack w="100%" gap="8rem" mb="2rem">
        <Box w="10rem" h="4rem">
          <Link to="/">
            <Image src="../../src/Images/logo.png" alt="logo" />
          </Link>
        </Box>
        <Box>
          <SearchBar/>
        </Box>

        <Spacer />
        <HStack gap="3rem">
          <Box boxSize="2.5rem">
            <Image src="../../src/Images/profile.png" alt="logo" />
          </Box>
          <Button colorScheme="red">Sign out</Button>
        </HStack>
      </HStack>

      {/*  Nav bar completed */}
      <Flex justifyContent="flex-end">
        <NewProduct distributorId={distributorId} />
      </Flex>
      <AddProduct id={distributorId} />
    </Box>
  );
};

export default Products;
