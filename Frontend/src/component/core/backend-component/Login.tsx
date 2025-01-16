import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post('/api/admin/login', { email, password })
      .then((response: any) => {
        if (response.data.message === 'Login successful') {
          // Store user ID in local storage
          localStorage.setItem('userId', response.data.user.id);
          // Login successful, redirect to admin dashboard
          window.location.href = '/admin';
        } else {
          setError('Invalid email or password');
        }
      })
      .catch((error: any) => {
        setError('Error logging in');
        console.log(error);
      });
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-white mb-6 text-3xl">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-sm">
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          sx={{
            input: { color: 'white' },
            label: { color: 'gray' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'gray' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: 'white' },
            },
          }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          sx={{
            input: { color: 'white' },
            label: { color: 'gray' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'gray' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: 'white' },
            },
          }}
        />
        <Button type="submit" variant="contained" sx={{ backgroundColor: 'white', color: 'black' }}>
          Login
        </Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
