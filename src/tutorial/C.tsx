import Navbar from '../component/core/Navbar';
import Sidebar from '../component/core/Sidebar';
import Animation from '../component/Animation';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';

interface CSidebar {
    title: string;
    index: string;
}

const C = () => {
    const language = useParams();
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`/api/admin/tutorial`, {
              
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
        fetchData();
      }, []);


    return (
        <div className='bg-main-bg'>
            <Navbar component={<Sidebar sideOption={CSidebar} />} />
            <div className=' text-white flex flex-col items-center justify-center h-screen'>
                <div className='px-2 kranky-regular text-center mx-5 text-2xl font-bold tracking-widest leading-tight md:text-4xl md:leading-tight'>
                    <Animation sequence={["Welcome to C language Programming Tutorial", 100]} />
                </div>
                <div className='text-center p-1 rounded-md bg-white hover:bg-black font-serif mt-8'>
                    <Link to="/tutorial/c/introduction" className='font-semibold mx-auto'>
                        <Button variant="contained" color="info" sx={{ bgcolor: 'black', fontSize: 20, ":hover": { bgcolor: 'white', fontSize: 20, color: 'black' }, width: '100%', maxWidth: '200px' }}>
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default C;
