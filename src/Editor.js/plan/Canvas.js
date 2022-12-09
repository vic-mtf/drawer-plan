import React, { useState } from "react";
import { Stage } from "react-konva";
import config from '../../config/config.json';

export default function Canvas ({children}) {
    const {height, width, className} = config.canvas;
    const [selectedId, selectShape] = React.useState(null);
    const cloneChildren = React.Children.map(children, children => 
        React.cloneElement(children, {selectedId, selectShape})
    );
    const checkDeselect = (e) => {
      // deselect when clicked on empty area
      const clickedOnEmpty = e.target === e.target.getStage();
      if (clickedOnEmpty) {
        selectShape(null);
      }
    };
    const [stageProps, setStageProps] = useState({
        scaleX: 1,
        scaleY: 1,
        x: 0,
        y: 0
    });
    
    const handleWheel = (e) => {
        e.evt.preventDefault();
        const { minZoom, maxZoom} = config.canvas;
        const scaleBy = 1.02;
        const stage = e.target.getStage();
        const oldScale = stage.scaleX();
        const mousePointTo = {
          x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
          y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
        };
    
        let stageScale = e.evt.deltaY > 0 ? 
        oldScale * scaleBy : oldScale / scaleBy;
        stageScale = stageScale < 1 ? minZoom : 
        stageScale > 10 ? maxZoom : stageScale; 
        const stageX = -(mousePointTo.x - stage.getPointerPosition().x / stageScale) 
        * stageScale;
        const stageY = -(mousePointTo.y - stage.getPointerPosition().y / stageScale) 
        * stageScale;

        setStageProps({
            scaleX: stageScale,
            scaleY: stageScale, 
            x: stageX, 
            y: stageY
        });
      };

    return (
        <Stage
            width={width}
            height={height}
            className={className}
            onWheel={handleWheel}
            {...stageProps}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
            //draggable
        >
            {cloneChildren}
        </Stage>
    )
} 