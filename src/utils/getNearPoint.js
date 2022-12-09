import config from '../config/config.json';

export default function getNearPoint(points, point, errorMargin = config.canvas.radius * 2) {
    const {x, y} = point || {};
    return points?.find((point) => 
        ((x - point?.x) **2 + (y - point?.y)**2)**.5 <= errorMargin
        ) || null
}