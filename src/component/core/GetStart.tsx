import { Link, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Animation from '../Animation';

interface Tutorial {
    title: string;
    index: string;
    language: string;
}

const GetStart = () => {
    const name = useParams<{ language: string }>();
    const [error, setError] = useState<string>('');
    const [data, setData] = useState<Tutorial[]>([]);
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tutorialResponse, languageResponse] = await Promise.all([
                    axios.get('http://localhost:5000/api/tutorials', {
                        params: { language: name },
                    }),
                    axios.get('http://localhost:5000/api/languages', {
                        params: { language: name },
                    }),
                ]);

                setData(tutorialResponse.data.tutorials);
                setDescription(languageResponse.data.description);
            } catch (err) {
                console.error('Failed to fetch data:', err);
                setError('Failed to fetch tutorial or language data');
            }
        };
        fetchData();
    }, [name]);

    return (
        <div className="bg-main-bg">
            <Navbar component={<Sidebar sideOption={data} />} />
            <div className="text-white flex flex-col items-center justify-center h-screen">
                <div className="px-2 kranky-regular text-center mx-5 text-2xl font-bold tracking-widest leading-tight md:text-4xl md:leading-tight">
                    {description ? (
                        <Animation sequence={[`Welcome to ${description} Programming Tutorial`, 100]} />
                    ) : (
                        <p></p>
                    )}
                </div>
                {error && <p className="text-red-500 mt-4">{error}</p>}
                <div className="text-center p-1 rounded-md bg-white hover:bg-black font-serif mt-8">
                    <Link to="/tutorial/c/1" className="font-semibold mx-auto">
                        <Button
                            variant="contained"
                            color="info"
                            sx={{
                                bgcolor: 'black',
                                fontSize: 20,
                                ':hover': { bgcolor: 'white', color: 'black' },
                                width: '100%',
                                maxWidth: '200px',
                            }}
                        >
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default GetStart;
