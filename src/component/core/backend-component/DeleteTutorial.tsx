import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteTutorial: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [language, setLanguage] = useState('');
  const [index, setIndex] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id: tutorialId } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchTutorial = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/admin/tutorial`, {
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
      } finally {
        setLoading(false);
      }
    };
    fetchTutorial();
  }, [tutorialId]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this tutorial?')) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.delete(`http://localhost:5000/admin/tutorial`, {
        data: {
          tutorialId,
          user_id: localStorage.getItem('userId'),
          language,
        },
      });
      console.log(response.data);
      setSuccess('Tutorial deleted successfully');
      setTimeout(() => navigate('/admin/tutorials'), 2000);
    } catch (err) {
      console.error('Failed to delete tutorial:', err);
      setError('Failed to delete tutorial');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-full max-w-2xl p-8 rounded-lg shadow-md">
        <h2 className="text-6xl font-bold text-white m-10 text-center pb-10">Delete Tutorial</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form className="space-y-6">
          <TextField
            label="Tutorial Name"
            value={title}
            disabled
            variant="outlined"
            fullWidth
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{
              style: { color: 'white', backgroundColor: 'black' },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' },
                '&.Mui-disabled fieldset': { borderColor: 'gray' },
              },
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: 'white',
              },
            }}
          />
          <TextField
            label="Description"
            value={content}
            disabled
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
                '&.Mui-focused fieldset': { borderColor: 'white' },
                '&.Mui-disabled fieldset': { borderColor: 'gray' },
              },
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: 'white',
              },
            }}
          />
          <TextField
            label="Language"
            value={language}
            disabled
            variant="outlined"
            fullWidth
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{
              style: { color: 'white', backgroundColor: 'black' },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' },
                '&.Mui-disabled fieldset': { borderColor: 'gray' },
              },
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: 'white',
              },
            }}
          />
          <TextField
            label="Index"
            value={index}
            disabled
            variant="outlined"
            fullWidth
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{
              style: { color: 'white', backgroundColor: 'black' },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' },
                '&.Mui-disabled fieldset': { borderColor: 'gray' },
              },
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: 'white',
              },
            }}
          />
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete Tutorial'}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => navigate('/admin/tutorials')}
            disabled={loading}
          >
            Back to Tutorials
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DeleteTutorial;
