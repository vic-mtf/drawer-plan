import getCoords from "./getCoords";
import projectPoint from "./projectPoint";

export default function drawLine (layer, {
    coords, 
    actionCoords,
    actionMoveCoords,
    addLine,
    snapCoords,
}) {
    layer.on('click', e => {
        if(e.evt.which === 1)  {
            const [snapData] = snapCoords;
            const {x, y} = getCoords(layer);
            const {id: ref, points } = snapData || {id: null, points: []};
            const [firstPoint] = coords;
            const {point} = firstPoint || {};
            const distance = ((x - point?.x) **2 + (y - point?.y)**2)**.5;

            if(ref) {
                console.log('points', points, {x, y});
                console.log('projection',projectPoint([points[0].x, points[0].y, points[1].x, points[1].y], {x, y}));
            }

            if (coords.length && distance > 10) {
                    addLine([point.x, point.y,  x, y]);
                    //console.log(proje)
                    actionCoords.clear();
                    actionMoveCoords.clear();
                    layer.parent.container().style.cursor = 'default';
            } else {
                actionCoords.add({ref: null, point:{x, y}});
                layer.parent.container().style.cursor = 'pointer';
            }
        }

        if(e.evt.which === 3)  {
           if (coords.length) {
                actionCoords.clear();
                actionMoveCoords.clear();
            }
        }
        
    });

    layer.on('mousemove', e => {
        if (coords.length) {
            actionMoveCoords.lastReplace(getCoords(layer));
            layer.parent.container().style.cursor = 'pointer';
        }
    });

    layer.on('contextmenu', e => {
        e.evt.preventDefault();
    });

    
}