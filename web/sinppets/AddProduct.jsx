import { Box, Button, HStack, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

const AddProduct = ({id}) => {
  const [products, setProducts] = useState([]);
  // const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from the backend API
    const fetchProducts = async () => {
      try {
        // console.log(distributorId)
        const response = await fetch(`${process.env.BACKEND_URL}/api/products/${id}`);
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  // useEffect(() => {
  //   // Fetch products associated with this distributor
  //   fetch(`http://localhost:5000/api/products/${id}`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json(); // Attempt to parse JSON only if response is OK
  //     })
  //     .then((data) => setProducts(data))
  //     .catch((error) => console.error("Error fetching products:", error));
  // }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove deleted product from the state
        setProducts(products.filter((product) => product._id !== id));
        alert("Product deleted successfully");
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Box p="1rem" bgColor="white" mb="1rem" w="60%">
      {products.length > 0 ? (
        products.map((product) => (
          <HStack
            p="1rem"
            m="2rem"
            key={product._id}
            justifyContent="space-between"
            h="3rem"
            w="100%"
          >
            <Box w="20%" boxSize="3rem" bgColor="yellow.600">
              <Image src={`${process.env.BACKEND_URL}/${product.image}`} />
            </Box>
            <Text w="40%">{product.productName}</Text>
            <Text w="10%">{product.price}</Text>
            <Text w="20%">{new Date(product.expiry).toLocaleDateString()}</Text>
            <Box w="10%">
              <Button
                onClick={() => handleDelete(product._id)}
                colorScheme="red"
              >
                Delete
              </Button>
            </Box>
          </HStack>
        ))
      ) : (
        <p>No products found for this distributor.</p>
      )}
    </Box>
  );
};

export default AddProduct;
