import { createContext, useContext, useEffect, useState } from "react";
import useArrayData from "../../../../utils/useArrayData";
import DrawerOverLine from "./DrawerOverLIne";
import config from '../../../../config/config.json';
import Lines from "./Lines";
import Polygons from "./Polygons";
import ScalingArrow from "./ScalingArrow";
import { useLayer } from "../plan/Plan";
import { useSelector } from "react-redux";

const snapCoordsRef = createContext();
const SnapCoordsProvider = snapCoordsRef.Provider;
export const useSnapCoordsRef = () => useContext(snapCoordsRef);

export default function Forms () {
    const [lines, actionLines] = useArrayData();
    const [polygons, actionPolygons] = useArrayData();
    const [value, setValue] = useState(null);
    const color = useSelector(store => store.drawZone.color);
    const scaleX = 1;
    const scaleY = 1;
    const layer = useLayer();
    const handleAddLine = points => {
        actionLines.add({
            points,
            stroke: color,
            strokeWidth: config.canvas.strokeWidth,
            scaleX,
            scaleY,
        });
    }
    const handleAddPolygon = points => {
        actionPolygons.add({
            points,
            stroke: color,
            fill: color + Math.round(config.canvas.opacity * 255)
            .toString(16),
            scaleX,
            scaleY,
        });
    }

    useEffect(() => {
        const handleDownload = (event) => {
            const {id, name} = event.detail;
            if(layer) {
                if(layer.id() === id) {
                    const data = {
                        floors: [
                           {
                              floor: prompt("Numéro d'étage")/*layer.get('name')*/,
                              walls: lines.map( ({points}) => ({
                                 points: [ {x: points[0], y: points[1] }, {x: points[2], x: points[3]} ]
                              })),
                             clusters: polygons.map( ({points, stroke: color}, index) => ({ points, color, index})),
                           }
                        ]
                    };
                    const file = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(file);
                    link.download = 'indoors-coords.json';
                    link.click();
                }
            }
        }
        document.addEventListener('download_file', handleDownload);
        return () => {
            document.removeEventListener('download_file', handleDownload);
        }
    });

    return (
        <SnapCoordsProvider value={[value, setValue]}>
            <DrawerOverLine
                addLine={handleAddLine}
                addPolygon={handleAddPolygon}
                lines={lines}
                polygons={polygons}
            />
            <Lines
                lines={lines}
                actionLines={actionLines}
            />
            <Polygons
                polygons={polygons}
                actionPolygons={actionPolygons}
            />
            <ScalingArrow/>
        </SnapCoordsProvider>
    )

}