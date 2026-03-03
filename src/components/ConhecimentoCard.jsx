import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    Typography,
    Chip,
    Box,
    Button
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export function ConhecimentoCard({ conhecimento }) {

    // Dicionário para colocar os acentos nas categorias
    const categoriaConfig = {
        TECNOLOGIA: 'Tecnologia',
        DESIGN: 'Design',
        IDIOMAS: 'Idiomas',
        MUSICA: 'Música',
        CULINARIA: 'Culinária',
        ARTES: 'Artes',
        MARKETING: 'Marketing',
        FINANCAS: 'Finanças',
        SAUDE: 'Saúde',
        EDUCACAO: 'Educação',
        ESPORTE: 'Esporte',
        OUTROS: 'Outros'
    };

    const nivelConfig = {
        INICIANTE: {
            texto: 'Iniciante',
            sx: {
                bgcolor: '#E8FDF5',
                color: '#2F9E44',
                fontWeight: 'bold',
                borderRadius: 4
            }
        },
        INTERMEDIARIO: {
            texto: 'Intermediário',
            sx: {
                bgcolor: '#FFF8E1',
                color: '#E67E22',
                fontWeight: 'bold',
                borderRadius: 4
            }
        },
        AVANCADO: {
            texto: 'Avançado',
            sx: {
                bgcolor: '#FDEBEC',
                color: '#C92A2A',
                fontWeight: 'bold',
                borderRadius: 4
            }
        },
    };

    const configAtual = nivelConfig[conhecimento.nivel];

    const nomeCategoria = categoriaConfig[conhecimento.categoria] || conhecimento.categoria;

    return (
        <Card
            variant="outlined"
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    boxShadow: '0px 6px 22px rgba(0, 0, 0, 0.08)',
                    transform: 'translateY(-5px)',
                }
            }}
        >
            <CardContent sx={{ flexGrow: 1 }}>
                {/* Tags de Categoria e Nível */}
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip
                        label={nomeCategoria}
                        size="small"
                        sx={{
                            bgcolor: '#F1F3F5',
                            color: '#495057',
                            fontWeight: 'bold',
                            borderRadius: 4,
                        }}
                    />
                    <Chip
                        label={configAtual.texto}
                        size="small"
                        sx={configAtual.sx}
                    />
                </Box>

                {/* Título e Descrição */}
                <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {conhecimento.titulo}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}
                >
                    {conhecimento.descricao}
                </Typography>
            </CardContent>

            {/* Rodapé com Autor e Botão */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 2,
                pb: 2,
                borderTop: 1,
                borderColor: 'grey.100',
                pt: 2
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                    <PersonOutlineIcon fontSize="small" />
                    <Typography variant="body2">
                        {conhecimento.pessoa?.nome || 'Usuário'}
                    </Typography>
                </Box>

                <Button
                    component={Link}
                    to={`/conhecimentos/${conhecimento.id}`}
                    size="small"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ color: '#24B195', textTransform: 'none', fontWeight: 'bold' }}
                >
                    Ver detalhes
                </Button>
            </Box>
        </Card>
    );
}