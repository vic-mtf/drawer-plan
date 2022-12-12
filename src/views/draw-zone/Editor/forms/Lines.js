import { useState } from "react";
import { Shape } from "react-konva";
// import { useMode } from "../../../../utils/mode";
import { useSnapCoordsRef } from "./Forms";
import config from "../../../../config/config.json";
import { useLayer } from "../plan/Plan";
import isOneOf from "../../../../utils/isOneOf";
import { useSelector } from "react-redux";

const initOption = {
    strokeWidth: config.canvas.strokeWidth,
    dash: [],
    hover: false,
};

const CustomLine = ({points, onClick, ...otherProps}) => {
    // const [mode] = useMode();
    const mode = useSelector(store => store.drawZone.mode);
    const [option, setOption] = useState({
        ...initOption, 
        stroke: otherProps.stroke
    });
    const [,setPoint] = useSnapCoordsRef();
    const coords = [
        {x: points[0], y: points[1]}, 
        {x: points[2], y: points[3]}
    ];
    const layer = useLayer();
    
    const handleMouseEnter = e => {
        setPoint({id: otherProps.id, points: coords});
        setOption({
            strokeWidth: config.canvas.strokeWidthDrawer,
            dash: config.canvas.dashDrawer,
            hover: true,
            stroke: config.canvas.uniqueColorDrawer ? 
            config.canvas.defaultColorDrawer : otherProps.stroke
        });
        layer.parent.container().style.cursor = 'pointer';
    };

    const handleMouseLeave = e => {
        setPoint(null);
        setOption({...initOption, stroke: otherProps.stroke});
        layer.parent.container().style.cursor = 'default';
    };

    return (
        <Shape
            onMouseEnter={isOneOf(mode, ['line', 'clear']) && handleMouseEnter}
            onMouseLeave={isOneOf(mode, ['line', 'clear']) && handleMouseLeave}
            onClick={mode === 'clear' && onClick}
            {...otherProps}
            strokeWidth={option.strokeWidth}
            dash={option.dash}
            stroke={option.stroke}
            sceneFunc={(context, shape) => {
                coords.map(({x, y}, index) => {
                    if(index)
                        context.lineTo(x, y);
                    else {
                        context.beginPath();
                        context.moveTo(x, y);
                    }
                        // (!) Konva specific method, it is very important
                    if(coords.length - 1 === index) {
                       // context.closePath();
                        context.fillStrokeShape(shape);
                    }
                return({x, y});
                }).forEach(({x, y}, index) => {
                    if(option.hover){
                        shape.fill(option.stroke);
                        context.beginPath();
                        context.arc(x, y, config.canvas.radius, 0, Math.PI * 2);
                        context.fillShape(shape);
                    }
                });
            }}
        />
    )

};

export default function Lines ({lines, actionLines}) {
    const layer = useLayer();
    
    return (
        lines.map((props, index) => (
            <CustomLine 
                key={index}
                onClick={() => {
                    actionLines.remove(props.id);
                    layer.parent.container().style.cursor = 'default';
                }}
                {...props}
            />
        ))
        
    )
}