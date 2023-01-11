import { Box, useTheme } from "@mui/material";
import React, { useState } from "react";
import { Stage } from "react-konva";
import config from '../../../../config/config.json';
import { useSelector } from "react-redux";

export default function Canvas ({children}) {
    const {height, width, className} = config.canvas;
    const [selectedId, selectShape] = React.useState(null);
    const theme = useTheme();
    const open = useSelector(store => store.navZone.openDrawer);
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
        const scaleBy = 1.1;
        const stage = e.target.getStage();
        const oldScale = stage.scaleX();
        const mousePointTo = {
          x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
          y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
        };
    
        let stageScale = e.evt.deltaY < 0 ? 
        oldScale * scaleBy : oldScale / scaleBy;
        stageScale = stageScale < 0.5 ? minZoom : 
        stageScale > 20 ? maxZoom : stageScale; 
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
      // <Box
      //   sx={{height, width, background: `url(${background})`,
      //       backgroundRepeat: 'no-repeat'
      //   }}
      // >
      //   <Stage
      //     // width={width}
      //     // height={height}
      //     className={className}
      //     onWheel={handleWheel}
      //     {...stageProps}
      //     onMouseDown={checkDeselect}
      //     onTouchStart={checkDeselect}
      //     style={{background: 'transparent'}}
      //     //draggable
      //   >
      //     {cloneChildren}
      //   </Stage>
      // </Box>
      <Stage
            width={open ? width : 995} 
            height={height}
            className={className}
            onWheel={handleWheel}
            {...stageProps}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
            style={{
              height: `${height}px`,
              width: `${open ? width : 995}px`,
              border: `1px solid ${theme.palette.divider}`,
              background: (() => {
                const nbr = height / (height/ 2);
                let css = [];
                for(let i = 0; i < nbr; i++)
                  if(i%2 === 0) css.push(theme.palette.primary.main);
                  else css.push(theme.palette.background.paper);

                return `linear-gradient(${
                  css.join(',')
                })`;
              })(),
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100%',
            }}
            draggable
        >
            {cloneChildren}
        </Stage>
    );
} 