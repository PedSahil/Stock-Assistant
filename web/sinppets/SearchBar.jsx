import React, { useState } from "react";
import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import axios from "axios";
import { SearchIcon } from "@chakra-ui/icons";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.length > 3) {
      // Start searching only when there are enough characters
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/search?q=${searchQuery}`
        );
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setResults([]); // Clear results if search query is too short
    }
  };

  return (
    <Box>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none" // This ensures the icon doesn't interfere with typing
          children={<SearchIcon color="gray.500" />} // The color of the icon
        />
        <Input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={handleSearch}
          borderColor="gray.500"
          borderRadius="1rem"
          fontSize="1rem"
          w="40rem"
          variant="outline"
        />
      </InputGroup>
      <Box>
        {results.length > 0 ? (
          <ul>
            {results.map((product) => (
              <li key={product._id}>{product.name}</li>
            ))}
          </ul>
        ) : query.length > 1 ? (
          <p>No products found</p>
        ) : null}
      </Box>
    </Box>
  );
};

export default SearchBar;
