import { Stack, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateDataImage } from "../../redux/navZone";

export default function ScaleOptions({data, id}){
    const {canvas, objet} = data;
    const scaleFixe = objet?.height ? canvas?.height/objet?.height : 0;
    const kx = data.scaleX > 0.9999 && data.scaleX < 1 ? 1 : data.scaleX;
    const ky = data.scaleY > 0.9999 && data.scaleY < 1 ? 1 : data.scaleY;
    const dispatch = useDispatch();
    const handleChange = (scaleType) => (event) => {
        const {value} = event.target;
        if(value) {
            dispatch(updateDataImage({id, data: {
                ...data,
                [scaleType]: value
            }})); 
        }
    }
    // console.log(objet?.scaleX, objet?.scaleY);
    return(
        <Stack spacing={2} flexDirection='column' direction='column'
            display='flex'
            alignItems='center'
            justifyContent='center'
        >
            <TextField variant="outlined" type='number' label="Scale horizotal"
                inputProps={{
                    min: 0, 
                    step:0.2,
                    style: {
                        textAlign:'center',
                    }
                }} size='small' fullWidth
                onChange={handleChange("scaleX")}
                value={kx}
            />
            <TextField variant="outlined" type='number' label="Scale vericale"
                inputProps={{
                    min: 0,
                    step:0.2,
                    style: {
                        textAlign:'center',
                    }
                }} size='small' fullWidth
                onChange={handleChange("scaleY")}
                value={ky}
            />
        </Stack>
    );
}