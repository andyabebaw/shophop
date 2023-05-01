import React  from 'react';
import { ShoppingCartOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Card, Button } from 'antd';
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

const { Meta } = Card;

const ProductCard = ({ name, price, image, _id }) =>  {
  const [state, dispatch] = useStoreContext();

  const { cart } = state
 const addToCart = () =>{
  const itemInCart = cart.find((cartItem) => cartItem._id === _id)
  if (itemInCart) {
    dispatch({
      type: UPDATE_CART_QUANTITY,
      _id: _id,
      purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
    });
    idbPromise('cart', 'put', {
      ...itemInCart,
      purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
    });
  } else {
    dispatch({
      type: ADD_TO_CART,
      product: { purchaseQuantity: 1 }
    });
    idbPromise('cart', 'put', { purchaseQuantity: 1 });
  }
 }
  return (
  <Card
    style={{ width: 300 }}
    cover={
      <img
        alt={name}
        src={image}
        style={{ height: "25vh", objectFit: 'cover' }}
      />
    }
    actions={[
      <ShoppingCartOutlined key="addToCart" onClick={addToCart} />,
      <Button icon={<InfoCircleOutlined />} key="info" type="link" href={`/products/${_id}`} />
    ]}
  >
    <Meta
      title={name}
      description={`$${price}`}
    />
  </Card>
);
  }
export default ProductCard;