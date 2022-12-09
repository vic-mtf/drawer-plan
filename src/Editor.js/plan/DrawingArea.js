import { createContext, useContext, useState } from "react";
import Plan from "./Plan";
import config from '../../config/config.json';
import src_a from '../../assets/Fundation_0.png'
import src_b from '../../assets/Fundation_1.png'

const drawingArea = createContext();
const DrawingAreaProvider = drawingArea.Provider;
export const useFocusPlan = () => useContext(drawingArea);

export default function DrawingArea ({selectedId, selectShape}) {
    const [plans, setPlan] = useState([{
        id:'victor', 
        src: src_a, 
        data: {x:0, y:0}
    }, 
    {
        id: 'test', 
        src: src_b,
        data: {x:0, y:0}
    }]);
    const [planFocus, setPlanFocus] = useState(null);
    const {width, height} = config.canvas;
    
    return (
        <DrawingAreaProvider value={[planFocus, setPlanFocus]}>
           {plans.map((plan, index) => (
                <Plan
                    isSelected={selectedId === plan.id}
                    key={index}
                    onSelect={() => selectShape(plan.id)}

                    onChange={(newAttrs) => {
                        const clonePlans = [...plans];
                        clonePlans[index].data = newAttrs;
                        setPlan([...clonePlans]);
                    }}
                    src={plan.src}
                    layerProps={{
                        width: width / plans.length,
                        heigh: height,
                        x: width * index / plans.length,
                        y: 0,
                        id: ((index + 1) * 12340).toString(16),
                    }} 
                    data={plan.data}
                />
           ))} 
        </DrawingAreaProvider>
    );
}
