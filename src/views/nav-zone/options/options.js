import line from '../../../assets/icons8-ligne-96.png';
import polygon from '../../../assets/icons8-polygone-96.png';
import eraser from '../../../assets/icons8-gomme-96.png';
import scale from '../../../assets/icons8-règle-100.png';
import hand from '../../../assets/icons8-hand-tool-96.png';
import {store} from '../../../redux';

const mode = store.getState().drawZone.mode;

const options = [
    {
        icon : hand,
        title : "Défiler",
        mode: 'default'
    },
    {
        icon : line,
        title : "Dessiner un mur",
        mode: 'line'
    },
    {
        icon : polygon,
        title : "Dessiner un cluster",
        mode: 'polygon'
    },
    {
        icon : eraser,
        title : "Effacer",
        selected: mode === 'clear',
        mode: 'clear'
    },
    {
        icon : scale,
        title : "Mise à l'échelle",
        mode: 'scaling'
    }
];

export default options;