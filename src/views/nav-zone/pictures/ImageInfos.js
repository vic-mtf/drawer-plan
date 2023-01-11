import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button';
import { Box, Divider, IconButton, InputBase, List, ListItem, ListItemText, Skeleton, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';

export default function ImageInfos ({open, handelOpen, imageSrc}) {
    const [image, setImage] = useState({name: 'etage number', readOnly: true});
    const inputRef = useRef();

    useEffect(() => {
        if(!(image.width && image.height && open)) {
            const img = new Image();
            img.src = imageSrc;
            img.onload = event => {
                const { height, width } = event.target;
                setImage(img => ({...img, height, width}));
            };
        }
    });

    return (
        <Dialog open={open}>
          <DialogTitle>
                Information d'image
          </DialogTitle>
          <DialogContent>
            <List sx={{width: 360}}>
                {Boolean(image.height && image.width) ?
                    <>
                        <ListItem>
                            <ListItemText
                                secondary={
                                    <Typography
                                        component="form"
                                        sx={{display: 'flex', alignItems: 'center'}}
                                        onSubmit={event => {
                                            event.preventDefault();
                                            setImage(img => ({
                                                ...img, 
                                                readOnly: true
                                            }));
                                        }}
                                    >
                                        <b>Nom</b>: 
                                        <InputBase 
                                            size="small"
                                            readOnly={image.readOnly}
                                            variant="standard"
                                            value={image.name}
                                            onBlur={() => {
                                                setImage(img => ({
                                                    ...img, 
                                                    readOnly: true
                                                }));
                                            }}
                                            inputRef={inputRef}
                                            onChange={event => {
                                                setImage(img => ({
                                                    ...img, 
                                                    name: event.target.value
                                                }));
                                            }}
                                            sx={{
                                                outline: 0,
                                                outlineColor: 'transparent',
                                                outlineWidth: 0,
                                                border: 'none',
                                                ml: 1,
                                                height: 50,
                                                font: theme => theme.typography.body1.font,
                                                fontSize: theme => theme.typography.body1.fontSize,
                                            }}
                                        />
                                    </Typography>
                                }
                            />
                            {image.readOnly &&
                            <IconButton 
                                title='Modifier'
                                onClick={() => {
                                    setImage(img => ({...img, readOnly: false}));
                                    inputRef.current.focus();
                                    inputRef.current.select();
                                }}
                            >
                                <CreateIcon/>
                            </IconButton>}
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <ListItemText
                                secondary={
                                    <Typography>
                                        <b>Taiile</b>: {image.height}x{image.width}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </> :
                    <>
                        <ListItem>
                            <Skeleton
                                variant="rectangular"
                                sx={{
                                    display: 'felx',
                                    flex: 1,
                                    height: 45,
                                }}
                            />
                        </ListItem>
                        <ListItem>
                            <Skeleton
                                variant="rectangular"
                                sx={{
                                    display: 'felx',
                                    flex: 1,
                                    height: 45,
                                }}
                            />
                        </ListItem>
                    </>
                }
            </List>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handelOpen}
            >
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
    );
}