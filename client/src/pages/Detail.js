import { useMutation, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../utils/context/authContext";
import { ProductContext } from "../utils/context/productContext";
import { UPDATE_PRODUCT_REVIEWS } from "../utils/mutations";
import { QUERY_PRODUCT_ById } from "../utils/queries";

function Detail() {
  const { state: productState, dispatch: productDispatch } =
    useContext(ProductContext);
  const { state: userState } = useContext(AuthContext);
  const inputRef = useRef(null);
  const productId = useParams().id;
  const [updateProductReviews] = useMutation(UPDATE_PRODUCT_REVIEWS);
  const { loading, data } = useQuery(QUERY_PRODUCT_ById, {
    variables: { id: productId },
  });
  const product = data?.product || {};

  useEffect(() => {
    // console.log("product", product);
    // console.log("productState", productState);
    console.log("userState", userState);

    if (
      data &&
      productState.currentProductId === productId &&
      productState.reviews &&
      productState.reviews.length === 0 &&
      data.product.reviews && // check if reviews exists
      data.product.reviews.length > 0 // check if there are any reviews
    ) {
      productDispatch({
        type: "SET_REVIEWS",
        payload: data.product.reviews.map((review) => review.reviewBody),
      });
    }
    productDispatch({
      type: "SET_CURRENT_PRODUCT_ID",
      payload: productId,
    });
  }, [productState.reviews, data, productId]);

  useEffect(() => {
    return () => {
      productDispatch({ type: "CLEAR_REVIEWS" });
    };
  }, [productDispatch]);

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      productDispatch({
        type: "UPDATE_PRODUCT_REVIEW",
        payload: event.target.value,
      });
      // Side effect to update the database
      const mutationResponse = await updateProductReviews({
        variables: {
          productId: productId,
          reviewBody: event.target.value,
        },
      });
      console.log("mutationResponse", mutationResponse);
      inputRef.current.value = "";
    }
  };

  const redirectToEditPage = () => {
    window.location.href = `/edit/${productId}`;
  };

  const addToCart = () => {
    // TODO: Add to cart, implement this later, after we have the cart page, update to UI, etc.
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button type="button" onClick={addToCart}>
        Add to cart
      </button>
      {userState.user.data.isAdmin && (
        <button type="button" onClick={redirectToEditPage}>
          Edit (only for admin)
        </button>
      )}
      <hr />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Quantity: {product.quantity}</p>
      <hr />
      Category:
      {product.categories?.map((tag) => {
        return <div>{tag.name}</div>;
      })}
      <hr />
      Reviews:
      {productState.reviews?.map((review, idx) => {
        return <div key={idx}>{review}</div>;
      })}
      <hr />
      {userState.user && (
        <input
          id="my-input"
          type="text"
          placeholder="Add a review"
          ref={inputRef}
          onKeyDown={handleKeyDown}
        />
      )}
    </div>
  );
}

export default Detail;
