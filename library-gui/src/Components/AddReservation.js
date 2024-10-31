import React, {useState} from 'react';
import { TextField, Checkbox, FormControlLabel, MenuItem, Select, Button, FormControl, Input,Typography } from '@mui/material';
import { createReservation} from '../api/api';
import { useParams,useLocation,useNavigate} from 'react-router-dom';

const AddReservation = () => {
    const {id: routeBookId} = useParams();
    const location = useLocation()
    const book = location.state?.book;
    console.log(book);

    const [bookType, setBookType] = useState('');
    const [quickPickUp, setQuickPickUp] = useState(false);
    const [days, setDays] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!bookType) {
            alert("Please select a book type.");
            return;
        }

        const reservationData = {
            bookId: book?.id || routeBookId,
            bookType,
            quickPickUp,
            howManyDays: days,
            name: book?.name || 'Unknown Book'
        };

        try {
            setIsSubmitting(true);
            const response = await createReservation(reservationData);
            console.log('Reservation created:', response);
            alert('Reservation successfully created!');
            navigate('/reservations');
        } catch (error) {
            console.error('Error creating reservation:', error);
            alert('Failed to create reservation. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="flex items-center mt-3">
            <div className="mx-auto">
            <Typography variant="h5" class="text-center mb-4">
                Add Reservation for {`${book.name}`}
            </Typography>
            <FormControl required component="form" onSubmit={handleSubmit} className="space-y-4 w-full">                
                <Select
                    value={bookType}
                    onChange={(e) => setBookType(e.target.value)}
                    displayEmpty
                    className="w-full"
                    placeholder="Select Book Type"
                >
                    <MenuItem value="" disabled>
                    Select Book Type
                    </MenuItem>
                    <MenuItem value="Audiobook">Audio</MenuItem>
                    <MenuItem value="Book">Book</MenuItem>
                </Select>

                <FormControlLabel
                    control={
                    <Checkbox
                        checked={quickPickUp}
                        onChange={(e) => setQuickPickUp(e.target.checked)}
                        color="primary"
                    />
                    }
                    label="Quick Pickup"
                />

                <TextField
                    select
                    label="Days for Reservation"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    className="w-full"
                >
                    {Array.from({ length: 14 }, (_, i) => i + 1).map((day) => (
                    <MenuItem key={day} value={day}>
                        {day}
                    </MenuItem>
                    ))}
                </TextField>

                <Button variant="contained" color="primary" 
                className="w-full mt-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded"
                type="submit"
                disabled={isSubmitting}
                >
                     {isSubmitting ? 'Submitting...' : 'Reserve'}
                </Button>
            </FormControl>
        </div>
    </div>
    );
        
};

export default AddReservation;