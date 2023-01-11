import { useState } from "react";
import { Shape } from "react-konva";
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

const CustomNode = ({points, onClick, ...otherProps}) => {
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
            onMouseEnter={isOneOf(mode, ['nodes', 'clear']) && handleMouseEnter}
            onMouseLeave={isOneOf(mode, ['nodes', 'clear']) && handleMouseLeave}
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
                    shape.fill(option.stroke);
                    context.beginPath();
                    context.arc(x, y, 10, 0, Math.PI * 2);
                    context.stroke();
                    // context.fillShape(shape);
                });
            }}
        />
    )

};

export default function Nodes ({nodes, actionNodes}) {
    const layer = useLayer();
    
    return (
        nodes.map((props, index) => (
            <CustomNode 
                key={index}
                onClick={() => {
                    actionNodes.remove(props.id);
                    layer.parent.container().style.cursor = 'default';
                }}
                {...props}
            />
        ))
        
    )
}