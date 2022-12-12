import { useEffect, useState } from "react";
import { Arrow } from "react-konva";
import { useLayer } from "../plan/Plan";
import config from '../../../../config/config.json';
import getCoords from "../../../../utils/getCoords";
import removeEvent from "../../../../utils/removeEvent";
import { useFocusPlan } from "../plan/DrawingArea";
import { useDispatch, useSelector } from "react-redux";
import { updateDataImage } from "../../../../redux/navZone";

export default function ScalingArrow () {
    const mode = useSelector(store => store.drawZone.mode);
    const layer = useLayer();
    const [points, setPoints] = useState([]);
    const [plan, setPlan] = useFocusPlan();
    const dispatch = useDispatch();
    useEffect(() => {
        if(layer && mode === 'scaling') {
            removeEvent(layer);
            layer.on('dblclick', e => {
                const {x, y} = getCoords(layer);
                if(e.evt.which === 1) 
                setPoints([x,y]);
            });
            
            layer.on('click', e => {
                const {x, y} = getCoords(layer);
            
                if(e.evt.which === 1) {
                    if(points.length) {
                        setPoints([]);
                        if(plan) {
                            setPlan(null);
                            const distA = plan.distance;
                            const distB = ((x - points[0])**2 + (y - points[1])**2)**.5;
                            const [image] = layer.find('.image');
                            const scaleX = distA/distB;
                            image.scaleX(Math.min(scaleX));
                            dispatch(updateDataImage({id: layer.id(), data: {
                                scaleX,
                                scaleY: image.scaleY()
                            }}));
                        } else
                            setPlan({
                                id: layer.id(),
                                distance: ((x - points[0])**2 + (y - points[0])**2)**.5
                            });
                    } 
                   
                }
            });

            layer.on('mousemove', e => {
                const {x, y} = getCoords(layer);
                    if(points.length) {
                        setPoints([points[0], points[1], x,y]);
                    }     
            });

            layer.on('mouseleave', e => {
                setPoints([]); 
            });
        }
    });

    return ( !!points.length &&
        <Arrow
            tension={1}
            points={points}
            stroke={config.canvas.defaultColorDrawer}
            fill={config.canvas.defaultColorDrawer + 
                Math.round((255 * config.canvas.opacityDrawer)).toString(16)
            }
            dash={config.canvas.dashDrawer}
            strokeWidth={config.canvas.strokeWidthDrawer}
            pointerWidth={5}
        />
    )
}