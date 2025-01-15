import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { Box, Button, Drawer, ListItem, ListItemText, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

interface SidebarProps {
    sideOption: {
        title: string;
        index: number;
        language: string;
    }[];
}

const Sidebar = ({ sideOption = [] }: SidebarProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Sort sideOption by index
    const sortedOptions = [...sideOption].sort((a, b) => a.index - b.index);

    console.log(sortedOptions);

    return (
        <Box sx={{ display: 'flex' }}>
            <Button
                sx={{
                    bgcolor: '#fff',
                    color: '#000',
                    maxHeight: 50,
                    '&:hover': { bgcolor: '#000', color: '#fff' },
                }}
                variant="contained"
                onClick={toggleSidebar}
            >
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
                        bgcolor: '#000',
                        color: '#fff',
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    {sortedOptions.length > 0 ? (
                        sortedOptions.map((option) => (
                            <Link
                                key={option.index}
                                to={`/tutorial/${option.language}/${option.index}`}
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <ListItem button>
                                    <ListItemText primary={option.title} />
                                </ListItem>
                            </Link>
                        ))
                    ) : (
                        <ListItem>
                            <ListItemText primary="No options available" />
                        </ListItem>
                    )}
                </Box>
            </Drawer>
        </Box>
    );
};

export default Sidebar;
