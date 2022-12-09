import getCoords from "./getCoords";
import getNearPoint from "./getNearPoint";

export default function drawPolygon (layer, {
    coords, 
    actionCoords,
    actionMoveCoords,
    addPolygon,
    snapCoords,
   // polygons,
}) {
    layer.on('click', e => {
        const [snapData] = snapCoords;
        const {x, y} = getCoords(layer);
        const {id: ref, points } = snapData || {id: null, points: []};
        const nearPoint = getNearPoint(points, {x, y});

        if(e.evt.which === 1) {
            const [firstData] = coords;
        const {point, /*ref: firstRef*/} = firstData || {}; 
            const distance = ((x - point?.x) **2 + (y - point?.y)**2)**.5;
            //const nearWithFirstPoint = getNearPoint(points, point);
            if((coords.length >= 2) && nearPoint) {
                addPolygon([...coords.map(({point}) => point), nearPoint]);
                    // if(
                    //     nearWithFirstPoint?.x === point?.x && 
                    //     nearWithFirstPoint?.y === point?.y
                    // ) {
                    //     addPolygon([...coords.map(({point}) => point), nearPoint]);
                    // } else {
                    //     //const commonPoints = [];
                    //     // const commonPoints = polygons.find(({id}) => firstRef === id)?.points
                    //     // .filter(point => points.find(({x, y}) => x === point.x && y === point.y ));    
                    //     // if(commonPoints.find((({x, y}) => nearPoint.x === x && nearPoint.y === y))) {
                    //     //     addPolygon([...coords.map(({point}) => point), nearPoint]);
                    //     // } else 
                    //     console.log(commonPoints);
                    //     // actionCoords.add({
                    //     //     point: nearPoint || {x, y},
                    //     //     ref,
                    //     // });
                    // }
                    actionCoords.clear();
                    actionMoveCoords.clear();
            }
            else if (distance <= 10 && coords.length >= 3) {
                addPolygon(coords.map(({point}) => point));
                actionCoords.clear();
                actionMoveCoords.clear();
            }
            else {
                const [firstPoint] = coords;
                const distance = Math.min(
                    ...coords.map(({point}) => ((x - point?.x) **2 + (y - point?.y)**2)**.5)
                );
    
                if(distance > 10 || !firstPoint) {
                        actionCoords.add({
                            point: nearPoint || {x, y},
                            ref,
                        });
                }
            }
        }

        if(e.evt.which === 3) {
            actionCoords.pop();
            if(!coords.length)
                actionMoveCoords.clear();
        }
    });

    layer.on('mousemove', e => {
        if (coords.length) {
            actionMoveCoords.lastReplace(getCoords(layer));
        }
    });

    layer.on('contextmenu', e => {
        e.evt.preventDefault();
    });

}