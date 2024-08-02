import { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './component/core/Navbar';
import Footer from './component/core/Footer';
import CircularProgress from '@mui/material/CircularProgress';
import Introduction from './tutorial/C/Introduction';
import Setup from './tutorial/C/Setup';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Lazy loading components
const Home = lazy(() => import('./component/Home'));
const Tutorial = lazy(() => import('./component/Tutorial'));
const C = lazy(() => import('./tutorial/C/C'));
const Java = lazy(() => import('./tutorial/Java'));
const About = lazy(() => import('./component/About'));
const Blog = lazy(() => import('./component/Blog'));
const NodeJs = lazy(() => import('./Blog/NodeJs'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {


  return (
    <BrowserRouter>
     <ScrollToTop />
      <Navbar />
      <Suspense fallback={<div className='h-screen w-full flex justify-center items-center'>
        <CircularProgress style={{ color: 'black' }} size={100} className='' />
      </div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/nodejs" element={<NodeJs />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/tutorial/c" element={<C />} />
          <Route path="/tutorial/c/introduction" element={<Introduction />} />
          <Route path="/tutorial/c/setup" element={<Setup />} />
          <Route path="/tutorial/java" element={<Java />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
