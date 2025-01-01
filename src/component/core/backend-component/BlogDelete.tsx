import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BlogDelete: React.FC = () => {
    const { blogId } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true); // Loading state

    //share user id in useEffect
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        axios.get(`http://localhost:5000/admin/blogs/${blogId}?user_id=${userId}`)
            .then((response) => {
                if (response.data) {
                    console.log(response.data);
                    setTitle(response.data.title || ''); // Adjust based on backend response structure
                    setContent(response.data.content || '');
                }
                setLoading(false); // Stop loading once data is fetched
            })
            .catch((error) => {
                console.error(error);
                setLoading(false); // Stop loading even on error
            });
    }, [blogId]);

    const handleDelete = async () => {
        const userId = localStorage.getItem('userId');
        try {
            const response = await axios.delete(
                `http://localhost:5000/admin/blogs/${blogId}/?user_id=${userId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',  // Set correct content type if needed
                    }
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };
    
    

    if (loading) {
        return <div className="h-screen flex justify-center items-center text-white">Loading...</div>; // Show loading spinner
    }



    return (
        <div className="h-screen w-full flex justify-center items-center">
            <div className="w-full max-w-2xl p-8 rounded-lg shadow-md">
                <h2 className="text-6xl font-bold text-white mb-10 text-center">Delete Blog Post</h2>
                <form className="space-y-6">
                    <TextField
                        label="Title"
                        value={title} // Controlled value
                        onChange={(e) => setTitle(e.target.value)}
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{
                            style: { color: 'white', backgroundColor: 'black' }, // Input styling
                        }}
                        className="mb-4"
                        disabled // Disables the TextField
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'white' }, // Default border color
                                '&:hover fieldset': { borderColor: 'gray' }, // Border color on hover
                                '&.Mui-focused fieldset': { borderColor: 'white' }, // Border color when focused
                                '&.Mui-disabled fieldset': { borderColor: 'white' }, // Border color when disabled
                            },
                            '& .MuiInputBase-input.Mui-disabled': {
                                WebkitTextFillColor: 'white', // Ensures text remains white when disabled
                            },
                        }}
                    />

                    <TextField
                        label="Content"
                        value={content} // Controlled value
                        onChange={(e) => setContent(e.target.value)}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        InputLabelProps={{ style: { color: 'white' } }} // Label styling
                        InputProps={{
                            style: { color: 'white', backgroundColor: 'black' }, // Input text and background styling
                        }}
                        className="mb-4"
                        disabled
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'white' }, // Default border color
                                '&:hover fieldset': { borderColor: 'gray' }, // Border color on hover
                                '&.Mui-focused fieldset': { borderColor: 'white' }, // Border color when focused
                                '&.Mui-disabled fieldset': { borderColor: 'white' }, // Border color when disabled
                            },
                            '& .MuiInputBase-input': {
                                color: 'white', // Ensures input text remains white
                                backgroundColor: 'black', // Ensures background remains black
                            },
                            '& .MuiInputBase-input.Mui-disabled': {
                                WebkitTextFillColor: 'white', // Ensures text remains white when disabled
                            },
                        }}
                    />

                    <Button variant="contained" color="error" fullWidth onClick={handleDelete}>
                        Delete Blog Post
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default BlogDelete;
