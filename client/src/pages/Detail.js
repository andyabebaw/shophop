import { useMutation, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../utils/context/authContext";
import { ProductContext } from "../utils/context/productContext";
import { UPDATE_PRODUCT_REVIEWS } from "../utils/mutations";
import { QUERY_PRODUCT_ById } from "../utils/queries";
import { Breadcrumb, Layout, Menu, theme, Typography, Divider, Button, Form, Input, Card } from 'antd';
import { ShoppingCartOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;


function Detail() {
  const { Header, Content, Footer } = Layout;
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
  const [form] = Form.useForm();

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

  const dispatchReview = async (values) => {

    productDispatch({
      type: "UPDATE_PRODUCT_REVIEW",
      payload: values.review,
    });
    // Side effect to update the database
    const mutationResponse = await updateProductReviews({
      variables: {
        productId: productId,
        reviewBody: values.review,
      },
    });
    console.log("mutationResponse", mutationResponse);

    // inputRef.current.value = "";
  };

  const addToCart = () => {
    // TODO: Add to cart, implement this later, after we have the cart page, update to UI, etc.
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Content style={{ padding: '0 50px' }}>
        <Title>{product.name}</Title>
        <Text type="secondary">{product.description}</Text>
        <Divider />
        <Title level={5} type="success">Price: ${product.price}</Title>
        <Text level={5}>Remaining: {product.quantity}</Text>
        <Divider />
        <Button type="default" icon={<ShoppingCartOutlined />} onClick={addToCart} size="Large">Add To Cart</Button>
        {userState.user?.data.isAdmin && (
          <Button type="primary" href={`/edit/${productId}`} danger>
            Edit This Product
          </Button>
        )}
        <Divider />
        {userState.user && (
          <Form
            form={form}
            name="basic"
            onFinish={(values) => {
              dispatchReview(values);
              form.resetFields();
            }}
            style={{ maxWidth: 600 }}
            labelCol={{ span: 8 }}
            initialValues={{ review: "" }}

          >
            <Form.Item
              name="review"
              rules={[{ required: true, message: 'Review Required' }]}
            >
              <Input placeholder="add my review" />
            </Form.Item>
            <Button type="default" htmlType="submit">
              Add My Review
            </Button>
          </Form>
        )}
        <Divider />
        <Title level={4}>
          Reviews:
        </Title>

        {productState.reviews?.map((review, idx) => {
          return (
            <Card
              style={{
                width: 600,
                height: 100
              }}
            >
              <p key={idx}>{review}</p>
            </Card>);
        })}

        <Divider />
        <Text>Associated Cateogires:
          {product.categories?.map((tag) => {
            return <div>{tag.name}</div>;
          })}
        </Text>
      </Content>
    </div>
  );
};

export default Detail;


// .site-layout-content {
//   min-height: 280px;
//   padding: 24px;
// }
// #components-layout-demo-top .logo {
//   float: left;
//   width: 120px;
//   height: 31px;
//   margin: 16px 24px 16px 0;
//   background: rgba(255, 255, 255, 0.3);
// }
// .ant-row-rtl #components-layout-demo-top .logo {
//   float: right;
//   margin: 16px 0 16px 24px;
// }