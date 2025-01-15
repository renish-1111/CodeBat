import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTutorial: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [language, setLanguage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim() || !content.trim() || !language.trim()) {
      setError('All fields are required');
      return;
    }

    const confirmed = window.confirm('Are you sure you want to add this tutorial?');
    if (!confirmed) {
        return;
    }

    setLoading(true);
    const userId = localStorage.getItem('userId');
    try {
      const response = await axios.post('/api/admin/tutorial', {
        title: title,
        content:content,
        language:language,
        user_id: userId,
      });
      console.log(response.data);
      setSuccess('Tutorial added successfully');

      setTimeout(() => navigate('/admin/tutorials'), 2000); // Navigate after success
    } catch (err) {
      setError('Failed to add tutorial');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    const confirmed = window.confirm('Are you sure you want to go back? Unsaved changes will be lost.');
    if (confirmed) {
        navigate('/admin/tutorials');
    }
};

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-full max-w-2xl p-8 rounded-lg shadow-md">
        <h2 className="text-6xl font-bold text-white m-10 text-center pb-10">Add Tutorial</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tutorial Name Input */}
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

          {/* Description Input */}
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

          {/* Language Input */}
          <TextField
            label="Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
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
                        style={{ backgroundColor: '', color: 'white' }}
                        color="primary"
                        fullWidth
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Adding...' : 'Add Tutorial'}
                    </Button>

                    {/* Back Button */}
                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={handleBack}
                        disabled={loading}
                    >
                        Back to Tutorials
                    </Button>
        </form>
      </div>
    </div>
  );
};

export default AddTutorial;
