import React, { useState, useEffect } from 'react';
import { Button, TextField, Input } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BlogUpdate: React.FC = () => {
    const { blogId } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
    const [coverImage, setCoverImage] = useState<File | null>(null); // For file data
    const [imageName, setImageName] = useState<string>(''); // For file name display
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        axios
            .get(`http://localhost:5000/admin/blogs/${blogId}?user_id=${userId}`)
            .then((response) => {
                if (response.data) {
                    setTitle(response.data.title || '');
                    setContent(response.data.content || '');
                    setDescription(response.data.description || '');
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [blogId]);

    const handleUpdate = async () => {
        try {
            const user_id = localStorage.getItem('userId');
            const response = await axios.put(
                `http://localhost:5000/admin/blogs/${blogId}/?user_id=${user_id}`,
                {
                    title,
                    content,
                    description,
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setCoverImage(file); // Store the file
            setImageName(file.name); // Set the file name for display
        }
    };

    if (loading) {
        return <div className="h-screen flex justify-center items-center text-white">Loading...</div>;
    }

    return (
        <div className="h-screen w-full flex justify-center items-center">
            <div className="w-full max-w-2xl p-8 rounded-lg shadow-md">
                <h2 className="text-6xl font-bold text-white mb-10 text-center">Update Blog Post</h2>
                <form className="space-y-6">
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

                    {/* Update Button */}
                    <Button variant="contained" color="warning" fullWidth onClick={handleUpdate}>
                        Update Blog Post
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default BlogUpdate;
