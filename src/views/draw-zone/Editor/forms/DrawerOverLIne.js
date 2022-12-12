import { useEffect } from "react";
import { Shape } from "react-konva";
// import { useMode } from "../../../../utils/mode";
import useArrayData from "../../../../utils/useArrayData";
import { useLayer } from "../plan/Plan";
import updateContext from "../../../../utils/updateContext";
import config from "../../../../config/config.json";
import { useSnapCoordsRef } from "./Forms";
import removeEvent from "../../../../utils/removeEvent";
import { useSelector } from "react-redux";

const { 
    strokeWidthDrawer,
    opacityDrawer,
    uniqueColorDrawer,
    defaultColorDrawer,
    dashDrawer,
    radius,
 } = config.canvas;

export default function DrawerOverLine ({addLine, addPolygon, lines, polygons}) {
    const layer = useLayer();
    // const [mode] = useMode();
    const mode = useSelector(store => store.drawZone.mode);
    const [coords, actionCoords] = useArrayData();
    const [moveCoords, actionMoveCoords] = useArrayData();
    const snapCoords = useSnapCoordsRef();
    const color = "#ff000";
    const points = [...coords.map(({point}) => point), ...moveCoords];
    const currentColor = uniqueColorDrawer ? defaultColorDrawer : color;
    
    useEffect(() => {
        if(layer) {
            removeEvent(layer)
            updateContext(layer, mode, {
                coords, 
                moveCoords, 
                actionCoords, 
                actionMoveCoords,
                addLine, 
                addPolygon,
                color,
                snapCoords,
                lines, 
                polygons
            });
            layer.on('mouseleave', e => {
                if(coords.length) {
                    actionCoords.clear();
                    actionMoveCoords.clear();
                }
            })
        }
    },);

    return ( !!points.length &&
        <Shape
            stroke={currentColor}
            dash={dashDrawer}
            strokeWidth={strokeWidthDrawer}
            sceneFunc={(context, shape) => {
                points.map(({x, y}, index) => {

                        shape.fill(
                            currentColor + Math.round(opacityDrawer * 255)
                            .toString(16)
                        );
                        if(index)
                            context.lineTo(x, y);
                        else {
                            context.beginPath();
                            context.moveTo(x, y);
                        }
                            // (!) Konva specific method, it is very important
                        if(points.length - 1 === index) {
                           // context.closePath();
                            context.fillStrokeShape(shape);
                        }
                    return({x, y});
                }).forEach(({x, y}, index) => {
                    shape.fill(currentColor);
                    context.beginPath();
                    context.arc(x, y, radius, 0, Math.PI * 2);
                    context.fillShape(shape);
                });
            }}
        />
    );
}