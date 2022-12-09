import { createContext, useContext, useState } from "react";
import useArrayData from "../../utils/useArrayData";
import DrawerOverLine from "./DrawerOverLIne";
import config from '../../config/config.json';
import Lines from "./Lines";
import Polygons from "./Polygons";
import ScalinArrow from "./ScalinArrow";

const snapCoordsRef = createContext();
const SnapCoordsProvider = snapCoordsRef.Provider;
export const useSnapCoordsRef = () => useContext(snapCoordsRef);

export default function Forms () {
    const [lines, actionLines] = useArrayData();
    const [polygons, actionPolygons] = useArrayData();
    const [value, setValue] = useState(null);
    const color = '#a29704';
    const scaleX = 1;
    const scaleY = 1;

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
            <ScalinArrow/>
        </SnapCoordsProvider>
    )

}