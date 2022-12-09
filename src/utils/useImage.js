import { useEffect, useRef, useState } from "react";

export default function useImage (src) {
    const [image, setImage] = useState(null);
    const [currentSrc, setSrc] = useState(src);
    const oldSrc = useRef(null);
    const handleChangeImage = (newSrc) => setSrc(newSrc);

    useEffect(() => {
        if(oldSrc.current !== currentSrc) {
            const img = new window.Image();
            img.src = currentSrc;
            img.onload = event => {
                oldSrc.current = currentSrc;
                setImage(event.target);
            }
        }
    },[image, oldSrc, currentSrc]);

    return [image, handleChangeImage];

}