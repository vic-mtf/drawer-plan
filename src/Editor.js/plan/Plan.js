import { createContext, useContext, useEffect, useRef } from "react";
import { Image, Layer, Transformer } from "react-konva";
import useImage from "../../utils/useImage";
import getSize from "../../utils/getSize";
import { useMode } from "../../utils/mode";
import Forms from "../forms/Forms";
import isOneOf from "../../utils/isOneOf";
import removeEvent from "../../utils/removeEvent";
import { useFocusPlan } from "./DrawingArea";

const layerRef = createContext(null);
const LayerProvider = layerRef.Provider;
export const useLayer = () => useContext(layerRef).current;


export default function Plan ({
    isSelected, 
    onSelect, 
    onChange, 
    children, 
    src, 
    layerProps,
    data,
}) {
    const [image] = useImage(src);
    const shapeRef = useRef();
    const trRef = useRef();
    const layerRef = useRef();
    const [planFocus] = useFocusPlan();
    const {height, width} = getSize({
        width: image?.width, 
        height: image?.height
    });
    const [mode] = useMode();
    const handleTransformEnd = (e) => {

        const node = shapeRef.current;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        
        onChange({
            ...data,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
        });
    };

    const handlBoundBox = (oldBox, newBox) => {   
        if (newBox.width < 5 || newBox.height < 5) 
            return oldBox;
        return newBox;
    };

    useEffect(() => {
        if (isSelected && mode) {
            trRef.current?.nodes([shapeRef.current]);
            trRef.current?.getLayer().batchDraw();
        }

        if(planFocus?.id === layerProps.id) {
            removeEvent(layerRef.current);
        }

    }, [isSelected, mode, layerProps, planFocus]);

    return (
            <Layer
                {...layerProps}
                draggable={isOneOf(mode, ['default', 'scaling'])}
                ref={layerRef}
                imageSmoothingEnabled
                opacity={planFocus?.id === layerProps.id ? .5 : 1}
            >
                {!!image &&
                <Image
                    image={image}
                    onClick={onSelect}
                    onTap={onSelect}
                    name="image"
                    ref={shapeRef}
                    {...data}
                    onTransformEnd={handleTransformEnd}
                    height={height}
                    width={width}
                    onDragEnd={(e) => {
                        onChange({
                            ...data,
                            x: e.target.x(),
                            y: e.target.y(),
                        });
                    }}
                />}
                {children}
                {(isSelected && mode === 'scaling') && (
                    <Transformer
                        rotateEnabled={false}
                        ref={trRef}
                        boundBoxFunc={handlBoundBox}
                    />
                )}
                <LayerProvider value={layerRef}>
                    <Forms/>
                </LayerProvider>
            </Layer>
    );
};
      