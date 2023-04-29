
import React from 'react';
import { DownOutlined} from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import {  useQuery } from "@apollo/client";
import { QUERY_ALL_PRODUCTS} from "../../utils/queries";

function ProductDropDown() {
  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS)

  if (loading) {
    return <div>Loading...</div>;
  }
    var items = []
    console.log(data?.products)
    data?.products.forEach(function ( i) {
      var link = "/products/" + i._id
      const item = 
      {
        label: (
          <a target="_blank" rel="noopener noreferrer" href = {link}>
            {i.name}
          </a>
        ),
      }
    items.push(item);
});
   

  return (
    <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            View Products
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
  );
  
}

export default ProductDropDown