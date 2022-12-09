export default function removeEvent(layer) {
    layer.off('mousedown');
    layer.off('mousemove');
    layer.off('click');
    layer.off('contextmenu');
    layer.off('mouseleave');
    layer.off('dblclick');
}