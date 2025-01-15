import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './core/Navbar';
import Sidebar from './core/Sidebar';
import { Button } from '@mui/material';
import ContentRenderer from './core/ContentRenderer';

interface Tutorial {
  title: string;
  content: string;
  index: number;
  language: string;
}

const TutorialContent: React.FC = () => {
  const [sidebar, setSidebar] = useState<Tutorial[]>([]);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState<string>('');
  const [maxIndex, setMaxIndex] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [error, setError] = useState<string>('');

  const { name, index } = useParams<{ name: string; index: string }>();
  const language = name;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tutorialsRes, contentRes] = await Promise.all([
          axios.get('/api/tutorials', { params: { language } }),
          axios.get('/api/tutorials', { params: { language, index } }),
        ]);

        setSidebar(tutorialsRes.data.tutorials);
        setTitle(contentRes.data.tutorial.title);
        setContent(contentRes.data.tutorial.content);
        setCurrentIndex(contentRes.data.tutorial.index);
        setMaxIndex(contentRes.data.tutorial.max_index);
      } catch (err) {
        console.error('Error fetching tutorials:', err);
        setError('Failed to fetch tutorial data.');
      }
    };

    fetchData();
  }, [language, index]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <Navbar component={<Sidebar sideOption={sidebar} />} />
      <div className="md:m-5 mt-20 md:mt-24">
        {/* Navigation Buttons */}
        <div className="flex justify-between m-5">
          {/* Preview Button */}
          {currentIndex > 1 && (
            <Link to={`/tutorial/${language}/${currentIndex - 1}`}>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  bgcolor: '#121212',
                  ':hover': { bgcolor: 'white', color: 'black' },
                  width: '100%',
                  maxWidth: '200px',
                }}
              >
                Preview
              </Button>
            </Link>
          )}

          {/* Spacer to align buttons properly */}
          <div className="flex-grow"></div>

          {/* Next Button */}
          {currentIndex < maxIndex && (
            <Link to={`/tutorial/${language}/${currentIndex + 1}`}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  bgcolor: '#121212',
                  ':hover': { bgcolor: 'white', color: 'black' },
                  width: '100%',
                  maxWidth: '200px',
                }}
              >
                Next
              </Button>
            </Link>
          )}
        </div>

        {/* Tutorial Content */}
        <main className="m-5 text-white">
          {/* Title with improved styling */}
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-20 leading-tight">
            {title}
          </h1>
          <ContentRenderer content={content} />
        </main>

        {/* Navigation Buttons */}
        <div className="flex justify-between m-5">
          {/* Preview Button */}
          {currentIndex > 1 && (
            <Link to={`/tutorial/${language}/${currentIndex - 1}`}>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  bgcolor: '#121212',
                  ':hover': { bgcolor: 'white', color: 'black' },
                  width: '100%',
                  maxWidth: '200px',
                }}
              >
                Preview
              </Button>
            </Link>
          )}

          {/* Spacer to align buttons properly */}
          <div className="flex-grow"></div>

          {/* Next Button */}
          {currentIndex < maxIndex && (
            <Link to={`/tutorial/${language}/${currentIndex + 1}`}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  bgcolor: '#121212',
                  ':hover': { bgcolor: 'white', color: 'black' },
                  width: '100%',
                  maxWidth: '200px',
                }}
              >
                Next
              </Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default TutorialContent;
