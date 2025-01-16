import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post('/api/admin/signup', {
        name,
        email,
        password,
      })
        .then((response) => {
          console.log(response.data);
          if (response.data.message === 'User created successfully') {
            // Signup successful, redirect to login page
            window.location.href = '/login';
          } else {
            setError('Error signing up');
          }
        })
        .catch((error) => {
          setError('Error signing up');
          console.error(error);
        });
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <h1 className="text-white mb-6 text-3xl">Signup</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-sm">
        <TextField
          label="Name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
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
          Signup
        </Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
