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
    const langName = useParams(); // Language ID 
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch existing language details by ID
        const fetchLanguage = async () => {
            try {
                const response = await axios.get(`/api/admin/languages`, {
                    params: {
                        langName: langName,
                        user_id: localStorage.getItem('userId'),
                    },
                });
                const { name, description, cover_image } = response.data.language;
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

    const handleDelete = async () => {
        if (!window.confirm(`Are you sure you want to delete the language "${languageName}"?`)) {
            return; // Exit if the user cancels
        }

        setLoading(true);
        try {
            await axios.delete(`/api/admin/languages`, {
                params: {
                    langName: languageName,
                    user_id: localStorage.getItem('userId'),
                },
            });
            setSuccess('Language deleted successfully');
            setTimeout(() => navigate('/admin/languages'), 2000); // Navigate after success
        } catch (err) {
            setError('Failed to delete language');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        const confirmed = window.confirm('Are you sure you want to go back? Unsaved changes will be lost.');
        if (confirmed) {
            navigate('/admin/languages');
        }
    };


    return (
        <div className="h-screen w-full flex justify-center items-center">
            <div className="w-full max-w-2xl p-8 rounded-lg shadow-md">
                <h2 className="text-6xl font-bold text-white m-10 text-center pb-10">Delete Language</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <form className="space-y-6">
                    {/* Language Name Input */}
                    <TextField
                        label="Language Name"
                        value={languageName}
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

                    {/* Cover Image URL Input */}
                    <TextField
                        label="Cover Image URL"
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

                    {/* Submit Button */}
                    <Button
                        variant="contained"
                        style={{ backgroundColor: 'red', color: 'white' }}
                        fullWidth
                        type="submit"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading ? 'Deleting...' : 'Delete Language'}

                    </Button>

                    {/* Back Button */}
                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={handleBack}
                        disabled={loading}
                    >
                        Back to Languages
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default DeleteLanguage;
