import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer className="bg-black text-white py-8 ">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3">
              <h4 className="text-lg font-semibold mb-2">About Codebat</h4>
              <p className="text-gray-400">
                Codebat is your one-stop destination for coding tutorials, latest trends, tips, and insights in the world of coding.
              </p>
            </div>
            <div className="w-full md:w-1/3 mt-4 md:mt-0">
              <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
              <ul className="list-none">
                <li className="mb-2">
                  <Link to="/" className="text-gray-400 hover:text-gray-200">Home</Link>
                </li>
                <li className="mb-2">
                  <Link to="/blog" className="text-gray-400 hover:text-gray-200">Blog</Link>
                </li>
                <li className="mb-2">
                  <Link to="/tutorial" className="text-gray-400 hover:text-gray-200">Tutorials</Link>
                </li>
                <li className="mb-2">
                  <Link to="mailto:ponkiyarenish@gmail.com" className="text-gray-400 hover:text-gray-200">Feedback</Link>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 mt-4 md:mt-0">
              <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
              <p className="text-gray-400">
                Email: ponkiyarenish@gmail.com
              </p>
              <p className="text-gray-400">
                Phone: +91 9687400141
              </p>
              <div className="mt-4 flex">
                <a href="https://www.facebook.com/renish.ponkiya" className="text-gray-400 hover:text-gray-200 mr-4" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-facebook fa-2x"></i>
                </a>
                <a href="https://www.x.com/renish_1111/" className="text-gray-400 hover:text-gray-200 mr-4" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-twitter fa-2x"></i>
                </a>
                <a href="https://www.instagram.com/renish_1111/" className="text-gray-400 hover:text-gray-200 mr-4" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-instagram fa-2x"></i>
                </a>
                <a href="https://github.com/renish-1111/" className="text-gray-400 hover:text-gray-200 mr-4" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-github fa-2x"></i>
                </a>

              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
          &copy; 2024 Codebat. All rights reserved.
        </div>
      </footer>
    </>
  );
}

export default Footer;
