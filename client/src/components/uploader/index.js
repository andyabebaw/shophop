import React, { useState, createRef } from "react";

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
        <div>
            <input
                ref={inputFileRef}
                accept='image/*'
                id="image-upload"
                type="file"
                onChange={handleOnChange}
            />
            
        </div>
    )
}

export default Uploader