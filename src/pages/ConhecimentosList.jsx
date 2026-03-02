// Rhobertta
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConhecimentos } from '../hooks/useConhecimentos';
import { ConhecimentoCard } from '../components/ConhecimentoCard';
import {
    Box,
    Typography,
    TextField,
    Select,
    MenuItem,
    Button,
    Grid,
    Pagination,
    CircularProgress,
    InputAdornment,
    FormControl,
    InputLabel
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ConhecimentosList() {

    const navigate = useNavigate();

    // Estados para os filtros
    const [busca, setBusca] = useState('');
    const [categoria, setCategoria] = useState('');
    const [nivel, setNivel] = useState('');

    // Filtros que serão enviados para a API
    const [filtrosAplicados, setFiltrosAplicados] = useState({});

    // Hook para buscar os conhecimentos com base nos filtros
    const { conhecimentos, loading, error } = useConhecimentos(filtrosAplicados);

    // Lógica de paginação
    const [paginaAtual, setPaginaAtual] = useState(1);
    const cardsPorPagina = 6;

    // Lógica de filtro automático com debounce
    useEffect(() => {
        const tempoDeEspera = setTimeout(() => {
            setFiltrosAplicados({
                busca: busca || undefined,
                categoria: categoria || undefined,
                nivel: nivel || undefined
            });
            setPaginaAtual(1);
        }, 300);
        return () => clearTimeout(tempoDeEspera);
    }, [busca, categoria, nivel]);

    // Função para limpar os filtros
    const handleLimpar = () => {
        setBusca('');
        setCategoria('');
        setNivel('');
    };

    // Cálculos da paginação
    const indiceUltimoCard = paginaAtual * cardsPorPagina;
    const indicePrimeiroCard = indiceUltimoCard - cardsPorPagina;
    const conhecimentosDaPagina = conhecimentos.slice(indicePrimeiroCard, indiceUltimoCard);
    const totalPaginas = Math.ceil(conhecimentos.length / cardsPorPagina);

    return (
        <Box sx={{ width: '100%', px: { xs: 2, md: 6, lg: 8 }, py: 4 }}>

            {/* Botão Voltar */}
            <Box sx={{ mb: 2 }}>
                <IconButton
                    onClick={() => navigate('/')}
                    aria-label="voltar"
                    sx={{
                        color: '#64748b',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                            color: '#ffffff',
                            backgroundColor: '#f97316',
                            transform: 'translateX(-4px)'
                        }
                    }}
                >
                    <ArrowBackIcon />
                </IconButton>
            </Box>

            {/* Cabeçalho */}
            <Box sx={{ mb: 5 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#0f172a' }}>
                    Conhecimentos disponíveis
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
                    Explore e encontre o que deseja aprender.
                </Typography>

                {/* Barra de Filtros */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { xs: 'stretch', md: 'center' },
                    gap: 2,
                    bgcolor: '#fff',
                    p: 2,
                    borderRadius: 2,
                    border: '1px solid #e2e8f0'
                }}>
                    <TextField
                        size="small"
                        placeholder="Buscar por título ou descrição..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        sx={{
                            flexGrow: 1,
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                    borderColor: '#24B195',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#24B195',
                                },
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                            sx: { borderRadius: 2 }
                        }}
                    />

                    <FormControl size="small" sx={{
                        minWidth: 180,
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#24B195',
                        }
                    }}>
                        <InputLabel>Categoria</InputLabel>
                        <Select
                            value={categoria}
                            label="Categoria"
                            onChange={(e) => setCategoria(e.target.value)}
                            sx={{
                                borderRadius: 2,
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#24B195',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#24B195',
                                }
                            }}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        mt: 0.5,
                                        p: 0.5,
                                        '& .MuiMenuItem-root': {
                                            borderRadius: 1.5,
                                            mb: 0.5,
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                backgroundColor: '#f97316',
                                                color: 'white',
                                            },
                                            '&.Mui-selected': {
                                                backgroundColor: '#f97316',
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor: '#ea580c',
                                                }
                                            }
                                        }
                                    }
                                }
                            }}
                        >
                            <MenuItem value="">Todas</MenuItem>
                            <MenuItem value="TECNOLOGIA">Tecnologia</MenuItem>
                            <MenuItem value="DESIGN">Design</MenuItem>
                            <MenuItem value="IDIOMAS">Idiomas</MenuItem>
                            <MenuItem value="MUSICA">Música</MenuItem>
                            <MenuItem value="CULINARIA">Culinária</MenuItem>
                            <MenuItem value="ARTES">Artes</MenuItem>
                            <MenuItem value="MARKETING">Marketing</MenuItem>
                            <MenuItem value="FINANCAS">Finanças</MenuItem>
                            <MenuItem value="SAUDE">Saúde</MenuItem>
                            <MenuItem value="EDUCACAO">Educação</MenuItem>
                            <MenuItem value="ESPORTE">Esporte</MenuItem>
                            <MenuItem value="OUTROS">Outros</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl size="small" sx={{
                        minWidth: 180,
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#24B195',
                        }
                    }}>
                        <InputLabel>Nível</InputLabel>
                        <Select
                            value={nivel}
                            label="Nível"
                            onChange={(e) => setNivel(e.target.value)}
                            sx={{
                                borderRadius: 2,
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#24B195',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#24B195',
                                }
                            }}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        mt: 0.5,
                                        p: 0.5,
                                        '& .MuiMenuItem-root': {
                                            borderRadius: 1.5,
                                            mb: 0.5,
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                backgroundColor: '#f97316',
                                                color: 'white',
                                            },
                                            '&.Mui-selected': {
                                                backgroundColor: '#f97316',
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor: '#ea580c',
                                                }
                                            }
                                        }
                                    }
                                }
                            }}
                        >
                            <MenuItem value="">Todos</MenuItem>
                            <MenuItem value="INICIANTE">Iniciante</MenuItem>
                            <MenuItem value="INTERMEDIARIO">Intermediário</MenuItem>
                            <MenuItem value="AVANCADO">Avançado</MenuItem>
                        </Select>
                    </FormControl>

                    <Button
                        variant="outlined"
                        onClick={handleLimpar}
                        startIcon={<ClearIcon />}
                        sx={{
                            color: '#0f172a',
                            borderColor: '#cbd5e1',
                            textTransform: 'none',
                            borderRadius: 2,
                            height: '40px',
                            px: 3,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                borderColor: '#f97316',
                                color: '#ffffff',
                                backgroundColor: '#f97316'
                            }
                        }}
                    >
                        Limpar
                    </Button>
                </Box>
            </Box>

            {/* Exibição de Loading ou Erro */}
            {loading && <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>}
            {error && <Typography color="error" align="center">Erro: {error}</Typography>}

            {/* Grid de Cards */}
            {!loading && !error && (
                <>
                    <Grid container spacing={3}>
                        {conhecimentosDaPagina.length > 0 ? (
                            conhecimentosDaPagina.map((conhecimento) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={conhecimento.id}>
                                    <ConhecimentoCard conhecimento={conhecimento} />
                                </Grid>
                            ))
                        ) : (
                            <Grid size={{ xs: 12 }}>
                                <Typography align="center" color="text.secondary" sx={{ my: 4 }}>
                                    Nenhum conhecimento encontrado com estes filtros.
                                </Typography>
                            </Grid>
                        )}
                    </Grid>

                    {/* Paginação */}
                    {totalPaginas > 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                            <Pagination
                                count={totalPaginas}
                                page={paginaAtual}
                                onChange={(evento, novaPagina) => setPaginaAtual(novaPagina)}
                                color="primary"
                                sx={{
                                    '& .MuiPaginationItem-root.Mui-selected': {
                                        backgroundColor: '#f97316',
                                        color: '#fff',
                                        '&:hover': {
                                            backgroundColor: '#ea580c',
                                        }
                                    }
                                }}
                            />
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
}