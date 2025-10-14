import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, Typography } from "@mui/material";


interface CardFilmeProps {
    titulo: string;
    nota: string;
    imagem: string;
}

export const CardFilme = ({ titulo, nota, imagem }: CardFilmeProps) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                 component="img"
                 height="500"
                 image={imagem}
                 alt={`Pôster do filme ${titulo}`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {titulo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Nota: {nota}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}