
import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Typography, Card } from 'antd';
import { useQuery } from "@apollo/client";
import { QUERY_ALL_PRODUCTS } from "../../utils/queries";
const { Text } = Typography;

function ProductDropDown() {
  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS)

  if (loading) {
    return <div>Loading...</div>;
  }
  var items = []
  // console.log(data?.products)
  data?.products.forEach(function (i) {
    var link = "/product/" + i._id
    const item =
    {
      label: (
        <a target="_blank" rel="noopener noreferrer" href={link}>
          {i.name}
        </a>
      ),
    }
    items.push(item);
  });


  return (
    <Card style={{ width: 300}}>
      <Dropdown menu={{ items }}>
        {/* <a onClick={(e) => e.preventDefault()}> */}
        <Space>
          <Text>View Products</Text>
          <DownOutlined />
        </Space>
        {/* </a> */}
      </Dropdown>
    </Card>
  );

}

export default ProductDropDown