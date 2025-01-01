import React, { useState, useEffect } from 'react';
import { Button, TextField, Input } from '@mui/material';
import axios from 'axios';

const BlogCreate: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userId, setUserId] = useState<number | null>(null);

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
      try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (coverImage) {
          formData.append('coverImage', coverImage);
        }
        formData.append('user_id', String(userId));

        await axios.post('http://localhost:5000/admin/blogs', formData);
        setSuccess('Blog created successfully!');
        setError('');
      } catch {
        setError('Failed to create blog');
        setSuccess('');
      }
    } else {
      setError('User ID is required');
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setCoverImage(event.target.files[0]);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-full max-w-2xl p-8 rounded-lg shadow-md">
        <h2 className="text-6xl font-bold text-white mb-10 text-center">Create Blog</h2>
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

            {/* Cover Image Upload */}
            <div>
              <Input
                type="file"
                onChange={handleImageChange}
                inputProps={{ accept: 'image/*' }}
                sx={{
                  color: 'white',
                  '& input': { padding: '10px', color: 'white' },
                  '& .MuiInput-underline:before': { borderBottomColor: 'gray' },
                  '& .MuiInput-underline:hover:before': { borderBottomColor: 'white' },
                  '& .MuiInput-underline:after': { borderBottomColor: 'white' },
                }}
              />
            </div>

            {/* Submit Button */}
            <Button variant="contained" color="success" fullWidth type="submit">
              Create Blog
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BlogCreate;
