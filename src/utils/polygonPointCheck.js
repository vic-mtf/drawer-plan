import initPropsCanvas from "./initPropsCanvas";

export default function polygonPointCheck ({x, y}, coords = []) {

    let i, j = coords.length-1 ;
    let  oddNodes = false;

    const polyX = coords.map(({x}) => x+initPropsCanvas.lineWidth);
    const polyY = coords.map(({y}) => y+initPropsCanvas.lineWidth);

    for (i=0; i<coords.length; i++) {
        if ((polyY[i]< y && polyY[j]>=y || polyY[j]< y && polyY[i]>=y) && (polyX[i]<=x || polyX[j]<=x)) {
                oddNodes^=(polyX[i]+(y-polyY[i])/(polyY[j]-polyY[i])*(polyX[j]-polyX[i])<x); 
        }
        j=i; 
    }

    return !! oddNodes;
}