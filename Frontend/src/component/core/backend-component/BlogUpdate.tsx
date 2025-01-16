import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BlogUpdate: React.FC = () => {
    const { blogId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
    const [coverImage, setCoverImage] = useState(''); // For URL data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
                setError('Failed to fetch blog details');
                setLoading(false);
            });
    }, [blogId]);

    const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Confirmation alert before updating
        const confirmUpdate = window.confirm('Are you sure you want to update this blog?');
        if (!confirmUpdate) {
            return; // Exit if the user cancels
        }

        try {
            const user_id = localStorage.getItem('userId');
            const response = await axios.put(
                `/api/admin/blogs/${blogId}/?user_id=${user_id}`,
                {
                    title,
                    content,
                    description,
                    cover_image: coverImage,
                }
            );
            console.log(response.data);
            navigate('/admin'); // Redirect after successful update
        } catch (error) {
            console.error(error);
            setError('Failed to update blog');
        }
    };

    const handleBackClick = () => {
        // Confirmation alert before going back
        const confirmBack = window.confirm('Are you sure you want to go back? Unsaved changes will be lost.');
        if (confirmBack) {
            navigate('/admin');
        }
    };

    if (loading) {
        return <div className="h-screen flex justify-center items-center text-white">Loading...</div>;
    }

    return (
        <div className="min-vh-100 w-full flex justify-center items-center mt-10 md:mt-20">
            <div className="w-full max-w-2xl p-8 rounded-lg shadow-md">
                <h2 className="text-6xl font-bold text-white mb-10 text-center">Update Blog Post</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form className="space-y-6" onSubmit={handleUpdate}>
                    {/* Title Input */}
                    <TextField
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white', backgroundColor: 'black' } }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'white' },
                                '&:hover fieldset': { borderColor: 'gray' },
                                '&.Mui-focused fieldset': { borderColor: 'white' },
                            },
                        }}
                    />

                    {/* Description Input */}
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white', backgroundColor: 'black' } }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'white' },
                                '&:hover fieldset': { borderColor: 'gray' },
                                '&.Mui-focused fieldset': { borderColor: 'white' },
                            },
                        }}
                    />

                    {/* Content Input */}
                    <TextField
                        label="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white', backgroundColor: 'black' } }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'white' },
                                '&:hover fieldset': { borderColor: 'gray' },
                                '&.Mui-focused fieldset': { borderColor: 'white' },
                            },
                        }}
                    />

                    {/* Cover Image URL */}
                    <TextField
                        label="Cover Image URL"
                        value={coverImage}
                        onChange={(e) => setCoverImage(e.target.value)}
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white', backgroundColor: 'black' } }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'white' },
                                '&:hover fieldset': { borderColor: 'gray' },
                                '&.Mui-focused fieldset': { borderColor: 'white' },
                            },
                        }}
                    />

                    {/* Update Button */}
                    <Button variant="contained" color="warning" fullWidth type="submit">
                        Update Blog Post
                    </Button>

                    {/* Back Button */}
                    <Button
                        className="mt-4"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onClick={handleBackClick}
                    >
                        Back
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default BlogUpdate;
