import { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from './component/core/Loading';

const Home = lazy(() => import('./component/Home'));
const Tutorial = lazy(() => import('./component/Tutorial'));
const C = lazy(() => import('./tutorial/C/C'));
const Java = lazy(() => import('./tutorial/Java'));
const About = lazy(() => import('./component/About'));
const Blog = lazy(() => import('./component/Blog'));
const NodeJs = lazy(() => import('./Blog/NodeJs'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading/>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/nodejs" element={<NodeJs />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/tutorial/c" element={<C />} />
          <Route path="/tutorial/java" element={<Java />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
