import initPropsCanvas from "./initPropsCanvas";

export default function linePointCheck ({x, y}, coords = []) {
    const {a, b} = equation(...coords);
    const [{x: xA, y: yA}, {x: xB, y: yB}] = coords;
    const pente = Math.abs(y - (a * x) - b);
    const includeX = xA < xB ? (xA <= x) && (x <= xB) : (xB <= x) && (x <= xA);
    const includeY = yA < yB ? (yA <= y) && (y <= yB) : (yB <= y) && (y <= yA);
    return pente <= initPropsCanvas.lineWidth && includeX && includeY;
}

const equation = ({x: xA, y: yA}, {x: xB, y: yB}) => {
    const a = (yB - yA)/(xB - xA);
    const b = yB - a * xB;
    return {a, b}
}