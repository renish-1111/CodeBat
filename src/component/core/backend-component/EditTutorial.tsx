import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditTutorial: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [language, setLanguage] = useState('');
  const [index, setIndex] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id: tutorialId } = useParams<{ id: string }>(); // Destructure and rename `id` to `tutorialId`

  useEffect(() => {
    const fetchTutorial = async () => {
      try {
        const response = await axios.get(`/api/admin/tutorial`, {
          params: {
            tutorialId,
            user_id: localStorage.getItem('userId'),
          },
        });
        console.log(response.data);

        setTitle(response.data.tutorial.title);
        setContent(response.data.tutorial.content);
        setLanguage(response.data.tutorial.language);
        setIndex(response.data.tutorial.index);
      } catch (err) {
        console.error('Failed to fetch tutorial:', err);
        setError('Failed to fetch tutorial data');
      }
    };
    fetchTutorial();
  }, [tutorialId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title || !content || !language || !index) {
      setError('All fields are required');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.put(`/api/admin/tutorial`, {
        title,
        content,
        index,
        tutorialId,
        user_id: localStorage.getItem('userId'),
        language,
      });
      console.log(response.data);
      setSuccess('Tutorial updated successfully');
      setTimeout(() => navigate('/admin/tutorials'), 2000);
    } catch (err) {
      setError('Failed to update tutorial');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-full max-w-2xl p-8 rounded-lg shadow-md">
        <h2 className="text-6xl font-bold text-white m-10 text-center pb-10">Edit Tutorial</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            label="Tutorial Name"
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
          <TextField
            label="Language"
            value={language}
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
          <TextField
            label="Index"
            type='number'
            value={index}
            onChange={(e) => setIndex(e.target.value)}
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
          <Button variant="contained" color="success" fullWidth type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Tutorial'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditTutorial;
