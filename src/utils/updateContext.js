import drawLine from "./drawLine"
import drawNodes from "./drawNodes";
import drawPolygon from "./drawPolygon";

export default function updateContext(layer, mode, {
    coords, 
    actionCoords, 
    actionMoveCoords,
    addLine,
    addNode, 
    addPolygon,
    coordsRef,
    snapCoords,
    lines,
    nodes,
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
        case 'nodes' : drawNodes(layer, {
            coords,
            actionCoords, 
            actionMoveCoords,
            addNode,
            coordsRef,
            snapCoords,
            nodes,
        }); break;
        case 'scaling': break;
        default: break;
    }
}