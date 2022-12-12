import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemIcon, ListItemText, Tooltip, IconButton, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DescriptionIcon from '@mui/icons-material/Description';
import useImage from '../../utils/useImage';

const CustomListItemText = ({src, ...otherProps}) => {
    const [image] = useImage(src);
    useEffect(() => {
        console.log(image);
    }, []);
    return(
        <ListItemText {...otherProps}
            secondary={`${image?.width} × ${image?.height}`}
            sx={{flexGrow: 1}}
        />
    )
}

export default function DownloadButton() {
    const [open, setOpen] = useState(false);
    const imagesSelected = useSelector(store => store.navZone.imagesSelected);
    const handleDownload = ({id, name}) => () => {
        const downloadEvent = new CustomEvent("download_file", { detail: {name, id}});
        document.dispatchEvent(downloadEvent);
    }
    const handleClick = () => {
        if(imagesSelected.length === 1) {
            handleDownload(imagesSelected[0])();
        } else {
            setOpen(true);
        }
    }
    return(
        <>
        <Tooltip title="Télécharger le fichier">
            <Box>
                <IconButton disabled={!imagesSelected.length} onClick={handleClick}>
                    <FileDownloadIcon/>
                </IconButton>
            </Box>
        </Tooltip>
        <Dialog open={open} BackdropProps={{sx: {backdropFilter: 'blur(15px)'}}}>
          <DialogTitle>
            <Typography flexGrow={1}>
                Télécharger le fichier
            </Typography>
          </DialogTitle>
          <DialogContent sx={{width: 500}}>
            <List>
                {imagesSelected.map((image, index) => (
                    <ListItem key={image.id} button onClick={handleDownload(image)}>
                        <ListItemIcon>
                            <DescriptionIcon/>
                        </ListItemIcon>
                        <CustomListItemText
                            primary={"etage "+index}
                            src={image.src}
                        />
                        <ListItemIcon>
                            <FileDownloadIcon/>
                        </ListItemIcon>
                    </ListItem>
                ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpen(false)}
              color="primary"
              size="small"
            >
              Annuler
            </Button>
          </DialogActions>
        </Dialog>
        </>
    );
}