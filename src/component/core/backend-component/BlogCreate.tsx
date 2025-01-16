  import React, { useState, useEffect } from 'react';
  import { Button, TextField } from '@mui/material';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';

  const BlogCreate: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
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
    
      // Validation checks for empty fields
      if (!title.trim() || !description.trim() || !content.trim() || !coverImage.trim()) {
        setError('All fields are required. Please fill in all fields.');
        return;
      }
    
      // Confirmation alert before submission
      const confirmSubmit = window.confirm('Are you sure you want to submit the blog?');
      if (!confirmSubmit) {
        return;
      }
    
      if (userId) {
        setLoading(true);
        try {
          const response = await axios.post('/api/admin/blogs', {
            title,
            content,
            description,
            cover_image: coverImage,
            user_id: userId,
          });
          console.log(response.data);
          setSuccess('Blog created successfully');
          setError('');
          navigate('/admin');
        } catch (error) {
          setError('Failed to create blog');
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };
    

    const handleBackClick = () => {
      const confirmBack = window.confirm(
        'Are you sure you want to go back? Unsaved changes will be lost.'
      );
      if (confirmBack) {
        navigate('/admin/languages');
      }
    };

    return (
      <div className="h-min-vh-100 w-full flex justify-center items-center mt-5">
        <div className="w-full max-w-2xl p-8 rounded-lg shadow-md ">
          <h2 className="text-6xl font-bold text-white m-10 text-center">Create Blog</h2>
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
              <Button variant="contained" color="primary" fullWidth type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Blog'}
              </Button>

              {/* Back Button */}
              <Button
                className="mb-4"
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={handleBackClick}
              >
                Back
              </Button>
            </form>
          )}
        </div>
      </div>
    );
  };

  export default BlogCreate;
