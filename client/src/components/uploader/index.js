import React, { useState, createRef } from "react";
import { Form, Upload} from 'antd';
import {
    PlusOutlined
} from "@ant-design/icons";

const Uploader = (props) => {
    const [image, _setImage] = useState();
    const inputFileRef = createRef();
    const cleanup = () => {
        URL.revokeObjectURL(image && props.image);
        inputFileRef.current.value = null;
    };

    const setImage = (newImage) => {
        if (image) {
            cleanup()
        }
        _setImage(newImage)
    };

    const handleOnChange = (event) => {
        const newImage = event.target.files[0];
        if (newImage) {
            setImage(URL.createObjectURL(newImage));
        }
        props.imageUpload(event)
    }

    return (
        <Form.Item rules={[{ required: true, message: 'Image Required' }]} label="Image" name="image"  onChange={handleOnChange}>
            <Upload maxCount={1} listType="picture-card" ref={inputFileRef}>
                <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                </div>
            </Upload>
        </Form.Item>
    )
}

export default Uploader