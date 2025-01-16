import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BlogDelete: React.FC = () => {
    const { blogId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        axios
            .get(`/api/admin/blogs/${blogId}?user_id=${userId}`)
            .then((response) => {
                if (response.data) {
                    setTitle(response.data.title || '');
                    setContent(response.data.content || '');
                    setDescription(response.data.description || '');
                    setCoverImage(response.data.cover_image || '');
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [blogId]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this blog post? This action cannot be undone.'
        );
        if (!confirmDelete) {
            return; // Exit if user cancels
        }

        const userId = localStorage.getItem('userId');
        try {
            const response = await axios.delete(
                `/api/admin/blogs/${blogId}/?user_id=${userId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response.data);
            navigate('/admin'); // Redirect to admin page after successful deletion
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    const handleBackClick = () => {
        navigate('/admin'); // Navigate back to admin page
    };

    if (loading) {
        return <div className="h-screen flex justify-center items-center text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen w-full flex justify-center items-center mt-10 md:mt-5">
            <div className="w-full max-w-2xl p-8 rounded-lg shadow-md">
                <h2 className="text-6xl font-bold text-white mb-10 text-center">Delete Blog Post</h2>
                <form className="space-y-6">
                    {/* Title Input */}
                    <TextField
                        label="Title"
                        value={title}
                        variant="outlined"
                        fullWidth
                        disabled
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{
                            style: { color: 'white', backgroundColor: 'black' },
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'white' },
                                '&:hover fieldset': { borderColor: 'gray' },
                                '&.Mui-focused fieldset': { borderColor: 'white' },
                                '&.Mui-disabled fieldset': { borderColor: 'white' },
                            },
                            '& .MuiInputBase-input.Mui-disabled': {
                                WebkitTextFillColor: 'white',
                            },
                        }}
                    />

                    {/* Description Input */}
                    <TextField
                        label="Description"
                        value={description}
                        variant="outlined"
                        fullWidth
                        disabled
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{
                            style: { color: 'white', backgroundColor: 'black' },
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'white' },
                                '&:hover fieldset': { borderColor: 'gray' },
                                '&.Mui-focused fieldset': { borderColor: 'white' },
                                '&.Mui-disabled fieldset': { borderColor: 'white' },
                            },
                            '& .MuiInputBase-input.Mui-disabled': {
                                WebkitTextFillColor: 'white',
                            },
                        }}
                    />

                    {/* Content Input */}
                    <TextField
                        label="Content"
                        value={content}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        disabled
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{
                            style: { color: 'white', backgroundColor: 'black' },
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'white' },
                                '&:hover fieldset': { borderColor: 'gray' },
                                '&.Mui-focused fieldset': { borderColor: 'white' },
                                '&.Mui-disabled fieldset': { borderColor: 'white' },
                            },
                            '& .MuiInputBase-input.Mui-disabled': {
                                WebkitTextFillColor: 'white',
                            },
                        }}
                    />

                    {/* Cover Image */}
                    <TextField
                        label="Cover Image"
                        value={coverImage}
                        variant="outlined"
                        fullWidth
                        disabled
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{
                            style: { color: 'white', backgroundColor: 'black' },
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'white' },
                                '&:hover fieldset': { borderColor: 'gray' },
                                '&.Mui-focused fieldset': { borderColor: 'white' },
                                '&.Mui-disabled fieldset': { borderColor: 'white' },
                            },
                            '& .MuiInputBase-input.Mui-disabled': {
                                WebkitTextFillColor: 'white',
                            },
                        }}
                    />

                    {/* Delete Button */}
                    <Button variant="contained" color="error" fullWidth onClick={handleDelete}>
                        Delete Blog Post
                    </Button>

                    {/* Back Button */}
                    <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        className="mt-4"
                        onClick={handleBackClick}
                    >
                        Back
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default BlogDelete;
