import drawLine from "./drawLine"
import drawPolygon from "./drawPolygon";

export default function updateContext(layer, mode, {
    coords, 
    actionCoords, 
    actionMoveCoords,
    addLine, 
    addPolygon,
    coordsRef,
    snapCoords,
    lines,
    polygons,
}) {
    switch(mode) {
        case 'line': drawLine(layer, { 
            coords, 
            actionCoords, 
            actionMoveCoords,
            addLine,
            coordsRef,
            snapCoords,
            lines,
        }); break;
        case 'polygon': drawPolygon(layer, { 
            coords, 
            actionCoords, 
            actionMoveCoords,
            addPolygon,
            coordsRef,
            snapCoords,
            polygons,
        }); break;
        case 'scaling': break;
        default: break;
    }
}