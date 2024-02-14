import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const App = () => {
  const getProducts = async () => {
    const response = await axios(`${baseURL}/products`);
    return response.data;
  };
  const {
    isLoading,
    isError,
    data: Products,
  } = useQuery({ queryKey: ["Products"], queryFn: getProducts });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{data.error}</div>;
  }
  return (
    <>
      <p>{Products}</p>
    </>
  );
};

export default App;
