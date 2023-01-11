import { createContext, useContext, useEffect, useRef } from "react";
import { Image, Layer, Transformer } from "react-konva";
import useImage from "../../../../utils/useImage";
import getSize from "../../../../utils/getSize";
import Forms from '../forms/Forms';
import isOneOf from "../../../../utils/isOneOf";
import removeEvent from "../../../../utils/removeEvent";
import { useFocusPlan } from "./DrawingArea";
import { useDispatch, useSelector } from "react-redux";
import { updateDataImage } from "../../../../redux/navZone";

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
    id,
}) {
    const dispatch = useDispatch();
    const [image] = useImage(src);
    const shapeRef = useRef();
    const trRef = useRef();
    const layerRef = useRef();
    const [planFocus] = useFocusPlan();
    const imagesOpacity = useSelector(store => 
        store.navZone?.imageScaled?.find(image =>  image.id === id)?.opacity
    );
    const {height, width} = getSize({
        width: image?.width, 
        height: image?.height
    });
    console.log('ici ....',data);
    const mode = useSelector(store => store.drawZone.mode);
    // const [mode] = useMode();
    const handleTransformEnd = (e) => {

        const node = shapeRef.current;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        
        onChange({
            ...data,
            x: node.x(),
            y: node.y(),
            scaleX,
            scaleY,
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
    
    useEffect(() => {
        const resetEvent = (event) => {
            const {id, name} = event.detail;
            shapeRef.current?.scaleX(1);
            shapeRef.current?.scaleY(1);
            dispatch(updateDataImage({id: id, data: {
                scaleX : 1,
                scaleY : 1
            }}));
        }
        document.addEventListener('reset_scaling', resetEvent);
        return () => {
            document.removeEventListener('reset_scaling', resetEvent);
        } 
    });

    useEffect(() => {
        const resetOriginEvent = (event) => {
            const {id, name} = event.detail;
            shapeRef.current?.parent.x(0);
            shapeRef.current?.parent.y(0);
        }
        document.addEventListener('reset_origin', resetOriginEvent);
        return () => {
            document.removeEventListener('reset_origin', resetOriginEvent);
        } 
    });

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
                    opacity={imagesOpacity}
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
                        rotateEnabled={true}
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
      