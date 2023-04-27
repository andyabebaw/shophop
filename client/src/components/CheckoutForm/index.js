import { Button } from 'antd';
import Auth from "../../utils/auth";
import React from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import CardSection from "../CardSection";
import ProductItem from '../ProductItem';
 
const cartItem = [];

function totalPrice() {
    let total = 0;
    cartItem.forEach((item) => {
        total += item.price * item.qantity;
    });
    return total.toFixed(2);
  };

class CheckoutForm extends React.Component {
  handleSubmit = async event => {
    event.preventDefault();

    const { stripe, elements } = this.props;
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log(result.token);
    }
  };

  render() {
    return (
      <div>
        <div className="product-info">
          <div className="product-name"> 
           {cartItem.map((item) => ( 
            <ProductItem key={item._id} item={item} />
            ))}
          </div>

          <strong>Total price: <span className="total_price">${totalPrice()}</span></strong>
        </div>
        <form onSubmit={this.handleSubmit}>
          <CardSection />
          {/* <Button type="primary"  htmlType="submit">
            Buy Now
          </Button> */}
          {Auth.loggedIn() ? (
          <Button type="primary" htmlType="submit">
            Buy Now
          </Button>
           ) : (
            <span>(log in to check out)</span>
          )}
        </form>
      </div>
    );
  }
}

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}

// export default CheckoutForm;     





