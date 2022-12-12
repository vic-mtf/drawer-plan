import { Box } from "@mui/material";

export default function ImageToIcon({src, size, disabled, ...otherProps}) {
    return(
        <>
        <Box
            component='img'
            src={src}
            width={size}
            height={size}
            {...otherProps}
            sx={{
                filter: `grayscale(${disabled ? 100 : 0}%)`
            }}
        />
        </>
    );
}

ImageToIcon.default = {
    src: null,
    size: 30,
    disabled: false
};