import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { QUERY_ALL_PRODUCTS, QUERY_CATEGORIES } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
    console.log("loading", loading);
    console.log("data", data);
  }, [data, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>Homepage</div>
      <hr />
      {data?.products?.map((d) => (
        <div key={d._id}>
          <div>{d._id}</div>
          <div>{d.name}</div>
        </div>
      ))}
    </>
  );
};

export default Home;
