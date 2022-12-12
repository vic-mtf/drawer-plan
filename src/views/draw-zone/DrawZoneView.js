import { Box, Stack } from "@mui/material";
import DrawerHeader from "../../components/DrawerHeader";
import Editor from "./Editor/Editor";
import SubNavRight from "./sub-nav-right/SubNavRight";

export default function DrawZoneView() {
    return(
        <Box 
            component="main" 
            flexGrow={1} 
            display='flex'
            flex={1}
            flexDirection='column'
            justifyContent='center'
        >
            <DrawerHeader/>
            <Stack
                display="flex"
                flex={1}
            >
            <Box
                display='flex'
                flex={1}
                flexDirection="row"
                alignItems='center'
            >
                <Stack
                    display="flex"
                    flex={1}
                    flexDirection="row"
                    alignItems='center'
                    justifyContent="center"
                >
                    <Editor/>
                </Stack>
                <SubNavRight/>
            </Box>
            </Stack>
        </Box>
    );
}