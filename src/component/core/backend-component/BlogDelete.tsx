import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BlogDelete: React.FC = () => {
    const { blogId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [description, setDescription] = useState(''); // Added state for description
    const [coverImage, setCoverImage] = useState("")
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        axios
            .get(`/api/admin/blogs/${blogId}?user_id=${userId}`)
            .then((response) => {
                if (response.data) {
                    console.log(response.data);
                    setTitle(response.data.title || '');
                    setContent(response.data.content || '');
                    setDescription(response.data.description || ''); // Fetch and set description
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
            navigate('/admin');
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    if (loading) {
        return <div className="h-screen flex justify-center items-center text-white">Loading...</div>;
    }

    return (
        <div className="h-screen w-full flex justify-center items-center">
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
                </form>
            </div>
        </div>
    );
};

export default BlogDelete;
