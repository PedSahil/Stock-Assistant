import { Box, Button, HStack, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Constant_String } from "./Constant";
import { useNavigate } from "react-router-dom";

const DistributorList = () => {
  const [distributors, setDistributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from the backend API
    const fetchDistributors = async () => {
      try {
        const response = await fetch(`${Constant_String}/api/distributors`);
        const data = await response.json();
        setDistributors(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching distributors:", error);
        setLoading(false);
      }
    };

    fetchDistributors();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${Constant_String}/api/distributors/${id}`,
        {
          method: "DELETE",
        }
      );
      console.log(response);
      if (response.ok) {
        // Remove deleted product from the state
        setDistributors(
          distributors.filter((distributor) => distributor.id !== id)
        );
        alert("distributor deleted successfully");
      } else {
        alert("Failed to delete distributor");
      }
    } catch (error) {
      console.error("Error deleting distributor:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Box p="1rem" bgColor="white" mb="1rem" w="100%">
      {distributors.map((distributor) => (
        <Box
          onClick={() => {
            navigate(`/products/${distributor.distributorId}`);
            console.log(distributor.distributorId);
          }}
          key={distributor.distributorId}
        >
          <HStack
            p="2rem"
            m="1rem"
            bg="green.100"
            justifyContent="space-between"
            h="2rem"
            w="100%"
          >
            <Text>{distributor.distributorId}</Text>
            <Text>{distributor.name}</Text>
            <Text>{distributor.contact}</Text>
            <Button
              w="20%"
              onClick={() => handleDelete(distributor.distributorId)}
              colorScheme="red"
            >
              Delete
            </Button>
          </HStack>
        </Box>
      ))}
    </Box>
  );
};

export default DistributorList;
