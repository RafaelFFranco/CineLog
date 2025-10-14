import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MovieIcon from '@mui/icons-material/Movie';

export const NavBar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="logo"
                        sx={{ mr: 2 }}
                    >
                        <MovieIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Coletor de Filmes
                    </Typography>
                    <Button color="inherit">Início</Button>
                    <Button color="inherit">Populares</Button>
                    <Button color="inherit">Sobre</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}