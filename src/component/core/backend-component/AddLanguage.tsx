import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddLanguage: React.FC = () => {
  const [languageName, setLanguageName] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!languageName.trim() || !description.trim() || !coverImage.trim()) {
      setError('All fields are required');
      return;
    }
    setLoading(true);
    const userId = localStorage.getItem('userId');
    try {
      const response = await axios.post('http://localhost:5000/admin/languages', {
        name: languageName,
        description: description,
        cover_image: coverImage,
        user_id: userId,
      });
      console.log(response.data);
      setSuccess('Language added successfully');

      setTimeout(() => navigate('/admin/languages'), 2000); // Navigate after success
    } catch (err) {
      setError('Failed to add language');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-full max-w-2xl p-8 rounded-lg shadow-md">
        <h2 className="text-6xl font-bold text-white m-10 text-center pb-10">Add Language</h2>
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
          <Button variant="contained" color="success" fullWidth type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Language'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddLanguage;
