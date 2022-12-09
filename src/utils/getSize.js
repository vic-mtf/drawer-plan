import config from '../config/config.json';

export default function getSize (imgSize) {
    const aspectRatio = Math.min(
        config.canvas.width * .9 / imgSize?.width,
        config.canvas?.height * .9 / imgSize?.height
    );
    return ({
        width: imgSize.width * aspectRatio,
        height: imgSize.height * aspectRatio,
    });
}