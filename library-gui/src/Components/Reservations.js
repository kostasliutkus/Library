import React, { useState, useEffect } from 'react';
import { getReservations,getBooks} from '../api/api';
import { Typography } from '@mui/material';
import {TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper} from '@mui/material/';


const Reservations = () => {
    const [reservations, setReservations] = useState([]);
    const [booksById, setBooksById] = useState([]);

    

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const data = await getReservations();
                setReservations(data);
            } catch (error) {
                console.error('Failed to fetch reservations:', error);
            }
        };
        const fetchBooks = async () => {
                try {
                    const data = await getBooks();
                    const booksLookup = data.reduce((acc, book) => {
                        acc[book.id] = book;
                        return acc;
                    }, {});
                    setBooksById(booksLookup);
                } catch (error) {
                    console.error('Failed to fetch books:', error);
                }
        };
        fetchReservations();
        console.log(reservations);
        fetchBooks();
        
    }, []);

    return (
        <div class="flex items-center mt-3">
            <TableContainer component={Paper} class="mx-auto" >
            <Typography variant="h4" className="absolute top-3 left-1/2 transform -translate-x-1/2 text-4xl font-bold">
            Reservations</Typography>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Book</TableCell>
                        <TableCell align="left">Type</TableCell>
                        <TableCell align="left">Pick Up&nbsp;</TableCell>
                        <TableCell align="left">Days&nbsp;</TableCell>
                        <TableCell align="left">Price&nbsp;(€)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {reservations.map((reservation, index) => (
                    <TableRow key={index} alignItems="flex-start">
                        
                        <TableCell component="th" scope="row">{booksById[reservation.bookId]?.name || 'Unknown Book'}</TableCell>
                        <TableCell component="th" scope="row">{reservation.bookType}</TableCell>
                        <TableCell component="th" scope="row">{reservation.quickPickUp ? 'Quick pick up' : 'Regular pick up'} </TableCell>
                        <TableCell component="th" scope="row">{reservation.howManyDays} </TableCell>
                        <TableCell component="th" scope="row">{reservation.price}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    );
};

export default Reservations;
