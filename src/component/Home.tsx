import Navbar from "./core/Navbar";
import Animation from "./Animation";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Footer from "./core/Footer";


const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-main-bg bg-fixed h-screen w-full -z-10 bg-no-repeat bg-cover text-white relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="kranky-regular text-center mx-5 text-2xl font-bold tracking-widest leading-tight md:text-3xl md:leading-tight md:mx-40 md:text-start">
              <Animation sequence={[
                "Welcome to Codebat!        ", 10,
                "Your one-stop destination for coding tutorials        ", 10,
                "Discover the latest trends, tips, and insights in the world of coding on our blog        ", 10,
                "We are here to help you to learn coding and programming        ", 10,
              ]} />
            </p>
          </div>
        </div>
        <div className="py-16 bg-gray-300 h-screen flex items-center justify-center">
          <div className="container mx-auto px-6 text-center">
            <h2 className=" text-center mx-5 text-2xl font-bold tracking-widest leading-tight  text-gray-800">
            <Animation sequence={[
                "Get Started with Our Tutorials      ", 10,
                "Explore our tutorials and start learning today       ", 10,
              ]} />
            </h2>
            <p className="mt-4 text-gray-600">
            Dive into our tutorials and start mastering new skills today!
            </p>
            <div className="mt-8  py-2 px-4 rounded-lg">
              <Link to="/tutorial" className='font-semibold mx-auto'>
                <Button variant="contained" color="info" sx={{ bgcolor: 'black', color: 'white', fontSize: 20, ":hover": { bgcolor: 'black', fontSize: 20, color: 'white' }, width: '100%', maxWidth: '200px' }}>
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="py-16 bg-gray-800 h-screen flex items-center justify-center">
          <div className="container mx-auto px-6 text-center">
            <h2 className=" text-center mx-5 text-2xl font-bold tracking-widest leading-tight  text-gray-200">
            <Animation sequence={[
                "Explore the latest trends with our blog        ", 10,
                "Discover insightful and informative content     ", 10,
              ]} />
            </h2>
            <p className="mt-4 text-gray-100">
            Stay informed with our latest blog post in today!
            </p>
            <div className="mt-8  py-2 px-4 rounded-lg">
              <Link to="/blog" className='font-semibold mx-auto'>
                <Button variant="contained" color="info" sx={{ bgcolor: 'White', color: 'black', fontSize: 20, ":hover": { bgcolor: 'white', fontSize: 20, color: 'black' }, width: '100%', maxWidth: '200px' }}>
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
