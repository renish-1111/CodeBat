import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BlogUpdate: React.FC = () => {
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
    

    const handleUpdate = async () => {
        try {
            const user_id = localStorage.getItem('userId');
            const response = await axios.put(`http://localhost:5000/admin/blogs/${blogId}/?user_id=${user_id}`, {
                title,
                content,
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <div className="h-screen flex justify-center items-center text-white">Loading...</div>; // Show loading spinner
    }

    

    return (
        <div className="h-screen w-full flex justify-center items-center">
            <div className="w-full max-w-2xl p-8 rounded-lg shadow-md">
                <h2 className="text-6xl font-bold text-white mb-10 text-center">Update Blog Post</h2>
                <form className="space-y-6">
                    <TextField
                        label="Title"
                        value={title}  // Controlled value
                        onChange={(e) => setTitle(e.target.value)}
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white', backgroundColor: 'black' } }}  
                        className="mb-4"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'white' },
                                '&:hover fieldset': { borderColor: 'gray' },
                                '&.Mui-focused fieldset': { borderColor: 'white' },
                            },
                        }}
                    />
                    <TextField
                        label="Content"
                        value={content}  // Controlled value
                        onChange={(e) => setContent(e.target.value)}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white', backgroundColor: 'black' } }}
                        className="mb-4"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'white' },
                                '&:hover fieldset': { borderColor: 'gray' },
                                '&.Mui-focused fieldset': { borderColor: 'white' },
                            },
                        }}
                    />
                    <Button variant="contained" color="warning" fullWidth onClick={handleUpdate}>
                        Update Blog Post
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default BlogUpdate;
