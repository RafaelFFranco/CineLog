import React from 'react';
import { Box, Typography, Chip, Divider } from '@mui/material';
import Grid from '@mui/material/Grid'
import StarRateIcon from '@mui/icons-material/StarRate';

// Interface para os dados do filme
interface FilmeData {
    Title: string;
    Year: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Actors: string;
    Plot: string;
    Poster: string;
    imdbRating: string;
}

interface FilmeDetalhadoProps {
    filme: FilmeData;
}

export const FilmeDetalhado = ({ filme }: FilmeDetalhadoProps) => {
    return (
        <Box sx={{ p: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 3 }}>
            <Grid container spacing={4}>
                {/* Coluna do Pôster */}
                <Grid size={{xs:12, md:4}}>
                    <Box
                        component="img"
                        src={filme.Poster === 'N/A' ? 'https://via.placeholder.com/400x600.png?text=Poster+Indisponível' : filme.Poster}
                        alt={`Pôster de ${filme.Title}`}
                        sx={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                        }}
                    />
                </Grid>

                {/* Coluna dos Detalhes */}
                <Grid size={{xs:12, md:8}}>
                    <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                        {filme.Title} <Typography variant="h4" component="span" color="text.secondary">({filme.Year})</Typography>
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {filme.Genre.split(', ').map(genre => (
                                <Chip key={genre} label={genre} color="primary" variant="outlined" />
                            ))}
                        </Box>
                        <Divider orientation="vertical" flexItem />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <StarRateIcon sx={{ color: '#f5c518' }} />
                            <Typography variant="h6" component="span" fontWeight="bold">{filme.imdbRating}</Typography>
                        </Box>
                    </Box>

                    <Typography variant="h5" gutterBottom sx={{ mt: 3, borderLeft: '4px solid', borderColor: 'primary.main', pl: 1.5 }}>
                        Sinopse
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {filme.Plot}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ '& > *': { mb: 1 } }}> {/* Adiciona margem inferior a todos os filhos */}
                        <Typography variant="body1"><strong>Diretor:</strong> {filme.Director}</Typography>
                        <Typography variant="body1"><strong>Elenco:</strong> {filme.Actors}</Typography>
                        <Typography variant="body1"><strong>Duração:</strong> {filme.Runtime}</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};