import { CheckIcon } from "@chakra-ui/icons";
import { Button, CheckboxIcon, HStack, Spacer, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ExpiryList = () => {
  const [expiringProducts, setExpiringProducts] = useState([]);

  useEffect(() => {
    const fetchExpiringProducts = async () => {
      try {
        const response = await axios.get(
          ` ${process.env.BACKEND_URL}/api/products/expiry`
        );
        setExpiringProducts(response.data);
        console.log(expiringProducts);
      } catch (error) {
        console.error("Error fetching expiring products:", error);
      }
    };

    fetchExpiringProducts();
  }, []);
  return (
    <>
      {expiringProducts.length > 0 ? (
        expiringProducts.map((product) => (
          <HStack
            key={product._id}
            mb="1rem"
            p="1rem"
            w="100%"
            h="3rem"
            bgColor="orange.100"
          >
            <Text>
              {product.productName} - Expires on:{}
              {new Date(product.expiry).toLocaleDateString()}
            </Text>
            <Spacer />
            <Button
              borderRadius="3rem"
              justifyContent="center"
              variant="outline"
              colorScheme="green"
            >
              <CheckIcon />
            </Button>
          </HStack>
        ))
      ) : (
        <p>No products expiring soon.</p>
      )}
    </>
  );
};

export default ExpiryList;
