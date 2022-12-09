import matrix from "matrix-js/lib";

export default function projectPoint (lineCoods, pointCoords) {

    const vect = [
        lineCoods[2] - lineCoods[0],
        lineCoods[3] - lineCoods[1]
    ];
    
    const a1 = vect[1];
    const b1 = -vect[0];
    const c1 = -(a1 * lineCoods[0]) + (b1 * lineCoods[1]);

    const a2 = vect[0]; 
    const b2 = vect[1];
    const c2 = - (a1 * pointCoords.x) + (b1 * pointCoords.y);

    const A = matrix([[a1, b1],[a2, b2]]);
    const B = matrix([[-c1], [-c2]]);
    const X = matrix(A.inv()).prod(B);

    const [x, y] = X 

    return {x, y};
}