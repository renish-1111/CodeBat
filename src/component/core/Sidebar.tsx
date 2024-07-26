import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { Box, Button, Drawer, ListItem, ListItemText, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

interface Props {
    sideOption: {text: string, link: string}[];
}

const Sidebar = (props:Props) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <Box sx={{ display: 'flex'}}>

            <Button sx={{ bgcolor: '#fff', color: '#000',maxHeight:50,maxWidth:5,'&:hover': { bgcolor: '#000', color: '#fff'} }} variant="contained" onClick={toggleSidebar}>
                <MenuIcon />
            </Button>

            <Drawer
                anchor="left" 
                open={isSidebarOpen}
                onClose={toggleSidebar}
                sx={{
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: 240,
                        bgcolor: "#000",
                        color: "#fff",
                        top: 40,
                        
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'none' }}>
                    {props.sideOption.map((item, index:number) => {
                        if (item.link) {
                            return (
                                <Link key={index} to={item.link}>
                                    <ListItem button>
                                        <ListItemText primary={item.text} />
                                    </ListItem>
                                </Link>
                            );
                        }
                    })}
                </Box>
            </Drawer>
        </Box>
    );
};

export default Sidebar;