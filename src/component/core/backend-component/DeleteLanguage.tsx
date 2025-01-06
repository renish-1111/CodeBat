import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteLanguage: React.FC = () => {
    const [languageName, setLanguageName] = useState('');
    const [description, setDescription] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const langName = useParams()           // Language ID fro  
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch existing language details by ID
        const fetchLanguage = async () => {
            try {

                const response = await axios.get(`http://localhost:5000/admin/languages`, {
                    params: {
                        langName: langName,
                        user_id: localStorage.getItem('userId'),
                    },
                });
                const { name, description, cover_image } = response.data.language;
                console.log(response.data);
                console.log(response.data.language.name, description, cover_image);

                setLanguageName(name);
                setDescription(description);
                setCoverImage(cover_image);
            } catch (err) {
                setError('Failed to load language details');
                console.error(err);
            }
        };
        fetchLanguage();
    }, [langName]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!languageName.trim() || !description.trim() || !coverImage.trim()) {
            setError('All fields are required');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.delete(`http://localhost:5000/admin/languages`, {
                params: {
                    langName: languageName,
                    user_id: localStorage.getItem('userId'),
                },
            });
            console.log(response.data);
            setSuccess('Language updated successfully');

            setTimeout(() => navigate('/admin/languages'), 2000); // Navigate after success
        } catch (err) {
            setError('Failed to update language');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen w-full flex justify-center items-center">
            <div className="w-full max-w-2xl p-8 rounded-lg shadow-md">
                <h2 className="text-6xl font-bold text-white m-10 text-center pb-10">Delete Language</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Language Name Input */}
                    <TextField
                        label="Language Name"
                        value={languageName}
                        onChange={(e) => setLanguageName(e.target.value)}
                        variant="outlined"
                        fullWidth
                        disabled // This ensures the field is non-editable
                        InputLabelProps={{ style: { color: 'white' } }} // Label styling
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
                        onChange={(e) => setDescription(e.target.value)}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
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

                    {/* Cover Image URL Input */}
                    <TextField
                        label="Cover Image URL"
                        value={coverImage}
                        onChange={(e) => setCoverImage(e.target.value)}
                        variant="outlined"
                        fullWidth
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

                    {/* Submit Button */}
                    <Button variant="contained" color="success" fullWidth type="submit" disabled={loading}>
                        {loading ? 'Deleting...' : 'Delete Language'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default DeleteLanguage;
