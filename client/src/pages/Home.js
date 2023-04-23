import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { QUERY_CATEGORIES } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
    console.log(loading);
    console.log(data);
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {data?.categories?.map((category) => category.name)}

      <div>Home</div>
    </>
  );
};

export default Home;
