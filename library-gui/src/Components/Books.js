import React, { useState, useEffect } from 'react';
import { getBooks} from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper, TextField } from '@mui/material';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const goToAddReservation = (book) => {
        navigate(`/reservations/add/${book.id}`, { state: { book } });
    };

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await getBooks();
                setBooks(data);
            } catch (error) {
                console.error('Failed to fetch books:', error);
            }
        };

        fetchBooks();
    }, []);

    const filteredBooks = books.filter(
        (book) =>
            book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.year.toString().includes(searchTerm)
    );

    return (
        <div className="flex items-center mt-3">
            <div className="mx-auto">
                <Typography 
                    variant="h4" 
                    className="absolute top-3 left-1/2 transform -translate-x-1/2 text-4xl font-bold"
                >
                    Book Store
                </Typography>

                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search by name or year"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ marginTop: 5, minWidth:900, maxWidth: 900 }}
                />

                <TableContainer component={Paper} sx={{minWidth:900, maxWidth: 900, marginTop: 5 }}>
                    <Table>
                        <TableBody>
                            {filteredBooks.map((book, index) => (
                                <TableRow 
                                    key={index} 
                                    hover 
                                    onClick={() => goToAddReservation(book)} 
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <TableCell width="150px">
                                        <Box 
                                            component="img"
                                            src={book.picture} 
                                            alt={`${book.name} cover`} 
                                            sx={{ width: 120, height: 180, objectFit: 'cover', borderRadius: 1 }}
                                        />
                                    </TableCell>

                                    <TableCell>
                                        <Typography variant="h6">{book.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        </Typography>
                                        <Typography variant="caption" display="block" color="text.secondary" mt={1}>
                                            Published: {book.year}
                                        </Typography>
                                    </TableCell>

                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default Books;
