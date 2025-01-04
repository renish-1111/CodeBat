import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BlogCreate: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState(''); // Added state for description
  const [coverImage, setCoverImage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      const userIdNumber = Number(storedUserId);
      if (!isNaN(userIdNumber)) {
        setUserId(userIdNumber);
      } else {
        setError('Invalid user ID');
      }
    } else {
      setError('User ID not found in local storage');
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userId) {
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:5000/admin/blogs', {
          title,
          content,
          description,
          cover_image: coverImage,
          user_id: userId,
        });
        console.log(response.data);
        setSuccess('Blog created successfully');
        navigate('/admin');
      } catch (error) {
        setError('Failed to create blog');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-full max-w-2xl p-8 rounded-lg shadow-md">
        <h2 className="text-6xl font-bold text-white m-10 text-center pb-10">Create Blog</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        {userId && (
          <form onSubmit={handleSubmit} className="space-y-6">
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
              rows={8}
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
            <div>
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
            </div>

            {/* Submit Button */}
            <Button variant="contained" color="success" fullWidth type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Blog'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BlogCreate;