import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { QUERY_CATEGORIES } from "../utils/queries";

const Home = () => {
  // const { loading, data } = useQuery(QUERY_CATEGORIES);

  // useEffect(() => {
  //   if (data) {
  //     console.log(data);
  //   }
  //   console.log(loading);
  //   console.log(data);
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <div>Homepage</div>
      <hr />
      {/* {data.categories.map((category) => (
        <div key={category._id}>
          <div>{category._id}</div>
          <div>{category.name}</div>
        </div>
      ))} */}
    </>
  );
};

export default Home;
