import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditLanguage: React.FC = () => {
    const [languageName, setLanguageName] = useState('');
    const [description, setDescription] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const langName = useParams();
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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!languageName.trim() || !description.trim() || !coverImage.trim()) {
            setError('All fields are required');
            return;
        }

        const confirmed = window.confirm('Are you sure you want to update this language?');
        if (!confirmed) {
            return;
        }

        setLoading(true);
        try {
            await axios.put(`/api/admin/languages`, {
                name: languageName,
                description: description,
                cover_image: coverImage,
                user_id: localStorage.getItem('userId'),
            });
            setSuccess('Language updated successfully');
            alert('Language updated successfully. Do you want to go back to the language list?');
            navigate('/admin/languages');
        } catch (err) {
            setError('Failed to update language');
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
                <h2 className="text-6xl font-bold text-white m-10 text-center pb-10">Edit Language</h2>
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
                        onChange={(e) => setDescription(e.target.value)}
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

                    {/* Cover Image URL Input */}
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

                    {/* Submit Button */}
                    <Button
                        variant="contained"
                        style={{ backgroundColor: 'orangered', color: 'white' }}
                        fullWidth
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update Language'}
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

export default EditLanguage;