export default function getCrop(image, size) {
    const width = size.width;
    const height = size.height;
    const aspectRatio = width / height;

    let newWidth;
    let newHeight;

    const imageRatio = image.width / image.height;

    if (aspectRatio >= imageRatio) {
      newWidth = image.width;
      newHeight = image.width / aspectRatio;
    } else {
      newWidth = image.height * aspectRatio;
      newHeight = image.height;
    }
    
    return {
      cropX: (image.width - newWidth) / 2,
      cropY: (image.height - newHeight) / 2,
      cropWidth: newWidth,
      cropHeight: newHeight,
    };
  }