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
import ProtectedRoute from './ProtectedRoute';
import BlogUpdate from './component/core/backend-component/BlogUpdate';
import BlogDelete from './component/core/backend-component/BlogDelete';
import BlogCreate from './component/core/backend-component/BlogCreate';


// Lazy loading components
const Home = lazy(() => import('./component/Home'));
const Login = lazy(() => import('./component/core/backend-component/Login'));
const Signup = lazy(() => import('./component/core/backend-component/Signup'));
const Admin = lazy(() => import('./component/core/backend-component/Admin'));
const Tutorial = lazy(() => import('./component/Tutorial'));
const About = lazy(() => import('./component/About'));
const Blog = lazy(() => import('./component/Blog'));
const NodeJs = lazy(() => import('./Blog/NodeJs'));
const BlogContent = lazy(() => import('./component/BlogContent'));
const Language = lazy(() => import('./component/core/backend-component/Language'));
const AddLanguage = lazy(() => import('./component/core/backend-component/AddLanguage'));
const EditLanguage = lazy(() => import('./component/core/backend-component/EditLanguage'));
const DeleteLanguage = lazy(() => import('./component/core/backend-component/DeleteLanguage'));
const TutorialPanel = lazy(() => import('./component/core/backend-component/Tutorial'));
const AddTutorial = lazy(() => import('./component/core/backend-component/AddTutorial'));
const DeleteTutorial = lazy(() => import('./component/core/backend-component/DeleteTutorial'));
const EditTutorial = lazy(() => import('./component/core/backend-component/EditTutorial'));
const GetStart = lazy(() => import('./component/core/GetStart'));
const TutorialContent = lazy(() => import('./component/TutorialContent'));


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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
          />
         
          <Route path="/admin/blogUpdate/:blogId" element={
            <ProtectedRoute>
              <BlogUpdate />
            </ProtectedRoute>
          }
          />
          <Route path="/admin/blogDelete/:blogId" element={
            <ProtectedRoute>
              <BlogDelete />
            </ProtectedRoute>
          }
          />
          <Route path="/admin/blogCreate" element={
            <ProtectedRoute>
              <BlogCreate />
            </ProtectedRoute>
          }
          />
          <Route path="/admin/languages" element={
            <ProtectedRoute>
              <Language />
            </ProtectedRoute>
          }
          />
          <Route path="/admin/addLanguage" element={
            <ProtectedRoute>
              <AddLanguage />
            </ProtectedRoute>
          }
          />
          <Route path="/admin/editLanguage/:name" element={
            <ProtectedRoute>
              <EditLanguage />
            </ProtectedRoute>
          }
          />
          <Route path="/admin/deleteLanguage/:name" element={
            <ProtectedRoute>
              <DeleteLanguage />
            </ProtectedRoute>
          }
          />
          <Route path="/admin/tutorials" element={
            <ProtectedRoute>
              <TutorialPanel />
            </ProtectedRoute>
          }
          />
          <Route path="/admin/addTutorial" element={
            <ProtectedRoute>
              <AddTutorial />
            </ProtectedRoute>
          }
          />
          <Route path="/admin/editTutorial/:id" element={
            <ProtectedRoute>
              <EditTutorial />
            </ProtectedRoute>
          }
          />
          <Route path="/admin/deleteTutorial/:id" element={
            <ProtectedRoute>
              <DeleteTutorial />
            </ProtectedRoute>
          }
          />

         
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:blog_id" element={<BlogContent />} />
          <Route path="/blogs/:blog_id" element={<NodeJs />} />



          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/tutorial/:name" element={<GetStart />} />
          <Route path="/tutorial/:name/:index" element={<TutorialContent />} />
          <Route path="/tutorial/c/introduction" element={<Introduction />} />
          <Route path="/tutorial/c/setup" element={<Setup />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
