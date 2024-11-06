import React from "react";
import Signup from "./signup/Signup";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Login from "./login/Login";
import Otp from "./otp/Otp";
import Home from "./home/Home";
import Products from "./products/Products";

const App = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:distributorId" element={<Products />} />
          <Route path="/otp" element={<Otp/>} />
          <Route path="/signUp" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;

