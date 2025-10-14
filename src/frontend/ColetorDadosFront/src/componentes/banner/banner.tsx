import Carousel from 'react-material-ui-carousel';

interface BannerProps {
    imagens: string[];
}


export const Banner = ({ imagens }: BannerProps) => {
    return (
        <Carousel
            autoPlay={true}
            animation="slide"
            indicators={true}
            navButtonsAlwaysVisible={false}
            sx={{ height: '500px' }}
        >
            {
                imagens.map((imagem, i) => (
                    <img
                        key={i}
                        src={imagem}
                        alt={`Imagem do banner ${i + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                ))
            }
        </Carousel>
    );
}