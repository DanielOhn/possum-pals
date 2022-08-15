import { useState } from "react";

const Image = ({alt, file}) => {
    const [image, setImage] = useState("small");
    
    const onClick = (e) => {
        if (image === "small") {
            setImage("expand");
        } else {
            setImage("small");
        }
    }
    
    return (
        <div className={image}>
            <img role="tab" tabindex="0" onClick={(e) => onClick(e)} alt={alt} src={file} />
        </div>
    )
}

export default Image;