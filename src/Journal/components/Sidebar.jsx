import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { SideBarItem } from "./SideBarItem"

const Sidebar = ({ drawerWidth }) => {

    const { displayName, photoURL } = useSelector(state => state.auth)
    const { notes } = useSelector(state => state.journal)



    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth = 240 }, flexShrink: { sm: 0 } }}

        >
            <Drawer
                variant="permanent"
                open
                sx={{
                    display: { xs: "block" },
                    "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth }
                }}
            >

                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        {displayName?.length ? displayName : null}
                    </Typography>
                </Toolbar>
                <Divider />
                <List>
                    {notes.length ?
                        notes.map(note => (
                            <SideBarItem key={note.id} {...note}  />
                        ))
                        :
                        <h1>No notes Registered</h1>
                    }
                </List>
            </Drawer>
        </Box>
    )
}

export default Sidebar