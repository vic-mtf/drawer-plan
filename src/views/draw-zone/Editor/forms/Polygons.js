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

const CustomPolygon = ({points, onClick, ...otherProps}) => {
    const mode = useSelector(store => store.drawZone.mode);
    const [option, setOption] = useState({
        ...initOption, 
        stroke: otherProps.stroke
    });
    const [,setPoint] = useSnapCoordsRef();
    const layer = useLayer();
    
    const handleMouseEnter = e => {
        setPoint({id: otherProps.id, points});
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
            onMouseEnter={isOneOf(mode, ['polygon', 'clear']) && handleMouseEnter}
            onMouseLeave={isOneOf(mode, ['polygon', 'clear']) && handleMouseLeave}
            onClick={mode === 'clear' && onClick}
            {...otherProps}
            strokeWidth={option.strokeWidth}
            dash={option.dash}
            stroke={option.stroke}
            sceneFunc={(context, shape) => {
                points.map(({x, y}, index) => {

                    shape.fill(
                        option.stroke + Math.round(config.canvas.opacity * 255)
                        .toString(16)
                    );
                    if(index)
                        context.lineTo(x, y);
                    else {
                        context.beginPath();
                        context.moveTo(x, y);
                    }
                    
                    if(points.length - 1 === index) {
                        context.closePath();
                        context.fillStrokeShape(shape);
                    }
                return({x, y});
                }).forEach(({x, y},) => {
                    if(option.hover) {
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

export default function Polygons ({polygons, actionPolygons}) {
    const layer = useLayer()
    return (
        polygons.map((props, index) => (
            <CustomPolygon
                key={index}
                onClick={() => {
                    actionPolygons.remove(props.id);
                    layer.parent.container().style.cursor = 'default';
                }}
                {...props}
            />
        ))
        
    )
}