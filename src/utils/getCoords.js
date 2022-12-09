export default function getCoords(layer) {
    const  transform = layer?.getAbsoluteTransform().copy();
    transform?.invert();
    const stageCoord = layer?.parent.getStage()?.getPointerPosition();
    return transform?.point(stageCoord);
}