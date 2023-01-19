import { AppBar, IconButton, Toolbar, Grid, Typography } from '@mui/material'
import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../redux/slices/auth/thunks'

export const Navbar = ({ drawerWidth }) => {

    const dispatch = useDispatch()
    const handleLogout=()=>{
        dispatch(logoutUser())
    }

    return (
        <AppBar
            position='fixed'
            sx={{
                width: { sm: `calc(100% - ${ drawerWidth }px)` },
                ml: { sm:`${drawerWidth}px` }
            }}
        >
            <Toolbar>
                <IconButton color='inherited' edge="start" sx={{ mr: 2, display: { sm: "none" } }}>
                    <MenuOutlined />
                </IconButton>
                <Grid container direction="row" justifyContent={"space-between"} alignItems="center">
                    <Typography variant='h6' noWrap component={"div"}>Journal App</Typography>
                    <IconButton color='error' onClick={handleLogout}>
                        <LogoutOutlined />
                    </IconButton>

                </Grid>
            </Toolbar>

        </AppBar>
    )
}
