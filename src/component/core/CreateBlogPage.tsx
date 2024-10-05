import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Input } from '@mui/material';

const CreateBlogPage: React.FC = () => {
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userId) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (coverImage) {
        formData.append('coverImage', coverImage);
      }
      formData.append('user_id', String(userId));

      axios.post('http://localhost:5000/admin/blogs', formData)
        .then(() => {
          setSuccess('Blog created successfully!');
          setError('');
        })
        .catch(() => {
          setError('Failed to create blog');
          setSuccess('');
        });
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
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <Typography variant="h3" className="mb-4 text-white font-bold">Create Blog</Typography>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {userId && (
        <form 
          onSubmit={handleSubmit} 
          className="w-full max-w-3xl  text-white my-2"
        >
          <div className='my-3'>
          <TextField
            label="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            fullWidth
            className="mb-6"
            variant="outlined"
            sx={{
              '& .MuiInputBase-root': { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'gray' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' },
              },
              '& .MuiInputLabel-root': { color: 'gray' },
              '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
            }}
          />
          </div>
         <div className='my-3'>
         <TextField
            label="Content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            fullWidth
            multiline
            rows={10}
            className="mb-6"
            variant="outlined"
            sx={{
              '& .MuiInputBase-root': { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'gray' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' },
              },
              '& .MuiInputLabel-root': { color: 'gray' },
              '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
            }}
          />
         </div>
          <div className='my-3'>
          <Input
            type="file"
            onChange={handleImageChange}
            className="w-full mb-6"
            
            sx={{
              input: { color: 'white' },
              borderColor: 'gray',
              '&:hover': { borderColor: 'white' },
              '&.Mui-focused': { borderColor: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'gray' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' },
              },
            }}
          />
          </div>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            className="w-full text-black py-3 font-bold bg"
            sx={{ backgroundColor: 'white', color: 'black' , '&:hover': { backgroundColor: 'black', color: 'white' }}}
          >
            Create Blog
          </Button>
        </form>
      )}
    </div>
  );
};

export default CreateBlogPage;
