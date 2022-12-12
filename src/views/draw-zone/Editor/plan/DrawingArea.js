import { createContext, useContext, useState } from "react";
import Plan from "./Plan";
import config from '../../../../config/config.json';
import { useDispatch, useSelector } from "react-redux";
import { updateDataImage } from "../../../../redux/navZone";

const drawingArea = createContext();
const DrawingAreaProvider = drawingArea.Provider;
export const useFocusPlan = () => useContext(drawingArea);

export default function DrawingArea ({selectedId, selectShape}) {
    const imagesSelected = useSelector(store => store.navZone.imagesSelected);

    const [planFocus, setPlanFocus] = useState(null);
    const {width, height} = config.canvas;
    const dispatch = useDispatch();
    return (
        <DrawingAreaProvider value={[planFocus, setPlanFocus]}>
           {imagesSelected.map((plan, index) => (
                <Plan
                    isSelected={selectedId === plan.id}
                    key={index}
                    onSelect={() => selectShape(plan.id)}
                    onChange={(newAttrs) => dispatch(updateDataImage({...plan, data: newAttrs}))}
                    src={plan.src}
                    layerProps={{
                        width: width / imagesSelected.length,
                        heigh: height,
                        x: width * index / imagesSelected.length,
                        y: 0,
                        id: plan.id,
                    }} 
                    data={plan.data}
                    id={plan.id}
                />
           ))} 
        </DrawingAreaProvider>
    );
}
